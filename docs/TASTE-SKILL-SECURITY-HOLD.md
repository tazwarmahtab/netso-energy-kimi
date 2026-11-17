# Taste Skill v2.5.1 — independent security hold (2026-11-17)

## Current decision: NOT CLEARED FOR EXECUTION OR VENDORING

Official source: `Leonxlnx/taste-skill`, selected skill `design-taste-frontend`. The local project skills lock identifies Git commit `f6b76575f949707b4e3c37cd86cb44b0b98643e8`. Installation on an isolated Netso clone was successful. The CLI's displayed security ratings conflicted: Gen *Critical Risk*, Snyk *Medium Risk*, Socket *0 alerts*. Those labels alone are not an independently validated exploit finding or a clearance. Do not change the score, silence the gate or represent this memo as a complete audit.

## Trust boundaries and observed capabilities

The package contains approximately 1,631 files (~39 MB). Source inspection of the installed skill's JavaScript and shell-facing documentation identified the following expected but privileged behavior:

- A Claude Code Stop hook in `SKILL.md` can invoke `scripts/gate.mjs` automatically when supported by the host. This hook is not a harmless design token file; executing it delegates filesystem and browser privileges to upstream code.
- `scripts/consistency.mjs`, `scripts/shoot.mjs`, `scripts/perf.mjs`, `scripts/effects.mjs`, `scripts/moments.mjs` and `scripts/icons.mjs` can launch a local Chrome process. Some spawn helper processes / run `taskkill` where applicable.
- Some scripts write generated output and remove files or folders in designated output/profile paths; specifically `effects.mjs` and `perf.mjs` contain `fs.rmSync` operations. Any untrusted path argument or symlink behavior would require separate validation.
- The photo and icon helpers fetch assets from Wikimedia Commons, Wikimedia upload URLs, jsDelivr and other external servers. Running them in a credential-rich environment creates a network/data-handling trust boundary.
- A selective grep of the installed scripts found no immediate command pattern showing credential exfiltration, but **that is not proof of safety**; arbitrary browser execution, linked assets, shell operations and dependency code were not fully audited.

## Practical controls

1. Do **not** commit the third-party `.agents/skills/design-taste-frontend` directory or modified `skills-lock.json` until the conflicting scanner reports are investigated at file/path level and a separately reviewed, pinned version is approved.
2. Do **not** run the upstream `gate.mjs`/effects/assets helpers against the Netso workspace with GitHub, SSH, cloud or browser credentials present.
3. Use the project's own Vite/React build, lint, claims tests, and a limited, read-only Playwright test script with a local Chrome path to validate page behavior.
4. Security review remains a release hold independent of successful app tests. No production deployment or merging into live branches is authorized.
5. To clear the hold, obtain scanner finding details, assess each process/network/filesystem operation, verify source hash and dependencies, then run any permitted tool in a least-privileged sandbox with restricted network and filesystem scope.

Status: **PACKAGE INSTALLED LOCALLY / SECURITY HOLD OPEN / NO UPSTREAM EXECUTION**.
