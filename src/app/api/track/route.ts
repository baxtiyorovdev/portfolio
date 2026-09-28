import { cookies } from "next/headers";
import { getDb, schema } from "@/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { clientIp, hashValue } from "@/lib/admin-session";
import { parseUserAgent } from "@/lib/user-agent";

const noContent = () => new Response(null, { status: 204 });

/** Vercel sets these at the edge (clients can't spoof them); absent locally. */
function readGeo(headers: Headers) {
  const country = headers.get("x-vercel-ip-country")?.toUpperCase();
  const region = headers.get("x-vercel-ip-country-region")?.toUpperCase();
  const city = headers.get("x-vercel-ip-city");
  let decodedCity: string | null = null;
  try {
    decodedCity = city ? decodeURIComponent(city).slice(0, 80) : null;
  } catch {
    decodedCity = null;
  }
  return {
    country: country && /^[A-Z]{2}$/.test(country) ? country : null,
    region: region && /^[A-Z0-9]{1,3}$/.test(region) ? region : null,
    city: decodedCity,
  };
}

/** External referrers only, reduced to their host name. */
function referrerHost(value: unknown, ownHost: string | null): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const host = new URL(value).hostname.replace(/^www\./, "");
    return host && host !== ownHost?.replace(/^www\./, "").split(":")[0] ? host.slice(0, 200) : null;
  } catch {
    return null;
  }
}

/** Host of an Origin header; "null" or malformed origins never match. */
function originHost(origin: string): string | null {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
}

/** Records one page view (called by PageViewTracker via sendBeacon). */
export async function POST(request: Request) {
  const db = getDb();
  if (!db) return noContent();

  const host = request.headers.get("host");
  const origin = request.headers.get("origin");
  if (origin && host && originHost(origin) !== host) {
    return new Response(null, { status: 403 });
  }

  const ua = request.headers.get("user-agent") ?? "";
  const agent = parseUserAgent(ua);
  if (agent.isBot) return noContent();

  // Don't count the site owner browsing their own portfolio.
  if (await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value)) return noContent();

  let body: { path?: unknown; referrer?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path : "";
  if (!path.startsWith("/") || path.length > 200 || /^\/(admin|api)(\/|$)/.test(path)) {
    return new Response(null, { status: 400 });
  }

  const day = new Date().toISOString().slice(0, 10);
  const ip = await clientIp();

  try {
    await db.insert(schema.pageViews).values({
      path,
      referrer: referrerHost(body.referrer, host),
      ...readGeo(request.headers),
      device: agent.device,
      browser: agent.browser,
      os: agent.os,
      // Rotates daily: counts unique visitors per day without keeping IPs.
      visitorId: hashValue(`${day}|${ip}|${ua}`),
    });
  } catch (error) {
    console.error("[track] Failed to record page view:", error);
  }

  return noContent();
}
