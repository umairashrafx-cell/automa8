import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { services, type Service } from "@/lib/services";
import { getProject } from "@/lib/projects";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services | Automa8",
      description:
        "AI agents, business automation, websites & e-commerce and AI business systems — what each includes, who it’s for and how the work is done.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="Services"
        title="What we build."
        lead="Four ways we help businesses sell, operate and serve customers better — built around real workflows, not tool lists."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-card px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  <span className="tabular-nums text-faint" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageIntro>

      <div className="container-page pb-24 lg:pb-[120px]">
        {services.map((s, i) => (
          <ServiceBlock key={s.slug} service={s} index={i} />
        ))}
      </div>

      <CtaSection />
    </SiteLayout>
  );
}

function ServiceBlock({ service: s, index }: { service: Service; index: number }) {
  const related = s.relatedProjects.map(getProject).filter((p) => p !== undefined);

  return (
    <Reveal>
      <section
        id={s.slug}
        aria-labelledby={`${s.slug}-title`}
        className="scroll-mt-24 border-t border-border py-16 md:py-20 lg:py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div>
            <span className="block text-sm tabular-nums text-faint" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2
              id={`${s.slug}-title`}
              className="mt-3 text-[32px] leading-[1.08] text-foreground sm:text-4xl lg:text-[44px]"
            >
              {s.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-muted-foreground md:text-lg">
              {s.summary}
            </p>
            <Link to="/contact" className="btn btn-secondary group mt-8 hidden lg:inline-flex">
              Discuss this service
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div className="space-y-10">
            <Detail title="What it is">
              <p>{s.what}</p>
            </Detail>
            <Detail title="Who it’s for">
              <p>{s.whoFor}</p>
            </Detail>

            <div className="grid gap-10 sm:grid-cols-2">
              <Detail title="Problems it solves">
                <List items={s.problems} />
              </Detail>
              <Detail title="What’s included">
                <List items={s.included} />
              </Detail>
            </div>

            <Detail title="Typical workflow">
              <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border xl:grid-cols-5">
                {s.workflow.map((step, i) => (
                  <li key={step} className="bg-card px-4 py-4">
                    <span className="block text-xs tabular-nums text-faint" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block text-[15px] leading-snug text-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </Detail>

            {related.length > 0 && (
              <Detail title="Relevant projects">
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: p.slug }}
                        className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-200 hover:text-brand"
                      >
                        {p.name}
                        <ArrowUpRight
                          className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Detail>
            )}

            <Link to="/contact" className="btn btn-primary group lg:hidden">
              Discuss this service
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function Detail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>
      <div className="mt-3 text-base leading-[1.7] text-foreground md:text-[17px]">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
