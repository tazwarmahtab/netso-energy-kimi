# Netso claims boundary and alternative CI — design
Date: 2026-11-24; draft review only, not release approval.

## Goal
Restore a meaningful zero-false-claims source scan without exclusions or weakened patterns; provide a non-deploying CircleCI review pipeline as an alternative to pre-run GitHub Actions failures.

## Evidence
Baseline node verification/claims-cli.mjs app/src exits 1 with nine claims, all confined to three unreferenced components: CalculatorTeaser.tsx, FloatingSimulationChart.tsx, SavingsCalculator.tsx. No imports of those components exist anywhere in app/src. They are not shipped in the modern Glass build, but their stale finance claims are dangerous if reused.

## Options
- Add a scanner exception: rejected because it may mask future accidental public reuse.
- Rewrite all unused legacy components: unnecessary user-facing risk and ongoing maintenance burden.
- Remove only unreferenced stale components from the active source tree, preserving them in Git history; reuse the previously validated, no-deploy CircleCI config with review-branch filtering, and add source-scan regression coverage: selected.

## Safety
- Nothing removed from current application routes or shipping import graph.
- No scanner exclusions, no weakening policy, no deployments/merges or secrets.
- CircleCI project activation and hosted runner execution cannot be inferred from a valid YAML file; independent hosted evidence is still required.
- All review branches must remain non-production; staging is not a release automatically.
