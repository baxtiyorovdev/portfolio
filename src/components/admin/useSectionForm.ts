"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { SaveResult } from "@/app/admin/actions";

export type SaveStatus =
  | { type: "idle" }
  | { type: "saved"; at: string }
  | { type: "error"; message: string; issues?: string[] };

/**
 * State for one admin section: the edited value, dirty tracking (with a
 * leave-page warning) and a save() that calls the section's server action.
 */
export function useSectionForm<T>(initial: T, action: (value: T) => Promise<SaveResult>) {
  const [value, setValue] = useState<T>(initial);
  const [baseline, setBaseline] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<SaveStatus>({ type: "idle" });
  const [pending, startTransition] = useTransition();

  const dirty = useMemo(() => JSON.stringify(value) !== baseline, [value, baseline]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function save() {
    startTransition(async () => {
      const result = await action(value);
      if (result.ok) {
        setBaseline(JSON.stringify(value));
        setStatus({ type: "saved", at: result.savedAt });
      } else {
        setStatus({ type: "error", message: result.error, issues: result.issues });
      }
    });
  }

  return { value, setValue, dirty, status, pending, save };
}
