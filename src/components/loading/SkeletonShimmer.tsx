"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Skeleton block; the shimmer highlight is a background gradient GSAP sweeps. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      data-skeleton
      className={cn(
        "block rounded-tile bg-[linear-gradient(100deg,#191919_35%,#262626_50%,#191919_65%)] bg-[length:250%_100%] bg-[position:100%_0]",
        className,
      )}
    />
  );
}

/**
 * Wraps a skeleton layout: cards stagger in, then a highlight sweeps across
 * every block with a small offset per block, so it reads as one diagonal wave.
 */
export function SkeletonShimmer({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from("[data-skeleton-card]", {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        });

        gsap.fromTo(
          "[data-skeleton]",
          { backgroundPosition: "100% 0" },
          {
            backgroundPosition: "-50% 0",
            duration: 1.6,
            ease: "power1.inOut",
            stagger: { each: 0.04, repeat: -1, repeatDelay: 0.3 },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} role="status" aria-label="Loading" className={className}>
      {children}
    </div>
  );
}
