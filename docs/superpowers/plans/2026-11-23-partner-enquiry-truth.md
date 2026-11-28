# Partner Enquiry Truth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans task by task; RED → GREEN, verification and independent review.

**Goal:** Remove false financing and delivery assertions in the partner route.
**Architecture:** Preserve Glass React layout; change static claims and use local React state to prepare a WhatsApp draft. A visible outbound anchor is the only handoff.
**Tech Stack:** React 19, TypeScript, Vite 7, node:test.
**Spec:** docs/superpowers/specs/2026-11-23-partner-enquiry-truth-design.md

## Global Constraints
No actual outbound enquiry, no new dependency, no push/merge/production deploy. CAPEX factory-owned, OPEX partner-funded site-specifically. No automatic client-side PII storage.

## Review Focus
1. Storage denied still permits review.
2. Popup blocked does not prevent sending via explicit anchor.
3. Opening WhatsApp never counts as confirmed delivery.
4. Editing preserved draft remains possible.
5. Mobile and landscape CTA accessibility remain release gates.

### Task 1: Claims contract
**Files:** Create app/scripts/partners-truth.test.mjs; modify app/src/pages/Partners.tsx.
**Interfaces:** A source contract loaded via node:fs scans for prohibited copy and dispatch claims.
- [x] Write assertion for prohibited financing and execution claims and required truthful language.
- [x] Run focused test; expect FAIL on current implementation.
- [x] Change only the partner page copy to conditional, evidence-safe wording.
- [x] Run focused test; expect PASS.

### Task 2: Enquiry safety
**Files:** Extend test and modify app/src/pages/Partners.tsx.
**Interfaces:** getNetsoWhatsAppUrl(summary) formats the user-facing, explicit outbound anchor.
- [x] Write test requiring unsent review, edit action, no automatic popup and no local ledger.
- [x] Run test RED.
- [x] Make submit prepare draft only; show manual WhatsApp link and edit control.
- [x] Run focused test GREEN, then full lint, tests and build.

### Task 3: Certification
**Files:** Existing verification-results and plan.
- [x] Run a browser check of /partners with synthetic details; never send.
- [ ] Independently inspect diff against plan/spec and log unverified cases.
- [x] Maintain production NO-GO until all release gates pass and owner approves.
