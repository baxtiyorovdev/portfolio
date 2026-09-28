import type { About, PortfolioData, Project, Resume } from "@/types";

/*
 * Pure helpers over PortfolioData. Content itself is loaded on the server with
 * getPortfolio() (src/lib/content.ts) and passed down as props.
 */

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
export function getEducationTimeline(resume: Resume) {
  return [
    ...resume.education.map((item) => ({ ...item, kind: "school" as const })),
    ...resume.developer_education.map((item) => ({ ...item, kind: "course" as const })),
  ];
}

export type TimelineItem = ReturnType<typeof getEducationTimeline>[number];

/** Headline numbers for the rolling counters — all derived from real data. */
export function getStats(data: PortfolioData) {
  return {
    projects: data.projects.length,
    technologies: data.resume.skills.length,
    years: Number.parseInt(data.about.social.experience, 10) || 1,
  };
}

/**
 * Every distinct technology across skills and projects, in skill order first.
 * Case-insensitive so "Html" and "HTML" collapse into one entry.
 */
export function getAllTechnologies(data: PortfolioData): string[] {
  const seen = new Map<string, string>();
  const names = [
    ...data.resume.skills.map((skill) => skill.name),
    ...data.projects.flatMap((project) => project.technologies),
  ];
  for (const name of names) {
    const key = name.toLowerCase();
    if (!seen.has(key)) seen.set(key, name);
  }
  return [...seen.values()];
}

/** Short name of the latest developer course provider (e.g. "Open Web Academy"). */
export function getLatestSchool(resume: Resume): string {
  return (
    resume.developer_education.at(-1)?.place.split(",").at(-1)?.trim() ??
    resume.education.at(-1)?.place ??
    ""
  );
}

export const phoneHref = (about: About) => `tel:${about.social.phone.replace(/[^\d+]/g, "")}`;
export const emailHref = (about: About) => `mailto:${about.social.email}`;

/** Contact map configuration (Google Maps embed). */
export const contactConfig = {
  lat: 38.859861,
  lng: 65.80325,
  coordsLabel: `38°51'35.5"N 65°48'11.7"E`,
};
