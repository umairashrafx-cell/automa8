import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function CtaSection({
  title = "Have something worth building?",
  text = "Tell us what you’re trying to build, automate or improve.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="section-y border-t border-border bg-card">
      <Reveal className="container-page">
        <h2
          id="cta-title"
          className="max-w-2xl text-[34px] leading-[1.08] text-foreground sm:text-5xl lg:text-[56px]"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-[1.7] text-muted-foreground md:text-lg">
          {text}
        </p>
        <Link to="/contact" className="btn btn-primary group mt-10">
          Start a Project
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </Reveal>
    </section>
  );
}
