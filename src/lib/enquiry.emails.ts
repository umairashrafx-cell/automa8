import { enquiryDetails, formatEnquiry, type Enquiry } from "./enquiry";
import { contact, SITE_URL, whatsappLink } from "./site";

/**
 * Email templates for enquiries. Email clients ignore stylesheets, so everything is inline, in
 * tables, and uses the light brand palette. Only imported by enquiry.server.ts.
 */

const brand = {
  paper: "#F6F8F9",
  card: "#FFFFFF",
  slate: "#0E161F",
  muted: "#52606B",
  border: "#DFE6EB",
  signal: "#00C9A7",
  signalText: "#04120E",
  ink: "#00705E",
};

const font = "'Instrument Sans',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

/** The shared frame: logo, white card, footer. `body` is trusted HTML built from escaped values. */
function layout({ preheader, body }: { preheader: string; body: string }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Automa8</title>
</head>
<body style="margin:0;padding:0;background:${brand.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.paper};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
      <tr><td style="padding:0 4px 20px;">
        <a href="${SITE_URL}" style="text-decoration:none;">
          <img src="${SITE_URL}/favicon/icon-192.png" width="36" height="36" alt="" style="vertical-align:middle;border:0;border-radius:8px;">
          <span style="vertical-align:middle;margin-left:10px;font-family:${font};font-size:20px;font-weight:600;letter-spacing:-0.02em;color:${brand.slate};">automa<span style="color:${brand.ink};">8</span></span>
        </a>
      </td></tr>
      <tr><td style="background:${brand.card};border:1px solid ${brand.border};border-radius:18px;padding:32px 28px;font-family:${font};font-size:15px;line-height:1.65;color:${brand.slate};">
        ${body}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-family:${font};font-size:12px;line-height:1.6;color:${brand.muted};">
        Automa8 · AI · Web · Automation<br>
        <a href="${SITE_URL}" style="color:${brand.muted};">automa8.co</a> ·
        <a href="mailto:${contact.email}" style="color:${brand.muted};">${contact.email}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function detailsTable(rows: [string, string][]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${brand.border};">
    ${rows
      .map(
        ([k, v]) =>
          `<tr>
            <td valign="top" style="padding:10px 16px 10px 0;border-bottom:1px solid ${brand.border};color:${brand.muted};font-size:14px;white-space:nowrap;width:1%;">${escapeHtml(k)}</td>
            <td valign="top" style="padding:10px 0;border-bottom:1px solid ${brand.border};font-size:14px;">${escapeHtml(v)}</td>
          </tr>`,
      )
      .join("")}
  </table>`;
}

function button(href: string, label: string) {
  return `<a href="${href}" style="display:inline-block;background:${brand.signal};color:${brand.signalText};font-weight:600;font-size:15px;text-decoration:none;padding:12px 22px;border-radius:10px;">${label}</a>`;
}

function eyebrow(text: string) {
  return `<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${brand.ink};font-weight:600;">${text}</p>`;
}

/** Sent to hello@automa8.co for every enquiry. */
export function notificationEmail(e: Enquiry) {
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
  ];
  if (e.company) rows.push(["Business", e.company]);
  rows.push(...enquiryDetails(e));

  const body = `
    ${eyebrow("New enquiry")}
    <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;letter-spacing:-0.02em;">${escapeHtml(e.name)}${e.company ? ` · ${escapeHtml(e.company)}` : ""}</h1>
    ${detailsTable(rows)}
    <p style="margin:24px 0 6px;color:${brand.muted};font-size:14px;">What they want to build</p>
    <p style="margin:0 0 28px;white-space:pre-wrap;">${escapeHtml(e.project)}</p>
    ${button(`mailto:${encodeURIComponent(e.email)}`, "Reply to " + escapeHtml(firstName(e.name) || "them"))}
    <p style="margin:12px 0 0;font-size:13px;color:${brand.muted};">Replying to this email also goes straight to them.</p>`;

  return {
    html: layout({ preheader: `${e.name} sent a project enquiry`, body }),
    text: `New project enquiry from automa8.co\n\n${formatEnquiry(e)}`,
  };
}

/**
 * Sent to the person who filled in the form. Only says what is true: it arrived and I'll reply.
 * Anyone can type any address into the form, so this never repeats free text (description,
 * links) — only the options they picked — to keep it useless for sending spam.
 */
export function confirmationEmail(e: Enquiry) {
  const name = firstName(e.name).slice(0, 40);
  const rows = enquiryDetails({ ...e, currentSite: "" });

  const body = `
    ${eyebrow("Inquiry received")}
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;letter-spacing:-0.02em;">Thank you${name ? `, ${escapeHtml(name)}` : ""}.</h1>
    <p style="margin:0 0 16px;">Your project inquiry has reached Automa8. I'll read through it and get back to you soon at this email address.</p>
    <p style="margin:0 0 24px;">If you'd like to add anything in the meantime, just reply to this email.</p>
    ${rows.length ? `<p style="margin:0 0 8px;color:${brand.muted};font-size:14px;">What you sent</p>${detailsTable(rows)}` : ""}
    <div style="height:28px;line-height:28px;">&nbsp;</div>
    ${button(whatsappLink("Hi, I've just sent a project inquiry through your website."), "Message on WhatsApp")}
    <p style="margin:24px 0 0;">Best,<br>Umair Ashraf<br><span style="color:${brand.muted};">Automa8</span></p>`;

  const text = [
    `Thank you${name ? `, ${name}` : ""}.`,
    "",
    "Your project inquiry has reached Automa8. I'll read through it and get back to you soon at this email address.",
    "If you'd like to add anything in the meantime, just reply to this email.",
    "",
    "What you sent:",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `WhatsApp: ${contact.whatsappDisplay}`,
    "",
    "Best,",
    "Umair Ashraf",
    "Automa8",
    SITE_URL,
  ].join("\n");

  return {
    subject: "Thanks for your inquiry — Automa8",
    html: layout({
      preheader: "Your inquiry has reached Automa8. I'll get back to you soon.",
      body,
    }),
    text,
  };
}
