# Site-study GLB

`generate-site-study-glb.mjs` creates `public/assets/v2/site-study-factory.glb`
with Node built-ins only. It writes a deterministic glTF 2.0 binary containing
low-poly box primitives for the fictional factory massing, roof plane, parapets,
reference access path, roof utilities, loading edge, electrical context, and a
small solar reference field.

Run from `app/`:

```sh
node scripts/generate-site-study-glb.mjs
```

The model is an illustrative site-study asset, not a survey, customer site, or
installed project. The solar elements are explicitly reference markers only.
