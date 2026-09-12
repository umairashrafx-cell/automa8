import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { title: "Discover", desc: "Understand the business and the problem." },
  { title: "Plan", desc: "Design the system and user experience." },
  { title: "Build", desc: "Develop the website, AI and integrations." },
  { title: "Automate", desc: "Connect workflows, APIs and operations." },
  { title: "Launch", desc: "Deploy, test and improve." },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="section-y border-t border-border">
      <div className="container-page">
        <SectionHeader id="process-title" eyebrow="Process" title="From idea to launch." />

        <ol className="mt-14 grid gap-x-8 md:mt-20 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.05}
              className="grid grid-cols-[48px_1fr] border-t border-border py-6 lg:block lg:py-0 lg:pt-6"
            >
              <span className="pt-1 text-sm tabular-nums text-faint lg:block lg:pt-0" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-10">
                <h3 className="text-xl leading-tight tracking-[-0.02em] text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
