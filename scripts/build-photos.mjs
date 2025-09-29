import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import fg from "fast-glob";
import slugify from "slugify";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src", "content", "photos");
const OUT_FULL = path.join(ROOT, "public", "photos", "full");
const OUT_THUMBS = path.join(ROOT, "public", "photos", "thumbs");
const DATA_JSON = path.join(ROOT, "src", "data", "photos.json");

// utils
async function ensureDirs() {
  await fs.mkdir(OUT_FULL, { recursive: true });
  await fs.mkdir(OUT_THUMBS, { recursive: true });
  await fs.mkdir(path.dirname(DATA_JSON), { recursive: true });
}
function humanize(name) {
  return name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
}
async function readSidecar(absImgPath) {
  const sidecar = absImgPath.replace(/\.[^.]+$/, "") + ".txt";
  try {
    const raw = await fs.readFile(sidecar, "utf8");
    const lines = raw.split(/\r?\n/);
    const alt = (lines[0] || "").trim();
    const caption = lines.slice(1).join("\n").trim() || null;
    return { alt: alt || null, caption };
  } catch {
    return { alt: null, caption: null };
  }
}
async function pruneOutputs(validIds) {
  for (const dir of [OUT_FULL, OUT_THUMBS]) {
    const files = await fg(["*.webp"], { cwd: dir, onlyFiles: true });
    for (const f of files) {
      const id = f.replace(/\.webp$/, "");
      if (!validIds.has(id)) {
        await fs.unlink(path.join(dir, f)).catch(() => {});
      }
    }
  }
}

async function main() {
  await ensureDirs();

  const relFiles = await fg(["**/*.{jpg,jpeg,png,webp,avif}"], {
    cwd: SRC_DIR,
    onlyFiles: true,
  });

  if (relFiles.length === 0) {
    await fs.writeFile(DATA_JSON, "[]", "utf8");
    console.log("No source images. photos.json is empty.");
    return;
  }

  relFiles.sort();

  const photos = [];
  const validIds = new Set();

  for (const rel of relFiles) {
    const abs = path.join(SRC_DIR, rel);
    const base = path.parse(rel).name;
    const id = slugify(base, { lower: true, strict: true, locale: "hu" });
    validIds.add(id);

    const { alt: sideAlt, caption } = await readSidecar(abs);
    const alt = sideAlt || humanize(base);

    const fullOut = path.join(OUT_FULL, `${id}.webp`);
    const thumbOut = path.join(OUT_THUMBS, `${id}.webp`);

    await sharp(abs)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(fullOut);

    await sharp(abs)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(thumbOut);

    const item = {
      id,
      alt,
      thumbSrc: `/photos/thumbs/${id}.webp`,
      fullSrc: `/photos/full/${id}.webp`,
    };
    if (caption) item.caption = caption;

    photos.push(item);
  }

  await pruneOutputs(validIds);

  photos.sort((a, b) => a.id.localeCompare(b.id, "hu"));
  await fs.writeFile(DATA_JSON, JSON.stringify(photos, null, 2), "utf8");
  console.log(`OK: ${photos.length} images processed. Pruned orphans.`);
}

main().catch((e) => { console.error(e); process.exit(1); });