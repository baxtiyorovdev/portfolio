import type { HTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type BentoCardProps = HTMLAttributes<HTMLElement> & {
  /** Named grid area in `.bento` (home grid only). */
  area?: string;
  as?: "section" | "article" | "div" | "aside";
  /** Participate in the RevealGroup entrance animation (default true). */
  reveal?: boolean;
  children: ReactNode;
};

/** The #101010 rounded card every bento tile sits in. */
export function BentoCard({
  area,
  as: Tag = "section",
  reveal = true,
  className,
  style,
  children,
  ...rest
}: BentoCardProps) {
  return (
    <Tag
      data-reveal={reveal ? "" : undefined}
      style={area ? { gridArea: area, ...style } : style}
      className={cn(
        "relative flex min-w-0 flex-col rounded-card border border-white/5 bg-card transition-colors duration-300 hover:border-white/10",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type CardHeaderProps = {
  icon: IconType;
  label: string;
  title?: string;
  /** id for the title so the card can use aria-labelledby. */
  id?: string;
  /** Full-width header with a bottom rule (Testimonials / Work Process style). */
  bordered?: boolean;
  className?: string;
};

/** Centered "icon + kicker" pill with an optional title underneath. */
export function CardHeader({
  icon: Icon,
  label,
  title,
  id,
  bordered,
  className,
}: CardHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full shrink-0 flex-col items-center",
        bordered && "border-b border-line pb-3 pt-2.5",
        className,
      )}
    >
      <p className="flex items-center justify-center gap-2 px-2.5 py-1.5 text-sm font-medium text-muted">
        <Icon aria-hidden className="size-4 shrink-0 text-primary" />
        {label}
      </p>
      {title && (
        <h2 id={id} className="text-base font-semibold leading-6 text-fg">
          {title}
        </h2>
      )}
    </header>
  );
}
