"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
  magnetic?: boolean;
  className?: string;
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 select-none";

const variants: Record<Variant, string> = {
  primary: "text-on-accent shadow-glow hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "glass-soft text-foreground hover:-translate-y-0.5 hover:border-accent/40",
  ghost: "text-muted hover:bg-surface-2/60 hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  magnetic = false,
  className,
  href,
  external,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const style: CSSProperties | undefined =
    variant === "primary" ? { backgroundImage: "var(--grad-gold)" } : undefined;

  const content = (
    <>
      {icon && <span className="text-[1.1em]">{icon}</span>}
      {children}
      {iconRight && (
        <span className="text-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </>
  );

  let element: ReactNode;

  if (href && external) {
    element = (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  } else if (href) {
    element = (
      <Link href={href} className={classes} style={style} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  } else {
    element = (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        style={style}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }

  return magnetic ? <Magnetic>{element}</Magnetic> : <>{element}</>;
}
