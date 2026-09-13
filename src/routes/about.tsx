import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { CtaSection } from "@/components/CtaSection";
import { contact, pageHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About | Automa8",
      description:
        "Automa8 is an independent AI, web development and automation studio founded by Umair Ashraf, based in Pakistan and working globally.",
      path: "/about",
    }),
  component: AboutPage,
});

const steps = [
  { title: "Discover", desc: "Understand the business, its customers and the real problem." },
  { title: "Plan", desc: "Design the experience and the system behind it." },
  { title: "Build", desc: "Develop the website, AI features and integrations." },
  { title: "Automate", desc: "Connect workflows, APIs and day-to-day operations." },
  { title: "Launch", desc: "Deploy, test with real use and keep improving." },
];

const capabilities = [
  {
    title: "Web development",
    desc: "Modern websites, online stores and web applications that are fast, clear and built to be found.",
  },
  {
    title: "AI",
    desc: "Assistants and AI features that use a business’s own information — applied where they genuinely help.",
  },
  {
    title: "Automation",
    desc: "Workflows that connect forms, WhatsApp, email, CRMs and databases so routine work runs on its own.",
  },
  {
    title: "Business systems",
    desc: "Websites, data, AI and automation designed together around one way of working.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageIntro
        eyebrow="About"
        title="About Automa8"
        lead="Automa8 is an independent AI, web development and automation studio founded by Umair Ashraf."
      />

      <div className="container-page pb-24 lg:pb-[120px]">
        <Row title="Philosophy">
          <p className="text-xl leading-[1.55] text-foreground md:text-2xl">
            Build useful technology, not unnecessary complexity.
          </p>
          <p>
            Technology should make a business easier to run and easier to buy from. I start from how
            the business actually works — its customers, its team, its daily routine — and build
            only what moves that forward.
          </p>
        </Row>

        <Row title="Approach">
          <p>
            I work closely and directly with each client, from the first conversation to launch.
            Real projects come before tool lists: the right technology is whichever solves the
            problem cleanly and can be maintained afterwards.
          </p>
          <p>
            That means clear scopes, honest advice about what is worth building, and systems that
            are practical, scalable and designed around real workflows.
          </p>
        </Row>

        <Row title="How projects are built">
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-card p-5">
                <span className="block text-xs tabular-nums text-faint" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-lg leading-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </Row>

        <Row title="What I work on">
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c.title} className="border-t border-border pt-5">
                <h3 className="text-lg leading-snug text-foreground">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-muted-foreground">{c.desc}</p>
              </li>
            ))}
          </ul>
          <p className="text-[15px]">
            See this in practice in the{" "}
            <Link
              to="/projects"
              className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
            >
              selected projects
            </Link>
            .
          </p>
        </Row>

        <Row title="Working globally" last>
          <p>
            Automa8 is based in Pakistan and works with businesses anywhere. Projects run remotely
            over email, WhatsApp and video calls, with regular updates throughout.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px]">
            <span className="text-foreground">Pakistan · Working Globally</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors duration-200 hover:text-brand"
            >
              Umair Ashraf on LinkedIn
              <ArrowUpRight
                className="h-4 w-4 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-sm text-foreground">Built with modern technology.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              OpenAI · Claude · n8n · Supabase · Next.js · React · APIs
            </p>
          </div>
        </Row>
      </div>

      <CtaSection
        title="Have a business problem worth solving?"
        text="Tell me what you’re trying to build, automate or improve."
      />
    </SiteLayout>
  );
}

function Row({ title, children, last }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <Reveal>
      <section
        className={`grid gap-6 border-t border-border py-12 md:py-16 lg:grid-cols-[260px_1fr] lg:gap-16 ${
          last ? "border-b" : ""
        }`}
      >
        <h2 className="text-2xl leading-tight tracking-[-0.025em] text-foreground">{title}</h2>
        <div className="max-w-3xl space-y-6 text-base leading-[1.75] text-muted-foreground md:text-lg">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
