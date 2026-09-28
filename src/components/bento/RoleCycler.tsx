"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const LINE = 18;

/**
 * "I'm a <role>" ticker (Figma Component 32). Steps through the roles on a
 * repeating timeline; the first role is appended again so the wrap is seamless.
 */
export function RoleCycler({ roles }: { roles: string[] }) {
  const root = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLSpanElement>(null);
  const loop = [...roles, roles[0]];

  useGSAP(
    () => {
      if (roles.length < 2) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ repeat: -1, delay: 1.2 });
        roles.forEach((_, i) => {
          tl.to(list.current, {
            y: -(i + 1) * LINE,
            duration: 0.6,
            ease: "power3.inOut",
          }, "+=1.8");
        });
        tl.set(list.current, { y: 0 });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [roles.join("|")] },
  );

  return (
    <span className="flex items-center gap-1 text-sm font-medium text-muted">
      I&apos;m a
      <span className="sr-only">{roles.join(", ")}</span>
      <span
        ref={root}
        aria-hidden
        className="relative block overflow-hidden"
        style={{ height: LINE }}
      >
        <span ref={list} className="flex flex-col will-change-transform">
          {loop.map((role, i) => (
            <span
              key={`${role}-${i}`}
              className="block whitespace-nowrap font-semibold text-primary"
              style={{ height: LINE, lineHeight: `${LINE}px` }}
            >
              {role}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
