const tech = ["OpenAI", "Claude", "n8n", "Supabase", "React", "Next.js", "APIs"];

export function TechStack() {
  return (
    <section aria-label="Technology" className="border-t border-border py-10">
      <ul className="container-page flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        {tech.map((t, i) => (
          <li key={t} className="whitespace-nowrap">
            {t}
            {i < tech.length - 1 && <span aria-hidden> ·</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
