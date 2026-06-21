import { portfolioData } from "@/data/portfolioData";
import type { Project } from "@/types";

export const portfolio = portfolioData;
export const { about, resume, projects } = portfolioData;

/** Featured subset shown on the home page. */
export const featuredProjects = projects.slice(0, 3);

/** Human label for a project, derived from its tech + visibility. */
export function getProjectCategory(project: Project): string {
  const tech = project.technologies.map((t) => t.toLowerCase());

  if (project.private) return "Private project";
  if (tech.some((t) => t.includes("next") || t.includes("react")))
    return "Web development";
  if (tech.some((t) => t.includes("prisma") || t.includes("postgresql")))
    return "Full stack project";
  return "Frontend project";
}

/** Always returns a non-empty gallery (falls back to the cover image). */
export function getProjectGallery(project: Project): string[] {
  return project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];
}

/** Maps a qualitative skill level to a meter percentage. */
export function skillLevelToPercent(level: string): number {
  switch (level) {
    case "Advanced":
      return 92;
    case "Intermediate":
      return 72;
    default:
      return 45;
  }
}

/** Merged, ordered education list (general schooling + developer courses). */
export const educationTimeline = [
  ...resume.education,
  ...resume.developer_education,
];

/** Contact map configuration (Google Maps embed). */
export const contactConfig = {
  lat: 38.859861,
  lng: 65.80325,
  coordsLabel: `38°51'35.5"N 65°48'11.7"E`,
};
