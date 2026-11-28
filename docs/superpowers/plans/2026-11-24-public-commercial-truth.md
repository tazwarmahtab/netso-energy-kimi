# Public Commercial Truth Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL superpowers:executing-plans; perform RED → GREEN test-first per task.

**Goal:** Ensure all active public Netso routes describe business models accurately and do not expose old unsupported guarantees.
**Architecture:** Keep current Glass route, redirect /classic to it, update About and Product copy/data models without layout or new dependency changes.
**Tech Stack:** React, TypeScript, Vite, Node test.
**Spec:** docs/superpowers/specs/2026-11-24-public-commercial-truth-design.md

## Global constraints
No changes to production, shared staging branch, or real messages. No invented financing terms, performance or backup claims.

## Review focus
- Old /classic bookmark loads current homepage, without redirect loop or error.
- Home no longer has misleading Classic link.
- About corporate identity accurately reflects Chattogram.
- Product sample telemetry cannot be mistaken for live monitored installations.
- OPEX and CAPEX remain explicitly separate models; user receives no universal net-metering credit or hardware warranty promise.

### Task 1: Guard the active claims surface
**Files:** app/scripts/public-commercial-truth.test.mjs; app/src/App.tsx; app/src/pages/Glass.tsx; app/src/pages/Brand.tsx.
- [x] Write contract assertions prohibiting access to the old live /classic route and link to it.
- [x] Run focused test RED on untouched files.
- [x] Replace route with explicit redirect; remove switch; fix public design-language reference.
- [x] Run focused test GREEN.

### Task 2: About truth
**Files:** app/scripts/public-commercial-truth.test.mjs; app/src/pages/About.tsx.
- [x] Assert About prohibits unsupported funding/portfolio/IDCOL/certificate claims and uses the correct ownership split and location.
- [x] Run test RED; revise copy only, keep component hierarchy intact.
- [x] Run focused test GREEN.

### Task 3: Product truth
**Files:** app/scripts/public-commercial-truth.test.mjs; app/src/pages/Product.tsx.
- [x] Add assertions against invented tariff/net-metering/telemetry/warranty/performance claims; require explicit demo status and site-specific agreements.
- [x] Run test RED; replace static data and copy with conditional engineering approach.
- [x] Run focused test GREEN.

### Task 4: Verification
**Files:** docs/superpowers/reviews/2026-11-24-public-commercial-truth-evidence.md.
- [x] npm ci, lint, npm test, build; all exit 0.
- [x] Chrome smoke on /classic, /about, /product at phone and desktop/landscape; no actual form send.
- [ ] Independent code review where available; record failures/limitations.
- [ ] Commit isolated branch only; production NO-GO until owner approves.


### Task 3A: Homepage commercial-claims guard (amendment)
**Files:** app/src/components/glass/sections-b.tsx; app/scripts/public-commercial-truth.test.mjs.
- [x] Write regression against timeline, certified, staff, metering and risk-allocation promises and observe RED.
- [x] Replace statements with conditional contract and site-specific language; preserve layout and approved hero.
- [x] Observe GREEN on focused test.
- [x] Run full site browser checks on rebuilt production assets, including the footer.
