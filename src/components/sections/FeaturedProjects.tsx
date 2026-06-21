import { FiArrowRight } from "react-icons/fi";
import { featuredProjects } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function FeaturedProjects() {
  return (
    <Section ariaLabelledby="work-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="work-heading"
          kicker="Selected work"
          title={
            <>
              Projects I&apos;m <span className="gradient-text">proud of</span>.
            </>
          }
          description="A few things I've designed and built recently."
        />
        <Button
          href="/projects"
          variant="ghost"
          iconRight={<FiArrowRight />}
          className="self-start sm:self-auto"
        >
          All projects
        </Button>
      </div>
      <div className="mt-12">
        <ProjectGallery projects={featuredProjects} />
      </div>
    </Section>
  );
}
