export const runtime = "nodejs";

import { NextResponse } from "next/server";
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

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  const ab = new ArrayBuffer(buf.byteLength);
  new Uint8Array(ab).set(buf);
  return ab;
}

export async function GET(
  _req: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

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
    const ab = bufferToArrayBuffer(buf);

    return new NextResponse(ab, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buf.length),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
