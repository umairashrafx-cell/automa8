import { ArrowUpRight, Check } from "lucide-react";
import { projects, type Project } from "@/lib/projects";
import { BrowserFrame } from "./BrowserFrame";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader
          id="work-title"
          eyebrow="Work"
          title="Selected Work"
          description="Real websites and digital systems built for real businesses."
        />

        <div className="mt-14 space-y-8 md:mt-20 md:space-y-10">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line px-6 py-6 sm:flex-row sm:items-center md:px-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-text">
              Built for real businesses.
            </h3>
            <p className="mt-1 text-sm text-text-soft">
              No mock-ups or demo projects. Both sites are live — open them and judge the work for
              yourself.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-text hover:text-brand"
          >
            Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal
      as="article"
      className="group overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
    >
      <div
        className={`grid ${flip ? "xl:grid-cols-[1fr_1.25fr] xl:[&>*:first-child]:order-2" : "xl:grid-cols-[1.25fr_1fr]"}`}
      >
        {/* Screenshot */}
        <div className="relative flex items-center overflow-hidden bg-gradient-to-br from-surface-2 to-ink p-5 sm:p-8 lg:p-12 xl:p-10">
          <div className="absolute inset-0 bg-brand/[0.04]" aria-hidden />
          <BrowserFrame
            domain={p.domain}
            imageBase={p.image.base}
            alt={p.image.alt}
            sizes="(min-width: 1280px) 620px, 92vw"
            className="relative w-full"
            imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-12 xl:p-10">
          <div className="flex items-center gap-3 text-xs text-text-faint">
            <span className="font-display font-semibold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-line-strong" aria-hidden />
            <span className="uppercase tracking-[0.16em]">{p.category}</span>
          </div>

          <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.04em] text-text sm:text-3xl">
            {p.name}
          </h3>
          <p className="mt-3 text-lg leading-snug text-text">{p.tagline}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-text-soft">{p.description}</p>

          <ul
            className="mt-6 grid gap-2.5 md:grid-cols-2 md:gap-x-8 xl:grid-cols-1"
            aria-label={`${p.name} features`}
          >
            {p.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm leading-snug text-text-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {p.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-3 py-1 text-xs text-text-soft"
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 xl:mt-auto xl:pt-8">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
            >
              View Live Website
              <ArrowUpRight className="h-4 w-4" aria-hidden />
              <span className="sr-only">: {p.name} (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
