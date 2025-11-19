"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRemittance, useSendRemittance, useCalculateFee } from "@/hooks/useRemittance";
import { isValidAddress } from "@/lib/celo/utils";
import { ArrowLeft, Send, Loader2, Calculator } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const DESTINATION_TYPES = [
  { value: "wallet", label: "Wallet (Instant)" },
  { value: "bank", label: "Bank Account" },
  { value: "mobile", label: "Mobile Money" },
];

export default function RemittancePage() {
  const { address, isConnected } = useAccount();
  const { isCeloSepolia, contractAddress } = useRemittance();
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [destinationType, setDestinationType] = useState("wallet");
  const [destinationId, setDestinationId] = useState("");
  const [error, setError] = useState("");

  const { sendRemittance, hash, isPending, isConfirming, isSuccess, error: txError } =
    useSendRemittance();

  const { feeFormatted, totalAmountFormatted, isLoading: feeLoading } = useCalculateFee(amount);

  const handleSend = async () => {
    setError("");

    // Validation
    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    if (!isCeloSepolia) {
      setError("Please switch to Celo Sepolia network");
      return;
    }

    if (!beneficiary || !isValidAddress(beneficiary)) {
      setError("Please enter a valid beneficiary address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!destinationType) {
      setError("Please select a destination type");
      return;
    }

    // For wallet type, use beneficiary address as destinationId
    const finalDestinationId = destinationType === "wallet" ? beneficiary : destinationId;

    if (!finalDestinationId) {
      setError("Please enter destination ID");
      return;
    }

    try {
      await sendRemittance(beneficiary, amount, destinationType, finalDestinationId);
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
            Please connect your wallet to send remittances
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (!isCeloSepolia) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Switch to Celo Sepolia</h2>
          <p className="text-gray-600 mb-6">
            Please switch to Celo Sepolia Testnet to use remittances
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Chain ID: 11142220
          </p>
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
          <h1 className="text-xl font-bold">Send Remittance</h1>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Beneficiary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beneficiary Address
            </label>
            <input
              type="text"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
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

          {/* Fee Calculation */}
          {amount && parseFloat(amount) > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calculator className="w-4 h-4" />
                <span>Fee Calculation</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">{amount} cUSD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (1.5%):</span>
                <span className="font-semibold">
                  {feeLoading ? "..." : feeFormatted} cUSD
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-700 font-medium">Total:</span>
                <span className="font-bold text-celo-green">
                  {feeLoading ? "..." : totalAmountFormatted} cUSD
                </span>
              </div>
            </div>
          )}

          {/* Destination Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Type
            </label>
            <select
              value={destinationType}
              onChange={(e) => {
                setDestinationType(e.target.value);
                if (e.target.value === "wallet") {
                  setDestinationId(beneficiary);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
            >
              {DESTINATION_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {destinationType === "wallet" && (
              <p className="text-xs text-gray-500 mt-1">
                Wallet-to-wallet transfers are instant
              </p>
            )}
          </div>

          {/* Destination ID (if not wallet) */}
          {destinationType !== "wallet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination ID
                {destinationType === "bank" && " (Account Number)"}
                {destinationType === "mobile" && " (Phone Number)"}
              </label>
              <input
                type="text"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                placeholder={
                  destinationType === "bank"
                    ? "Account number"
                    : "Phone number"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
              />
            </div>
          )}

          {/* Error */}
          {(error || txError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error || txError?.message}
            </div>
          )}

          {/* Success */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              Remittance sent successfully!
              {hash && (
                <div className="mt-2">
                  <a
                    href={`https://explorer.celo.org/sepolia/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    View transaction
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isPending || isConfirming}
            className="w-full bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isPending ? "Confirming..." : "Processing..."}</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Remittance</span>
              </>
            )}
          </button>

          {/* Contract Info */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
            Contract: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </div>
        </div>
      </div>
    </div>
  );
}


