# Taste Skill adoption — verification checkpoint (2026-11-17)

## Boundary
Source checkout: `tazwarmahtab/netso-energy-kimi` at `staging/netso-delivery-control`, baseline commit `96a2197072f42a303c8311b5024f963aa5072b51`.
Local isolated path: `~/Projects/netso-taste-staging-review-20261117`.
No merge, no production deployment, no site copy changes.

## Verified executions (on connected MacBook)
- Desktop Commander online; Node `v22.22.3`; Chrome installed.
- `npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend --agent codex -y` completed: `PROJECT_INSTALL_VERIFIED`. Skill has its `SKILL.md`, scripts, assets, library, references.
- Installer reported **Gen Critical Risk**, Socket 0 alerts, Snyk Medium Risk. This is conflicting external scanner output, not an adjudicated vulnerability. **Do not execute upstream Taste Skill scripts or merge vendored code before review.**
- Netso `app/npm test`: **7/7 passed**.
- Netso `app/npm run build`: **passed**, Vite produced warnings on two >500kB minified JS chunks (`index` ~644 kB, `Home` ~730 kB).
- Netso `app/npm run lint`: **passed**, exit 0.
- Local preview `http://127.0.0.1:4177` and preexisting `app/scripts/staging-browser-qa.mjs` with `NETSO_QA_WIDTHS=390,1440` and Chrome: **28/28 smoke cases passed** (7 routes × 2 widths × 2 reduced-motion settings; HTTP 200, no horizontal overflow or runtime errors). Source report: `/tmp/netso-taste-qa-20261117/report.json` on the Mac.

## Unverified / no-go claims
- Upstream Taste Skill's own gate, consistency, layout, screenshot and performance scripts have **not** run due to security-review gate.
- This is not a visual-design sign-off: screenshot critique, keyboard/a11y and animation timing are unverified.
- Contact delivery, deployment SHA, production behavior and full viewport matrix (360/768/1024) are unverified.
- No automated GitHub reviewer feedback on draft PR #9 yet.
- Project-local skill files and lockfile are **local uncommitted changes**, not contained in this PR. Avoid committing the 39 MB skill bundle until security assessment.

## Next bounded acceptance sequence
1. Independently review scanner details and high-risk file/network/process operations; allowlist safe script modes or reject the skill.
2. Run screenshot/hierarchy and a11y checks at 390/768/1024/1440 plus the site's real GSAP/Lenis transitions. Use a Netso-specific gate rather than forcing upstream service templates onto the approved cinematic direction.
3. Fix confirmed P0/P1 defects with tests and screenshot before/after evidence.
4. Re-run `npm test && npm run build && npm run lint` and browser checks.
5. Review PRs and only merge to staging after checks; no automatic merge or live publish.

Status: **BASELINE PASS / TASTE SECURITY REVIEW OPEN / RELEASE NOT APPROVED**.

## Follow-up implementation and polish checkpoint (2026-11-17)

- **Reliability fix:** `app/scripts/staging-browser-qa.mjs` now isolates each route in a new page, supports a known-route subset via `NETSO_QA_ROUTES`, waits for a visible `main h1` after React Suspense, and records failure screenshots after timeout. This avoids falsely failing pages still loading their lazy bundle and prevents runtime error listeners from accumulating between routes.
- **Test-first proof:** dedicated `npm run test:browser` now covers a deliberately delayed main-heading test (RED before the fix; PASS after) and an interactive mobile-menu Escape/focus test (RED before the fix; PASS after).
- **Accessible UI fix:** mobile `GlassNav` closes on Escape, restores focus to its menu button and shows a visible keyboard-focus ring; no homepage copy, section order, commercial claims or visual concept changed.
- **Local smoke verification:** 70/70 pass across seven routes × five widths (360, 390, 768, 1024, 1440) × normal/reduced motion before the nav refinement; 28/28 recheck at 390/1440 after the refinement. HTTP 200 and no reported page errors or document horizontal overflow. Reports are local `verification-results/taste-local-browser-v2/report.json` and `verification-results/taste-post-polish/report.json`, **not uploaded or represented as hosted evidence**.
- **Local standard checks:** `npm test` 7/7 pass, `npm run test:browser` 2/2 pass (with NETSO_STAGING_URL and local Chrome), `npm run lint` pass, `npm run build` pass. Build continues to warn about two >500kB output chunks.
- **No Taste Skill script execution:** the full upstream package remains local/uncommitted; security hold documented in `docs/TASTE-SKILL-SECURITY-HOLD.md`.
- **GitHub review:** PR #9 remained a draft, with zero inline review threads at last check. No automated reviewer pass can be claimed; do not request re-review while the security/hosted-preview release gates remain blocked.
- **Hosted checks:** GitHub `Vercel – netso-energy-kimi` reported success; separate `Vercel – netso-energy-kimi-preview` reported `Account is blocked`. Direct checks of the preview alias and immutable preview URL returned HTTP 402. An old READY deployment record does not prove the current preview is accessible.
- **Unverified:** production deployment, hosted PR commit parity, contact form delivery, visually reviewed screenshots across all sections, full keyboard/focus sequences, WCAG conformance, animation performance under network throttling. Release remains **NO-GO**.

The browser-only tests are intentionally opt-in, not part of `npm test`, because the default CI dependencies do not install Playwright/Chromium. Setup in the isolated checkout: `cd app && npm install --no-save --package-lock=false playwright`, with a local Chromium-compatible browser and `NETSO_STAGING_URL` configured. This is not a recommendation to install or run the security-unreviewed Taste Skill scripts.
