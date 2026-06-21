"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

/**
 * App-wide client providers. `reducedMotion="user"` makes every Framer
 * animation honour the OS reduced-motion preference automatically.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
