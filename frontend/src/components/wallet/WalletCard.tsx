"use client";

import { formatCurrency } from "@/lib/celo/utils";
import { Loader2 } from "lucide-react";

interface WalletCardProps {
  balance: string;
  isLoading?: boolean;
}

export function WalletCard({ balance, isLoading }: WalletCardProps) {
  return (
    <div className="bg-gradient-to-br from-celo-green to-primary-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium opacity-90">cUSD Balance</h2>
        <span className="text-2xl">💵</span>
      </div>
      <div className="flex items-baseline gap-2">
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <span className="text-4xl font-bold">
            {formatCurrency(parseFloat(balance || "0"), "USD", "en-US")}
          </span>
        )}
      </div>
      <p className="text-sm opacity-75 mt-2">Celo Dollar</p>
    </div>
  );
}

