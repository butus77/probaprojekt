import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteInfo } from "@/lib/site";
import Script from "next/script";

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteInfo.name,
    url: siteInfo.url,
    sameAs: siteInfo.sameAs,
  };

  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen overflow-x-hidden ${inter.className}`}>
        <Script strategy="beforeInteractive" id="theme-init">
          {`
            if (typeof window !== 'undefined') {
              let theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.classList.add(theme);
              } else {
                document.documentElement.classList.add('dark');
              }
            }
          `}
        </Script>
        <Header />
        <main id="content" className="flex-grow">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
