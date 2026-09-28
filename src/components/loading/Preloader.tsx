"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isPreloading, signalIntroReady } from "@/lib/intro";
import { MiniBento } from "./MiniBento";

/** Resolves when the page (images, fonts) has loaded, or after `cap` ms. */
function pageLoaded(cap: number): Promise<void> {
  const load = new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });
  const fonts = document.fonts?.ready.then(() => undefined) ?? Promise.resolve();
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, cap));
  return Promise.race([Promise.all([load, fonts]).then(() => undefined), timeout]);
}

/**
 * First-visit intro (once per session, skipped for reduced motion — decided by
 * the boot script in layout.tsx). The mini bento assembles while a counter runs;
 * once the page has loaded the counter completes and a curtain lifts, handing
 * over to the page's own entrance animation.
 */
export function Preloader({ name, title }: { name: string; title: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    (_, contextSafe) => {
      if (!isPreloading()) return;
      let cancelled = false;

      const counter = { value: 0 };
      const percent = root.current!.querySelector<HTMLElement>("[data-percent]")!;
      const bar = root.current!.querySelector<HTMLElement>("[data-bar]")!;
      const render = () => {
        percent.textContent = String(Math.round(counter.value)).padStart(2, "0");
        gsap.set(bar, { scaleX: counter.value / 100 });
      };

      // Phase 1: tiles pop in, the profile tile lights up, the counter runs to 86%.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo("[data-tile]", { autoAlpha: 0, scale: 0.55 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.7)",
          stagger: { each: 0.05, from: "random" },
        })
        .from("[data-accent]", { scale: 0, duration: 0.5, ease: "back.out(2.2)" }, 0.45)
        .to(
          "[data-accent-tile]",
          { borderColor: "rgb(145 108 231 / 0.55)", boxShadow: "0 0 24px -4px rgb(145 108 231 / 0.55)", duration: 0.6 },
          0.55,
        )
        .fromTo("[data-line]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.2)
        .to(counter, { value: 86, duration: 1.3, ease: "power2.inOut", onUpdate: render }, 0.25);

      // Phase 2 (after load): finish the count, dissolve the grid, lift the curtain.
      const finish = contextSafe!(() => {
        if (cancelled) return;
        const outro = gsap.timeline({
          defaults: { ease: "power2.in" },
          onComplete: () => setDone(true),
        });
        outro
          .to(counter, { value: 100, duration: 0.35, ease: "power2.out", onUpdate: render })
          .to("[data-tile]", {
            autoAlpha: 0,
            y: -10,
            scale: 0.9,
            duration: 0.35,
            stagger: { each: 0.025, from: "edges" },
          }, "+=0.1")
          .to("[data-line]", { autoAlpha: 0, y: -10, duration: 0.3, stagger: 0.05 }, "<")
          .addLabel("curtain", "-=0.1")
          .call(signalIntroReady, undefined, "curtain")
          .to(root.current, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.8,
            ease: "power4.inOut",
          }, "curtain");
      });

      Promise.all([intro.then(() => undefined), pageLoaded(3000)]).then(finish);

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="preloader fixed inset-0 z-[200] flex-col items-center justify-center gap-8 bg-canvas px-6"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* Faint violet bloom behind the grid. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[110px]"
      />

      <MiniBento className="relative w-[min(300px,80vw)]" />

      <div className="relative flex w-[min(300px,80vw)] flex-col gap-4">
        <div data-line className="flex flex-col items-center gap-1 text-center">
          <p className="text-[15px] font-semibold text-fg">{name}</p>
          <p className="text-[13px] font-medium text-muted">{title}</p>
        </div>

        <div data-line className="flex flex-col gap-2">
          <div className="h-[3px] overflow-hidden rounded-full bg-icon">
            <div
              data-bar
              className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary/60 to-primary"
            />
          </div>
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-faint">Loading portfolio</span>
            <span className="tabular-nums text-soft">
              <span data-percent>00</span>%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
