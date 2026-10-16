# Netso `/v2` Site Study — Build Readiness

Status: preflight complete; implementation not started

## Approved build target

One performant vertical slice of a photorealistic representative garment
factory site study. The experience is a guided infrastructure documentary:

`site arrival → roof fit → operating constraints → conceptual energy path → assessment CTA`

The first release is a representative, explicitly illustrative scene. It is not
a customer case study, engineering report, instant calculator, or generalized
site-modeling platform.

## Skills to use

### Design and narrative

- `brainstorming` — already completed; understanding lock, assumptions, and
  decision log are recorded in `v2-site-study-vertical-slice.md`.
- `design-orchestration` — controls the gate between approved design and build.
- `refero-design` — research-first visual direction and reference lock before
  implementation. Live Refero MCP tools were not available in this runtime, so
  the current lock is grounded in the approved brief and repository evidence.
- `scroll-experience` — guided scroll, sticky-stage behavior, mobile-safe motion,
  and no scroll hijacking.
- `3d-web-experience` — GLB scene architecture, loading, model compression,
  renderer lifecycle, and progressive enhancement.

### Media and implementation

- `imagegen-frontend-web` — art direction for the poster and consistent camera
  frame family; one horizontal image per defined scene frame.
- `9router-image` — image generation route for representative factory renders.
  The local 9Router service is currently unavailable, so no image has been
  falsely claimed as generated.
- Existing React, Three.js, Framer Motion, GSAP, and Vite stack — keep the
  current project stack; no new animation runtime is required.

### Quality and release

- `web-performance-optimization` — baseline, Core Web Vitals, bundle/media
  budgets, and before/after measurement.
- `fixing-accessibility` — keyboard, semantics, focus, motion preferences,
  accessible equivalents for canvas annotations, and touch behavior.
- `playwright-skill` / existing `agent-browser` — browser behavior, viewport,
  keyboard, fallback, and CTA checks. Playwright is not installed in the skill
  runner, so `agent-browser` is the immediately available browser path.
- `verification-before-completion` — no completion claim without fresh build,
  test, browser, asset, and performance receipts.

## Current repository/tool audit

### Available and suitable

- React 19 + TypeScript 5.9 + Vite 7
- Three.js 0.186 with direct WebGL usage already present
- Framer Motion and GSAP already installed
- Remotion film pipeline and existing film verification scripts
- `ffmpeg` available at `/opt/homebrew/bin/ffmpeg`
- `agent-browser` available for live browser QA
- Existing poster, solar-roof, aerial, and industrial image assets

### Not currently available

- Local 9Router image service at `127.0.0.1:20128`
- Blender CLI
- `gltf-transform`
- `sharp`
- Lighthouse CLI
- Playwright package in the loaded Playwright skill runner

These are not all required immediately. The first implementation can use direct
Three.js GLB loading and `agent-browser`, but a serious photorealistic scene
pipeline will need either an approved external/DCC asset source or a supported
GLB generation route, plus a repeatable optimization step.

## Critical integration finding

The current dirty worktree maps `/v2` to `Home` in `app/src/App.tsx`:

```tsx
<Route path="/v2" element={<Home />} />
```

The dedicated `app/src/pages/V2.tsx` implementation exists but is not currently
mounted. The visible browser surface at `/v2` is therefore the Home composition,
including `#pergola-twin` and `SolarPergola3D`.

This must be resolved before coding the replacement. We need one route owner:

1. **Keep `/v2` as Home** and replace the visible `#pergola-twin` section; or
2. **Restore the dedicated `V2.tsx` route** and integrate the site-study surface
   into its intended `V2LegacyBridge` seam.

**Decision:** proceed with option 1, with a route-specific guard. The live Home
composition remains the integration surface for `/v2`, and the site-study
replacement is mounted only when `Home` is rendered at `/v2`. The root `/`
continues to show the previous pergola section as the control/baseline while the
new experience is validated.

Do not implement against `V2LegacyBridge` while `/v2` renders Home.

## Build sequence

### P0 — route and baseline

- Confirm `/v2` route owner.
- Capture current `/v2` at 390×844, 768×1024, 1366×768, and 1920×1080.
- Record current build size and poster/LCP behavior.
- Confirm the assessment CTA and its real delivery contract.

### P1 — asset proof

- Generate or source one poster-quality factory image.
- Review it for fictional/unbranded identity, roof readability, copy-safe crop,
  and consistent industrial realism.
- Do not create a GLB before the poster direction is approved.
- Feed the approved poster and future GLB through
  `app/src/components/site-study/manifest.ts`; its current scene entry is
  explicitly `not-generated` and must not be treated as evidence.

### P2 — scene vertical slice

- Build only the camera path and geometry needed for the five beats.
- Keep the scene package near the 5 MB compressed target.
- Add poster-first loading, a static fallback, and reduced-motion behavior.
- Keep overlays semantic and illustrative; no invented metrics.

### P3 — integration and mobile

- Integrate into the confirmed route owner.
- Test natural vertical scrolling, chapter progression, keyboard access, and
  CTA routing.
- Test 390px mobile before adding polish or additional site zones.

### P4 — release gate

- Run project build, lint, film tests, and film verifiers.
- Run browser matrix and failure states.
- Measure scene transfer, LCP, CLS, interaction latency, and GPU/memory behavior.
- Verify `/` and existing routes are unchanged.

## Required acceptance gates

- Poster paints before the 3D package is requested.
- Initial scene transfer ≤5 MB; 8 MB requires a documented visual trade-off.
- Static/reduced-motion/save-data modes fetch no 3D animation loop.
- No touch gesture blocks normal page scrolling.
- Scene label remains visible: `Representative garment facility · illustrative site study`.
- At least three real project considerations are explained: roof fit, access,
  and electrical context.
- No invented capacity, generation, savings, payback, telemetry, or approval.
- CTA asks for a preliminary site assessment and does not claim instant results.
- `/` does not load `/v2`-only media or runtime modules.
- Existing asset-manifest and film verification gates remain green.

## Planned verification commands

Run from `app/` after implementation:

```sh
npm run lint
npm run build
npm run test:film:master
npm run film:verify
npm run film:master:verify
```

Browser verification should use `agent-browser` immediately, or the Playwright
skill after its runner is set up. Capture opening, roof-fit, constraint,
energy-path, CTA, static, reduced-motion, loading, and error states.

## Current blockers

1. `/v2` route ownership is ambiguous in the dirty worktree.
2. The local image generation service is unavailable.
3. No local DCC/GLB optimization toolchain is installed.
4. The working tree contains substantial uncommitted `/v2` work mixed with the
   earlier changes; implementation should be isolated or carefully scoped.

The first blocker is the only product decision blocker. The remaining three are
tooling/asset pipeline blockers with viable fallback paths, but they should be
resolved before committing to a photorealistic 3D build.
