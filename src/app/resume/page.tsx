import type { Metadata } from "next";
import Image from "next/image";
import { FiArrowUpRight, FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";
import { about } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Timeline } from "@/components/resume/Timeline";
import { SkillsMatrix } from "@/components/resume/SkillsMatrix";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The resume of Baxtiyorov Shaxriyor — education, developer background, languages and core technical skills.",
  alternates: { canonical: "/resume" },
};

const contactRows = [
  { icon: <FiMapPin />, value: about.social.location },
  { icon: <FiClock />, value: about.social.experience },
  { icon: <FiMail />, value: about.social.email, href: `mailto:${about.social.email}` },
  { icon: <FiPhone />, value: about.social.phone },
];

const socials = [
  { href: about.social.github, label: "GitHub", icon: <FaGithub /> },
  { href: about.social.telegram, label: "Telegram", icon: <FaTelegram /> },
  { href: about.social.instagram, label: "Instagram", icon: <FaInstagram /> },
];

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ])}
      />
      <Section className="pb-8 pt-32 sm:pt-40" ariaLabelledby="resume-heading">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <SectionHeading
            id="resume-heading"
            kicker="Resume"
            title={
              <>
                Experience &amp;{" "}
                <span className="gradient-text">education</span>.
              </>
            }
            description={about.description}
          />
          <Reveal className="flex flex-wrap gap-3 lg:justify-end">
            <Button href="/contact" iconRight={<FiArrowUpRight />}>
              Hire me
            </Button>
            <Button href={about.social.github} external variant="secondary">
              GitHub
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <aside className="glass rounded-xl3 p-6 lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="relative h-16 w-16 overflow-hidden rounded-2xl bg-surface-2">
                  <Image
                    src={about.image}
                    alt={about.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <p className="font-semibold">{about.name}</p>
                  <p className="text-sm text-muted">{about.title}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted">
                {about.about_job}
              </p>

              <ul className="mt-6 space-y-3">
                {contactRows.map((row, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent">
                      {row.icon}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="break-words transition-colors hover:text-accent"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="break-words">{row.value}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                  Languages
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {about.languages.map((language) => (
                    <Pill key={language}>{language}</Pill>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2.5 border-t border-border pt-5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="glass-soft grid h-10 w-10 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </aside>
          </Reveal>

          <div>
            <h2 className="mb-6 text-2xl font-semibold">Education</h2>
            <Timeline />
          </div>
        </div>
      </Section>

      <Section ariaLabelledby="skills-matrix-heading">
        <SectionHeading
          id="skills-matrix-heading"
          kicker="Skills"
          title={
            <>
              Technical <span className="gradient-text">toolkit</span>.
            </>
          }
          description="Levels reflect day-to-day comfort across the stack."
        />
        <div className="mt-10">
          <SkillsMatrix />
        </div>
      </Section>
    </>
  );
}
