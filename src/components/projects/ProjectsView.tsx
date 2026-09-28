"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RiFilter3Line } from "react-icons/ri";
import type { Project } from "@/types";
import { getProjectCategory } from "@/lib/portfolio";
import { Flip, gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { isCrawler } from "@/lib/intro";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

// Loaded on demand — the modal only mounts when a project is opened.
const ProjectModal = dynamic(() =>
  import("./ProjectModal").then((mod) => mod.ProjectModal),
);

type FlipState = ReturnType<typeof Flip.getState>;

export function ProjectsView({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map(getProjectCategory)))],
    [projects],
  );
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<FlipState | null>(null);

  // Cards stagger in once on mount.
  useGSAP(
    () => {
      if (isCrawler()) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-project]", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
          clearProps: "transform,opacity,visibility",
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Filter changes animate from the captured layout (GSAP Flip).
  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.5, delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.3 }),
      });
    },
    { scope: root, dependencies: [active] },
  );

  function selectCategory(category: string) {
    if (category === active) return;
    flipState.current = Flip.getState(
      gsap.utils.toArray<HTMLElement>("[data-project]", root.current),
    );
    setActive(category);
  }

  return (
    <div ref={root} data-reveal className="flex flex-col gap-3">
      <div className="flex items-center gap-2 overflow-x-auto rounded-[16px] border border-white/5 bg-card p-2">
        <span className="hidden items-center gap-2 px-3 text-[13px] font-medium text-muted sm:flex">
          <RiFilter3Line aria-hidden className="size-4 text-primary" />
          Filter
        </span>
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              aria-pressed={isActive}
              className={cn(
                "min-h-[38px] shrink-0 cursor-pointer rounded-[10px] px-4 text-[13px] font-medium transition-colors duration-300",
                isActive
                  ? "bg-primary text-white"
                  : "bg-tile text-muted hover:bg-button-hover hover:text-fg",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const visible = active === "All" || getProjectCategory(project) === active;
          return (
            <li
              key={project.id}
              data-project
              data-flip-id={`project-${project.id}`}
              className={cn("h-full", !visible && "hidden")}
            >
              <ProjectCard project={project} onOpen={setSelected} priority={index < 3} />
            </li>
          );
        })}
      </ul>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
