// Renders public/icon.svg (original artwork) into the PNG app icons used by
// app/manifest.ts and the apple-touch-icon, plus app/favicon.ico (16/32/48 px
// PNGs packed into one ICO file). Uses next/og, which ships with Next.
// Run after changing the SVG: bun scripts/generate-icons.tsx
import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og";

const OUT: [file: string, size: number][] = [
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["public/icon-maskable-512.png", 512],
  ["public/apple-touch-icon.png", 180],
];
const FAVICON_SIZES = [16, 32, 48];

const svg = await readFile("public/icon.svg");
const src = `data:image/svg+xml;base64,${svg.toString("base64")}`;

async function png(size: number) {
  // eslint-disable-next-line @next/next/no-img-element
  const res = new ImageResponse(<img src={src} width={size} height={size} alt="" />, { width: size, height: size });
  return Buffer.from(await res.arrayBuffer());
}

for (const [file, size] of OUT) {
  await writeFile(file, await png(size));
  console.log(`wrote ${file}`);
}

// ICO container: 6-byte header, one 16-byte directory entry per image, then the PNG data.
const images = await Promise.all(FAVICON_SIZES.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((data, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(FAVICON_SIZES[i], 0); // width
  e.writeUInt8(FAVICON_SIZES[i], 1); // height
  e.writeUInt8(0, 2); // no palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(data.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += data.length;
  return e;
});
await writeFile("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
console.log("wrote app/favicon.ico");
