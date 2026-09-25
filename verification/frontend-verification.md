# Frontend verification

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
