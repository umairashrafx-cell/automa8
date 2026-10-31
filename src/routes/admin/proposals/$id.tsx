import { useMemo, useState } from "react";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Check, Loader2, Printer } from "lucide-react";
import { loadProposal, saveProposal } from "@/lib/proposal.functions";
import { ProposalDocument } from "@/components/admin/ProposalDocument";
import { COUNTRIES, currencyFor, rateFor } from "@/lib/budget";
import { PROJECT_TYPES, TIMELINES } from "@/lib/enquiry";
import {
  CARE_ITEMS,
  PRESETS,
  SCOPE_GROUPS,
  computeTotals,
  formatMoney,
  unitPrice,
  type Proposal,
  type RateCard,
  type ScopeItem,
} from "@/lib/proposal";

export const Route = createFileRoute("/admin/proposals/$id")({
  loader: async ({ params }) => {
    const result = await loadProposal({ data: { id: params.id } });
    if (!result.ok && result.reason === "auth") throw redirect({ to: "/admin/login" });
    return result;
  },
  component: BuilderPage,
});

function BuilderPage() {
  const result = Route.useLoaderData();

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-lg rounded-[18px] border border-border bg-card p-8 text-center">
        <h1 className="text-xl">This proposal didn&apos;t open</h1>
        <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
        <Link to="/admin" className="btn btn-secondary mt-6">
          Back to pipeline
        </Link>
      </div>
    );
  }

  return <Builder saved={result.data.proposal} card={result.data.rateCard} />;
}

type Saved = { id: string; createdAt: string } & Proposal;

function Builder({ saved, card }: { saved: Saved; card: RateCard }) {
  const save = useServerFn(saveProposal);
  const [proposal, setProposal] = useState<Proposal>(saved);
  const [tab, setTab] = useState<"build" | "doc">("build");
  const [state, setState] = useState<"clean" | "dirty" | "saving" | "error">("clean");

  const totals = useMemo(() => computeTotals(proposal, card), [proposal, card]);
  const money = (usd: number) => formatMoney(usd, proposal.pricing);

  /** Every edit goes through here, so "unsaved changes" can never be missed. */
  function edit(change: (draft: Proposal) => Proposal) {
    setProposal((current) => change(structuredClone(current)));
    setState("dirty");
  }

  async function onSave() {
    setState("saving");
    const response = await save({ data: { ...proposal, id: saved.id } }).catch(() => null);
    setState(response?.ok ? "clean" : "error");
  }

  function applyPreset(preset: (typeof PRESETS)[number]) {
    edit((d) => ({
      ...d,
      services: [...preset.services],
      items: { ...preset.items },
      care: [...preset.care],
      overrides: {},
    }));
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Pipeline
        </Link>
        <span className="font-mono text-xs text-muted-foreground">{proposal.number}</span>

        <div className="ml-auto flex items-center gap-1 rounded-full border border-border bg-card p-1">
          <TabButton active={tab === "build"} onClick={() => setTab("build")}>
            Builder
          </TabButton>
          <TabButton active={tab === "doc"} onClick={() => setTab("doc")}>
            Proposal
          </TabButton>
        </div>
      </div>

      {tab === "doc" ? (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 print:hidden">
            <p className="flex-1 text-sm text-muted-foreground">
              This is what the client sees. Print it to save a PDF worth sending.
            </p>
            <SaveButton state={state} onSave={onSave} />
            <button type="button" onClick={() => window.print()} className="btn btn-primary">
              <Printer className="size-4" aria-hidden="true" />
              Print / PDF
            </button>
          </div>
          <div className="print-area">
            <ProposalDocument proposal={proposal} totals={totals} createdAt={saved.createdAt} />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex min-w-0 flex-col gap-5">
            <Card
              step="01"
              title="Client"
              hint="Carried over from the enquiry where there was one."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Company / brand">
                  <Text
                    value={proposal.client.company}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, company: v } }))}
                  />
                </Field>
                <Field label="Contact person">
                  <Text
                    value={proposal.client.name}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, name: v } }))}
                  />
                </Field>
                <Field label="Email">
                  <Text
                    type="email"
                    value={proposal.client.email}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, email: v } }))}
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <Text
                    value={proposal.client.phone}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, phone: v } }))}
                  />
                </Field>
                <Field label="Country" hint="Sets the currency this is quoted in.">
                  <Select
                    value={proposal.client.country}
                    onChange={(v) =>
                      edit((d) => {
                        const currency = currencyFor(v);
                        return {
                          ...d,
                          client: { ...d.client, country: v as Proposal["client"]["country"] },
                          pricing: { ...d.pricing, currency, rate: rateFor(currency) },
                        };
                      })
                    }
                    options={COUNTRIES.map(([code, name]) => [code, name])}
                  />
                </Field>
                <Field label="Current website or app">
                  <Text
                    value={proposal.client.site}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, site: v } }))}
                  />
                </Field>
                <Field label="Timeline">
                  <Select
                    value={proposal.client.timeline}
                    onChange={(v) =>
                      edit((d) => ({
                        ...d,
                        client: { ...d.client, timeline: v as Proposal["client"]["timeline"] },
                      }))
                    }
                    options={[["", "Not set"], ...TIMELINES.map((t) => [t, t] as [string, string])]}
                  />
                </Field>
                <Field label="Project title">
                  <Text
                    value={proposal.client.title}
                    onChange={(v) => edit((d) => ({ ...d, client: { ...d.client, title: v } }))}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="What the client asked for">
                    <textarea
                      value={proposal.client.brief}
                      onChange={(e) =>
                        edit((d) => ({ ...d, client: { ...d.client, brief: e.target.value } }))
                      }
                      rows={4}
                      className={inputClass + " min-h-24 py-2.5 leading-relaxed"}
                    />
                  </Field>
                </div>
              </div>
            </Card>

            <Card step="02" title="What we're building" hint="Relevant scope groups open below.">
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.filter((t) => t !== "Not sure yet").map((type) => {
                  const on = proposal.services.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        edit((d) => ({
                          ...d,
                          services: on
                            ? d.services.filter((s) => s !== type)
                            : [...d.services, type],
                        }))
                      }
                      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                        on
                          ? "border-brand bg-brand/8 text-foreground"
                          : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  Start from a typical build
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="rounded-[10px] border border-dashed border-border-strong px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-solid hover:border-copper hover:text-copper"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card
              step="03"
              title="Scope & platforms"
              hint="Rates come from your rate card — change one here and it applies to this proposal only."
            >
              <div className="flex flex-col gap-2.5">
                {SCOPE_GROUPS.map((group) => (
                  <Group
                    key={group.id}
                    name={group.name}
                    items={group.items}
                    relevant={group.services.some((s) => proposal.services.includes(s))}
                    proposal={proposal}
                    card={card}
                    money={money}
                    edit={edit}
                  />
                ))}
              </div>
            </Card>

            <Card step="04" title="Monthly care plan" hint="Billed every month after handover.">
              <div className="rounded-[10px] border border-border">
                {CARE_ITEMS.map((item, i) => {
                  const on = proposal.care.includes(item.key);
                  return (
                    <ItemRow
                      key={item.key}
                      item={item}
                      first={i === 0}
                      on={on}
                      qty={null}
                      price={unitPrice(item.key, proposal, card)}
                      rate={proposal.pricing.rate}
                      currency={proposal.pricing.currency}
                      onToggle={() =>
                        edit((d) => ({
                          ...d,
                          care: on ? d.care.filter((k) => k !== item.key) : [...d.care, item.key],
                        }))
                      }
                      onQty={() => {}}
                      onPrice={(usd) =>
                        edit((d) => ({ ...d, overrides: { ...d.overrides, [item.key]: usd } }))
                      }
                    />
                  );
                })}
              </div>
            </Card>

            <Card
              step="05"
              title="Money & terms"
              hint="Currency, adjustments and the payment split."
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Currency">
                  <Text
                    value={proposal.pricing.currency}
                    onChange={(v) =>
                      edit((d) => ({
                        ...d,
                        pricing: { ...d.pricing, currency: v.toUpperCase().slice(0, 3) },
                      }))
                    }
                  />
                </Field>
                <Field label="Rate per 1 USD">
                  <Num
                    value={proposal.pricing.rate}
                    step={0.01}
                    onChange={(v) =>
                      edit((d) => ({ ...d, pricing: { ...d.pricing, rate: Math.max(0.0001, v) } }))
                    }
                  />
                </Field>
                <Field label="Discount %">
                  <Num
                    value={proposal.pricing.discount}
                    onChange={(v) =>
                      edit((d) => ({ ...d, pricing: { ...d.pricing, discount: clamp(v) } }))
                    }
                  />
                </Field>
                <Field label="Rush delivery %">
                  <Num
                    value={proposal.pricing.rush}
                    onChange={(v) =>
                      edit((d) => ({ ...d, pricing: { ...d.pricing, rush: clamp(v) } }))
                    }
                  />
                </Field>
                <Field label="Tax / GST %">
                  <Num
                    value={proposal.pricing.tax}
                    onChange={(v) =>
                      edit((d) => ({ ...d, pricing: { ...d.pricing, tax: clamp(v) } }))
                    }
                  />
                </Field>
                <Field label="Quote valid for (days)">
                  <Num
                    value={proposal.pricing.validityDays}
                    onChange={(v) =>
                      edit((d) => ({
                        ...d,
                        pricing: {
                          ...d.pricing,
                          validityDays: Math.min(365, Math.max(1, Math.round(v))),
                        },
                      }))
                    }
                  />
                </Field>
                <div className="sm:col-span-2 lg:col-span-3">
                  <Field label="Delivery timeline">
                    <Text
                      value={proposal.pricing.delivery}
                      placeholder={`${totals.suggestedWeeks} weeks from advance`}
                      onChange={(v) =>
                        edit((d) => ({ ...d, pricing: { ...d.pricing, delivery: v } }))
                      }
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  Payment schedule
                </p>
                <div className="flex flex-col gap-2">
                  {proposal.pricing.milestones.map((stage, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[minmax(0,1fr)_84px_36px] items-center gap-2"
                    >
                      <Text
                        value={stage.label}
                        onChange={(v) =>
                          edit((d) => {
                            d.pricing.milestones[i]!.label = v;
                            return d;
                          })
                        }
                      />
                      <Num
                        value={stage.pct}
                        onChange={(v) =>
                          edit((d) => {
                            d.pricing.milestones[i]!.pct = clamp(v);
                            return d;
                          })
                        }
                      />
                      <button
                        type="button"
                        disabled={proposal.pricing.milestones.length < 2}
                        onClick={() =>
                          edit((d) => {
                            d.pricing.milestones.splice(i, 1);
                            return d;
                          })
                        }
                        aria-label={`Remove stage ${i + 1}`}
                        className="h-10 rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-40"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {Math.abs(totals.milestoneTotal - 100) > 0.01 && (
                  <p className="mt-2 text-xs text-destructive">
                    Stages add up to {totals.milestoneTotal}% — adjust so they total 100%.
                  </p>
                )}
                {proposal.pricing.milestones.length < 5 && (
                  <button
                    type="button"
                    onClick={() =>
                      edit((d) => {
                        d.pricing.milestones.push({ label: "Further stage", pct: 0 });
                        return d;
                      })
                    }
                    className="mt-2.5 rounded-[10px] border border-dashed border-border-strong px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-solid hover:text-foreground"
                  >
                    + Add stage
                  </button>
                )}
              </div>

              <div className="mt-6">
                <Field label="Notes for the client" hint="Appears above the terms on the proposal.">
                  <textarea
                    value={proposal.notes}
                    onChange={(e) => edit((d) => ({ ...d, notes: e.target.value }))}
                    rows={3}
                    className={inputClass + " min-h-20 py-2.5 leading-relaxed"}
                  />
                </Field>
              </div>
            </Card>
          </div>

          <aside className="flex flex-col gap-3 lg:sticky lg:top-24">
            <div className="rounded-[18px] border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                One-time project total
              </p>
              <div className="mt-1 font-display text-[34px] font-bold leading-none tracking-[-0.035em] tabular-nums">
                {totals.itemCount ? money(totals.totalUsd) : "—"}
              </div>
              <p className="mt-1.5 text-[13px] text-muted-foreground">
                {totals.itemCount
                  ? `${totals.itemCount} item${totals.itemCount > 1 ? "s" : ""} · suggested ${totals.suggestedWeeks} week${totals.suggestedWeeks > 1 ? "s" : ""}`
                  : "Tick scope items or load a typical build"}
              </p>

              <dl className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3 text-sm">
                <Row label="Scope subtotal" value={money(totals.subtotalUsd)} />
                {totals.discountUsd > 0 && (
                  <Row
                    label={`Discount ${proposal.pricing.discount}%`}
                    value={`−${money(totals.discountUsd)}`}
                    tone="copper"
                  />
                )}
                {totals.rushUsd > 0 && (
                  <Row label={`Rush ${proposal.pricing.rush}%`} value={money(totals.rushUsd)} />
                )}
                {totals.taxUsd > 0 && (
                  <Row label={`Tax ${proposal.pricing.tax}%`} value={money(totals.taxUsd)} />
                )}
                <Row label="Project total" value={money(totals.totalUsd)} strong />
                {totals.monthlyUsd > 0 && (
                  <Row label="Care plan" value={`${money(totals.monthlyUsd)} / month`} />
                )}
              </dl>

              <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3 text-[13px]">
                {totals.schedule.map((stage) => (
                  <div key={stage.label} className="flex justify-between gap-3">
                    <span className="truncate text-muted-foreground">
                      {stage.label} · {stage.pct}%
                    </span>
                    <span className="whitespace-nowrap tabular-nums">{money(stage.amountUsd)}</span>
                  </div>
                ))}
              </div>
            </div>

            <SaveButton state={state} onSave={onSave} full />
            <button
              type="button"
              onClick={() => setTab("doc")}
              className="btn btn-secondary w-full"
            >
              Open proposal
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Totals are stored in US dollars, so the pipeline stays comparable whatever currency a
              proposal was quoted in.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- scope group */

function Group({
  name,
  items,
  relevant,
  proposal,
  card,
  money,
  edit,
}: {
  name: string;
  items: readonly ScopeItem[];
  relevant: boolean;
  proposal: Proposal;
  card: RateCard;
  money: (usd: number) => string;
  edit: (change: (draft: Proposal) => Proposal) => void;
}) {
  const picked = items.filter((i) => proposal.items[i.key]);
  const [open, setOpen] = useState(relevant || picked.length > 0);
  const subtotal = picked.reduce(
    (a, i) => a + unitPrice(i.key, proposal, card) * (proposal.items[i.key] ?? 1),
    0,
  );

  return (
    <div className="overflow-hidden rounded-[10px] border border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2.5 bg-secondary/40 px-3.5 py-3 text-left transition-colors hover:bg-secondary"
      >
        <span
          className={`text-[10px] text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▶
        </span>
        <span className="min-w-0 flex-1 font-display text-[15px] font-semibold">{name}</span>
        {relevant && (
          <span className="shrink-0 rounded-full border border-copper/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-copper">
            relevant
          </span>
        )}
        <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
          {picked.length ? (
            <>
              <b className="font-medium text-brand">{picked.length}</b> · {money(subtotal)}
            </>
          ) : (
            `${items.length} options`
          )}
        </span>
      </button>

      {open && (
        <div>
          {items.map((item, i) => (
            <ItemRow
              key={item.key}
              item={item}
              first={i === 0}
              on={Boolean(proposal.items[item.key])}
              qty={proposal.items[item.key] ?? 1}
              price={unitPrice(item.key, proposal, card)}
              rate={proposal.pricing.rate}
              currency={proposal.pricing.currency}
              onToggle={() =>
                edit((d) => {
                  if (d.items[item.key]) delete d.items[item.key];
                  else d.items[item.key] = 1;
                  return d;
                })
              }
              onQty={(qty) =>
                edit((d) => {
                  d.items[item.key] = qty;
                  return d;
                })
              }
              onPrice={(usd) =>
                edit((d) => ({ ...d, overrides: { ...d.overrides, [item.key]: usd } }))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ItemRow({
  item,
  first,
  on,
  qty,
  price,
  rate,
  currency,
  onToggle,
  onQty,
  onPrice,
}: {
  item: ScopeItem;
  first: boolean;
  on: boolean;
  qty: number | null;
  price: number;
  rate: number;
  currency: string;
  onToggle: () => void;
  onQty: (qty: number) => void;
  onPrice: (usd: number) => void;
}) {
  return (
    <div
      className={`grid grid-cols-[20px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-3.5 py-2.5 sm:grid-cols-[20px_minmax(0,1fr)_104px_112px] ${
        first ? "" : "border-t border-border"
      } ${on ? "bg-brand/5" : ""}`}
    >
      <input
        type="checkbox"
        checked={on}
        onChange={onToggle}
        id={`item-${item.key}`}
        className="size-[18px] accent-signal"
      />
      <label htmlFor={`item-${item.key}`} className="min-w-0 cursor-pointer">
        <span className="block text-[15px] font-medium leading-snug">{item.label}</span>
        <span className="block text-xs leading-snug text-muted-foreground">{item.note}</span>
      </label>

      {qty === null ? (
        <span className="hidden sm:block" />
      ) : (
        <div
          className={`col-start-2 flex items-center gap-1.5 sm:col-start-3 ${on ? "" : "opacity-40"}`}
        >
          <input
            type="number"
            min={1}
            value={qty}
            disabled={!on}
            onChange={(e) => onQty(Math.max(1, Math.round(Number(e.target.value) || 1)))}
            aria-label={`Quantity for ${item.label}`}
            className="w-16 rounded-[6px] border border-input bg-background px-2 py-1.5 text-right font-mono text-xs outline-none focus:border-brand"
          />
          <span className="truncate font-mono text-[10px] text-muted-foreground">{item.unit}</span>
        </div>
      )}

      <div
        className={`col-start-2 flex items-center gap-1.5 sm:col-start-4 ${on ? "" : "opacity-40"}`}
      >
        <span className="font-mono text-[11px] text-muted-foreground">{currency}</span>
        <input
          type="number"
          min={0}
          value={Math.round(price * rate)}
          disabled={!on}
          onChange={(e) => onPrice(Math.max(0, Number(e.target.value) || 0) / rate)}
          aria-label={`Rate for ${item.label}`}
          className="w-full min-w-0 rounded-[6px] border border-input bg-background px-2 py-1.5 text-right font-mono text-xs outline-none focus:border-brand"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- small pieces */

const inputClass =
  "w-full min-w-0 rounded-[10px] border border-input bg-background px-3 py-2.5 text-[15px] outline-none transition-colors hover:border-border-strong focus:border-brand";

function Card({
  step,
  title,
  hint,
  children,
}: {
  step: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[18px] border border-border bg-card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[11px] tracking-[0.06em] text-brand">{step}</span>
        <h2 className="text-lg">{title}</h2>
        <p className="min-w-0 flex-1 text-[13px] text-muted-foreground">{hint}</p>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-[0.04em] text-muted-foreground">
        {label}
        {hint && <span className="ml-1.5 font-normal normal-case tracking-normal">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Text({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputClass}
    />
  );
}

function Num({
  value,
  onChange,
  step = 1,
}: {
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      step={step}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
      className={inputClass + " text-right font-mono text-sm tabular-nums"}
    />
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
      {options.map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3.5 py-1.5 font-display text-[13px] font-semibold transition-colors ${
        active ? "bg-signal text-[#04120e]" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function SaveButton({
  state,
  onSave,
  full,
}: {
  state: "clean" | "dirty" | "saving" | "error";
  onSave: () => void;
  full?: boolean;
}) {
  const label =
    state === "saving"
      ? "Saving…"
      : state === "clean"
        ? "Saved"
        : state === "error"
          ? "Try again"
          : "Save changes";
  return (
    <button
      type="button"
      onClick={onSave}
      disabled={state === "saving" || state === "clean"}
      className={`btn ${state === "error" ? "btn-secondary" : "btn-primary"} ${full ? "w-full" : ""}`}
    >
      {state === "saving" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {state === "clean" && <Check className="size-4" aria-hidden="true" />}
      {label}
    </button>
  );
}

function Row({
  label,
  value,
  strong,
  tone,
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: "copper";
}) {
  return (
    <div
      className={`flex justify-between gap-3 ${strong ? "font-semibold" : "text-muted-foreground"}`}
    >
      <dt>{label}</dt>
      <dd
        className={`whitespace-nowrap tabular-nums ${
          strong ? "text-brand" : tone === "copper" ? "text-copper" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));
