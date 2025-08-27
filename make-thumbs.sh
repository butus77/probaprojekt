#!/bin/bash
# Automatikus thumbnail generáló a public/photos mappában
# Kezeli a .jpg/.jpeg/.webp (akár .png) képeket
# KIHAGYJA a *-thumb.* fájlokat és SKIP-el, ha BÁRMILYEN kiterjesztésű thumb már létezik

set -euo pipefail

PHOTO_DIR="public/photos"
WIDTH="${1:-300}"  # thumbnail szélesség px-ben (alap: 300)

if [ ! -d "$PHOTO_DIR" ]; then
  echo "❌ A $PHOTO_DIR könyvtár nem létezik!"
  exit 1
fi

echo "▶ Thumbnail generálás a(z) '$PHOTO_DIR' mappában (szélesség: ${WIDTH}px)…"

# Forrásképek: csak eredetik, a *-thumb.* fájlokat kizárjuk
find "$PHOTO_DIR" -maxdepth 1 \
  \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" -o -iname "*.png" \) \
  ! -iname "*-thumb.*" \
  -print0 \
| while IFS= read -r -d '' img; do
    filename=$(basename -- "$img")
    name="${filename%.*}"       # pl. 1
    ext="${filename##*.}"       # pl. jpg / webp / png (eredeti kiterjesztés)
    thumb_base="${PHOTO_DIR}/${name}-thumb"

    # SKIP, ha BÁRMILYEN kiterjesztésű thumb már létezik (jpg/jpeg/webp/png)
    if compgen -G "${thumb_base}.*" > /dev/null; then
      echo "↩️  Már létezik: $(basename -- "$(ls ${thumb_base}.* 2>/dev/null | head -n1)") — kihagyom"
      continue
    fi

    thumb="${thumb_base}.${ext}"

    # Kicsinyítés WIDTH px szélesre (aránytartó)
    convert "$img" -resize "${WIDTH}x" "$thumb"
    echo "✅ Létrehozva: $(basename -- "$thumb")"
  done

echo "✔ Kész."



