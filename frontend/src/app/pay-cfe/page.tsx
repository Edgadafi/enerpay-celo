"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseCUSD, isValidAddress } from "@/lib/celo/utils";
import { TOKENS, CELO_SEPOLIA_CHAIN_ID } from "@/lib/celo/constants";
import { erc20Abi } from "viem";
import { CreditCard, Loader2, Plus, Trash2, Receipt } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

interface Receipt {
  id: string;
  accountNumber: string;
  amount: string;
}

export default function PayCFEPage() {
  const { address, isConnected } = useAccount();
  const [receipts, setReceipts] = useState<Receipt[]>([
    { id: "1", accountNumber: "", amount: "" },
  ]);
  const [error, setError] = useState("");

  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CELO_SEPOLIA_CHAIN_ID,
  });

  const addReceipt = () => {
    setReceipts([
      ...receipts,
      { id: Date.now().toString(), accountNumber: "", amount: "" },
    ]);
  };

  const removeReceipt = (id: string) => {
    if (receipts.length > 1) {
      setReceipts(receipts.filter((r) => r.id !== id));
    }
  };

  const updateReceipt = (id: string, field: keyof Receipt, value: string) => {
    setReceipts(
      receipts.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const calculateTotal = () => {
    return receipts.reduce((sum, r) => {
      const amount = parseFloat(r.amount) || 0;
      return sum + amount;
    }, 0);
  };

  const handlePayAll = async () => {
    setError("");

    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    // Validate all receipts
    const invalidReceipts = receipts.filter(
      (r) => !r.accountNumber || !r.amount || parseFloat(r.amount) <= 0
    );

    if (invalidReceipts.length > 0) {
      setError("Please fill all receipt fields with valid amounts");
      return;
    }

    const total = calculateTotal();
    if (total <= 0) {
      setError("Total amount must be greater than 0");
      return;
    }

    try {
      // For now, we'll send to a single CFE payment address
      // In production, this would integrate with CFE's payment API
      const cfePaymentAddress = "0x0000000000000000000000000000000000000000"; // Placeholder
      const totalWei = parseCUSD(total.toString());

      writeContract({
        address: TOKENS.CUSD,
        abi: erc20Abi,
        functionName: "transfer",
        args: [cfePaymentAddress as `0x${string}`, totalWei],
        chainId: CELO_SEPOLIA_CHAIN_ID,
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
            Please connect your wallet to pay CFE bills
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Pay CFE" showBack={true} />

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 font-medium mb-1">
                  Multiple Receipt Payment
                </p>
                <p className="text-xs text-blue-700">
                  Add multiple CFE receipts and pay them all at once
                </p>
              </div>
            </div>
          </div>

          {/* Receipts List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Receipts</h2>
              <button
                onClick={addReceipt}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-celo-green text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Receipt
              </button>
            </div>

            {receipts.map((receipt, index) => (
              <div
                key={receipt.id}
                className="border border-gray-200 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Receipt #{index + 1}
                  </span>
                  {receipts.length > 1 && (
                    <button
                      onClick={() => removeReceipt(receipt.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={receipt.accountNumber}
                    onChange={(e) =>
                      updateReceipt(receipt.id, "accountNumber", e.target.value)
                    }
                    placeholder="1234567890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Amount (cUSD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={receipt.amount}
                    onChange={(e) =>
                      updateReceipt(receipt.id, "amount", e.target.value)
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none text-lg font-semibold"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-celo-green">
                {calculateTotal().toFixed(2)} cUSD
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {receipts.length} receipt{receipts.length !== 1 ? "s" : ""} to pay
            </p>
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
              <p className="font-medium mb-1">Payment successful!</p>
              <p className="text-xs">
                All {receipts.length} receipt{receipts.length !== 1 ? "s" : ""} have been paid.
              </p>
              {hash && (
                <div className="mt-2">
                  <a
                    href={`https://explorer.celo.org/sepolia/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-xs"
                  >
                    View transaction
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayAll}
            disabled={isPending || isConfirming || calculateTotal() <= 0}
            className="w-full bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isPending ? "Confirming..." : "Processing..."}</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Pay All Receipts</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

