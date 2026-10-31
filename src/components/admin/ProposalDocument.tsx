import { Wordmark } from "@/components/Wordmark";
import { getCountry } from "@/lib/budget";
import { contact, SITE_URL } from "@/lib/site";
import { formatMoney, validUntil, type Proposal, type Totals } from "@/lib/proposal";

/**
 * The proposal as the client reads it — and as it prints. The site is already on the brand's
 * Paper surface, so this needs no theme of its own; `print:` rules in styles.css drop everything
 * around it so "Print" produces a clean PDF.
 */
export function ProposalDocument({
  proposal,
  totals,
  createdAt,
}: {
  proposal: Proposal;
  totals: Totals;
  createdAt: string;
}) {
  const { client, pricing } = proposal;
  const issued = createdAt ? new Date(createdAt) : new Date();
  const expires = validUntil(issued, pricing.validityDays);
  const delivery = pricing.delivery || `${totals.suggestedWeeks} weeks from advance`;
  const money = (usd: number) => formatMoney(usd, pricing);

  return (
    <article className="proposal-doc mx-auto w-full max-w-[860px] rounded-[18px] border border-border bg-card p-6 shadow-[0_10px_40px_rgba(14,22,31,0.06)] sm:p-10 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
      <header className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-foreground pb-5">
        <div>
          <Wordmark height={26} />
          <p className="mt-2 text-xs text-muted-foreground">Set it once. It keeps running.</p>
        </div>
        <div className="text-right text-[12.5px] text-muted-foreground">
          <span className="block font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            Payment proposal
          </span>
          <span className="mt-1 block font-mono text-[13px] text-foreground">
            {proposal.number}
          </span>
          <span className="mt-1.5 block">{longDate(issued)}</span>
          <span className="block">Valid until {longDate(expires)}</span>
        </div>
      </header>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Party
          label="Prepared for"
          name={client.company || client.name || "Client"}
          lines={[
            client.company && client.name ? client.name : "",
            client.email,
            client.phone,
            getCountry(client.country)?.[1] ?? "",
            client.site,
          ]}
        />
        <Party
          label="Prepared by"
          name="Automa8"
          lines={[contact.email, contact.whatsappDisplay, SITE_URL.replace("https://", "")]}
        />
      </div>

      <Section title={client.title || "Project"}>
        <div className="text-[15.5px] leading-[1.66]">
          {client.brief && <p className="mb-2.5">{client.brief}</p>}
          <p>
            This proposal covers everything listed below, delivered in {delivery}. Rates are quoted
            in {pricing.currency} and hold until {longDate(expires)}.
          </p>
          {proposal.services.length > 0 && (
            <ul className="mt-3.5 flex list-none flex-wrap gap-1.5 p-0">
              {proposal.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[12.5px] font-medium"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <Section title="Scope & platforms">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <Th>Item</Th>
                <Th align="right">Qty</Th>
                <Th align="right">Rate</Th>
                <Th align="right">Amount</Th>
              </tr>
            </thead>
            <tbody>
              {totals.groups.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-2.5 py-5 text-muted-foreground">
                    No scope items ticked yet.
                  </td>
                </tr>
              )}
              {totals.groups.map((group) => (
                <GroupRows key={group.name} group={group} money={money} />
              ))}
            </tbody>
          </table>
        </div>

        <dl className="ml-auto mt-5 flex max-w-[360px] flex-col gap-1.5">
          <Line label="Subtotal" value={money(totals.subtotalUsd)} />
          {totals.discountUsd > 0 && (
            <Line
              label={`Discount (${pricing.discount}%)`}
              value={`−${money(totals.discountUsd)}`}
            />
          )}
          {totals.rushUsd > 0 && (
            <Line label={`Rush delivery (${pricing.rush}%)`} value={money(totals.rushUsd)} />
          )}
          {totals.taxUsd > 0 && (
            <Line label={`Tax (${pricing.tax}%)`} value={money(totals.taxUsd)} />
          )}
          <div className="mt-1.5 flex items-baseline justify-between gap-4 border-t-2 border-foreground pt-3 font-display text-[19px] font-semibold tracking-[-0.02em]">
            <dt>Total</dt>
            <dd className="text-[21px] font-bold tabular-nums text-brand">
              {money(totals.totalUsd)}
            </dd>
          </div>
        </dl>
      </Section>

      {totals.care.length > 0 && (
        <Section title="Monthly care plan">
          <div className="rounded-[10px] border border-brand/25 border-l-[3px] border-l-signal-deep bg-brand/5 px-4 py-4">
            <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-brand">
              {money(totals.monthlyUsd)} / month
            </span>
            <ul className="mt-2 list-disc pl-5 text-[13.5px] text-muted-foreground">
              {totals.care.map((line) => (
                <li key={line.item.key} className="mb-0.5">
                  <strong className="font-medium text-foreground">{line.item.label}</strong> —{" "}
                  {line.item.note} ({money(line.amountUsd)}/mo)
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section title="Payment schedule">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <Th>Stage</Th>
                <Th align="right">Share</Th>
                <Th align="right">Amount</Th>
              </tr>
            </thead>
            <tbody>
              {totals.schedule.map((stage) => (
                <tr key={stage.label} className="border-b border-border last:border-0">
                  <td className="px-2.5 py-2.5">{stage.label}</td>
                  <td className="px-2.5 py-2.5 text-right tabular-nums">{stage.pct}%</td>
                  <td className="px-2.5 py-2.5 text-right tabular-nums">
                    {money(stage.amountUsd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {proposal.notes && (
        <Section title="Agreed on the call">
          <p className="whitespace-pre-wrap rounded-[10px] border border-copper/30 border-l-[3px] border-l-copper bg-copper/5 px-4 py-3.5 text-sm">
            {proposal.notes}
          </p>
        </Section>
      )}

      <Section title="How we work">
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            Work starts once the advance is received and we have access to the accounts involved.
          </li>
          <li>
            Delivery estimate: {delivery}. It assumes content, product data and approvals come back
            within two working days.
          </li>
          <li>
            Two rounds of revisions are included per deliverable. Anything beyond the scope above is
            quoted separately before we build it.
          </li>
          <li>
            Third-party costs — hosting, domains, WhatsApp message fees, AI usage, paid plugins and
            ad spend — are billed at actual cost and are not part of this total.
          </li>
          <li>You own the code, the accounts and the data. We hand over every login at the end.</li>
          <li>
            After handover you get 30 days of free bug fixes
            {totals.care.length > 0 ? "; the care plan above continues beyond that" : ""}.
          </li>
          <li>This quote is valid until {longDate(expires)}.</li>
        </ul>
      </Section>

      <Section title="Acceptance">
        <p className="text-sm text-muted-foreground">
          Sign and return, or simply reply “approved” to {contact.email} and we&apos;ll send the
          advance invoice.
        </p>
        <div className="mt-4 grid gap-7 sm:grid-cols-2">
          <Signature who={`${client.company || "Client"} — name, signature, date`} />
          <Signature who="Automa8 — name, signature, date" />
        </div>
      </Section>

      <footer className="mt-10 flex flex-wrap justify-between gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span>Automa8 — AI systems, websites &amp; business automation</span>
        <span>
          {contact.email} · {contact.whatsappDisplay} · {SITE_URL.replace("https://", "")}
        </span>
      </footer>
    </article>
  );
}

function GroupRows({
  group,
  money,
}: {
  group: Totals["groups"][number];
  money: (usd: number) => string;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="bg-secondary px-2.5 py-2 font-display text-[12.5px] font-semibold"
        >
          {group.name}
        </td>
      </tr>
      {group.lines.map((line) => (
        <tr key={line.item.key} className="border-b border-border">
          <td className="px-2.5 py-2.5 align-top">
            <span className="font-medium">{line.item.label}</span>
            <span className="block text-[12.5px] leading-snug text-muted-foreground">
              {line.item.note}
            </span>
          </td>
          <td className="whitespace-nowrap px-2.5 py-2.5 text-right align-top tabular-nums">
            {line.qty > 1 ? `${line.qty} × ${line.item.unit}` : line.item.unit}
          </td>
          <td className="whitespace-nowrap px-2.5 py-2.5 text-right align-top tabular-nums">
            {money(line.unitUsd)}
          </td>
          <td className="whitespace-nowrap px-2.5 py-2.5 text-right align-top tabular-nums">
            {money(line.amountUsd)}
          </td>
        </tr>
      ))}
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="mb-3.5 border-b border-border pb-1.5 font-display text-[15px] uppercase tracking-[0.09em] text-brand">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Party({ label, name, lines }: { label: string; name: string; lines: string[] }) {
  return (
    <div>
      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.11em] text-faint">
        {label}
      </div>
      <strong className="block font-display text-[16.5px]">{name}</strong>
      {lines.filter(Boolean).map((line) => (
        <span key={line} className="block text-[13.5px] text-muted-foreground">
          {line}
        </span>
      ))}
    </div>
  );
}

function Th({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "right" }) {
  return (
    <th
      scope="col"
      className={`border-b border-border px-2.5 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-faint ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm text-muted-foreground">
      <dt>{label}</dt>
      <dd className="whitespace-nowrap font-medium tabular-nums text-foreground">{value}</dd>
    </div>
  );
}

function Signature({ who }: { who: string }) {
  return (
    <div>
      <div className="h-10 border-b border-border-strong" />
      <div className="mt-1.5 text-xs text-faint">{who}</div>
    </div>
  );
}

function longDate(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
