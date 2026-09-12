import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 md:py-32 lg:py-40">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          eyebrow="Work"
          title="Selected Work"
          description="Real websites and digital systems built for real businesses."
        />

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
          {projects.map((p, i) => (
            <ProjectBlock key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectBlock({ project: p, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal as="article" aria-labelledby={`${p.slug}-title`}>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-3xl focus-visible:outline-offset-8"
      >
        {/* Title row */}
        <div className="flex flex-col gap-4 border-t border-border-strong pt-6 md:flex-row md:items-baseline md:justify-between md:gap-10 md:pt-8">
          <div className="flex items-baseline gap-5 md:gap-8">
            <span className="text-sm tabular-nums text-muted-foreground">{number}</span>
            <h3
              id={`${p.slug}-title`}
              className="text-3xl font-semibold leading-none tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl"
            >
              {p.name}
            </h3>
          </div>
          <p className="pl-10 text-sm text-muted-foreground md:pl-0 md:text-right">{p.category}</p>
        </div>

        {/* Large screenshot */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card p-2 transition-colors duration-300 group-hover:border-border-strong sm:p-3 md:mt-10 md:rounded-3xl lg:p-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted sm:aspect-[1440/860] md:rounded-2xl">
            <img
              src={`${p.image.base}-800.jpg`}
              srcSet={`${p.image.base}-800.jpg 800w, ${p.image.base}-1440.jpg 1440w`}
              sizes="(min-width: 1280px) 1184px, 94vw"
              width={1440}
              height={860}
              loading="lazy"
              decoding="async"
              alt={p.image.alt}
              className="h-full w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Description + CTA */}
        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {p.description}
          </p>
          <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-medium text-foreground">
            <span className="border-b border-foreground/30 pb-0.5 transition-colors duration-300 group-hover:border-foreground">
              View Website
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
            <span className="sr-only">(opens {p.domain} in a new tab)</span>
          </span>
        </div>
      </a>
    </Reveal>
  );
}
