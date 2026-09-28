"use client";

import { createContext, useContext, type ReactNode } from "react";

export type UploadMode = "presigned" | "token" | "none";

const UploadModeContext = createContext<UploadMode>("none");

/** Carries the server-detected Vercel Blob setup down to every ImageInput. */
export function UploadModeProvider({ mode, children }: { mode: UploadMode; children: ReactNode }) {
  return <UploadModeContext.Provider value={mode}>{children}</UploadModeContext.Provider>;
}

export function useUploadMode(): UploadMode {
  return useContext(UploadModeContext);
}
