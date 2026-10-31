import { createServerFn } from "@tanstack/react-start";

/** Signing in and out of the admin area, and asking whether this browser is signed in. */

export type SignInResult = { ok: true } | { ok: false; message: string };

export const signIn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<SignInResult> => {
    const password =
      typeof data === "object" && data && "password" in data ? String(data.password) : "";
    const { adminConfigured, passwordAccepted, startSession } = await import("./admin.server");

    if (!adminConfigured()) {
      return { ok: false, message: "The admin area isn't set up yet — ADMIN_PASSWORD is missing." };
    }
    if (!(await passwordAccepted(password))) {
      return { ok: false, message: "That password doesn't match." };
    }
    await startSession();
    return { ok: true };
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const { endSession } = await import("./admin.server");
  endSession();
  return { ok: true as const };
});

export type AdminStatus = {
  signedIn: boolean;
  /** ADMIN_PASSWORD is set, so signing in is possible at all. */
  configured: boolean;
  /** SUPABASE_SERVICE_ROLE_KEY is set, so proposals can be read and written. */
  storageReady: boolean;
};

export const adminStatus = createServerFn({ method: "POST" }).handler(
  async (): Promise<AdminStatus> => {
    const [{ adminConfigured, signedIn }, { storageConfigured }] = await Promise.all([
      import("./admin.server"),
      import("./proposal.server"),
    ]);
    return {
      signedIn: await signedIn(),
      configured: adminConfigured(),
      storageReady: storageConfigured(),
    };
  },
);
