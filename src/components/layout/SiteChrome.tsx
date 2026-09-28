"use client";

import { usePathname } from "next/navigation";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Preloader } from "@/components/loading/Preloader";

/** Public-site extras (intro preloader + analytics) — skipped inside the admin panel. */
export function SiteChrome({ name, title }: { name: string; title: string }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <Preloader name={name} title={title} />
      <PageViewTracker />
    </>
  );
}
