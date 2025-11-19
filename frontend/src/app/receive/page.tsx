"use client";

export const dynamic = "force-dynamic";

import { useAccount } from "wagmi";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { truncateAddress } from "@/lib/celo/utils";

export default function ReceivePage() {
  const { address, isConnected } = useAccount();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to receive payments
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
          <h1 className="text-xl font-bold">Receive Payment</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 text-center">
          <h2 className="text-lg font-semibold">Your Wallet Address</h2>

          {/* QR Code */}
          <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
            {address && (
              <QRCodeSVG
                value={address}
                size={256}
                level="H"
                includeMargin={true}
              />
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Address</p>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              <code className="flex-1 text-sm font-mono break-all">
                {address ? truncateAddress(address, 8) : ""}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Copy address"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-600">Copied to clipboard!</p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Share this QR code or address to receive cUSD payments
          </p>
        </div>
      </div>
    </div>
  );
}

