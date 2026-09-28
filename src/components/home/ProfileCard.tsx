import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightUpLine,
  RiGlobalLine,
  RiGraduationCapFill,
  RiInstagramFill,
  RiMapPin2Fill,
  RiShieldStarFill,
  RiTelegram2Fill,
  RiTimeFill,
} from "react-icons/ri";
import { BentoCard } from "@/components/bento/BentoCard";
import { ActionButton, AvailableDot, Chip, IconTile } from "@/components/bento/Primitives";
import { RoleCycler } from "@/components/bento/RoleCycler";
import { about, latestSchool } from "@/lib/portfolio";

function listToText(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items.at(-1)}`;
}

export function ProfileCard() {
  const facts = [
    { icon: RiMapPin2Fill, label: about.social.location },
    { icon: RiGlobalLine, label: listToText(about.languages) },
    { icon: RiGraduationCapFill, label: latestSchool },
    { icon: RiShieldStarFill, label: about.social.experience },
    { icon: RiTimeFill, label: about.timezone },
  ].filter((fact) => fact.label);

  return (
    <BentoCard
      area="profile"
      aria-labelledby="profile-name"
      className="gap-6 border-white/[0.06] p-5 lg:justify-between"
    >
      <div className="flex gap-[15px]">
        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-tile bg-primary sm:size-[101px]">
          <Image
            src={about.avatar}
            alt={`${about.name} avatar`}
            fill
            priority
            sizes="101px"
            className="translate-y-1.5 scale-105 object-cover object-top"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border-[0.5px] border-white/5 bg-surface px-4 py-1.5 text-sm font-medium text-muted sm:px-5">
              <AvailableDot />
              Available To Work
            </span>
            <Link
              href="/resume"
              className="group flex items-center gap-2 text-[13px] font-medium text-soft transition-colors hover:text-fg"
            >
              Resume
              <IconTile
                icon={RiArrowRightUpLine}
                iconClassName="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                className="group-hover:bg-primary group-hover:text-white"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h1 id="profile-name" className="text-[22px] font-semibold leading-6 text-fg">
              {about.name}
            </h1>
            <RoleCycler roles={about.roles} />
          </div>
        </div>
      </div>

      <ul
        aria-label="Quick facts"
        className="flex flex-wrap gap-2.5 rounded-[10px] border-[0.8px] border-line bg-surface p-3"
      >
        {facts.map((fact) => (
          <li key={fact.label}>
            <Chip icon={fact.icon}>{fact.label}</Chip>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ActionButton href={about.social.instagram} icon={RiInstagramFill}>
          DM me (Instagram)
        </ActionButton>
        <ActionButton href={about.social.telegram} icon={RiTelegram2Fill}>
          Message on Telegram
        </ActionButton>
      </div>
    </BentoCard>
  );
}
