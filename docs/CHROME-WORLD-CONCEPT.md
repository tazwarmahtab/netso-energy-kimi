# Netso Chrome World — isolated design variant

Status: **experimental preview only**. The canonical homepage at `/` and existing `/glass` are not replaced.

## Visual direction

At `/chrome-world`, a single fixed, viewport-sized LiquidChrome shader runs behind the full
homepage from the hero through the footer. This is not one giant page-height WebGL surface
and never creates per-section contexts.

- **Existing hero:** retains its rooftop imagery, claims, CTAs, scroll interactions and navigation.
- **Floating chapters:** architecture, operations, proof, benefits, process, network and
  assessment use distinct translucent dark reading surfaces with thin gold/cream outlines.
  Large blurred backdrops were avoided for GPU cost; the existing smaller glass components
  retain their interaction behavior.
- **Bare metal intervals:** three intentionally empty scenes after the marquee, before
  network, and before the footer show the continuous material without overlays.
- **Closing:** the existing NETSO° footer typography sits over the same single shader.
  No second WebGL effect or false portfolio/financing claims were introduced.
- **Mobile comparison:** an unobtrusive link returns to the original glass version.

## Performance and accessibility

- One lazy WebGL2 renderer, DPR <= 1, capped at 24 render frames/second, no pointer
  interception or cursor ripple work.
- The original renderer's defaults remain available on the unchanged homepage.
- Motion-reduction and missing-WebGL2 use a static metallic CSS fallback.
- The renderer halts or unmounts on tab visibility changes; scene content stays legible.
- A background never receives keyboard focus; navigation, modal, and day/dusk
  controls remain in foreground DOM.
- Responsive sections have opaque-enough reading surfaces; open sections have zero text.
- Global Chrome World styling is scoped to `.g-chrome-world`.

## Release gates

Before any production or Sites use: cross-browser Safari/iOS GPU and energy impact,
accessibility/color contrast, exact commit checks, security audit and independent review.
A temporary Cloudflare Tunnel or local Vite preview is **not a durable production deployment**.

Current GitHub Actions failure is an account billing restriction; Vercel preview project
also has a fair-use deployment block. Never bypass those restrictions by deploying
into a live site. The ChatGPT Sites project's editor remains a separate destination
and has not been modified by this variant.

Rollback: this work is isolated as route `/chrome-world`. Removing that route and
the optional world-only component restores the original experience without touching
the default homepage.
