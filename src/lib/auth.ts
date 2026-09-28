/**
 * Admin session tokens, signed with HMAC-SHA256 via Web Crypto so the same
 * code runs in middleware (edge) and on the server (Node).
 *
 * Token = base64url(JSON { exp }) + "." + base64url(signature). The signing
 * key mixes ADMIN_SESSION_SECRET with ADMIN_PASSWORD, so changing either one
 * signs every existing session out.
 */
export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of view) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Both env vars must be set, with a secret long enough to be unguessable. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32;
}

async function signingKey(): Promise<CryptoKey | null> {
  if (!isAdminConfigured()) return null;
  const material = `${process.env.ADMIN_SESSION_SECRET}:${process.env.ADMIN_PASSWORD}`;
  return crypto.subtle.importKey("raw", encoder.encode(material), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

export async function createSessionToken(): Promise<string> {
  const key = await signingKey();
  if (!key) throw new Error("Admin is not configured (ADMIN_PASSWORD / ADMIN_SESSION_SECRET).");
  const payload = toBase64Url(encoder.encode(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })));
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const key = await signingKey();
  if (!key) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  try {
    // subtle.verify compares in constant time.
    const valid = await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(payload));
    if (!valid) return false;
    const { exp } = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { exp?: unknown };
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}
