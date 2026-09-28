import type { IconType } from "react-icons";
import { RiCodeSSlashFill, RiFlagFill, RiShieldStarFill } from "react-icons/ri";
import { BentoCard } from "@/components/bento/BentoCard";
import { Odometer } from "@/components/bento/Odometer";
import { cn } from "@/lib/utils";

type Stat = { value: number; label: string; short: string; icon: IconType };

type Stats = { projects: number; technologies: number; years: number };

/** Three rolling-counter tiles (Figma Components 27 / 29 / 31). */
export function StatsRow({ stats, area, className }: { stats: Stats; area?: string; className?: string }) {
  const items: Stat[] = [
    { value: stats.projects, label: "Projects", short: "Projects", icon: RiFlagFill },
    { value: stats.technologies, label: "Technologies", short: "Skills", icon: RiCodeSSlashFill },
    { value: stats.years, label: "Years Coding", short: "Years", icon: RiShieldStarFill },
  ];

  return (
    <div
      style={area ? { gridArea: area } : undefined}
      className={cn("grid min-w-0 grid-cols-3 gap-3", className)}
    >
      {items.map((stat, index) => (
        <BentoCard
          key={stat.label}
          as="div"
          className="min-h-[112px] items-center justify-between gap-3 rounded-[14px] px-2.5 pb-2.5 pt-5"
        >
          <Odometer
            value={stat.value}
            delay={0.5 + index * 0.15}
            className="text-[42px] sm:text-[55px]"
          />
          <span className="flex w-full items-center justify-center gap-2 rounded-full border-[0.5px] border-white/5 bg-surface px-2 py-1.5 text-[13px] font-medium text-soft">
            <stat.icon aria-hidden className="hidden size-3.5 shrink-0 text-primary sm:block" />
            <span className="truncate sm:hidden">{stat.short}</span>
            <span className="hidden truncate sm:inline">{stat.label}</span>
          </span>
        </BentoCard>
      ))}
    </div>
  );
}
