import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";

/**
 * Sign-in for the admin area. One password, held in ADMIN_PASSWORD, and a signed cookie that
 * says "this browser got the password right" until it expires.
 *
 * There is no user table because there is one person: adding Supabase Auth would mean a client
 * SDK, a user list and RLS policies to guard data the browser never sees anyway. Everything the
 * admin area reads and writes goes through server functions holding the service role key, so the
 * cookie only has to gate those calls.
 *
 * Without ADMIN_PASSWORD set, the admin area stays switched off rather than open — a deployment
 * that forgets the variable refuses to sign anyone in.
 */

const COOKIE = "automa8_admin";
const SESSION_HOURS = 12;
/** Long enough that a guessed password is not a short string. */
const MIN_PASSWORD_LENGTH = 12;

const adminPassword = () => process.env["ADMIN_PASSWORD"] ?? "";

export function adminConfigured() {
  return adminPassword().length >= MIN_PASSWORD_LENGTH;
}

/**
 * The HMAC key for session cookies. ADMIN_SESSION_SECRET if it is set; otherwise derived from the
 * password, so setup needs one variable and changing the password signs everyone out.
 */
async function signingKey() {
  const secret = process.env["ADMIN_SESSION_SECRET"] || `automa8:${adminPassword()}`;
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

function base64url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string) {
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    new TextEncoder().encode(payload),
  );
  return base64url(signature);
}

/** Compare without leaking how much of the value matched, by comparing digests of equal length. */
async function sameValue(a: string, b: string) {
  const digest = async (value: string) =>
    new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
  const [left, right] = await Promise.all([digest(a), digest(b)]);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i]! ^ right[i]!;
  return diff === 0;
}

/** Whether the password is right. Wrong answers are slowed down a little to blunt guessing. */
export async function passwordAccepted(given: string) {
  if (!adminConfigured()) return false;
  const ok = await sameValue(given, adminPassword());
  if (!ok) await new Promise((resolve) => setTimeout(resolve, 400));
  return ok;
}

export async function startSession() {
  const expires = Date.now() + SESSION_HOURS * 3600_000;
  const payload = String(expires);
  setCookie(COOKIE, `${payload}.${await sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    path: "/",
    maxAge: SESSION_HOURS * 3600,
  });
}

export function endSession() {
  deleteCookie(COOKIE, { path: "/" });
}

/** Whether this request carries a session cookie this server signed and that hasn't expired. */
export async function signedIn() {
  if (!adminConfigured()) return false;
  const raw = getCookie(COOKIE);
  if (!raw) return false;

  const split = raw.lastIndexOf(".");
  if (split < 1) return false;
  const payload = raw.slice(0, split);
  const signature = raw.slice(split + 1);

  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  return sameValue(signature, await sign(payload));
}

/** Guard every admin server function with this before it touches any data. */
export async function requireAdmin() {
  if (!(await signedIn())) throw new Error("Not signed in");
}
