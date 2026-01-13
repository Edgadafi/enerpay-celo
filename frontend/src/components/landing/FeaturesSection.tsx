"use client";

// Features con SVG paths directos para mejor rendimiento
const features = [
  {
    title: "Remesas Instantáneas",
    description: "Transferencias transfronterizas en segundos usando cUSD.",
    iconPath: "M12 8v8m4-4H8",
  },
  {
    title: "Microcréditos",
    description: "Acceso a financiamiento basado en reputación on-chain.",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    title: "Pago de Servicios",
    description: "Paga luz, agua y telefonía directamente desde la app.",
    iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  {
    title: "Comisiones Bajas",
    description: "Menos de $0.01 por transacción gracias a la red Celo.",
    iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Multi-Asset",
    description: "Soporte para Celo, cUSD, cEUR y otros activos locales.",
    iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    title: "Inclusión Total",
    description: "Diseñado para funcionar incluso con conexiones de baja velocidad.",
    iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Todo lo que necesitas en un solo lugar
          </h2>
        </div>

        {/* Features Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/5 bg-[#1a2332] hover:bg-[#1f2937] transition-colors group"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 bg-[#35D07F]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#35D07F]/30 transition-colors">
                  <svg 
                    className="w-6 h-6 text-[#35D07F]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={feature.iconPath} />
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
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
