# CI runner provisioning incident — 2026-11-09

## Evidence
- Staging push workflow run: https://github.com/tazwarmahtab/netso-energy-kimi/actions/runs/42588018503
- Head SHA: 6bdce50bf2d32ada71d4cee194ff077a5c6a6493
- Trigger: push to staging/netso-delivery-control.
- Result: completed/failure.
- charter-and-gaps job 129062434814: runner_id=0; steps=[]; failed.
- app-build job 129062435141: runner_id=0; steps=[]; failed.
- This is a pre-execution failure: neither tests nor build ran. It does not prove a source-code failure.

## Hypotheses, not established causes
GitHub Actions billing/quota, repository Actions permissions, runner availability, or account policy. Requires repo-owner inspection of Actions settings and billing / GitHub support diagnostics. Repeated reruns without diagnosis do not establish the cause.

## Verification workaround
- Execute Node verification/*.test.mjs against exact checked-out SHA in a trusted environment.
- Execute npm ci, npm test, npm run lint, npm run build under app/ against same SHA.
- Preserve command logs, exit codes, environment, commit hash and artifact digests. Manual results are provisional and do not count as hosted CI green.
- Keep staging release gate BLOCKED until independently verified evidence and runner recovery or an approved equivalent CI provider.

## Additional discovered integration discrepancy
- app/src/App.tsx currently maps '/' to Glass, '/classic' to Home. Commercial claims in Home are not necessarily the current root-route content. Audit both routes; do not assume Home.tsx alone defines the public homepage.
- App.tsx claims eager Home import in a comment, but Home is lazy; update stale comments during route work.
- /solutions, /capex and /opex do not appear in the inspected App.tsx route table. Migration requires explicit route wiring, not only page files.
