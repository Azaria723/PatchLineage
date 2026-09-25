import { createClient } from "../frontend/node_modules/genlayer-js/dist/index.js";
import { studionet } from "../frontend/node_modules/genlayer-js/dist/chains/index.js";
import { TransactionStatus } from "../frontend/node_modules/genlayer-js/dist/types/index.js";
import { privateKeyToAccount } from "../frontend/node_modules/viem/_esm/accounts/index.js";

const contract = process.env.CONTRACT_ADDRESS;
const keyA = process.env.TEST_WALLET_A_PRIVATE_KEY;
const keyB = process.env.TEST_WALLET_B_PRIVATE_KEY;
if (!/^0x[0-9a-fA-F]{40}$/.test(contract || "")) throw new Error("Set CONTRACT_ADDRESS");
if (!keyA || !keyB) throw new Error("Set both test wallet keys");

const account = (key) => privateKeyToAccount(key.startsWith("0x") ? key : `0x${key}`);
const walletA = account(keyA);
const walletB = account(keyB);
const reader = createClient({ chain: studionet });
const writer = (signer) => createClient({ chain: studionet, account: signer });
const transactions = [];
const read = (functionName, args = []) => reader.readContract({ address: contract, functionName, args });
const parse = async (functionName, args = []) => JSON.parse(await read(functionName, args));
const write = async (signer, functionName, args = [], label = functionName) => {
  const hash = await writer(signer).writeContract({ address: contract, functionName, args });
  console.log(`${label}_tx=${hash}`);
  let receipt;
  for (let attempt = 1; attempt <= 24; attempt++) {
    try {
      receipt = await reader.waitForTransactionReceipt({ hash, status: TransactionStatus.FINALIZED });
      break;
    } catch (error) {
      if (attempt === 24) throw error;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  console.log(`${label}_status=${receipt.status_name || receipt.status}`);
  transactions.push({ label, functionName, hash, signer: signer.address });
};

const owner = "Azaria723";
const repo = "PatchLineage";
const commit = "84bc69a83d3f06067bdeb5e0640ccb2820b957a9";
const source = (path, digest) => JSON.stringify({ owner, repo, commit, path, digest });
const upstreamBefore = source("/fixtures/upstream/vulnerable.py", "8718084754ff785604e10d370518bb33fe0cd3de7c5d666fd70a4d89899f119b");
const upstreamAfter = source("/fixtures/upstream/fixed.py", "c8332b16a30963cccf9a2671e0ed771abd579bb29ab874fed160fabfd6c8a79f");
const faithfulBefore = source("/fixtures/faithful-backport/before.py", "bf5d4b8c9a638c9dcd007a942778e91827ff971a7d4d001439ed3d6d1a37c291");
const faithfulAfter = source("/fixtures/faithful-backport/after.py", "9ec61d450072268413a910abf418369d7b9bee2562aa2164f4f3155591e80331");
const partialBefore = source("/fixtures/partial-backport/before.py", "91d713c3f39d0ee1e1f205a8f0fa85d513a1c223777b97c38492cc590afb9c7f");
const partialAfter = source("/fixtures/partial-backport/after.py", "25b1be3a9b205f26996a3ad154a088ebff1439c54ec451189612936e97644ecb");
const unrelatedBefore = source("/fixtures/unrelated-change/before.py", "1e339587c532657ed2832e66f97f43f97c5c973aae67f519a9c97f1d076b87a0");
const unrelatedAfter = source("/fixtures/unrelated-change/after.py", "74d413f959fa13a437f0d8bd2ec1a6f03b92802a3dd782fc9dc4d82ebd4b482b");
const property = "User-controlled archive paths must be passed as argument-vector elements and must never be interpreted by a command shell.";

console.log(`contract=${contract}`);
console.log(`wallet_a=${walletA.address}`);
console.log(`wallet_b=${walletB.address}`);
let counts = await parse("get_counts");
console.log(`counts_before=${JSON.stringify(counts)}`);

if (counts.node_count === 0) {
  await write(walletA, "create_fix_root", ["Upstream archive command injection fix", property, upstreamBefore, upstreamAfter], "create_root");
}
let root = await parse("get_node", [0n]);
if (root.status === "PENDING") await write(walletB, "assess_node", [0n], "assess_root");
root = await parse("get_node", [0n]);
if (root.status !== "CERTIFIED" || root.classification !== "ROOT_VALID") throw new Error(`Root not certified: ${JSON.stringify(root)}`);

counts = await parse("get_counts");
if (counts.node_count === 1) await write(walletB, "submit_backport", [0n, "Faithful LTS archive security backport", faithfulBefore, faithfulAfter], "submit_equivalent");
let equivalent = await parse("get_node", [1n]);
if (equivalent.status === "PENDING") await write(walletA, "assess_node", [1n], "assess_equivalent");
equivalent = await parse("get_node", [1n]);
if (equivalent.status !== "CERTIFIED" || equivalent.classification !== "EQUIVALENT_FIX") throw new Error(`Equivalent branch failed: ${JSON.stringify(equivalent)}`);

counts = await parse("get_counts");
if (counts.node_count === 2) await write(walletA, "submit_backport", [0n, "Incomplete validation-only backport", partialBefore, partialAfter], "submit_partial");
let partial = await parse("get_node", [2n]);
if (partial.status === "PENDING") await write(walletB, "assess_node", [2n], "assess_partial");
partial = await parse("get_node", [2n]);
if (partial.status !== "REVIEWED" || partial.classification !== "PARTIAL_FIX") throw new Error(`Partial branch unexpected: ${JSON.stringify(partial)}`);

counts = await parse("get_counts");
if (counts.node_count === 3) await write(walletB, "submit_backport", [0n, "Unrelated logging-only downstream change", unrelatedBefore, unrelatedAfter], "submit_unrelated");
let unrelated = await parse("get_node", [3n]);
if (unrelated.status === "PENDING") await write(walletA, "assess_node", [3n], "assess_unrelated");
unrelated = await parse("get_node", [3n]);
if (unrelated.status !== "REVIEWED" || unrelated.classification !== "UNRELATED_CHANGE") throw new Error(`Unrelated branch unexpected: ${JSON.stringify(unrelated)}`);

const beforeFailure = await parse("get_counts");
await write(walletA, "submit_backport", [2n, "Forbidden child of rejected partial node", unrelatedBefore, unrelatedAfter], "rejected_parent_guard");
const afterFailure = await parse("get_counts");
if (JSON.stringify(beforeFailure) !== JSON.stringify(afterFailure)) throw new Error("Rejected-parent guard mutated counters");

const equivalentBeforeReplay = await parse("get_node", [1n]);
await write(walletB, "assess_node", [1n], "terminal_replay_guard");
const equivalentAfterReplay = await parse("get_node", [1n]);
if (JSON.stringify(equivalentBeforeReplay) !== JSON.stringify(equivalentAfterReplay)) throw new Error("Terminal replay mutated node");

console.log(`root=${JSON.stringify(root)}`);
console.log(`equivalent=${JSON.stringify(equivalent)}`);
console.log(`partial=${JSON.stringify(partial)}`);
console.log(`unrelated=${JSON.stringify(unrelated)}`);
console.log(`counts_after=${JSON.stringify(await parse("get_counts"))}`);
console.log(`transactions=${JSON.stringify(transactions)}`);
