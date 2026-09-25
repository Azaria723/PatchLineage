# Immutable fixture manifest

Status: public and immutable. Every fixture below is pinned to full commit
`84bc69a83d3f06067bdeb5e0640ccb2820b957a9` in
`Azaria723/PatchLineage`.

All files under `fixtures/` are synthetic security examples created for reproducible testing. Use owner `Azaria723`, repository `PatchLineage`, the full commit above and the canonical path shown below. The byte length, Git blob SHA-1 and SHA-256 commitments make every source independently reproducible.

| Path | Bytes | Git blob SHA-1 | SHA-256 |
|---|---:|---|---|
| `fixtures/upstream/vulnerable.py` | 153 | `a4d0e1f764239a82061710b974fc1003bcca97eb` | `8718084754ff785604e10d370518bb33fe0cd3de7c5d666fd70a4d89899f119b` |
| `fixtures/upstream/fixed.py` | 157 | `04b4b7d2c3a394d26b43eca2a02b6dbc5a29c6ac` | `c8332b16a30963cccf9a2671e0ed771abd579bb29ab874fed160fabfd6c8a79f` |
| `fixtures/faithful-backport/before.py` | 149 | `7e19992f0ab29d2d9849fab11efa4a80d7156b6d` | `bf5d4b8c9a638c9dcd007a942778e91827ff971a7d4d001439ed3d6d1a37c291` |
| `fixtures/faithful-backport/after.py` | 131 | `723f9e341b48c1bff0829a2f0c3a3e93b9604d7b` | `9ec61d450072268413a910abf418369d7b9bee2562aa2164f4f3155591e80331` |
| `fixtures/partial-backport/before.py` | 127 | `403cd2b67d116adf9974cb1d7c84a809f4c6354c` | `91d713c3f39d0ee1e1f205a8f0fa85d513a1c223777b97c38492cc590afb9c7f` |
| `fixtures/partial-backport/after.py` | 183 | `58ce8d6e7c307eba95dfa9fa52fb0322e2ea2c7f` | `25b1be3a9b205f26996a3ad154a088ebff1439c54ec451189612936e97644ecb` |
| `fixtures/unrelated-change/before.py` | 68 | `3fec61f3e6a82b22d660b316deb3264ad9fb46b0` | `1e339587c532657ed2832e66f97f43f97c5c973aae67f519a9c97f1d076b87a0` |
| `fixtures/unrelated-change/after.py` | 67 | `afe4d1b219d77ee1b5a03da91cddb71e939c455c` | `74d413f959fa13a437f0d8bd2ec1a6f03b92802a3dd782fc9dc4d82ebd4b482b` |

The adversarial semantic fixtures below are pinned to full commit
`87375ab75d7dc1378bdfd285e600d64e610e5e6c` in the same repository.

| Path | Bytes | Git blob SHA-1 | SHA-256 |
|---|---:|---|---|
| `fixtures/risky-divergence/before.py` | 193 | `7b07c416c283da7a7164720eca5d2bf453d2a0f2` | `88f09ce0b05f622f882905318674134ecbd8932ef2243ffa7bcf373fd98e439d` |
| `fixtures/risky-divergence/after.py` | 232 | `beb13db5c146f79f2720bd8f85d046cb69c0c094` | `b08494eda07ed82776dbc41d461692001b676f1bf21f6c746685081f429c9612` |
| `fixtures/inconclusive-change/before.py` | 211 | `3699cc9e99c73fa0336ce3ddd0411d99760f3def` | `34f2161db06267bf785a79cf787a5a337163961c1bdbc5dd93867b380572635c` |
| `fixtures/inconclusive-change/after.py` | 153 | `dd50898c3af63b95e996b36d7c21e5a2cf5b3ec7` | `32405dadb2b4e7eb02745ef8242f2711f24ec1f671475b91e0cf6060f014d979` |
