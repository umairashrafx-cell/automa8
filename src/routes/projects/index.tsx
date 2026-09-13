import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageIntro } from "@/components/PageIntro";
import { ProjectImage } from "@/components/ProjectImage";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { projects } from "@/lib/projects";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/projects/")({
  head: () =>
    pageHead({
      title: "Projects | Automa8",
      description:
        "Selected projects by Automa8: Al-Madina Jewellers and Khawaja Collection — websites, digital experiences and business systems built for real businesses.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="Projects"
        title="Selected Projects"
        lead="Websites, digital experiences and business systems built for real businesses."
      />

      <section aria-label="All projects" className="container-page pb-24 lg:pb-[120px]">
        <div className="space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.slug} aria-labelledby={`project-${p.slug}`}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group grid gap-8 rounded-[18px] focus-visible:outline-offset-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14"
              >
                <ProjectImage
                  shot={p.cover}
                  hover
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 58vw, 94vw"
                />
                <div className="lg:pb-2">
                  <span className="block text-sm tabular-nums text-faint" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    id={`project-${p.slug}`}
                    className="mt-3 text-3xl leading-tight tracking-[-0.03em] text-foreground lg:text-4xl"
                  >
                    {p.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground md:text-[15px]">{p.category}</p>
                  <p className="mt-5 text-base leading-[1.7] text-muted-foreground md:text-lg">
                    {p.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground transition-colors duration-200 group-hover:text-brand">
                    View Case Study
                    <ArrowRight
                      className="h-4 w-4 text-brand transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection />
    </SiteLayout>
  );
}
