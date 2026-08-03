import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "5+", label: "Years engineering automation" },
  { value: "24/7", label: "AI systems in production" },
  { value: "12", label: "Industries served" },
  { value: "40+", label: "Enterprise integrations" },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
        <SectionHeader
          eyebrow="About"
          title={<>Engineering AI Solutions <span className="italic font-light text-[var(--forest)]">That Drive Business Growth.</span></>}
          description="At Automa8, I specialize in building intelligent AI-powered systems that automate repetitive work, improve customer experiences, and streamline business operations."
        />
        <div>
          <p className="text-[15px] leading-relaxed text-[var(--ink-soft)]">
            My expertise spans AI Agents, Voice AI, Workflow Automation, RAG Systems, WhatsApp
            Automation, CRM Integrations, API Development, and scalable No-Code / Low-Code
            solutions. I focus on delivering automation that creates measurable business value —
            not just implementing technology for its own sake.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-3xl border border-black/[0.06] bg-white p-6"
              >
                <div className="font-display text-3xl font-medium text-[var(--forest)]">{s.value}</div>
                <div className="mt-1 text-[13px] text-[var(--ink-soft)]">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["AI Automation", "AI Agents", "Voice AI", "Workflow Engineering", "Business Intelligence"].map((t) => (
              <span key={t} className="rounded-full bg-[var(--cream)]/60 border border-black/5 px-3 py-1 text-xs text-[var(--ink)]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
