import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";

export function Hero() {
  const [primary, secondary] = projects;

  return (
    <section id="home" className="pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-[120px] lg:pt-20">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="eyebrow animate-rise flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
            AI · Web · Automation
          </p>

          <h1
            className="animate-rise mt-6 text-[40px] leading-[1.04] tracking-[-0.04em] text-foreground min-[420px]:text-[44px] sm:text-[52px] md:text-[60px] lg:text-[54px] xl:text-[72px]"
            style={{ animationDelay: "80ms" }}
          >
            Websites, AI &amp; Automation for Real Businesses.
          </h1>

          <p
            className="animate-rise mt-6 text-base leading-[1.7] text-muted-foreground md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            We design and build digital experiences and business systems that help companies sell,
            operate and serve customers better.
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

        {/* Editorial composition of the real, live client work */}
        <div
          className="animate-rise relative sm:pb-[18%] sm:pr-[10%]"
          style={{ animationDelay: "200ms" }}
        >
          {primary && (
            <HeroShot
              name={primary.name}
              imageBase={primary.image.base}
              alt={primary.image.alt}
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 82vw, 92vw"
              priority
            />
          )}
          {secondary && (
            <div className="absolute bottom-0 right-0 hidden w-[56%] sm:block">
              <HeroShot
                name={secondary.name}
                imageBase={secondary.image.base}
                alt={secondary.image.alt}
                sizes="(min-width: 1024px) 320px, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroShot({
  name,
  imageBase,
  alt,
  sizes,
  priority,
}: {
  name: string;
  imageBase: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="shot aspect-[1440/860]">
        <img
          src={`${imageBase}-800.jpg`}
          srcSet={`${imageBase}-800.jpg 800w, ${imageBase}-1440.jpg 1440w`}
          sizes={sizes}
          width={1440}
          height={860}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {name}
      </figcaption>
    </figure>
  );
}
