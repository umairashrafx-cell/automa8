import { createServerFn } from "@tanstack/react-start";
import { proposalSchema, type Proposal, type RateCard } from "./proposal";
import type { EnquirySummary, SavedProposal } from "./proposal.server";

/**
 * Everything the admin screens call. Each one checks the session first, so a missing or expired
 * cookie can never reach the data — and reports that as `reason: "auth"` rather than an error,
 * so the screen can send the person to the sign-in page instead of showing a failure.
 */

export type Result<T> =
  { ok: true; data: T } | { ok: false; reason: "auth" | "config" | "error"; message: string };

/** Run `work` only for a signed-in admin with storage configured, turning throws into a result. */
async function guarded<T>(work: () => Promise<T>): Promise<Result<T>> {
  const [{ signedIn }, { storageConfigured }] = await Promise.all([
    import("./admin.server"),
    import("./proposal.server"),
  ]);
  if (!(await signedIn())) {
    return { ok: false, reason: "auth", message: "Please sign in again." };
  }
  if (!storageConfigured()) {
    return {
      ok: false,
      reason: "config",
      message: "SUPABASE_SERVICE_ROLE_KEY isn't set, so proposals can't be read or saved yet.",
    };
  }
  try {
    return { ok: true, data: await work() };
  } catch (error: unknown) {
    console.error(error);
    return { ok: false, reason: "error", message: "That didn't go through. Please try again." };
  }
}

export type Workspace = {
  proposals: SavedProposal[];
  enquiries: EnquirySummary[];
  rateCard: RateCard;
  /** The number a new proposal would get. */
  nextNumber: string;
};

/** Everything the dashboard shows, in one round trip. */
export const loadWorkspace = createServerFn({ method: "POST" }).handler(
  async (): Promise<Result<Workspace>> =>
    guarded(async () => {
      const { listProposals, listEnquiries, getRateCard } = await import("./proposal.server");
      const { nextNumber } = await import("./proposal");
      const [proposals, enquiries, rateCard] = await Promise.all([
        listProposals(),
        listEnquiries(),
        getRateCard(),
      ]);
      return {
        proposals,
        enquiries,
        rateCard,
        nextNumber: nextNumber(proposals.map((p) => p.number)),
      };
    }),
);

export type ProposalWorkspace = { proposal: SavedProposal; rateCard: RateCard };

export const loadProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<ProposalWorkspace>> =>
    guarded(async () => {
      const id = typeof data === "object" && data && "id" in data ? String(data.id) : "";
      const { getProposal, getRateCard } = await import("./proposal.server");
      const [proposal, rateCard] = await Promise.all([getProposal(id), getRateCard()]);
      if (!proposal) throw new Error(`No proposal ${id}`);
      return { proposal, rateCard };
    }),
  );

export const saveProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<SavedProposal>> =>
    guarded(async () => {
      const parsed = proposalSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "The proposal didn't validate");
      }
      const { saveProposal: save, getRateCard } = await import("./proposal.server");
      return save(parsed.data as Proposal, await getRateCard());
    }),
  );

/**
 * Start a proposal, optionally from an enquiry — the client's details, what they asked for and
 * their country's currency all come across, so the first screen is already filled in.
 */
export const createProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<SavedProposal>> =>
    guarded(async () => {
      const enquiryId =
        typeof data === "object" && data && "enquiryId" in data ? String(data.enquiryId) : "";
      const {
        listEnquiries,
        takenNumbers,
        getRateCard,
        saveProposal: save,
      } = await import("./proposal.server");
      const { emptyProposal, nextNumber, PRESETS } = await import("./proposal");

      const [taken, card] = await Promise.all([takenNumbers(), getRateCard()]);
      const enquiry = enquiryId
        ? (await listEnquiries(200)).find((e) => e.id === enquiryId)
        : undefined;

      const draft = emptyProposal(nextNumber(taken), enquiry?.countryCode ?? "PK");
      if (enquiry) {
        draft.enquiryId = enquiry.id;
        draft.client = {
          ...draft.client,
          company: enquiry.company,
          name: enquiry.name,
          email: enquiry.email,
          country: draft.client.country,
          site: enquiry.currentSite,
          timeline: (enquiry.timeline as Proposal["client"]["timeline"]) || "",
          brief: enquiry.project,
        };
        draft.services = enquiry.services.filter(
          (s): s is Proposal["services"][number] => s !== "Not sure yet",
        ) as Proposal["services"];
        // A readable working title, so the pipeline list says what each quote is for.
        const who = enquiry.company || enquiry.name;
        if (draft.services.length > 0) {
          draft.client.title = who
            ? `${draft.services.join(" & ")} for ${who}`
            : draft.services.join(" & ");
        }
        // Load the typical build for what they asked for, so there is something to price.
        const preset = PRESETS.find((p) => p.services.some((s) => draft.services.includes(s)));
        if (preset) {
          draft.items = { ...preset.items };
          draft.care = [...preset.care];
        }
      }
      return save(draft, card);
    }),
  );

export const setProposalStatus = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<null>> =>
    guarded(async () => {
      const body = data as { id?: unknown; status?: unknown };
      const { setProposalStatus: set } = await import("./proposal.server");
      const { PROPOSAL_STATUSES } = await import("./proposal");
      const status = String(body.status ?? "");
      if (!PROPOSAL_STATUSES.includes(status as (typeof PROPOSAL_STATUSES)[number])) {
        throw new Error(`Unknown status ${status}`);
      }
      await set(String(body.id ?? ""), status);
      return null;
    }),
  );

export const deleteProposal = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<null>> =>
    guarded(async () => {
      const id = typeof data === "object" && data && "id" in data ? String(data.id) : "";
      const { deleteProposal: remove } = await import("./proposal.server");
      await remove(id);
      return null;
    }),
  );

export const saveRateCard = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data)
  .handler(async ({ data }): Promise<Result<RateCard>> =>
    guarded(async () => {
      const raw = (data as { prices?: unknown })?.prices;
      if (!raw || typeof raw !== "object") throw new Error("No prices given");
      const { ITEMS } = await import("./proposal");
      // Only known items, only sane numbers — the card feeds straight into pricing.
      const prices: RateCard = {};
      for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
        if (ITEMS.has(key) && typeof value === "number" && Number.isFinite(value) && value >= 0) {
          // Six places, not two: a round figure typed in rupees or dong divides into a long decimal
          // in dollars, and at two places it comes back a unit or two off what was typed.
          prices[key] = Math.round(value * 1000000) / 1000000;
        }
      }
      const { saveRateCard: save } = await import("./proposal.server");
      await save(prices);
      return prices;
    }),
  );
