import { Bot, Building2, Database, Globe, MessagesSquare, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const layers = [
  { icon: Globe, label: "Website", note: "Where customers find you and buy" },
  { icon: Database, label: "Database", note: "Orders, leads, products and customers" },
  { icon: Bot, label: "AI", note: "Answers, qualifies and assists" },
  { icon: Workflow, label: "Automation", note: "Moves work along without manual steps" },
  {
    icon: MessagesSquare,
    label: "WhatsApp / Email / CRM",
    note: "Reaches people where they already are",
  },
  { icon: Building2, label: "Business", note: "Sells, operates and serves better" },
];

export function Differentiator() {
  return (
    <section
      aria-labelledby="diff-title"
      className="relative isolate overflow-hidden border-t border-line py-20 md:py-28"
    >
      <div
        className="absolute right-[-10%] top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]"
        aria-hidden
      />

      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">
            The difference
          </p>
          <h2
            id="diff-title"
            className="mt-4 font-display text-4xl font-semibold leading-[1.05] text-text sm:text-5xl lg:text-6xl"
          >
            More than a website.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-soft sm:text-xl">
            I don&apos;t just build the front end. I connect the pieces behind it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol
            className="relative mx-auto max-w-md lg:ml-auto lg:mr-0"
            aria-label="How the pieces connect"
          >
            {/* Spine with a single travelling signal */}
            <span
              className="absolute bottom-7 left-[27px] top-7 w-px overflow-hidden bg-line-strong"
              aria-hidden
            >
              <span className="animate-signal absolute left-0 h-16 w-px bg-gradient-to-b from-transparent via-brand to-transparent" />
            </span>

            {layers.map((l, i) => {
              const last = i === layers.length - 1;
              return (
                <li key={l.label} className="relative flex items-center gap-4 py-2">
                  <span
                    className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${
                      last
                        ? "border-brand/60 bg-brand text-ink shadow-[0_0_40px_-6px_rgba(76,157,255,0.6)]"
                        : "border-line-strong bg-surface-2 text-text"
                    }`}
                  >
                    <l.icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <div
                    className={`flex-1 rounded-xl border px-4 py-3 ${
                      last ? "border-brand/30 bg-brand-soft" : "border-line bg-surface/80"
                    }`}
                  >
                    <div className="font-display text-[15px] font-semibold text-text">
                      {l.label}
                    </div>
                    <div className="text-[13px] text-text-soft">{l.note}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
