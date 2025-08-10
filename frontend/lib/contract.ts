import {
  callReadOnlyFunction,
  makeContractCall,
  broadcastTransaction,
  uintCV,
  standardPrincipalCV,
} from "@stacks/transactions";

import { network } from "./stacks";

const CONTRACT_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME = "workshop-token"; // ganti sesuai kontrak kamu
const SENDER_KEY = "PRIVATE_KEY"; // isi private key testnet

// Get token name
export async function getTokenName() {
  const res = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-name",
    functionArgs: [],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });
  return res.value;
}

// Get token symbol
export async function getTokenSymbol() {
  const res = await callReadOnlyFunction({
    contractAddress: "ST65Y199HD06ZNN9SEM3TS3K3XCF3CZ9AHR945BV",
    contractName: "simpel-token-warung-royalti",
    functionName: "get-symbol",
    functionArgs: [],
    network,
    senderAddress: CONTRACT_ADDRESS,
  });
  return res.value;
}

// Get balance
export async function getTokenBalance(address: string) {
  const res = await callReadOnlyFunction({
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: "get-balance",
    functionArgs: [standardPrincipalCV(address)],
    network,
    senderAddress: address,
  });
  return res.value;
}

// Transfer token
export async function transferToken(recipient: string, amount: number) {
  const tx = await makeContractCall({
    contractAddress: "ST65Y199HD06ZNN9SEM3TS3K3XCF3CZ9AHR945BV.simple-token",
    contractName: "simple-token-warung-royalti",
    functionName: "transfer",
    functionArgs: [uintCV(amount), standardPrincipalCV(recipient)],
    senderKey: SENDER_KEY,
    network,
  });
  const result = await broadcastTransaction(tx, network);
  return result;
}

// Reward customer
export async function rewardCustomer(customer: string, points: number) {
  const tx = await makeContractCall({
    contractAddress: "ST65Y199HD06ZNN9SEM3TS3K3XCF3CZ9AHR945BV",
    contractName: "simple-token-warung-royalti",
    functionName: "reward-customer",
    functionArgs: [standardPrincipalCV(customer), uintCV(points)],
    senderKey: SENDER_KEY,
    network,
  });
  const result = await broadcastTransaction(tx, network);
  return result;
}
