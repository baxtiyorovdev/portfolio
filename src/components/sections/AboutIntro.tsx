import { FiArrowUpRight, FiClock, FiGlobe, FiMail, FiMapPin } from "react-icons/fi";
import { about } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AboutIntro() {
  const facts = [
    { icon: <FiMapPin />, label: "Location", value: about.social.location },
    { icon: <FiClock />, label: "Experience", value: about.social.experience },
    {
      icon: <FiMail />,
      label: "Email",
      value: about.social.email,
      href: `mailto:${about.social.email}`,
    },
    {
      icon: <FiGlobe />,
      label: "Languages",
      value: about.languages.join(" · "),
    },
  ];

  return (
    <Section id="about" ariaLabelledby="about-heading">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="about-heading"
            kicker="About"
            title={
              <>
                Designing interfaces that feel{" "}
                <span className="gradient-text">effortless</span>.
              </>
            }
          />
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
            <Reveal delay={0.05}>
              <p>{about.description}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{about.about_job}</p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="mt-8">
            <Button
              href="/resume"
              variant="secondary"
              iconRight={<FiArrowUpRight />}
            >
              View full resume
            </Button>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} delay={0.05 * index}>
              <SpotlightCard className="glass h-full rounded-2xl p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent">
                  {fact.icon}
                </span>
                <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
                  {fact.label}
                </p>
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="mt-1 block break-words font-medium transition-colors hover:text-accent"
                  >
                    {fact.value}
                  </a>
                ) : (
                  <p className="mt-1 break-words font-medium">{fact.value}</p>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
