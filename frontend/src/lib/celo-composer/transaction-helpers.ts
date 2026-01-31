/**
 * Celo Composer Transaction Helpers
 * 
 * Helper functions for creating and managing transactions on Celo
 * Inspired by Celo Composer patterns
 */

import { Address, Hex, encodeFunctionData, parseUnits } from "viem";
import { TOKENS } from "@/lib/celo/constants";
import { erc20Abi } from "viem";

/**
 * Create ERC20 transfer transaction data
 */
export function createTokenTransferData(
  to: Address,
  amount: string,
  tokenAddress: Address
): Hex {
  const amountWei = parseUnits(amount, 18);
  
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: "transfer",
    args: [to, amountWei],
  });
}

/**
 * Create ERC20 approve transaction data
 */
export function createTokenApproveData(
  spender: Address,
  amount: string,
  tokenAddress: Address
): Hex {
  const amountWei = parseUnits(amount, 18);
  
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, amountWei],
  });
}

/**
 * Create cUSD transfer transaction
 */
export function createCUSDTransfer(
  to: Address,
  amount: string
): {
  to: Address;
  data: Hex;
} {
  return {
    to: TOKENS.CUSD as Address,
    data: createTokenTransferData(to, amount, TOKENS.CUSD as Address),
  };
}

/**
 * Create cEUR transfer transaction
 */
export function createCEURTransfer(
  to: Address,
  amount: string
): {
  to: Address;
  data: Hex;
} {
  return {
    to: TOKENS.CEUR as Address,
    data: createTokenTransferData(to, amount, TOKENS.CEUR as Address),
  };
}

/**
 * Create cREAL transfer transaction
 */
export function createCREALTransfer(
  to: Address,
  amount: string
): {
  to: Address;
  data: Hex;
} {
  return {
    to: TOKENS.CREAL as Address,
    data: createTokenTransferData(to, amount, TOKENS.CREAL as Address),
  };
}

/**
 * Estimate gas for a transaction
 * Note: This is a placeholder - actual gas estimation requires a provider
 */
export function estimateGas(
  from: Address,
  to: Address,
  data: Hex,
  value?: bigint
): bigint {
  // Base gas cost
  let gas = 21000n;
  
  // Add gas for data (4 gas per zero byte, 16 gas per non-zero byte)
  if (data && data.length > 2) {
    const dataBytes = data.slice(2);
    for (let i = 0; i < dataBytes.length; i += 2) {
      const byte = dataBytes.slice(i, i + 2);
      gas += byte === "00" ? 4n : 16n;
    }
  }
  
  // Add value transfer gas if value is present
  if (value && value > 0n) {
    gas += 9000n;
  }
  
  return gas;
}

/**
 * Format transaction for display
 */
export function formatTransaction(tx: {
  hash?: Hex;
  from?: Address;
  to?: Address;
  value?: bigint;
  data?: Hex;
}): string {
  const parts: string[] = [];
  
  if (tx.hash) {
    parts.push(`Hash: ${tx.hash.slice(0, 10)}...${tx.hash.slice(-8)}`);
  }
  
  if (tx.from) {
    parts.push(`From: ${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`);
  }
  
  if (tx.to) {
    parts.push(`To: ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`);
  }
  
  if (tx.value) {
    parts.push(`Value: ${tx.value.toString()} wei`);
  }
  
  return parts.join(" | ");
}

/**
 * Validate transaction hash format
 */
export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Get transaction explorer URL
 */
export function getTransactionExplorerUrl(
  txHash: Hex,
  chainId: number
): string {
  const explorers: Record<number, string> = {
    42220: "https://celoscan.io/tx/", // Mainnet
    44787: "https://alfajores.celoscan.io/tx/", // Alfajores
    11142220: "https://explorer.celo.org/sepolia/tx/", // Sepolia
  };
  
  const baseUrl = explorers[chainId] || explorers[42220];
  return `${baseUrl}${txHash}`;
}

/**
 * Create transaction object for signing
 */
export function createTransaction(
  to: Address,
  value: bigint,
  data?: Hex,
  gasLimit?: bigint,
  gasPrice?: bigint
): {
  to: Address;
  value: bigint;
  data?: Hex;
  gas?: bigint;
  gasPrice?: bigint;
} {
  const tx: {
    to: Address;
    value: bigint;
    data?: Hex;
    gas?: bigint;
    gasPrice?: bigint;
  } = {
    to,
    value,
  };
  
  if (data) {
    tx.data = data;
  }
  
  if (gasLimit) {
    tx.gas = gasLimit;
  }
  
  if (gasPrice) {
    tx.gasPrice = gasPrice;
  }
  
  return tx;
}
