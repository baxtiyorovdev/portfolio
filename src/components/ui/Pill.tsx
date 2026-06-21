import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function Pill({ children, icon, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
