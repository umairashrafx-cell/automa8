import { Bot, Code2, ShoppingBag, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const capabilities = [
  { icon: Code2, label: "Web Development" },
  { icon: Bot, label: "AI Systems" },
  { icon: Workflow, label: "Business Automation" },
  { icon: ShoppingBag, label: "E-commerce" },
];

export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="border-y border-line bg-surface/40 py-16 md:py-20"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal>
          <h2
            id="intro-title"
            className="font-display text-3xl font-semibold text-text sm:text-4xl"
          >
            From idea to working system.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-soft sm:text-lg">
            I combine web development, AI and automation to build digital systems around the way a
            business actually works.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.label} delay={i * 0.06}>
              <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-4 sm:px-5">
                <c.icon className="h-5 w-5 shrink-0 text-brand" aria-hidden strokeWidth={1.75} />
                <span className="text-sm font-medium text-text sm:text-[15px]">{c.label}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
