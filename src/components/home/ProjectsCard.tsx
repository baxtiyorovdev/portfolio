import Image from "next/image";
import { RiBriefcase4Fill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { Marquee } from "@/components/bento/Marquee";
import { PrimaryButton } from "@/components/bento/Primitives";
import { projects } from "@/lib/portfolio";

/** "Works Gallery": a drifting strip of project covers under a CTA (Figma Component 5). */
export function ProjectsCard() {
  return (
    <BentoCard
      area="projects"
      aria-labelledby="works-title"
      className="gap-[30px] overflow-hidden px-5 pb-[18px] pt-5"
    >
      <CardHeader icon={RiBriefcase4Fill} label="Projects" title="Works Gallery" id="works-title" />

      <div className="mt-auto flex flex-col items-center">
        <Marquee duration={32} gap={10} className="-mx-5 w-[calc(100%+40px)]">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative h-20 w-[126px] shrink-0 overflow-hidden rounded-[10px] bg-tile"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="126px"
                priority={index < 3}
                className="object-cover"
              />
            </div>
          ))}
        </Marquee>

        <PrimaryButton href="/projects" className="relative z-10 -mt-6">
          View Works
        </PrimaryButton>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[105px] bg-gradient-to-t from-[#0d0d0d] to-transparent"
      />
    </BentoCard>
  );
}
