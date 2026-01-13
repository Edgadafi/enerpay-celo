"use client";

import { Send, ArrowDownUp, CreditCard, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Remesas Instantáneas",
    description: "Envía dinero a cualquier parte de Latinoamérica en segundos, sin intermediarios bancarios.",
  },
  {
    icon: ArrowDownUp,
    title: "Pagos de Servicios",
    description: "Paga servicios públicos, facturas y más directamente desde tu wallet.",
  },
  {
    icon: CreditCard,
    title: "Microcréditos",
    description: "Accede a crédito basado en tu reputación on-chain, sin burocracia tradicional.",
  },
  {
    icon: Zap,
    title: "Transacciones Rápidas",
    description: "Confirmación en menos de 3 segundos en Celo Mainnet, sin esperas.",
  },
  {
    icon: Shield,
    title: "Seguro y Descentralizado",
    description: "Tus fondos están protegidos por smart contracts auditados y verificados.",
  },
  {
    icon: Globe,
    title: "Potenciado por Celo",
    description: "Construido sobre la blockchain más amigable para móviles y usuarios.",
  },
];

export function FeaturesSection() {
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
            Todo lo que necesitas para tu economía digital
          </h2>
          <p className="text-base md:text-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
            LatamFi te ofrece las herramientas financieras que necesitas, todo en un solo lugar
          </p>
        </div>

        {/* Features Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl bg-[#1a2332]/40 backdrop-blur-lg border border-white/10 hover:border-[#35D07F]/50 transition-all group hover:shadow-[0_0_30px_rgba(53,208,127,0.2)] hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 35, 50, 0.4) 0%, rgba(26, 35, 50, 0.3) 100%)',
                  borderImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(53,208,127,0.2) 100%) 1',
                }}
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-lg bg-[#35D07F]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#35D07F]/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#35D07F]" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#35D07F] transition-colors">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
