# Local verification

Date: 2026-09-25

- Command: `python -m pytest -q`
- Runtime: `gltest==0.2.16`
- Result: **21/21 passed**

Coverage includes root certification, sibling DAG branches, equivalent/partial/unrelated/risky/inconclusive classifications, rejected-parent isolation, before/after digest mismatch, truncated tree, duplicate path, HTTP failure, unavailable source, malformed output, prompt injection, duplicate edge, missing/pending parent, terminal replay and invalid-input no-mutation.

