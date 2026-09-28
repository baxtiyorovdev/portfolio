"use client";

import { useId, useState } from "react";
import type { IconType } from "react-icons";
import {
  RiBugLine,
  RiCodeBoxLine,
  RiRocketLine,
  RiRouteLine,
  RiSearchEyeLine,
} from "react-icons/ri";
import { IconTile } from "@/components/bento/Primitives";
import type { ProcessIcon, ProcessStep } from "@/types";
import { cn } from "@/lib/utils";

const ICONS: Record<ProcessIcon, IconType> = {
  discover: RiSearchEyeLine,
  plan: RiRouteLine,
  build: RiCodeBoxLine,
  test: RiBugLine,
  launch: RiRocketLine,
};

/**
 * Workflow steps with the Figma "Frame 301" tooltip. Hover or keyboard focus
 * reveals it; tap toggles it for touch screens.
 */
export function ProcessList({ steps }: { steps: ProcessStep[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className="flex flex-1 flex-col justify-center gap-2 p-3">
      {steps.map((step, index) => {
        const tipId = `${baseId}-tip-${index}`;
        const isOpen = open === index;

        return (
          <li key={step.title} className="group/step relative">
            <button
              type="button"
              aria-describedby={tipId}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
              onMouseLeave={() => setOpen(null)}
              onBlur={() => setOpen(null)}
              className="group flex h-[46px] w-full cursor-pointer items-center gap-1.5 rounded-tile border-[0.8px] border-white/[0.02] bg-tile p-[7px] text-left transition-colors duration-300 hover:bg-[#1e1e1e]"
            >
              <IconTile
                icon={ICONS[step.icon]}
                iconClassName="size-4"
                className="group-hover:text-primary group-focus-visible:text-primary"
              />
              <span className="text-sm font-medium text-soft transition-colors group-hover:text-fg">
                {step.title}
              </span>
              <span className="ml-auto pr-1.5 text-[11px] font-semibold tabular-nums text-[#555] transition-colors group-hover:text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>

            {/* Outer span positions (above the row; left of it on the wide grid,
                where the card hugs the right edge). Inner span animates. */}
            <span
              className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 -translate-x-1/2 wide:bottom-auto wide:left-auto wide:right-[calc(100%+20px)] wide:top-1/2 wide:translate-x-0 wide:-translate-y-1/2"
            >
              <span
                id={tipId}
                role="tooltip"
                className={cn(
                  "flex w-[178px] translate-y-1 flex-col gap-[5px] rounded-tile bg-tile p-[15px] font-medium opacity-0 shadow-[0_4px_12px_rgb(0_0_0/0.45)] ring-1 ring-white/5 transition-all duration-300",
                  "group-hover/step:translate-y-0 group-hover/step:opacity-100 group-has-[:focus-visible]/step:translate-y-0 group-has-[:focus-visible]/step:opacity-100",
                  isOpen && "translate-y-0 opacity-100",
                )}
              >
                <span className="text-sm text-soft">{step.title}</span>
                <span className="text-xs leading-4 text-faint">{step.description}</span>
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
