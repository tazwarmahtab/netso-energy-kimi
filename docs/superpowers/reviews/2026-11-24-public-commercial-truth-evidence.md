# Netso public commercial truth — review-only evidence
Date: 2026-11-24 (Asia/Dhaka)
Base SHA: 60767b02757d1fe058adae143e1b71f8642b928a
Isolated branch: review/netso-commercial-truth-20261124
Release state: PRODUCTION NO-GO

## Scope implemented
- /classic redirects to the current / home route; the heavy Home classic chunk is no longer imported or built. Source remains in Git for rollback.
- Removed Classic navigation from the public homepage and updated archived design wording in Brand and README.
- About: Chattogram-based identity, factory-borrowed/owned CAPEX and conditional partner-funded OPEX; deleted unverified financing, 20-year, portfolio, specific certification and installed-reference assertions.
- Product: removed unverified hardware ratings, net-metering export credits, ownership, 20-year O&M, warranty, live monitoring, installed-device and attribute certification guarantees. Monitoring KPIs are explicit concept-only placeholders.
- Canonical homepage: replaced schedule promises, automatic Netso risk allocation, staff/spares guarantees, roof waterproofing promises and compliance banner with conditional feasibility, EPC and contract language.
- Hero: corrected unverified regional-footprint badge, confusing Client CAPEX / Partner-funded label, and green live-dot impression; kept approved headline, hero imagery, actions and layout.

## Test-first sequence
- Source contracts created before implementation: classic route, About, Product, homepage operations and hero. Each had a witnessed RED failure before corresponding source changes, then GREEN.
- Browser test was extended to reject old compiled homepage claims and failed against the stale build (RED); after rebuild the same checks passed (GREEN).
- A malformed edit in Product's monitoring component was detected by lint. The component was restored from the original source and small changes reapplied; clean lint + TypeScript build subsequently passed.

## Final local verification
- npm ci exit 0 (Mac, Node 22).
- npm run lint exit 0.
- npm test: 12 passed / 0 failed.
- npm run build exit 0. Large main chunk warning remains (approximately 642 kB minified); classic Home chunk (approximately 730 kB) no longer emitted.
- node --test scripts/public-commercial-truth.browser.mjs: 1 suite passed / 0 failed. It checked /classic redirect, /about and /product at 360x800, 390x844, 768x1024, 844x390 and 1440x900 with reduced motion, requiring HTTP 200, visible headings, correct commercial copy, no horizontal overflow and no uncaught JS errors. System Chrome used on Mac.
- git diff --check exit 0.
- Visual spot checks of mobile/desktop homepage and mobile About/Product captured on the Mac in /tmp/netso-commercial-visuals. These are viewport screenshots only, not complete section-by-section visual certification.

## Remaining release blockers
- Independent reviewer was not available in this session (separate Codex review previously failed due local model transport/plugin configuration). No independent code-review approval claimed.
- This branch and the independent partner-enquiry PR have not been merged or tested as one combined candidate.
- Full public site still requires claim audit on remaining routes, real device/Safari accessibility, animation synchronization, Web Vitals, asset provenance, external enquiry delivery, site reference visual parity and precise Vercel SHA/alias verification.
- GitHub Actions hosted jobs previously failed before runner steps; local success is not a substitute for working hosted CI.
- No production domain, DNS, public release or real outbound enquiry was changed.
