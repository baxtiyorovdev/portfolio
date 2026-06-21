import { FiMapPin, FiNavigation } from "react-icons/fi";
import { about, contactConfig } from "@/lib/portfolio";

export function MapPanel() {
  const mapQuery = encodeURIComponent(`${contactConfig.lat},${contactConfig.lng}`);
  const src = `https://www.google.com/maps?q=${contactConfig.lat},${contactConfig.lng}&z=15&output=embed`;

  return (
    <div className="glass relative overflow-hidden rounded-xl3">
      <iframe
        title="Google map"
        src={src}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[300px] w-full border-0 sm:h-[340px]"
      />
      <div className="glass absolute left-4 top-4 max-w-[260px] rounded-2xl p-4">
        <h3 className="font-semibold leading-tight">{about.name}</h3>
        <p className="text-sm text-muted">{about.title}</p>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
          <FiMapPin className="shrink-0 text-accent" />
          {contactConfig.coordsLabel}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center gap-2 text-sm text-accent transition hover:gap-3"
        >
          Open in Maps <FiNavigation />
        </a>
      </div>
    </div>
  );
}
