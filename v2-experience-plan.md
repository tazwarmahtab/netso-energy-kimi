# Netso /v2 upgrade — implementation plan

Date: 2026-10-11 · Baseline: `43a2c96` · Planning only; implementation/deployment not started.

**Outcome:** a distinctive rooftop-energy story that earns trust and makes a truthful commercial conversation easy. **Scope:** selective expansion of `/v2`; preserve `/` and existing routes. Detailed contract: [v2-experience-blueprint.md](v2-experience-blueprint.md).

## Decisions

- Keep forest/cream/gold, sky-first opening and one cinematic playhead.
- Journey: Roof → Structure → Economics → Operations → Assessment.
- Use contact-first production behavior, not a fake submitted-request form. The current local preview remains explicitly a demo if retained during development.
- No stacked portals/spotlights, forced scrolling, new simulator or live dashboard, unlicensed media reuse, browser-side provider secret or localStorage lead ledger.

## Ordered work

1. **Lock truth and baseline.** Approve brand, claim register and contact destination; capture current production-build visuals/performance; verify source/public media alignment. Done when assumptions and source status are explicit.
2. **Build semantic/static story.** Scope `V2.tsx`, `MasterStory.tsx`, `FinalCTA.tsx` and `/v2` styles. Align CTAs, provenance, chapter anchors and accessible menu. Done when the complete story/contact path works without film.
3. **Harden the one runtime.** Scope `FrameSequence`, shared frame runtime, chapter helpers and constants. Add mode/scroll ownership, byte-bounded decode, poster-backed distant jumps and cleanup tests. Done when failure/resize/back-navigation cases preserve content and focus.
4. **Art-direct existing assets.** Refine the sky-to-roof signature, structural reading beat, calm economics and operations sequence. Done when mobile posters, seams and actual rendered typography pass `sky-hero-bar.md` and the blueprint.
5. **Validate economics and evidence.** Keep the static example; distinguish solar-portion discount from total-bill reduction; remove unsupported proof/live claims. Done when the commercial owner approves copy and chart/data/accessibility labels agree.
6. **Integrate and make a release decision.** Run build, lint, film tests/verifiers, behavioral and viewport matrix, performance and privacy assertions; verify `/` unchanged. Done only with actual receipts and a coherent app+media rollback version. Deployment needs separate approval.

Steps 2/3 can run in parallel after shared contracts are fixed; step 5 can run alongside step 4 after commercial inputs. One owner integrates shared files. Leave existing untracked `app/.21st/` untouched.

## Checks and stop conditions

From `app/`: `npm run build`, `npm run lint`, `npm run test:film:master`, `npm run film:verify`, `npm run film:master:verify`. Add browser checks for every chapter hash, mode switch, missing/slow media, menu/keyboard access and contact action. These checks are planned, not reported passed.

Do not release if claims/rights are unapproved, CTAs imply nonexistent submission, credentials/PII leak, assets disagree with the manifest, or navigation/static fallback fails. If motion alone misses budgets, ship the passing static path rather than weakening the gate. See blueprint sections 8–10 for quantitative targets and rollback.

## Planning handoff

All 18 recovered independent-review findings have a disposition in [v2-review-log.md](v2-review-log.md). Earlier OpenCode free-tier attempts with `nemotron-3-ultra-free` and `muse-spark-1.3-contributor-free` were rejected by the provider gate. The later authenticated OpenRouter/OpenCode Inkling Free review completed at `$0`; its actual verdict and dispositions are recorded in the review log. Arithmetic verification matched 3/3 figures. No app code changed, new app checks run by the coordinator, or deployment made in this planning task.

The Claude Code / Inkling 1M attempt was blocked by missing authentication and an unverified model mapping. The user's later free-model request was fulfilled with OpenCode `1.19.0` using `openrouter/thinkingmachines/inkling:free` at `$0`, with a 1M context window and tools disabled. Inkling returned a source-limited adversarial review; its ten findings and three priority corrections are recorded in [v2-review-log.md](v2-review-log.md), and the plan was tightened for adjacent finance disclosure. No product code changed or deployed.
