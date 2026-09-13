import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";

export function Hero() {
  const [primary, secondary] = projects;

  return (
    <section className="pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-[120px] lg:pt-20">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow animate-rise flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
            AI · Web · Automation
          </p>

          <h1
            className="animate-rise mt-6 text-[40px] leading-[1.04] tracking-[-0.035em] text-foreground min-[420px]:text-[44px] sm:text-[52px] md:text-[60px] lg:text-[52px] xl:text-[64px]"
            style={{ animationDelay: "80ms" }}
          >
            Websites, AI &amp; Automation for Real Businesses.
          </h1>

          <p
            className="animate-rise mt-6 max-w-md text-base leading-[1.7] text-muted-foreground md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            We build digital systems that help businesses grow and operate better.
          </p>

          <div
            className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link to="/projects" className="btn btn-primary group">
              View Projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link to="/contact" className="btn btn-secondary group">
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>

        {/* Editorial composition of the real, live client work */}
        <div
          className="animate-rise relative sm:pb-[18%] sm:pr-[10%]"
          style={{ animationDelay: "200ms" }}
        >
          {primary && (
            <figure>
              <ProjectImage
                shot={primary.cover}
                priority
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 82vw, 92vw"
              />
              <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {primary.name}
              </figcaption>
            </figure>
          )}
          {secondary && (
            <figure className="absolute bottom-0 right-0 hidden w-[56%] sm:block">
              <ProjectImage shot={secondary.cover} sizes="(min-width: 1024px) 320px, 50vw" />
              <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {secondary.name}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
