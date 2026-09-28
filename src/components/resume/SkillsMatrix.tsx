"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { isCrawler } from "@/lib/intro";
import { skillLevelToPercent } from "@/lib/portfolio";
import type { Skill } from "@/types";
import { getTech } from "@/lib/tech";
import { IconTile } from "@/components/bento/Primitives";

/** Skill tiles with level meters that fill when the grid scrolls into view. */
export function SkillsMatrix({ skills }: { skills: Skill[] }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (isCrawler()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-meter]", {
          scaleX: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3 xl:grid-cols-5">
      {skills.map((skill) => {
        const percent = skillLevelToPercent(skill.level);
        return (
          <li key={skill.name} className="flex flex-col gap-3 rounded-tile bg-tile p-[7px] pb-3">
            <div className="flex items-center justify-between gap-2 pr-1.5">
              <span className="flex items-center gap-1.5">
                <IconTile icon={getTech(skill.name).icon} iconClassName="size-4" />
                <span className="text-sm font-medium text-soft">{skill.name}</span>
              </span>
              <span className="text-xs font-medium text-faint">{skill.level}</span>
            </div>
            <div
              role="meter"
              aria-label={`${skill.name} proficiency`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              aria-valuetext={skill.level}
              className="mx-1.5 h-1.5 overflow-hidden rounded-full bg-icon"
            >
              <div
                data-meter
                className="h-full origin-left rounded-full bg-gradient-to-r from-primary/70 to-primary"
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
