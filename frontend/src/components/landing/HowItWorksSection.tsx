"use client";

import { Wallet, Coins, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conecta",
    description: "Enlaza tu wallet compatible con Celo (Valora, MetaMask).",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Carga",
    description: "Añade fondos mediante stablecoins (cUSD, cEUR).",
    icon: Coins,
  },
  {
    number: "03",
    title: "Opera",
    description: "Envía, paga servicios o solicita microcréditos al instante.",
    icon: Zap,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-[#0A1628] relative overflow-hidden">
      {/* Hexagonal Pattern Overlay - Very subtle */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <h2 
            className="text-2xl md:text-3xl lg:text-h2 font-bold mb-4 bg-gradient-to-r from-white via-white to-[#35D07F]/50 bg-clip-text text-transparent"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(53, 208, 127, 0.3))',
            }}
          >
            Cómo Funciona
          </h2>
          <p className="text-base md:text-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Comienza a usar LatamFi en solo 3 pasos simples
          </p>
        </div>

        {/* Timeline Steps - Responsive: 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative px-4">
          {/* Connecting Line for Desktop - Horizontal Timeline */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#35D07F]/30 via-[#35D07F]/50 to-[#35D07F]/30" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step Card - Glassmorphism */}
                <div className="w-full p-6 md:p-8 rounded-2xl bg-[#1a2332]/40 backdrop-blur-lg border border-white/10 hover:border-[#35D07F]/50 transition-all group hover:shadow-[0_0_30px_rgba(53,208,127,0.2)] hover:-translate-y-1"
                     style={{
                       background: 'linear-gradient(135deg, rgba(26, 35, 50, 0.4) 0%, rgba(26, 35, 50, 0.3) 100%)',
                     }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#35D07F] rounded-full flex items-center justify-center text-[#0A1628] font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div className="mt-6 mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-xl bg-[#35D07F]/10 flex items-center justify-center group-hover:bg-[#35D07F]/20 group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-[#35D07F]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#35D07F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector for Desktop (except last) */}
                {!isLast && (
                  <div className="hidden md:block absolute top-24 -right-6 w-12 h-0.5 bg-gradient-to-r from-[#35D07F]/50 to-transparent">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-[#35D07F]/50 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
