import { RiBookOpenFill, RiGraduationCapFill, RiRouteLine } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { Marquee } from "@/components/bento/Marquee";
import { educationTimeline, resume } from "@/lib/portfolio";
import type { Education } from "@/types";
import { cn } from "@/lib/utils";

// Object identity tells courses apart from schools (their ids overlap).
const courses = new Set<Education>(resume.developer_education);

function JourneyItem({ item, isCourse, offset }: { item: Education; isCourse: boolean; offset: boolean }) {
  const [title, ...rest] = item.place.split(",");
  const Icon = isCourse ? RiBookOpenFill : RiGraduationCapFill;

  return (
    <article
      className={cn(
        "flex w-[85%] flex-col gap-3 rounded-[15px] border border-line bg-surface p-3",
        offset ? "self-end" : "self-start",
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-[5px] bg-icon text-primary"
          >
            <Icon className="size-4" />
          </span>
          <div className="min-w-0 font-medium">
            <h3 className="text-sm text-soft">{title.trim()}</h3>
            <p className="text-xs text-faint">{rest.join(",").trim()}</p>
          </div>
        </div>
        <p className="shrink-0 whitespace-nowrap text-xs font-medium text-faint">{item.period}</p>
      </div>
      <p className="text-xs font-medium leading-relaxed text-faint">
        {isCourse ? "Developer course" : "General education"} · {item.degree}
      </p>
    </article>
  );
}

/**
 * Education journey in the shape of the Figma "Reviews Showcase": staggered
 * cards drifting upward, fading out at both edges.
 */
export function JourneyCard() {
  // Newest first, like a feed.
  const items = [...educationTimeline].reverse();

  return (
    <BentoCard
      area="journey"
      aria-labelledby="journey-title"
      className="overflow-hidden border-white/[0.06] pt-2.5"
    >
      <CardHeader bordered icon={RiRouteLine} label="Journey" title="Education Timeline" id="journey-title" />
      <Marquee
        direction="up"
        duration={26}
        gap={12}
        className="fade-y h-[300px] px-3 pt-1.5 wide:h-0 wide:min-h-0 wide:flex-1"
      >
        {items.map((item, index) => (
          <JourneyItem
            key={`${item.id}-${item.place}`}
            item={item}
            isCourse={courses.has(item)}
            offset={index % 2 === 1}
          />
        ))}
      </Marquee>
    </BentoCard>
  );
}
