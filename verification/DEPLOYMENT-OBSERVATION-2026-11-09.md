# Netso staging deployment observation — 2026-11-09

## Source/deployment reconciliation
- Repository: tazwarmahtab/netso-energy-kimi
- Branch: staging/netso-delivery-control
- Latest checked commit: 78b873491962feaac3d4159a61615026d94df8f8
- Vercel project: netso-energy-kimi-preview, prj_NhGzxGiNQ6f9FqRE7vJ4X3XkhBB2
- Deployment: dpl_FsX2nJvUzpCqd5g5xkh5vSfzQFJ1
- Deployment state: READY; readyState READY; source git; framework vite; target null (preview).
- Vercel deployment meta githubCommitRef and githubCommitSha match the branch and commit above.
- Build success evidence: Vercel READY deployment, not GitHub Actions execution.

## Independent test limits
- GitHub Actions workflow jobs continue to fail with no runner assigned and no steps. Job logs are unavailable.
- Browser Use read-only attempt returned insufficient_credits. No browser session was started.
- Public URL retrieval from web tool failed, and local container DNS resolution failed. No route response, mobile screenshot, console trace or form interaction was verified in this observation.
- ChatGPT Sites project is separate from the Vercel preview. Do not infer synchronization.
- A READY deployment is not a commercial, accessibility, or UX sign-off.

## Follow-up gates
1. Obtain full test, lint and build logs at the same commit, either by restoring GitHub runner or from another independent build.
2. Run browser navigation/console tests for /, /solutions, /capex, /opex, /homes, /calculator, /contact and legal routes.
3. Test keyboard, reduced motion, mobile viewport, focus, modal dismissal and enquiry WhatsApp handoff without transmitting personal data.
4. Reconcile full source commercial claims, privacy copy and all lead-handling code.
5. Compare staging screenshots and interaction evidence to the approved Sites design.
6. Keep release BLOCKED until verified and explicitly approved; never merge staging to master automatically.

## Observatory
Existing Netso staging observatory updated to daily recurring checks in Asia/Dhaka, including the GitHub branch and Vercel project. Staging-only fixes may be made with verification; production changes remain prohibited.
