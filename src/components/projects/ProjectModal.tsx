"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaLock, FaTimes } from "react-icons/fa";
import type { Project } from "@/types";
import { getProjectCategory, getProjectGallery } from "@/lib/portfolio";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const gallery = getProjectGallery(project);
  const category = getProjectCategory(project);
  const [active, setActive] = useState(gallery[0]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const node = dialogRef.current;
    const focusables = node?.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.32, ease: easeOutExpo }}
        className="glass relative grid max-h-[88vh] w-full max-w-5xl grid-rows-[auto_1fr] overflow-hidden rounded-xl3 lg:grid-cols-[1.25fr_0.75fr] lg:grid-rows-1"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="glass-soft absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full text-foreground transition hover:text-accent"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-2">
            <Image
              src={active}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {gallery.map((image, index) => (
                <button
                  key={`${project.id}-${index}`}
                  type="button"
                  onClick={() => setActive(image)}
                  aria-label={`Preview ${index + 1}`}
                  className={cn(
                    "relative h-16 w-24 overflow-hidden rounded-xl ring-1 transition",
                    active === image
                      ? "ring-accent"
                      : "ring-border hover:ring-accent/60",
                  )}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto border-t border-border p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent">
              {category}
            </span>
            {project.private && (
              <Pill icon={<FaLock className="text-[0.6rem]" />}>Private</Pill>
            )}
          </div>

          <h2
            id="project-modal-title"
            className="text-2xl font-semibold leading-tight sm:text-3xl"
          >
            {project.title}
          </h2>

          <p className="text-sm leading-relaxed text-muted">
            {project.details || project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Pill key={tech}>{tech}</Pill>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.link ? (
              <Button
                href={project.link}
                external
                size="sm"
                iconRight={<FaExternalLinkAlt className="text-[0.7rem]" />}
              >
                Open live
              </Button>
            ) : (
              <Button variant="secondary" size="sm" disabled icon={<FaLock className="text-xs" />}>
                Live unavailable
              </Button>
            )}

            {project.github && !project.private ? (
              <Button
                href={project.github}
                external
                variant="secondary"
                size="sm"
                icon={<FaGithub />}
              >
                Source
              </Button>
            ) : (
              <Button variant="secondary" size="sm" disabled icon={<FaLock className="text-xs" />}>
                Private source
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
