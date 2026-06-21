"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/** Surface with a gold radial glow that follows the cursor (no tilt). */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - rect.top}px`,
    );
  }

  return (
    <div onMouseMove={handleMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
