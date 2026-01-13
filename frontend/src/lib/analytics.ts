/**
 * Analytics and Monitoring Utilities
 * 
 * This module provides analytics tracking and error monitoring.
 * Currently supports:
 * - Google Analytics 4 (GA4)
 * - Error tracking (console-based, can be extended to Sentry)
 */

// Google Analytics 4
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics
 * Call this in the root layout or _app
 */
export function initGoogleAnalytics(measurementId?: string) {
  if (typeof window === "undefined" || !measurementId) {
    return;
  }

  // Create script tag for gtag.js
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page views
 */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
    page_path: path,
  });
}

/**
 * Track custom events
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, eventParams);
}

/**
 * Track wallet connection
 */
export function trackWalletConnect(walletName: string, chainId: number) {
  trackEvent("wallet_connect", {
    wallet_name: walletName,
    chain_id: chainId,
  });
}

/**
 * Track wallet disconnect
 */
export function trackWalletDisconnect() {
  trackEvent("wallet_disconnect");
}

/**
 * Track payment sent
 */
export function trackPaymentSent(
  amount: string,
  recipient: string,
  token: string = "cUSD"
) {
  trackEvent("payment_sent", {
    amount,
    recipient: recipient.substring(0, 10) + "...", // Privacy: only first 10 chars
    token,
  });
}

/**
 * Track remittance sent
 */
export function trackRemittanceSent(
  amount: string,
  destination: string,
  token: string = "cUSD"
) {
  trackEvent("remittance_sent", {
    amount,
    destination,
    token,
  });
}

/**
 * Track microcredit request
 */
export function trackMicrocreditRequest(amount: string) {
  trackEvent("microcredit_request", {
    amount,
  });
}

/**
 * Track errors
 */
export function trackError(error: Error, context?: Record<string, any>) {
  if (typeof window === "undefined") {
    return;
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error tracked:", error, context);
  }

  // Track in Google Analytics
  if (window.gtag) {
    trackEvent("exception", {
      description: error.message,
      fatal: false,
      ...context,
    });
  }

  // TODO: Integrate with Sentry or other error tracking service
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { contexts: { custom: context } });
  // }
}

/**
 * Track user actions (button clicks, form submissions, etc.)
 */
export function trackUserAction(
  action: string,
  category: string = "user_interaction",
  label?: string
) {
  trackEvent(action, {
    event_category: category,
    event_label: label,
  });
}

