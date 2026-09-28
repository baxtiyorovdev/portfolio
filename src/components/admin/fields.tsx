import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-tile border border-line bg-surface px-3.5 text-sm font-medium text-fg outline-none transition-colors duration-200 placeholder:text-[#5f5f5f] hover:border-line-strong focus:border-primary focus:ring-2 focus:ring-primary/30";

/**
 * Label + control + optional hint. Wraps a single control in a <label>; use
 * as="group" for composite widgets (tag inputs) whose inner buttons must not
 * be activated by clicks on the label text.
 */
export function Field({
  label,
  hint,
  children,
  className,
  as = "label",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
  as?: "label" | "group";
}) {
  const Tag = as === "label" ? "label" : "div";
  return (
    <Tag className={cn("flex min-w-0 flex-col gap-1.5", className)} {...(as === "group" ? { role: "group", "aria-label": label } : {})}>
      <span className="text-[13px] font-medium text-muted">{label}</span>
      {children}
      {hint && <span className="text-xs font-medium text-faint">{hint}</span>}
    </Tag>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, "h-11", className)} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={4} {...props} className={cn(inputClass, "resize-y py-2.5 leading-relaxed", className)} />;
}

export function SelectInput({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(inputClass, "h-11 cursor-pointer appearance-none bg-surface pr-8", className)}>
      {children}
    </select>
  );
}

/** A titled card that groups related fields. */
export function Panel({
  icon: Icon,
  title,
  description,
  actions,
  children,
  className,
}: {
  icon?: IconType;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-5 rounded-card border border-white/5 bg-card p-5 sm:p-6", className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {Icon && (
            <span className="grid size-9 shrink-0 place-items-center rounded-[8px] bg-icon text-primary">
              <Icon aria-hidden className="size-[18px]" />
            </span>
          )}
          <div>
            <h2 className="text-base font-semibold text-fg">{title}</h2>
            {description && <p className="mt-0.5 text-[13px] font-medium text-muted">{description}</p>}
          </div>
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}

const smallButton =
  "grid size-9 shrink-0 cursor-pointer place-items-center rounded-[8px] bg-icon text-soft transition-colors hover:bg-button-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-35";

/** Move-up / move-down controls for list rows. */
export function MoveButtons({
  index,
  length,
  onMove,
  label,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  label: string;
}) {
  return (
    <span className="flex gap-1.5">
      <button
        type="button"
        className={smallButton}
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        aria-label={`Поднять: ${label}`}
      >
        <RiArrowUpLine aria-hidden className="size-4" />
      </button>
      <button
        type="button"
        className={smallButton}
        disabled={index === length - 1}
        onClick={() => onMove(index, index + 1)}
        aria-label={`Опустить: ${label}`}
      >
        <RiArrowDownLine aria-hidden className="size-4" />
      </button>
    </span>
  );
}

/** Secondary "add item" button used under lists. */
export function AddButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-tile border border-dashed border-line-strong text-[13px] font-medium text-muted transition-colors hover:border-primary hover:text-fg"
    >
      {children}
    </button>
  );
}

/** Immutable array helpers for list editors. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function replaceItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
  return items.map((item, i) => (i === index ? { ...item, ...patch } : item));
}
