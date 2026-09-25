import { createClient } from "../frontend/node_modules/genlayer-js/dist/index.js";
import { studionet } from "../frontend/node_modules/genlayer-js/dist/chains/index.js";
import { TransactionStatus } from "../frontend/node_modules/genlayer-js/dist/types/index.js";
import { privateKeyToAccount } from "../frontend/node_modules/viem/_esm/accounts/index.js";

const contract = process.env.CONTRACT_ADDRESS;
const keys = [process.env.TEST_WALLET_A_PRIVATE_KEY, process.env.TEST_WALLET_B_PRIVATE_KEY];
if (!/^0x[0-9a-fA-F]{40}$/.test(contract || "") || keys.some((key) => !key)) throw new Error("Set contract and both test wallets");
const wallets = keys.map((key) => privateKeyToAccount(key.startsWith("0x") ? key : `0x${key}`));
const reader = createClient({ chain: studionet });
const writer = (wallet) => createClient({ chain: studionet, account: wallet });
const read = (functionName, args = []) => reader.readContract({ address: contract, functionName, args });
const parse = async (functionName, args = []) => JSON.parse(await read(functionName, args));
const txs = [];
const write = async (wallet, functionName, args, label) => {
  const hash = await writer(wallet).writeContract({ address: contract, functionName, args });
  console.log(`${label}_tx=${hash}`);
  let receipt;
  for (let attempt = 0; attempt < 30; attempt++) {
    try { receipt = await reader.waitForTransactionReceipt({ hash, status: TransactionStatus.FINALIZED }); break; }
    catch (error) { if (attempt === 29) throw error; await new Promise((resolve) => setTimeout(resolve, 5000)); }
  }
  txs.push({ label, hash, actor: wallet.address, status: receipt.status_name || receipt.status });
};
const unchanged = async (action, label) => {
  const before = await parse("get_counts");
  await action();
  const after = await parse("get_counts");
  if (JSON.stringify(before) !== JSON.stringify(after)) throw new Error(`${label} mutated counters`);
};

const owner = "Azaria723", repo = "PatchLineage", commit = "87375ab75d7dc1378bdfd285e600d64e610e5e6c";
const source = (path, digest) => JSON.stringify({ owner, repo, commit, path, digest });
const riskyBefore = source("/fixtures/risky-divergence/before.py", "88f09ce0b05f622f882905318674134ecbd8932ef2243ffa7bcf373fd98e439d");
const riskyAfter = source("/fixtures/risky-divergence/after.py", "b08494eda07ed82776dbc41d461692001b676f1bf21f6c746685081f429c9612");
const ambiguousBefore = source("/fixtures/inconclusive-change/before.py", "34f2161db06267bf785a79cf787a5a337163961c1bdbc5dd93867b380572635c");
const ambiguousAfter = source("/fixtures/inconclusive-change/after.py", "32405dadb2b4e7eb02745ef8242f2711f24ec1f671475b91e0cf6060f014d979");
const oldCommit = "84bc69a83d3f06067bdeb5e0640ccb2820b957a9";
const oldSource = (path, digest) => JSON.stringify({ owner, repo, commit: oldCommit, path, digest });
const faithfulBefore = oldSource("/fixtures/faithful-backport/before.py", "bf5d4b8c9a638c9dcd007a942778e91827ff971a7d4d001439ed3d6d1a37c291");
const faithfulAfter = oldSource("/fixtures/faithful-backport/after.py", "9ec61d450072268413a910abf418369d7b9bee2562aa2164f4f3155591e80331");
const upstreamBefore = oldSource("/fixtures/upstream/vulnerable.py", "8718084754ff785604e10d370518bb33fe0cd3de7c5d666fd70a4d89899f119b");
const upstreamAfter = oldSource("/fixtures/upstream/fixed.py", "c8332b16a30963cccf9a2671e0ed771abd579bb29ab874fed160fabfd6c8a79f");
const property = "User-controlled archive paths must be passed as argument-vector elements and must never be interpreted by a command shell.";

let counts = await parse("get_counts");
if (counts.node_count === 4) await write(wallets[0], "submit_backport", [0n, "Shell regression in downstream archive fork", riskyBefore, riskyAfter], "submit_risky");
let risky = await parse("get_node", [4n]);
if (risky.status === "PENDING") await write(wallets[1], "assess_node", [4n], "assess_risky");
risky = await parse("get_node", [4n]);
if (risky.classification !== "RISKY_DIVERGENCE" || risky.status !== "REVIEWED") throw new Error(`Risky mismatch: ${JSON.stringify(risky)}`);

counts = await parse("get_counts");
if (counts.node_count === 5) await write(wallets[1], "submit_backport", [0n, "Adapter-mediated archive runner migration", ambiguousBefore, ambiguousAfter], "submit_inconclusive");
let ambiguous = await parse("get_node", [5n]);
if (ambiguous.status === "PENDING") await write(wallets[0], "assess_node", [5n], "assess_inconclusive");
ambiguous = await parse("get_node", [5n]);
if (ambiguous.classification !== "INCONCLUSIVE" || ambiguous.status !== "REVIEWED") throw new Error(`Inconclusive mismatch: ${JSON.stringify(ambiguous)}`);

counts = await parse("get_counts");
const badBefore = oldSource("/fixtures/upstream/vulnerable.py", "0".repeat(64));
if (counts.node_count === 6) await write(wallets[0], "create_fix_root", ["Tampered digest source rejection", property, badBefore, upstreamAfter], "submit_bad_digest");
let badDigest = await parse("get_node", [6n]);
if (badDigest.status === "PENDING") await write(wallets[1], "assess_node", [6n], "assess_bad_digest");
badDigest = await parse("get_node", [6n]);
if (badDigest.classification !== "SOURCE_UNVERIFIED" || badDigest.status !== "SOURCE_UNVERIFIED") throw new Error(`Bad digest did not fail closed: ${JSON.stringify(badDigest)}`);

counts = await parse("get_counts");
if (counts.node_count === 7) await write(wallets[1], "create_fix_root", ["Pending root parent isolation candidate", property, upstreamBefore, riskyAfter], "create_pending_root");

await unchanged(() => write(wallets[0], "submit_backport", [7n, "Child forbidden while parent is pending", riskyBefore, riskyAfter], "pending_parent_guard"), "pending parent");
await unchanged(() => write(wallets[1], "submit_backport", [0n, "Duplicate immutable faithful pair", faithfulBefore, faithfulAfter], "duplicate_pair_guard"), "duplicate pair");
await unchanged(() => write(wallets[0], "submit_backport", [999n, "Missing parent must never append node", riskyBefore, riskyAfter], "missing_parent_guard"), "missing parent");
await unchanged(() => write(wallets[1], "create_fix_root", ["short", "tiny", "{}", "{}"], "invalid_input_guard"), "invalid input");
await unchanged(() => write(wallets[0], "assess_node", [999n], "missing_node_guard"), "missing node");

console.log(`risky=${JSON.stringify(risky)}`);
console.log(`inconclusive=${JSON.stringify(ambiguous)}`);
console.log(`bad_digest=${JSON.stringify(badDigest)}`);
console.log(`pending=${await read("get_node", [7n])}`);
console.log(`counts_after=${await read("get_counts")}`);
console.log(`transactions=${JSON.stringify(txs)}`);
