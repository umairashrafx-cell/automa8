import { createServerFn } from "@tanstack/react-start";
import { enquirySchema, type EnquiryResult } from "./enquiry";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<EnquiryResult> => {
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      // A filled honeypot means a bot: pretend it worked so it doesn't retry.
      if (parsed.error.issues.some((i) => i.path[0] === "website")) return { ok: true };
      return {
        ok: false,
        reason: "invalid",
        message: parsed.error.issues[0]?.message ?? "Please check the form.",
      };
    }

    const { saveEnquiry, sendEnquiryEmail, emailConfigured } = await import("./enquiry.server");
    const enquiry = parsed.data;

    // Store first (the source of truth), then notify by email if Resend is configured.
    // The visitor sees success if either one got the enquiry through.
    const [saved, emailed] = await Promise.allSettled([
      saveEnquiry(enquiry),
      emailConfigured() ? sendEnquiryEmail(enquiry) : Promise.reject(new Error("email off")),
    ]);

    if (saved.status === "rejected") console.error(saved.reason);
    if (emailed.status === "rejected" && emailConfigured()) console.error(emailed.reason);

    if (saved.status === "fulfilled" || emailed.status === "fulfilled") return { ok: true };
    return { ok: false, reason: "unavailable" };
  });
