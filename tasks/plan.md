# Netso Taste Skill adoption — staging implementation plan (2026-11-17)

## Boundary
Target: existing draft PR #9 into `staging/netso-delivery-control`. Preserve all canonical sections, model-specific claims and visual continuity. Do not change production, merge, approve external charges, or run Taste Skill executable scripts until security warning is resolved.

## Ordered delivery
1. **Security/provenance checkpoint** — inventory third-party scripts, process/network/filesystem access, check upstream pinned SHA, and keep bundled skill files uncommitted until independently cleared. Done when file-level risks are documented; external scanner verdict remains an explicit hold if its rationale is unavailable.
2. **Fix QA false negatives** — add a failing test proving a lazily loaded route takes >400 ms to become ready, then update the browser runner to await a visible main H1 and scope page error collection to each route. Done when RED→GREEN test and project tests pass.
3. **Accessible visual review** — check primary Netso pages at desktop/mobile, reduced motion and forms, classify only reproducible P0/P1 defects and respect approved copy. Done when evidence per route is recorded; unverified checks remain visible.
4. **Delivery review** — independently review PR diff, run lint/build/tests, inspect automated review threads and Vercel status. Hold PR as draft if deployment or security checks remain unverified.

## Risk gates
- Upstream Taste Skill installation reports conflicting critical/medium/zero-alert results; no unconditional trust or executable gate invocation.
- Vercel preview URL returned 402 despite older READY deployments; hosting status is not equivalent to deployment access or current commit.
- Previous 28/28 local browser smoke checks did not cover timing, keyboard navigation or visual hierarchy.
- No automatic merge or deployment. Approval requires a working exact-commit staging preview and independently verified QA.
