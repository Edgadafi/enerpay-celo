"use client";

import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { useAccount, useChainId } from "wagmi";
import { CELO_MAINNET_CHAIN_ID, TOKENS } from "@/lib/celo/constants";
import { formatTokenAmount } from "@/lib/celo/utils";

/**
 * Hook to get token balance for a specific token
 */
export function useTokenBalance(tokenAddress: string) {
  const { address } = useAccount();
  const chainId = useChainId();

  const { data: balance, ...rest } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: CELO_MAINNET_CHAIN_ID,
    query: {
      enabled: !!address && chainId === CELO_MAINNET_CHAIN_ID,
    },
  });

  const formattedBalance = balance
    ? formatTokenAmount(balance as bigint, tokenAddress)
    : "0";

  return {
    balance: (balance as bigint) || 0n,
    formattedBalance,
    ...rest,
  };
}

/**
 * Hook to get cUSD balance specifically
 */
export function useCUSDBalance() {
  return useTokenBalance(TOKENS.CUSD);
}

/**
 * Hook to get cREAL balance
 */
export function useCREALBalance() {
  return useTokenBalance(TOKENS.CREAL);
}

