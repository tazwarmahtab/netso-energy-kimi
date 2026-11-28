# Netso build-tool security remediation — review evidence
Date: 2026-11-24 (Asia/Dhaka)
Base staging SHA: 60767b02757d1fe058adae143e1b71f8642b928a
Branch: review/netso-toolchain-security-20261124
State: local tooling fix verified; production NO-GO.

## RED
Full npm audit of base after npm ci returned exit 1 with 2 HIGH and 8 MODERATE vulnerabilities. Direct affected dependencies included Vite 7.3.6, typescript-eslint 8.71.0, and Zod 4.6.5. Direct Zod is separately remediated in draft PR #17.

## Patch
- Vite from 7.3.6 to 7.3.8 (same major).
- typescript-eslint 8.71.0 to 8.74.0, matching internal @typescript-eslint packages (same major).
- Transitive minimatch 10.2.6 to 11.0.9 and postcss-selector-parser 6.1.4 to 6.1.6, plus related dependency patch updates.
- Exactly 17 lockfile package versions changed, all in the tooling dependency chain; no application source files modified.

## GREEN for this scope
- After the toolchain changes, full npm audit has 0 moderate and only 1 high finding, Zod <4.6.6. All Vite and toolchain advisories are cleared.
- npm ci exit 0.
- npm run lint exit 0.
- npm test: 7 passed / 0 failed.
- npm run build exit 0; main bundle warning remains.
- Full audit cannot pass on this branch alone until draft PR #17 is integrated.
- No deployment, shared-branch merge, credential or CI settings change.

## Outstanding gate
Integrate with #17 and the other draft PRs in a local release candidate; rerun full npm audit (including dev), all tests, CircleCI config and 56 route matrix on the exact combined SHA. Hosted CI/independent review remain separate blockers.
