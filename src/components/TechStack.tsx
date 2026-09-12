const tech = ["OpenAI", "Claude", "n8n", "Supabase", "Next.js", "React", "APIs"];

export function TechStack() {
  return (
    <section aria-labelledby="tech-title" className="border-t border-line py-12 md:py-14">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <h2 id="tech-title" className="shrink-0 font-display text-base font-medium text-text-soft">
          Built with modern technology.
        </h2>
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-faint">
          {tech.map((t, i) => (
            <li key={t} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-line-strong" aria-hidden>
                  ·
                </span>
              )}
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
