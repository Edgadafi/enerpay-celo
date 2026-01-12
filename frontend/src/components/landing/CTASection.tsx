"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-latamfi-green to-primary-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están usando LatamFi para sus transacciones financieras
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
                            className="bg-white text-latamfi-green font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 text-lg flex items-center gap-2"
                          >
                            Conectar Wallet
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        );
                      }

                      return (
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="bg-white text-latamfi-green font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-200 text-lg"
                        >
                          Ir al Dashboard
                        </button>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          <p className="text-sm text-white/80 mt-6">
            Sin registro. Sin comisiones ocultas. 100% descentralizado.
          </p>
        </div>
      </div>
    </section>
  );
}
