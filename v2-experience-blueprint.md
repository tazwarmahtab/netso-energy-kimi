# Netso /v2 — experience blueprint

Date: 2026-10-11 · Baseline: `43a2c96` · Status: proposed design and implementation contract, not a shipped feature.

## 1. Outcome and scope

Make a Bangladesh commercial-building decision-maker understand the rooftop proposition, distinguish an illustration from evidence, and reach a truthful next step without watching the whole cinematic sequence.

Approved scope: upgrade `/v2` through **selective expansion**. Preserve `/`, existing routes, and their integrations. This document authorizes no code change, deployment, external submission, credential access, or purchased media generation. A future implementation needs its own go-ahead.

Recommended direction: **Institutional Cinematic Ledger**. The journey is **Roof → Structure → Economics → Operations → Assessment**. Film creates interest; readable evidence and honest economics earn the next conversation. This is a synthesis of useful mechanisms, not an attempt to stack every supplied effect.

### Non-negotiables

- One master scroll owner and cinematic playhead; native scrolling remains available. No wheel/touch interception or body lock to force completion.
- One signature transformation: sky into rooftop infrastructure. No additional glyph tunnel, planet jump, or cursor spotlight in the initial implementation.
- Semantic content, navigation, and assessment access must work when motion/media fail. Reduced-motion and small-screen versions are deliberately art-directed, not squeezed desktop animations.
- No public per-unit/per-kWh tariff disclosure. No invented live telemetry, customer evidence, bank endorsement, installed capacity, or guaranteed whole-bill savings.
- Current forest/cream/gold website identity is the working reference. Do not silently substitute the separate yellow/magenta brand skill. Brand-owner confirmation remains an implementation input.
- Existing lead helpers are not automatically safe simply because another route uses them.

## 2. Evidence ledger and corrected baseline

| Observation | Evidence | Consequence |
| --- | --- | --- |
| React/Vite/TypeScript app; GSAP, Framer Motion and Three.js already installed | `app/package.json` | Keep the stack. Standalone reference restrictions are not project-wide restrictions. |
| `/v2` mounts `FrameSequence`, `MasterStory`, `FinalCTA` | `app/src/pages/V2.tsx` | Evolve this seam rather than rebuilding a parallel page engine. |
| Master has 1,443 frames at 30fps, 1280×720; roof segment has 240 frames | `app/src/film/masterManifest.json` | Do not describe the entire experience as a 240-frame roof animation. |
| Shared frame runtime caps cache at 48 frames and concurrent loads at 6 | `app/src/components/v2/mediaFrameRuntime.ts`, `app/src/film/runtimeConstants.ts` | Counts are existing limits, not measured memory/performance assurances. |
| Finance in `/v2` is illustrative and static | `FinanceChapter.tsx`, `financeMath.ts` in `app/src/components/v2/` | An interactive calculator is a separate expansion, not existing `/v2` functionality. Defer it. |
| Assessment is an in-memory preview with optional local file selection | `app/src/components/v2/FinalCTA.tsx:65-86,106-136` | Current form says nothing is sent; preserve this truth until a secure receipt-backed service exists. |
| Topbar/hero use request language while final form is a preview | `V2.tsx:44`, `MasterStory.tsx:75`, `FinalCTA.tsx:122-129` | Align journey-level CTAs with the actual conversion contract; the form itself already has honest disclosure. |
| Legacy helper stores lead data in localStorage, logs payloads, references a Vite-exposed API-key variable, and can return success without delivery | `app/src/lib/notion.ts:29-74,117-151` | Do not import into `/v2`. Actual configured key exposure is unverified; no secret inspection is needed for this finding. |
| Runtime source manifest and public media are separate deployment inputs | `masterManifestAdapter.ts`, `app/src/film/masterManifest.json`, `app/public/assets/v2/master/` | Add an explicit asset-coherence release gate; ordinary app compilation is not enough. |
| Existing quality bar requires sky-first, one playhead, clear typography, honest mobile/static mode | `sky-hero-bar.md` | Preserve as rendered-output acceptance criteria. |

For implementation behavior, source-of-truth precedence is current source + verified renders → project documentation → supplied reference source → external descriptions. Business/regulatory truth still requires authoritative evidence and commercial approval; code does not validate a commercial claim. The code graph was stale for `/v2`; it is not evidence of the current component tree.

Existing saved screenshots are historical and not tied to a verified current build. In particular, a saved desktop capture shows “Your roof. Paying you.” while current source defines “The sky is already working.” as the opening. Do not use that capture to claim the present hero passes or fails its quality bar.

## 3. Reference coverage and use decisions

Evidence labels: **source** = supplied implementation or local documentation inspected; **text** = descriptive page content only; **unverified** = exact design/media not successfully inspected. No external design below has fresh live visual verification in this review.

| Reference | Evidence | Adopt / adapt | Explicit limit |
| --- | --- | --- | --- |
| [Fluid](https://fluid.glass) | text | Material-led architecture, editorial restraint, integration with a building | Not a verified animation/layout specification; do not copy media. |
| [Daylight](https://godaylight.com) | text | Benefit progression and clarity around the economic proposition | Not evidence for Netso savings or customer outcomes. |
| [House](https://www.getlayers.ai/layer/house), [Aerra](https://www.getlayers.ai/layer/aerra), [Northwall](https://www.getlayers.ai/layer/northwall), [AI Studio](https://www.getlayers.ai/layer/ai-studio) | unverified; catalog shell only | Revisit at design lock if a specific composition is desired | No invented descriptions of these four designs. Not a reason to block a source-grounded baseline. |
| [Shopify Design](https://recent.design/i/7yio1ee-shopify-design), [Silo](https://recent.design/i/chfdsc3-silo) | unverified; generic shell only | Optional later visual research | Do not claim these screens were studied. |
| [Sterling Gate kinetic navigation](https://21st.dev/@hardikkashiyani123456788/components/sterling-gate-kinetic-navigation) | text; license/source not cleared | Clear chapter hierarchy; brief, restrained menu entry | No full-screen theatrical navigation transplant. Check license before copying any source. |
| Supplied Stratum | source | Architectural chrome, chapter hierarchy, restrained video transitions, reduced motion | No literal brand or asset reuse; loading labels stay quiet and truthful. |
| Supplied Planet Jumping | source | Understand projected-aperture/screen-locked-media technique | Reject from initial scope: a second transition language adds cost without explaining solar. |
| Supplied Creative Studio Showcase | source | Reveal hierarchy and an optional simple CSS CTA fill | Reject cursor spotlight and per-frame `canvas.toDataURL()` mask generation. |
| Supplied MetroHero | source | Coalesced media seeking and explicit media states | Reject permanent body lock; code and introductory unlock description differ. |
| Supplied GlyphPortal | source | Measured type and precise camera/shape alignment as craft principles | No glyph portal initially. If implementation is later copied, retain Christian Katzmann 2026 MIT attribution. |
| `homecarforestArea.mp4` supplied R2 URL | unverified | No current production use | Review footage, rights, relevance and derivative sizes first. |
| Local `scroll-craft` | source | Journey grammar, depth planes anchored to the scene, one emotional peak, mobile art direction | Not a demand to animate every chapter. |
| Local `scroll-world` | source | One stage/playhead, explicit seams, posters and bounded loading | Not a second runtime; no claim existing clips form a matched-geometry continuous camera flight. |

Reference lock: existing Netso identity + supplied Stratum hierarchy + scroll-craft journey grammar. Fluid/Daylight supply conceptual cues only. Unverified URLs are an evidence backlog, not hidden dependencies or invented validation.

## 4. Chapter-by-chapter experience

### 01 — Roof: a clear proposition before a spectacle

- Opening: sky-first plate, existing two-line desktop / three-line mobile typographic discipline, one short commercial explanation. Keep the sky-to-roof transformation as the signature event.
- Copy direction: “The sky is already working.” followed by a plain explanation of a rooftop system financed, designed and operated by Netso, subject to approved commercial terms. Reconsider “Paying you” unless the actual contract pays roof owners; reduced purchased energy is not automatically rental income.
- Primary action: **Discuss rooftop feasibility**, always available in the topbar and leading directly to the assessment/contact section. Secondary text action: **See the economics**. No completion percentage is required to unlock either.
- Composition: media owns the viewport; left-aligned copy sits over a controlled veil, not over the brightest/cloud-detailed area. Small evidence label remains legible without becoming a pseudo-live status indicator.
- Motion: authored sky hold → rooftop emergence → stable roof reading state. Use existing master frames first. No arbitrary zooming of a flat skyline to simulate geometry it does not contain.
- Static mode: one intentional sky/roof composition, the proposition, evidence label and next action. It must explain the offer without the transformation.

### 02 — Structure: explain what changes on the roof

- Buyer question: “What will this do to my building?”
- Use architectural media as a large editorial plate with three concise, non-interactive annotations: structure, module surface, usable shade where relevant. Never imply that a pergola is the appropriate design for every industrial site.
- Distinguish a concept architecture from a surveyed or engineered installation. Structural suitability, roof rights, access, and site conditions belong in feasibility, not implied certification.
- If source assets support separate depth planes, use mild relative movement anchored to real edges. Otherwise use the existing still/film and a simple dissolve. Do not invent a layered cutout from an unseparated image.
- Static mode: selected poster above numbered explanatory rows. No tiny hover-only hotspots and no required 3D viewer.

### 03 — Economics: deliberately slow down and become readable

- Buyer question: “What changes in my bill, under what assumptions?”
- Warm cream ledger surface, dark type, equal-baseline comparison, explicit labels and tabular numerals. This chapter is a reading interval, not another camera trick.
- Retain the existing static illustrative comparison in the first upgrade. Expand assumptions/disclosure clarity, not calculator scope. Bar lengths and stacked totals must match the exact displayed values.
- Show the distinction between **solar-portion discount** and **illustrative total-bill reduction** beside the figure, not in an inaccessible tooltip. Keep tariffs/per-unit prices out of public copy, charts, labels and rendered metadata.
- The current model assumes spend `100000`, solar portion `0.5`, solar discount `0.3`, horizon `20`. These are implementation inputs for an illustration, not verified customer savings or a live quote. Define the currency, period and omissions before display; do not publish a long-horizon total as a guaranteed return.
- Under those assumptions, the modeled total-bill reduction is **15%**, not 30% (`0.5 × 0.3`). This arithmetic is not a forecast or contractual promise. The current chart already labels its 30% as solar-portion-only; the production ledger must place the paired statement **“30% solar-portion discount → 15% modeled total-bill reduction”** adjacent to the figures, with the inputs and exclusions visible in the same reading interval. Preserve the qualification rather than claiming it is absent.
- Let readers navigate directly here and remain as long as needed. Motion may introduce the ledger once, but must stop behind text/interaction. No auto-advance timer.
- Static mode: identical assumptions and conclusion, readable in normal document flow.

### 04 — Operations: distinguish practice from proof

- Buyer question: “Who looks after it, and what evidence supports that?”
- Use **Operations** rather than **Proof** in the chapter rail unless verified project evidence is actually available. Existing anchors remain stable (`#operations`).
- Present inspection, monitoring and maintenance as responsibilities/processes to confirm, not a fabricated dashboard. Pair every clip with its provenance class: concept, supplied context, illustrative interface, or verified project evidence.
- If no approved real project asset exists, ship a concise process explanation with honest labels. Do not compensate with invented live output, uptime, installed-base counters, logos, certificates, or named customer claims.
- Dusk footage can express stewardship/time passing but must not imply PV generation after dark. Drop non-essential context footage if it prolongs the path to contact without adding information.
- Static mode: one contextual plate and readable process rows; no pulsing “live” light.

### 05 — Assessment: an honest next step outside the film

- Keep this in normal document flow after the cinematic stage. Every CTA and skip link can reach it directly, including from failed-media and reduced-motion modes.
- **Recommended first-release contract: contact-first, no data-collection form.** Explain the inputs typically useful for feasibility, then offer the existing commercial-desk WhatsApp destination, once verified and approved, with a generic message. Label it **Open WhatsApp to discuss your roof**; opening a link is not sending a request.
- Do not put name, company, bill name, bill contents or contact details in a prefilled external URL. The visitor chooses what to share inside the external service.
- In a development/prototype preview, the existing local form may remain only with its explicit “Preview assessment request / nothing sent” labels. Do not quietly promote it as lead capture; production contact-first mode omits it rather than collecting unused PII.
- No fabricated “request received” screen, response-time SLA or delivery claim. Verify the contact destination with the owner before release, without sending a live lead during QA.
- A later real form requires the separate security contract in section 7. Backend delivery is not a hidden dependency of this visual upgrade.

## 5. Visual system and layout contract

- Existing working palette: deep forest `#07110d` / `#0d1d16`, warm cream `#f4eee1` / `#f6efe2`, ink `#101914`, restrained gold `#c6a15b`. Measure contrast over actual imagery; an attractive token pair alone is not a contrast result.
- Keep the existing Archivo / General Sans / Space Mono role assignments initially. Use only approved/licensed font assets. Font self-hosting/subsetting is a performance decision after license/source verification, not an automatic download.
- Typography: one dominant headline per beat, readable body copy, compact monospace chapter/evidence labels. No speculative mega-type that needs six awkward lines on a laptop.
- Proposed spacing scale: 8/16/24/32/48/64/96 CSS px. Use fluid outer gutters from 20px on narrow screens to 80px on wide screens, then check the real crops and topbar collisions. Values are design starting points, not passing screenshots.
- Avoid nested decorative cards. Media-led chapters are full plates; economics is an open ledger; operations is a restrained evidence/process strip; assessment is a quiet two-column composition that stacks on mobile.
- Keep the topbar subordinate. Desktop shows compact chapter links and one primary action. Mobile uses a modest accessible menu, not a theatrical full-screen kinetic takeover.
- Include Assessment in the chapter/state model. At `#v2-assessment`, mark its navigation item current and clear the previous chapter; do not leave “Proof” highlighted. Keep the primary contact CTA but avoid a duplicated assessment row inside the mobile menu.
- Menu behavior: correct `aria-expanded` and `aria-controls`, Escape closes, focus returns to trigger, links close it, and no offscreen interactive content remains focusable. Use disclosure semantics unless a true modal is necessary; if modal, implement dialog focus containment and background inertness.
- Interactive targets aim for at least 44×44 CSS px; visible keyboard focus must not be clipped by overflow. Support 200% zoom, narrow reflow and long/localized text. Do not add a language switch without complete translations and a working state model.

## 6. Runtime, scroll ownership and graceful degradation

Keep React responsible for semantic content and user state; keep high-frequency scroll/draw work outside per-frame React renders. `FrameSequence` remains the sole film controller. Use a shared chapter map for content, navigation and master-frame positions; do not duplicate offsets in separate effects.

Recommended modes:

1. **Semantic/static default:** all essential chapters are readable; no media readiness dependency.
2. **Enhanced motion:** eligible large-screen devices (initial breakpoint 1024 CSS px, fine pointer), no reduced-motion/data-saving preference, and successful media capability/readiness checks. Eligibility is a conservative starting policy to test, not a claim every desktop is powerful.
3. **Failure/static fallback:** unavailable frame, decoder failure, lost canvas/context, or sustained inability to keep up. Keep posters/content and direct chapter/assessment links; stop competing loads and animation loops.

Small screens, reduced motion and explicit data-saving prefer the static mode. Data-saver/device hints are optional signals, never the only fallback mechanism. Provide a visible **Reduce motion** control for the enhanced version, held in component state without analytics or persistent tracking by default.

### Ownership and state rules

- Preserve existing public targets: `#roof`, `#architecture`, `#finance`, `#operations`, `#v2-assessment`; inspect `#roof-transform` usage before changing it. Human-readable labels may change without breaking links.
- Resolve hash navigation, chapter clicks, browser back/forward, resize and refresh through one owner. Coordinate with `App.tsx`'s `ScrollManager`; two independent `scrollIntoView` effects are not a contract.
- Map navigation to the semantic chapter and its scroll interval. Do not force a visitor to traverse all intermediate media to reach a distant hash.
- Track requested frame separately from displayed frame. Never label an old frame as if a new scene has rendered. On a cold distant jump, show that chapter's poster and copy promptly while fetching its nearest required frame—not hundreds of intervening frames.
- Only activate enhanced overlapping scenes after the controller is ready; inactive scenes become `inert`/`aria-hidden` together. Static mode removes those exclusions for the essential content. Decorative scene duplicates stay excluded in both modes.
- On a mode switch or media failure, preserve the semantic chapter and a valid focus target; remove pin spacers/listeners/RAF loops and restore normal flow. Do not reset the visitor to the hero or lose focus into hidden content.
- React StrictMode mount/unmount, route changes and rapid resize must not leave duplicate triggers, stale promises or orphaned image bitmaps. Release every cache lease and close decoded bitmaps when no longer needed.
- No universal “loaded” preloader waiting for 1,443 frames. Render the first poster and text before optional motion work; prioritize requested/current frames and bounded nearby lookahead.
- Source gaps requiring explicit fixes: the current width fallback only applies to legacy sequences, not this master; frame-error handling is limited to the initial gate; releasing a loaded lease does not immediately release its decoded surface. These are source findings, not verified device-level failures. Test the new mode/error/ownership contract on the real master route.
- Define failure thresholds during P2 and test with fake timers: starting target is a chapter poster immediately on a failed/late requested frame, at most one retry for that target, and static fallback after 3 seconds without a usable current-chapter frame, retaining its poster meanwhile. Cancel obsolete target retries when navigation changes. No indefinite frozen previous-chapter screen.
- Render transition provenance in a stage-level evidence layer derived from the displayed segment, outside the scene wrappers hidden during bridges. Keep a stable accessible description rather than announcing every frame through an ARIA live region.
- Reduced motion means immediate hash navigation too: override the shared smooth-scroll behavior for `/v2` without adding another owner or changing unrelated route semantics.

This is progressive enhancement for a working React app under media/motion failure, not a claim that the current client-rendered app already supports JavaScript-disabled rendering. If no-JavaScript/SSR is a requirement, scope and verify it separately.

## 7. Commercial truth, privacy and optional future delivery

Before publication, the commercial owner approves a claim register: exact public sentence, evidence pointer, scope/conditions, validity date and approving owner. Existing repository positioning (customer zero upfront CAPEX, BOO/RESCO and 20-year PPA) is not independent validation of terms for every site. No new tariff/regulatory assertions should be introduced by this design work.

For finance, use one pure calculation source and fixtures shared with displayed labels. Test zero spend/solar share, boundary percentages, non-finite values and rounding. State what an illustrative horizon calculation excludes (for example escalation, degradation and changing usage); do not invent terms merely to make the example more attractive.

If a real assessment form is separately approved later:

- Route requests through an approved server-side service, keeping provider credentials off the client. No `VITE_*` secret, direct browser-to-provider credential, legacy localStorage lead ledger or payload console logging.
- Define the receiving team, provider, retention/deletion rules, access policy and notice before collecting data. Do not silently reuse existing records or migrate private lead data.
- Start with minimal contact/facility information; defer bill uploads unless operationally necessary. If uploads are added, enforce content type, actual file signature, size, access controls and malware/quarantine policy server-side. Client MIME/5 MB checks are only user feedback.
- Use server validation, abuse/rate limits, an idempotency contract, and a durable receipt. UI distinguishes accepted receipt, confirmed downstream delivery, retryable error, invalid request and timeout/unknown status. A timeout does not justify automatically duplicating a lead.
- Test with synthetic fixtures and a staging/test destination; live sends require explicit authorization. Track coarse event/status counts only, with no form values, bill names, emails or phone numbers in analytics/logs.
- On offline/network failure keep inputs in memory only for the current page if appropriate; do not promise later delivery unless a real, disclosed durable queue exists.

Separately flag the legacy homepage helper to the repository owner. Preservation of `/` means this plan does not silently repair it. It also does not certify it safe for production. If a deployed credential is confirmed exposed through an authorized audit, stop promotion and follow credential rotation/incident handling, not a cosmetic-only patch.

## 8. Asset and publication contract

Reuse existing authored frames before commissioning new film. The initial implementation preserves the 1,443-frame master and its existing frame bytes; new phone posters are separate derivatives. Do not add portal frames or regenerate the master as incidental polish. Any later master replacement requires an explicit media-version change and renewed timeline/asset approval. Each production asset needs: stable ID, source/rights status, provenance label, dimensions/variants, crop/focal point, byte size, poster, segment endpoints, and checksum/version. Unlicensed reference media never becomes a fallback asset.

- Inspect both endpoints of every seam. Approve a dissolve when that is what the assets support; reserve “continuous camera move” for actual matching geometry, position and lighting.
- Produce phone-specific posters from approved assets. Keep text independent of video/canvas; no bill figures baked into a film that can diverge from the UI.
- Source manifest, public receipt and media directories must describe one version: frame range/count, frame naming, dimensions, posters, fps, segment boundaries and file existence. Verify the built/deployed URLs as well as the local source tree.
- Publish manifest and media atomically or to immutable versioned paths, then promote the HTML referencing them. Keep the prior complete release for rollback; never deploy new JSON pointing at old/missing frames.
- Missing or corrupt assets fail the release gate. Runtime still degrades gracefully because a CDN/cache/network can fail after a valid release.

### Proposed performance budgets — targets, not measurements

Use a production build and fixed profiles; take three cold runs and three warm runs for baseline and candidate. Record browser/version, device, viewport, network/CPU profile, build SHA, media version and route. Compare like-for-like; lab samples are not field-percentile claims.

| Gate | Initial target / measurement |
| --- | --- |
| First useful page | First poster, headline, chapter links and contact access do not wait for sequence decoding. |
| Loading/interaction/layout | Lab LCP ≤2.5s, scripted interaction latency ≤200ms, CLS ≤0.1 on the agreed profile. Label lab measurements honestly; field p75 requires real traffic. |
| Critical transfer | Target ≤1 MiB compressed through initial usable static viewport, excluding deferred film; measure actual route bundles/fonts/poster, not only the poster. Missing budget is a reason to reduce payload, not hide requests from measurement. |
| Static/mobile transfer | Zero master-sequence frame fetches and zero animated canvas loops in static, reduced-motion or data-saving mode. Lazy-load lower posters with explicit dimensions. |
| Frame ownership | Keep concurrency ≤6 and cache entries ≤48 as upper bounds, then budget by decoded size including in-flight reservations. Target ≤160 MiB estimated owned RGBA frame bytes on the enhanced desktop path; reduce entries/resolution to fit. Browser overhead/copies must be separately profiled. |
| Frame memory caution | At 1280×720×4 bytes, 48 decoded frames alone cost 168.75 MiB before in-flight frames/canvas/overhead. Existing count cap therefore cannot itself satisfy the proposed byte budget. |
| Main-thread behavior | No animation-generated task ≥50ms in the scripted chapter traversal; avoid per-frame layout reads, React updates and data-URL serialization. Test rapid reverse scroll and cold distant jumps. |
| Lifecycle | After three `/` ↔ `/v2` cycles, no duplicate controllers, outstanding leases from unmounted sequences, or monotonic retained bitmap growth. Record measurements rather than assuming cleanup. |
| Homepage isolation | `/` must not fetch `/v2`-only motion modules or frame assets. Inspect the current static import in `App.tsx`; introduce a narrowly scoped route boundary only if the bundle graph confirms the need. Compare homepage transferred JS and interaction/parse costs against baseline. |

Benchmark on desktop Chrome and Safari, plus physical iOS Safari and an ordinary Android device for the static path. Include 320×568, 390×667 and 390×844 mobile, 768×1024 tablet, 1366×768 laptop and 1920×1080 desktop; add landscape and 200% zoom. Specifically remove viewport-height clipping from the static finance layout; all assumptions/disclosures must remain in reachable normal flow. A missing device run stays marked unverified.

## 9. Delivery plan, file boundaries and sequencing

Implementation roles below describe future ownership, not agents already executing. No new framework, smooth-scroll library or animation runtime is required.

| Phase | Owner / files | Deliverable and exit gate |
| --- | --- | --- |
| P0 — truth and baseline | Coordinator + commercial owner; this blueprint, `sky-hero-bar.md`, claim/asset register | Approve brand, copy and contact-first contract; capture current build at fixed viewports; establish performance baseline and source/public-media match. Unverified optional references do not stall baseline work. |
| P1 — semantic and static path | UI owner; `V2.tsx`, `MasterStory.tsx`, `FinalCTA.tsx`, scoped `v2*.css` | Complete accessible static story, contact-first CTA labels, explicit provenance, readable economics, stable hashes and menu behavior. No film requirement. |
| P2 — runtime contract | Runtime owner; `FrameSequence.tsx`, `masterStoryHelper.ts`, `mediaFrameRuntime.ts`, `frameSequenceMath.ts`, film runtime constants | One owner for mode/navigation/playhead; bounded frame loads and bytes; poster-backed jumps, cleanup and fallback. Unit/integration failure cases pass. |
| P3 — art direction and media | UI + media owners; scoped styles, reviewed manifest and approved derivatives | Sky/roof signature and controlled reading intervals. Every seam/poster/crop verified; no unjustified replacement of the master or unchecked regeneration. |
| P4 — proof and economics | Content owner + UI owner; `FinanceChapter.tsx`, `financeMath.ts`, story copy | Commercial sign-off, proportional chart, disclosures, source-backed evidence labels. No simulator/telemetry expansion. |
| P5 — integration and release decision | Coordinator; existing checks and browser test artifacts | All required gates pass or motion is cut back to a passing static implementation. Confirm `/` and existing routes unchanged; capture rollback instructions. Deployment remains separately authorized. |

Dependency order: P0 → P1; P2 can proceed in parallel with P1 once the chapter/mode contract is fixed; P3 joins their verified outputs; P4 can proceed alongside media work after commercial inputs; P5 integrates all. If agents are later used, assign non-overlapping files and one integration owner. Do not have UI and runtime agents simultaneously edit `FrameSequence.tsx` or shared CSS.

Shared-file rule: changes to `App.tsx`, `index.css`, shared Wordmark/WhatsApp controls or existing lead routes require a demonstrated `/v2` necessity and explicit regression coverage. Do not edit `app/.21st/`, global configuration, unrelated route copy, or private memory.

## 10. Verification and rollback

Run from `app/` after implementation, retaining actual receipts:

```sh
npm run build
npm run lint
npm run test:film:master
npm run film:verify
npm run film:master:verify
```

These scripts exist in the baseline package. They do not collectively prove browser UX, security or conversion. Add focused tests using the existing project tooling; any new test dependency needs a specific justification.

Required behavioral matrix:

- Direct load to every chapter hash, cold distant jump, reverse scroll, keyboard activation, browser back/forward and refresh with a hash; no competing scroll controller.
- Static-by-policy, user-selected static, reduced-motion changes while mounted, mobile rotation, resized viewport, unavailable network, slow frames, 404/corrupt frame and canvas failure; content/contact remain usable.
- Keyboard-only menu/CTA/form-preview flows where applicable; no hidden focus targets, clipped focus rings, inaccessible error messages or context loss when switching mode. Screen-reader heading/order check and measured contrast over media.
- If the development-only preview form is retained, each invalid field has a stable error ID and `aria-describedby` relationship; the aggregate status alone is insufficient. Production contact-first mode has no such form.
- Chart arithmetic and scale agree; a 30% solar-portion discount must never be announced as a 30% whole-bill reduction when only part of the bill is offset. Check visible copy, accessible labels and metadata.
- No client credential, provider-secret string, new localStorage PII or payload logging in the production artifact. Verify by safe automated assertions that report presence/absence, not secret values.
- Contact-first mode opens the intended approved destination with generic text; no automatic send, attachment or tracking payload. Optional future backend tested separately against its receipt contract.
- Confirm `/` and existing links/flows behave as baseline without generating real leads. Existing defects are recorded, not silently “passed” or mixed into this change.
- Visual captures: opening, roof reveal, structure, economics, operations, assessment, open menu, static and error states at the fixed viewports. Run `sky-hero-bar.md` as a binary checklist against the current build, not historical screenshots.
- Validate `/v2` title, description and social-preview claims independently of the global home metadata. Route-specific social metadata must be delivered in the actual fetched HTML if preview crawlers cannot execute the client; otherwise record that limitation rather than claiming a React title update solved it.
- Verify loading/poster/error colors against sky-first art direction. A blue-gray sky-supporting fallback is not automatically a brand defect; off-palette or unreadable rendered states require evidence and correction.

Rollback: keep `/` untouched and retain the previous complete `/v2` application + immutable media version. First degrade enhanced motion to the verified static path if only runtime budgets fail; if content/navigation/conversion regresses, restore the prior complete release rather than mixing old frames and new manifests. Release metadata must identify both app and media versions. No destructive reset or deploy occurs during this planning task.

## 11. Review disposition and remaining gates

### Independently raised findings checked against source

1. **Conversion mismatch — accepted with precision.** The current final form already discloses “nothing sent”; the issue is upstream request language and any future claim of actual submission. Resolve through contact-first production behavior, not by pretending the current preview delivers leads.
2. **Legacy credential/PII path — accepted.** Source contains the hazardous pattern; configured/deployed credentials are not verified. Exclude the helper from `/v2`; separately escalate its existing consumers.
3. **Asset coherence — accepted as a release risk.** Verify source/public/deployed artifacts as one version; no actual deployed mismatch has been demonstrated in this planning work.

The complete earlier reviewer finding list has now been recovered. All 18 items have a disposition in [v2-review-log.md](v2-review-log.md); corrections are planning decisions, not implemented fixes. In particular, `/v2` does have its own WhatsApp links despite excluding the shared homepage widget, and existing dispatch elsewhere is not certified reliable by its mere presence.

Gemini review was explicitly approved and attempted with a sanitized blueprint and tool-disabled configuration on 2026-10-11. It stopped with authentication error code 41 because the selected Gemini API authentication could not find its required API key. No Gemini verdict was returned; review remains pending. No credentials were searched for, copied or placed in these files.

The user subsequently replaced that request with an OpenCode CLI review and clarified **free model only**. Two earlier CLI-listed free models were unavailable; `opencode/nemotron-3-ultra-free`, verified in the live catalog, was rejected by the free-tier access gate even using the current official temporary CLI `1.19.0` (HTTP 403, non-retryable). At that stage no external model review was returned. See the review log for the redacted attempt record. Do not claim Gemini, Muse or the earlier OpenCode free-tier attempts reviewed this plan; the completed Inkling review is separately identified below and remains source-limited.

The user additionally requested `opencode/muse-spark-1.3-contributor-free`. It is live-listed, but its request through official CLI `1.19.0` returned the same non-retryable free-tier HTTP 403. No Muse Spark review was returned.

The subsequent Claude Code CLI request for **Inkling 1M** was blocked: Claude Code `2.1.287`, tried with provisional identifier `inkling[1m]` in tool-disabled safe mode, reported no login and an unrecognized-model diagnostic, with zero API time/tokens and empty model usage. No review occurred; neither Inkling identity nor a 1M context window was verified.

The user's latest selection before the free-model instruction was **GPT-6.1 Sol**. A single tool-disabled request through official OpenCode CLI `1.19.0`, model `opencode/gpt-6.1-sol`, returned non-retryable **HTTP 402: insufficient account funds**. No model verdict was returned. That route was superseded by the successful free-model review below; no billing changes were made.

### Inkling Free review, completed

On 2026-10-11, OpenCode `1.19.0` reviewed this sanitized blueprint with `openrouter/thinkingmachines/inkling:free`, the OpenRouter model `thinkingmachines/inkling:free`. OpenRouter's authenticated model catalog reported zero prompt/completion pricing and a 1,048,576-token context window. The request completed with 11,967 total tokens (8,346 input, 1,554 output, 2,067 reasoning), cost `$0`, and no tool calls. The model explicitly said it did not run a build, browser audit, secret inspection, or external reference verification.

Inkling's verdict: proceed to P0–P1, but do not promote enhanced motion until three corrections are enforced: lock the contact-first conversion contract and exclude the legacy lead helper; enforce runtime/media coherence with poster-backed cold jumps, bounded memory and atomic releases; and make the solar-portion versus modeled total-bill arithmetic adjacent and explicit.

All ten Inkling findings map to the blueprint as follows: (1–3) sections 7–10 already prohibit legacy imports, define contact-first behavior, and require atomic assets/poster fallback; (4) section 4 now requires the adjacent 30% → 15% statement and exclusions; (5) sections 3 and 8 lock evidence/identity, licensing and media-version changes; (6) sections 6 and 8 define the byte target, mobile policy, later-frame recovery and tests; (7) sections 5 and 10 require normal-flow finance and 200% zoom/short-height checks; (8) sections 5–6 add Assessment state and disclosure keyboard behavior; (9) sections 3–4 require approved copy and provenance labels; (10) this review disposition records that unverified references and failed review attempts cannot be presented as evidence.

No new scope was added. Inkling's justified cuts agree with the existing rejection of the calculator transplant, extra cinematic languages, live telemetry/SCADA, forced scroll, universal preload, copied unverified references and a hidden lead backend.

### Scope decisions and rejected alternatives

- **Keep:** existing master runtime, sky-first quality bar, current identity, semantic finance, honest footage labels, direct contact access.
- **Expand selectively:** accessible chapter navigation, explicit mode/failure contract, byte-aware media budget, evidence/copy consistency and release checks.
- **Reject initially:** stacked portal/glyph/spotlight effects, full worldflight rebuild, mandatory preloader, forced scroll, new live SCADA/dashboard, another 3D viewer, calculator transplant, new backend hidden inside visual polish.
- **Defer:** unverified reference-specific layouts, copied component source pending license, purchased/generated film, real lead uploads and delivery until independently scoped/approved.

### State of verification

Completed here: source/document inspection, branch/baseline check, reference evidence classification, historical screenshot inspection, recovered-review adjudication and planning. Python arithmetic checks matched 3/3 derived figures (roof-segment count, estimated RGBA cache size, illustrative whole-bill percentage). No product code changed; the coordinator has not run a new app build, runtime test, live browser audit, performance baseline, secure delivery test or deployment in this planning work. Reviewer-reported build observations are not substituted for fresh coordinator receipts.

Remaining release gates: commercial/brand approval, verified contact destination, asset rights and coherence, current rendered checks, performance/accessibility evidence and regression testing. The plan is actionable without claiming those gates already passed.
