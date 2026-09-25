# Threat model

| Threat | Control |
|---|---|
| Mutable branch or tag | Full commit required |
| Raw content differs from tree | Tree entry, blob SHA-1, size, mode and SHA-256 cross-check |
| Duplicate exact graph edge | Deterministic indexed source-pair key |
| Rejected node becomes parent | `submit_backport` requires parent status `CERTIFIED` |
| Model chooses beneficiary or graph topology | IDs, submitter, parent and depth are deterministic |
| Prompt injection in source | Source is explicitly quoted as untrusted and output identity is checked |
| Malformed or inconsistent model result | Closed schema, vocabulary and classification/reason pairing |
| Replay after terminal assessment | Only `PENDING` nodes may be assessed |
| Unbounded depth | Depth is capped at five |

The contract certifies semantic coverage of the declared property in the supplied synthetic or public artifacts. It does not prove absence of every vulnerability or validate runtime deployment behavior.

