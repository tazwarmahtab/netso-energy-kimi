# Netso Toolchain Security Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL superpowers:executing-plans; verify baseline RED and patch GREEN.

**Goal:** Repair Vite, typescript-eslint and related build-time dependency advisories.
**Architecture:** Apply permitted same-major dependency upgrades; rely on separate PR #17 for production Zod patch.
**Tech Stack:** npm, Vite 7, typescript-eslint 8, TypeScript 5.
**Spec:** docs/superpowers/specs/2026-11-24-toolchain-security-design.md

## Global constraints
No runtime feature changes, no major-version upgrades, no auto-deploy or shared-branch merge.

### Task 1: Advisory baseline
- [x] Run full npm audit on base after npm ci. RED: 2 high / 8 moderate, including Zod addressed separately.
- [x] Document precise affected packages and versions.

### Task 2: Minimal patch
**Files:** app/package.json, app/package-lock.json.
- [x] Update Vite within v7 and typescript-eslint within v8.
- [x] Update transitive minimatch/postcss-selector-parser to patched versions where semver permits.
- [x] Rerun npm audit; expected no toolchain high/moderate, Zod finding may remain.
- [x] Confirm no unrelated source edits or major dependency changes.

### Task 3: Verification
- [x] npm ci, lint, tests, build; all pass.
- [ ] Verify merged candidate with security PR #17 has full audit zero findings.
- [x] Record evidence and publish draft-only PR.
