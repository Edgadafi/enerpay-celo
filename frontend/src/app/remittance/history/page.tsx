"use client";

export const dynamic = "force-dynamic";

import { useAccount } from "wagmi";
import { useRemittanceHistory, useRemittanceById } from "@/hooks/useRemittance";
import { RemittanceStatus, REMITTANCE_STATUS_LABELS } from "@/lib/contracts/EnerpayRemittance.abi";
import { formatCUSD } from "@/lib/celo/utils";
import { Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";

export default function RemittanceHistoryPage() {
  const { address, isConnected } = useAccount();
  const { remittanceIds, isLoading } = useRemittanceHistory();

  if (!isConnected) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-600 mb-6">
            Please connect your wallet to view remittance history
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Remittance History" showBack={true} />

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {isLoading ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-celo-green mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading history...</p>
          </div>
        ) : remittanceIds.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-gray-500">No remittances found</p>
            <Link
              href="/remittance"
              className="mt-4 inline-block text-celo-green hover:underline"
            >
              Send your first remittance
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {remittanceIds.map((id) => (
              <RemittanceCard key={id.toString()} remittanceId={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RemittanceCard({ remittanceId }: { remittanceId: bigint }) {
  const { remittance, isLoading } = useRemittanceById(remittanceId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!remittance) {
    return null;
  }

  const statusConfig = {
    [RemittanceStatus.Pending]: {
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    [RemittanceStatus.Completed]: {
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    [RemittanceStatus.Failed]: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    [RemittanceStatus.Refunded]: {
      icon: RefreshCw,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  };

  const status = statusConfig[remittance.status] || statusConfig[RemittanceStatus.Pending];
  const StatusIcon = status.icon;
  const date = new Date(Number(remittance.timestamp) * 1000);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon className={`w-5 h-5 ${status.color}`} />
            <span className="font-semibold">
              {formatCUSD(remittance.amount)} cUSD
            </span>
          </div>
          <p className="text-sm text-gray-600">
            To: {remittance.beneficiary.slice(0, 6)}...{remittance.beneficiary.slice(-4)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
          {REMITTANCE_STATUS_LABELS[remittance.status]}
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Type: {remittance.destinationType}
        {remittance.destinationId && ` | ID: ${remittance.destinationId.slice(0, 10)}...`}
      </div>
    </div>
  );
}

