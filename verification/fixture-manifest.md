# Immutable fixture manifest

Status: local byte commitments complete; immutable full commit pending the first public repository push.

All files under `fixtures/` are synthetic security examples created for reproducible testing. After the first push this file will record the full commit, byte length, Git blob SHA-1 and SHA-256 of every artifact.

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
