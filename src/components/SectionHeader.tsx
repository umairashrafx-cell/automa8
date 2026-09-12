import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** id for the heading, so the section can reference it with aria-labelledby. */
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
      <h2
        id={id}
        className="mt-4 font-display text-3xl font-semibold leading-[1.1] text-text sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-text-soft sm:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
