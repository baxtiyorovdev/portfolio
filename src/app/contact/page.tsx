import type { Metadata } from "next";
import {
  RiMailFill,
  RiMapPin2Fill,
  RiMessage3Fill,
  RiPhoneFill,
  RiRocket2Fill,
  RiSendPlaneFill,
  RiSignalTowerFill,
} from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { IconTile, LinkTile } from "@/components/bento/Primitives";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapPanel } from "@/components/contact/MapPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolio } from "@/lib/content";
import { emailHref, phoneHref } from "@/lib/portfolio";
import { getSocialLinks } from "@/lib/social";
import { breadcrumbSchema, contactPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Baxtiyorov Shaxriyor for frontend development work, freelance collaboration and project opportunities.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { about } = await getPortfolio();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd data={contactPageSchema} />
      <PageShell>
        <PageHeader
          icon={RiMessage3Fill}
          label="Contact"
          title={
            <>
              Let&apos;s start a <span className="text-primary">conversation</span>
            </>
          }
          description="Open to internships, freelance work and junior front-end roles. Drop a message and I'll reply soon."
        />

        <div className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <BentoCard aria-labelledby="channels-title" className="gap-6 p-5">
              <CardHeader icon={RiSignalTowerFill} label="Reach Me" title="Direct Channels" id="channels-title" />
              <ul className="flex flex-col gap-2">
                <li>
                  <LinkTile href={emailHref(about)} icon={RiMailFill} label={about.social.email} />
                </li>
                <li>
                  <LinkTile href={phoneHref(about)} icon={RiPhoneFill} label={about.social.phone} />
                </li>
                <li>
                  <span className="flex min-h-[49px] items-center gap-1.5 rounded-tile bg-tile p-[7px]">
                    <IconTile icon={RiMapPin2Fill} />
                    <span className="text-sm font-medium text-soft">{about.social.location}</span>
                  </span>
                </li>
              </ul>
            </BentoCard>

            <BentoCard aria-labelledby="follow-title" className="gap-6 p-5">
              <CardHeader icon={RiRocket2Fill} label="Follow Me" title="Online Presence" id="follow-title" />
              <ul className="grid grid-cols-2 gap-2">
                {getSocialLinks(about).map((link) => (
                  <li key={link.label} className="min-w-0">
                    <LinkTile href={link.href} icon={link.icon} label={link.label} />
                  </li>
                ))}
              </ul>
            </BentoCard>

            <MapPanel about={about} />
          </div>

          <BentoCard aria-labelledby="form-title" className="border-white/[0.06] pt-2.5 lg:self-start">
            <CardHeader
              bordered
              icon={RiSendPlaneFill}
              label="Message"
              title="Send a Message"
              id="form-title"
            />
            <p className="px-6 pt-5 text-sm font-medium text-muted">I usually respond within a day.</p>
            <ContactForm />
          </BentoCard>
        </div>
      </PageShell>
    </>
  );
}
