/**
 * Celo Composer Network Helpers
 * 
 * Helper functions for Celo network configuration and utilities
 * Inspired by Celo Composer patterns
 */

import { Chain } from "viem";
import {
  CELO_MAINNET_CHAIN_ID,
  CELO_ALFAJORES_CHAIN_ID,
  CELO_SEPOLIA_CHAIN_ID,
  RPC_URLS,
  EXPLORERS,
} from "@/lib/celo/constants";

/**
 * Celo network types
 */
export type CeloNetwork = "mainnet" | "alfajores" | "sepolia";

/**
 * Get chain ID for network
 */
export function getChainId(network: CeloNetwork): number {
  switch (network) {
    case "mainnet":
      return CELO_MAINNET_CHAIN_ID;
    case "alfajores":
      return CELO_ALFAJORES_CHAIN_ID;
    case "sepolia":
      return CELO_SEPOLIA_CHAIN_ID;
    default:
      return CELO_MAINNET_CHAIN_ID;
  }
}

/**
 * Get network name from chain ID
 */
export function getNetworkName(chainId: number): CeloNetwork {
  switch (chainId) {
    case CELO_MAINNET_CHAIN_ID:
      return "mainnet";
    case CELO_ALFAJORES_CHAIN_ID:
      return "alfajores";
    case CELO_SEPOLIA_CHAIN_ID:
      return "sepolia";
    default:
      return "mainnet";
  }
}

/**
 * Get RPC URL for network
 */
export function getRpcUrl(network: CeloNetwork): string {
  switch (network) {
    case "mainnet":
      return RPC_URLS.mainnet;
    case "alfajores":
      return RPC_URLS.alfajores;
    case "sepolia":
      return RPC_URLS.celoSepolia;
    default:
      return RPC_URLS.mainnet;
  }
}

/**
 * Get block explorer URL for network
 */
export function getExplorerUrl(network: CeloNetwork): string {
  switch (network) {
    case "mainnet":
      return EXPLORERS.mainnet;
    case "alfajores":
      return EXPLORERS.alfajores;
    case "sepolia":
      return EXPLORERS.celoSepolia;
    default:
      return EXPLORERS.mainnet;
  }
}

/**
 * Check if chain ID is a Celo network
 */
export function isCeloNetwork(chainId: number): boolean {
  return (
    chainId === CELO_MAINNET_CHAIN_ID ||
    chainId === CELO_ALFAJORES_CHAIN_ID ||
    chainId === CELO_SEPOLIA_CHAIN_ID
  );
}

/**
 * Check if network is mainnet
 */
export function isMainnet(chainId: number): boolean {
  return chainId === CELO_MAINNET_CHAIN_ID;
}

/**
 * Check if network is testnet
 */
export function isTestnet(chainId: number): boolean {
  return (
    chainId === CELO_ALFAJORES_CHAIN_ID ||
    chainId === CELO_SEPOLIA_CHAIN_ID
  );
}

/**
 * Get network display name
 */
export function getNetworkDisplayName(network: CeloNetwork): string {
  switch (network) {
    case "mainnet":
      return "Celo Mainnet";
    case "alfajores":
      return "Celo Alfajores";
    case "sepolia":
      return "Celo Sepolia";
    default:
      return "Celo Mainnet";
  }
}

/**
 * Create Celo chain configuration
 */
export function createCeloChain(network: CeloNetwork): Chain {
  const chainId = getChainId(network);
  const rpcUrl = getRpcUrl(network);
  const explorerUrl = getExplorerUrl(network);
  
  return {
    id: chainId,
    name: getNetworkDisplayName(network),
    nativeCurrency: {
      decimals: 18,
      name: "CELO",
      symbol: "CELO",
    },
    rpcUrls: {
      default: {
        http: [rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: "Celo Explorer",
        url: explorerUrl,
      },
    },
    testnet: isTestnet(chainId),
  };
}

/**
 * Get network configuration object
 */
export function getNetworkConfig(network: CeloNetwork) {
  return {
    name: network,
    displayName: getNetworkDisplayName(network),
    chainId: getChainId(network),
    rpcUrl: getRpcUrl(network),
    explorerUrl: getExplorerUrl(network),
    isMainnet: network === "mainnet",
    isTestnet: network !== "mainnet",
  };
}

/**
 * Validate network name
 */
export function isValidNetwork(network: string): network is CeloNetwork {
  return ["mainnet", "alfajores", "sepolia"].includes(network);
}

/**
 * Get all available networks
 */
export function getAvailableNetworks(): CeloNetwork[] {
  return ["mainnet", "alfajores", "sepolia"];
}

/**
 * Get recommended network for environment
 */
export function getRecommendedNetwork(): CeloNetwork {
  // In production, use mainnet
  if (process.env.NODE_ENV === "production") {
    return "mainnet";
  }
  
  // In development, use testnet
  return "alfajores";
}
