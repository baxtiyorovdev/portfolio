"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { about, projects, resume } from "@/lib/portfolio";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Button } from "@/components/ui/Button";
import { SkillIcon } from "@/components/skills/SkillIcon";

const floatingChips = ["React", "Next.js", "TypeScript"] as const;

const stats = [
  { value: about.social.experience, label: "Experience" },
  { value: `${projects.length}+`, label: "Projects" },
  { value: `${resume.skills.length}+`, label: "Technologies" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;

      gsap.from("[data-hero-stagger]", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });

      gsap.to("[data-hero-float]", {
        y: "+=12",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      gsap.to(visual.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-7">
          <div data-hero-stagger className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              Available for work
            </span>
          </div>

          <h1
            data-hero-stagger
            className="text-balance text-4xl font-bold leading-[1.03] sm:text-6xl lg:text-7xl"
          >
            Building <span className="gradient-text">clean, fast</span> &amp;
            modern web interfaces.
          </h1>

          <p
            data-hero-stagger
            className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            I&apos;m {about.name.split(" ")[0]} — a{" "}
            {about.title.toLowerCase()} focused on responsive UI, performance and
            delightful motion.
          </p>

          <div data-hero-stagger className="flex flex-wrap items-center gap-3">
            <Button href="/projects" size="lg" magnetic iconRight={<FiArrowRight />}>
              View projects
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Get in touch
            </Button>
          </div>

          <dl data-hero-stagger className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="font-mono text-xs uppercase tracking-widest text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div ref={visual} data-hero-stagger className="relative mx-auto w-full max-w-sm">
          <div className="gradient-border glass relative overflow-hidden rounded-xl3 p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
              <Image
                src={about.image}
                alt={about.name}
                fill
                sizes="(max-width: 1024px) 80vw, 380px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <div className="flex items-center justify-between gap-3 px-2 py-3">
              <div>
                <p className="text-sm font-semibold">{about.name}</p>
                <p className="text-xs text-muted">{about.tag}</p>
              </div>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                {about.social.location}
              </span>
            </div>
          </div>

          {floatingChips.map((name, index) => (
            <div
              key={name}
              data-hero-float
              className="glass-soft absolute hidden items-center gap-2 rounded-2xl px-3 py-2 text-sm shadow-card sm:flex"
              style={
                index === 0
                  ? { left: "-1.5rem", top: "3rem" }
                  : index === 1
                    ? { right: "-1rem", top: "40%" }
                    : { left: "2rem", bottom: "-1rem" }
              }
            >
              <span className="text-lg text-accent">
                <SkillIcon name={name} />
              </span>
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <span
            className="h-2 w-1 rounded-full bg-accent"
            style={{ animation: "scroll-cue 1.8s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
