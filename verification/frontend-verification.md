# Frontend verification

Configured StudioNet contract: `0xb8F972d56178804a56197E5F9b221C5AEfe2E325`.

The graph readback now has explicit loading and RPC-error states with bounded automatic retries. A transient RPC failure no longer renders the authoritative graph as an empty lineage. After any finalized write, the success message is shown only when contract state reconciliation succeeds; otherwise the UI reports finalized-but-readback-unavailable and offers retry.

Live browser verification after the extended run showed root fixes `3`, graph nodes `8`, certified nodes `2`, and the exact on-chain classifications for nodes `0` through `7`, including `RISKY_DIVERGENCE`, `INCONCLUSIVE`, `SOURCE_UNVERIFIED`, and `PENDING`.

Date: 2026-09-25

- Production command: `npm run build`
- Result: successful Vite production build
- Modules transformed: 2,031
- Production dependency audit: `0 vulnerabilities`
- Responsive preview: verified at narrow viewport
- Logo asset: `frontend/public/patchlineage-logo.png`, copied from the user-provided image
- Submission drawer: root and backport modes render with complete immutable source fields
- Empty deployment state: shows `Awaiting deploy` rather than a fabricated contract address

The frontend waits for `FINALIZED`, refreshes authoritative contract state after writes, preserves transaction hashes, binds graph nodes to exact returned IDs, and does not contain private keys or testing-account instructions.
