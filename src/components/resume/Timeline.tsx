"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { educationTimeline } from "@/lib/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: root.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: true,
          },
        },
      );

      gsap.from("[data-tl-item]", {
        opacity: 0,
        x: -24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className="relative">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      <div
        ref={progress}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top"
        style={{ background: "var(--grad-gold)" }}
      />

      <ul className="space-y-6">
        {educationTimeline.map((item) => (
          <li key={item.id} data-tl-item className="relative pl-10">
            <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-[3px] border-background bg-accent shadow-glow" />
            <div className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold leading-tight">{item.place}</h3>
                <span className="font-mono text-xs text-accent">
                  {item.period}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{item.degree}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
