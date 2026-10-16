# Netso `/v2` Representative Factory Asset Brief

Status: approved direction; generation pending image-service availability

## Purpose

Create the first photorealistic visual asset for the Netso site-study vertical
slice: a representative Bangladesh garment/textile factory whose roof can be
understood as part of a working industrial energy system.

This is a fictional reference facility. It must not resemble a named customer,
display an identifiable logo, or imply an installed Netso project.

## Art direction

Premium infrastructure documentary; high-end architectural visualization film;
physically credible industrial architecture; natural late-afternoon daylight;
humid South Asian atmosphere; restrained color; weathered concrete, corrugated
metal, painted steel, glazing, roof equipment, loading access, and service
paths; believable scale and imperfections.

The factory should feel operational before the solar intervention is noticed.
The roof should be readable from the first frame, but the image should not look
like a generic solar advertisement.

## Master poster prompt

> Photorealistic architectural visualization of a fictional large garment and
> textile manufacturing facility in Bangladesh, seen from a high oblique aerial
> three-quarter angle at late afternoon, broad industrial roof with believable
> parapets, vents, skylights, maintenance paths, rooftop service equipment and
> loading apron, production halls and a smaller office block, neighboring
> industrial roofs and narrow access roads in the distance, humid monsoon
> atmosphere, warm natural sunlight, subtle haze, realistic concrete and
> corrugated metal materials, controlled imperfections, physically accurate
> proportions, serious infrastructure documentary mood, premium architectural
> visualization, cinematic but restrained, ample dark negative space near the
> lower left for later website copy, no visible text, no logos, no signage,
> no identifiable company, no futuristic elements, no neon, no glowing energy
> trails, no fantasy architecture, no excessive lens flare, 16:9 horizontal
> composition.

## Negative prompt

Generic green-energy advertising, pristine glass skyscraper, suburban house,
European factory, sci-fi holograms, neon blue electricity, exaggerated solar
panel coverage, impossible roof geometry, floating structures, toy-like 3D,
low-poly style, cartoon rendering, excessive bloom, heavy lens flare, fake
telemetry, fake numbers, logos, brand names, legible generated text, watermarks,
unrealistic workers, unsafe roof access, distorted vehicles, duplicated objects,
overly saturated colors, dramatic apocalypse sky.

## Required camera frames

Generate a consistent scene family, not unrelated images.

1. **Poster / invitation:** high oblique whole-site view; roof legible; copy-safe
   dark area; no overlays baked into the image.
2. **Roof-fit frame:** closer high oblique roof view; vents, skylights,
   parapets, access paths, and obstructions legible.
3. **Operating frame:** lateral roof view including loading edge, service path,
   maintenance clearance, and production block.
4. **Energy-path frame:** roof, non-specific electrical edge, and production
   block visible in one calm composition; no invented meters or values.
5. **CTA hold frame:** three-quarter site view with enough negative space for
   the assessment handoff and persistent study label.

## Asset acceptance checks

- Fictional and unbranded; no implied customer deployment.
- Garment-factory identity reads without explanatory text.
- Roof and operating context are visible at 390px width.
- Materials and lighting feel physically plausible rather than glossy or sci-fi.
- Same building geometry, weather, sun direction, and palette across the frame family.
- No generated text or numerical claims inside the image.
- Poster has a stable crop for desktop and mobile derivatives.
- Final web derivatives are prepared separately from the source-quality master.

## Delivery targets

- Master poster: horizontal 16:9, source quality preserved outside the web bundle.
- Mobile poster: 4:5 or 3:4 derivative with roof and factory still legible.
- Web poster: compressed derivative sized for poster-first paint.
- 3D implementation asset: separate optimized GLB; the poster is not a substitute
  for the future scene model.

## Provenance label

The rendered section must display:

`Representative garment facility · illustrative site study`

This label belongs in the UI, not inside the generated image.

## Generation status

The local 9Router image endpoint was unavailable during preparation:
`http://127.0.0.1:20128/v1/models/image` could not be reached. No image was
claimed as generated. Once the image service is available, generate the poster
first, review it against the acceptance checks, and only then create the
consistent camera-frame family.
