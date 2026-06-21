import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GradientBorderProps = {
  children: ReactNode;
  className?: string;
};

/** Wraps content in an animated gold gradient ring (see `.gradient-border`). */
export function GradientBorder({ children, className }: GradientBorderProps) {
  return <div className={cn("gradient-border", className)}>{children}</div>;
}
