import { ArrowUpRight, Globe2, MapPin, UserRound } from "lucide-react";
import { contact } from "@/lib/site";
import { Reveal } from "./Reveal";

const facts = [
  { icon: UserRound, label: "Founder", value: "Umair Ashraf" },
  { icon: MapPin, label: "Based in", value: "Pakistan" },
  { icon: Globe2, label: "Working", value: "Globally" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-line bg-surface/40 py-20 md:py-28"
    >
      <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">About</p>
          <h2
            id="about-title"
            className="mt-4 font-display text-3xl font-semibold text-text sm:text-4xl lg:text-5xl"
          >
            About Automa8
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-text-soft sm:text-lg">
            <p>
              Automa8 is an independent AI automation and web development studio founded by{" "}
              <span className="text-text">Umair Ashraf</span>.
            </p>
            <p>
              I build practical digital systems that combine modern web development, AI and
              automation to solve real business problems.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-10">
          <dl className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-4 px-6 py-5">
                <f.icon className="h-5 w-5 text-brand" aria-hidden strokeWidth={1.75} />
                <dt className="text-sm text-text-faint">{f.label}</dt>
                <dd className="ml-auto text-[15px] font-medium text-text">{f.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-text-soft transition-colors hover:text-text"
          >
            Connect with Umair on LinkedIn
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
