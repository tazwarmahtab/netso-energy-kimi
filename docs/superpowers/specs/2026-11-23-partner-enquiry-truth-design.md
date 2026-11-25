# Netso partner-enquiry truth — design
Date: 2026-11-23. Status: implementation authorized by owner's standing direction to lead release work.

## Intent
Partners must see truthful Netso CAPEX/OPEX roles and prepare enquiries without a false delivered status.

## Constraints
- GitHub staging is canonical; Sites is a separate design reference.
- CAPEX: factory borrows and owns. Netso performs development services inside EPC. No Netso debt or guarantee.
- OPEX: partner-funded PPA, ownership, terms and feasibility are site-specific.
- No invented SPV, escrow, loan covenant, financed pipeline, secured credit facility or response SLA.
- No unconsented browser persistence of contact PII and no automatic WhatsApp opening.
- No push, merge, DNS change or production deployment without approval.

## Approaches
A. Add disclaimer alone: rejected because specific false statements remain.
B. Hide partners route: safe but loses partnership enquiry access.
C. Selected: keep approved Glass layout but rewrite unsupported claims and give users an explicit unsent review step, followed by a manual WhatsApp action. Best risk/benefit.

## Acceptance
- Page makes no funding or execution guarantees; CAPEX/OPEX roles correct.
- Partner form prepares message in React state without storage or network.
- Review screen states Netso has not received the enquiry and offers an explicit WhatsApp link and edit action.
- Test-first regression, lint, unit tests and build pass before any proposal to publish.
