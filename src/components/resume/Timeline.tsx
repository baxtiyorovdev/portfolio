"use client";

import { useRef } from "react";
import { RiBookOpenFill, RiGraduationCapFill } from "react-icons/ri";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { educationTimeline, resume } from "@/lib/portfolio";
import type { Education } from "@/types";

const courses = new Set<Education>(resume.developer_education);

/** Vertical education timeline; the violet rail fills as you scroll through it. */
export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
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
              end: "bottom 60%",
              scrub: 0.6,
            },
          },
        );

        gsap.from("[data-tl-item]", {
          autoAlpha: 0,
          x: -20,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative p-3 sm:p-4">
      <div className="absolute bottom-8 left-[33px] top-8 w-px bg-line sm:left-[37px]" />
      <div
        ref={progress}
        className="absolute bottom-8 left-[33px] top-8 w-px origin-top bg-primary sm:left-[37px]"
      />

      <ol className="flex flex-col gap-2">
        {[...educationTimeline].reverse().map((item) => {
          const Icon = courses.has(item) ? RiBookOpenFill : RiGraduationCapFill;
          const [title, ...rest] = item.place.split(",");
          return (
            <li
              key={`${item.id}-${item.place}`}
              data-tl-item
              className="relative flex items-center gap-3 rounded-tile bg-tile p-[7px] pr-4"
            >
              <span className="relative z-10 grid size-[35px] shrink-0 place-items-center rounded-[8px] bg-icon text-primary ring-4 ring-card">
                <Icon aria-hidden className="size-4" />
              </span>
              <div className="min-w-0 flex-1 py-1">
                <h3 className="text-sm font-semibold text-fg">{title.trim()}</h3>
                <p className="text-xs font-medium text-faint">
                  {[rest.join(",").trim(), item.degree].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span className="shrink-0 rounded-full border-[0.5px] border-white/5 bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                {item.period}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
