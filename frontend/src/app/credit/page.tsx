"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useAccount } from "wagmi";
import { TrendingUp, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

export default function CreditPage() {
  const { isConnected } = useAccount();
  const [selectedOption, setSelectedOption] = useState<"request" | "history" | null>(null);

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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none">
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
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-celo-green focus:border-transparent outline-none">
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Credit approval is subject to credit score and reputation system evaluation.
                  </p>
                </div>

                <button className="w-full bg-celo-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                  Submit Request
                </button>

                <button
                  onClick={() => setSelectedOption(null)}
                  className="w-full text-gray-600 py-2 text-sm"
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

