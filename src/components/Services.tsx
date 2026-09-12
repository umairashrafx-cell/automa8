import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    title: "AI Agents",
    desc: "Customer support, sales assistants and WhatsApp agents.",
  },
  {
    title: "Business Automation",
    desc: "Workflows connecting forms, CRM, WhatsApp, email and operations.",
  },
  {
    title: "Websites & E-commerce",
    desc: "Business websites, online stores and custom web applications.",
  },
  {
    title: "AI Business Systems",
    desc: "Websites, databases, APIs, AI and automation working as one system.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-y border-t border-border bg-card"
    >
      <div className="container-page">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="More than a website."
          description="A website is only one part of the system. We connect the experience, data, AI and automation behind it."
        />

        <ul className="mt-14 grid border-l border-t border-border md:mt-20 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.05}
              className="group relative border-b border-r border-border p-8 transition-colors duration-300 hover:bg-background sm:p-10 lg:p-12"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm tabular-nums text-faint" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-brand opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  aria-hidden
                />
              </div>
              <h3 className="mt-16 text-2xl leading-tight tracking-[-0.025em] text-foreground lg:mt-24 lg:text-[28px]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-[1.7] text-muted-foreground">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
