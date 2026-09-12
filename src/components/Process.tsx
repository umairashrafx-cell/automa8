import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { title: "Discover", desc: "Understand the business." },
  { title: "Design", desc: "Design the experience and system." },
  { title: "Build", desc: "Develop the product." },
  { title: "Connect", desc: "Integrate AI, APIs and automation." },
  { title: "Launch", desc: "Deploy and improve." },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="container-page">
        <SectionHeader id="process-title" eyebrow="Process" title="From idea to launch." />

        <ol className="mt-16 md:mt-20 lg:grid lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.06}
              className="relative flex gap-6 pb-10 last:pb-0 lg:block lg:pb-0 lg:pr-8"
            >
              {/* Timeline: vertical on mobile, horizontal on desktop */}
              <div className="relative flex flex-col items-center lg:flex-row" aria-hidden>
                <span className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground lg:mt-0" />
                {i < steps.length - 1 && (
                  <span className="absolute -bottom-[46px] left-1/2 top-4 w-px -translate-x-1/2 bg-border-strong lg:static lg:ml-3 lg:h-px lg:w-auto lg:flex-1 lg:translate-x-0" />
                )}
              </div>
              <div className="lg:mt-8">
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
