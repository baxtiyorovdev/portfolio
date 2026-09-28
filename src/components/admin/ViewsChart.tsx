"use client";

import { useId, useState, type KeyboardEvent } from "react";
import type { DayPoint } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const number = new Intl.NumberFormat("ru-RU");

function dayLabel(day: string, style: "short" | "long") {
  const date = new Date(`${day}T12:00:00Z`);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: style === "short" ? "short" : "long",
    ...(style === "long" ? { weekday: "short" } : {}),
    timeZone: "UTC",
  }).format(date);
}

/** Round the axis max up to a clean value with 4 even steps (0 / 5 / 10 / 15 / 20 …). */
function niceScale(max: number) {
  if (max <= 4) return { top: 4, step: 1 };
  const raw = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  return { top: step * 4, step };
}

/**
 * Daily page views as columns (single series → no legend; the title names it).
 * Hover or arrow keys show a tooltip; a table view carries every value too.
 */
export function ViewsChart({ series }: { series: DayPoint[] }) {
  const [active, setActive] = useState<number | null>(null);
  const tableId = useId();
  const max = Math.max(0, ...series.map((point) => point.views));
  const { top, step } = niceScale(max);
  const ticks = Array.from({ length: 5 }, (_, i) => i * step);
  const peakIndex = max > 0 ? series.findIndex((point) => point.views === max) : -1;
  const labelEvery = series.length <= 7 ? 1 : series.length <= 31 ? 5 : 15;
  const current = active !== null ? series[active] : null;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const last = series.length - 1;
    const index = active ?? last;
    const next =
      event.key === "ArrowLeft" ? Math.max(0, index - 1)
      : event.key === "ArrowRight" ? Math.min(last, index + 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
  }

  const total = series.reduce((sum, point) => sum + point.views, 0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-[240px] select-none pl-9">
        {/* Hairline grid + clean ticks */}
        {ticks.map((tick) => (
          <div
            key={tick}
            className="pointer-events-none absolute inset-x-0 left-9 border-t border-[#1f1f1f]"
            style={{ bottom: `${(tick / top) * 100}%` }}
          >
            <span className="absolute -left-9 -translate-y-1/2 text-[11px] font-medium tabular-nums text-faint">
              {number.format(tick)}
            </span>
          </div>
        ))}

        <div
          role="img"
          tabIndex={0}
          aria-label={`Просмотры по дням: всего ${number.format(total)} за ${series.length} дн., максимум ${number.format(max)}. Стрелками можно пройти по дням.`}
          aria-describedby={tableId}
          onKeyDown={onKeyDown}
          onFocus={() => setActive((value) => value ?? series.length - 1)}
          onBlur={() => setActive(null)}
          onPointerLeave={() => setActive(null)}
          className="absolute inset-y-0 left-9 right-0 flex items-end gap-[2px] rounded-[6px] outline-offset-4"
        >
          {series.map((point, index) => {
            const height = top > 0 ? (point.views / top) * 100 : 0;
            return (
              <div
                key={point.day}
                onPointerEnter={() => setActive(index)}
                className="relative flex h-full min-w-0 flex-1 items-end justify-center"
              >
                {index === peakIndex && (
                  <span
                    className="pointer-events-none absolute -translate-y-full pb-1 text-[11px] font-semibold tabular-nums text-soft"
                    style={{ bottom: `${height}%` }}
                  >
                    {number.format(point.views)}
                  </span>
                )}
                <span
                  className={cn(
                    "block w-full max-w-[24px] rounded-t-[4px] transition-colors duration-150",
                    active === index ? "bg-primary-hover" : "bg-primary",
                  )}
                  style={{ height: point.views > 0 ? `max(${height}%, 2px)` : 0 }}
                />
              </div>
            );
          })}
        </div>

        {current && active !== null && (
          <div
            role="status"
            className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-tile border border-white/[0.08] bg-tile px-3 py-2 shadow-[0_8px_24px_rgb(0_0_0/0.5)]"
            style={{ left: `calc(36px + (100% - 36px) * ${(active + 0.5) / series.length})` }}
          >
            <p className="whitespace-nowrap text-[11px] font-medium text-faint">{dayLabel(current.day, "long")}</p>
            <p className="mt-1 flex items-center gap-2 whitespace-nowrap text-sm">
              <span aria-hidden className="h-0.5 w-3 rounded-full bg-primary" />
              <strong className="font-semibold text-fg">{number.format(current.views)}</strong>
              <span className="text-[12px] text-muted">просмотров</span>
            </p>
            <p className="mt-0.5 whitespace-nowrap pl-5 text-[12px] text-muted">
              <strong className="font-semibold text-soft">{number.format(current.visitors)}</strong> посетителей
            </p>
          </div>
        )}
      </div>

      {/* Sparse date labels */}
      <div className="flex gap-[2px] pl-9">
        {series.map((point, index) => (
          <span key={point.day} className="relative min-w-0 flex-1 text-center">
            {(index % labelEvery === 0 || index === series.length - 1) && (
              <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-faint">
                {dayLabel(point.day, "short")}
              </span>
            )}
          </span>
        ))}
      </div>

      <details className="mt-5 text-[13px]">
        <summary className="w-fit cursor-pointer font-medium text-muted transition-colors hover:text-fg">
          Показать таблицей
        </summary>
        <div className="mt-3 max-h-64 overflow-auto rounded-tile border border-line">
          <table id={tableId} className="w-full text-left">
            <thead className="sticky top-0 bg-surface text-xs text-faint">
              <tr>
                <th className="px-3 py-2 font-medium">День</th>
                <th className="px-3 py-2 text-right font-medium">Просмотры</th>
                <th className="px-3 py-2 text-right font-medium">Посетители</th>
              </tr>
            </thead>
            <tbody className="tabular-nums text-soft">
              {[...series].reverse().map((point) => (
                <tr key={point.day} className="border-t border-line">
                  <td className="px-3 py-1.5">{dayLabel(point.day, "long")}</td>
                  <td className="px-3 py-1.5 text-right">{number.format(point.views)}</td>
                  <td className="px-3 py-1.5 text-right">{number.format(point.visitors)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
