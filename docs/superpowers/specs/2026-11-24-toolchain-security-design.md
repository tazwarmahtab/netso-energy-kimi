# Netso build-tool security update — design
Date: 2026-11-24; isolated review-only.

## Goal
Repair high-severity Vite dev-server advisories and moderate tooling/transitive dependency advisories without changing application runtime code, moving major versions or bypassing audit rules.

## Evidence
On the same staging baseline, full npm audit fails with 2 high and 8 moderate advisories. Direct deps affected: Vite 7.3.6 (high), typescript-eslint 8.71.0 (moderate), Zod 4.6.5 (high). Zod is independently patched in review PR #17; this proposal covers build/dev tooling only.
Transitive affected libraries include minimatch and postcss-selector-parser.

## Alternatives
- Exclude dev dependencies from all gates: rejected because CI supply-chain and dev-server vulnerabilities remain unchecked.
- Upgrade major versions: unnecessarily risky for release stabilization.
- Update Vite within 7.x and typescript-eslint within 8.x, update permitted transitive packages, preserve source and audit full tree: selected.

## Constraints
- No production, deploy, runner credentials or CI settings change.
- Keep only package.json and package-lock.json version metadata plus verification docs.
- Rerun clean npm ci, full audit, lint, tests, build and combined integration.
- If only the independently patched Zod remains, report partial success and do not claim all-security-clear on this branch.
