"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LineArtMark } from "./LineArtMark";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Branded first-paint curtain that draws the mark, then fades away. */
export function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), reduced ? 200 : 1600);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div
            className="absolute h-64 w-64 rounded-full opacity-50 blur-[80px]"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <LineArtMark className="relative h-20 w-auto" />
          <div className="relative flex flex-col items-center gap-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.5em] text-muted">
              Loading
            </span>
            <span className="block h-px w-28 overflow-hidden bg-border">
              <motion.span
                className="block h-full w-full origin-left"
                style={{ background: "var(--grad-gold)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: reduced ? 0.2 : 1.4, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
