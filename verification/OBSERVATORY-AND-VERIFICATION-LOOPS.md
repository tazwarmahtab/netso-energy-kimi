# Netso Website — Verification Loop and Observatory Contract
Date: 2026-11-09. Applies only to staging/netso-delivery-control. This document specifies operating behavior; it does not by itself deploy a monitor.

## Two distinct loops
### Build / verification loop (after every bounded change)
1. Observe: capture source SHA, preview alias -> deployment ID/SHA, current route/interaction screenshots and existing failures.
2. Hypothesize: write issue, severity, expected result and minimal reproducible test.
3. Change: smallest staging-only code change; preserve approved hero, service copy and CAPEX/OPEX constraints.
4. Verify: run tests, lint, build, browser routes, desktop/mobile 360/390/768/1440, keyboard and reduced-motion, console/network, contact draft/WhatsApp handoff; do not send a real enquiry.
5. Independently review: reviewer must examine diff and evidence; author must not self-certify.
6. Reconcile: compare GitHub HEAD, Vercel deployment SHA, alias SHA, rendered content and screenshot. Any mismatch blocks green.
7. Record: append timestamp, SHA, deployment, tests, results, screenshots/logs, outstanding defects and rollback commit to a durable evidence ledger.
8. Repeat only on failed gates with bounded fixes. Escalate auth/billing/policy blockers; never fabricate a pass.

### Observatory / observation loop (recurring and after deployment)
- Watch staging branch commits, GitHub Actions runner execution and conclusions, Vercel deployment and alias mapping, staging routes/HTTP behavior, JS console, asset failures, page weight and Web Vitals, mobile overflow, reduced-motion behavior, contact route and daylight/dusk/marquee behavior.
- Watch separate ChatGPT Sites preview for design drift, without treating it as production truth.
- Reconcile independent signals: code, build, deployment, alias, browser runtime and approved copy.
- Alert only on meaningful change, new regression, failed gate, or required human decision; include evidence and proposed bounded fix.
- Record each observation with timestamp and source, including no-change results. Missing evidence = UNKNOWN, not PASS.
- A scheduled observatory is not equivalent to runtime testing. Verify its actual schedule and execution history separately.

## Gate matrix
G1 source + approved copy; G2 CI executable and passing; G3 Vercel READY and alias SHA reconciled; G4 direct routes; G5 desktop/mobile responsive; G6 reduced-motion/keyboard/a11y; G7 animations/toggle/marquee; G8 enquiry truth and error paths; G9 performance and asset/network/console; G10 independent reviewer and rollback.
Every gate: PASS / FAIL / BLOCKED / UNKNOWN with evidence URL, timestamp, SHA and owner. Release requires all critical gates PASS.

## Hard boundaries
No production deployment, DNS/domain changes, paid services, credentials, real enquiry submissions or invented commercial claims. Require separate approval for irreversible or external-impact actions. Do not suppress CI failures, alter tests to fake green or treat Vercel READY as a full certification.
