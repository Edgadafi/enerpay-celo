"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics if ID is provided
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId) {
      initGoogleAnalytics(gaId);
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}

