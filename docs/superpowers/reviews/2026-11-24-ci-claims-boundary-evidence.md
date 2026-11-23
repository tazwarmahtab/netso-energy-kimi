# Netso claims gate and CircleCI review configuration — evidence
Date: 2026-11-24 (Asia/Dhaka)
Base staging SHA: 60767b02757d1fe058adae143e1b71f8642b928a
Branch: review/netso-ci-claims-20261124
State: LOCAL CONFIG VALIDATED; NO HOSTED CI OR PRODUCTION APPROVAL

## Root cause / RED
The current source-wide claims CLI exited 1 with nine false-sales findings, from three files with zero importing references: CalculatorTeaser.tsx, FloatingSimulationChart.tsx, SavingsCalculator.tsx. These files were not in the active Glass import graph but remained in app/src and could be reused accidentally.
New verification/public-claims-gate.test.mjs was written before remediation and failed as expected: 9 findings, 0 passed.

## Remediation / GREEN
- Removed exactly those three dead, unimported source files from app/src. They remain recoverable from Git history.
- No scanner exceptions, bypasses or changed prohibited-claim patterns.
- source-wide claims CLI now exits 0 with exactly 0 findings.
- New regression test passes.
- Added the previously locally validated, non-deploying CircleCI configuration for delivery-contracts, commercial-claims and app-quality.
- Extended branch filtering to review branches and existing staging/feature branches; explicitly excluded main/production.
- Imported test of CircleCI config; expanded to require review branch coverage. RED before filter change, GREEN after.

## Verification
- circleci config validate .circleci/config.yml: valid.
- npm ci exit 0.
- npm run lint exit 0.
- npm test: 7 passed / 0 failed.
- npm run build exit 0.
- node --test verification/*.test.mjs: 25 passed / 0 failed.
- node verification/claims-cli.mjs app/src: 0 findings.
- netso-control verify on intentionally incomplete STATE.example.json exits nonzero as designed, preserving fail-closed certification.
- git diff --check clean.

## Restrictions and dependencies
- Standalone base still contains vulnerable Zod 4.6.5. Security patch in draft PR #17 must be included before CircleCI app-quality audit can pass; do not skip the audit.
- CircleCI YAML validity does not prove the project is connected, a hosted job ran, or its artifacts can be retrieved. Must verify exact run SHA, each job result and report digest from the service.
- Browser viewport testing, shipping visual/source provenance, Vercel preview and independent reviewer approval remain separate gates.
- No deployed product, public URL, DNS, pipeline settings or credentials were modified.
