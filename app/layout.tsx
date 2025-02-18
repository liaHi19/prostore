import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/assets/styles/globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prostore",
  description: "A modern ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>{children}</body>
    </html>
  );
}
