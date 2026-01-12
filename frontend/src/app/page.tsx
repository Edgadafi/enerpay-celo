"use client";

export const dynamic = "force-dynamic";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCelo } from "@/hooks/useCelo";
import { WalletCard } from "@/components/wallet/WalletCard";
import { SendPaymentButton } from "@/components/payment/SendPaymentButton";
import { ReceivePaymentButton } from "@/components/payment/ReceivePaymentButton";
import { QuickActions } from "@/components/wallet/QuickActions";
import { Logo } from "@/components/Logo";
import { HeroSection } from "@/components/hero/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const { isConnected, isCeloMainnet, switchToCeloMainnet, cusdBalanceFormatted } = useCelo();

  // Show switch network prompt if not on Celo Mainnet (production)
  if (isConnected && !isCeloMainnet) {
    return (
      <main className="min-h-screen p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Switch to Celo Mainnet</h2>
          <p className="text-gray-600 mb-6">
            Please switch to Celo Mainnet to use LatamFi
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
    <main className="min-h-screen">
      {isConnected ? (
        <>
          {/* Header for Connected Users */}
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

          {/* Dashboard Content */}
          <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
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
          </div>
        </>
      ) : (
        <>
          {/* Landing Page for Non-Connected Users */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <Logo size="md" variant="full" animated={true} />
              </div>
              <div className="flex-shrink-0">
                <ConnectButton showBalance={false} />
              </div>
            </div>
          </header>
          <div className="w-full">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BenefitsSection />
            <CTASection />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}

