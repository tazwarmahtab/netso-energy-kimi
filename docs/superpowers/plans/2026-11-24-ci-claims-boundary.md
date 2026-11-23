# Claims Boundary and CircleCI Review Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL superpowers:executing-plans; RED → GREEN verification.

**Goal:** Make active-source claim gate clean without an allowlist, and configure quality-only CircleCI.
**Architecture:** Delete three unreferenced financial-claim components, add a deterministic CLI contract test, adopt validated CircleCI config and extend review-branch filters.
**Tech Stack:** Node test, Vite, TypeScript, CircleCI CLI.
**Spec:** docs/superpowers/specs/2026-11-24-ci-claims-boundary-design.md

## Global constraints
No deletions of imported runtime files; no hosted deployment or shared merge.

### Task 1: Claims guard
**Files:** verification/public-claims-gate.test.mjs; 3 unused app/src/components files.
- [x] Add regression that expects claims-cli against app/src to exit 0.
- [x] Observe RED on staging baseline with exactly nine findings.
- [x] Confirm the three files have no imports, then remove them from current src.
- [x] Observe GREEN, then run TypeScript build.

### Task 2: CI fallback configuration
**Files:** .circleci/config.yml; verification/circleci-config.test.mjs.
- [x] Port previously validated no-deploy config from local feature worktree.
- [x] Ensure review branches are included and main/production excluded.
- [x] Validate using circleci config validate.
- [x] Verify CircleCI governance, claims and app-quality command equivalents locally.

### Task 3: Certification
- [x] Clean npm ci, lint, app unit tests and build.
- [x] Source scan zero findings, control tests green and fail-closed release example still blocked.
- [x] Record exact commit and limitations; draft PR only.
