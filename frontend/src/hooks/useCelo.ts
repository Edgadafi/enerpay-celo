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
   * Check if connected to Celo Sepolia (testnet)
   */
  const isCeloSepolia = chainId === CELO_SEPOLIA_CHAIN_ID;
  
  /**
   * Check if connected to Celo Mainnet
   */
  const isCeloMainnet = chainId === CELO_MAINNET_CHAIN_ID;

  /**
   * Switch to Celo Sepolia (testnet)
   */
  const switchToCeloSepolia = async () => {
    try {
      await switchChain({ chainId: CELO_SEPOLIA_CHAIN_ID });
    } catch (error) {
      console.error("Error switching to Celo Sepolia:", error);
      throw error;
    }
  };

  /**
   * Switch to Celo Mainnet
   */
  const switchToCelo = async () => {
    try {
      await switchChain({ chainId: CELO_MAINNET_CHAIN_ID });
    } catch (error) {
      console.error("Error switching to Celo:", error);
      throw error;
    }
  };

  // Get cUSD balance using hook (works on both Sepolia and Mainnet)
  const { data: cusdBalance } = useReadContract({
    address: TOKENS.CUSD,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: isCeloSepolia ? CELO_SEPOLIA_CHAIN_ID : CELO_MAINNET_CHAIN_ID,
    query: {
      enabled: !!address && (isCeloSepolia || isCeloMainnet),
    },
  });

  return {
    address,
    isConnected,
    isCeloSepolia,
    isCeloMainnet,
    chainId,
    celoBalance: celoBalance?.value || 0n,
    celoBalanceFormatted: celoBalance?.formatted || "0",
    cusdBalance: (cusdBalance as bigint) || 0n,
    cusdBalanceFormatted: cusdBalance ? formatCUSD(cusdBalance as bigint) : "0",
    switchToCeloSepolia,
    switchToCelo,
  };
}

