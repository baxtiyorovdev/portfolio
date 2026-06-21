"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's reduced-motion preference so JS-driven animation
 * (GSAP / Framer) can be gated to match the CSS `prefers-reduced-motion` rules.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
