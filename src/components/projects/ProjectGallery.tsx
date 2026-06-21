"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Loaded on demand — the modal only mounts when a project is opened.
const ProjectModal = dynamic(() =>
  import("./ProjectModal").then((mod) => mod.ProjectModal),
);

type ProjectGalleryProps = {
  projects: Project[];
  className?: string;
};

export function ProjectGallery({ projects, className }: ProjectGalleryProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <motion.div
        className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((project, index) => (
          <motion.div key={project.id} variants={staggerItem} className="h-full">
            <ProjectCard
              project={project}
              onOpen={setSelected}
              priority={index < 2}
            />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
