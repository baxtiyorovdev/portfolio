import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Preloader } from "@/components/loading/Preloader";
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

// Keep "preloader:done" / "bento-preloaded" in sync with src/lib/intro.ts.
const bootScript = `(function () {
  var root = document.documentElement;
  root.classList.add("js");

  var seen = false;
  try { seen = sessionStorage.getItem("bento-preloaded") === "1"; } catch (e) {}
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!seen && !reduced) {
    root.classList.add("preloading");
    // Failsafe: never let the overlay trap the page if something goes wrong.
    setTimeout(function () {
      if (!root.classList.contains("preloading")) return;
      root.classList.remove("preloading");
      dispatchEvent(new Event("preloader:done"));
    }, 8000);
  }

  function fit() {
    var scale = Math.min(innerWidth / 1512, innerHeight / 784);
    root.style.setProperty("--bento-scale", Math.max(0.9, Math.min(scale, 1.25)).toFixed(4));
  }
  fit();
  addEventListener("resize", fit);
})();`;

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: flags JS (so [data-reveal] cards start hidden
            only when GSAP can reveal them) and sets --bento-scale, which fits the
            1512×784 home grid to the viewport like Figma's prototype view. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="antialiased">
        <JsonLd data={siteGraph} />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
