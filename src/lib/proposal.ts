import { z } from "zod";
import { PROJECT_TYPES, TIMELINES } from "./enquiry";
import { COUNTRY_CODES, currencyFor, rateFor } from "./budget";

/**
 * What a payment proposal is made of: the scope catalogue, the prices behind it, and the
 * arithmetic. Shared by the builder, the printed document and the server, so a total is worked
 * out exactly one way.
 *
 * Every price is held in US dollars. A proposal carries the currency it was quoted in and the
 * rate used, so an old proposal keeps showing the figures the client actually saw.
 */

export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ScopeItem = {
  key: string;
  label: string;
  /** One line a client can read without asking what it means. */
  note: string;
  /** Starting price in US dollars, before the rate card overrides it. */
  usd: number;
  /** What one of them is, for quantities: "page", "workflow", "50 items". */
  unit: string;
};

export type ScopeGroup = {
  id: string;
  name: string;
  /** Enquiry project types this group is relevant to. */
  services: readonly ProjectType[];
  items: readonly ScopeItem[];
};

const group = (
  id: string,
  name: string,
  services: readonly ProjectType[],
  rows: readonly [string, string, string, number, string][],
): ScopeGroup => ({
  id,
  name,
  services,
  items: rows.map(([key, label, note, usd, unit]) => ({ key, label, note, usd, unit })),
});

export const SCOPE_GROUPS: readonly ScopeGroup[] = [
  group(
    "web",
    "Website & app build",
    ["Website", "E-commerce store", "Mobile app"],
    [
      ["next", "Next.js website", "Custom React build, deployed on Vercel", 650, "build"],
      ["wordpress", "WordPress website", "Theme build with editable pages", 450, "build"],
      ["shopify", "Shopify store", "Theme setup, collections, checkout", 700, "store"],
      ["woo", "WooCommerce store", "WordPress + Woo, fully configured", 600, "store"],
      ["webflow", "Webflow build", "Visual CMS site, client-editable", 550, "build"],
      ["framer", "Framer build", "Fast marketing site with CMS", 450, "build"],
      ["pages", "Extra page design & build", "Beyond the pages in the base build", 70, "page"],
      ["cms", "Headless CMS", "Sanity or Payload so the team edits content", 320, "setup"],
      ["dash", "Client dashboard & login", "Accounts, roles, protected area", 520, "module"],
      ["rn", "React Native app", "One codebase for iOS and Android", 1800, "app"],
      ["flutter", "Flutter app", "One codebase for iOS and Android", 1800, "app"],
      ["push", "Push notifications", "Firebase or OneSignal, segmented sends", 220, "setup"],
      [
        "submit",
        "App Store & Play Store submission",
        "Listings, assets, review handling",
        250,
        "launch",
      ],
    ],
  ),
  group(
    "pay",
    "Commerce & payments",
    ["E-commerce store", "Website", "Mobile app"],
    [
      ["stripe", "Stripe checkout", "Cards, wallets, receipts", 220, "setup"],
      ["paypal", "PayPal", "Alternate international checkout", 150, "setup"],
      ["localpay", "Local gateway", "JazzCash, Easypaisa, PayFast or SafePay", 280, "setup"],
      ["cod", "Cash on delivery flow", "Order confirmation and risk checks", 180, "setup"],
      ["catalog", "Product catalog upload", "Titles, variants, prices, images", 120, "50 items"],
      ["inventory", "Inventory sync", "Stock stays right across channels", 260, "setup"],
      ["ship", "Courier integration", "TCS, Leopards, Postex or DHL labels", 240, "setup"],
      ["invoice", "Automated invoices & receipts", "Branded PDF out of every order", 200, "setup"],
      [
        "subs",
        "Subscriptions & recurring billing",
        "Plans, renewals, failed-payment retries",
        300,
        "setup",
      ],
    ],
  ),
  group(
    "auto",
    "Automation platforms",
    ["Business automation", "AI business system"],
    [
      ["n8n", "n8n self-hosted", "Your own server, no per-task fees", 350, "setup"],
      ["make", "Make scenarios", "Hosted automation, quick to change", 200, "setup"],
      ["zapier", "Zapier zaps", "Simplest option for light volume", 160, "setup"],
      ["powerauto", "Power Automate", "For Microsoft 365 workplaces", 280, "setup"],
      ["flow", "Extra workflow", "Each additional automation beyond the base", 120, "workflow"],
      ["sheets", "Google Workspace", "Sheets, Gmail, Drive and Forms wired up", 150, "setup"],
      [
        "airtable",
        "Airtable base + interfaces",
        "Operations database your team can use",
        280,
        "base",
      ],
      ["notion", "Notion workspace", "Databases, templates and dashboards", 240, "setup"],
      [
        "supabase",
        "Supabase / Postgres backend",
        "Proper database with auth and an API",
        380,
        "setup",
      ],
      ["api", "Custom API integration", "Any system with an API we can reach", 300, "system"],
      ["scrape", "Data collection & scraping", "Scheduled, cleaned, deduplicated", 320, "source"],
      [
        "report",
        "Scheduled reports & dashboards",
        "Numbers land in inbox or Slack on time",
        260,
        "setup",
      ],
    ],
  ),
  group(
    "msg",
    "Messaging & CRM",
    ["Business automation", "AI agent / chatbot", "AI business system", "E-commerce store"],
    [
      ["wa", "WhatsApp Business API", "Official Cloud API, verified sender", 420, "setup"],
      [
        "wabot",
        "WhatsApp chatbot flows",
        "Menus, order updates, handover to a human",
        350,
        "setup",
      ],
      [
        "meta",
        "Instagram & Facebook DMs",
        "Auto-reply, comment capture, lead routing",
        300,
        "setup",
      ],
      ["tg", "Telegram bot", "Internal alerts or customer channel", 200, "setup"],
      ["slack", "Slack automation", "Alerts and approvals where the team works", 180, "setup"],
      ["emailauto", "Email automation", "Resend, Mailchimp or Klaviyo sequences", 260, "setup"],
      ["sms", "SMS via Twilio", "Order and appointment notifications", 200, "setup"],
      ["hubspot", "HubSpot CRM", "Pipeline, properties, deal automation", 400, "setup"],
      ["salesforce", "Salesforce", "Objects, flows and reports", 650, "setup"],
      ["pipedrive", "Pipedrive or Zoho CRM", "Lighter pipeline for small teams", 320, "setup"],
      ["booking", "Booking & calendar", "Cal.com or Calendly with reminders", 180, "setup"],
    ],
  ),
  group(
    "ai",
    "AI layer",
    ["AI agent / chatbot", "AI business system"],
    [
      ["chatbot", "Website AI chatbot", "Answers from your own content", 450, "bot"],
      ["rag", "Knowledge base (RAG)", "Your documents made searchable by the AI", 600, "setup"],
      ["agent", "Multi-step AI agent", "Decides and acts across your tools", 750, "agent"],
      ["voice", "AI voice agent", "Takes or makes phone calls, books jobs", 850, "agent"],
      [
        "docai",
        "Document & invoice extraction",
        "Reads PDFs and images into clean data",
        480,
        "setup",
      ],
      ["leadqual", "AI lead qualification", "Scores and routes every enquiry", 420, "setup"],
      [
        "aicontent",
        "AI content & social generation",
        "Drafts on brand, on a schedule",
        380,
        "setup",
      ],
      ["multiling", "Multilingual support", "Urdu, Arabic and English handled", 300, "setup"],
    ],
  ),
  group("launch", "Launch & growth", PROJECT_TYPES, [
    ["domain", "Domain, DNS & business email", "Connected and verified properly", 90, "setup"],
    ["hosting", "Hosting & deployment", "Vercel or VPS, with backups", 140, "setup"],
    ["seo", "On-page SEO setup", "Titles, schema, sitemap, search console", 280, "setup"],
    ["analytics", "Analytics & tracking", "GA4, Meta Pixel, conversion events", 160, "setup"],
    ["speed", "Performance pass", "Core Web Vitals into the green", 220, "pass"],
    ["brand", "Brand kit & visual identity", "Logo, colour, type, usage rules", 450, "kit"],
    ["copy", "Copywriting", "Written for search and for buying", 80, "page"],
    ["photo", "Product photo editing", "Clean, consistent, web-ready", 110, "20 photos"],
    ["training", "Team training & handover", "Live session, recorded for later", 150, "session"],
    ["sop", "Documentation & SOPs", "So the system survives staff changes", 180, "set"],
  ]),
];

/** Billed every month after handover, separately from the build. */
export const CARE_ITEMS: readonly ScopeItem[] = [
  {
    key: "m_host",
    label: "Hosting, updates & monitoring",
    note: "Patches, uptime checks, weekly backups",
    usd: 60,
    unit: "month",
  },
  {
    key: "m_auto",
    label: "Automation monitoring & fixes",
    note: "We watch the runs and repair failures",
    usd: 120,
    unit: "month",
  },
  {
    key: "m_ai",
    label: "AI usage managed",
    note: "Model costs, prompt tuning, quality checks",
    usd: 90,
    unit: "month",
  },
  {
    key: "m_content",
    label: "Content & social management",
    note: "Posts, emails and product updates",
    usd: 250,
    unit: "month",
  },
  {
    key: "m_support",
    label: "Priority support",
    note: "Same-day response on working days",
    usd: 150,
    unit: "month",
  },
];

/** Every scope and care item by key, for lookups that don't care which group it came from. */
export const ITEMS: ReadonlyMap<string, ScopeItem> = new Map([
  ...SCOPE_GROUPS.flatMap((g) => g.items.map((i) => [i.key, i] as const)),
  ...CARE_ITEMS.map((i) => [i.key, i] as const),
]);

/** A typical build, as a starting point. Quantities are the ones most projects need. */
export const PRESETS: readonly {
  name: string;
  services: readonly ProjectType[];
  items: Readonly<Record<string, number>>;
  care: readonly string[];
}[] = [
  {
    name: "Business website",
    services: ["Website"],
    items: {
      next: 1,
      pages: 3,
      cms: 1,
      copy: 3,
      domain: 1,
      hosting: 1,
      seo: 1,
      analytics: 1,
      training: 1,
    },
    care: ["m_host"],
  },
  {
    name: "E-commerce store",
    services: ["E-commerce store"],
    items: {
      shopify: 1,
      catalog: 3,
      localpay: 1,
      cod: 1,
      ship: 1,
      invoice: 1,
      photo: 2,
      domain: 1,
      analytics: 1,
      seo: 1,
    },
    care: ["m_host", "m_support"],
  },
  {
    name: "AI chatbot",
    services: ["AI agent / chatbot"],
    items: { chatbot: 1, rag: 1, wabot: 1, hosting: 1, training: 1, sop: 1 },
    care: ["m_ai", "m_support"],
  },
  {
    name: "Automation system",
    services: ["Business automation"],
    items: {
      n8n: 1,
      flow: 4,
      sheets: 1,
      airtable: 1,
      wa: 1,
      emailauto: 1,
      report: 1,
      sop: 1,
      training: 1,
    },
    care: ["m_auto"],
  },
  {
    name: "Full AI business system",
    services: ["AI business system", "Business automation", "AI agent / chatbot"],
    items: {
      next: 1,
      supabase: 1,
      n8n: 1,
      flow: 6,
      wa: 1,
      wabot: 1,
      rag: 1,
      agent: 1,
      leadqual: 1,
      report: 1,
      hosting: 1,
      sop: 1,
      training: 1,
    },
    care: ["m_auto", "m_ai", "m_support"],
  },
];

export const PROPOSAL_STATUSES = ["draft", "sent", "accepted", "declined"] as const;
export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number];

export const STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  declined: "Declined",
};

/** A stage of the payment schedule: what it is called and what share of the total it is. */
const milestoneSchema = z.object({
  label: z.string().trim().min(1).max(60),
  pct: z.number().min(0).max(100),
});

export const DEFAULT_MILESTONES = [
  { label: "Advance to start", pct: 50 },
  { label: "On build review", pct: 30 },
  { label: "On handover", pct: 20 },
] as const;

export const proposalSchema = z.object({
  id: z.string().uuid().optional(),
  number: z.string().trim().min(1).max(40),
  status: z.enum(PROPOSAL_STATUSES).default("draft"),
  enquiryId: z.string().trim().max(64).default(""),
  client: z.object({
    company: z.string().trim().max(200).default(""),
    name: z.string().trim().max(120).default(""),
    email: z.string().trim().max(200).default(""),
    phone: z.string().trim().max(60).default(""),
    country: z.enum(COUNTRY_CODES).default("PK"),
    site: z.string().trim().max(300).default(""),
    timeline: z.union([z.enum(TIMELINES), z.literal("")]).default(""),
    title: z.string().trim().max(200).default(""),
    brief: z.string().trim().max(3000).default(""),
  }),
  services: z.array(z.enum(PROJECT_TYPES)).max(PROJECT_TYPES.length).default([]),
  /** { itemKey: quantity } — only ticked items appear. */
  items: z.record(z.string(), z.number().int().min(1).max(999)).default({}),
  care: z.array(z.string()).max(20).default([]),
  /** { itemKey: price in USD } — a rate changed for this proposal only. */
  overrides: z.record(z.string(), z.number().min(0).max(1_000_000)).default({}),
  pricing: z.object({
    currency: z.string().trim().min(3).max(3).default("USD"),
    /** Units of `currency` per US dollar, frozen when the proposal was written. */
    rate: z.number().positive().max(1_000_000).default(1),
    discount: z.number().min(0).max(100).default(0),
    rush: z.number().min(0).max(100).default(0),
    tax: z.number().min(0).max(100).default(0),
    validityDays: z.number().int().min(1).max(365).default(14),
    delivery: z.string().trim().max(120).default(""),
    milestones: z
      .array(milestoneSchema)
      .min(1)
      .max(5)
      .default([...DEFAULT_MILESTONES]),
  }),
  notes: z.string().trim().max(4000).default(""),
});

export type Proposal = z.infer<typeof proposalSchema>;
/** { itemKey: price in USD } for every rate that differs from the catalogue's starting price. */
export type RateCard = Record<string, number>;

/** A blank proposal, priced in the currency of the client's country. */
export function emptyProposal(number: string, countryCode = "PK"): Proposal {
  const currency = currencyFor(countryCode);
  return proposalSchema.parse({
    number,
    client: { country: countryCode },
    pricing: { currency, rate: rateFor(currency) },
  });
}

/** The price one of an item costs, in US dollars: proposal override, then rate card, then catalogue. */
export function unitPrice(key: string, proposal: Proposal, card: RateCard): number {
  const override = proposal.overrides[key];
  if (override != null) return override;
  const carded = card[key];
  if (carded != null) return carded;
  return ITEMS.get(key)?.usd ?? 0;
}

export type ScopeLine = {
  item: ScopeItem;
  qty: number;
  unitUsd: number;
  amountUsd: number;
};

export type Totals = {
  groups: { name: string; lines: ScopeLine[]; subtotalUsd: number }[];
  care: ScopeLine[];
  subtotalUsd: number;
  discountUsd: number;
  rushUsd: number;
  taxUsd: number;
  totalUsd: number;
  monthlyUsd: number;
  itemCount: number;
  /** A delivery estimate from the size of the build, used when no timeline is written in. */
  suggestedWeeks: number;
  schedule: { label: string; pct: number; amountUsd: number }[];
  /** The payment stages should come to 100; anything else is shown as a warning. */
  milestoneTotal: number;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function computeTotals(proposal: Proposal, card: RateCard): Totals {
  const groups = SCOPE_GROUPS.map((g) => {
    const lines = g.items
      .filter((i) => proposal.items[i.key])
      .map((item) => {
        const qty = proposal.items[item.key] ?? 1;
        const unitUsd = unitPrice(item.key, proposal, card);
        return { item, qty, unitUsd, amountUsd: round2(unitUsd * qty) };
      });
    return { name: g.name, lines, subtotalUsd: round2(lines.reduce((a, l) => a + l.amountUsd, 0)) };
  }).filter((g) => g.lines.length > 0);

  const subtotalUsd = round2(groups.reduce((a, g) => a + g.subtotalUsd, 0));
  const { discount, rush, tax } = proposal.pricing;
  const discountUsd = round2((subtotalUsd * discount) / 100);
  const rushUsd = round2(((subtotalUsd - discountUsd) * rush) / 100);
  const taxable = round2(subtotalUsd - discountUsd + rushUsd);
  const taxUsd = round2((taxable * tax) / 100);
  const totalUsd = round2(taxable + taxUsd);

  const care = proposal.care
    .map((key) => ITEMS.get(key))
    .filter((item): item is ScopeItem => Boolean(item))
    .map((item) => {
      const unitUsd = unitPrice(item.key, proposal, card);
      return { item, qty: 1, unitUsd, amountUsd: unitUsd };
    });
  const monthlyUsd = round2(care.reduce((a, l) => a + l.amountUsd, 0));

  const milestones = proposal.pricing.milestones;
  const milestoneTotal = round2(milestones.reduce((a, m) => a + m.pct, 0));
  // The last stage takes the rounding, so the stages always add up to the total exactly.
  let allocated = 0;
  const schedule = milestones.map((m, i) => {
    const last = i === milestones.length - 1 && Math.abs(milestoneTotal - 100) < 0.01;
    const amountUsd = last ? round2(totalUsd - allocated) : round2((totalUsd * m.pct) / 100);
    allocated = round2(allocated + amountUsd);
    return { label: m.label, pct: m.pct, amountUsd };
  });

  const itemCount = groups.reduce((a, g) => a + g.lines.length, 0);

  return {
    groups,
    care,
    subtotalUsd,
    discountUsd,
    rushUsd,
    taxUsd,
    totalUsd,
    monthlyUsd,
    itemCount,
    // Roughly a week of delivery per $1,200 of build, kept inside one to sixteen weeks.
    suggestedWeeks: Math.min(16, Math.max(1, Math.ceil(subtotalUsd / 1200))),
    schedule,
    milestoneTotal,
  };
}

/** Format a US dollar amount in the proposal's own currency, at the rate it was quoted with. */
export function formatMoney(usd: number, pricing: Proposal["pricing"]) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(usd * pricing.rate);
}

/** Always US dollars, for pipeline figures that have to be comparable. */
export function formatUsd(usd: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

/** The date a quote stops being valid. */
export function validUntil(createdAt: string | Date, days: number) {
  const from = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return new Date(from.getTime() + days * 86_400_000);
}

/**
 * The next proposal number for this month, as AUT-YYMM-001. `taken` is every number already
 * used, so a gap is never reused and two proposals never collide.
 */
export function nextNumber(taken: readonly string[], now = new Date()) {
  const stamp = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
  // Numbers only move forward. A gap left behind by a deleted draft stays a gap, so the
  // sequence reads the way a bookkeeper expects and 002 is never issued after 004.
  let highest = 0;
  for (const number of taken) {
    const match = /^AUT-(\d{4})-(\d{3})$/.exec(number);
    if (match && match[1] === stamp) highest = Math.max(highest, Number(match[2]));
  }
  const n = highest + 1;
  if (n > 999) return `AUT-${stamp}-${Date.now().toString(36).slice(-3).toUpperCase()}`;
  return `AUT-${stamp}-${String(n).padStart(3, "0")}`;
}
