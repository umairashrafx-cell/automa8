import { ArrowUpRight } from "lucide-react";
import { contact } from "@/lib/site";
import { Reveal } from "./Reveal";

const tech = ["OpenAI", "Claude", "n8n", "Supabase", "Next.js", "React", "APIs"];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section-y border-t border-border bg-card"
    >
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2
            id="about-title"
            className="mt-4 text-[34px] leading-[1.08] text-foreground sm:text-5xl lg:text-[52px]"
          >
            Building useful technology, not unnecessary complexity.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-10">
          <div className="space-y-5 text-base leading-[1.7] text-muted-foreground md:text-lg">
            <p>
              Automa8 is an independent AI, web development and automation studio founded by{" "}
              <span className="text-foreground">Umair Ashraf</span>.
            </p>
            <p>
              I build practical digital systems that combine modern web development, AI and
              automation to solve real business problems.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <span className="text-foreground">Pakistan · Working Globally</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-200 hover:text-brand"
            >
              LinkedIn
              <ArrowUpRight
                className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <p className="text-sm text-foreground">Built with modern technology.</p>
            <ul
              className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground"
              aria-label="Technology"
            >
              {tech.map((t, i) => (
                <li key={t} className="whitespace-nowrap">
                  {t}
                  {i < tech.length - 1 && (
                    <span className="ml-2 text-faint" aria-hidden>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
