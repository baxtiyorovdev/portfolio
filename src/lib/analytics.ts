import "server-only";
import { and, count, countDistinct, desc, gte, isNotNull, lt, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";

/** Days are bucketed in the site owner's time zone (Uzbekistan, GMT+5). */
export const ANALYTICS_TIME_ZONE = "Asia/Tashkent";
export const RANGES = [7, 30, 90] as const;
export type RangeDays = (typeof RANGES)[number];

const pv = schema.pageViews;

export type Ranked = { label: string; views: number };
export type DayPoint = { day: string; views: number; visitors: number };

// ISO 3166-2 subdivisions of Uzbekistan (Vercel sends the part after "UZ-").
const UZ_REGIONS: Record<string, string> = {
  AN: "Андижанская обл.",
  BU: "Бухарская обл.",
  FA: "Ферганская обл.",
  JI: "Джизакская обл.",
  NG: "Наманганская обл.",
  NW: "Навоийская обл.",
  QA: "Кашкадарьинская обл.",
  QR: "Каракалпакстан",
  SA: "Самаркандская обл.",
  SI: "Сырдарьинская обл.",
  SU: "Сурхандарьинская обл.",
  TK: "Ташкент (город)",
  TO: "Ташкентская обл.",
  XO: "Хорезмская обл.",
};

const countryNames = new Intl.DisplayNames(["ru"], { type: "region" });

export function countryName(code: string | null): string {
  if (!code) return "Неизвестно";
  try {
    return countryNames.of(code) ?? code;
  } catch {
    return code;
  }
}

export function regionName(country: string | null, region: string | null): string | null {
  if (!region) return null;
  if (country === "UZ" && UZ_REGIONS[region]) return UZ_REGIONS[region];
  return country ? `${country}-${region}` : region;
}

/** Location line for one visit: "Карши, Кашкадарьинская обл., Узбекистан". */
export function locationLabel(country: string | null, region: string | null, city: string | null): string {
  return [city, regionName(country, region), countryName(country)].filter(Boolean).join(", ");
}

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: ANALYTICS_TIME_ZONE });

/** Every calendar day in the range (oldest first), so empty days still show. */
function daysBack(days: number): string[] {
  return Array.from({ length: days }, (_, i) => dayKey.format(new Date(Date.now() - (days - 1 - i) * 86_400_000)));
}

export async function getAnalytics(days: RangeDays) {
  const db = getDb();
  if (!db) return null;

  const now = Date.now();
  const since = new Date(now - days * 86_400_000);
  const previousSince = new Date(now - 2 * days * 86_400_000);
  const inRange = gte(pv.createdAt, since);
  const dayExpr = sql<string>`to_char(${pv.createdAt} at time zone ${ANALYTICS_TIME_ZONE}, 'YYYY-MM-DD')`;

  const ranked = (column: typeof pv.path | typeof pv.referrer | typeof pv.device | typeof pv.browser | typeof pv.os, where = inRange) =>
    db
      .select({ label: column, views: count() })
      .from(pv)
      .where(where)
      .groupBy(column)
      .orderBy(desc(count()))
      .limit(8);

  const [
    [totals],
    [previous],
    daily,
    countries,
    regions,
    pages,
    referrers,
    devices,
    browsers,
    systems,
    recent,
  ] = await Promise.all([
    db
      .select({ views: count(), visitors: countDistinct(pv.visitorId), countries: countDistinct(pv.country) })
      .from(pv)
      .where(inRange),
    db
      .select({ views: count(), visitors: countDistinct(pv.visitorId) })
      .from(pv)
      .where(and(gte(pv.createdAt, previousSince), lt(pv.createdAt, since))),
    db
      .select({ day: dayExpr, views: count(), visitors: countDistinct(pv.visitorId) })
      .from(pv)
      .where(inRange)
      .groupBy(sql`1`),
    db
      .select({ country: pv.country, views: count(), visitors: countDistinct(pv.visitorId) })
      .from(pv)
      .where(inRange)
      .groupBy(pv.country)
      .orderBy(desc(count()))
      .limit(8),
    db
      .select({ country: pv.country, region: pv.region, city: pv.city, views: count() })
      .from(pv)
      .where(and(inRange, isNotNull(pv.country)))
      .groupBy(pv.country, pv.region, pv.city)
      .orderBy(desc(count()))
      .limit(8),
    ranked(pv.path),
    ranked(pv.referrer, and(inRange, isNotNull(pv.referrer))),
    ranked(pv.device),
    ranked(pv.browser),
    ranked(pv.os),
    db.select().from(pv).orderBy(desc(pv.createdAt)).limit(20),
  ]);

  const byDay = new Map(daily.map((row) => [row.day, row]));
  const series: DayPoint[] = daysBack(days).map((day) => ({
    day,
    views: byDay.get(day)?.views ?? 0,
    visitors: byDay.get(day)?.visitors ?? 0,
  }));

  const toRanked = (rows: { label: string | null; views: number }[], fallback: string): Ranked[] =>
    rows.map((row) => ({ label: row.label ?? fallback, views: row.views }));

  return {
    days,
    totals: { views: totals.views, visitors: totals.visitors, countries: totals.countries },
    previous: { views: previous.views, visitors: previous.visitors },
    series,
    countries: countries.map((row) => ({
      code: row.country,
      label: countryName(row.country),
      views: row.views,
      visitors: row.visitors,
    })),
    regions: regions.map((row) => ({
      label: [row.city, regionName(row.country, row.region)].filter(Boolean).join(", ") || countryName(row.country),
      detail: countryName(row.country),
      views: row.views,
    })),
    pages: toRanked(pages, "/"),
    referrers: toRanked(referrers, "—"),
    devices: toRanked(devices, "—"),
    browsers: toRanked(browsers, "—"),
    systems: toRanked(systems, "—"),
    recent: recent.map((row) => ({
      id: row.id,
      at: row.createdAt.toISOString(),
      path: row.path,
      location: locationLabel(row.country, row.region, row.city),
      device: row.device,
      browser: row.browser,
      os: row.os,
      referrer: row.referrer,
    })),
  };
}

export type Analytics = NonNullable<Awaited<ReturnType<typeof getAnalytics>>>;
