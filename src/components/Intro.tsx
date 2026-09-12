import { Reveal } from "./Reveal";

const capabilities = ["Websites", "AI", "Automation", "Digital Systems"];

export function Intro() {
  return (
    <section
      aria-labelledby="intro-title"
      className="border-y border-border bg-card py-20 md:py-28"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <Reveal>
          <h2
            id="intro-title"
            className="text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl"
          >
            Built for real businesses.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            From e-commerce websites to AI-powered workflows, we design and build digital systems
            that solve real business problems.
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 border-l border-t border-border">
          {capabilities.map((c, i) => (
            <Reveal
              as="li"
              key={c}
              delay={i * 0.05}
              className="border-b border-r border-border px-5 py-6 sm:px-6 sm:py-8"
            >
              <span className="block text-xs tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 block text-lg font-medium tracking-tight text-foreground sm:text-xl">
                {c}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
