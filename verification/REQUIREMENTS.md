# Netso staging requirement traceability (baseline pending source reconciliation)

Each row is UNVERIFIED until a verifier attaches current-build evidence. No synthetic PASS values.

| ID | Acceptance criterion | Evidence required | Gate |
|---|---|---|---|
| R-001 | Hero renders without blank first screen or stuck loader | browser video, first-paint trace | G2,G3 |
| R-002 | Hero headline and CTA match approved copy | DOM and approved reference | G1,G8 |
| R-003 | Marquee contains exactly Industrial rooftops, Solar canopies, Site assessment, Engineering design, Installation | DOM text and accessible tree | G1,G8 |
| R-004 | Marquee seamless and readable, pauses on hover and reduced motion | video, reduced-motion test | G4,G6 |
| R-005 | Building-fit starts in daylight and transitions to dusk | screenshots and state trace | G2,G4 |
| R-006 | Building-fit roof structure, loads, wind, drainage, access topics remain available | DOM and keyboard test | G3,G6 |
| R-007 | Mobile matches desktop design intent without cropped text, blocked CTAs or oversized overlays | real iPhone and Android recordings | G2,G5 |
| R-008 | All approved navigation, back and reverse transitions work | E2E recordings | G3,G4 |
| R-009 | Reduced-motion users can access every meaningful section | OS/browser reduced-motion walkthrough | G6 |
| R-010 | CAPEX copy clearly distinguishes factory-owned project and Netso development services | independent commercial review | G8 |
| R-011 | OPEX copy describes partner-funded site-specific model, not guaranteed Netso funding | independent commercial review | G8 |
| R-012 | No fabricated tariffs, savings percentages, payback, portfolio, clients, bank approvals or backup claims | source + rendered text audit | G8 |
| R-013 | Enquiry validation, submission and receipt are verified without sending real customer data | controlled test enquiry and receipt evidence | G11 |
| R-014 | Source commit, CI evidence, deployment digest and Sites version reconcile | signed provenance record | G0,G12 |
| R-015 | Performance targets LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75 where data is available | field data or labeled lab provisional results | G7 |
| R-016 | No P0/P1 gaps and no self-approved closures | gap register and reviewer identities | G10,G13 |

## Initial evidence status

All requirements UNVERIFIED for the current Sites deployment. A historical version-47 observatory report with 68 checks is not sufficient proof of the present GitHub branch or its deployment. Before signing off, obtain the approved Sites source, deployment version, actual screenshots, full device matrix and independent reviewers.

## QA collection contract

For every run capture UTC timestamp, commit SHA, artifact digest, Sites version, browser/OS/device, test ID, expected result, actual result, screenshot or trace location, independent verifier and any unresolved uncertainty. Missing collection must fail closed.
