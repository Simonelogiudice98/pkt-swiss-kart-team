export const runtime = "nodejs";

import { NextResponse, type NextRequest } from "next/server";
import { google } from "googleapis";
import type { Readable } from "node:stream";

function getDriveClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
  const credentials = JSON.parse(raw);

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

const MEM_TTL_MS = 60_000;
const mem = new Map<string, { exp: number; buf: Buffer; contentType: string }>();
const inFlight = new Map<string, Promise<{ buf: Buffer; contentType: string }>>();

async function getImage(fileId: string): Promise<{ buf: Buffer; contentType: string }> {
  const now = Date.now();

  const cached = mem.get(fileId);
  if (cached && cached.exp > now) return { buf: cached.buf, contentType: cached.contentType };

  const running = inFlight.get(fileId);
  if (running) return running;

  const p = (async () => {
    const drive = getDriveClient();

    const metaRes = await drive.files.get({
      fileId,
      fields: "mimeType",
      supportsAllDrives: true,
    });

    const mt = metaRes.data.mimeType ?? "";
    const contentType = mt.startsWith("image/") ? mt : "image/jpeg";

    const fileRes = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "stream" }
    );

    const buf = await streamToBuffer(fileRes.data as Readable);

    mem.set(fileId, { exp: now + MEM_TTL_MS, buf, contentType });
    return { buf, contentType };
  })().finally(() => {
    inFlight.delete(fileId);
  });

  inFlight.set(fileId, p);
  return p;
}

type DriveErrorPayload = { error?: { message?: string } };

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await ctx.params;
    const cleanId = decodeURIComponent(fileId).trim();

    const { buf, contentType } = await getImage(cleanId);

    // Buffer -> Uint8Array (BodyInit valido)
    const body = new Uint8Array(buf);

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buf.length),
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e: unknown) {
    const apiMsg = (() => {
      const maybe = e as { response?: { data?: DriveErrorPayload } };
      return maybe.response?.data?.error?.message;
    })();

    console.error("API /api/drive error:", e);

    const msg =
      typeof apiMsg === "string"
        ? apiMsg
        : e instanceof Error
          ? e.message
          : "Unknown error";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
