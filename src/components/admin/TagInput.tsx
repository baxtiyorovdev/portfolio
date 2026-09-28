"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { RiCloseLine } from "react-icons/ri";
import { inputClass } from "./fields";
import { cn } from "@/lib/utils";

/**
 * Editable list of short strings (roles, languages, technologies).
 * Enter or comma adds; Backspace on an empty field removes the last tag.
 */
export function TagInput({
  value,
  onChange,
  placeholder = "Добавить и нажать Enter",
  suggestions,
  max,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  max?: number;
}) {
  const [draft, setDraft] = useState("");
  const listId = useId();
  const full = max !== undefined && value.length >= max;

  function add(raw: string) {
    const tag = raw.trim();
    if (!tag || full) return;
    if (value.some((existing) => existing.toLowerCase() === tag.toLowerCase())) return;
    onChange([...value, tag]);
    setDraft("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      add(draft);
    } else if (event.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className={cn(inputClass, "flex min-h-11 flex-wrap items-center gap-1.5 px-2 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30")}>
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full border-[0.5px] border-white/5 bg-tile py-1 pl-2.5 pr-1 text-[13px] text-soft"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((item) => item !== tag))}
            aria-label={`Удалить ${tag}`}
            className="grid size-5 cursor-pointer place-items-center rounded-full text-faint transition-colors hover:bg-button-hover hover:text-fg"
          >
            <RiCloseLine aria-hidden className="size-3.5" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => add(draft)}
        disabled={full}
        list={suggestions ? listId : undefined}
        placeholder={full ? `Максимум ${max}` : placeholder}
        className="h-8 min-w-[140px] flex-1 bg-transparent px-1.5 text-sm text-fg outline-none placeholder:text-[#5f5f5f]"
      />
      {suggestions && (
        <datalist id={listId}>
          {suggestions
            .filter((item) => !value.includes(item))
            .map((item) => (
              <option key={item} value={item} />
            ))}
        </datalist>
      )}
    </div>
  );
}
