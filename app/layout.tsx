import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Bernadetta • Webfejlesztés",
  description: "Bernadetta személyes weboldala, ahol webfejlesztéssel, blogbejegyzésekkel és fotóalbummal foglalkozik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen overflow-x-hidden ${inter.className}`}>

        <Header />
        <main id="content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}