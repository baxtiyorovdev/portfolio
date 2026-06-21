"use client";

import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { easeOutExpo } from "@/lib/motion";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <div className="h-[420px] w-[420px] rounded-full border border-border animate-spin-slow" />
        <div className="absolute h-[300px] w-[300px] rounded-full border border-border/60" />
        <div
          className="absolute h-56 w-56 rounded-full opacity-40 blur-[80px]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="relative"
      >
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          Signal lost
        </p>
        <h1 className="mt-4 text-7xl font-bold sm:text-9xl">
          <span className="gradient-text">404</span>
        </h1>
        <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for drifted out of orbit or never existed
          here. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" icon={<FiHome />}>
            Back home
          </Button>
          <Button href="/projects" variant="secondary">
            View projects
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
