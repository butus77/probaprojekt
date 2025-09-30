import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteInfo } from "@/lib/site";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // SEO-alapok
  metadataBase: new URL(siteInfo.url), // pl. https://probaprojekt.vercel.app
  title: {
    default: "Bernadetta • Webfejlesztés",
    template: "%s • Bernadetta",
  },
  description:
    "Bernadetta személyes weboldala, ahol webfejlesztéssel, blogbejegyzésekkel és fotóalbummal foglalkozik.",
  alternates: {
    canonical: siteInfo.url,
  },

  // Közösségi megosztás (OG/Twitter)
  openGraph: {
    type: "website",
    siteName: "Bernadetta",
    url: siteInfo.url,
    title: "Bernadetta • Webfejlesztés",
    description:
      "Modern, letisztult weboldalak – Next.js + Tailwind, személyes blog és fotóalbum.",
    images: [
      { url: "/og/cover.png", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bernadetta • Webfejlesztés",
    description:
      "Modern, letisztult weboldalak – Next.js + Tailwind, személyes blog és fotóalbum.",
    images: ["/og/cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteInfo.name,
    url: siteInfo.url,
    sameAs: siteInfo.sameAs,
  };

  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={`flex flex-col min-h-screen overflow-x-hidden ${inter.className}`}>
        {/* Téma villanás ellen */}
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

        {/* JSON-LD (szervezett adatok) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* MathJax – LaTeX képletekhez (a blogban) */}
        <Script
          id="mathjax-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.MathJax = {
                tex: {
                  inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
                  displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
                  processEscapes: true
                }
              };
            `,
          }}
        />
        <Script
          id="mathjax"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
