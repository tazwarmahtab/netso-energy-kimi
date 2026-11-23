# Netso Zod dependency advisory — evidence
Date: 2026-11-24 (Asia/Dhaka)
Base staging SHA: 60767b02757d1fe058adae143e1b71f8642b928a
Branch: review/netso-zod-security-20261124
Status: isolated patch locally verified; overall release NO-GO.

## Baseline RED
npm ci from staging lockfile installs Zod 4.6.5. npm audit --omit=dev --audit-level=high exits 1 with exactly one HIGH advisory: GHSA-mrhx-c7xc-m3w5, Zod can exhaust memory validating oversized constrained collections, affected versions below 4.6.6.

## Patch and GREEN
- Only app/package.json and app/package-lock.json dependency records updated.
- Zod package range now starts at 4.6.7; lock resolves Zod 4.6.7.
- npm ci exit 0 after patch.
- npm audit --omit=dev --audit-level=high exit 0 with 0 critical, 0 high, 0 moderate, 0 low vulnerabilities (registry result at verification time).
- npm run lint exit 0.
- npm test exit 0: 7 passed, 0 failed (staging-only baseline; combined tests are a separate gate).
- npm run build exit 0. Existing large-chunk warning remains.
- git diff --check passed.

## Remaining gates
- Security review and staging preview should run against the exact combined candidate after including both draft PRs.
- No claim that third-party security audits, penetration testing, complete SAST or hosted CI are green.
- No shared-branch merge, production deployment, or DNS change.
