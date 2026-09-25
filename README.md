# PatchLineage

**A GenLayer dApp that builds a verifiable graph of semantically equivalent security backports across LTS branches and downstream forks.**

PatchLineage binds exact immutable source pairs, asks GenLayer validators whether each change preserves a bounded security property, and permits only certified nodes to become parents in a backport DAG. The deployment account receives no role or privilege.

## Architecture

- A root records the upstream vulnerable/fixed source pair and its explicit security property.
- A certified root or backport can receive multiple child backports.
- Validators independently fetch and verify full Git commits, complete trees, unique blobs, file modes, byte lengths, Git blob SHA-1 and SHA-256.
- Comparative semantic consensus returns a bounded classification.
- Only `ROOT_VALID` and `EQUIVALENT_FIX` become `CERTIFIED` graph nodes.
- Parent ID and depth are derived deterministically; the model never chooses graph structure or identities.

## Source policy

The included fixtures are synthetic and public. They do not claim a real-world CVE. After the repository's first push, the fixture manifest will pin one immutable full commit and record exact byte commitments for StudioNet verification.

## Development

```bash
python -m pip install -r requirements.txt
python -m pytest -q
cd frontend
npm install
npm run build
```

Target network: GenLayer StudioNet, chain ID `61999`. Contract runtime and test suite: `0.2.16`.

## Deployment separation

The contract has no deployer ownership. The deployment address is configured in the frontend only through `VITE_CONTRACT_ADDRESS`. Product lifecycle roles derive from transaction senders after deployment.

