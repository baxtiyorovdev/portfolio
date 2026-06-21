"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
  /** Show the moving light sheen. */
  glare?: boolean;
  /** Corner radius (inherited by the sheen + spotlight). */
  radius?: string;
};

/**
 * Pointer-driven 3D tilt with a light sheen and a gold spotlight glow.
 * Propagates `--mx`/`--my` so the `.spotlight` glow tracks the cursor.
 * Falls back to a static card when reduced motion is requested.
 */
export function TiltCard({
  children,
  className,
  max = 9,
  glare = true,
  radius = "1.75rem",
}: TiltCardProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareOpacity = useSpring(0, { stiffness: 120, damping: 20 });
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), transparent 45%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
  }

  function handleEnter() {
    if (glare) glareOpacity.set(0.55);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  }

  if (reduced) {
    return (
      <div className={className} style={{ borderRadius: radius }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn("perspective", className)}
      style={{ borderRadius: radius }}
    >
      <motion.div
        className="preserve-3d relative h-full w-full rounded-[inherit] will-change-transform"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" } as MotionStyle}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] mix-blend-overlay"
            style={{ opacity: glareOpacity, background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
