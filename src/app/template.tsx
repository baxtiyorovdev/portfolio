"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/motion";

/**
 * Re-mounts on every navigation, giving each route a clean enter transition.
 * (App Router has no reliable exit-before-navigate, so we animate entrances.)
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
