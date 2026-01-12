"use client";

import { Wallet, ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Conecta tu Wallet",
    description: "Conecta tu wallet de Celo (Valora, MetaMask, o cualquier wallet compatible)",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Envía o Recibe",
    description: "Envía remesas, realiza pagos o solicita microcréditos con un solo clic",
    icon: ArrowRight,
  },
  {
    number: "03",
    title: "Disfruta los Beneficios",
    description: "Comisiones ultra bajas, transacciones instantáneas y acceso a crédito",
    icon: CheckCircle2,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-celo-dark mb-4">
            Cómo Funciona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comienza a usar LatamFi en solo 3 pasos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-latamfi-green via-latamfi-green/50 to-latamfi-green -translate-y-1/2" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-latamfi-green rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-6 mb-6 flex justify-center">
                  <div className="p-4 bg-gradient-to-br from-latamfi-green to-primary-600 rounded-xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-celo-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
