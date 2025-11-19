"use client";

import { Send } from "lucide-react";
import Link from "next/link";

export function SendPaymentButton() {
  return (
    <Link
      href="/send"
      className="flex items-center justify-center gap-3 bg-celo-green text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:bg-primary-600 transition-colors active:scale-95"
    >
      <Send className="w-5 h-5" />
      <span>Send Payment</span>
    </Link>
  );
}

