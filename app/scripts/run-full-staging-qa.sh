#!/usr/bin/env bash
# One-command independent Netso staging QA. Requires Node 22+, git, npm, Chromium dependencies.
# No production deployment, credentials, paid runner, or contact form submissions.
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP="$ROOT/app"
OUT="$ROOT/verification-results/full-$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$OUT"
failed=0
bash "$APP/scripts/independent-ci.sh" > "$OUT/ci.log" 2>&1
ci_exit=$?
printf '%s\n' "$ci_exit" > "$OUT/ci.exit"
if [ "$ci_exit" -ne 0 ]; then failed=1; fi
if [ -d "$APP/node_modules" ]; then
 (cd "$APP" && npm run test:browser:install) > "$OUT/browser-setup.log" 2>&1
 setup_exit=$?
else
 setup_exit=2
 printf '%s\n' 'BLOCKED: npm ci did not install dependencies' > "$OUT/browser-setup.log"
fi
printf '%s\n' "$setup_exit" > "$OUT/browser-setup.exit"
if [ "$setup_exit" -eq 0 ]; then
 (cd "$APP" && NETSO_QA_OUTPUT="$OUT/staging-browser" node scripts/staging-browser-qa.mjs) > "$OUT/staging-browser.log" 2>&1
 staging_browser_exit=$?
 (cd "$APP" && npm run test:browser) > "$OUT/browser-contract.log" 2>&1
 browser_contract_exit=$?
else
 staging_browser_exit=2
 browser_contract_exit=2
 printf '%s\n' 'NOT_RUN: browser setup failed' > "$OUT/staging-browser.log"
 printf '%s\n' 'NOT_RUN: browser setup failed' > "$OUT/browser-contract.log"
fi
printf '%s\n' "$staging_browser_exit" > "$OUT/staging-browser.exit"
printf '%s\n' "$browser_contract_exit" > "$OUT/browser-contract.exit"
if [ "$staging_browser_exit" -ne 0 ] || [ "$browser_contract_exit" -ne 0 ]; then failed=1; fi
printf '%s\n' 'NOT_VERIFIED: actual contact delivery, exact deployment SHA, visual design review, animation timing, physical Safari.' > "$OUT/release-blockers.txt"
printf 'CI=%s BROWSER_SETUP=%s STAGING_BROWSER=%s BROWSER_CONTRACT=%s\n' "$ci_exit" "$setup_exit" "$staging_browser_exit" "$browser_contract_exit"
printf 'Evidence directory: %s\n' "$OUT"
exit "$failed"
