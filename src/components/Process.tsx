import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const steps = [
  { title: "Discover", desc: "Understand the business and the problem." },
  { title: "Plan", desc: "Design the system and user experience." },
  { title: "Build", desc: "Develop the website, AI and integrations." },
  { title: "Automate", desc: "Connect workflows, APIs and business operations." },
  { title: "Launch", desc: "Deploy, test and improve." },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="border-t border-line bg-surface/40 py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader id="process-title" eyebrow="Process" title="How I build." />

        <ol className="relative mt-14 md:mt-16 lg:grid lg:grid-cols-5 lg:gap-6">
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span
            className="absolute bottom-6 left-[19px] top-6 w-px bg-gradient-to-b from-brand/60 via-line-strong to-line lg:hidden"
            aria-hidden
          />
          <span
            className="absolute left-5 right-[calc(20%-39px)] top-5 hidden h-px bg-gradient-to-r from-brand/60 via-line-strong to-line lg:block"
            aria-hidden
          />

          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.07}
              className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0"
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-ink font-display text-xs font-semibold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5 lg:pr-2 lg:pt-7">
                <h3 className="font-display text-xl font-semibold text-text">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-soft">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
