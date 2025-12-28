"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRemittance, useSendRemittance, useCalculateFee } from "@/hooks/useRemittance";
import { isValidAddress, isValidPhoneNumber, formatPhoneToE164 } from "@/lib/celo/utils";
import { Send, Loader2, Calculator } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

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
  const [destinationType, setDestinationType] = useState("mobile"); // Default to mobile for better UX
  const [destinationId, setDestinationId] = useState("");
  const [error, setError] = useState("");

  const { sendRemittance, hash, isPending, isConfirming, isSuccess, error: txError } =
    useSendRemittance();

  const { feeFormatted, totalAmountFormatted, isLoading: feeLoading } = useCalculateFee(amount);

  const handleSend = async () => {
    setError("");
    
    console.log("📤 handleSend called with:", {
      destinationType,
      beneficiary,
      destinationId,
      amount,
    });

    // Validation
    if (!isConnected) {
      setError("Please connect your wallet");
      return;
    }

    if (!isCeloSepolia) {
      setError("Please switch to Celo Sepolia network");
      return;
    }

    // For mobile and bank, beneficiary address is optional (will use contract address as escrow)
    // For wallet type, beneficiary address is required
    if (destinationType === "wallet") {
      if (!beneficiary || !isValidAddress(beneficiary)) {
        setError("Please enter a valid beneficiary address");
        return;
      }
    } else {
      console.log("✅ Skipping beneficiary validation for", destinationType);
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

    // Validate phone number format for mobile type
    if (destinationType === "mobile") {
      if (!isValidPhoneNumber(finalDestinationId)) {
        setError(
          "Invalid phone number format. Please use E.164 format: +[country code][number]\n" +
          "Examples: +521234567890 (Mexico), +571234567890 (Colombia), +541123456789 (Argentina)"
        );
        return;
      }
    }

    try {
      // For mobile/bank, use contract address as beneficiary (funds stay in contract as escrow)
      // In production, this would be resolved via an identity service
      const finalBeneficiary = 
        destinationType === "wallet" 
          ? beneficiary 
          : contractAddress; // Use contract as escrow for mobile/bank
      
      await sendRemittance(finalBeneficiary, amount, destinationType, finalDestinationId);
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
      <Header title="Send Remittance" showBack={true} />

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          {/* Beneficiary (only required for wallet type) */}
          {destinationType === "wallet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beneficiary Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
              />
            </div>
          )}
          
          {/* Info for mobile/bank */}
          {(destinationType === "mobile" || destinationType === "bank") && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For {destinationType === "mobile" ? "Mobile Money" : "Bank"} transfers, 
                you only need to provide the {destinationType === "mobile" ? "phone number" : "account number"}. 
                The funds will be held in escrow until the remittance is processed.
              </p>
              {destinationType === "mobile" && (
                <p className="text-xs text-blue-600 mt-2">
                  In production, the phone number would be automatically resolved to a wallet address 
                  using Celo&apos;s identity protocol or a similar service.
                </p>
              )}
            </div>
          )}

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
                const newType = e.target.value;
                console.log("🔄 Changing destination type to:", newType);
                setDestinationType(newType);
                // Clear beneficiary when switching to mobile/bank
                if (newType !== "wallet") {
                  console.log("🧹 Clearing beneficiary field (not wallet type)");
                  setBeneficiary("");
                } else {
                  // When switching to wallet, use destinationId as beneficiary if available
                  if (destinationId && isValidAddress(destinationId)) {
                    setBeneficiary(destinationId);
                  }
                }
                // Clear destinationId when switching to wallet
                if (newType === "wallet") {
                  setDestinationId(beneficiary || "");
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
                onChange={(e) => {
                  // Auto-format phone numbers to E.164
                  if (destinationType === "mobile") {
                    const formatted = formatPhoneToE164(e.target.value);
                    setDestinationId(formatted);
                  } else {
                    setDestinationId(e.target.value);
                  }
                }}
                placeholder={
                  destinationType === "bank"
                    ? "Account number"
                    : "+521234567890"
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
              />
              {destinationType === "mobile" && (
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                  <p className="font-medium">Format: E.164 (International)</p>
                  <p>Must start with + followed by country code and number</p>
                  <p className="text-gray-400">
                    Examples: +521234567890 (MX), +571234567890 (CO), +541123456789 (AR)
                  </p>
                </div>
              )}
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


