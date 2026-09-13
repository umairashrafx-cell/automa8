import type { ReactNode } from "react";

/** The top of an inner page: small label, the page's single H1 and a short lead. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-page pb-16 pt-14 md:pb-20 md:pt-20 lg:pb-24 lg:pt-28">
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="eyebrow animate-rise flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-rise mt-6 text-[40px] leading-[1.04] tracking-[-0.035em] text-foreground min-[420px]:text-[44px] sm:text-[52px] md:text-[60px] xl:text-[72px]"
          style={{ animationDelay: "60ms" }}
        >
          {title}
        </h1>
        {lead && (
          <p
            className="animate-rise mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="animate-rise mt-10" style={{ animationDelay: "180ms" }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
