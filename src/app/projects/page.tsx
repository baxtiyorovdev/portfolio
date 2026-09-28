import type { Metadata } from "next";
import { RiBriefcase4Fill, RiGithubFill } from "react-icons/ri";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { ActionButton } from "@/components/bento/Primitives";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolio } from "@/lib/content";
import { breadcrumbSchema, buildProjectsCollection } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Frontend and full-stack projects by Baxtiyorov Shaxriyor — live demos, source code and detailed case previews.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const data = await getPortfolio();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <JsonLd data={buildProjectsCollection(data)} />
      <PageShell>
        <PageHeader
          icon={RiBriefcase4Fill}
          label="Projects"
          title={
            <>
              Works <span className="text-primary">Gallery</span>
            </>
          }
          description="A selection of frontend and full-stack work. Open any card for the gallery, stack and links."
          actions={
            <ActionButton href={data.about.social.github} icon={RiGithubFill} className="px-6">
              More on GitHub
            </ActionButton>
          }
        />
        <ProjectsView projects={data.projects} />
      </PageShell>
    </>
  );
}
