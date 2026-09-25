# Architecture

PatchLineage is a certification DAG rather than a latest-state registry, checklist, router, vote, or two-party dispute. Every node has exactly one parent except a root, while any certified node may have multiple children.

## Consequential boundary

The AI produces only a bounded security classification. Deterministic contract logic owns node identity, submitter, parent, depth, status, counters, and whether the node may become a parent. A reviewed negative node remains visible but cannot authorize descendants.

## Source verification

Each before/after source is bound before assessment to GitHub owner, repository, full commit, canonical path and SHA-256. Validators reconstruct provenance from the Git commit and recursive tree, reject truncated or duplicate paths, verify mode/type/size, recompute Git blob SHA-1, fetch exact bytes, and recompute SHA-256.

## Consensus

`prompt_comparative` is used because validators may reason differently while agreeing on the exact consequential classification. Output identity and classification/reason relationships are validated before state mutation.

