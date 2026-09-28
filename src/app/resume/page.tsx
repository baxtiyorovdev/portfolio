import type { Metadata } from "next";
import Image from "next/image";
import {
  RiFileList3Line,
  RiGraduationCapFill,
  RiMailFill,
  RiMapPin2Fill,
  RiPhoneFill,
  RiShieldStarFill,
  RiStackFill,
  RiTranslate2,
  RiUserSmileFill,
} from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { Chip, IconTile, LinkTile, PrimaryButton } from "@/components/bento/Primitives";
import { PageHeader, PageShell } from "@/components/layout/PageShell";
import { StatsRow } from "@/components/home/StatsRow";
import { Timeline } from "@/components/resume/Timeline";
import { SkillsMatrix } from "@/components/resume/SkillsMatrix";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPortfolio } from "@/lib/content";
import { emailHref, getStats, phoneHref } from "@/lib/portfolio";
import { getSocialLinks } from "@/lib/social";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "The resume of Baxtiyorov Shaxriyor — education, developer background, languages and core technical skills.",
  alternates: { canonical: "/resume" },
};

export default async function ResumePage() {
  const data = await getPortfolio();
  const { about } = data;
  const contactRows = [
    { icon: RiMapPin2Fill, value: `${about.social.location} · ${about.timezone}` },
    { icon: RiShieldStarFill, value: `${about.social.experience} experience` },
    { icon: RiMailFill, value: about.social.email, href: emailHref(about) },
    { icon: RiPhoneFill, value: about.social.phone, href: phoneHref(about) },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ])}
      />
      <PageShell>
        <PageHeader
          icon={RiFileList3Line}
          label="Resume"
          title={
            <>
              Experience &amp; <span className="text-primary">Education</span>
            </>
          }
          description={about.description}
          actions={<PrimaryButton href="/contact">Hire Me</PrimaryButton>}
        />

        <StatsRow stats={getStats(data)} />

        <div className="grid gap-3 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <BentoCard as="aside" aria-labelledby="summary-title" className="gap-6 p-5 lg:self-start">
            <div className="flex items-center gap-4">
              <span className="relative size-[72px] shrink-0 overflow-hidden rounded-tile bg-primary">
                <Image
                  src={about.avatar}
                  alt={`${about.name} avatar`}
                  fill
                  sizes="72px"
                  className="translate-y-1 object-cover object-top"
                />
              </span>
              <div>
                <h2 id="summary-title" className="text-lg font-semibold text-fg">
                  {about.name}
                </h2>
                <p className="text-sm font-medium text-muted">{about.title}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 text-sm font-medium text-muted">
                <RiUserSmileFill aria-hidden className="size-4 text-primary" /> About
              </p>
              <p className="text-sm font-medium leading-relaxed text-soft">{about.about_job}</p>
            </div>

            <ul className="flex flex-col gap-2">
              {contactRows.map((row) => (
                <li key={row.value}>
                  {row.href ? (
                    <LinkTile href={row.href} icon={row.icon} label={row.value} />
                  ) : (
                    <span className="flex min-h-[49px] items-center gap-1.5 rounded-tile bg-tile p-[7px]">
                      <IconTile icon={row.icon} />
                      <span className="text-sm font-medium text-soft">{row.value}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-2 text-sm font-medium text-muted">
                <RiTranslate2 aria-hidden className="size-4 text-primary" /> Languages
              </p>
              <ul className="flex flex-wrap gap-2">
                {about.languages.map((language) => (
                  <li key={language}>
                    <Chip>{language}</Chip>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid grid-cols-2 gap-2 border-t border-line pt-5">
              {getSocialLinks(about).map((link) => (
                <li key={link.label} className="min-w-0">
                  <LinkTile href={link.href} icon={link.icon} label={link.label} />
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard aria-labelledby="education-title" className="border-white/[0.06] pt-2.5">
            <CardHeader
              bordered
              icon={RiGraduationCapFill}
              label="Education"
              title="Learning Timeline"
              id="education-title"
            />
            <Timeline resume={data.resume} />
          </BentoCard>
        </div>

        <BentoCard aria-labelledby="skills-title" className="border-white/[0.06] pt-2.5">
          <CardHeader bordered icon={RiStackFill} label="Skills" title="Technical Toolkit" id="skills-title" />
          <SkillsMatrix skills={data.resume.skills} />
        </BentoCard>
      </PageShell>
    </>
  );
}
