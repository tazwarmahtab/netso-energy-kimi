# Netso public claims and legacy route safety — design
Date: 2026-11-24. Review-only. Base: staging/netso-delivery-control, commit 60767b0.

## Goal
Remove actively accessible false or unevidenced rooftop-solar financing, tariff, operational, project and engineering guarantees while retaining the premium Glass design and useful service explanations.

## Boundaries
- The factory borrows and owns in CAPEX. Netso supplies agreed development services inside EPC; no Netso debt, SPV or guarantee.
- A separate partner may fund and own OPEX under an approved, site-specific PPA, subject to feasibility, contracts and credit review.
- Do not quote fixed savings, percentages, export credits, tariffs, performance warranties, operating telemetry, secured financing, customer references or completion durations without verified evidence.
- No regulatory approval assumptions. Net-metering is subject to current rules, utility approval and site conditions.
- Source review branch only; no merge, deploy, purchase, DNS, or real enquiries.

## Options and decision
A. Edit the archived /classic page's extensive old modelling and components: high risk of leaving false values hidden in interactive states.
B. Keep /classic as a public route with a disclaimer: disclosure does not excuse incorrect numerical promises.
C. Redirect /classic to canonical / and remove its public switch; preserve source in Git for rollback, with About and Product copy revised in place. Selected for a reversible, auditable release candidate and smaller bundle.

## Acceptance
- /classic resolves to the canonical current homepage; no public "Classic view" link.
- About references Netso's Chattogram origin and correct CAPEX/OPEX roles; no unverified 20-year, IDCOL-approved, funded pipeline, installed portfolio or secured attribute claims.
- Product makes engineering options conditional on site assessment, strips invented equipment, I-REC, net-metering credit, rate, financial, payment, telemetry and warranty guarantees, and clearly identifies demo status.
- New regression tests fail against baseline, pass after repair; browser route render passes on portrait and landscape without uncaught errors.
- Independent review remains a separate go/no-go gate.


## 2026-11-24 scope amendment
The source review uncovered identical release-risk claims in the canonical homepage:
unapproved week/year delivery commitments, specified metering precision,
asserted regional technician/spare capacity, waterproofing promises,
automatic Netso risk allocation, and an unverified regulatory alignment banner.
Include edits in the existing public-claims branch; retain section order, visual
components, interaction and the approved hero message. These are copy/data
corrections, not new offerings or UI designs.
