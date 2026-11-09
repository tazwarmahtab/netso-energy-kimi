# Glass homepage commercial remediation — 2026-11-09

## Implemented on staging
- GlassHero headline corrected to 'Your roof. A new energy asset.'
- GlassHero paragraph replaced with approved two-lane factory and home copy.
- GlassTicker now lists only: Industrial rooftops; Solar canopies; Site assessment; Engineering design; Installation.
- GlassOperations and PROCESS descriptions no longer claim Netso owns or finances all assets.
- GlassFooter no longer uses the unverified 'Netso Energy Ltd' legal identity.

## Still blocked
- sections-a.tsx GlassEconomics contains a modeled 30% floating discount and saving calculations (around source line 592 before edits). This is not an approved commercial offer. Remove or redesign entire calculator before release; changing a disclaimer alone is insufficient.
- sections-b.tsx GlassWhy MARKET contains an unsupported 30% discount, plus numerical market assertions needing evidence. Replace the whole argument with evidence-backed qualitative content before release.
- /classic Home.tsx and other components may retain prohibited claims. Run source scanner over app/src and reconcile every finding with explicit evidence.
- The scanner currently detects only a limited set of wording. A passing scan is not a full commercial approval.
- Hosted CI fails before runner assignment. No reliable remote build or browser parity proof is available.
- No Sites publication, production deployment or master merge is authorized.

## Next proof
At the exact staging SHA: execute node --test verification/*.test.mjs, node verification/claims-cli.mjs app/src, npm ci && npm test && npm run lint && npm run build in app, then browser visual/a11y/interaction tests. Release remains BLOCKED.
