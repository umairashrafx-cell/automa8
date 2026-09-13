import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";
import { Reveal } from "./Reveal";

export function HomeProjects() {
  return (
    <section aria-labelledby="projects-title" className="section-y border-t border-border">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Projects</p>
          <h2
            id="projects-title"
            className="mt-4 text-[34px] leading-[1.08] text-foreground sm:text-5xl lg:text-[56px]"
          >
            Selected Projects
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-muted-foreground md:text-lg">
            Digital experiences built for real businesses.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32 lg:space-y-40">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.slug} aria-labelledby={`home-${p.slug}`}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block rounded-[18px] focus-visible:outline-offset-8"
              >
                <span className="block text-sm tabular-nums text-faint" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`home-${p.slug}`}
                  className="mt-3 text-2xl uppercase leading-tight tracking-[0.02em] text-foreground sm:text-3xl lg:text-4xl"
                >
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground md:text-[15px]">
                  {p.shortCategory}
                </p>

                <ProjectImage
                  shot={p.cover}
                  hover
                  sizes="(min-width: 1280px) 1184px, 94vw"
                  className="mt-8 md:mt-10"
                />

                <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
                  <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">
                    {p.homeDescription}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-foreground transition-colors duration-200 group-hover:text-brand">
                    View Project
                    <ArrowUpRight
                      className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
