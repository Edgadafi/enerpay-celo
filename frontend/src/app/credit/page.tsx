"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount } from "wagmi";
import { TrendingUp, DollarSign, Clock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";
import { 
  useMicrofinance, 
  useReputationScore, 
  useRequestLoan,
  useMicrofinanceParams 
} from "@/hooks/useMicrofinance";
import { useCelo } from "@/hooks/useCelo";

interface CreditRequest {
  amount: string;
  purpose: string;
  repaymentPeriod: string;
}

export default function CreditPage() {
  const { isConnected, address } = useAccount();
  const { isCeloMainnet, switchToCeloMainnet } = useCelo();
  const { isCeloMainnet: isMicrofinanceReady, contractAddress } = useMicrofinance();
  const { reputation, isLoading: reputationLoading } = useReputationScore();
  const { minLoanAmount, maxLoanAmount, minReputationScore, isLoading: paramsLoading } = useMicrofinanceParams();
  const { requestLoan, hash, isPending, isConfirming, isSuccess, error: txError } = useRequestLoan();
  
  const [selectedOption, setSelectedOption] = useState<"request" | "history" | null>(null);
  const [formData, setFormData] = useState<CreditRequest>({
    amount: "",
    purpose: "",
    repaymentPeriod: "3",
  });
  const [error, setError] = useState("");

  const handleSubmitRequest = async () => {
    setError("");

    // Validation
    if (!isCeloMainnet) {
      setError("Please switch to Celo Sepolia network");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please enter a valid credit amount");
      return;
    }

    if (!formData.purpose) {
      setError("Please select a purpose for the credit");
      return;
    }

    const amount = parseFloat(formData.amount);
    const minAmount = parseFloat(minLoanAmount);
    const maxAmount = parseFloat(maxLoanAmount);

    if (amount < minAmount) {
      setError(`Minimum credit amount is ${minAmount} cUSD`);
      return;
    }

    if (amount > maxAmount) {
      setError(`Maximum credit amount is ${maxAmount} cUSD`);
      return;
    }

    if (reputation < minReputationScore) {
      setError(`Insufficient reputation score. Minimum required: ${minReputationScore}, Your score: ${reputation}`);
      return;
    }

    try {
      await requestLoan(
        formData.amount,
        parseInt(formData.repaymentPeriod),
        formData.purpose
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit credit request. Please try again."
      );
    }
  };

  // Reset form on success
  if (isSuccess) {
    setTimeout(() => {
      setFormData({ amount: "", purpose: "", repaymentPeriod: "3" });
      setSelectedOption(null);
    }, 3000);
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to access credit services
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
            Please switch to Celo Sepolia Testnet to use credit services
          </p>
          <button
            onClick={switchToCeloMainnet}
            className="w-full bg-celo-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Switch Network
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Credit" showBack={true} />

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="bg-celo-green/10 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-celo-green" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">Credit Services</h2>
                <p className="text-sm text-gray-600">
                  Access microfinance and credit options powered by Celo blockchain
                </p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedOption("request")}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left border-2 border-transparent hover:border-celo-green"
            >
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-3">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">Request Credit</h3>
              <p className="text-xs text-gray-600">
                Apply for a credit line
              </p>
            </button>

            <button
              onClick={() => setSelectedOption("history")}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left border-2 border-transparent hover:border-celo-green"
            >
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Credit History</h3>
              <p className="text-xs text-gray-600">
                View your credit records
              </p>
            </button>
          </div>

          {/* Request Credit Form */}
          {selectedOption === "request" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">Request Credit</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Amount (cUSD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => {
                      setFormData({ ...formData, amount: e.target.value });
                      setError("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
                    disabled={isPending || isConfirming}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => {
                      setFormData({ ...formData, purpose: e.target.value });
                      setError("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
                    disabled={isPending || isConfirming}
                  >
                    <option value="">Select purpose</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                    <option value="emergency">Emergency</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repayment Period (months)
                  </label>
                  <select
                    value={formData.repaymentPeriod}
                    onChange={(e) => {
                      setFormData({ ...formData, repaymentPeriod: e.target.value });
                      setError("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
                    disabled={isPending || isConfirming}
                  >
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                {/* Reputation Score */}
                {!reputationLoading && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-900">Your Reputation Score:</span>
                      <span className="text-lg font-bold text-blue-600">{reputation}/1000</span>
                    </div>
                    {reputation < minReputationScore && (
                      <p className="text-xs text-blue-700 mt-2">
                        Minimum required: {minReputationScore}. Build your reputation by making payments and remittances.
                      </p>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {(error || txError) && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error || txError?.message}</p>
                  </div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800 mb-1">
                        Credit Request Submitted!
                      </p>
                      <p className="text-xs text-green-700 mb-2">
                        Your request is being reviewed. You&apos;ll be notified once it&apos;s processed.
                      </p>
                      {hash && (
                        <a
                          href={`https://explorer.celo.org/sepolia/tx/${hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline text-green-700"
                        >
                          View transaction
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Credit approval is subject to credit score and reputation system evaluation.
                  </p>
                </div>

                <button
                  onClick={handleSubmitRequest}
                  disabled={isPending || isConfirming || isSuccess || reputationLoading || paramsLoading}
                  className="w-full bg-celo-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{isPending ? "Confirming..." : "Processing..."}</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Request Submitted</span>
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setFormData({ amount: "", purpose: "", repaymentPeriod: "3" });
                    setError("");
                  }}
                  className="w-full text-gray-600 py-2 text-sm"
                  disabled={isPending || isConfirming}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Credit History */}
          {selectedOption === "history" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold">Credit History</h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      No credit history yet
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Your credit history will appear here once you request credit
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedOption(null)}
                className="w-full text-gray-600 py-2 text-sm"
              >
                Back
              </button>
            </div>
          )}

          {/* Features */}
          {!selectedOption && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Credit Features</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-celo-green mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">On-chain Reputation</p>
                    <p className="text-xs text-gray-600">
                      Your payment history builds your credit score
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-celo-green mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Transparent Terms</p>
                    <p className="text-xs text-gray-600">
                      All credit terms are recorded on-chain
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-celo-green mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Fast Approval</p>
                    <p className="text-xs text-gray-600">
                      Automated credit evaluation based on your history
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

