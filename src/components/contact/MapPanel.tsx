import { RiMapPin2Fill, RiNavigationFill } from "react-icons/ri";
import { BentoCard } from "@/components/bento/BentoCard";
import { contactConfig } from "@/lib/portfolio";
import type { About } from "@/types";

export function MapPanel({ about }: { about: About }) {
  const mapQuery = encodeURIComponent(`${contactConfig.lat},${contactConfig.lng}`);
  const src = `https://www.google.com/maps?q=${contactConfig.lat},${contactConfig.lng}&z=15&output=embed`;

  return (
    <BentoCard aria-label="Location map" className="overflow-hidden p-2">
      <iframe
        title="Google map"
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[280px] w-full rounded-[14px] border-0 grayscale-[0.6] invert-[0.9] hue-rotate-180 sm:h-[320px]"
      />
      <div className="absolute left-5 top-5 max-w-[250px] rounded-tile border border-white/[0.08] bg-card/95 p-4 backdrop-blur">
        <h3 className="text-sm font-semibold text-fg">{about.name}</h3>
        <p className="text-xs font-medium text-muted">{about.title}</p>
        <p className="mt-2 flex items-center gap-2 text-xs font-medium text-muted">
          <RiMapPin2Fill aria-hidden className="size-3.5 shrink-0 text-primary" />
          {contactConfig.coordsLabel}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-all hover:gap-3"
        >
          Open in Maps <RiNavigationFill aria-hidden />
        </a>
      </div>
    </BentoCard>
  );
}
