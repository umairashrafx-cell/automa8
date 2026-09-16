import { z } from "zod";

/** Shared by the contact form and the server so both validate the same way. */
export const BUDGETS = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
] as const;

export const PROJECT_TYPES = [
  "Website",
  "E-commerce store",
  "Mobile app",
  "AI agent / chatbot",
  "Business automation",
  "AI business system",
  "Not sure yet",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3+ months",
  "Just exploring",
] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please add your name.").max(120),
  email: z.string().trim().email("Please use a valid email address.").max(200),
  company: z.string().trim().max(200).default(""),
  services: z
    .array(z.enum(PROJECT_TYPES))
    .min(1, "Choose what you’d like to build.")
    .max(PROJECT_TYPES.length),
  budget: z.union([z.enum(BUDGETS), z.literal("")]).default(""),
  timeline: z.union([z.enum(TIMELINES), z.literal("")]).default(""),
  currentSite: z.string().trim().max(300).default(""),
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
  services: readonly string[];
  budget: string;
  timeline: string;
  currentSite: string;
  project: string;
}) {
  const lines = [`Name: ${e.name}`, `Email: ${e.email}`];
  if (e.company) lines.push(`Business: ${e.company}`);
  lines.push(...enquiryDetails(e).map(([k, v]) => `${k}: ${v}`));
  lines.push("", "What they want to build:", e.project);
  return lines.join("\n");
}

/** The project details picked in the form, as label/value pairs (empty ones left out). */
export function enquiryDetails(e: {
  services: readonly string[];
  budget: string;
  timeline: string;
  currentSite: string;
}): [string, string][] {
  const rows: [string, string][] = [];
  if (e.services.length) rows.push(["Needs", e.services.join(", ")]);
  if (e.budget) rows.push(["Budget", e.budget]);
  if (e.timeline) rows.push(["Timeline", e.timeline]);
  if (e.currentSite) rows.push(["Current website / app", e.currentSite]);
  return rows;
}
