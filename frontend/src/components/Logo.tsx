"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "iconOnly" | "textOnly";
  animated?: boolean;
  showGlow?: boolean;
  className?: string;
}

export function Logo({
  size = "md",
  variant = "full",
  animated = false,
  showGlow = false,
  className,
}: LogoProps) {
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

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const showText = variant === "full" || variant === "textOnly";
  const showIcon = variant === "full" || variant === "iconOnly";

  return (
    <div
      className={cn(
        "flex items-center gap-4 flex-shrink-0",
        animated && "animate-logo-fade-in",
        className
      )}
    >
      {/* Logo Circle with Gradient */}
      {showIcon && (
        <div
          className={cn(
            "relative rounded-full flex items-center justify-center",
            sizeClasses[size],
            "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 shadow-lg",
            animated && "animate-logo-pulse",
            showGlow && "animate-logo-glow"
          )}
        >
          {/* Optimized Lightning Bolt SVG */}
          <svg
            className={cn(
              "text-white transform rotate-12",
              iconSizeClasses[size],
              animated && "animate-lightning-shimmer"
            )}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Optimized path - cleaner lightning bolt */}
            <path
              d="M13 1.5L4.5 13.5h6.5l-0.8 7.2L18.5 8.5h-6.5l1-7z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>
      )}

      {/* Text */}
      {showText && (
        <span
          className={cn(
            "font-bold text-celo-dark whitespace-nowrap",
            textSizeClasses[size],
            animated && "animate-logo-fade-in"
          )}
        >
          EnerPay
        </span>
      )}
    </div>
  );
}

// Variant exports for convenience
export function LogoIcon({
  size = "md",
  animated = false,
  className,
}: Omit<LogoProps, "variant" | "showText">) {
  return (
    <Logo
      size={size}
      variant="iconOnly"
      animated={animated}
      className={className}
    />
  );
}

export function LogoText({
  size = "md",
  animated = false,
  className,
}: Omit<LogoProps, "variant" | "showIcon">) {
  return (
    <Logo
      size={size}
      variant="textOnly"
      animated={animated}
      className={className}
    />
  );
}
