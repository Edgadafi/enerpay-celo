"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  showConnect?: boolean;
}

export function Header({
  title,
  showBack = false,
  backHref = "/",
  showConnect = true,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
        {showBack && (
          <Link
            href={backHref}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}
        
        {title ? (
          <h1 className="text-xl font-bold flex-1">{title}</h1>
        ) : (
          <div className="flex-1">
            <Logo size="md" showText={true} />
          </div>
        )}

        {showConnect && (
          <div className="ml-auto">
            <ConnectButton showBalance={false} />
          </div>
        )}
      </div>
    </header>
  );
}

