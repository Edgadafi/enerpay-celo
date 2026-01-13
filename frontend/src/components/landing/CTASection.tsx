"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function CTASection() {
  return (
    <section className="relative py-24 bg-[#0A1628] overflow-hidden">
      {/* Glow de fondo decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#35D07F] opacity-10 blur-[100px] pointer-events-none" />

      {/* Hexagonal Pattern Overlay - Very subtle */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} />

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        <div className="bg-[#1a2332]/60 border border-white/10 p-12 md:p-16 rounded-[2.5rem] backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            El futuro de tus finanzas <br />
            <span className="text-[#35D07F]">empieza hoy.</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Únete a miles de latinoamericanos que ya están enviando remesas, pagando servicios y haciendo crecer su capital sin fronteras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                            className="w-full sm:w-auto px-10 py-4 bg-[#35D07F] text-[#0A1628] font-bold rounded-xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(53,208,127,0.3)]"
                            style={{
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                          >
                            Abrir Cuenta Gratis
                          </button>
                        );
                      }

                      return (
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="w-full sm:w-auto px-10 py-4 bg-[#35D07F] text-[#0A1628] font-bold rounded-xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(53,208,127,0.3)]"
                        >
                          Ver Mi Cuenta
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
            
            <a
              href="#"
              className="w-full sm:w-auto px-10 py-4 border border-gray-600 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
              style={{
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Leer Documentación
            </a>
          </div>

          {/* Proof of Security - Checkmarks */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-[#35D07F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Sin comisiones ocultas</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5 text-[#35D07F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>100% Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
