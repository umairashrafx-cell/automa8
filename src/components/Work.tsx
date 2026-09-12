import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y border-t border-border">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          eyebrow="Work"
          title="Selected Work"
          description="Real websites and digital systems built for real businesses."
        />

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32 lg:space-y-40">
          {projects.map((p, i) => (
            <ProjectBlock key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project: p, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article" aria-labelledby={`${p.slug}-title`}>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[18px] focus-visible:outline-offset-8"
      >
        <span className="block text-sm tabular-nums text-faint" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          id={`${p.slug}-title`}
          className="mt-3 text-2xl uppercase leading-tight tracking-[0.02em] text-foreground sm:text-3xl lg:text-4xl"
        >
          {p.name}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground md:text-[15px]">{p.category}</p>

        <div className="shot mt-8 md:mt-10">
          <div className="aspect-[1440/860] overflow-hidden">
            <img
              src={`${p.image.base}-800.jpg`}
              srcSet={`${p.image.base}-800.jpg 800w, ${p.image.base}-1440.jpg 1440w`}
              sizes="(min-width: 1280px) 1184px, 94vw"
              width={1440}
              height={860}
              loading="lazy"
              decoding="async"
              alt={p.image.alt}
              className="h-full w-full object-cover object-top transition-transform duration-[400ms] ease-out group-hover:scale-[1.015]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">
            {p.description}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-foreground transition-colors duration-200 group-hover:text-brand">
            View Website
            <ArrowUpRight
              className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
            <span className="sr-only">(opens {p.domain} in a new tab)</span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}
