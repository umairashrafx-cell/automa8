import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups = [
  { name: "AI", items: [["OpenAI", 96], ["Claude", 92], ["Gemini", 88], ["LangChain", 90]] },
  { name: "Automation", items: [["n8n", 98], ["Make", 92], ["Zapier", 90], ["VAPI", 94]] },
  { name: "Database", items: [["Supabase", 95], ["PostgreSQL", 90], ["Redis", 82], ["Qdrant", 86]] },
  { name: "Development", items: [["React", 92], ["Tailwind CSS", 94], ["Node.js", 88], ["REST APIs", 95]] },
  { name: "Deployment", items: [["Vercel", 92], ["Railway", 88], ["Render", 86]] },
] as const;

export function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Skills"
          title={<>A full stack for <span className="italic font-light text-[var(--forest)]">shipping AI to production.</span></>}
          description="Proficiencies across the modern AI stack — from foundation models and orchestration to storage, delivery, and reliability."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-[28px] border border-black/[0.06] bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium">{g.name}</h3>
                <span className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">
                  {g.items.length} tools
                </span>
              </div>
              <div className="mt-5 space-y-4">
                {g.items.map(([name, level]) => (
                  <div key={name as string}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-[var(--ink)]">{name}</span>
                      <span className="text-[var(--ink-soft)]">{level}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-[var(--cream)]/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[var(--forest)] to-[var(--sage)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
