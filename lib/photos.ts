// lib/photos.ts
import fs from "fs";
import path from "path";

export type Photo = {
  id: string;
  alt: string;
  thumbSrc: string;
  fullSrc: string;
  width?: number;
  height?: number;
};

const VALID_EXT = /\.(jpe?g|webp|png)$/i;
const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");

let _cache: { mtime: number; data: Photo[] } | null = null;

function toTitleCaseFromSlug(slug: string) {
  const cleaned = slug.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return slug;
  return cleaned
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function tryReadDimensions(absPath: string): Promise<{ width?: number; height?: number }> {
  try {
    // @ts-ignore
    const sharp = (await import("sharp")).default as any;
    const meta = await sharp(absPath).metadata();
    return { width: meta.width, height: meta.height };
  } catch {
    return {};
  }
}

export async function readPhotos(): Promise<Photo[]> {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  // Cache check
  const dirStat = fs.statSync(PHOTOS_DIR);
  if (_cache && _cache.mtime === dirStat.mtimeMs) {
    return _cache.data;
  }

  // Meta.json betöltése
  let meta: Record<string, string> = {};
  const metaPath = path.join(PHOTOS_DIR, "meta.json");
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    } catch (e) {
      console.warn("⚠️ Nem sikerült beolvasni a meta.json fájlt:", e);
    }
  }

  const files = fs.readdirSync(PHOTOS_DIR);
  const fulls = files.filter(f => !f.includes("-thumb.") && VALID_EXT.test(f));

  const photos: Photo[] = [];
  for (const full of fulls) {
    const ext = full.split(".").pop()!;
    const name = full.slice(0, -(ext.length + 1));
    const thumbCandidate = `${name}-thumb.${ext}`;
    const hasThumb = files.includes(thumbCandidate);

    const fullAbs = path.join(PHOTOS_DIR, full);
    const dims = await tryReadDimensions(fullAbs);

    photos.push({
      id: name,
      alt: meta[name] ?? toTitleCaseFromSlug(name), // először meta.json, utána fallback
      fullSrc: `/photos/${full}`,
      thumbSrc: hasThumb ? `/photos/${thumbCandidate}` : `/photos/${full}`,
      ...dims,
    });
  }

  photos.sort((a, b) => {
    try {
      const aStat = fs.statSync(path.join(PHOTOS_DIR, path.basename(a.fullSrc)));
      const bStat = fs.statSync(path.join(PHOTOS_DIR, path.basename(b.fullSrc)));
      return bStat.mtimeMs - aStat.mtimeMs;
    } catch {
      return a.id.localeCompare(b.id);
    }
  });

  _cache = { mtime: dirStat.mtimeMs, data: photos };
  return photos;
}

// app/fotoalbum/page.tsx
import LightboxGallery from "@/components/LightboxGallery";
