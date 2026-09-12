import { Fragment, type ReactNode } from "react";
import { Reveal } from "./Reveal";

type Layer = { label: string; parts: string[]; final?: boolean };

const layers: Layer[] = [
  { label: "Website", parts: ["Website"] },
  { label: "Database", parts: ["Database"] },
  { label: "AI + Automation", parts: ["AI", "Automation"] },
  { label: "APIs / WhatsApp / Email", parts: ["APIs", "WhatsApp", "Email"] },
  { label: "Business System", parts: ["Business System"], final: true },
];

export function SystemDiagram() {
  return (
    <section
      aria-labelledby="system-title"
      className="border-t border-border bg-card py-24 md:py-32 lg:py-40"
    >
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-24">
        <Reveal className="max-w-xl">
          <p className="eyebrow">The system</p>
          <h2
            id="system-title"
            className="mt-5 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
          >
            More than a website.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            A website is only one part of the system. We connect the experience, data, AI and
            automation behind it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="rounded-3xl border border-border bg-background p-5 sm:p-8 lg:p-10">
            <ol aria-label="How the system connects" className="flex flex-col items-stretch">
              {layers.map((layer, i) => (
                <Fragment key={layer.label}>
                  {i > 0 && <Connector />}
                  <li className="list-none">
                    <span className="sr-only">{layer.label}</span>
                    <div
                      className={`grid gap-2 ${
                        layer.parts.length === 3
                          ? "grid-cols-3"
                          : layer.parts.length === 2
                            ? "grid-cols-2"
                            : "grid-cols-1"
                      }`}
                      aria-hidden
                    >
                      {layer.parts.map((part) => (
                        <Node key={part} final={layer.final}>
                          {part}
                        </Node>
                      ))}
                    </div>
                  </li>
                </Fragment>
              ))}
            </ol>
            <figcaption className="mt-6 text-center text-[13px] text-muted-foreground">
              Every layer connected — so the business runs as one system.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function Node({ children, final }: { children: ReactNode; final?: boolean }) {
  return (
    <div
      className={`flex h-14 items-center justify-center rounded-2xl border px-3 text-center text-[11px] font-medium uppercase tracking-[0.16em] sm:h-16 sm:text-xs ${
        final
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-foreground shadow-[0_1px_2px_rgba(17,17,17,0.04)]"
      }`}
    >
      {children}
    </div>
  );
}

function Connector() {
  return (
    <li className="flex list-none justify-center py-1" aria-hidden>
      <svg width="12" height="28" viewBox="0 0 12 28" fill="none" className="text-border-strong">
        <line x1="6" y1="0" x2="6" y2="22" stroke="currentColor" strokeWidth="1" />
        <path d="M2.5 19.5 6 23l3.5-3.5" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </li>
  );
}
