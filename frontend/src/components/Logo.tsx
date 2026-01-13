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
      {/* Logo Icon - New Design from Gemini */}
      {showIcon && (
        <div
          className={cn(
            "relative flex items-center justify-center",
            sizeClasses[size],
            animated && "animate-logo-pulse",
            showGlow && "animate-logo-glow"
          )}
        >
          {/* LatamFi Logo - "L" with Growth Arrow (Gemini Design) */}
          <svg
            className={cn(
              "w-full h-full",
              animated && "animate-logo-shimmer"
            )}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background rectangle with rounded corners */}
            <rect width="40" height="40" rx="8" fill="#35D07F" fillOpacity="0.1" />
            {/* "L" shape */}
            <path d="M12 28V12H16V24H28V28H12Z" fill="#35D07F" />
            {/* Upward arrow */}
            <path
              d="M20 20L24 16L28 20"
              stroke="#35D07F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 16V26"
              stroke="#35D07F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Text */}
      {showText && (
        <span
          className={cn(
            "font-bold text-celo-dark dark:text-white whitespace-nowrap",
            textSizeClasses[size],
            animated && "animate-logo-fade-in"
          )}
        >
          LatamFi
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
