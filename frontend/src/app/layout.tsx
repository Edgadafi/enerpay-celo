import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/lib/wagmi/provider";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased bg-celo-light min-h-screen">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}

