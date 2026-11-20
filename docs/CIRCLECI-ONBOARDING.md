# Netso CircleCI — review-only CI handoff

## Scope

Repository: `tazwarmahtab/netso-energy-kimi`.
Configuration: `.circleci/config.yml`.
Initial branch: `feature/liquid-chrome-material-bridge-preview`.
Other allowed branch: `staging/netso-delivery-control`.

**No job deploys, merges, approves, updates DNS, or modifies ChatGPT Sites.**
This is an alternative CI runner for GitHub Actions jobs blocked by the
repository owner's GitHub account billing lock. It does **not** supersede
Netso release controls or human go/no-go approval.

## One-time CircleCI account/repository connection

The CircleCI CLI is installed on the Mac and `circleci config validate`
passes, but no CircleCI API login or linked CircleCI project was detected
when this configuration was prepared. Therefore there is **no CircleCI
pipeline run ID, dashboard result, or CircleCI green check yet**.

1. Sign in at https://app.circleci.com/projects/ using your GitHub identity.
   Use CircleCI's GitHub App connection and grant repository access to
   `tazwarmahtab/netso-energy-kimi` (and only the repositories you intend).
2. Create/select the CircleCI project for the existing repository and choose
   **Use existing configuration** at `.circleci/config.yml`.
3. Ensure the push or PR trigger includes
   `feature/liquid-chrome-material-bridge-preview`. If using GitHub App
   pipelines, confirm the event trigger in CircleCI's project setup; workflow
   branch filters alone do not create triggers.
4. Observe the three independent jobs and capture their URL, statuses, and
   exact checkout SHA. Verify the CircleCI SHA equals the GitHub PR head.
5. The project must keep both **app-quality** and **delivery-contracts** green
   and **commercial-claims** green before any merge or promotion proposal.
   The merge is still explicitly separate from CI results.
6. Only after CircleCI reports working checks and reviewer approval should
   administrators update branch-protection **required status checks**. Do
   not disable or bypass existing GitHub requirements beforehand.

CLI alternative (after CircleCI sign-in):

    circleci auth login
    circleci auth me
    circleci config validate .circleci/config.yml
    circleci onboard --scan --org gh/tazwarmahtab

`circleci onboard` may change the project configuration; inspect prompts
and choose the existing config, not a generated replacement. Authentication
uses browser OAuth and is user-controlled. Do not post tokens into GitHub
or chats.

Official setup:
https://circleci.com/docs/guides/getting-started/create-project/

## Jobs and acceptance evidence

| Job | Checks | Expected behavior |
| --- | --- | --- |
| `delivery-contracts` | Charter tests, fail-closed example release, gap schema | Must pass |
| `app-quality` | Node 22, `npm ci`, tests, lint, TS/Vite build, high/critical dependency audit, exact SHA + SHA-256 artifacts | Must pass |
| `commercial-claims` | Netso approved-copy scanner over `app/src` | Must pass before promotion |

**Known existing blocker:** Local claims scan finds **11 prohibited-claim
matches** in pre-existing components (`CalculatorTeaser`,
`FloatingSimulationChart`, `InstitutionalEconomics`,
`SavingsCalculator`). These have NOT been silently excluded from CircleCI
and must be independently audited and corrected, with copy approval.
They are unrelated to the LiquidChrome shader and do not justify removing
the claims-scanning gate.

The prior GitHub Actions `Netso delivery control guard` jobs were **not
started**; check annotations reported an account billing lock. A failed
Actions status is not evidence that local app tests fail, but is still
a required gate until branch-protection is formally changed.

## Verify source/config locally

    circleci config validate .circleci/config.yml
    node --test verification/*.test.mjs
    node verification/claims-cli.mjs app/src
    cd app && npm ci && npm test && npm run lint && npm run build
    npm audit --omit=dev --audit-level=high

Expect the claims scan to return nonzero until the existing copy issues are
resolved. Do **not** use an allowlist, `|| true`, skipped paths, or a
shortened scanner scope just to obtain a green badge.

## Release policy

The CircleCI pipeline only produces verification evidence. It cannot certify
that the ChatGPT Sites version was edited, that a Vercel deploy is accessible,
or that independent site review was approved. Rollback is unchanged:
keep PR #10 draft and the feature unmerged until all required gates pass.
