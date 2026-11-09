#!/usr/bin/env bash
# Netso independent, no-GitHub-Actions verification runner.
# Run from the repository root on a machine with Node 22+, npm and git.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP="$ROOT/app"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="$ROOT/verification-results/independent-$STAMP"
mkdir -p "$OUT"
git -C "$ROOT" rev-parse HEAD > "$OUT/commit.txt" || exit 2
git -C "$ROOT" status --porcelain > "$OUT/working-tree.txt" || exit 2
printf '%s\n' "$STAMP" > "$OUT/observed-at-utc.txt"
node --version > "$OUT/node-version.txt" || exit 2
npm --version > "$OUT/npm-version.txt" || exit 2
failed=0
run_gate() {
  local name="$1"; shift
  printf '%s\n' "RUNNING $name"
  (cd "$APP" && "$@") > "$OUT/$name.log" 2>&1
  local code=$?
  printf '%s\n' "$code" > "$OUT/$name.exit"
  if [ "$code" -ne 0 ]; then failed=1; printf 'FAIL %s (%s)\n' "$name" "$code"; else printf 'PASS %s\n' "$name"; fi
}
run_gate install npm ci
if [ "$(cat "$OUT/install.exit")" = 0 ]; then
  run_gate lint npm run lint
  run_gate test npm test
  run_gate build npm run build
else
  for gate in lint test build; do printf '%s\n' NOT_RUN > "$OUT/$gate.exit"; done
fi
run_gate staging-http node scripts/staging-observatory.mjs
printf '%s\n' 'Browser viewport, reduced-motion, contact delivery, deployment SHA and independent review remain UNVERIFIED.' > "$OUT/limitations.txt"
printf '%s\n' "$OUT"
exit "$failed"
