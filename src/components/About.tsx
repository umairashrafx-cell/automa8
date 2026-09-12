import { ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/site";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2
            id="about-title"
            className="mt-5 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl"
          >
            Building useful technology, not unnecessary complexity.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-12">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Automa8 is an independent AI, web development and automation studio founded by{" "}
              <span className="text-foreground">Umair Ashraf</span>.
            </p>
            <p>
              We build digital experiences and business systems that are practical, scalable and
              designed around real workflows.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 text-[15px]">
            <span className="text-foreground">Pakistan · Working Globally</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              LinkedIn
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
