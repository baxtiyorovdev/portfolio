import Image from "next/image";
import { RiArrowRightUpLine, RiLockFill } from "react-icons/ri";
import type { Project } from "@/types";
import { getProjectCategory } from "@/lib/portfolio";
import { Chip } from "@/components/bento/Primitives";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  priority?: boolean;
};

export function ProjectCard({ project, onOpen, priority }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title} details`}
      className="group flex h-full w-full cursor-pointer flex-col gap-4 rounded-card border border-white/5 bg-card p-3 text-left transition-colors duration-300 hover:border-white/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-tile">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-tile bg-primary text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <RiArrowRightUpLine aria-hidden className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-2 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {getProjectCategory(project)}
          </span>
          {project.private && (
            <Chip icon={RiLockFill} tone="surface" className="px-2 py-1 text-xs">
              Private
            </Chip>
          )}
        </div>
        <h2 className="text-lg font-semibold leading-tight text-fg">{project.title}</h2>
        <p className="line-clamp-2 text-[13px] font-medium leading-relaxed text-muted">
          {project.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>
              <Chip tone="surface" className="px-2.5 py-1 text-xs">{tech}</Chip>
            </li>
          ))}
          {project.technologies.length > 4 && (
            <li>
              <Chip tone="surface" className="px-2.5 py-1 text-xs">
                +{project.technologies.length - 4}
              </Chip>
            </li>
          )}
        </ul>
      </div>
    </button>
  );
}
