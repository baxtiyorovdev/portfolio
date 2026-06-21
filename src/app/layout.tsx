import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { Providers } from "@/components/providers/Providers";
import { Background } from "@/components/layout/Background";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Baxtiyorov Shaxriyor",
    "Front End Developer",
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "UI Developer",
    "Web Developer",
    "Uzbekistan",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@baxtiyorovdev",
  },
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a08" },
    { media: "(prefers-color-scheme: light)", color: "#f6f1e7" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <JsonLd data={siteGraph} />
        <Providers>
          <span id="top" aria-hidden className="absolute top-0" />
          <Background />
          <Preloader />
          <Navbar />
          <main className="relative min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
