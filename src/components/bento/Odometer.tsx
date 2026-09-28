"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from "@/lib/gsap";
import { isCrawler, whenIntroReady } from "@/lib/intro";

const pad = (n: number) => String(n).padStart(2, "0");

// Figma geometry at 55px type: 42px window/line, 10px gap. Expressed in em so
// the component can be resized with font-size alone.
const LINE = 42 / 55;
const GAP = 10 / 55;

/**
 * Rolling counter from the Figma stat tiles: a column of numbers (value → 01)
 * pinned to the bottom of a one-line window, rolled down so the value lands in
 * view. Because line and gap are both em-based, the roll distance as a
 * percentage of the column is the same at every font size.
 */
export function Odometer({
  value,
  delay = 0,
  className,
}: {
  value: number;
  delay?: number;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const column = useRef<HTMLSpanElement>(null);
  const count = Math.max(value, 1);
  const numbers = Array.from({ length: count }, (_, i) => count - i);
  const rollPercent =
    ((count - 1) * (LINE + GAP)) / (count * LINE + (count - 1) * GAP) * 100;

  useGSAP(
    () => {
      if (isCrawler()) {
        gsap.set(column.current, { yPercent: rollPercent });
        return;
      }
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, (context) => {
        // Roll only once the preloader (if any) has handed over to the page.
        const roll = context.add("roll", () => {
          gsap.to(column.current, {
            yPercent: rollPercent,
            duration: 1.4 + Math.min(count, 20) * 0.05,
            delay,
            ease: "power3.inOut",
            scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
          });
        }) as () => void;
        return whenIntroReady(roll);
      });
      mm.add(MOTION_REDUCED, () => {
        gsap.set(column.current, { yPercent: rollPercent });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [rollPercent, delay] },
  );

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "flex-start" }}>
      <span className="sr-only">{value}+</span>
      <span
        ref={root}
        aria-hidden
        className="relative block overflow-hidden font-medium tabular-nums tracking-[-0.02em]"
        style={{ height: `${LINE}em`, lineHeight: `${LINE}em` }}
      >
        <span
          ref={column}
          className="absolute inset-x-0 bottom-0 flex flex-col items-center text-muted will-change-transform"
          style={{ gap: `${GAP}em` }}
        >
          {numbers.map((n) => (
            <span key={n} className="block" style={{ height: `${LINE}em` }}>
              {pad(n)}
            </span>
          ))}
        </span>
        {/* Invisible sizer keeps the window as wide as the widest number. */}
        <span className="invisible block">{pad(count)}</span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-card" />
      </span>
      <span
        aria-hidden
        className="ml-[0.05em] font-medium text-primary"
        style={{ fontSize: "0.64em", lineHeight: `${LINE / 0.64}em` }}
      >
        +
      </span>
    </span>
  );
}
