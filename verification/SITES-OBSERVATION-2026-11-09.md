# Observed Sites / Vercel cross-check — 2026-11-09

Method: TinyFish JavaScript-rendered fetch, fresh request. This is text/metadata evidence, not visual or interaction QA.

## ChatGPT Sites
- Both known Sites URLs redirect/canonicalize to https://netso-cinematic-review-oct23.taz-buildz.chatgpt.site/.
- Homepage returns fallback: 'This page couldn’t load. You can reload it or contact Netso directly about your site.' It does not expose hero/marquee/building-fit DOM for extraction. This could be a runtime or automated-fetch issue; browser confirmation needed.
- Homepage title metadata: 'Your roof. An energy asset. | Netso Energy'. Approved hero copy is 'Your roof. A new energy asset.' — do not silently substitute.
- /contact/ successfully returns content and navigation. Therefore the entire Sites origin is not uniformly inaccessible.
- Contact route exposes /capex, /opex, /home-pergola, /solutions, /how-it-works, /request-assessment, /calculator, /partners, /about, /licenses, /insights, /careers and legal routes. Route existence/functionality beyond /contact is not yet verified.
- Contact content includes legal entity text 'Netso Energy Limited'; legal identity must be checked against Transo Ltd before copying. Avoid carrying any personal contact information into public audit logs.

## Existing Vercel preview
- https://netso-energy-kimi-preview.vercel.app/ returns substantial homepage content.
- Hero reads 'Your roof. Now an energy asset.' and claims Netso finances/owns the asset.
- Commercial proof blocks claim 30% below-grid tariff, zero client CAPEX, 20-year floating-discount contract, and illustrative multi-lakh savings. These are NOT approved universal site claims.
- 'Architecture' section has day/dusk visual labels and building-focused explanatory copy. This may be a useful interaction reference but is NOT the approved five-topic building-fit copy.
- Operations and structural descriptions contain categorical attachment, warranty, O&M and timeline statements requiring site-specific review.
- Do not transplant Vercel commercial copy or treat it as the Sites design.

## Implementation decisions
1. Treat current Sites homepage as an inspection blocker, not a verified baseline.
2. Compare Sites /contact and other routes individually to identify what can be observed without extrapolation.
3. Use approved Sites Section 01–03 requirements as the copy/behavior authority; capture real Sites visual output when available.
4. Keep current Vercel preview as an alternative visual/interaction reference only, with its commercial text quarantined.
5. Add route-level smoke probes for homepage and /contact, assert presence of intended content and absence of fallback text, then perform real browser screenshots at desktop/mobile widths.
6. Do not publish or merge into master without verified browser parity, independent tests, and explicit release approval.
