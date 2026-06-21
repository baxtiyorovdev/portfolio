import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
};

/**
 * Seamless infinite marquee. The track holds two identical copies and shifts
 * by -50%, so the loop is continuous. Pure CSS (pauses on hover).
 */
export function Marquee({ children, reverse, className }: MarqueeProps) {
  const track = cn(
    "flex shrink-0 items-center gap-4 pr-4",
  );

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          "group-hover:[animation-play-state:paused] motion-reduce:animate-none",
        )}
      >
        <div className={track}>{children}</div>
        <div className={track} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
