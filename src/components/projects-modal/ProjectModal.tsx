import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaLock, FaTimes } from "react-icons/fa";
import type { Project } from "../../types";

type Props = {
  activeImage: string | null;
  category: string;
  gallery: string[];
  onClose: () => void;
  onImageSelect: (image: string) => void;
  project: Project;
};

export default function ProjectModal({
  activeImage,
  category,
  gallery,
  onClose,
  onImageSelect,
  project,
}: Props) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[1300] h-full w-full bg-smoky/70 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onClick={onClose}
    >
      <div className="h-full w-full" onClick={(event) => event.stopPropagation()}>
        <motion.div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-eerie1 shadow-card ring-1 ring-jet/40"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-glass-bg text-white2 shadow-soft transition hover:opacity-80"
          >
            <FaTimes />
          </button>

          <div className="grid h-full min-h-0 gap-6 overflow-auto p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl2 bg-glass-bg ring-1 ring-jet/40">
                <img
                  src={activeImage || gallery[0]}
                  alt={project.title}
                  className="h-full max-h-[46vh] w-full object-cover lg:max-h-[72vh]"
                />
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
              >
                {gallery.map((image, index) => (
                  <motion.button
                    key={`${project.id}-${index}`}
                    type="button"
                    onClick={() => onImageSelect(image)}
                    className={`overflow-hidden rounded-xl2 ring-1 transition ${
                      activeImage === image
                        ? "ring-accent"
                        : "ring-jet/40 hover:ring-accent/60"
                    }`}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                    />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            <div className="flex min-h-0 flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray70">
                  {category}
                </p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold leading-tight text-white2 sm:text-3xl">
                    {project.title}
                  </h3>
                  {project.private && (
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-jet/50 bg-glass-bg px-3 py-1 text-xs text-gray70">
                      <FaLock className="text-[10px]" />
                      Private
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-7 text-gray70 sm:text-base">
                  {project.details || project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className="rounded-full border border-jet/40 bg-glass-bg px-3 py-1 text-sm text-white2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-smoky shadow-soft transition hover:opacity-90"
                  >
                    Open live
                    <FaExternalLinkAlt className="text-[11px]" />
                  </a>
                ) : (
                  <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-5 py-3 text-sm font-medium text-gray70">
                    Live unavailable
                    <FaLock className="text-[11px]" />
                  </span>
                )}

                {project.github && !project.private ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-5 py-3 text-sm font-medium text-white2 transition hover:bg-eerie2/80"
                  >
                    Open code
                    <FaGithub />
                  </a>
                ) : (
                  <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-jet/50 bg-glass-bg px-5 py-3 text-sm font-medium text-gray70">
                    Code unavailable
                    <FaLock className="text-[11px]" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}
