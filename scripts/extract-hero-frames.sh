#!/usr/bin/env bash
# Extract scroll-scrub JPEG frames from a hero master video (scroll-film-studio Lane B).
# Usage:
#   scripts/extract-hero-frames.sh /path/to/master.mp4 [out_dir] [fps]
# Defaults: out_dir=app/public/assets/frames  fps=native (capped extract via fps filter)
set -euo pipefail

SRC="${1:?video path required}"
OUT="${2:-app/public/assets/frames}"
FPS="${3:-24}"
SCALE="${SCALE:-1280}"

mkdir -p "$OUT"
rm -f "$OUT"/f*.jpg "$OUT"/f_*.jpg

# Native-rate extraction at scroll-film-studio guidance (not a sparse slideshow).
ffmpeg -y -v error -i "$SRC" \
  -vf "fps=${FPS},scale=${SCALE}:-1" \
  -q:v 5 \
  "$OUT/f_%04d.jpg"

# Rename to Netso CanvasHero convention f001.jpg …
i=1
for f in $(ls "$OUT"/f_*.jpg | sort); do
  printf -v n "%03d" "$i"
  mv "$f" "$OUT/f${n}.jpg"
  i=$((i + 1))
done

COUNT=$((i - 1))
cat > "$OUT/manifest.json" <<JSON
{
  "count": ${COUNT},
  "pattern": "f%03d.jpg",
  "fps": ${FPS},
  "scale": ${SCALE},
  "source": "$(basename "$SRC")"
}
JSON
echo "Extracted ${COUNT} frames → ${OUT}/f001.jpg …"
echo "Wrote $OUT/manifest.json (CanvasHero reads count automatically)"
