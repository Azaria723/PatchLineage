from pathlib import Path
S=Path("contracts/PatchLineage.py").read_text(encoding="utf-8")
def test_locked_runner_and_genlayer_primitives():
    assert S.startswith('# v0.2.16\n# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }')
    for term in ["prompt_comparative","git/commits/","git/trees/","_blob_sha1","hashlib.sha256","source_keys.get"]:assert term in S
    assert "strict_eq" not in S
def test_architecture_is_dag_not_prior_project_clone():
    lower=S.lower()
    for term in ["fulfilled_bitmap","latest_snapshot_id","counterclaim","route_incident","quorum","escrow","checkpoint"]:assert term not in lower
    for term in ['"parent_id"','"depth"','"certified_count"','PARENT_NOT_CERTIFIED']:assert term in S

