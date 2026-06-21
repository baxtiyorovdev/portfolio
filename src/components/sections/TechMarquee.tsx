import { resume } from "@/lib/portfolio";
import { Marquee } from "@/components/ui/Marquee";
import { SkillIcon } from "@/components/skills/SkillIcon";

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border py-6">
      <Marquee>
        {resume.skills.map((skill) => (
          <span
            key={skill.name}
            className="flex items-center gap-2.5 rounded-full border border-border bg-surface-2/40 px-5 py-2.5 text-sm text-muted"
          >
            <span className="text-lg text-accent">
              <SkillIcon name={skill.name} />
            </span>
            {skill.name}
          </span>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
