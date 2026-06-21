import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          <span className="h-px w-6 bg-accent/60" aria-hidden />
          {kicker}
        </span>
      )}
      <h2
        id={id}
        className="max-w-3xl text-balance text-3xl font-semibold leading-[1.05] sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
