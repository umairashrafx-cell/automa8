import { budgetSummary, getCountry } from "./budget";
import { type Enquiry } from "./enquiry";
import { confirmationEmail, notificationEmail } from "./enquiry.emails";

/**
 * Enquiries are stored in the Automa8 Supabase project. The table only allows anonymous INSERTs
 * (no reads, updates or deletes), so the publishable key is safe to ship as a default.
 * Override with SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY if the project changes.
 */
const DEFAULT_SUPABASE_URL = "https://ziizlkedxhpwrvydrrhx.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_04ZvufweHOQkw-RrqERstA_QAGL-I83";

export async function saveEnquiry(e: Enquiry): Promise<void> {
  const url = process.env["SUPABASE_URL"] || DEFAULT_SUPABASE_URL;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  const response = await fetch(`${url}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: e.name,
      email: e.email,
      company: e.company,
      services: e.services,
      country: getCountry(e.country)?.[1] ?? "",
      budget: e.budget ? budgetSummary(e.budget, e.country) : "",
      timeline: e.timeline,
      current_site: e.currentSite,
      project: e.project,
      source: "automa8.co",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed [${response.status}]: ${body}`);
  }
}

/** Keep user input out of header-like fields. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/** Whether emails can be sent (RESEND_API_KEY is set). */
export function emailConfigured() {
  return Boolean(process.env["RESEND_API_KEY"]);
}

const fromAddress = () =>
  process.env["ENQUIRY_FROM_EMAIL"] || "Automa8 Website <website@automa8.co>";
const inbox = () => process.env["ENQUIRY_TO_EMAIL"] || "hello@automa8.co";

async function sendEmail(message: {
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  from?: string;
}) {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: message.from ?? fromAddress(),
      to: [message.to],
      reply_to: message.replyTo,
      subject: singleLine(message.subject).slice(0, 200),
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed [${response.status}]: ${body}`);
  }
}

/** Notification to the Automa8 inbox. Replying goes to the person who enquired. */
export async function sendEnquiryEmail(e: Enquiry): Promise<void> {
  await sendEmail({
    to: inbox(),
    replyTo: e.email,
    subject: `New project enquiry — ${e.name}${e.company ? ` (${e.company})` : ""}`,
    ...notificationEmail(e),
  });
}

/** "Thanks, I'll be in touch" to the person who enquired. Replying goes to the Automa8 inbox. */
export async function sendConfirmationEmail(e: Enquiry): Promise<void> {
  await sendEmail({
    to: e.email,
    replyTo: inbox(),
    from: process.env["CONFIRMATION_FROM_EMAIL"] || "Umair at Automa8 <website@automa8.co>",
    ...confirmationEmail(e),
  });
}
