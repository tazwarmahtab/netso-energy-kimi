# /v2 planning review — dispositions and receipts

Date: 2026-10-11 · Source baseline: `43a2c96`.

This is a redacted engineering summary, not raw agent logs. “Accepted” means incorporated into the proposed plan, **not fixed in application code**. See [blueprint](v2-experience-blueprint.md) and [ordered plan](v2-experience-plan.md).

## Independent skeptic: all 18 recovered findings

### Critical

1. **Assessment CTA versus preview — accepted with correction.** `FinalCTA.tsx:65-86,106-136` is explicitly local-only; upstream request language is the mismatch. `/v2` has its own WhatsApp links (`V2.tsx:106`), so excluding the shared widget is not an absence of contact. Other routes' dispatch is not presumed working. Plan: contact-first production surface; no implied receipt.
2. **Legacy browser credential and PII handling — accepted.** `app/src/lib/notion.ts:29-74,117-151` stores/logs lead data and references a browser-side API key. Actual configured exposure is unverified. Plan: prohibit reuse in `/v2`; separately escalate existing consumers; optional future server-side receipt contract.
3. **Manifest/asset mismatch can evade ordinary build — accepted risk.** Source manifest import and public media are distinct; `app/package.json` does not chain asset verification into `build`. No deployed mismatch demonstrated. Plan: validate and publish one app/media version atomically.
4. **Portal additions versus fixed master — removed from scope.** No portal, glyph tunnel or film regeneration in the initial upgrade. Preserve 1,443 frames and current master bytes; derivative posters are separate. Replacing master media requires an explicit version/approval decision.

### High

5. **Mobile static policy misses the master route — accepted.** `FrameSequence.tsx:73-77` limits its width-based fallback to legacy sequences; `/v2` uses the master. Plan: unified static policy; assert zero sequence requests at mobile/reduced-motion/data-saving settings.
6. **Later frame errors lack initial-frame recovery — accepted.** `FrameSequence.tsx:358-385` handles errors only under the initial gate. Plan: poster-backed current-chapter recovery, bounded retry/fallback and stale-target cancellation; fault-inject a mid-sequence request.
7. **Decoded cache retention/memory — accepted with measurement qualification.** `mediaFrameRuntime.ts:158-171,231-254` retains loaded records after lease release until eviction. Raw RGBA estimate is 168.75 MiB for 48 full-size frames, not measured browser memory. Plan: byte budget, explicit route ownership and repeated navigation profiling.
8. **Shared homepage bundle cost — accepted structural risk.** `App.tsx:15` statically imports `/v2`. The reviewer reported a prior bundle warning, but no fresh coordinator build receipt verifies its size. Plan: inspect bundle graph, isolate `/v2`-only loads and compare `/` against baseline; do not assert measured improvement now.
9. **Transition provenance not in scene markup — accepted.** `MasterStory.tsx:49-118` renders content scenes, not manifest bridge labels; `FrameSequence.tsx:124-134` hides scene wrappers in bridges. Plan: stage-level evidence description tied to the displayed segment, with no per-frame screen-reader announcements.
10. **Reduced-motion hash scrolling can still be smooth — accepted.** `App.tsx:20-24` requests smooth scrolling while `/v2` has separate hash logic. Plan: one `/v2` hash owner and immediate reduced-motion navigation; test clicks, deep links and history.
11. **Finance qualifications may separate from figures — accepted visual risk, not missing copy.** `FinanceChapter.tsx:39-50,68,72-82` already explains illustration and solar-portion limits. Plan: keep qualifications adjacent and readable at short heights/zoom; verify actual render and accessible labels.
12. **Vague optional-effect language — accepted.** Replaced optional portal/pacing adjectives with chapter contracts, scoped files, fixed master policy, static/error states, proposed budgets, tests and rollback. Budgets are targets awaiting baseline measurements.

### Medium

13. **Menu keyboard behavior incomplete — accepted.** `V2.tsx:43-56` lacks Escape/focus-return/controls wiring. Plan: an accessible disclosure, or complete dialog semantics if a modal is chosen; do not impose a modal focus trap on an ordinary disclosure.
14. **Finance may clip at short heights/zoom — accepted risk.** `v2-master.css:235-271` absolutely positions and clips the mobile embedded stage. Plan: normal-flow static finance; test 320×568, 390×667, landscape and 200% zoom. Source indicates risk; no fresh visual reproduction claimed.
15. **Preview field errors are not associated — accepted if preview retained.** `FinalCTA.tsx:113-124` has aggregate status and `aria-invalid`, without field error IDs. Plan: field-level descriptions for development preview; production contact-first mode removes the unused PII form.
16. **Assessment absent from rail state — accepted.** `V2.tsx:12-24,89-94` only tracks four chapters. Plan: Assessment in the semantic/nav model, stable `#v2-assessment`, correct final active state and no duplicate mobile row.
17. **Blue-gray fallback alleged to violate brand — reject categorical conclusion; retain rendered check.** `sky-hero-bar.md` explicitly calls for slate-blue/peach/amber sky continuity. A blue-gray fallback is not inherently a defect. Verify actual loading/error readability and scene continuity rather than replacing it based only on a hex token.
18. **Global metadata does not distinguish `/v2` illustration — accepted review gate.** `app/index.html:7-11` carries general commercial positioning. Plan: approve route-specific metadata and verify fetched HTML/social behavior; client title updates alone are not crawler verification.

## Gemini second opinion

- User approved an isolated, tool-disabled CLI review of the sanitized blueprint only.
- Installed CLI version checked: `0.25.1`. No model override or account change requested.
- Effective local configuration check passed: empty core-tool list; hooks/custom commands/subagents disabled; MCP allowlist matched no configured server; invocation disabled extensions and used default approvals. No global configuration was changed.
- Invocation returned authentication error **41**: selected Gemini API authentication could not find its required API-key environment variable.
- **No model review/verdict returned.** Do not describe this document as Gemini-reviewed. This attempt was superseded by the user's request for an OpenCode CLI review, subsequently clarified to require a free model. Never place credentials in the plan or chat.

## OpenCode CLI second opinion — free models only after clarification

User clarified that the reviewer must be a free model on OpenCode. No paid route was attempted after that clarification. Model selection here is a reasoned suitability choice, not a benchmark proving a universally best model.

| Attempt | Result | Review received? |
| --- | --- | --- |
| Installed OpenCode `0.7.9` with existing configuration | Incompatible newer configuration fields; used task-local isolated configuration instead of modifying global settings | No |
| Claude Opus 5.5 via OpenRouter, before the free-only clarification | Insufficient credits | No |
| Claude Opus 5.5 via OpenCode, before clarification | Insufficient funds | No |
| Google Gemini 3.1 Pro Preview via OpenCode CLI, before clarification | Quota rejection | No |
| `opencode/minimax-m3-free` | Listed by CLI catalog, but endpoint reported model unavailable | No |
| `opencode/glm-5-free` | Listed by CLI catalog, but endpoint reported model unavailable | No |
| `opencode/nemotron-3-ultra-free` using installed CLI | Listed in both CLI and live model catalogs; free-tier client gate rejected request | No |
| Same free model using official temporary `opencode-ai@1.19.0` CLI | Non-retryable HTTP 403: free tier restricted to OpenCode client access | No |
| User-requested `opencode/muse-spark-1.3-contributor-free` using official temporary CLI `1.19.0` | Same non-retryable HTTP 403 free-tier client-access rejection | No |

The public [live model list](https://opencode.ai/zen/v1/models) was checked after the unavailable-model responses. It lists `nemotron-3-ultra-free` and `muse-spark-1.3-contributor-free`, but not the two unavailable free IDs above. A catalog listing does not prove successful inference access. The Muse Spark request reached the `/zen/v1/responses` endpoint and returned the same access rejection; no quality comparison or model review can be inferred from this.

The final attempt used a temporary home, config, cache, state and data directory; no user credential files were copied. Agent tools/permissions were disabled, provider selection restricted to OpenCode, sharing disabled, and only the sanitized blueprint supplied through stdin. The official npm CLI was used without custom client-identification headers. The installed CLI and global configuration were not changed. No bypass or paid fallback follows the 403.

**Status: external model review remains blocked; no OpenCode model verdict exists.** The 18-item independent skeptic review above remains valid as a planning review, not a substitute falsely attributed to the requested free model.

## Subsequent Claude Code / Inkling 1M request

- User explicitly requested trying Claude Code CLI with Inkling 1M instead of the blocked OpenCode route.
- Installed Claude Code version: `2.1.287`. Attempted the provisional identifier `inkling[1m]`; its mapping to the requested model/context was not established.
- Invocation used safe mode, no built-in tools, disabled skills, an empty strict MCP configuration, no Chrome integration and no session persistence. Only the sanitized blueprint and reviewer instructions were supplied.
- CLI emitted an unrecognized-model diagnostic and returned **Not logged in / run login**. Receipt: zero API duration, zero input/output tokens, empty model usage, `is_error: true`, terminal reason `api_error`. No inference or review occurred; the diagnostic is not proof that a properly configured gateway cannot serve Inkling.
- Independent `claude auth status` confirmed no active authentication and the first-party provider for this profile; no Inkling gateway was identified.
- Next prerequisite: identify/authenticate the user's intended Claude Code profile or compatible gateway and obtain the exact selectable Inkling 1M model ID. Never request credentials in chat or relabel a Claude response as Inkling.

## Local verification

### Latest request: GPT-6.1 Sol

- User next requested Sol 6.1. Exact selected ID: `opencode/gpt-6.1-sol`, already observed in the OpenCode model catalog.
- Made one tool-disabled request through official temporary OpenCode CLI `1.19.0`, using the existing OpenCode credential store and isolated home/config/cache/state. No fallback model was configured.
- Provider returned **HTTP 402**, non-retryable: **Insufficient account funds**. No review or model verdict was returned. No funds were added and no billing/account settings were changed.
- At that point, the prerequisite was restored funding or an already working, user-approved Sol connection. That route was later superseded by the successful free Inkling review.

- Re-read current `/v2`, story, preview, finance math, frame handling/cache release, shared route scrolling, metadata and relevant CSS to adjudicate findings.
- Verified baseline manifest declarations: 30fps, 1280×720, 1,443 master frames; roof interval `[60,300)` contains 240 frames.
- Executed Python arithmetic assertions: **3/3 matched** — roof count 240; 48 RGBA frames 168.75 MiB; illustrative total-bill reduction 15% from 50% solar portion × 30% discount. These are calculations, not measured memory or promised savings.
- Product source remains unchanged. No new coordinator app build/test, current browser audit, performance measurement, external lead submission, commit or deployment performed.

The GPT-6.1 Sol route was superseded by the successful free Inkling review below. Do not request secrets in chat, add funds without authorization, substitute an unrequested model when a user has selected one, or alter client identity to evade provider gates. Commercial approval, media rights, contact verification and runtime checks remain implementation/release gates independently of model review.

## Completed free-model review: Thinking Machines Inkling

- **Harness:** OpenCode CLI `1.19.0`, tool-disabled `review` agent, no MCP/plugins, sharing disabled, isolated temporary config/state.
- **Model:** `openrouter/thinkingmachines/inkling:free` through OpenRouter, corresponding to OpenRouter catalog ID `thinkingmachines/inkling:free`.
- **Free/access evidence:** authenticated OpenRouter model catalog reported prompt price `0`, completion price `0`, and `1,048,576` context length. The direct API path correctly rejected this model as “only available on agentic harnesses”; OpenCode was used as the agentic harness.
- **Receipt:** completed with `11,967` total tokens (`8,346` input, `1,554` output, `2,067` reasoning), cost `$0`, finish reason `stop`. The response did not use tools or claim implementation testing.
- **Verdict:** proceed to P0–P1, but hold enhanced-motion promotion until conversion contract/legacy exclusion, runtime and asset coherence, and adjacent finance disclosure are enforced.

### Inkling findings and disposition

1. **Critical — legacy helper imported into `/v2`.** Accepted; sections 7 and 10 explicitly prohibit reuse and require artifact assertions.
2. **Blocker — production form/claims/WhatsApp mismatch.** Accepted; production is contact-first, contract language is constrained, destination requires owner verification.
3. **Blocker — manifest/media divergence and frozen/duplicate runtime.** Accepted; sections 6, 8 and 10 require poster-backed jumps, 3-second fallback, cleanup and atomic app/media release.
4. **High — finance 30% misread as whole-bill and exclusions hidden.** Accepted and tightened; section 4 now requires adjacent “30% solar-portion discount → 15% modeled total-bill reduction,” inputs and exclusions.
5. **High — unverified references/brand/fonts/master substitution.** Accepted; reference lock, license gates, current identity and explicit media-version changes remain mandatory.
6. **Medium-high — 168.75 MiB raw cache estimate exceeds ≤160 MiB target; mobile/error gaps.** Accepted; section 8 calls out the arithmetic and section 6 requires byte-aware ownership, mobile policy, later-frame failure tests and measured profiles.
7. **Medium — finance clips at short height/zoom.** Accepted; normal-flow static layout, 320×568/390×667/390×844, landscape and 200% zoom are required.
8. **Medium — menu/Assessment accessibility.** Accepted; Assessment is in the state model and keyboard disclosure behavior is a release gate.
9. **Medium — opening copy/provenance mismatch.** Accepted; current source wins over historical screenshot and every clip needs provenance/approved copy.
10. **Medium — external review/reference attempts unverified.** Accepted; this log records failed attempts separately, identifies the completed Inkling review with its source limits, and does not present unverified URLs as design evidence.

Inkling's three highest-value corrections and justified scope cuts match the existing blueprint. No additional product scope was added from the review.
