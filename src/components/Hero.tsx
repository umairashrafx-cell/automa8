import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { BrowserFrame } from "./BrowserFrame";

export function Hero() {
  const [first, second] = projects;

  return (
    <section id="home" className="overflow-hidden pb-20 pt-14 sm:pt-20 md:pb-28 lg:pb-32 lg:pt-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-16">
        <div className="max-w-2xl">
          <p className="eyebrow animate-rise flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            AI · Web · Automation
          </p>

          <h1
            className="animate-rise mt-7 text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-[56px] lg:text-[60px] xl:text-[80px]"
            style={{ animationDelay: "80ms" }}
          >
            We build digital systems for businesses.
          </h1>

          <p
            className="animate-rise mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Websites, AI and automation designed around how your business actually works.
          </p>

          <div
            className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#work" className="btn btn-primary group">
              View Our Work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a href="#contact" className="btn btn-secondary group">
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>

        {/* Collage of the real, live client work */}
        <a
          href="#work"
          aria-label="See our work: Al-Madina Jewellers and Khawaja Collection"
          className="animate-rise group relative block rounded-3xl"
          style={{ animationDelay: "200ms" }}
        >
          <div className="relative rounded-3xl border border-border bg-muted p-4 pb-20 sm:p-6 sm:pb-28 lg:pb-24 xl:pb-28">
            {first && (
              <BrowserFrame
                domain={first.domain}
                imageBase={first.image.base}
                alt=""
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            )}
            {second && (
              <BrowserFrame
                domain={second.domain}
                imageBase={second.image.base}
                alt=""
                sizes="(min-width: 1024px) 330px, 55vw"
                className="absolute -bottom-6 right-4 w-[58%] sm:-bottom-8 sm:right-6"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            )}
            <div className="absolute bottom-5 left-5 hidden max-w-[36%] text-[13px] leading-snug text-muted-foreground sm:block sm:bottom-7 sm:left-7">
              <span className="block font-medium text-foreground">Live client work</span>
              <span className="block">Al-Madina Jewellers</span>
              <span className="block">Khawaja Collection</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
