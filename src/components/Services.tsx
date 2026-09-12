import { Bot, Globe, Layers, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Customer support, sales assistants, WhatsApp agents and intelligent business assistants.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    desc: "Automated workflows connecting forms, CRM, WhatsApp, email, databases and business operations.",
  },
  {
    icon: Globe,
    title: "Websites & E-commerce",
    desc: "Modern business websites, online stores and custom web applications.",
  },
  {
    icon: Layers,
    title: "AI Business Systems",
    desc: "Complete systems combining websites, AI, databases, APIs and automation into one workflow.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-t border-line py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="What I build."
          description="Four ways I help businesses sell more, run smoother and serve customers better."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 sm:p-8">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface-2 text-brand">
                    <s.icon className="h-5 w-5" aria-hidden strokeWidth={1.75} />
                  </div>
                  <span className="font-display text-sm text-text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display sm:mt-8 text-xl font-semibold text-text sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-text-soft">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
