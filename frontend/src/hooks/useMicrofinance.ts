"use client";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CELO_MAINNET_CHAIN_ID, CONTRACTS } from "@/lib/celo/constants";
import { MICROFINANCE_POOL_ABI } from "@/lib/contracts/MicrofinancePool.abi";
import { parseUnits, formatUnits } from "viem";
import { useMemo } from "react";

/**
 * Hook to get MicrofinancePool contract info
 */
export function useMicrofinance() {
  const { chainId } = useAccount();
  const isCeloMainnet = chainId === CELO_MAINNET_CHAIN_ID;
  // Use MAINNET contract address for production
  const contractAddress = CONTRACTS.MICROFINANCE_POOL_MAINNET;

  return {
    isCeloMainnet,
    contractAddress,
    isReady: isCeloMainnet && !!contractAddress,
  };
}

/**
 * Hook to get user's reputation score
 */
export function useReputationScore(address?: `0x${string}`) {
  const { address: accountAddress } = useAccount();
  const userAddress = address || accountAddress;

  const { data: reputation, isLoading } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "reputationScores",
    args: userAddress ? [userAddress] : undefined,
    chainId: CELO_MAINNET_CHAIN_ID,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    reputation: reputation ? Number(reputation) : 0,
    isLoading,
  };
}

/**
 * Hook to get user's loans
 */
export function useUserLoans(address?: `0x${string}`) {
  const { address: accountAddress } = useAccount();
  const userAddress = address || accountAddress;

  const { data: loanIds, isLoading } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "getUserLoans",
    args: userAddress ? [userAddress] : undefined,
    chainId: CELO_MAINNET_CHAIN_ID,
    query: {
      enabled: !!userAddress,
    },
  });

  return {
    loanIds: loanIds || [],
    isLoading,
  };
}

/**
 * Hook to get loan details
 */
export function useLoan(loanId: bigint | number) {
  const loanIdBigInt = typeof loanId === "number" ? BigInt(loanId) : loanId;

  const { data: loan, isLoading } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "getLoan",
    args: [loanIdBigInt],
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  return {
    loan,
    isLoading,
  };
}

/**
 * Hook to calculate total owed for a loan
 */
export function useTotalOwed(loanId: bigint | number) {
  const loanIdBigInt = typeof loanId === "number" ? BigInt(loanId) : loanId;

  const { data: totalOwed, isLoading } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "calculateTotalOwed",
    args: [loanIdBigInt],
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  return {
    totalOwed: totalOwed ? formatUnits(totalOwed, 18) : "0",
    totalOwedWei: totalOwed,
    isLoading,
  };
}

/**
 * Hook to request a loan
 */
export function useRequestLoan() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  const requestLoan = async (
    amount: string,
    duration: number,
    purpose: string
  ) => {
    const amountWei = parseUnits(amount, 18);

    writeContract({
      address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
      abi: MICROFINANCE_POOL_ABI,
      functionName: "requestLoan",
      args: [amountWei, BigInt(duration), purpose],
      chainId: CELO_MAINNET_CHAIN_ID,
    });
  };

  return {
    requestLoan,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook to get pool balance
 */
export function usePoolBalance() {
  const { data: balance, isLoading } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "poolBalance",
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  return {
    balance: balance ? formatUnits(balance, 18) : "0",
    balanceWei: balance,
    isLoading,
  };
}

/**
 * Hook to get contract parameters
 */
export function useMicrofinanceParams() {
  const { data: minLoanAmount, isLoading: loadingMin } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "minLoanAmount",
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  const { data: maxLoanAmount, isLoading: loadingMax } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "maxLoanAmount",
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  const { data: baseInterestRate, isLoading: loadingRate } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "baseInterestRate",
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  const { data: minReputationScore, isLoading: loadingRep } = useReadContract({
    address: CONTRACTS.MICROFINANCE_POOL_MAINNET as `0x${string}`,
    abi: MICROFINANCE_POOL_ABI,
    functionName: "minReputationScore",
    chainId: CELO_MAINNET_CHAIN_ID,
  });

  return {
    minLoanAmount: minLoanAmount ? formatUnits(minLoanAmount, 18) : "0",
    maxLoanAmount: maxLoanAmount ? formatUnits(maxLoanAmount, 18) : "0",
    baseInterestRate: baseInterestRate ? Number(baseInterestRate) / 100 : 0,
    minReputationScore: minReputationScore ? Number(minReputationScore) : 0,
    isLoading: loadingMin || loadingMax || loadingRate || loadingRep,
  };
}

