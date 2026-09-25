# StudioNet verification

Contract: [`0xb8F972d56178804a56197E5F9b221C5AEfe2E325`](https://explorer-studio.genlayer.com/address/0xb8F972d56178804a56197E5F9b221C5AEfe2E325) on chain ID `61999`.

Immutable fixture commit: [`84bc69a83d3f06067bdeb5e0640ccb2820b957a9`](https://github.com/Azaria723/PatchLineage/tree/84bc69a83d3f06067bdeb5e0640ccb2820b957a9/fixtures). Exact paths, Git blob SHA-1 values and SHA-256 byte commitments are recorded in [`fixture-manifest.md`](fixture-manifest.md).

## Role separation

The deployment wallet performed deployment only. Every lifecycle and adversarial call below was sent by one of these two test actors:

- Actor A: `0x67A1A08Fc4cf7D05c859d0d3D8398a3A30B1677e`
- Actor B: `0x7C87B10a3d43F3b3551414401F8b26B9F662bAB5`

The contract stores no owner, administrator or deployer capability.

## Finalized transactions

| Operation | Transaction | Actor | Observed effect |
|---|---|---|---|
| Create upstream root | [`0x7cdd…16dd`](https://explorer-studio.genlayer.com/tx/0x7cdd60caaf697f03bf0a68a4e1e6c9440952a89d76c11c36119c3a8a7ec916dd) | A | Node `0` created from immutable upstream pair |
| Assess root | [`0x90c0…e1f5`](https://explorer-studio.genlayer.com/tx/0x90c04b206e315ab6023079328e684986bfc2d27a95ce05c6f593fd7348c8e1f5) | B | `ROOT_VALID`, `HIGH`, `PROPERTY_FIXED` |
| Submit equivalent backport | [`0xb0d6…5ea0`](https://explorer-studio.genlayer.com/tx/0xb0d6896560759c6739ab58946e53e0cf725fd6e21276d90beea0522f693d5ea0) | B | Node `1` created under root |
| Assess equivalent backport | [`0xd5b9…2268`](https://explorer-studio.genlayer.com/tx/0xd5b994ca711c108e34aa1cc077c804fe42d0b87be488bf6d23c06cb330172268) | A | `EQUIVALENT_FIX`, `HIGH`, `FULL_PROPERTY_COVERAGE` |
| Submit partial branch | [`0xe41b…033a`](https://explorer-studio.genlayer.com/tx/0xe41b3ec1eff9264b6961232e2a664f2518d5ad0e82d209c079ab5c1cf05c033a) | A | Node `2`, later classified `PARTIAL_FIX` |
| Submit unrelated branch | [`0x777b…f65a`](https://explorer-studio.genlayer.com/tx/0x777b632a09062a0768cbf4a8b9cc6d7407a5cb3aac24b64b4fc2b729824df65a) | B | Node `3`, later classified `UNRELATED_CHANGE` |
| Rejected-parent adversarial call | [`0x659f…90d9`](https://explorer-studio.genlayer.com/tx/0x659fbb262ebfc6452cc3b7233617d2dd6e43a3b2a15ac3655d941d30a56490d9) | A | Attempted child under reviewed node `2`; counters unchanged |
| Terminal assessment replay | [`0x111c…aafe`](https://explorer-studio.genlayer.com/tx/0x111c40e1eaa94e528964309e58aef5716fdd1f00e99b615a70bffa021c1baafe) | B | Replayed node `1`; node and counters unchanged |

All listed calls reached `FINALIZED`. During polling, StudioNet returned one transient `eth_getTransactionByHash: Service temporarily unavailable`; retry completed and authoritative readback succeeded.

## Authoritative final state

- Counts: nodes `4`, roots `1`, certified `2`.
- Node `0`: `CERTIFIED`, `ROOT_VALID`, confidence `HIGH`, reason `PROPERTY_FIXED`.
- Node `1`: `CERTIFIED`, `EQUIVALENT_FIX`, confidence `HIGH`, reason `FULL_PROPERTY_COVERAGE`, parent `0`.
- Node `2`: `REVIEWED`, `PARTIAL_FIX`, confidence `HIGH`, reason `INCOMPLETE_COVERAGE`, parent `0`.
- Node `3`: `REVIEWED`, `UNRELATED_CHANGE`, confidence `HIGH`, reason `NO_PROPERTY_RELATION`, parent `0`.
- Rejected node `2` could not become a parent.
- Reassessing terminal node `1` produced no state mutation.

The live results demonstrate positive certification, sibling DAG branching, two distinct semantic failure classifications, rejected-parent isolation and terminal replay safety against publicly pinned byte-level evidence.
