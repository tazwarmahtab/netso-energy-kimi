# Netso Energy — Unified Website Implementation & Release Plan
Date: 2026-11-09 (Asia/Dhaka)
Status: IMPLEMENTATION PLAN — NOT RELEASE APPROVAL
Canonical candidate: Vite/React Vercel repository, staging/netso-delivery-control. ChatGPT Sites is design reference, not production source of truth.
Production, DNS, shared domains and paid services are out of scope without explicit authorization.

## Non-negotiable product constraints
- Brand: black/yellow, premium architectural storytelling, performant and accessible.
- Preserve approved hero headline: “Your roof. A new energy asset.”
- Services marquee exactly: Industrial rooftops · Solar canopies · Site assessment · Engineering design · Installation. No financial or portfolio claims.
- Building-fit topics: roof structure, building loads, wind uplift, water flow, access & maintenance. Daylight is default; dusk toggle accessible.
- Commercial truth: factory-owned CAPEX; partner-funded, site-specific OPEX; residential route. No invented savings, tariff, payback, portfolio, registration, incentive, or financing claims. Grid-connected daytime solar is not backup.
- Contact must distinguish locally saved draft from delivered enquiry. Never claim submission succeeded without proof of delivery.

## Execution phases and acceptance gates
### P0 — Baseline and comparison
1. Freeze a named staging commit and deployment ID; verify preview alias targets that SHA.
2. Capture both Vercel and ChatGPT Sites at desktop 1440, tablet 768, mobile 390/360; include hero, marquee, building-fit, routes, footer, menu.
3. Produce side-by-side UX inventory, asset provenance, and keep/replace/rebuild decisions. Do not assume Sites is published/current.
Exit: screenshots, route matrix and decision log are saved.

### P1 — Functional correctness and CI
1. Diagnose GitHub Actions runner provisioning using run annotations, billing/policy settings and job logs. Do not disable checks to achieve green.
2. Reproduce and repair contact route, form validation, persistence failures, WhatsApp handoff and actual delivery semantics using non-production test data.
3. Test direct navigation and refresh on /solutions, /capex, /opex, /homes, /calculator, /contact.
4. Add or repair deterministic lint, type/build and automated tests; record command, exit code, commit SHA.
Exit: CI jobs execute and pass; independent local/Vercel build passes; enquiry behavior is truthful.

### P2 — Unified design and motion
1. Retain the canonical Vercel codebase; port only reviewed Sites improvements.
2. Refine hero timing, navigation, typography, composition, service marquee, building-fit day/dusk, page transitions and footer.
3. No new dependency without measured need; preserve existing GSAP/Lenis architecture.
4. Optimize assets, lazy loading and bundle splitting; address large main and Classic chunks without breaking routes.
Exit: desktop/mobile screenshots approved; no layout shift, broken asset or obstructive animation.

### P3 — Accessibility, mobile and performance
1. Browser test 360, 390, 768, 1024, 1440 widths; touch navigation, menu, tap targets, overflow and image crop.
2. Emulate prefers-reduced-motion: reduce; verify no forced scrolling or looping marquee; keyboard focus and skip navigation work.
3. Test day/dusk toggles with keyboard, screen reader names, pressed state and image alt semantics.
4. Capture console errors, network failures, Lighthouse/Web Vitals on representative pages.
Exit: zero critical accessibility/functionality defects; recorded performance results and justified exceptions.

### P4 — Commercial and legal verification
Review all routes, metadata, archive pages, calculator assumptions, company identity, partner claims, terms and privacy. Claims require source evidence; uncertain claims removed or marked illustrative.
Exit: signed-off copy and claim register.

### P5 — Independent release certification
Independent reviewer reruns route, mobile, motion, contact, CI, alias and security checks against the exact candidate SHA; archive screenshots and test outputs.
Exit: release certificate identifies SHA, deployment, tested URLs, results, exceptions, reviewer and rollback plan.
Only after all critical gates pass may production release be proposed for separate approval.

## Known evidence and open blockers at plan creation
- Previous Vercel deployments reported READY; this does not certify runtime.
- Previous browser checks passed core routes, marquee and daylight/dusk; contact rendering later passed.
- GitHub Actions previously failed before job steps; cause unproven.
- Mobile viewport, reduced-motion runtime and actual enquiry delivery lack verified evidence.
- ChatGPT Sites latest combined sections not confirmed deployed.
- Preview alias and newest commit must be reconciled again at certification time.

## Operating protocol
One canonical repo, one staging candidate, one release checklist. Fix issues on staging with small reviewable commits; rerun relevant tests after each change. No fabricated green checks, no production changes, no unsolicited real enquiries.
