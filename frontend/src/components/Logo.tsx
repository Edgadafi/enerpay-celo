"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Circle with Gradient */}
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center",
          sizeClasses[size],
          "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 shadow-lg"
        )}
      >
        {/* Lightning Bolt Icon */}
        <svg
          className={cn(
            "text-white transform rotate-12",
            size === "sm" && "w-4 h-4",
            size === "md" && "w-6 h-6",
            size === "lg" && "w-8 h-8",
            size === "xl" && "w-12 h-12"
          )}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 1L3 14h8l-1 9 10-13h-8l1-9z" />
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <span
          className={cn(
            "font-bold text-celo-dark",
            textSizeClasses[size]
          )}
        >
          EnerPay
        </span>
      )}
    </div>
  );
}

