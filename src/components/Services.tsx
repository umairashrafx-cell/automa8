import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    title: "Websites & E-commerce",
    desc: "Modern websites, online stores and custom web experiences.",
  },
  {
    title: "AI Systems",
    desc: "AI agents and intelligent customer experiences.",
  },
  {
    title: "Business Automation",
    desc: "Automated workflows connecting business tools and operations.",
  },
  {
    title: "Custom Digital Systems",
    desc: "Websites, databases, APIs, AI and automation connected into one system.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-border bg-card py-24 md:py-32 lg:py-40"
    >
      <div className="container-page">
        <SectionHeader id="services-title" eyebrow="Services" title="What we build" />

        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition-colors duration-300 hover:border-border-strong sm:p-9 lg:p-10">
                <span className="text-sm tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-16 lg:mt-24">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
