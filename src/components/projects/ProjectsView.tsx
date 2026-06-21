"use client";

import { useMemo, useState } from "react";
import { getProjectCategory, projects } from "@/lib/portfolio";
import { ProjectGallery } from "./ProjectGallery";
import { cn } from "@/lib/utils";

export function ProjectsView() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map(getProjectCategory)))],
    [],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => getProjectCategory(project) === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                isActive
                  ? "border-transparent text-on-accent shadow-glow"
                  : "border-border text-muted hover:border-accent/40 hover:text-foreground",
              )}
              style={isActive ? { backgroundImage: "var(--grad-gold)" } : undefined}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <ProjectGallery key={active} projects={filtered} />
      </div>
    </div>
  );
}
