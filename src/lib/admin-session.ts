import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, verifySessionToken } from "./auth";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * Guard for admin pages and server actions. Middleware already redirects
 * signed-out visitors, but every action re-checks — middleware alone is not
 * an authorization boundary.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function endAdminSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Constant-time password check (both sides hashed to equal-length digests). */
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!expected || !secret) return false;
  const a = createHmac("sha256", secret).update(input).digest();
  const b = createHmac("sha256", secret).update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Client IP as reported by Vercel's proxy (first x-forwarded-for hop). */
export async function clientIp(): Promise<string> {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || "unknown";
}

/** Short, salted, non-reversible fingerprint used instead of storing IPs. */
export function hashValue(value: string): string {
  const salt = process.env.ANALYTICS_SALT || process.env.ADMIN_SESSION_SECRET || "portfolio";
  return createHash("sha256").update(`${salt}|${value}`).digest("hex").slice(0, 32);
}
