"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "@/components/Logo";

export function HeroSection() {
  return (
    <div className="hero-background min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="xl" variant="full" animated={true} showGlow={true} />
        </div>

        {/* Main Tagline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            ¡Envía, Paga, Crece!
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto">
          Remesas, Servicios, Crédito.
          <br />
          <span className="text-latamfi-green font-semibold">
            Comisiones Ultra Bajos.
          </span>
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="bg-latamfi-green hover:bg-primary-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 text-lg"
                        >
                          Conectar Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                          Red no soportada
                        </button>
                      );
                    }

                    return (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="bg-latamfi-green hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
                        >
                          {account.displayName}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>

        {/* Powered by Celo Badge */}
        <div className="pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm text-gray-300">Potenciado por</span>
            <span className="text-latamfi-green font-bold text-sm">Celo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
