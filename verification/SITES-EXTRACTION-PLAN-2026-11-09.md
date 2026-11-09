# Netso Sites → React/Vite extraction and implementation plan
Date: 2026-11-09
Status: PLANNED — Sites live inspection blocked, not a verified visual diff
Scope: staging only. No changes to master, live website, or ChatGPT Sites.

## Provenance and limitations
- Target Sites project: appgprj_6ada8ec2df948191a3770a74fc8d39a0.
- Known Sites URLs: https://netso-cinematic-review-oct23.taz-buildz.chatgpt.site and https://netso-cinematic-review-oct23.steadylyric34.chatgpt.site.
- Neither Sites URL was accessible to the current web reader. Connected browser required an originating browser context; Browser Use had insufficient credits. Therefore current Sites DOM, exact visual appearance, and deployed section order are NOT independently verified.
- The following is a requirements-based extraction map based on approved project decisions, NOT an assertion about the live Sites deployment.
- Existing GitHub repository: tazwarmahtab/netso-energy-kimi; React/Vite application in app/. The master source currently contains unsupported 30%-discount and self-financing statements. Do not copy those into the recovery build.

## Ordered extraction map
| ID | Source/design element | Target implementation | Acceptance evidence |
| --- | --- | --- | --- |
| S01 | Hero headline 'Your roof. A new energy asset.' and cinematic loader/intro | app hero + global intro controller | Desktop/mobile screenshots; reduced-motion path; no blank first screen; correct copy |
| S02 | Service marquee: Industrial rooftops · Solar canopies · Site assessment · Engineering design · Installation | Accessible looping strip below hero | Exact five strings; duplicate aria-hidden; no focus trap; reduced motion; slow readable movement |
| S03 | Building-fit split section with roof structure, building loads, wind uplift, water flow, access & maintenance | React split layout and concept scene | Five topics; daylight default; dusk transition; mobile image framing; no overlay controls |
| S04 | Day-to-night architecture visual | Scroll-scrubbed scene with fallback | Starts daylight, ends dusk; reversible scroll; stable geometry; no flashing |
| S05 | Original Netso logo, black/yellow palette, navigation | Shared design tokens and shell | Brand comparison against supplied logos; keyboard navigation; responsive header |
| S06 | Section/page transitions | GSAP + Lenis orchestration, cleanup | Reversible transitions; no duplicated scroll controllers; reduced-motion support |
| S07 | Hero pacing and quality | Optimized media + slower scrub | No low-resolution video at target breakpoints; no blocking initial load |
| S08 | Mobile parity | Responsive component variants | 360/390/768/1440px review; no clutter, clipped scene, or oversized overlays |
| S09 | Copy and commercial model | Model-neutral home, /solutions routes for CAPEX, OPEX, homes | No unsupported tariff, savings, project count, customer, financing, or backup claims |

## Integration workflow and gates
1. Capture current Sites desktop and mobile screenshots, DOM text, animation/video recordings, assets, breakpoints, and navigation using an authenticated browser. Record capture timestamp and version. STOP if unavailable; do not invent visual parity.
2. Build source-of-truth matrix for each Sites section: approved copy, visual, behavior, assets, route, responsive rules, animation timeline. Record confidence: observed / user-approved / inferred.
3. Create a small feature branch from staging/netso-delivery-control for each S01–S09. Never cherry-pick PR #2–#5 wholesale.
4. RED: add focused regression/acceptance tests; prove failure before implementation. GREEN: implement minimal behavior. REFACTOR: remove duplicate motion logic and dead code.
5. Execute npm ci, npm test, npm run lint, npm run build from app/ on the exact commit; independently review results. Vercel 'Ready' alone is insufficient.
6. Verify with real browser on desktop and mobile: accessibility, reduced motion, screenshots, scroll/transition replay, console/network, performance, and copy. Keep artifacts tied to commit SHA.
7. Observatory compares source commit, artifact digest, deployment environment, smoke evidence, gap register, and approved copy. Any drift blocks release.
8. Merge only to staging integration after gates pass. Publishing to ChatGPT Sites and production are separate explicit approval gates.

## Outstanding blockers
- No authenticated browser capture of current Sites version.
- GitHub Actions jobs failing before runner assignment, exact account-level cause unverified.
- PR #2/#3/#4/#5 are not mergeable; commercial claim risks require manual salvage.
- No proven GitHub ↔ Sites source/deployment mapping.
- Current GitHub master website content does not satisfy approved copy rules.

## Definition of done
Exact approved copy, visual/interaction parity backed by real browser evidence, responsive parity, all tests/lint/build green on the exact SHA, independent reviewer evidence, zero open P0/P1 gaps, no unapproved commercial claims, observatory healthy, and explicit staging publication approval.
