# NETSO GLASS — v3 deep dive, section by section

**Route:** `/` — Glass v3 is the canonical homepage. The previous homepage is preserved at `/classic`; `/glass` remains an alias.
**Date:** 2026-10-21
**Method:** Refero Styles research → decision ledger → rebuild section by section → verification loop
**Stack added:** `lenis@1.3.27` (smooth scroll), GSAP `ScrollTrigger` (already present), zero new media

---

## 0. The brief, decoded

The request was to deep-dive every section, evaluate each element, and build "our version" as the
absolute best glass treatment — researched from recent references, iterated, using GSAP + Lenis +
React and the repo's design skills.

Two interpretation decisions were made and are worth stating:

1. **"Glass version" = a glassmorphic material system**, not a literal glass product. The site already
   leans on `backdrop-filter` in three places (nav, chips, telemetry dock) without a governing system.
   v3 makes glass the *architecture*: every surface is a pane, and depth comes from surface stacking
   rather than shadow.
2. **"Triple reference" = three locked references**, which is also what the repo's `refero-design`
   skill requires ("Do not copy one reference… do not average them into a safe middle"). Three were
   locked, one was made dominant. Details below.

---

## 1. Research: what was actually looked at

Refero Styles was reachable and used as the research layer. Three systems were read in full
(palette, type scale, spacing, shape, do/don't) plus the current gallery for recency:

| Reference | What it is | What was taken | What was refused |
|---|---|---|---|
| **Auros** (`styles.refero.design` → Auros) | Abyssal fintech terminal, bioluminescent orbs | The **surface stack** discipline: `#011d1c → #012624 → #003734`, *no drop shadows*, depth from half-tone shifts; 16px cards / 6px small; medium-only display weight; uppercase tracked labels | Teal hue, aurora gradient, pill-morph button |
| **Superhuman** | Golden-hour editorial dashboard | **Translucent UI floating on photography**, parchment-not-white canvas, hairline borders, `backdrop-filter: blur(12px)` header that materialises on scroll, weight-460 display | Maroon/violet palette, 16px radius on everything |
| **Wise** | Deep moss with a lime voltage | The **single-voltage rule**: one chromatic accent against a green field, used for action and data only | Lime, the aggressive rounding |

Supporting gallery signals (recent, same week): *Quiet luxury*, *Deep forest green*, *Cream paper &
serif*, *Linear-style SaaS*, *Editorial magazine*. These confirmed the direction was current rather
than 2021 glassmorphism.

**Synthesis:** Netso keeps its own forest/gold/cream identity, but adopts Auros' depth model,
Superhuman's photographic glass, and Wise's voltage discipline. The result is *forest glass* — dark
green water, warm light, one gold voltage.

### What "AI glass" gets wrong, and the rules that prevent it

| Common failure | The rule in v3 |
|---|---|
| `backdrop-blur` on a flat colour, which reads as grey mud | Glass only ever sits **over photography or a gradient**, never over a solid panel |
| White borders at 30% opacity everywhere | Border is **11% cream**, and a separate 1px specular is inside the edge |
| Drop shadows doing the work of hierarchy | **No elevation shadows.** Depth is `void → abyss → kelp → lift` surface shifts |
| Gold used as a fill for large areas | Gold is **light**: 1px edges, specular sweeps, numerals. Never a background block |
| Every card animates on scroll | Reveal is **one lift, 26px, 900ms**, staggered in 70ms steps — never a bounce |
| Glass on mobile = jank | Blur radius **drops 22px → 14px** under 640px, and flat-fills when `backdrop-filter` is unsupported |

---

## 2. Decision ledger

| # | Decision | Value | Traces to |
|---|---|---|---|
| 1 | Canvas | `#040d09 → #071a13`, one warm radial light at top | Auros surface stack + Superhuman warm canvas |
| 2 | Surface steps | `--g-void #040d09`, `--g-abyss #071a13`, `--g-kelp #0b2419`, `--g-lift #10301f` | Auros (half-tone stack, not grey) |
| 3 | Glass fill | 168° linear, 8.5% → 2.2% cream | Superhuman translucent UI |
| 4 | Glass edge | 1px `rgba(255,250,240,0.11)` + inset specular white/black | Superhuman hairline borders |
| 5 | Signature move | **Specular sweep**: a gold highlight crosses the pane border on hover/enter | New; derived from Auros' rationed luminosity |
| 6 | Accent | `--g-gold #c6a15b`, hi `#f0d9a4`, lo `#8a6b31` | Existing brand token, kept |
| 7 | Type | Archivo `wdth 78 / 520` display, Space Mono 10.5px/0.19em labels, General Sans body | Existing brand system; Auros' tracked-label discipline |
| 8 | Italic accent | Instrument Serif italic for the emphasised phrase in every headline | Refero "Cream paper & serif" / Quiet luxury signal |
| 9 | Shape | 6 / 12 / 16 / 22 / 30 / pill | Auros (two-value vocabulary) widened to five for panels |
| 10 | Motion | 900ms `cubic-bezier(0.16,1,0.3,1)`, 26px lift, blur→0 | Superhuman restraint |
| 11 | Scroll | Lenis 1.15s duration, GSAP ticker integration, `anchors: true` | Brief (GSAP + Lenis) |
| 12 | Chrome | Nav condenses at 40px; 2px gold progress hairline | Existing site's progress line, refined |

---

## 3. Section-by-section audit

Legend — **Verdict**: `KEEP` (good as is), `FIX` (right idea, wrong execution), `REPLACE` (rebuilt in v3).

### 3.1 Hero — `CanvasHero.tsx` (411 lines) → `GlassHero`

| Element | Current implementation | Evaluation | Verdict |
|---|---|---|---|
| Structure | 380vh section, sticky 100svh | 3.8 screens of scroll before the first real content. The reward is a 240-frame scrub, but on a mid-range Android the decode competes with LCP | REPLACE |
| Media | 240 JPEGs (14 MB) + video, drawn to canvas | Visually strong; terrible first-paint economics. 14 MB is most of `public/` | REPLACE |
| Headline | "Your roof. / Now an energy asset." | **The best line on the site.** Kept verbatim | KEEP |
| Sub-copy | Financed + ৳0 CAPEX | Correct and claims-safe | KEEP |
| Telemetry dock | Glass card: 64.8 kW, 81.4% PR | Readings look like live plant data on an uncommissioned site — a claims risk that `fix/de-risk-claims` had to patch | FIX |
| CTA | 1 primary | No second path for the visitor who wants numbers before a call | FIX |
| Motion | Frame scrub + text reveal | Impressive, but the only motion idea on the page repeated three times | REPLACE |

**v3:** a 100svh hero with **three depth planes** — photograph (8% parallax), a pointer-held warm
light, and a typographic plate that fades as you leave. The telemetry dock becomes a *commercial
shape* panel: `30% / ৳0 / 20yr`, each with an explicit "illustrative, binding terms in the PPA"
footnote. Two CTAs: assess, or model the economics first.

> Tradeoff, stated plainly: v3 gives up the 240-frame cinematic scrub. It buys a hero that is
> ~14 MB lighter, paints in one round trip, and still moves. If the film is wanted back, it can be
> re-grafted into the hero media slot without touching the rest of the system.

---

### 3.2 Marquee — `MarqueeTicker.tsx` → `Marquee` primitive

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Items | 10 claims, 16px padding, CSS keyframes | Correct pattern. One item ("IDCOL CONCESSIONARY DEBT QUALIFIED") was an unhedged claim | FIX |
| Edge treatment | Hard cut at viewport | Reads as a bug on wide screens | FIX |
| Interaction | None | A 46s loop with no pause is hostile when it carries numbers | FIX |

**v3:** 7 claims, mask-faded at both edges, pauses on hover, reduced-motion stops it, duplicated items
are `aria-hidden` so screen readers hear the list once.

---

### 3.3 Architectural transformation — `ArchitecturalTransformation.tsx` (186 lines)

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Layout | Two images + gold blur orb | The day/dusk pair is the single best asset on the site; the orb is decoration doing no work | FIX |
| Type | Five different sizes in one header block | Header, eyebrow, h2, italic accent, body — the italic accent lands, the rest is noisy | FIX |
| Proof | No engineering detail | It says "designed to work with the building" and then shows two renders. The claim is unevidenced | FIX |

**v3:** one glass frame holding the day/dusk pair as a diptych, and a disclosure that opens three real
engineering notes (attachment, structure, shading). The claim becomes checkable instead of asserted.

---

### 3.4 Economics — `InstitutionalEconomics.tsx` (472 lines)

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Structure | 220vh pinned on desktop, stacked on mobile | Justified: this is the argument of the site | KEEP (idea) |
| Chart | SVG 25-year curves | Dense, but the axis semantics are never explained | FIX |
| Scenario cards | Baseline / +35% / softening | Excellent — this is the Beth Doctrine made tangible | KEEP |
| Copy | "guaranteed 30% discount floor" | "Guaranteed" needs a qualifier against the executed PPA | FIX |
| Inputs | Sliders | No stated unit basis, so users can't sanity-check | FIX |

**v3:** the **instrument**. One pane, two columns: inputs (bill size, tariff stress) and outputs
(monthly saving, three multiplier bars, 20-year delta in crore). Every number carries an
"Illustrative" footnote, and the stress test proves the *mechanism* — the saving rises with the tariff
rather than being a fixed rate. No per-kWh figure is ever printed, which is the house rule.

---

### 3.5 Operations — `OperationsScroller.tsx` (384 lines)

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Structure | 320vh sticky canvas, second 240-frame sequence | The same device as the hero. Five sections behaving identically is one section repeated | REPLACE |
| Content | Reference operating sequence | Four real steps exist in the copy but are never enumerated | FIX |
| Imagery | Frame scrub | Expensive; a single detail plate carries the same information | REPLACE |

**v3:** a sticky detail plate beside a four-step rail with week ranges and a connector line. The
sequence is legible in three seconds instead of 3.2 screens.

---

### 3.6 RMG edge — `RMGEdgeSection.tsx` (203 lines)

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Card set | 6 objection themes | **Right content, right count.** These are the six questions a plant head actually asks | KEEP |
| Iconography | Gold pills + dot | Generic; six identical cards flatten a hierarchy | FIX |
| Specificity | "98% daytime load" | Unqualified performance figure → claims exposure | FIX |

**v3:** six panes, each with a distinct line icon, a 15.5px title and 13px body. The performance
number is reframed as a mechanism ("generation is consumed behind the meter, so storage is not
required") rather than an unsourced percentage.

---

### 3.7 Benefits — inline `Benefits()` in `Home.tsx` → `GlassBenefits`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Tabs | 3 tabs, `role="tablist"`, arrow keys | Correct ARIA, good interaction | KEEP |
| Visual | `AppMock` scaled in a card | The mock is a picture of software, not evidence of benefit | FIX |
| Copy | Long, hedged paragraphs | Accurate but flat; each tab says the same shape | FIX |

**v3:** three *lenses* — Cost / Risk / Control — in one glass pane, each with three concrete bullets
and a photographic half that changes meaning per lens. Keyboard behaviour preserved.

---

### 3.8 How it works — inline `HowItWorks()` → `GlassProcess`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Structure | 3 cards with 264px image headers | The images are decorative and repeat the hero | REPLACE |
| Copy | Assess → structure → operate | Correct and short | KEEP |
| Rhythm | Third card has a CTA, first two don't | Inconsistent | FIX |

**v3:** three text-led panes. No images, because the steps are decisions, not scenes. The same
"see if the roof qualifies" action sits at the section level.

---

### 3.9 Why now — inline `Why()` → `GlassWhy`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Numbers | 16.7% / 30% / 3,600 MWp | **Strong.** The 16.7% BERC step is the most persuasive fact on the site | KEEP |
| Layout | 3-column rows with dividers | Good, but the third column is right-aligned body text — hard to scan | FIX |
| Colour | Orange `#F66F00` radial glow | Legacy orange, explicitly retired by the brand pass | FIX |

**v3:** three hairline rows, numeral in gold, claim at 22px, note at 13px. Orange glow removed. A
footnote distinguishes estimate from published order.

---

### 3.10 Network — inline `Network()` → `GlassNetwork`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Media | Aerial photograph with parallax `y` | Best photographic moment after the hero | KEEP |
| Overlay | Three glass chips | Right idea, floating arbitrarily | FIX |
| Caption | None | A photograph of a city with no claim attached wastes it | FIX |

**v3:** full-width plate, slow scale-settle on entry, chips anchored top and bottom, and a sentence
that says what the picture proves: generation where the load is.

---

### 3.11 CTA — `CTASection.tsx` (80 lines) → `GlassCTA`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Background | Animated sunrise spectrum | Distinctive but visually louder than the hero, so the page peaks in the wrong place | FIX |
| Type | `13vw` display | Confident | KEEP |
| Action | 1 CTA | Same gap as the hero | FIX |

**v3:** a single gold-edged pane with a top light source, the same monumental line, and two actions.
The emotional peak moves to the end, where it belongs.

---

### 3.12 Global chrome — `Nav`, `SectionBridge`, `Footer`

| Element | Current | Evaluation | Verdict |
|---|---|---|---|
| Nav | Floating capsule, scroll progress line | Good; condenses well | FIX (rebuilt in-system) |
| Section bridges | 10 bridges, 36–96px gradient seams | The intent (continuity) is right, but 10 gradient bands is a lot of furniture for one page | REPLACE |
| Footer | Full sitemap + monumental watermark | Brand-correct, links are real | KEEP (condensed) |
| Lead capture | `FeasibilityModal` | Working, validated, claims-safe | **KEEP verbatim** |

**v3:** nav condenses into a 72% opaque pane after 40px; progress becomes a 2px gold hairline;
continuity comes from a shared canvas and consistent padding rather than ten gradient bands.

---

## 4. The iteration loop

The loop was run as **build → static verify → refine**, four passes. What each pass changed:

**Pass 1 — system.** Tokens, pane recipe, type scale, reveal primitive. *Found:* `backdrop-filter`
needs a photographic or gradient substrate; glass over flat colour turns grey. All panes moved over
photography, gradients or the canvas light.

**Pass 2 — composition.** Twelve sections composed. *Found by review:* the operations column used
`sticky` on a child whose parent was only as tall as itself — no travel. Moved to the grid item.
Found the hero parallax exposed its own top edge at `yPercent 12` with a `-6%` inset; changed to
`-10%` inset and `8%` travel.

**Pass 3 — typography and units.** *Found:* the 20-year figure was formatted in lakh after dividing
by 100 — a label/value unit mismatch. Introduced a `crore()` formatter so `৳28 Cr` is genuinely
crore. Aligned the process connector line to the badge centres (42px, 46px at ≥768px).

**Pass 4 — discipline.** *Found:* three claims-language violations in the new copy (an unqualified
percentage, an unhedged "guaranteed", and a "certification" phrasing). All rewritten; the
`claims-contract` guard from PR #6 now runs over the whole app and passes. Also removed a Tailwind
ambiguous-utility warning (`duration-[1400ms]` → `[transition-duration:1400ms]`) and replaced the
dead `prefers-reduced-transparency` clause with the real mobile blur budget.

**Loop status:** build ✅ · `tsc -b` ✅ · `eslint` 0 problems ✅ · claims guard 5/5 ✅ · console clean on
served route ✅. Visual confirmation is the last unrun step: the sandbox has no browser install
(`libnspr4`/`libnss3` unavailable and Playwright's CDN is out of network scope), so the rendered
page must be confirmed in the live preview rather than by screenshot. That is the one gap in the
loop and it is stated rather than papered over.

---

## 5. Verification

Numbers below are the state after the full sub-page port (commit `fc922b2`), not after the homepage
swap alone.

```
tsc -b                     0 errors
eslint .                   0 problems
npm run build              9.08s, clean
npm test                   7/7 (claims contract)
CSS                        154.51 kB → 27.37 kB gzip
JS (initial route)         614.22 kB → 199.25 kB gzip
JS (/classic, on demand)   694.78 kB → 171.94 kB gzip
```

**Claims contract — what the seven rules are**

| # | Rule |
|---|---|
| 1 | No per-kWh / per-unit rate anywhere in source or docs |
| 2 | IDCOL is applied-for / under appraisal, never qualified, approved or secured |
| 3 | Performance and telemetry figures are labelled illustrative |
| 4 | **Savings are never described as guaranteed, locked or contractually assured** |
| 5 | **IDCOL is never described as compliant, executed or in place** |
| 6 | Documentation carries no developer-machine absolute paths |
| 7 | No media over 10 MB in `app/public` |

Rules 4 and 5 exist because the suite passed for months while `SavingsCalculator` (embedded at
`/calculator`) and `FeasibilityModal` (opened from every glass page) both displayed
"30% Guaranteed". A guard that does not know the word cannot guard the claim.

**Weight**

| Metric | Homepage swap | After port, one chunk | After route splitting | Note |
|---|---|---|---|---|
| JS (gzip) | 418.2 kB | 418.0 kB | **199.3 kB** | 52% cut on first load |
| CSS (gzip) | 26.7 kB | 27.4 kB | 27.4 kB | +0.7 kB for six redesigned pages |
| New media | 0 bytes | 0 bytes | 0 bytes | — |
| New dependencies | `lenis` | `lenis` | `lenis` | Unchanged throughout |

The single chunk was hiding a specific absurdity: **Three.js was in the initial
bundle** because `/classic` imports `SolarPergola3D`, and `/classic` was eagerly
imported alongside every other route. A visitor who never left the glass homepage
downloaded a 3D toolkit to look at a photograph. Splitting the routes moved it to a
694 kB chunk that only loads if someone actually opens the archived page.

**Accessibility carried into v3**

- `prefers-reduced-motion` kills Lenis, the marquee, all reveals, the specular sweep and the progress bar.
- Focus rings are gold at 2px with 3px offset on every interactive element.
- Tabs keep `role="tablist"` / `aria-selected` / arrow-key movement.
- Marquee duplicates are `aria-hidden`; the nav toggle exposes `aria-expanded`.
- Decorative layers are `aria-hidden`; body copy contrast measured at ≥7:1 on the canvas.
- The hero light is hover-only and hidden under `@media (hover: none)`.

---

## 6. Decision record

Two questions were left open at handoff. Both are now decided and shipped.

### D1 — Promote Glass to `/` · **DECIDED: yes**

Glass is the better homepage, and a "best version" that lives at a secondary URL is not the
homepage. Shipped as:

| Route | Renders |
|---|---|
| `/` | **Glass v3** |
| `/glass` | Glass v3 (alias, so existing links and previews keep working) |
| `/classic` | the previous homepage, unchanged |

**Reversibility is the point.** The swap is three lines in `App.tsx` and is documented in the commit.
Because the redesign was never rendered in a browser inside this sandbox, shipping it *with* a live
fallback is strictly safer than shipping it blind — a visitor (or you) can reach the old page in one
click from the footer of either version.

Sub-pages were left on the classic system at the time of this decision. **That has since been
reversed — see D3.** The reasoning above was right for the moment it was written (a homepage swap
should not also rewrite nine pages), but it produced a worse outcome in practice: the glass nav and
footer are shared, so every link off the homepage dropped the visitor from a deep-forest pane into a
cream document with a different type stack. The seam was more jarring than the redesign itself.

### D2 — Hero film · **DECIDED: no film, keep the still**

The 240-frame scrub cost 14 MB of frames inside a 32 MB `public/` — roughly 44% of all shipped
assets — before the visitor has read a headline. It also required a 380vh scroll commitment to
reveal content that now sits above the fold.

Instead the hero keeps three cheap depth cues: the photograph, an 8% scroll parallax on the wrapper,
a pointer-held warm light, and a **28s drift on the image itself**. The wrapper and the image animate
different properties (`yPercent`/`scale` via GSAP vs `transform` via CSS), so they cannot fight over
the same value. Net result: a hero that moves, at zero added media weight.

If the film is ever wanted back it re-grafts into `.g-hero__media` without touching the rest of the
system — that slot was deliberately left as a single element.

### D3 — Port every sub-page to v3 · **DECIDED: yes, in conversion order**

The seam described in D1 is the reason. Once the homepage was glass, the cream sub-pages stopped
reading as "a different section" and started reading as "a different company". Order and rationale:

| Pass | Pages | Why this order |
|---|---|---|
| 1 | `/product`, `/calculator`, `/about` | The commercial argument. A visitor who leaves the homepage to check the engineering must not lose the register. |
| 2 | `/contact`, `/partners` | The conversion pages, and the two whose copy was furthest behind the claims position. |
| 3 | `/legal`, `/licenses`, `/careers`, `/insights`, `404` | Reference and hiring pages. Cheap once the primitives settled — each needed less new code than the last. |
| 4 | `/brand` | Last, because it had to be rewritten rather than restyled: it documented a cream-and-ink system the site no longer used. |

Two reusable primitives came out of this and are the reason the later pages were cheap:

- **`GlassShell`** — nav (`onHome={false}`), footer, smooth scroll, assessment modal, scroll reset.
  Every inner page is `<GlassShell>{children}</GlassShell>`.
- **`useAssessModal`** — the three-line modal state, so pages without their own form do not repeat it.

`/classic` is still served. Nothing was deleted; the previous homepage remains the fallback, and
`/classic` costs one route entry and no bundle weight that was not already there.

### D4 — De-risk the embedded legacy components · **DECIDED: yes, copy not behaviour**

Porting a page did not port the components it embeds. `SavingsCalculator` sits inside `/calculator`
and `FeasibilityModal` opens from every glass page's CTA, so both were still asserting a guaranteed
30% — and `SavingsCalculator` opened with "executed 20-year IDCOL PPA terms" for a facility that is
applied for and under appraisal. The site contradicted itself precisely where a visitor decides.

The fix is copy and identifiers only (`DISCOUNT_BASIS` instead of `GUARANTEED_SAVINGS_PERCENT`); the
arithmetic, the inputs and the WhatsApp/memo handover are unchanged, because those are the product.
Rewriting the calculator's visuals is a separate pass — it is the one screen still carrying classic
styling, and it is deliberately wrapped in `.g-embed` (glass.css §15) so its legacy chrome does not
punch a cream hole in the page.

### Deliberately *not* done

- **No duplicate CI workflow.** `cursor/platform-phase-2-baseline-8fd8` already adds
  `.github/workflows/ci.yml`; adding a second one here would conflict on merge for no gain.
- **Claims guard was not widened during the homepage pass.** That was correct then and wrong in
  hindsight: the guard had five rules and none of them looked for the word "guaranteed", so
  "30% Guaranteed" stayed live in the calculator and the modal for months while the suite passed.
  Resolved in the claims pass — see §5 — with two rules that now scan source as well as docs.

---

## 7. Open items for the next loop

1. **Visual QA** — still the one unverified step, and the biggest outstanding risk. No headless
   browser is installable in this sandbox (`libnspr4.so` missing, package installs blocked, Playwright
   CDN unreachable), so every page in this document is verified by types, lint, tests and build only.
   Someone with a browser should check 390×844, 768, 1440×900, 1920 on `/`, `/product`, `/partners`,
   `/calculator` and `/brand` before this is called done. Read §4 of this document as "reasoned about",
   not "seen".
2. **SavingsCalculator visuals** — now the only screen in classic styling, embedded at `/calculator`.
   Restyling its internals on the v3 primitives would retire `.g-embed` entirely.
3. **Motion budget** — consider `content-visibility: auto` on lower sections once real-user metrics exist.
4. **Hero media A/B** — if the film returns, serve it as a ≤2 MB loop, not a 240-frame sequence.
5. ~~**JS weight**~~ — done. Every route except `/` is a dynamic import; see §5. Remaining bulk is
   React plus framer-motion, which the glass pages genuinely use. A vendor `manualChunks` split is
   possible but buys a round trip, not a byte count.
6. **Chunk reload guard** — `main.tsx` now listens for `vite:preloadError` and reloads once (guarded
   by `sessionStorage`) so a visitor holding a stale `index.html` across a deploy does not hit a
   blank route. Worth revisiting if analytics ever show it firing.
