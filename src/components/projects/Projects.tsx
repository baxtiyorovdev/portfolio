import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaLock,
} from "react-icons/fa";
import ProjectModal from "../projects-modal/ProjectModal";
import SectionTitle from "../ui/SectionTitle";
import type { Project } from "../../types";

type Props = {
  projects: Project[];
  showPreview?: boolean;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function getVisibleProjects(projects: Project[], showPreview?: boolean) {
  return projects.slice(0, showPreview ? 3 : projects.length);
}

function getProjectCategory(project: Project) {
  const tech = project.technologies.map((item) => item.toLowerCase());

  if (project.private) {
    return "Private project";
  }

  if (tech.some((item) => item.includes("next") || item.includes("react"))) {
    return "Web development";
  }

  if (
    tech.some((item) => item.includes("prisma") || item.includes("postgresql"))
  ) {
    return "Full stack project";
  }

  return "Frontend project";
}

function getProjectGallery(project: Project) {
  return project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];
}

export default function Projects({ projects, showPreview }: Props) {
  const visibleProjects = getVisibleProjects(projects, showPreview);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const modalGallery = selectedProject
    ? getProjectGallery(selectedProject)
    : [];

  return (
    <>
      <motion.div
        className="text-white2 mb-8"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item}>
          <SectionTitle title="Projects" className="mb-4 text-3xl font-bold" />
        </motion.div>
        <motion.div
          className="flex flex-wrap items-start gap-4 sm:gap-5 lg:gap-6"
          variants={container}
        >
          {visibleProjects.map((project) => (
            <motion.article
              key={project.id}
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="group basis-full overflow-hidden sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(50%-0.75rem)]"
            >
              <motion.button
                type="button"
                onClick={() => {
                  setSelectedProject(project);
                  setActiveImage(getProjectGallery(project)[0]);
                }}
                className="block w-full text-left"
                whileTap={{ scale: 0.985 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl2 bg-eerie1 shadow-soft ring-1 ring-jet/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-x-0 bottom-4 z-10 flex translate-y-3 items-center justify-center gap-2 px-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-smoky shadow-soft transition hover:opacity-90"
                      >
                        Live
                        <FaExternalLinkAlt className="text-[11px]" />
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-4 py-2 text-sm font-medium text-gray70 backdrop-blur-md">
                        Live
                        <FaExternalLinkAlt className="text-[11px]" />
                      </span>
                    )}

                    {project.github && !project.private ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-4 py-2 text-sm font-medium text-white2 backdrop-blur-md transition hover:bg-eerie2/80"
                      >
                        Code
                        <FaGithub />
                      </a>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-4 py-2 text-sm font-medium text-gray70 backdrop-blur-md">
                        Code
                        <FaLock className="text-[11px]" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-1 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 text-lg font-semibold leading-tight tracking-tight sm:text-xl lg:text-2xl">
                      {project.title}
                    </h3>
                    {project.private && (
                      <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-xs text-gray70">
                        <FaLock className="text-[10px]" />
                        Private
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-tight text-gray70 sm:text-base">
                    {getProjectCategory(project)}
                  </p>
                </div>
              </motion.button>
            </motion.article>
          ))}

          {showPreview && projects.length > visibleProjects.length && (
            <motion.div
              className="basis-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(50%-0.75rem)]"
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <motion.div whileTap={{ scale: 0.985 }}>
                <Link
                to="/projects"
                className="group flex min-h-55 h-full flex-col justify-between rounded-xl2 bg-glass-bg p-6 shadow-soft ring-1 ring-jet/40 transition duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray70">
                      More work
                    </p>
                    <h3 className="text-2xl font-semibold leading-tight text-white2 sm:text-3xl">
                      View All Projects
                    </h3>
                    <p className="max-w-[22ch] text-sm leading-6 text-gray70 sm:text-base">
                      Open the full projects page and explore the rest of the
                      portfolio.
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-accent">
                    <span className="text-sm font-medium sm:text-base">
                      Browse all
                    </span>
                    <motion.span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-smoky shadow-soft"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaArrowRight />
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            activeImage={activeImage}
            category={getProjectCategory(selectedProject)}
            gallery={modalGallery}
            onClose={() => {
              setSelectedProject(null);
              setActiveImage(null);
            }}
            onImageSelect={setActiveImage}
            project={selectedProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}
