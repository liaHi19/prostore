import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/assets/styles/globals.css";

import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
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
