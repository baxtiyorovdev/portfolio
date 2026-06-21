import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
};

/** Consistent page section: centered max width + responsive rhythm. */
export function Section({ children, className, id, ariaLabelledby }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28", className)}
    >
      {children}
    </section>
  );
}
