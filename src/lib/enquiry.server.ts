import { formatEnquiry, type Enquiry } from "./enquiry";

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
      budget: e.budget,
      project: e.project,
      source: "automa8.co",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed [${response.status}]: ${body}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Keep user input out of header-like fields. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function renderHtml(e: Enquiry) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
  ];
  if (e.company) rows.push(["Business", e.company]);
  if (e.budget) rows.push(["Budget", e.budget]);

  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111">
  <h2 style="margin:0 0 16px;font-size:18px">New project enquiry from automa8.co</h2>
  <table style="border-collapse:collapse;margin-bottom:20px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <p style="margin:0 0 6px;color:#666">What they want to build</p>
  <p style="margin:0;white-space:pre-wrap">${escapeHtml(e.project)}</p>
</div>`;
}

/** Whether an email notification can be sent (RESEND_API_KEY is set). */
export function emailConfigured() {
  return Boolean(process.env["RESEND_API_KEY"]);
}

/** Optional notification email via Resend. */
export async function sendEnquiryEmail(e: Enquiry): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const to = process.env["ENQUIRY_TO_EMAIL"] || "hello@automa8.co";
  const from = process.env["ENQUIRY_FROM_EMAIL"] || "Automa8 Website <website@automa8.co>";
  const subject = singleLine(
    `New project enquiry — ${e.name}${e.company ? ` (${e.company})` : ""}`,
  ).slice(0, 200);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: e.email,
      subject,
      text: `New project enquiry from automa8.co\n\n${formatEnquiry(e)}`,
      html: renderHtml(e),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed [${response.status}]: ${body}`);
  }
}
