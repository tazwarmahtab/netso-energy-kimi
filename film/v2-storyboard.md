# Netso Energy / v2 — Remotion storyboard and cutup manifest

Status: approved first-cut structure; concept visuals are labeled in the page and
source-derived footage is treated as contextual reference, not as a verified
Netso installation claim.

## Render outputs

| Composition | Purpose | Output |
| --- | --- | --- |
| `NetsoStoryboard` | Directed review cut with provenance slates | `app/public/assets/v2/netso-storyboard.mp4` |
| `NetsoFilm` | Clean master cut without slates | `app/public/assets/v2/netso-film.mp4` |
| `NetsoStoryboardCover` | Poster for review decks and editorial handoff | `app/public/assets/v2/netso-storyboard-cover.png` |

The page consumes the generated master sequence at
`app/public/assets/v2/master/frames/` through one `FrameSequence` playhead. The
Remotion compositions remain the editorial review/cutdown path; they use the
same curated scene list but are not the page runtime. `npm run film:master`
assembles the page master and `npm run film:master:verify` checks its provenance,
contiguous output, MP4 decode, and frame count. `npm run film:verify` checks the
underlying source ranges, posters, and curated scene frame sets.

## Timeline

The Remotion timeline runs at 30 fps. Each shot owns its source range, poster,
purpose, and outgoing transition in `app/src/film/shotLibrary.ts`.

| Timecode | Shot ID | Chapter | Treatment | Status |
| --- | --- | --- | --- | --- |
| 00:00–00:02.00 | `sky-opening` | Roof | Hold the approved sky plate before the roof transformation | Concept visualization |
| 00:02.00–00:10.00 | `roof-transform` | Roof | Sky resolves into a proposed rooftop solar structure | Concept visualization |
| 00:10.60–00:16.60 | `city-infrastructure` | Architecture | Façade-to-roof reveal with an editorial bridge | Concept visualization |
| 00:17.20–00:22.23 | `pergola-payoff` | Architecture | Architectural payoff; preserve warm practical light | Concept visualization |
| 00:22.83–00:26.83 | `finance` | Finance | Text-free plate under live HTML/SVG assumptions | Illustrative only |
| 00:27.43–00:34.27 | `operations` | Operations | Operating practice; contextual supplied footage | Supplied-footage context |
| 00:34.87–00:43.87 | `dusk` | Operations | Dusk continuity without implying generation after dark | Supplied-footage context |
| 00:44.47–00:46.50 | `decision` | Operations | Human commercial review under canopy | Supplied-footage context |
| 00:47.10–00:48.10 | `assessment` | Assessment | Text-free plate resolves into the live local-only form | Local-only preview |

The page master is additive: it contains 60 sky-hold frames, every approved
source scene frame, 120 finance-plate frames, 30 assessment-plate frames, and
seven 18-frame editorial bridges for **1,443 frames / 48.10 seconds at 30 fps**.
Bridges are endpoint dissolves/exposure lifts; matched geometry is not claimed.
The timecode columns are editorial windows, not claims that a source file
contains a Netso installation. Finance remains live HTML/SVG over the plate,
rather than an unverified film overlay.

The optional `01-interior-energy` and `02-unused-roof` preludes remain in the
curated source library but are explicitly excluded from the page master because
the approved `/v2` quality bar is sky-first.

## Cutup rules

- Use shape, luminance, or human action to motivate the cut; avoid decorative
  transitions that hide a missing source match.
- Keep each poster as the first-paint fallback for the matching shot.
- Keep originals untouched. Derivatives belong under `app/public/assets/v2/`.
- Label generated or composited architecture as **Concept visualization**.
- Label supplied operational and commercial footage as **Supplied-footage
  context** until site identity and installation provenance are verified.
- Use `NetsoStoryboard` for review; never send a storyboard slate cut as the
  client-facing master.
