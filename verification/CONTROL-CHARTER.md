# Netso Delivery Control — staging-only charter

Status: integration branch; NOT a release approval.

## Three independent loops

1. **Build:** reconcile the actual Sites source, approved visual baseline, current staging deployment and requirements. For behavior changes reproduce failure first, implement the smallest fix, then run focused and full regression tests.
2. **QA:** independently verify functionality, visual fidelity, motion, responsive behavior, accessibility, performance, commercial claims, security and enquiry handoffs. Capture immutable evidence with source SHA, deployment artifact digest, environment, timestamp and verifier.
3. **Observatory:** independently reconcile approved requirements, source, CI, staging, gap register, device coverage, evidence freshness and human decisions. Fail closed on missing collectors, stale evidence, mismatched deployment, or uncovered requirements.

## Authority boundaries

The implementer cannot close their own gap or sign off their own gate. A reviewer must be independent of the implementation. Human approval is mandatory for any production release. No changes to DNS, production website, real customer data, or live enquiries in this branch.

## Gates

G0 source and deployment identity; G1 requirements traceability; G2 visual fidelity; G3 functionality; G4 animation; G5 responsive and physical devices; G6 accessibility; G7 performance; G8 commercial claims; G9 security; G10 regression; G11 enquiry journey; G12 staging smoke; G13 explicit approval.

PASS requires current-build evidence. FAIL, BLOCKED and UNVERIFIED never count as PASS. P0/P1 gaps block; P2 requires closure or documented human-approved exception; P3 remains tracked. Closure needs independent evidence. No invented pass rates, metrics or claims.

## Initial reconciliation blockers

The master README currently contains legacy Netso-financed BOO/RESCO, 30% discount, and financing-under-appraisal claims that conflict with the later approved website constraints. Do not copy them into the active site without factual approval. Repository structure has now been identified: the Vite/React application is under app/ (app/package.json, app/src/App.tsx). The active ChatGPT Sites source and its relationship to this GitHub/Vercel application remain unverified. Never treat the GitHub build as proof of the Sites deployment.

## Definition of done

The exact staging artifact is verified against all approved requirements with fresh evidence, no open P0/P1, every required gate PASS, and documented human approval. Otherwise output BLOCKED, not success.
