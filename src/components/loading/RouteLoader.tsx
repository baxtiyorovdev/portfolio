"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { MiniBento } from "./MiniBento";

/**
 * Route-level loading screen: a wave rolls across the mini bento while an
 * indeterminate bar sweeps underneath. It fades in after a short delay so
 * near-instant navigations never flash it.
 */
export function RouteLoader({ label = "Loading" }: { label?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        gsap.from(root.current, { autoAlpha: 0, y: 8, duration: 0.4, delay: 0.25, ease: "power2.out" });

        const wave = gsap.timeline({ repeat: -1, repeatDelay: 0.15, defaults: { duration: 0.45 } });
        wave
          .fromTo(
            "[data-tile]",
            { autoAlpha: 0.25, scale: 0.9 },
            { autoAlpha: 1, scale: 1, ease: "power2.out", stagger: { each: 0.06, from: "start" } },
          )
          .to(
            "[data-tile]",
            { autoAlpha: 0.25, scale: 0.9, ease: "power2.in", stagger: { each: 0.06, from: "start" } },
            "+=0.2",
          );

        gsap.fromTo(
          "[data-accent]",
          { boxShadow: "0 0 0 0 rgb(145 108 231 / 0.6)" },
          { boxShadow: "0 0 0 6px rgb(145 108 231 / 0)", duration: 1.2, repeat: -1, ease: "power1.out" },
        );

        gsap.fromTo("[data-sweep]", { xPercent: -100 }, { xPercent: 250, duration: 1.1, repeat: -1, ease: "power2.inOut" });

        gsap.to("[data-dot]", {
          autoAlpha: 0.2,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.15,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="grid min-h-dvh place-items-center px-6" role="status" aria-live="polite">
      <div ref={root} className="flex w-[min(220px,70vw)] flex-col items-center gap-6">
        <MiniBento className="w-full" />
        <div className="flex w-full flex-col items-center gap-3">
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-icon">
            <span
              data-sweep
              className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            {label}
            <span aria-hidden>
              <span data-dot>.</span>
              <span data-dot>.</span>
              <span data-dot>.</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
