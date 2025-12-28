"use client";

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, CELO_SEPOLIA_CHAIN_ID } from "@/lib/celo/constants";
import { ENERPAY_REMITTANCE_ABI, RemittanceStatus } from "@/lib/contracts/EnerpayRemittance.abi";
import { parseCUSD, formatCUSD } from "@/lib/celo/utils";
import { useChainId } from "wagmi";
import { getAddress } from "viem";

/**
 * Hook to interact with EnerpayRemittance contract
 */
export function useRemittance() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const isCeloSepolia = chainId === CELO_SEPOLIA_CHAIN_ID;

  // Normalize contract address (remove whitespace, get checksummed version)
  const contractAddress = getAddress(
    CONTRACTS.ENERPAY_REMITTANCE_SEPOLIA.trim()
  ) as `0x${string}`;

  return {
    address,
    isConnected,
    isCeloSepolia,
    contractAddress,
  };
}

/**
 * Hook to get remittance history for current user
 */
export function useRemittanceHistory() {
  const { address } = useAccount();
  const { contractAddress } = useRemittance();

  const { data: remittanceIds, ...rest } = useReadContract({
    address: contractAddress,
    abi: ENERPAY_REMITTANCE_ABI,
    functionName: "getRemittanceHistory",
    args: address ? [address] : undefined,
    chainId: CELO_SEPOLIA_CHAIN_ID,
    query: {
      enabled: !!address,
    },
  });

  return {
    remittanceIds: (remittanceIds as bigint[]) || [],
    ...rest,
  };
}

/**
 * Hook to get a specific remittance by ID
 */
export function useRemittanceById(remittanceId: bigint | undefined) {
  const { contractAddress } = useRemittance();

  const { data: remittance, ...rest } = useReadContract({
    address: contractAddress,
    abi: ENERPAY_REMITTANCE_ABI,
    functionName: "getRemittance",
    args: remittanceId !== undefined ? [remittanceId] : undefined,
    chainId: CELO_SEPOLIA_CHAIN_ID,
    query: {
      enabled: remittanceId !== undefined,
    },
  });

  return {
    remittance: remittance as
      | {
          sender: `0x${string}`;
          beneficiary: `0x${string}`;
          amount: bigint;
          destinationType: string;
          destinationId: string;
          timestamp: bigint;
          status: RemittanceStatus;
        }
      | undefined,
    ...rest,
  };
}

/**
 * Hook to calculate fee for a remittance
 */
export function useCalculateFee(amount: string) {
  const { contractAddress } = useRemittance();
  const amountWei = amount ? parseCUSD(amount) : 0n;

  const { data, ...rest } = useReadContract({
    address: contractAddress,
    abi: ENERPAY_REMITTANCE_ABI,
    functionName: "calculateFee",
    args: amountWei > 0n ? [amountWei] : undefined,
    chainId: CELO_SEPOLIA_CHAIN_ID,
    query: {
      enabled: amountWei > 0n,
    },
  });

  const result = data as [bigint, bigint] | undefined;
  const fee = result?.[0] || 0n;
  const totalAmount = result?.[1] || 0n;

  return {
    fee,
    feeFormatted: formatCUSD(fee),
    totalAmount,
    totalAmountFormatted: formatCUSD(totalAmount),
    ...rest,
  };
}

/**
 * Hook to send a remittance
 */
export function useSendRemittance() {
  const { contractAddress } = useRemittance();
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CELO_SEPOLIA_CHAIN_ID,
  });

  const sendRemittance = async (
    beneficiary: string,
    amount: string,
    destinationType: string,
    destinationId: string
  ) => {
    const amountWei = parseCUSD(amount);
    
    // Normalize beneficiary address to ensure proper format
    const normalizedBeneficiary = getAddress(beneficiary.trim()) as `0x${string}`;

    console.log("📤 Sending remittance with:", {
      contractAddress,
      beneficiary: normalizedBeneficiary,
      amount: amountWei.toString(),
      destinationType,
      destinationId,
    });

    try {
      writeContract({
        address: contractAddress,
        abi: ENERPAY_REMITTANCE_ABI,
        functionName: "sendRemittance",
        args: [
          normalizedBeneficiary,
          amountWei,
          destinationType,
          destinationId,
        ],
        chainId: CELO_SEPOLIA_CHAIN_ID,
      });
    } catch (err: any) {
      console.error("❌ Error in writeContract:", err);
      console.error("❌ Error details:", {
        message: err?.message,
        code: err?.code,
        data: err?.data,
        cause: err?.cause,
        shortMessage: err?.shortMessage,
      });
      throw err;
    }
  };

  return {
    sendRemittance,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
    isLoading: isPending || isConfirming,
  };
}


