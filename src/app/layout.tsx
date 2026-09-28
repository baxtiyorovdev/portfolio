import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getPortfolio } from "@/lib/content";
import { buildSiteGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    siteConfig.name,
    ...siteConfig.alternateNames,
    `@${siteConfig.handle}`,
    "Front End Developer",
    "Frontend Developer Uzbekistan",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Portfolio",
    "Web Developer",
    "Qashqadaryo",
    "Uzbekistan",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
    creator: `@${siteConfig.handle}`,
  },
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
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  category: "technology",
};

// Keep "preloader:done" / "bento-preloaded" in sync with src/lib/intro.ts.
const bootScript = `(function () {
  var root = document.documentElement;

  function fit() {
    var scale = Math.min(innerWidth / 1512, innerHeight / 784);
    root.style.setProperty("--bento-scale", Math.max(0.9, Math.min(scale, 1.25)).toFixed(4));
  }
  fit();
  addEventListener("resize", fit);

  // Search engines and audit tools get the finished page: no preloader, no
  // cards hidden while waiting for their entrance animation (same content).
  if (/bot|crawl|spider|slurp|google|bing|yandex|baidu|duckduck|lighthouse|pagespeed|headless/i.test(navigator.userAgent)) {
    root.classList.add("crawler");
    return;
  }
  root.classList.add("js");

  var seen = false;
  try { seen = sessionStorage.getItem("bento-preloaded") === "1"; } catch (e) {}
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var admin = location.pathname.indexOf("/admin") === 0;
  if (!seen && !reduced && !admin) {
    root.classList.add("preloading");
    // Failsafe: never let the overlay trap the page if something goes wrong.
    setTimeout(function () {
      if (!root.classList.contains("preloading")) return;
      root.classList.remove("preloading");
      dispatchEvent(new Event("preloader:done"));
    }, 8000);
  }
})();`;

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

// Safety net: pages regenerate hourly even if an admin save missed revalidation.
export const revalidate = 3600;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getPortfolio();
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: flags JS (so [data-reveal] cards start hidden
            only when GSAP can reveal them) and sets --bento-scale, which fits the
            1512×784 home grid to the viewport like Figma's prototype view. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="antialiased">
        <JsonLd data={buildSiteGraph(data)} />
        <SiteChrome name={data.about.name} title={data.about.title} />
        {children}
      </body>
    </html>
  );
}
