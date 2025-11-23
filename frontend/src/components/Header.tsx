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
      <div className="max-w-md mx-auto px-4 py-5 flex items-center gap-3 min-h-[64px]">
        {showBack && (
          <Link
            href={backHref}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}
        
        {title ? (
          <h1 className="text-xl font-bold flex-1 min-w-0">{title}</h1>
        ) : (
          <div className="flex-1 min-w-0">
            <Logo size="md" variant="full" animated={true} />
          </div>
        )}

        {showConnect && (
          <div className="ml-auto flex-shrink-0">
            <ConnectButton showBalance={false} />
          </div>
        )}
      </div>
    </header>
  );
}

