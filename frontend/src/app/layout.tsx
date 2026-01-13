import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/lib/wagmi/provider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";

export const dynamic = "force-dynamic";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LatamFi - Financial Inclusion for LATAM",
  description:
    "¡Envía, Paga, Crece! Remesas, Servicios, Crédito. Comisiones Ultra Bajos. Potenciado por Celo",
  manifest: "/manifest.json",
  themeColor: "#35D07F",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LatamFi",
  },
  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    title: "LatamFi - Financial Inclusion for LATAM",
    description:
      "¡Envía, Paga, Crece! Remesas, Servicios, Crédito. Comisiones Ultra Bajos. Potenciado por Celo",
    siteName: "LatamFi",
    images: [
      {
        url: "/og-image.png", // TODO: Add OG image
        width: 1200,
        height: 630,
        alt: "LatamFi - Financial Inclusion for LATAM",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "LatamFi - Financial Inclusion for LATAM",
    description:
      "¡Envía, Paga, Crece! Remesas, Servicios, Crédito. Comisiones Ultra Bajos. Potenciado por Celo",
    images: ["/og-image.png"], // TODO: Add Twitter image
    creator: "@latamfi", // TODO: Add Twitter handle
  },
  // Additional metadata
  keywords: [
    "LatamFi",
    "Celo",
    "Remesas",
    "Microcréditos",
    "Blockchain",
    "cUSD",
    "Financial Inclusion",
    "LATAM",
    "Web3",
    "DeFi",
  ],
  authors: [{ name: "LatamFi Team" }],
  creator: "LatamFi",
  publisher: "LatamFi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className="antialiased bg-celo-light min-h-screen">
        <Web3Provider>
          <AnalyticsProvider>
            {children}
            <FeedbackButton />
          </AnalyticsProvider>
        </Web3Provider>
      </body>
    </html>
  );
}

