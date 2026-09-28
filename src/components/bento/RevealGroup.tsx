"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK, MOTION_REDUCED } from "@/lib/gsap";
import { isCrawler, whenIntroReady } from "@/lib/intro";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /**
   * "intro": every [data-reveal] card staggers in on load (home grid).
   * "scroll": cards reveal in batches as they enter the viewport (sub-pages).
   */
  mode?: "intro" | "scroll";
};

/**
 * Reveals every `[data-reveal]` descendant. The CSS keeps them hidden only
 * when JS is running (html.js), so no-JS visitors still see everything.
 */
export function RevealGroup({ children, className, mode = "scroll" }: RevealGroupProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isCrawler()) return; // cards are already visible (no html.js)
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, (context) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        // Entrances wait for the first-visit preloader's curtain (see lib/intro).
        if (mode === "intro") {
          const intro = gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 28, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: { each: 0.07, from: "start" },
              clearProps: "transform",
              paused: true,
            },
          );
          return whenIntroReady(() => intro.play());
        }

        gsap.set(cards, { autoAlpha: 0, y: 32 });
        const startBatches = context.add("startBatches", () => {
          ScrollTrigger.batch(cards, {
            // Measured from the viewport bottom so the last card (the footer) can
            // always cross it, even at maximum scroll.
            start: "top bottom-=24",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
                clearProps: "transform",
              }),
          });
        }) as () => void;
        return whenIntroReady(startBatches);
      });

      mm.add(MOTION_REDUCED, () => {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [mode] },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
