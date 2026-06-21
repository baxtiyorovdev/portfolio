import type { Metadata } from "next";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaGithub, FaInstagram, FaTelegram } from "react-icons/fa";
import { about } from "@/lib/portfolio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPanel } from "@/components/contact/MapPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, contactPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Baxtiyorov Shaxriyor for frontend development work, freelance collaboration and project opportunities.",
  alternates: { canonical: "/contact" },
};

const details = [
  {
    icon: <FiMail />,
    label: "Email",
    value: about.social.email,
    href: `mailto:${about.social.email}`,
  },
  {
    icon: <FiPhone />,
    label: "Phone",
    value: about.social.phone,
    href: `tel:${about.social.phone.replace(/\s|\(|\)/g, "")}`,
  },
  { icon: <FiMapPin />, label: "Location", value: about.social.location },
];

const socials = [
  { href: about.social.github, label: "GitHub", icon: <FaGithub /> },
  { href: about.social.telegram, label: "Telegram", icon: <FaTelegram /> },
  { href: about.social.instagram, label: "Instagram", icon: <FaInstagram /> },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd data={contactPageSchema} />
      <Section className="pt-32 sm:pt-40" ariaLabelledby="contact-heading">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            id="contact-heading"
            kicker="Contact"
            title={
              <>
                Let&apos;s start a{" "}
                <span className="gradient-text">conversation</span>.
              </>
            }
            description="Open to internships, freelance work and junior front-end roles. Drop a message and I'll reply soon."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <Reveal key={detail.label}>
                <SpotlightCard className="glass h-full rounded-2xl p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent">
                    {detail.icon}
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
                    {detail.label}
                  </p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="mt-1 block break-words font-medium transition-colors hover:text-accent"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-1 break-words font-medium">{detail.value}</p>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}

            <Reveal>
              <div className="glass flex h-full items-center gap-3 rounded-2xl p-5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="glass-soft grid h-11 w-11 place-items-center rounded-full text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-6">
            <MapPanel />
          </div>
        </div>

        <Reveal>
          <div className="glass rounded-xl3 p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted">
              I usually respond within a day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
      </Section>
    </>
  );
}
