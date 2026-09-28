import Link from "next/link";
import type { IconType } from "react-icons";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { ANALYTICS_TIME_ZONE, RANGES, type RangeDays } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const number = new Intl.NumberFormat("ru-RU");
const compact = new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 });

/** Date-range presets — the one filter row that scopes everything below it. */
export function RangeTabs({ active }: { active: RangeDays }) {
  return (
    <nav aria-label="Период" className="flex w-fit gap-1 rounded-tile border border-white/5 bg-card p-1">
      {RANGES.map((days) => (
        <Link
          key={days}
          href={`/admin?range=${days}`}
          aria-current={days === active ? "page" : undefined}
          className={cn(
            "flex min-h-9 items-center rounded-[8px] px-3.5 text-[13px] font-medium transition-colors",
            days === active ? "bg-primary text-white" : "text-muted hover:bg-tile hover:text-fg",
          )}
        >
          {days} дней
        </Link>
      ))}
    </nav>
  );
}

/** Stat tile: label · value · delta vs the previous period of equal length. */
export function StatTile({
  icon: Icon,
  label,
  value,
  previous,
  hint,
  hero,
  days,
}: {
  icon: IconType;
  label: string;
  value: number | string;
  previous?: number;
  hint?: string;
  hero?: boolean;
  days?: number;
}) {
  const numeric = typeof value === "number";
  let delta: { text: string; up: boolean } | null = null;
  if (numeric && previous !== undefined) {
    if (previous === 0) {
      delta = value > 0 ? { text: "новое", up: true } : null;
    } else {
      const change = Math.round(((value - previous) / previous) * 100);
      delta = { text: `${change > 0 ? "+" : ""}${change}%`, up: change >= 0 };
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-card border border-white/5 bg-card p-5">
      <p className="flex items-center gap-2 text-[13px] font-medium text-muted">
        <Icon aria-hidden className="size-4 text-primary" />
        {label}
      </p>
      <p className={cn("truncate font-semibold tracking-tight text-fg", hero ? "text-5xl" : "text-[32px]")}>
        {numeric ? (value >= 10_000 ? compact.format(value) : number.format(value)) : value}
      </p>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-faint">
        {delta && (
          <span className={cn("inline-flex items-center gap-0.5", delta.up ? "text-[#34c759]" : "text-[#ff6b6b]")}>
            {delta.up ? <RiArrowUpLine aria-hidden className="size-3.5" /> : <RiArrowDownLine aria-hidden className="size-3.5" />}
            {delta.text}
            <span className="sr-only">{delta.up ? "рост" : "снижение"}</span>
          </span>
        )}
        {delta && days && <span>vs пред. {days} дн.</span>}
        {hint && <span>{hint}</span>}
      </p>
    </div>
  );
}

/** Ranked list with proportional bars (one hue — the bars encode magnitude only). */
export function RankList({
  items,
  total,
  empty = "Пока нет данных",
}: {
  items: { label: string; detail?: string; views: number }[];
  total: number;
  empty?: string;
}) {
  if (items.length === 0) {
    return <p className="py-6 text-center text-[13px] font-medium text-faint">{empty}</p>;
  }
  const max = Math.max(...items.map((item) => item.views));

  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="min-w-0 truncate font-medium text-soft">
              {item.label}
              {item.detail && <span className="ml-1.5 text-xs text-faint">{item.detail}</span>}
            </span>
            <span className="shrink-0 tabular-nums text-muted">
              <strong className="font-semibold text-fg">{number.format(item.views)}</strong>
              {total > 0 && <span className="ml-1.5 text-xs text-faint">{Math.round((item.views / total) * 100)}%</span>}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-icon">
            <div className="h-full rounded-full bg-primary" style={{ width: `${(item.views / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ol>
  );
}

const visitTime = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: ANALYTICS_TIME_ZONE,
});

const DEVICE_LABEL: Record<string, string> = { desktop: "Компьютер", mobile: "Телефон", tablet: "Планшет" };

export function RecentVisits({
  visits,
}: {
  visits: { id: number; at: string; path: string; location: string; device: string; browser: string; os: string; referrer: string | null }[];
}) {
  if (visits.length === 0) {
    return <p className="py-6 text-center text-[13px] font-medium text-faint">Посещений пока нет</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-[13px]">
        <thead className="text-xs text-faint">
          <tr>
            <th className="pb-2 pr-3 font-medium">Время</th>
            <th className="pb-2 pr-3 font-medium">Страница</th>
            <th className="pb-2 pr-3 font-medium">Откуда</th>
            <th className="pb-2 pr-3 font-medium">Устройство</th>
            <th className="pb-2 font-medium">Источник</th>
          </tr>
        </thead>
        <tbody className="text-soft">
          {visits.map((visit) => (
            <tr key={visit.id} className="border-t border-line">
              <td className="whitespace-nowrap py-2 pr-3 tabular-nums text-muted">{visitTime.format(new Date(visit.at))}</td>
              <td className="py-2 pr-3 font-medium text-fg">{visit.path}</td>
              <td className="py-2 pr-3">{visit.location}</td>
              <td className="whitespace-nowrap py-2 pr-3 text-muted">
                {DEVICE_LABEL[visit.device] ?? visit.device} · {visit.browser}, {visit.os}
              </td>
              <td className="py-2 text-muted">{visit.referrer ?? "прямой заход"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DEVICE_LABEL };
