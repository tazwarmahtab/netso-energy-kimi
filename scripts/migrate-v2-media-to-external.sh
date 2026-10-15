#!/usr/bin/env bash
set -euo pipefail

# Run from a disposable clone before publishing the rewritten branch.
# The generated history no longer contains V2 media blobs; upload the preserved
# local media tree to object storage/CDN separately and set VITE_NETSO_ASSET_BASE_URL.

if [[ "${1:-}" != "--rewrite" ]]; then
  echo "Usage: $0 --rewrite" >&2
  exit 2
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script inside the repository." >&2
  exit 2
fi

git filter-branch --force --index-filter \
  'git rm -r --cached --ignore-unmatch app/public/assets/v2' \
  --prune-empty --tag-name-filter cat -- --all

echo "History rewritten. Upload app/public/assets/v2 from a pre-rewrite media archive to object storage/CDN."
echo "Then configure VITE_NETSO_ASSET_BASE_URL to the CDN origin."
