import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KiddoSearch",
  description: "A fun and safe AI search engine built just for kids! 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased min-h-screen flex flex-col`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
