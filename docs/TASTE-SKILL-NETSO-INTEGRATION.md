# Taste Skill integration — Netso staging

Source: https://github.com/Leonxlnx/taste-skill (design-taste-frontend, documented upstream v2.5.1 as of 2026-11-17).

## Install on the Codex / agent workspace

From repository root (not `app/`):

```sh
node --version # Node 22+ required by upstream
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend
```

Check for `.agents/skills/design-taste-frontend/SKILL.md` and its accompanying `scripts`, `assets`, `references`, and `library` folders. If CLI offers global vs project, select project. Commit the new skill and updated `skills-lock.json` together on a review branch only after examining the upstream code. If the Codex plugin route is preferred instead, use `codex plugin marketplace add Leonxlnx/taste-skill` and `codex plugin add taste-skill@taste-skill`, then restart Codex. Do not claim it is installed until those files exist and the agent recognizes the skill.

## Netso-specific application

Classify Netso as a **solar engineering/development service**, not SaaS. The upstream skill's generic rule prohibiting effects on service pages is *advisory*: Netso's approved cinematic architecture, authored scroll choreography, GSAP/Lenis, shader moments, black/yellow brand and existing hero take precedence. The skill is an **audit and polish instrument**, not authorization to regenerate the website or discard its visual continuity.

1. Preserve canonical hero and visual continuity (`VISUAL-CONTINUITY.md`), section order and already approved copy. A visual reference is never evidence of a commissioned Netso project.
2. Audit the route hierarchy, section purpose, alignment, typography, content density, imagery fidelity, keyboard/focus behavior, mobile cropping and CTA clarity. Preserve existing industrial-rooftop visual language.
3. Use a per-route screenshot matrix: desktop 1440x900, laptop 1024, tablet 768, phone 390. Check first paint, after scroll, reduced motion and interactions. Test navigation, content visibility, layout overflow, image loading and the page's primary action.
4. Use upstream `scripts/consistency.mjs`, `scripts/perf.mjs`, `assets/layout/check.mjs`, `scripts/shoot.mjs`, `scripts/gate.mjs` only once the full skill folder is present and compatible. Do not falsify scores or mark checks passed when not run.
5. Prioritize: (P0) functional/accessibility/false-claims failures; (P1) visual hierarchy/responsive/performance failures; (P2) optional editorial/motion polish. Fix one bounded family at a time; inspect screenshot before/after.
6. No invented tariffs, capacity, savings, customers, project portfolio, generated impact figures, operating plants or financing commitments. CAPEX: factory borrows and owns, Netso development-services only; OPEX: partner-funded PPA terms/site fit depend on assessment. Daytime grid-tied solar is not backup.
7. Keep every implementation **staging only** on `staging/netso-delivery-control` or a PR targeting it. Never merge into `master` or publish live without separate approval.
8. Report the exact ref/commit, changed paths, test command exit codes, real screenshots inspected, open blockers and acceptance status. A design critique is not a production pass.

## First evidence-gated review

- Homepage: hero → metadata → architecture → economics → operations → RMG/engineering → outcomes → process → rationale → network → origination. Verify each transition carries subject, lighting or geometry from the preceding scene.
- Solutions: clarify the three distinct paths (CAPEX, OPEX, homes) without implying Netso finances CAPEX.
- CAPEX/OPEX: verify offer logic, finance wording, CTA, approval boundaries, and separation of illustrative from site-specific terms.
- Calculator: preserve CAPEX plant-size/self-consumption-only display and OPEX site-specific partner treatment; check inputs, validation, defaults, keyboard use and numerical disclaimers.
- Contact and remaining pages: verify plain service proposition, accurate CTA and responsive focus/navigation.

This document records **adoption preparation only**. It does not certify CLI installation, browser QA, or website changes.
