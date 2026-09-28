"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiCloseLine, RiExternalLinkLine, RiGithubFill, RiLockFill } from "react-icons/ri";
import type { Project } from "@/types";
import { getProjectCategory, getProjectGallery } from "@/lib/portfolio";
import { gsap, useGSAP, MOTION_REDUCED } from "@/lib/gsap";
import { Chip, PrimaryButton } from "@/components/bento/Primitives";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href],button:not([disabled]),input,textarea,[tabindex]:not([tabindex="-1"])';

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const gallery = getProjectGallery(project);
  const [active, setActive] = useState(gallery[0]);
  const root = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);

  // Open: fade the backdrop, lift the panel. Close plays it in reverse, then unmounts.
  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo("[data-backdrop]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power1.out" })
        .fromTo(
          dialogRef.current,
          { autoAlpha: 0, y: 36, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" },
          "<0.05",
        )
        .from("[data-modal-item]", { autoAlpha: 0, y: 12, stagger: 0.05, duration: 0.35, ease: "power2.out" }, "<0.15");

      // Hidden elements can't take focus, so move focus in once the panel is visible.
      const focusFirst = () => dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
      tl.call(focusFirst, undefined, 0.12);

      if (window.matchMedia(MOTION_REDUCED).matches) {
        tl.progress(1);
        focusFirst();
      }
      timeline.current = tl;
    },
    { scope: root },
  );

  const requestClose = contextSafe(() => {
    const tl = timeline.current;
    if (closing.current) return;
    closing.current = true;
    if (!tl || window.matchMedia(MOTION_REDUCED).matches) {
      onClose();
      return;
    }
    tl.eventCallback("onReverseComplete", onClose);
    tl.timeScale(1.8).reverse();
  });

  // Keep the latest close handler reachable from the mount-only effect below.
  const closeRef = useRef(requestClose);
  useEffect(() => {
    closeRef.current = requestClose;
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
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
  }, []);

  return createPortal(
    <div
      ref={root}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 lg:p-10"
      onClick={requestClose}
    >
      <div data-backdrop className="invisible absolute inset-0 bg-black/75 backdrop-blur-md" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="invisible relative grid max-h-[90dvh] w-full max-w-5xl grid-rows-[auto_1fr] overflow-hidden rounded-card border border-white/[0.08] bg-card shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] lg:grid-cols-[1.25fr_0.75fr] lg:grid-rows-1"
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid size-10 cursor-pointer place-items-center rounded-tile bg-icon text-soft transition-colors hover:bg-primary hover:text-white"
        >
          <RiCloseLine aria-hidden className="size-5" />
        </button>

        <div className="flex flex-col gap-3 overflow-y-auto p-3 sm:p-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] bg-surface">
            <Image
              src={active}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain"
            />
          </div>

          {gallery.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {gallery.map((image, index) => (
                <button
                  key={`${project.id}-${index}`}
                  type="button"
                  onClick={() => setActive(image)}
                  aria-label={`Preview ${index + 1}`}
                  aria-pressed={active === image}
                  className={cn(
                    "relative h-16 w-24 cursor-pointer overflow-hidden rounded-[10px] ring-2 transition",
                    active === image ? "ring-primary" : "ring-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={image} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 overflow-y-auto border-t border-line p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div data-modal-item className="flex items-center gap-2 pr-12">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {getProjectCategory(project)}
            </span>
            {project.private && (
              <Chip icon={RiLockFill} tone="surface" className="px-2 py-1 text-xs">
                Private
              </Chip>
            )}
          </div>

          <h2 data-modal-item id="project-modal-title" className="text-2xl font-semibold leading-tight text-fg sm:text-[28px]">
            {project.title}
          </h2>

          <p data-modal-item className="text-sm font-medium leading-relaxed text-muted">
            {project.details || project.description}
          </p>

          <ul data-modal-item className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Chip tone="surface" className="px-2.5 py-1 text-xs">{tech}</Chip>
              </li>
            ))}
          </ul>

          <div data-modal-item className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.link ? (
              <PrimaryButton href={project.link}>
                Open live <RiExternalLinkLine aria-hidden className="size-4" />
              </PrimaryButton>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-tile bg-button px-5 py-[13px] text-sm font-medium text-faint">
                <RiLockFill aria-hidden className="size-4" /> Live unavailable
              </span>
            )}

            {project.github && !project.private ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-tile bg-button px-5 py-[13px] text-sm font-medium text-soft transition-colors hover:bg-button-hover hover:text-fg"
              >
                <RiGithubFill aria-hidden className="size-[18px] text-primary" /> Source
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-tile bg-button px-5 py-[13px] text-sm font-medium text-faint">
                <RiLockFill aria-hidden className="size-4" /> Private source
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
