import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** id for the heading, so the section can reference it with aria-labelledby. */
  id?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={`${eyebrow ? "mt-5" : ""} text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
