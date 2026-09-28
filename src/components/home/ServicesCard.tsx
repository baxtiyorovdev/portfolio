import type { IconType } from "react-icons";
import {
  RiCodeSSlashFill,
  RiLayout4Line,
  RiLayoutGridFill,
  RiMagicFill,
  RiPlugLine,
  RiSmartphoneLine,
  RiSpeedUpLine,
} from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { Marquee } from "@/components/bento/Marquee";
import { IconTile, PrimaryButton } from "@/components/bento/Primitives";
import { services } from "@/lib/portfolio";
import type { Service, ServiceIcon } from "@/types";

const ICONS: Record<ServiceIcon, IconType> = {
  code: RiCodeSSlashFill,
  responsive: RiSmartphoneLine,
  layout: RiLayout4Line,
  api: RiPlugLine,
  speed: RiSpeedUpLine,
  motion: RiMagicFill,
};

function ServicePill({ service }: { service: Service }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-tile bg-tile py-[7px] pl-[7px] pr-[15px] text-sm font-medium text-soft">
      <IconTile icon={ICONS[service.icon]} iconClassName="size-4" />
      <span className="whitespace-nowrap">{service.name}</span>
    </span>
  );
}

/** "Solutions Suite": two service rows drifting in opposite directions (Figma Components 6 / 9). */
export function ServicesCard() {
  const half = Math.ceil(services.length / 2);
  const rows = [services.slice(0, half), services.slice(half)];

  return (
    <BentoCard
      area="services"
      aria-labelledby="services-title"
      className="gap-[30px] overflow-hidden px-5 pb-[15px] pt-5"
    >
      <CardHeader icon={RiLayoutGridFill} label="Services" title="Solutions Suite" id="services-title" />

      <div className="mt-auto flex flex-col items-center">
        <div className="fade-x -mx-5 flex w-[calc(100%+40px)] flex-col gap-2.5">
          <Marquee direction="right" duration={24}>
            {rows[0].map((service) => (
              <ServicePill key={service.name} service={service} />
            ))}
          </Marquee>
          <Marquee direction="left" duration={28}>
            {rows[1].map((service) => (
              <ServicePill key={service.name} service={service} />
            ))}
          </Marquee>
        </div>

        <PrimaryButton href="/contact" className="relative z-10 -mt-[30px]">
          Start a Project
        </PrimaryButton>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[92px] bg-gradient-to-t from-[#0d0d0d] to-transparent"
      />
    </BentoCard>
  );
}
