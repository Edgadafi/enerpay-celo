"use client";

import { Send, ArrowDownUp, CreditCard, TrendingUp, History } from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: Send,
    label: "Send",
    href: "/send",
    color: "bg-blue-500",
  },
  {
    icon: ArrowDownUp,
    label: "Remittance",
    href: "/remittance",
    color: "bg-purple-500",
  },
  {
    icon: History,
    label: "History",
    href: "/remittance/history",
    color: "bg-indigo-500",
  },
  {
    icon: CreditCard,
    label: "Pay CFE",
    href: "/pay-cfe",
    color: "bg-orange-500",
  },
  {
    icon: TrendingUp,
    label: "Credit",
    href: "/credit",
    color: "bg-green-500",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95"
          >
            <div className={`${action.color} p-3 rounded-full text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

