"use client";

export const dynamic = "force-dynamic";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCelo } from "@/hooks/useCelo";
import { WalletCard } from "@/components/wallet/WalletCard";
import { SendPaymentButton } from "@/components/payment/SendPaymentButton";
import { ReceivePaymentButton } from "@/components/payment/ReceivePaymentButton";
import { QuickActions } from "@/components/wallet/QuickActions";
import { Logo } from "@/components/Logo";

export default function Home() {
  const { isConnected, isCeloMainnet, switchToCeloMainnet, cusdBalanceFormatted } = useCelo();

  // Show switch network prompt if not on Celo Mainnet (production)
  if (isConnected && !isCeloMainnet) {
    return (
      <main className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Switch to Celo Mainnet</h2>
          <p className="text-gray-600 mb-6">
            Please switch to Celo Mainnet to use Enerpay
          </p>
          <button
            onClick={switchToCeloMainnet}
            className="w-full bg-celo-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Switch Network
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-5 flex items-center justify-between gap-4 min-h-[64px]">
          <div className="flex-1 min-w-0">
            <Logo size="md" variant="full" animated={true} />
          </div>
          <div className="flex-shrink-0">
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {isConnected ? (
          <>
            {/* Wallet Card */}
            <WalletCard balance={cusdBalanceFormatted} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Payment Actions */}
            <div className="grid grid-cols-2 gap-4">
              <SendPaymentButton />
              <ReceivePaymentButton />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
              <p className="text-gray-500 text-sm">
                Transaction history will appear here
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <Logo size="xl" variant="full" animated={true} showGlow={true} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-celo-dark">
              Welcome to EnerPay
            </h2>
            <p className="text-gray-600 mb-8">
              Connect your wallet to start sending payments and remittances on
              Celo
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
    </main>
  );
}

