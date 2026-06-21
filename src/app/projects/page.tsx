import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  projectsCollectionSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Frontend and full-stack projects by Baxtiyorov Shaxriyor — live demos, source code and detailed case previews.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <JsonLd data={projectsCollectionSchema} />
      <Section className="pt-32 sm:pt-40" ariaLabelledby="projects-heading">
      <SectionHeading
        id="projects-heading"
        kicker="Portfolio"
        title={
          <>
            Things I&apos;ve <span className="gradient-text">built</span>.
          </>
        }
        description="A selection of frontend and full-stack work. Tap any card for the gallery, stack and links."
      />
      <div className="mt-12">
        <ProjectsView />
      </div>
      </Section>
    </>
  );
}
