"use client";

import { useAccount, useChainId, useSwitchChain, useBalance, useReadContract } from "wagmi";
import { CELO_SEPOLIA_CHAIN_ID, CELO_MAINNET_CHAIN_ID, TOKENS } from "@/lib/celo/constants";
import { formatCUSD } from "@/lib/celo/utils";
import { erc20Abi } from "viem";

/**
 * Custom hook for Celo-specific functionality
 */
export function useCelo() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: celoBalance } = useBalance({
    address,
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  /**
   * Check if connected to Celo Mainnet (production)
   */
  const isCeloMainnet = chainId === CELO_MAINNET_CHAIN_ID;
  
  /**
   * Check if connected to Celo Sepolia (testnet) - for reference
   */
  const isCeloSepolia = chainId === CELO_SEPOLIA_CHAIN_ID;

  /**
   * Switch to Celo Mainnet (production)
   */
  const switchToCeloMainnet = async () => {
    try {
      await switchChain({ chainId: CELO_MAINNET_CHAIN_ID });
    } catch (error) {
      console.error("Error switching to Celo Mainnet:", error);
      throw error;
    }
  };

  /**
   * Switch to Celo Sepolia (testnet) - for development
   */
  const switchToCeloSepolia = async () => {
    try {
      await switchChain({ chainId: CELO_SEPOLIA_CHAIN_ID });
    } catch (error) {
      console.error("Error switching to Celo Sepolia:", error);
      throw error;
    }
  };

  // Get cUSD balance using hook (Celo Mainnet for production)
  const { data: cusdBalance, isLoading: isCUSDBalanceLoading, error: cusdBalanceError } = useReadContract({
    address: TOKENS.CUSD,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: CELO_MAINNET_CHAIN_ID,
    query: {
      enabled: !!address && isCeloMainnet,
      refetchInterval: 5000, // Refetch every 5 seconds to keep balance updated
    },
  });

  // Log balance for debugging
  if (address && isCeloMainnet) {
    console.log("💰 Balance check:", {
      address,
      isCeloMainnet,
      cusdBalance,
      cusdBalanceError,
      isCUSDBalanceLoading,
      formatted: cusdBalance ? formatCUSD(cusdBalance as bigint) : "0",
    });
  }

  return {
    address,
    isConnected,
    isCeloMainnet,
    isCeloSepolia,
    chainId,
    celoBalance: celoBalance?.value || 0n,
    celoBalanceFormatted: celoBalance?.formatted || "0",
    cusdBalance: cusdBalance ? (cusdBalance as bigint) : 0n,
    cusdBalanceFormatted: cusdBalance ? formatCUSD(cusdBalance as bigint) : "0",
    switchToCeloMainnet,
    switchToCeloSepolia,
    // Alias for backward compatibility
    switchToCelo: switchToCeloMainnet,
  };
}

