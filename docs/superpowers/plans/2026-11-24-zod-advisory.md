# Zod Advisory Remediation Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL superpowers:executing-plans; evidence RED then GREEN, verify full suite.

**Goal:** Eliminate direct high-severity Zod advisory from release candidates.
**Architecture:** Raise current Zod 4 minimum and update lockfile. No application logic change.
**Tech Stack:** npm, React/Vite/TypeScript, Zod.
**Spec:** docs/superpowers/specs/2026-11-24-zod-advisory-design.md

## Global constraints
No network side effects beyond package-registry lookup; no production deployment or shared-branch merge.

### Task 1: Security test RED
**Files:** app/package.json, app/package-lock.json (read only).
- [x] npm ci and npm audit --omit=dev --audit-level=high on base SHA; expected FAIL with Zod below 4.6.6 (observed).
- [x] Record exact advisory and affected version.

### Task 2: Minimal patched dependency
**Files:** app/package.json and app/package-lock.json only.
- [x] Set Zod minimum to version 4.6.6 and update lockfile.
- [x] Run npm ci, npm audit --omit=dev --audit-level=high; expected PASS.
- [x] Verify dependency diff contains no unrelated version changes.

### Task 3: Release-preflight tests
- [x] npm run lint; expected exit 0.
- [x] npm test; expected all tests PASS.
- [x] npm run build; expected exit 0.
- [x] Record evidence, local commit and hold as draft PR without merge.
