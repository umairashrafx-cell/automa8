import { z } from "zod";

/** Shared by the contact form and the server so both validate the same way. */
export const BUDGETS = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please use a valid email address.").max(200),
  company: z.string().trim().max(200).default(""),
  budget: z.union([z.enum(BUDGETS), z.literal("")]).default(""),
  project: z.string().trim().min(1, "Tell me a little about the project.").max(3000),
  /** Honeypot: hidden from people, often filled in by bots. Must stay empty. */
  website: z.string().max(0).default(""),
});

export type Enquiry = z.infer<typeof enquirySchema>;

export type EnquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; message: string }
  | { ok: false; reason: "unavailable" };

export function formatEnquiry(e: {
  name: string;
  email: string;
  company: string;
  budget: string;
  project: string;
}) {
  const lines = [`Name: ${e.name}`, `Email: ${e.email}`];
  if (e.company) lines.push(`Business: ${e.company}`);
  if (e.budget) lines.push(`Budget: ${e.budget}`);
  lines.push("", "What they want to build:", e.project);
  return lines.join("\n");
}
