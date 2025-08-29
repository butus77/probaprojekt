#!/usr/bin/env bash
set -euo pipefail

PHOTOS_DIR="public/photos"
BACKUP_DIR="$PHOTOS_DIR/_originals"
MAX_FULL=1600      # full képek max hosszú él
THUMB_W=400        # thumbnail szélesség
QUALITY_JPG=82     # JPG minőség
QUALITY_WEBP=80    # WebP minőség

# parancs elérhetőségek
if command -v magick >/dev/null 2>&1; then
  CONVERT="magick"
elif command -v convert >/dev/null 2>&1; then
  CONVERT="convert"
else
  echo "❌ Nem találom az ImageMagick-et (magick/convert). Telepítsd: sudo apt install imagemagick"
  exit 1
fi

echo "▶ Optimalizálás a(z) '$PHOTOS_DIR' mappában… (full: max ${MAX_FULL}px, thumb: ${THUMB_W}px)"

mkdir -p "$BACKUP_DIR"

shopt -s nullglob
# Csak jpg/jpeg/webp és nem -thumb.* fájlok
for src in "$PHOTOS_DIR"/*.{jpg,JPG,jpeg,JPEG,webp,WEBP}; do
  base="$(basename "$src")"

  # thumb-ok kihagyása
  if [[ "$base" == *"-thumb."* ]]; then
    continue
  fi

  # kiterjesztés és cél thumb név
  ext="${base##*.}"
  name="${base%.*}"
  thumb="$PHOTOS_DIR/${name}-thumb.${ext}"

  # 1) Backup, ha még nincs
  if [[ ! -f "$BACKUP_DIR/$base" ]]; then
    cp -n "$src" "$BACKUP_DIR/$base"
    echo "💾 Backup: $base → _originals/"
  fi

  # 2) Full kép méretezés+újratömörítés (in-place)
  #   - ha nagyobb, mint MAX_FULL, akkor lekicsinyítjük hosszú élre;
  #   - ha kisebb, csak újratömörítjük kíméletesen.
  case "${ext,,}" in
    jpg|jpeg)
      $CONVERT "$src" -auto-orient -strip -resize "${MAX_FULL}x${MAX_FULL}>" -quality $QUALITY_JPG "$src"
      ;;
    webp)
      $CONVERT "$src" -auto-orient -strip -resize "${MAX_FULL}x${MAX_FULL}>" -quality $QUALITY_WEBP "$src"
      ;;
    *)
      echo "↩️  Ismeretlen kiterjesztés (kihagyva): $base"
      continue
      ;;
  esac
  echo "✅ Full optimalizálva: $base"

  # 3) Thumb generálás (ha nincs)
  if [[ -f "$thumb" ]]; then
    echo "↩️  Thumb létezik: $(basename "$thumb") — kihagyom"
  else
    case "${ext,,}" in
      jpg|jpeg)
        $CONVERT "$src" -auto-orient -strip -resize "${THUMB_W}x" -quality $QUALITY_JPG "$thumb"
        ;;
      webp)
        $CONVERT "$src" -auto-orient -strip -resize "${THUMB_W}x" -quality $QUALITY_WEBP "$thumb"
        ;;
    esac
    echo "🖼️  Thumb kész: $(basename "$thumb")"
  fi
done

echo "✔ Kész."
