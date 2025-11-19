"use client";

import { Download } from "lucide-react";
import Link from "next/link";

export function ReceivePaymentButton() {
  return (
    <Link
      href="/receive"
      className="flex items-center justify-center gap-3 bg-white text-celo-green border-2 border-celo-green py-4 px-6 rounded-xl font-semibold shadow-sm hover:bg-gray-50 transition-colors active:scale-95"
    >
      <Download className="w-5 h-5" />
      <span>Receive</span>
    </Link>
  );
}

