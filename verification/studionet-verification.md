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

## Extended adversarial run

Additional immutable fixtures are pinned to commit `87375ab75d7dc1378bdfd285e600d64e610e5e6c`.

| Operation | Transaction | Result |
|---|---|---|
| Submit risky divergence | [`0x15e6…27f5`](https://explorer-studio.genlayer.com/tx/0x15e66ff425a79a2c544077cae42c431fb377f8467d15e31b8c971de444ad27f5) | Node `4` appended |
| Assess risky divergence | [`0x1b32…b00c`](https://explorer-studio.genlayer.com/tx/0x1b3225fe09f4ad332c4df68efffe45af75df7436c5c63f4b76f888723c1ab00c) | `RISKY_DIVERGENCE`, `HIGH`, `NEW_SECURITY_REGRESSION` |
| Submit ambiguous adapter | [`0x88c7…d956`](https://explorer-studio.genlayer.com/tx/0x88c78c21fe2671fce0c5e0cf2eea9b8e6de53588e6cf1b3f144cdfa98636d956) | Node `5` appended |
| Assess ambiguous adapter | [`0x4685…a2a6`](https://explorer-studio.genlayer.com/tx/0x4685df72356199d21e61d1e423a1119bb982b0f85ae9113920ea397c96eaa2a6) | `INCONCLUSIVE`, `MEDIUM`, `AMBIGUOUS_CHANGE` |
| Submit tampered digest | [`0x3f6e…97de`](https://explorer-studio.genlayer.com/tx/0x3f6e5918179cb9afdd9f306aeb961737960c852d1e39020d940b73cc2f5997de) | Node `6` appended with an intentionally false digest |
| Assess tampered digest | [`0x20f1…0eca`](https://explorer-studio.genlayer.com/tx/0x20f1d3b79f2fdc3506d6a49dddbaa00b22696866be83ab219fa0b67569680eca) | Failed closed as `SOURCE_UNVERIFIED` |
| Create pending parent | [`0x6e1d…16e3`](https://explorer-studio.genlayer.com/tx/0x6e1d90775ea91e7a9bca88244bff62ae66333dc27aa1ae1a8e460a41f57b16e3) | Node `7` retained pending for parent-isolation proof |
| Pending-parent guard | [`0xfac6…170b`](https://explorer-studio.genlayer.com/tx/0xfac6ce03018c7ed0888f34923923cabf336b0b23f071d8baca934f57640f170b) | Counters unchanged |
| Duplicate-pair guard | [`0x1be7…dad8a`](https://explorer-studio.genlayer.com/tx/0x1be7fdbb11895e3f79ab1841dc6252dd19d83d708c1c1a9bc8d802c77c3dad8a) | Counters unchanged |
| Missing-parent guard | [`0xa649…f30f`](https://explorer-studio.genlayer.com/tx/0xa649f083a33e8231a0330912426f78945a6746e60c677227a086d456c987f30f) | Counters unchanged |
| Invalid-input guard | [`0xdd61…537c`](https://explorer-studio.genlayer.com/tx/0xdd6118c6d87f3f2e36610e584407711803f6c39d98d24ec177756e35a80e537c) | Counters unchanged |
| Missing-node assessment guard | [`0x7b19…fb28`](https://explorer-studio.genlayer.com/tx/0x7b1908985120e35a41af2917931e356769d08c89ca443dc4666237b01ea4fb28) | Counters unchanged |

Final authoritative counters after the extended run: nodes `8`, roots `3`, certified `2`. Nodes `4`, `5`, and `6` are respectively `REVIEWED`, `REVIEWED`, and `SOURCE_UNVERIFIED`; node `7` intentionally remains `PENDING` so the public state itself preserves the pending-parent conflict case.
