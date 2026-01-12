"use client";

import { Send, ArrowDownUp, CreditCard, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Envíos Instantáneos",
    description: "Envía dinero a cualquier parte de LATAM en segundos usando cUSD",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ArrowDownUp,
    title: "Remesas Ultra Rápidas",
    description: "Comisiones ultra bajas (<1%) para envíos internacionales",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "Microcréditos",
    description: "Accede a crédito basado en tu reputación on-chain",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Zap,
    title: "Transacciones Rápidas",
    description: "Confirmación en menos de 3 segundos en Celo Mainnet",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Shield,
    title: "Seguro y Descentralizado",
    description: "Tus fondos están protegidos por smart contracts auditados",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Globe,
    title: "Potenciado por Celo",
    description: "Construido sobre la blockchain más amigable para móviles",
    color: "from-teal-500 to-teal-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-celo-dark mb-4">
            Todo lo que necesitas para tu economía digital
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            LatamFi te ofrece las herramientas financieras que necesitas, todo en un solo lugar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-latamfi-green/20 group"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-celo-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
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
