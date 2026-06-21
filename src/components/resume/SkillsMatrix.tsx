import { resume } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { SkillCard } from "@/components/skills/SkillCard";

export function SkillsMatrix() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {resume.skills.map((skill, index) => (
        <Reveal key={skill.name} delay={(index % 3) * 0.05}>
          <SkillCard skill={skill} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
