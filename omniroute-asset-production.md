# OmniRoute asset-production handoff

Status: local gateway healthy on Node 24; image generation still pending

## Verified local setup

- OmniRoute is installed under the user's existing Hermes-managed runtime.
- The local server was restarted on port `20130` to avoid the existing `20128`
  image-service convention.
- Health endpoint:
  `http://127.0.0.1:20130/api/monitoring/health`
- Runtime reported by OmniRoute: Node `v24.19.0`, OmniRoute `3.8.49`.
- Health now responds successfully after the Node 24 restart. The initial model
  catalog sync can take several minutes before the HTTP server is responsive.
- The model catalog exposed image-capable routes, including Gemini image,
  OpenAI image, Flux, and other provider-backed image models.
- Bundled OpenAPI media endpoints:
  - `http://localhost:20130/api/v1/images/generations`
  - `http://localhost:20130/api/v1/videos/generations`

## Why this is useful for Netso

OmniRoute can serve as a development-only media gateway for the representative
factory poster and later camera-frame derivatives. It must not be bundled into
the Netso client application or treated as a production website dependency.

The Netso app should receive only reviewed, optimized derivatives through the
site-study manifest:

`OmniRoute → image provider → review → web derivative → manifest`

## Attempted generation

The first attempts used the approved infrastructure-documentary prompt.

- Google Imagen through the OpenAI-compatible image route returned an upstream
  error from the provider adapter.
- OpenRouter image routing correctly reported that image/video output requires
  at least `$1.00` in account balance; no paid request was authorized.
- Gemini image chat returned a temporary model cooldown and a later request did
  not return before the bounded timeout.
- NVIDIA Flux Schnell accepted the request schema but the generation request
  timed out without a response. No image was claimed or copied into the app.

The later direct endpoint attempts exposed a local runtime problem: the gateway
could start its fallback SQLite driver but did not reach a responsive HTTP state
after restart. Rebuilding `better-sqlite3` in both the package and `dist`
locations did not resolve the startup hang under the host Node `23.11.0`.
Moving the launch to Node `24.19.0` fixed the startup state; the health endpoint
now returns `200` and reports a healthy OmniRoute process. A bounded direct image
request using the previously tried NVIDIA Flux route reached the image handler
but returned an upstream `404`; no image was claimed or copied into the app.

The route was left running for further bounded provider inspection. Do not treat
the healthy gateway as proof that any image provider is available.

## Current image-generation policy

- Do not add credentials, tokens, cookies, or provider payloads to the repo.
- Do not use a paid image route without explicit authorization.
- Do not treat a timeout as a successful generation.
- Treat provider `404`, cooldown, quota, and adapter errors as failed generation;
  none of them produce an approved asset.
- Save generated masters outside the app until reviewed for fictional identity,
  no logos/text, roof readability, crop safety, and visual continuity.
- Only an approved derivative should replace the temporary aerial poster in
  `app/src/components/site-study/manifest.ts`.

## Recommended next operation

Use OmniRoute's local dashboard to inspect the active image provider connection,
model quota, and cooldown state. Then retry one known free-capable image route
through `/api/v1/images/generations`. Prefer one poster generation before
requesting a frame family. Do not call `/api/v1/videos/generations` until the
poster route is healthy and the poster has been reviewed. If no free image route
responds reliably, keep the temporary poster; the illustrative GLB vertical slice
is now available for the optional site-study enhancement.
