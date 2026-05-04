import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_SVG = path.join(ROOT, "public", "icon-source.svg");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");

const BG_COLOR = "#ffffff";
const BG_RGB = { r: 255, g: 255, b: 255, alpha: 1 };
const PKT_BBOX = { minX: 53, minY: 0, maxX: 1999, maxY: 952 };
const RENDER_WIDTH = 2000;

async function makeSquareLogo(size) {
  const supersample = Math.max(size * 4, 1024);
  const radius = Math.round(supersample * 0.18);

  const bgPng = await sharp({
    create: {
      width: supersample,
      height: supersample,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${supersample}" height="${supersample}"><rect width="${supersample}" height="${supersample}" rx="${radius}" ry="${radius}" fill="${BG_COLOR}"/></svg>`
        ),
      },
    ])
    .png()
    .toBuffer();

  const fullRender = await sharp(SOURCE_SVG)
    .resize({ width: RENDER_WIDTH })
    .png()
    .toBuffer();

  const pktCrop = await sharp(fullRender)
    .extract({
      left: PKT_BBOX.minX,
      top: PKT_BBOX.minY,
      width: PKT_BBOX.maxX - PKT_BBOX.minX + 1,
      height: PKT_BBOX.maxY - PKT_BBOX.minY + 1,
    })
    .png()
    .toBuffer();

  const innerWidth = Math.round(supersample * 0.78);
  const cropMeta = await sharp(pktCrop).metadata();
  const aspect = cropMeta.width / cropMeta.height;
  const innerHeight = Math.round(innerWidth / aspect);

  const resizedLogo = await sharp(pktCrop)
    .resize({ width: innerWidth, height: innerHeight, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const left = Math.round((supersample - innerWidth) / 2);
  const top = Math.round((supersample - innerHeight) / 2);

  const composited = await sharp(bgPng)
    .composite([{ input: resizedLogo, left, top }])
    .png()
    .toBuffer();

  return await sharp(composited)
    .resize({ width: size, height: size, kernel: "lanczos3" })
    .png()
    .toBuffer();
}

function buildIcoFromPngs(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  const entries = [];
  let offset = 6 + 16 * pngBuffers.length;

  for (const { size, data } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.data)]);
}

async function main() {
  console.log("Generating square logo at multiple sizes...");

  const sizes = { ico16: 16, ico32: 32, ico48: 48, png32: 32, png48: 48, apple: 180 };
  const buffers = {};
  for (const [key, size] of Object.entries(sizes)) {
    buffers[key] = await makeSquareLogo(size);
    console.log(`  ${key}: ${size}×${size} done`);
  }

  await fs.writeFile(path.join(PUBLIC_DIR, "favicon-32x32.png"), buffers.png32);
  await fs.writeFile(path.join(PUBLIC_DIR, "favicon-48x48.png"), buffers.png48);
  await fs.writeFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"), buffers.apple);

  const ico = buildIcoFromPngs([
    { size: 16, data: buffers.ico16 },
    { size: 32, data: buffers.ico32 },
    { size: 48, data: buffers.ico48 },
  ]);
  await fs.writeFile(path.join(PUBLIC_DIR, "icon.ico"), ico);
  await fs.writeFile(path.join(APP_DIR, "favicon.ico"), ico);

  console.log("\nAll favicons written.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
