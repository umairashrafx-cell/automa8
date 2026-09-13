import type { ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { getProject, projects, type CaseSection, type Project } from "@/lib/projects";
import { SITE_URL, pageHead } from "@/lib/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const project = loaderData && getProject(loaderData.slug);
    if (!project) return {};
    return pageHead({
      title: `${project.name} — ${project.subtitle} | Automa8`,
      description: `${project.name} case study: ${project.summary}`,
      path: `/projects/${project.slug}`,
      image: `${SITE_URL}${project.cover.base}-1440.jpg`,
      imageAlt: project.cover.alt,
    });
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useLoaderData();
  const project = getProject(slug)!;
  const cs = project.caseStudy;
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length]!;
  const desktopShots = cs.gallery.filter((s) => s.kind === "desktop");
  const mobileShots = cs.gallery.filter((s) => s.kind === "mobile");

  return (
    <SiteLayout>
      <article>
        {/* Header */}
        <header className="container-page pb-12 pt-10 md:pb-16 md:pt-14 lg:pt-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow animate-rise flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
                Case study {String(index + 1).padStart(2, "0")}
              </p>
              <h1
                className="animate-rise mt-6 text-[40px] leading-[1.04] tracking-[-0.035em] text-foreground min-[420px]:text-[44px] sm:text-[52px] md:text-[60px] xl:text-[76px]"
                style={{ animationDelay: "60ms" }}
              >
                {project.name}
              </h1>
              <p
                className="animate-rise mt-5 text-lg leading-snug text-muted-foreground md:text-xl"
                style={{ animationDelay: "120ms" }}
              >
                {project.subtitle}
              </p>
            </div>

            <dl
              className="animate-rise grid grid-cols-1 gap-5 border-t border-border pt-6 text-[15px] sm:grid-cols-2 lg:grid-cols-1"
              style={{ animationDelay: "180ms" }}
            >
              <Fact label="Category">{project.category}</Fact>
              <Fact label="Location">{project.location}</Fact>
              <Fact label="Live website">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-200 hover:text-brand"
                >
                  {project.domain}
                  <ArrowUpRight
                    className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Fact>
            </dl>
          </div>
        </header>

        <div className="container-page">
          <ProjectImage shot={project.cover} priority sizes="(min-width: 1280px) 1184px, 94vw" />
        </div>

        {/* Sections */}
        <div className="container-page section-y">
          <CaseRow n={1} title="Overview">
            <Paragraphs section={cs.overview} lead />
          </CaseRow>
          <CaseRow n={2} title="The Challenge">
            <Paragraphs section={cs.challenge} />
          </CaseRow>
          <CaseRow n={3} title="The Approach">
            <Paragraphs section={cs.approach} />
          </CaseRow>
          <CaseRow n={4} title="UX & Design">
            <Paragraphs section={cs.design} />
            {mobileShots.length > 0 && (
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:gap-6">
                {mobileShots.map((shot) => (
                  <ProjectImage
                    key={shot.base}
                    shot={shot}
                    sizes="(min-width: 640px) 280px, 45vw"
                  />
                ))}
              </div>
            )}
          </CaseRow>
          <CaseRow n={5} title="Key Features">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {cs.features.map((f) => (
                <li key={f.title} className="border-t border-border pt-5">
                  <h3 className="text-lg leading-snug tracking-[-0.01em] text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">
                    {f.description}
                  </p>
                </li>
              ))}
            </ul>
          </CaseRow>
          <CaseRow n={6} title="Development">
            <Paragraphs section={cs.development} />
          </CaseRow>
          <CaseRow n={7} title="Technology">
            <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technology`}>
              {cs.technology.map((t) => (
                <li
                  key={t}
                  className="rounded-[10px] border border-border bg-card px-4 py-2 text-[15px] text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </CaseRow>
          <CaseRow n={8} title="Project Gallery" wide>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {desktopShots.map((shot) => (
                <figure key={shot.base}>
                  <ProjectImage
                    shot={shot}
                    sizes="(min-width: 1280px) 580px, (min-width: 768px) 46vw, 94vw"
                  />
                  <figcaption className="mt-3 text-[13px] leading-snug text-muted-foreground">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </CaseRow>
          <CaseRow n={9} title="Live Website" last>
            <p className="max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">
              {project.name} is live. Explore the real site at {project.domain}.
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group mt-8"
            >
              Visit Live Website
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens {project.domain} in a new tab)</span>
            </a>
          </CaseRow>
        </div>
      </article>

      {next.slug !== project.slug && <NextProject project={next} />}
      <CtaSection />
    </SiteLayout>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[13px] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-foreground">{children}</dd>
    </div>
  );
}

function CaseRow({
  n,
  title,
  children,
  wide,
  last,
}: {
  n: number;
  title: string;
  children: ReactNode;
  wide?: boolean;
  last?: boolean;
}) {
  const id = title.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <Reveal>
      <section
        aria-labelledby={id}
        className={`grid gap-6 border-t border-border py-12 md:py-16 lg:grid-cols-[260px_1fr] lg:gap-16 ${
          last ? "border-b" : ""
        }`}
      >
        <div>
          <span className="block text-sm tabular-nums text-faint" aria-hidden>
            {String(n).padStart(2, "0")}
          </span>
          <h2 id={id} className="mt-2 text-2xl leading-tight tracking-[-0.025em] text-foreground">
            {title}
          </h2>
        </div>
        <div className={wide ? "" : "max-w-2xl"}>{children}</div>
      </section>
    </Reveal>
  );
}

function Paragraphs({ section, lead }: { section: CaseSection; lead?: boolean }) {
  return (
    <div className="space-y-5">
      {section.paragraphs.map((p, i) => (
        <p
          key={i}
          className={
            lead && i === 0
              ? "text-xl leading-[1.55] text-foreground md:text-2xl"
              : "text-base leading-[1.75] text-muted-foreground md:text-lg"
          }
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next project" className="border-t border-border">
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        className="group container-page grid items-center gap-8 py-16 md:grid-cols-[1fr_1.2fr] md:py-20 lg:py-24"
      >
        <div>
          <p className="eyebrow">Next project</p>
          <p className="mt-4 text-3xl leading-tight tracking-[-0.03em] text-foreground sm:text-4xl">
            {project.name}
          </p>
          <p className="mt-2 text-[15px] text-muted-foreground">{project.category}</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground transition-colors duration-200 group-hover:text-brand">
            View Case Study
            <ArrowRight
              className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
        <ProjectImage shot={project.cover} hover sizes="(min-width: 768px) 55vw, 94vw" />
      </Link>
    </section>
  );
}
