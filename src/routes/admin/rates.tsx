import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2 } from "lucide-react";
import { loadWorkspace, saveRateCard } from "@/lib/proposal.functions";
import { CARE_ITEMS, ITEMS, SCOPE_GROUPS, type RateCard, type ScopeItem } from "@/lib/proposal";

export const Route = createFileRoute("/admin/rates")({
  loader: async () => {
    const result = await loadWorkspace();
    if (!result.ok && result.reason === "auth") throw redirect({ to: "/admin/login" });
    return result;
  },
  component: RatesPage,
});

function RatesPage() {
  const result = Route.useLoaderData();

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-lg rounded-[18px] border border-border bg-card p-8 text-center">
        <h1 className="text-xl">The rate card isn&apos;t available</h1>
        <p className="mt-2 text-sm text-muted-foreground">{result.message}</p>
      </div>
    );
  }
  return <RateEditor saved={result.data.rateCard} />;
}

/**
 * Your standard prices, in US dollars. A rate changed here becomes the starting price on every
 * new proposal; changing one inside a proposal still only affects that proposal.
 */
function RateEditor({ saved }: { saved: RateCard }) {
  const save = useServerFn(saveRateCard);
  const [draft, setDraft] = useState<RateCard>(saved);
  const [state, setState] = useState<"clean" | "dirty" | "saving" | "error">("clean");
  const [adjust, setAdjust] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  const starting = (key: string) => ITEMS.get(key)?.usd ?? 0;
  const value = (key: string) => draft[key] ?? starting(key);

  function setPrice(key: string, usd: number) {
    setDraft((current) => ({ ...current, [key]: Math.max(0, usd) }));
    setState("dirty");
  }

  function adjustAll() {
    if (!adjust) return;
    const next: RateCard = {};
    for (const key of ITEMS.keys()) {
      next[key] = Math.max(0, Math.round(value(key) * (1 + adjust / 100) * 100) / 100);
    }
    setDraft(next);
    setState("dirty");
  }

  async function onSave() {
    setState("saving");
    const response = await save({ data: { prices: draft } }).catch(() => null);
    setState(response?.ok ? "clean" : "error");
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Rates</p>
          <h1 className="mt-1 text-3xl tracking-[-0.03em]">Rate card</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-[10px] border border-border bg-card py-1.5 pl-3.5 pr-1.5">
            <span className="whitespace-nowrap text-[13px] text-muted-foreground">
              Adjust all by
            </span>
            <input
              type="number"
              value={adjust}
              onChange={(e) => setAdjust(Number(e.target.value) || 0)}
              aria-label="Adjust every rate by percent"
              className="w-16 rounded-[6px] border border-input bg-background px-2 py-1.5 text-right font-mono text-xs outline-none focus:border-brand"
            />
            <span className="text-[13px] text-muted-foreground">%</span>
            <button
              type="button"
              onClick={adjustAll}
              className="rounded-[6px] border border-border px-2.5 py-1.5 text-xs transition-colors hover:border-brand hover:text-brand"
            >
              Apply
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                setTimeout(() => setConfirmReset(false), 5000);
                return;
              }
              setConfirmReset(false);
              setDraft({});
              setState("dirty");
            }}
            className="btn btn-secondary"
          >
            {confirmReset ? "Confirm reset" : "Reset to starting rates"}
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={state === "saving" || state === "clean"}
            className="btn btn-primary"
          >
            {state === "saving" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
            {state === "clean" && <Check className="size-4" aria-hidden="true" />}
            {state === "saving"
              ? "Saving…"
              : state === "clean"
                ? "Saved"
                : state === "error"
                  ? "Try again"
                  : "Save rate card"}
          </button>
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Prices are in US dollars; each proposal converts them to the client&apos;s currency. You
        don&apos;t need to fill in all of them — only the ones you actually sell. Anything you leave
        alone keeps its starting price and only counts when it&apos;s ticked on a proposal.
      </p>

      <div className="mt-7 flex flex-col gap-4">
        {SCOPE_GROUPS.map((group) => (
          <RateGroup
            key={group.id}
            name={group.name}
            sub={`${group.items.length} items · one-time`}
            items={group.items}
            value={value}
            starting={starting}
            setPrice={setPrice}
          />
        ))}
        <RateGroup
          name="Monthly care plan"
          sub={`${CARE_ITEMS.length} items · billed every month`}
          items={CARE_ITEMS}
          value={value}
          starting={starting}
          setPrice={setPrice}
        />
      </div>
    </>
  );
}

function RateGroup({
  name,
  sub,
  items,
  value,
  starting,
  setPrice,
}: {
  name: string;
  sub: string;
  items: readonly ScopeItem[];
  value: (key: string) => number;
  starting: (key: string) => number;
  setPrice: (key: string, usd: number) => void;
}) {
  return (
    <section className="rounded-[18px] border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base">{name}</h2>
      <p className="mb-3 mt-0.5 text-xs text-muted-foreground">{sub}</p>

      {items.map((item, i) => {
        const current = value(item.key);
        const changed = Math.abs(current - starting(item.key)) > 0.005;
        return (
          <div
            key={item.key}
            className={`grid grid-cols-[minmax(0,1fr)_124px] items-center gap-4 py-2.5 ${
              i === 0 ? "" : "border-t border-border"
            }`}
          >
            <label htmlFor={`rate-${item.key}`} className="min-w-0 cursor-pointer">
              <span className="block text-[15px] font-medium leading-snug">{item.label}</span>
              <span className="block text-xs leading-snug text-muted-foreground">{item.note}</span>
            </label>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-muted-foreground">$</span>
              <input
                id={`rate-${item.key}`}
                type="number"
                min={0}
                value={Math.round(current)}
                onChange={(e) => setPrice(item.key, Number(e.target.value) || 0)}
                className={`w-full min-w-0 rounded-[6px] border bg-background px-2 py-1.5 text-right font-mono text-xs outline-none focus:border-brand ${
                  changed ? "border-copper text-copper" : "border-input"
                }`}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
