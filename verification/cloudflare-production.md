# Cloudflare production verification

Production URL: [`https://patchlineage.pages.dev/`](https://patchlineage.pages.dev/)

Deployment URL: [`https://885ca521.patchlineage.pages.dev/`](https://885ca521.patchlineage.pages.dev/)

Deployment was produced from the frontend production build with StudioNet contract `0xb8F972d56178804a56197E5F9b221C5AEfe2E325` configured at build time.

## Verification

- Production document returned HTTP `200`.
- The supplied PatchLineage logo returned HTTP `200` and `1,160,004` bytes.
- A clean production-browser load first displayed the explicit `Reading StudioNet state` state instead of a false empty graph.
- Authoritative readback then displayed roots `3`, graph nodes `8`, and certified nodes `2`.
- The production UI displayed the exact on-chain classifications: `ROOT_VALID`, `EQUIVALENT_FIX`, `PARTIAL_FIX`, `UNRELATED_CHANGE`, `RISKY_DIVERGENCE`, `INCONCLUSIVE`, `SOURCE_UNVERIFIED`, and `PENDING`.
- The production header identifies StudioNet chain `61999` and the configured contract as `0xb8F97…2E325`.

No Cloudflare credential or wallet private key is stored in the repository or frontend bundle.
