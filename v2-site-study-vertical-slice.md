# Netso `/v2` Site Study — Vertical Slice Brief

Status: approved design direction; implementation not started

## North-star outcome

Replace the current abstract solar-pergola interaction with one performant,
credible, conversion-oriented site study that demonstrates how Netso thinks
about an industrial rooftop as energy infrastructure.

The experience must help a garment-factory decision-maker answer:

> Could my factory's roof support a Netso energy project?

It is not an engineering report, an instant feasibility calculator, or a
standalone 3D showcase.

## Approved direction

**Primary:** Infrastructure Documentary

**Borrowed details:**

- Roof Intelligence: restrained overlays for usable zones, obstructions,
  access, shade, and electrical route.
- Daylight-to-Load: a subtle shift in natural light that connects the site to
  operating reality without inventing generation or savings figures.

**Subject:** a representative Bangladesh garment/textile facility.

**Public label:** `Representative garment facility · illustrative site study`

**Narrative order:**

1. Whole-site arrival
2. Roof-fit reveal
3. Operating constraints
4. Energy path into the facility
5. Preliminary site-assessment CTA

## Reference lock

### Preserve

- Netso's existing dark forest, warm, and gold visual language.
- Physically credible industrial architecture and materials.
- Natural daylight with restrained cinematic movement.
- A quiet, editorial technical-overlay system.
- Clear separation between illustrative geometry and verified project evidence.

### Reject

- Futuristic holograms, neon energy trails, and sci-fi interfaces.
- Generic sustainability imagery or empty blue-sky solar marketing.
- Excessive glow, perpetual rotation, and decorative camera movement.
- Invented project numbers, savings, generation, capacity, or payback.
- A freeform CAD playground that asks visitors to learn 3D controls.

### Media strategy

- One representative factory scene, authored as a web-ready GLB.
- One poster-first render for immediate page paint and fallback behavior.
- A small number of baked or compressed texture atlases.
- Future site studies reuse the same scene schema with verified source data.

## Explicit integrity rules

The first scene is fictional and must never imply a Netso customer, installed
project, engineering approval, or measured result. The scene label remains
visible at the beginning and at the CTA transition.

Illustrative overlays may say `illustrative roof zone`, `reference access path`,
or `example electrical route`. They must not say `approved`, `confirmed`,
`guaranteed`, or present quantified outputs.

Any future verified study must carry a separate evidence record containing:

- source drawings, photographs, measurements, or survey material;
- what is directly observed versus reconstructed;
- engineering assumptions and unresolved questions;
- approval status and date;
- which claims are safe to expose publicly.

## Vertical-slice storyboard

The first implementation should cover one complete story rather than model the
entire campus.

### Beat 0 — Poster / invitation

**Frame:** A still, photorealistic dusk-or-late-afternoon view of the factory,
with the roof readable but not yet annotated.

**Copy:**

- Eyebrow: `Reference canopy`
- Heading: `Infrastructure with presence.`
- Label: `Representative garment facility · illustrative site study`
- Action: `Inspect the site study`

The poster is the first visible state. It should preserve the section's message
when 3D is disabled, delayed, blocked, or not useful on a device.

### Beat 1 — Whole-site arrival

**Camera:** Begin above the surrounding industrial context, then descend toward
the factory at a slow, deliberate pace.

**Reveal:** roof massing, production blocks, loading apron, utility edge, and
surrounding circulation.

**Overlay:** one caption only: `Representative garment facility`.

**Purpose:** establish that the roof belongs to an operating facility, not an
isolated solar object.

### Beat 2 — Roof-fit reveal

**Camera:** settle into a high oblique view that keeps the roof and major
obstructions legible.

**Reveal:** illustrative usable roof zones, roof setbacks, skylights or vents,
maintenance paths, and parapet edges.

**Overlay treatment:** use thin gold linework and short labels that fade in near
the relevant geometry. Keep labels attached to the camera composition rather
than floating as a dense HUD.

**Copy:** `The roof is assessed as a working surface.`

### Beat 3 — Operating constraints

**Camera:** move laterally across the roof, not around a decorative pergola.

**Reveal:** loading access, maintenance clearance, drainage or service zones,
and a clearly marked illustrative exclusion area.

**Overlay:** `Reference access path` and `Illustrative exclusion zone`.

**Purpose:** communicate that panel placement is shaped by the facility's
operation, safety, and maintenance needs.

### Beat 4 — Energy path

**Camera:** pull back slightly to include roof, inverter/electrical edge, and
the main production block in one composition.

**Reveal:** a restrained animated path from roof collection to the facility's
electrical interface. Avoid particle streams and glowing sci-fi conduits.

**Copy:** `Generation is planned around the facility, not placed beside it.`

The path is conceptual. It must not display kW, kWh, savings, payback, or
carbon figures in this first slice.

### Beat 5 — Assessment handoff

**Camera:** hold on a calm three-quarter site view with the roof still visible.

**Copy:**

- Heading: `Could your factory's roof support a project like this?`
- Supporting text: `Share the facility basics. Netso can review the roof, load,
  access, and electrical context before proposing a project structure.`
- CTA: `Request a preliminary site assessment`
- Secondary action: `Keep exploring`

The assessment CTA must route into the existing qualified lead flow. It must not
promise instant engineering conclusions.

## Camera and motion model

The sequence is guided by scroll progress and has explicit chapter stops. It is
not an auto-rotating model. Visitors can pause, replay, or skip to a beat.

- Desktop: approximately 4–5 camera compositions over one section.
- Mobile: fewer compositions, shorter travel distance, and larger readable
  geometry; do not preserve desktop camera travel at a smaller scale.
- Reduced motion: show the poster, then a small number of static annotated
  frames; preserve the same narrative and CTA.
- Save-data / low-power: poster-first with an optional `Load site study` action.
- Keyboard: chapter controls and CTA must be reachable without entering the
  canvas as an unexplained focus trap.

## Scene composition

The first scene should include only what supports the story:

- textile factory massing with believable roof proportions;
- production hall, office or utility block, and loading edge;
- parapets, vents, skylights, tanks, service equipment, and maintenance paths;
- one roof structure or panel field as a reference intervention;
- inverter/electrical interface represented as a legible but non-specific zone;
- restrained surrounding context: roads, neighboring industrial roofs, and
  vegetation only where needed for scale;
- natural materials: weathered concrete, corrugated metal, painted steel,
  glazing, dust, and controlled imperfection.

The model should read as an operating factory before any solar overlay appears.
The solar intervention is a layer in the story, not the entire subject.

## Asset and loading strategy

### Initial scene budget

- Target: approximately **5 MB compressed transfer size** for the initial 3D
  scene package.
- Stretch ceiling: **8 MB only when a measured visual improvement justifies it**.
- The budget is separate from the existing application JavaScript, CSS, and
  unrelated page imagery.
- Measure both transfer size and decoded GPU memory on a representative mobile
  device.

### Proposed pipeline

1. Author the scene in Blender or an equivalent DCC using modular, reusable
   building pieces.
2. Reduce geometry to the camera-visible detail level; avoid hidden interior
   geometry in the first slice.
3. Bake lighting and material detail into compact texture atlases where it does
   not need to respond dynamically.
4. Export GLB and compress geometry and textures for web delivery.
5. Provide a poster render and 3–5 annotated static frames from the same scene.
6. Load the 3D package only after the section is near the viewport and the page
   has painted its poster state.

### Future verified studies

The scene should eventually accept a study manifest that separates:

- geometry and camera composition;
- evidence-backed site facts;
- illustrative overlays;
- public-safe copy;
- CTA and assessment metadata.

This lets future verified studies use drawings, photographs, measurements,
survey data, or photogrammetry without making photogrammetry mandatory.

## Overlay specification

Overlays are explanatory annotations, not a fake monitoring dashboard.

Allowed first-slice overlay types:

- `illustrative roof zone`;
- `reference access path`;
- `illustrative exclusion zone`;
- `example electrical route`;
- `maintenance clearance`;
- `representative production block`.

Rules:

- One to three visible annotations per camera beat.
- Gold is reserved for active emphasis; neutral warm text handles context.
- Labels must remain readable at 390px wide.
- Every overlay has a text equivalent outside the canvas for accessibility.
- Never present invented dimensions, capacity, output, savings, or payback.
- Future verified values require an evidence status and date.

## Acceptance criteria

### Message and trust

- A first-time visitor can identify the scene as a garment facility within the
  first camera beat.
- The label `Representative garment facility · illustrative site study` is
  visible before and during the experience.
- The sequence explains at least three real project considerations: roof fit,
  operating access, and electrical context.
- No unsupported quantified claim appears in the scene.

### Conversion

- The assessment CTA is visible in the final beat and routes to the existing
  lead-intake flow.
- The CTA copy promises review, not instant engineering approval.
- The section remains useful if the visitor never activates 3D.

### Performance

- Poster paints before the 3D package is requested.
- Initial 3D scene transfer is at or below 5 MB in the target build; any result
  above that requires an explicit trade-off record.
- No continuous render loop runs while the section is off-screen.
- Mobile has a static fallback and reduced-motion path.
- Test on 390px mobile, throttled 4G, and a mid-range device before expansion.

### Interaction and accessibility

- Scroll progression works without requiring precise pointer gestures.
- Pause, replay, and chapter navigation are keyboard reachable.
- Motion preference and save-data preference are respected.
- Canvas content is accompanied by semantic text and accessible CTA controls.
- The scene never blocks the page's normal vertical scroll on touch devices.

## Implementation boundary

The current dirty worktree maps `/v2` to `Home` in `app/src/App.tsx`, while the
separate `app/src/pages/V2.tsx` route implementation is not currently mounted.
The live `/v2` browser surface therefore resolves to the Home composition and
its `#pergola-twin` section, which renders `app/src/components/SolarPergola3D.tsx`.
This route seam must be resolved before implementation; do not build against a
dead component path by assumption.

The vertical slice should replace the visible `/v2` site-study surface after the
route owner is confirmed. If `/v2` remains the Home composition, the first
integration target is `Home.tsx` / `#pergola-twin`. If the dedicated `V2.tsx`
experience is restored, the target becomes its `V2LegacyBridge` seam. In either
case, retire the abstract `SolarPergola3D` path from the chosen `/v2`
site-study surface while preserving the root homepage baseline during
validation. Do not redesign the entire `/v2` sequence, introduce user-uploaded
modeling, or build a generalized engineering platform.

The first implementation should be judged against the existing section with a
before/after mobile capture, scene transfer measurements, and a focused CTA
interaction test. Only after that evidence is positive should additional site
zones, verified studies, or deeper technical layers be added.

## Decision log

| Decision | Rationale |
| --- | --- |
| Infrastructure Documentary is primary | Best balance of credibility, narrative, and conversion. |
| Representative garment factory first | Shows market relevance without implying a customer deployment. |
| Guided camera sequence | Gives visitors a coherent story and reduces 3D interaction friction. |
| 5 MB initial scene target | Protects mobile performance; 8 MB is an exception, not the baseline. |
| Poster-first loading | Makes the section useful before and without 3D. |
| Technical overlays without metrics | Explains project logic while avoiding false engineering precision. |
| Assessment CTA, not instant result | Connects the experience to a qualified commercial next step. |
| One vertical slice before full build | Tests business value before investing in a full 3D environment. |
