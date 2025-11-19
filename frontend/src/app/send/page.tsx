"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseCUSD, isValidAddress } from "@/lib/celo/utils";
import { TOKENS, CELO_MAINNET_CHAIN_ID } from "@/lib/celo/constants";
import { erc20Abi } from "viem";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SendPage() {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash,
      chainId: CELO_MAINNET_CHAIN_ID,
    });

  const handleSend = async () => {
    setError("");

    // Validation
    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    if (!recipient || !isValidAddress(recipient)) {
      setError("Please enter a valid Celo address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const amountWei = parseCUSD(amount);

      writeContract({
        address: TOKENS.CUSD,
        abi: erc20Abi,
        functionName: "transfer",
        args: [recipient as `0x${string}`, amountWei],
        chainId: CELO_MAINNET_CHAIN_ID,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to send payments
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Send Payment</h1>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (cUSD)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none text-2xl font-semibold"
            />
          </div>

          {/* Error */}
          {(error || writeError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error || writeError?.message}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              Payment sent successfully!
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isPending || isConfirming}
            className="w-full bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {(isPending || isConfirming) ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isPending ? "Confirming..." : "Processing..."}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Payment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

