"use client";

// Stats strip para generar confianza
const stats = [
  {
    value: "< 1s",
    label: "Tiempo de transacción",
  },
  {
    value: "$0.001",
    label: "Comisión promedio",
  },
  {
    value: "100%",
    label: "Non-custodial",
    sublabel: "Tú controlas tus fondos",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-6 bg-[#0A1628] relative overflow-hidden">
      {/* Hexagonal Pattern Overlay - Very subtle */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
           }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/5">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-[#35D07F] text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              {stat.sublabel && (
                <p className="text-gray-500 text-xs">
                  {stat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
