"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "@/components/Logo";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A1628] overflow-hidden px-4">
      {/* Background Glow Effect - Radial glow in cyan and Celo green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#35D07F] opacity-10 blur-[120px] rounded-full" />
      
      {/* Hexagonal Pattern Overlay - Very subtle */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} />

      {/* Badge - Powered by Celo */}
      <div className="z-10 mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#35D07F]/30 bg-[#35D07F]/10 backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-[#35D07F] animate-pulse" />
        <span className="text-[#35D07F] text-sm font-medium tracking-wide uppercase">
          Potenciado por Celo
        </span>
      </div>

      {/* Main Content */}
      <div className="z-10 text-center max-w-4xl">
        {/* Main Tagline - Clear and visible, no blur */}
        <h1 
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(53, 208, 127, 0.3))',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          ¡Envía, Paga, <span className="text-[#35D07F]">Crece!</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Remesas, Servicios, Crédito. <br />
          <span className="font-semibold text-white">Comisiones Ultra Bajas.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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
                          className="px-8 py-4 bg-[#35D07F] text-[#0A1628] font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(53,208,127,0.4)]"
                          style={{
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
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
                          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
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
                          className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
                        >
                          {chain.hasIcon && (
                            <div
                              className="inline-block mr-2"
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: "hidden",
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
                          className="px-8 py-4 bg-[#35D07F] text-[#0A1628] font-bold rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(53,208,127,0.4)]"
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
          
          <button 
            className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
            style={{
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Ver Beneficios
          </button>
        </div>
      </div>
    </section>
  );
}
