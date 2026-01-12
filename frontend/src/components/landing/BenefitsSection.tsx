"use client";

import { DollarSign, Clock, Lock, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    stat: "<1%",
    label: "Comisiones Ultra Bajas",
    description: "Paga menos que los servicios tradicionales de remesas",
  },
  {
    icon: Clock,
    stat: "<3s",
    label: "Transacciones Instantáneas",
    description: "Confirmación en segundos, no días",
  },
  {
    icon: Lock,
    stat: "100%",
    label: "Seguro y Descentralizado",
    description: "Tus fondos están protegidos por blockchain",
  },
  {
    icon: TrendingUp,
    stat: "24/7",
    label: "Disponible Siempre",
    description: "Accede a tus fondos en cualquier momento",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 hero-background text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir LatamFi?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            La plataforma financiera más rápida, segura y económica para LATAM
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-latamfi-green/20 rounded-xl">
                    <Icon className="w-8 h-8 text-latamfi-green" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-latamfi-green mb-2">
                  {benefit.stat}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {benefit.label}
                </h3>
                <p className="text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
