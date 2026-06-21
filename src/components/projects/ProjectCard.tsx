"use client";

import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaLock } from "react-icons/fa";
import type { Project } from "@/types";
import { getProjectCategory } from "@/lib/portfolio";
import { TiltCard } from "@/components/ui/TiltCard";
import { Pill } from "@/components/ui/Pill";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  priority?: boolean;
};

export function ProjectCard({ project, onOpen, priority }: ProjectCardProps) {
  const category = getProjectCategory(project);

  return (
    <TiltCard className="h-full" radius="1.75rem">
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} case study`}
        className="group glass relative flex h-full w-full flex-col overflow-hidden rounded-xl2 text-left"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/85">
              View case
            </span>
            <span className="flex gap-2">
              {project.link && (
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-on-accent">
                  <FaExternalLinkAlt className="text-xs" />
                </span>
              )}
              {project.github && !project.private && (
                <span className="glass-soft grid h-9 w-9 place-items-center rounded-full text-white">
                  <FaGithub />
                </span>
              )}
              {project.private && (
                <span className="glass-soft grid h-9 w-9 place-items-center rounded-full text-white">
                  <FaLock className="text-xs" />
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
              {category}
            </span>
            {project.private && (
              <Pill icon={<FaLock className="text-[0.6rem]" />}>Private</Pill>
            )}
          </div>

          <h3 className="text-xl font-semibold leading-tight">{project.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
            {project.technologies.length > 4 && (
              <Pill>+{project.technologies.length - 4}</Pill>
            )}
          </div>
        </div>
      </button>
    </TiltCard>
  );
}
