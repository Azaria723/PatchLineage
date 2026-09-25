# Deployment

1. Push fixtures and record the immutable full commit in `verification/fixture-manifest.md`.
2. Deploy `contracts/PatchLineage.py` to StudioNet without constructor arguments.
3. Verify deployed/local source SHA-256 equality.
4. Set `VITE_CONTRACT_ADDRESS` and build the frontend.
5. Use non-deployer lifecycle participants to create and assess a root and backport.
6. Record exact transactions, consensus/execution status and authoritative readbacks.
7. Run a negative source path and verify the rejected node cannot become a parent.

