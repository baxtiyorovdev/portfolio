"use client";

import { RiCheckboxCircleFill, RiErrorWarningFill, RiSave3Fill } from "react-icons/ri";
import { PrimaryButton } from "@/components/bento/Primitives";
import type { SaveStatus } from "./useSectionForm";

const timeFormat = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

/** Sticky footer with save state and the save button. */
export function SaveBar({
  dirty,
  pending,
  status,
  onSave,
}: {
  dirty: boolean;
  pending: boolean;
  status: SaveStatus;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-3 z-20 flex flex-col gap-2 rounded-[16px] border border-white/[0.08] bg-card/95 p-3 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
      <div role="status" aria-live="polite" className="min-w-0 px-2 text-[13px] font-medium">
        {status.type === "error" ? (
          <div className="flex flex-col gap-1 text-[#ff6b6b]">
            <span className="flex items-center gap-2">
              <RiErrorWarningFill aria-hidden className="size-4 shrink-0" /> {status.message}
            </span>
            {status.issues?.map((issue) => (
              <span key={issue} className="pl-6 text-xs text-[#ff9b9b]">
                {issue}
              </span>
            ))}
          </div>
        ) : dirty ? (
          <span className="text-[#e8b04b]">Есть несохранённые изменения</span>
        ) : status.type === "saved" ? (
          <span className="flex items-center gap-2 text-[#34c759]">
            <RiCheckboxCircleFill aria-hidden className="size-4" />
            Сохранено в {timeFormat.format(new Date(status.at))} — сайт обновлён
          </span>
        ) : (
          <span className="text-faint">Изменений нет</span>
        )}
      </div>
      <PrimaryButton onClick={onSave} disabled={!dirty || pending} className="shrink-0">
        {pending ? (
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          <RiSave3Fill aria-hidden className="size-4" />
        )}
        {pending ? "Сохранение…" : "Сохранить"}
      </PrimaryButton>
    </div>
  );
}
