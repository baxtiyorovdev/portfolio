"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
  /** Gap between items (px). Also trails each copy so the loop is seamless. */
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Infinite GSAP loop over two copies of `children`. Translating the track by
 * exactly -50% lands copy B where copy A started, so there is no visible seam.
 * Hover / focus eases the loop to a stop rather than freezing it abruptly.
 * With reduced motion the loop never starts and the strip becomes scrollable.
 */
export function Marquee({
  children,
  duration = 30,
  direction = "left",
  gap = 8,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const vertical = direction === "up" || direction === "down";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, (context) => {
        const axis = vertical ? "yPercent" : "xPercent";
        const forward = direction === "left" || direction === "up";
        const loop = gsap.fromTo(
          track.current,
          { [axis]: forward ? 0 : -50 },
          { [axis]: forward ? -50 : 0, duration, ease: "none", repeat: -1 },
        );

        const el = root.current;
        if (!pauseOnHover || !el) return;

        // Named add() returns a context-safe wrapper (the unnamed form runs immediately).
        // Ease down to a crawl, then truly pause — a timeScale of exactly 0 leaves
        // the playhead in a state that later timeScale tweens don't recover from.
        const pause = context.add("slowDown", () => {
          gsap.to(loop, {
            timeScale: 0.05,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => void loop.pause(),
          });
        }) as EventListener;
        const play = context.add("speedUp", () => {
          loop.resume();
          gsap.to(loop, { timeScale: 1, duration: 0.6, ease: "power2.in", overwrite: true });
        }) as EventListener;

        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", play);
        el.addEventListener("focusin", pause);
        el.addEventListener("focusout", play);

        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", play);
          el.removeEventListener("focusin", pause);
          el.removeEventListener("focusout", play);
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [direction, duration, pauseOnHover, vertical] },
  );

  const copyStyle = vertical ? { gap, paddingBottom: gap } : { gap, paddingRight: gap };

  return (
    <div
      ref={root}
      className={cn(
        "relative overflow-hidden",
        vertical ? "motion-reduce:overflow-y-auto" : "motion-reduce:overflow-x-auto",
        className,
      )}
    >
      <div
        ref={track}
        className={cn("flex will-change-transform", vertical ? "w-full flex-col" : "w-max")}
      >
        <div className={cn("flex shrink-0", vertical && "flex-col")} style={copyStyle}>
          {children}
        </div>
        <div
          aria-hidden
          inert
          className={cn("flex shrink-0 motion-reduce:hidden", vertical && "flex-col")}
          style={copyStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
