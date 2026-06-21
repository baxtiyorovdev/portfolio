import { FiArrowRight } from "react-icons/fi";
import { about } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ContactCTA() {
  return (
    <Section ariaLabelledby="cta-heading">
      <SpotlightCard className="gradient-border glass relative overflow-hidden rounded-xl3 px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full opacity-40 blur-[90px]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />
        <Reveal className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            Let&apos;s connect
          </p>
          <h2
            id="cta-heading"
            className="mx-auto mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-5xl"
          >
            Have a project in mind?{" "}
            <span className="gradient-text">Let&apos;s build it.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{about.about_job}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" size="lg" magnetic iconRight={<FiArrowRight />}>
              Start a conversation
            </Button>
            <Button
              href={`mailto:${about.social.email}`}
              external
              variant="secondary"
              size="lg"
            >
              Email me
            </Button>
          </div>
        </Reveal>
      </SpotlightCard>
    </Section>
  );
}
