import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter via next/font — optimized, zero layout shift
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buy My House Boise | Most Trusted Cash Home Buyer",
  description:
    "Sell your Boise home fast for cash. No fees, no commissions, no repairs. Get a personalized cash offer within 24 hours from Boise's most trusted local home buyer.",
  keywords: "sell my house Boise, cash home buyers Boise, buy my house Boise, sell house fast Idaho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
