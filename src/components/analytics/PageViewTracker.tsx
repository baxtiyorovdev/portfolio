"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends one beacon per page view to /api/track. Respects Do Not Track and
 * Global Privacy Control; the referrer is only sent for the landing page.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const isLanding = useRef(true);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    // Guards against the dev-mode double effect run for the same page.
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (nav.doNotTrack === "1" || nav.globalPrivacyControl) return;

    const body = JSON.stringify({
      path: pathname,
      referrer: isLanding.current ? document.referrer : "",
    });
    isLanding.current = false;

    const sent = navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/track", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
