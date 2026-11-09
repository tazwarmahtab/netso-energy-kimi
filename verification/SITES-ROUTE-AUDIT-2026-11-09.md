# Sites route audit and React migration matrix — 2026-11-09

Evidence: fresh JavaScript-rendered TinyFish fetch of ChatGPT Sites routes. This is observable text, NOT visual/interaction testing. Base: https://netso-cinematic-review-oct23.taz-buildz.chatgpt.site.

| Route | Observed | Porting decision |
|---|---|---|
| / | Fallback 'This page couldn’t load' | BLOCK: diagnose runtime; approved S01–S03 requirements govern |
| /contact | Rendered contact desk and navigation | Keep privacy-first enquiry; check legal entity text |
| /request-assessment | Rendered same contact-style desk | Keep simple enquiry; avoid initial sensitive uploads |
| /solutions | Three routes: factory CAPEX, partner-funded OPEX, purchased home pergola | PORT as information architecture; keep commercial models separate |
| /capex | Factory borrows/owns; Netso development-services subcontract; no Netso construction funding/guarantee/PPA | PORT after legal/commercial review; lender order is site-specific, not a financing offer |
| /opex | Balance-sheet partner owns; customer buys daytime power; terms site-specific | PORT; no generic tariffs/discounts/term or Netso ownership claims |
| /how-it-works | Assess → choose commercial lane → project process | PORT route structure; verify detailed copy |
| /calculator | User-entered assumptions; no prefills or financial offer; plant size needs layout assumptions | PORT conceptual model; test edge cases and math independently |
| /home-pergola | Purchase route, interactive orbit/day/night lighting reference | PORT separate residential route; interaction must be tested on device |
| /about | Development-stage, no operating portfolio claim | PORT factual framing; correct company name |

## New P0 findings
- Sites homepage is failing in automated rendering while several interior routes render: isolate root-route failure, do not assume whole origin down.
- Legal entity inconsistency: /contact and /request-assessment say 'Netso Energy Limited'; /about says 'Netso Energy Ltd'. Approved company identity is Transo Ltd trading as Netso Energy; require explicit verification before changing public legal copy.
- Existing Vercel homepage uses unsupported Netso ownership/financing and 30% discount claims; do not import.
- Homepage metadata says 'Your roof. An energy asset.'; approved hero says 'Your roof. A new energy asset.' Confirm exact copy during visual capture.

## Implementation backlog
P0-01: independently reproduce homepage fallback in browser, capture console/network and root-route errors.
P0-02: legal-entity copy audit across all routes.
P0-03: build /solutions, /capex, /opex route shell from approved Sites structure without invented claims.
P0-04: migrate calculator only with test-first deterministic sizing/self-consumption logic and explicit unknown states.
P1-01: inspect residential 3D orbit and daylight controls with desktop/mobile and reduced motion.
P1-02: verify contact CTA routing and no sensitive document intake.
P1-03: visual capture + animation timeline extraction for Sections 01–03.
P1-04: compare all routes for navigation, semantics, SEO, accessibility, responsiveness and source-to-deployment provenance.

## Release gates
Each migrated route requires approved copy, a test that fails before implementation, passing unit/build/lint, independently reviewed browser screenshots and interactions, observatory artifact digest and staging-only approval. No automatic promotion to master.
