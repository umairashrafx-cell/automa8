import { useState } from "react";
import { createFileRoute, redirect, useRouter, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, FilePlus2, Loader2, Trash2 } from "lucide-react";
import {
  loadWorkspace,
  createProposal,
  setProposalStatus,
  deleteProposal,
} from "@/lib/proposal.functions";
import { PROPOSAL_STATUSES, STATUS_LABELS, formatUsd, type ProposalStatus } from "@/lib/proposal";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const result = await loadWorkspace();
    if (!result.ok && result.reason === "auth") throw redirect({ to: "/admin/login" });
    return result;
  },
  component: Dashboard,
});

function Dashboard() {
  const result = Route.useLoaderData();
  const router = useRouter();
  const create = useServerFn(createProposal);
  const setStatus = useServerFn(setProposalStatus);
  const remove = useServerFn(deleteProposal);
  const [busy, setBusy] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-lg rounded-[18px] border border-border bg-card p-8 text-center">
        <h1 className="text-xl">The proposal area isn&apos;t ready</h1>
        <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }

  const { proposals, enquiries, nextNumber } = result.data;
  const open = proposals.filter((p) => p.status === "draft" || p.status === "sent");
  const won = proposals.filter((p) => p.status === "accepted");
  const sum = (rows: typeof proposals) => rows.reduce((a, p) => a + p.totalUsd, 0);
  const enquiriesWithoutProposal = enquiries.filter(
    (e) => !proposals.some((p) => p.enquiryId === e.id),
  );

  async function startProposal(enquiryId: string) {
    setBusy(enquiryId || "new");
    const created = await create({ data: { enquiryId } }).catch(() => null);
    setBusy("");
    if (created?.ok) {
      await router.navigate({ to: "/admin/proposals/$id", params: { id: created.data.id } });
    }
  }

  async function changeStatus(id: string, status: string) {
    await setStatus({ data: { id, status } });
    await router.invalidate();
  }

  async function removeProposal(id: string) {
    if (confirmDelete !== id) {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete((current) => (current === id ? "" : current)), 5000);
      return;
    }
    setConfirmDelete("");
    await remove({ data: { id } });
    await router.invalidate();
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Proposals</p>
          <h1 className="mt-1 text-3xl tracking-[-0.03em]">Pipeline</h1>
        </div>
        <button
          type="button"
          onClick={() => startProposal("")}
          disabled={busy !== ""}
          className="btn btn-primary"
        >
          {busy === "new" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <FilePlus2 className="size-4" aria-hidden="true" />
          )}
          New proposal
          <span className="font-mono text-xs font-normal opacity-70">{nextNumber}</span>
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Proposals" value={String(proposals.length)} />
        <Kpi
          label={`Open pipeline · ${open.length} live`}
          value={formatUsd(sum(open))}
          tone="copper"
        />
        <Kpi label={`Accepted · ${won.length} won`} value={formatUsd(sum(won))} tone="brand" />
        <Kpi
          label="Win rate"
          value={proposals.length ? `${Math.round((won.length / proposals.length) * 100)}%` : "—"}
        />
      </div>

      {enquiriesWithoutProposal.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg">Enquiries waiting for a quote</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Straight from the contact form. Starting a proposal copies the client&apos;s details and
            loads the typical build for what they asked for.
          </p>
          <div className="mt-4 overflow-x-auto rounded-[10px] border border-border">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <Row head cells={["Received", "Who", "Needs", "Budget", ""]} />
              </thead>
              <tbody>
                {enquiriesWithoutProposal.slice(0, 12).map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/40"
                  >
                    <Cell className="whitespace-nowrap text-muted-foreground">
                      {shortDate(e.createdAt)}
                    </Cell>
                    <Cell>
                      <span className="font-medium">{e.company || e.name}</span>
                      <span className="block text-xs text-muted-foreground">{e.email}</span>
                    </Cell>
                    <Cell className="text-muted-foreground">{e.services.join(", ") || "—"}</Cell>
                    <Cell className="whitespace-nowrap text-muted-foreground">
                      {e.budget || "—"}
                    </Cell>
                    <Cell className="text-right">
                      <button
                        type="button"
                        onClick={() => startProposal(e.id)}
                        disabled={busy !== ""}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
                      >
                        {busy === e.id ? (
                          <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        )}
                        Create proposal
                      </button>
                    </Cell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg">All proposals</h2>
        {proposals.length === 0 ? (
          <div className="mt-4 rounded-[18px] border border-dashed border-border-strong p-10 text-center">
            <p className="font-display text-base">Nothing quoted yet</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Start one from an enquiry above, or press New proposal to write one from scratch.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-[10px] border border-border">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <Row
                  head
                  cells={["Number", "Client", "Project", "Total", "Status", "Updated", ""]}
                />
              </thead>
              <tbody>
                {proposals.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-border last:border-0 hover:bg-secondary/40"
                  >
                    <Cell className="whitespace-nowrap font-mono text-xs">{p.number}</Cell>
                    <Cell className="font-medium">{p.client.company || p.client.name || "—"}</Cell>
                    <Cell className="text-muted-foreground">{p.client.title || "—"}</Cell>
                    <Cell className="whitespace-nowrap tabular-nums">{formatUsd(p.totalUsd)}</Cell>
                    <Cell>
                      <select
                        value={p.status}
                        onChange={(e) => void changeStatus(p.id, e.target.value)}
                        aria-label={`Status of ${p.number}`}
                        className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(p.status)}`}
                      >
                        {PROPOSAL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </Cell>
                    <Cell className="whitespace-nowrap text-muted-foreground">
                      {shortDate(p.updatedAt)}
                    </Cell>
                    <Cell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to="/admin/proposals/$id"
                          params={{ id: p.id }}
                          className="rounded-[10px] border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => void removeProposal(p.id)}
                          className="rounded-[10px] border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                          aria-label={`Delete ${p.number}`}
                        >
                          {confirmDelete === p.id ? (
                            "Confirm"
                          ) : (
                            <Trash2 className="size-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </Cell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "brand" | "copper" }) {
  const colour = tone === "brand" ? "text-brand" : tone === "copper" ? "text-copper" : "";
  return (
    <div className="rounded-[10px] border border-border bg-card px-4 py-3.5">
      <div className={`font-display text-2xl font-bold tracking-[-0.03em] tabular-nums ${colour}`}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Row({ cells, head }: { cells: string[]; head?: boolean }) {
  return (
    <tr className="border-b border-border">
      {cells.map((c, i) => (
        <th
          key={i}
          scope="col"
          className={`bg-secondary/50 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground ${
            head && (i === 3 || i === cells.length - 1) ? "text-right" : "text-left"
          }`}
        >
          {c}
        </th>
      ))}
    </tr>
  );
}

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function statusClass(status: ProposalStatus) {
  if (status === "accepted") return "border-brand/40 text-brand";
  if (status === "sent") return "border-copper/50 text-copper";
  if (status === "declined") return "border-destructive/40 text-destructive";
  return "border-border text-muted-foreground";
}

function shortDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}
