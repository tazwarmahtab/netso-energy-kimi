# Netso dependency-security patch — design
Date: 2026-11-24.
Context: npm audit against the exact combined candidate found a direct high-severity dependency vulnerability in Zod 4.6.5.

## Goal
Raise the minimum Zod version to 4.6.6 to remove GHSA-mrhx-c7xc-m3w5 (memory exhaustion for oversized constrained collections) without unrelated dependency or feature changes.

## Options
1. Ignore advisory: unacceptable for release certification.
2. Replace validation framework: unnecessary behavioral risk.
3. Update Zod within its current major version, update lock, rerun npm ci, audit, lint, unit tests and build: selected.

## Constraints
- No release or deployment. No code refactor; existing Zod APIs must compile and tests must pass.
- Keep upgrade narrowly scoped to app/package.json and app/package-lock.json.
- CI status still must be independently repaired; local npm audit success cannot replace hosted jobs.
- If npm audit cannot be completed with current registry data, treat as unverified rather than secure.
