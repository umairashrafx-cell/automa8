import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { BrowserFrame } from "./BrowserFrame";

export function Hero() {
  const [front, back] = projects;

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 md:pb-28 lg:pt-40"
    >
      {/* Subtle grid and a single restrained glow */}
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute left-1/2 top-[-20%] -z-10 h-[560px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-brand/15 blur-[140px]"
        aria-hidden
      />

      <div className="container-page">
        <p className="animate-rise text-xs font-medium uppercase tracking-[0.28em] text-brand">
          AI · Web · Automation
        </p>

        <h1
          className="animate-rise mt-6 max-w-5xl font-display text-[40px] font-semibold leading-[1.04] text-text min-[420px]:text-[46px] sm:text-6xl lg:text-[76px] xl:text-[84px]"
          style={{ animationDelay: "80ms" }}
        >
          AI Systems &amp; Websites{" "}
          <span className="block text-text-soft">Built for Real Businesses.</span>
        </h1>

        <div className="mt-10 grid items-start gap-14 lg:mt-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:pt-2">
            <p
              className="animate-rise max-w-xl text-[17px] leading-relaxed text-text-soft sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              I build websites, AI agents and automated business systems that help businesses sell,
              operate and serve customers better.
            </p>

            <div
              className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "240ms" }}
            >
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white"
              >
                View My Work
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-white/40 hover:bg-white/[0.04]"
              >
                Start a Project
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <div
              className="animate-rise mt-12 hidden border-t border-line pt-6 lg:block"
              style={{ animationDelay: "320ms" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-text-faint">Recent work</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-soft">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition-colors hover:text-text"
                    >
                      {p.name}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual: the actual live projects, layered */}
          <a
            href="#work"
            aria-label="See selected work: Al-Madina Jewellers and Khawaja Collection"
            className="animate-rise group relative mx-auto block w-full max-w-[640px] rounded-xl pb-10 pr-6 sm:pb-14 sm:pr-10 lg:mr-0"
            style={{ animationDelay: "200ms" }}
          >
            <div
              className="absolute inset-8 -z-10 rounded-3xl bg-brand/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
              aria-hidden
            />
            {back && (
              <BrowserFrame
                domain={back.domain}
                imageBase={back.image.base}
                alt=""
                sizes="(min-width: 1024px) 560px, 90vw"
                className="absolute right-0 top-10 w-[88%] opacity-60 transition-transform duration-700 group-hover:translate-x-1 sm:top-14"
              />
            )}
            {front && (
              <BrowserFrame
                domain={front.domain}
                imageBase={front.image.base}
                alt=""
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                className="relative w-[88%] transition-transform duration-700 group-hover:-translate-y-1"
              />
            )}
            <div className="glass absolute bottom-0 left-4 flex items-center gap-2.5 rounded-full px-4 py-2 text-xs text-text-soft sm:left-8">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Live client work
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
