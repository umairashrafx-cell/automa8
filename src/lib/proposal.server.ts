import { budgetLabel, COUNTRIES, currencyFor } from "./budget";
import { computeTotals, type Proposal, type RateCard } from "./proposal";

/**
 * Reading and writing proposals, the rate card and the enquiry list.
 *
 * These tables have row level security on and no policies, so only the service role can touch
 * them. That key lives on the server and never reaches the browser — every call here runs inside
 * a server function that has already checked the admin session.
 */

const DEFAULT_SUPABASE_URL = "https://ziizlkedxhpwrvydrrhx.supabase.co";

function config() {
  const url = process.env["SUPABASE_URL"] || DEFAULT_SUPABASE_URL;
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  return { url, key };
}

/** Whether the admin area can reach its data (the service role key is set). */
export function storageConfigured() {
  return Boolean(config().key);
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { url, key } = config();
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Supabase ${init.method ?? "GET"} ${path} failed [${response.status}]: ${body}`,
    );
  }
  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

/* -------------------------------------------------------------------------- proposals */

type ProposalRecord = {
  id: string;
  number: string;
  status: string;
  enquiry_id: string;
  client: Proposal["client"];
  services: string[];
  items: Record<string, number>;
  care: string[];
  overrides: Record<string, number>;
  pricing: Proposal["pricing"];
  notes: string;
  total_usd: string | number;
  monthly_usd: string | number;
  created_at: string;
  updated_at: string;
};

/** A proposal as the admin screens use it: the saved form plus what it is worth and when. */
export type SavedProposal = Proposal & {
  id: string;
  totalUsd: number;
  monthlyUsd: number;
  createdAt: string;
  updatedAt: string;
};

function fromRecord(r: ProposalRecord): SavedProposal {
  return {
    id: r.id,
    number: r.number,
    status: r.status as Proposal["status"],
    enquiryId: r.enquiry_id ?? "",
    client: r.client,
    services: r.services as Proposal["services"],
    items: r.items ?? {},
    care: r.care ?? [],
    overrides: r.overrides ?? {},
    pricing: r.pricing,
    notes: r.notes ?? "",
    totalUsd: Number(r.total_usd) || 0,
    monthlyUsd: Number(r.monthly_usd) || 0,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function listProposals(): Promise<SavedProposal[]> {
  const rows = await request<ProposalRecord[]>(
    "proposals?select=*&order=updated_at.desc&limit=500",
  );
  return rows.map(fromRecord);
}

export async function getProposal(id: string): Promise<SavedProposal | null> {
  const rows = await request<ProposalRecord[]>(
    `proposals?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
  );
  return rows[0] ? fromRecord(rows[0]) : null;
}

/** Create or update, pricing it on the way so the stored totals always match the saved scope. */
export async function saveProposal(proposal: Proposal, card: RateCard): Promise<SavedProposal> {
  const totals = computeTotals(proposal, card);
  const body = {
    number: proposal.number,
    status: proposal.status,
    enquiry_id: proposal.enquiryId,
    client: proposal.client,
    services: proposal.services,
    items: proposal.items,
    care: proposal.care,
    overrides: proposal.overrides,
    pricing: proposal.pricing,
    notes: proposal.notes,
    total_usd: totals.totalUsd,
    monthly_usd: totals.monthlyUsd,
    updated_at: new Date().toISOString(),
  };

  const rows = proposal.id
    ? await request<ProposalRecord[]>(`proposals?id=eq.${encodeURIComponent(proposal.id)}`, {
        method: "PATCH",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(body),
      })
    : await request<ProposalRecord[]>("proposals", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify(body),
      });

  const saved = rows[0];
  if (!saved) throw new Error("Supabase returned no row after saving the proposal");
  return fromRecord(saved);
}

export async function setProposalStatus(id: string, status: string): Promise<void> {
  await request(`proposals?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  });
}

export async function deleteProposal(id: string): Promise<void> {
  await request(`proposals?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=minimal" },
  });
}

/** Every proposal number in use, so a new one never collides. */
export async function takenNumbers(): Promise<string[]> {
  const rows = await request<{ number: string }[]>("proposals?select=number&limit=1000");
  return rows.map((r) => r.number);
}

/* -------------------------------------------------------------------------- rate card */

export async function getRateCard(): Promise<RateCard> {
  const rows = await request<{ prices: RateCard }[]>("rate_card?select=prices&id=eq.true&limit=1");
  const prices = rows[0]?.prices;
  if (!prices || typeof prices !== "object") return {};
  // Keep only sane numbers: the card is read straight into pricing arithmetic.
  return Object.fromEntries(
    Object.entries(prices).filter(
      ([, value]) => typeof value === "number" && Number.isFinite(value) && value >= 0,
    ),
  );
}

export async function saveRateCard(prices: RateCard): Promise<void> {
  await request("rate_card", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: true, prices, updated_at: new Date().toISOString() }),
  });
}

/* -------------------------------------------------------------------------- enquiries */

export type EnquirySummary = {
  id: string;
  name: string;
  email: string;
  company: string;
  services: string[];
  /** The country name as the form stored it. */
  country: string;
  /** The country code, worked back from the name, for pricing in the right currency. */
  countryCode: string;
  /** The range the visitor picked, written out in their own currency. */
  budget: string;
  timeline: string;
  currentSite: string;
  project: string;
  createdAt: string;
};

export async function listEnquiries(limit = 100): Promise<EnquirySummary[]> {
  const rows = await request<Record<string, unknown>[]>(
    `enquiries?select=*&order=created_at.desc&limit=${limit}`,
  );
  return rows.map((r) => {
    const country = String(r["country"] ?? "");
    const countryCode = COUNTRIES.find(([, name]) => name === country)?.[0] ?? "OTHER";
    return {
      id: String(r["id"] ?? ""),
      name: String(r["name"] ?? ""),
      email: String(r["email"] ?? ""),
      company: String(r["company"] ?? ""),
      services: Array.isArray(r["services"]) ? (r["services"] as string[]) : [],
      country,
      countryCode,
      budget: budgetLabel(String(r["budget"] ?? ""), currencyFor(countryCode)),
      timeline: String(r["timeline"] ?? ""),
      currentSite: String(r["current_site"] ?? ""),
      project: String(r["project"] ?? ""),
      createdAt: String(r["created_at"] ?? ""),
    };
  });
}
