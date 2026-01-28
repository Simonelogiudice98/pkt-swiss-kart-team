import { PilotDTO } from "@/types/types";
import { google } from "googleapis";

function getDriveClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON in .env.local");

  const credentials = JSON.parse(raw);

  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  return google.drive({ version: "v3", auth });
}

const isImageFile = (name?: string, mimeType?: string) => {
  const n = (name ?? "").toLowerCase();
  const m = (mimeType ?? "").toLowerCase();
  return (
    m.startsWith("image/") ||
    n.endsWith(".jpg") ||
    n.endsWith(".jpeg") ||
    n.endsWith(".png") ||
    n.endsWith(".webp")
  );
};

export async function getPilotsFromDrive(rootFolderId: string): Promise<PilotDTO[]> {
  const drive = getDriveClient();

  const foldersRes = await drive.files.list({
    q: `'${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
    pageSize: 200,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const folders = foldersRes.data.files ?? [];

  const pilots = await Promise.all(
    folders.map(async (f) => {
      const folderId = f.id!;
      const folderName = f.name || "Unknown";

      const filesRes = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: "files(id,name,mimeType,createdTime)",
        orderBy: "createdTime desc",
        pageSize: 50,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });

      const files = filesRes.data.files ?? [];
      const photo = files.find((x) => isImageFile(x.name ?? undefined, x.mimeType ?? undefined));

      return {
        id: folderId,
        name: folderName,
        photoFileId: photo?.id ?? undefined,
      };
    })
  );

  pilots.sort((a, b) => a.name.localeCompare(b.name, "it"));
  return pilots;
}
