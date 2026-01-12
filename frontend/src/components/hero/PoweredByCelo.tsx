"use client";

export function PoweredByCelo({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 ${className || ""}`}>
      <span className="text-sm text-gray-300">Potenciado por</span>
      <span className="text-latamfi-green font-bold text-sm">Celo</span>
    </div>
  );
}
