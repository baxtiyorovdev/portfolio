import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { RiArrowRightLine } from "react-icons/ri";
import { SmartLink } from "./SmartLink";
import { cn } from "@/lib/utils";

/** 35×35 dark square that holds a glyph (stack, social and process rows). */
export function IconTile({
  icon: Icon,
  className,
  iconClassName,
}: {
  icon: IconType;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-[35px] shrink-0 place-items-center rounded-[6px] bg-icon text-soft transition-colors duration-300",
        className,
      )}
    >
      <Icon className={cn("size-[18px]", iconClassName)} />
    </span>
  );
}

/** Rounded pill with a violet glyph — profile facts and stat labels. */
export function Chip({
  icon: Icon,
  children,
  tone = "tile",
  className,
}: {
  icon?: IconType;
  children: ReactNode;
  tone?: "tile" | "surface";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[0.5px] border-white/5 px-2.5 py-1.5 text-[13px] font-medium text-soft",
        tone === "tile" ? "bg-tile" : "bg-surface",
        className,
      )}
    >
      {Icon && <Icon aria-hidden className="size-3.5 shrink-0 text-primary" />}
      {children}
    </span>
  );
}

/**
 * Clickable row: icon tile + label + arrow that tilts to ↗ on hover
 * (Figma "Component 1" default / on-hover variants).
 */
export function LinkTile({
  href,
  icon,
  label,
  ariaLabel,
  className,
}: {
  href: string;
  icon: IconType;
  label: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group flex min-h-[49px] min-w-0 cursor-pointer items-center justify-between gap-1 rounded-tile bg-tile py-[7px] pl-1.5 pr-2 transition-colors duration-300 hover:bg-[#1e1e1e]",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        <IconTile icon={icon} className="group-hover:text-fg" />
        <span className="truncate text-sm font-medium tracking-[-0.01em] text-soft transition-colors duration-300 group-hover:text-fg">
          {label}
        </span>
      </span>
      <RiArrowRightLine
        aria-hidden
        className="size-3 shrink-0 text-[#5c5c5c] transition-all duration-300 group-hover:-rotate-45 group-hover:text-fg group-focus-visible:-rotate-45 group-focus-visible:text-fg"
      />
    </SmartLink>
  );
}

/** Full-width #1f1f1f button (DM me, Email me, Schedule a call …). */
export function ActionButton({
  href,
  icon: Icon,
  children,
  className,
}: {
  href: string;
  icon: IconType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "group flex min-h-[50px] flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] bg-button px-2.5 py-4 text-[13px] font-medium text-soft transition-colors duration-300 hover:bg-button-hover hover:text-fg",
        className,
      )}
    >
      <Icon
        aria-hidden
        className="size-[18px] shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
      />
      {children}
    </SmartLink>
  );
}

/** Violet call-to-action ("View Works", "Start a Project"). */
export function PrimaryButton({
  href,
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-tile border-[1.5px] border-card bg-primary px-[30px] py-[13px] text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgb(145_108_231/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_12px_30px_-8px_rgb(145_108_231/0.75)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
    className,
  );

  if (href) {
    return (
      <SmartLink href={href} className={classes}>
        {children}
      </SmartLink>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

/** Green "available" dot with a soft pulse ring. */
export function AvailableDot() {
  return (
    <span
      aria-hidden
      className="relative grid size-[17px] shrink-0 place-items-center rounded-full bg-[#34c759]/20"
    >
      <span className="size-[9px] rounded-full bg-[#34c759] animate-[pulse-dot_2.2s_ease-out_infinite]" />
    </span>
  );
}
