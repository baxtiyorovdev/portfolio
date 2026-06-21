import { FiArrowRight } from "react-icons/fi";
import { resume } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SkillCard } from "@/components/skills/SkillCard";

export function SkillsShowcase() {
  const skills = resume.skills.slice(0, 6);

  return (
    <Section ariaLabelledby="skills-heading">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="skills-heading"
          kicker="Capabilities"
          title={
            <>
              The stack I <span className="gradient-text">work with</span>.
            </>
          }
          description="A focused toolkit for building modern, responsive front-ends."
        />
        <Button
          href="/resume"
          variant="ghost"
          iconRight={<FiArrowRight />}
          className="self-start sm:self-auto"
        >
          Full resume
        </Button>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <Reveal key={skill.name} delay={index * 0.05}>
            <SkillCard skill={skill} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
