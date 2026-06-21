"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";
import { skillLevelToPercent } from "@/lib/portfolio";
import { easeOutExpo } from "@/lib/motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SkillIcon } from "./SkillIcon";

export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const percent = skillLevelToPercent(skill.level);

  return (
    <SpotlightCard className="glass h-full rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-surface-2 text-xl text-accent">
          <SkillIcon name={skill.name} />
        </span>
        <div className="min-w-0">
          <p className="font-medium leading-tight">{skill.name}</p>
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
            {skill.level}
          </p>
        </div>
        <span className="ml-auto font-mono text-sm text-muted">{percent}%</span>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--grad-gold)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 + index * 0.05, ease: easeOutExpo }}
        />
      </div>
    </SpotlightCard>
  );
}
