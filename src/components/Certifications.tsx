import { motion } from "framer-motion";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { SectionHeader } from "./SectionHeader";

const certs = [
  { issuer: "OpenAI", title: "GPT Systems & Agents", date: "Mar 2025", id: "OA-2025-8842", accent: "from-emerald-400/20 to-transparent" },
  { issuer: "n8n", title: "Advanced Workflow Automation", date: "Nov 2024", id: "N8N-ADV-1147", accent: "from-pink-400/20 to-transparent" },
  { issuer: "Google", title: "Generative AI Fundamentals", date: "Sep 2024", id: "GC-GAI-9012", accent: "from-blue-400/20 to-transparent" },
  { issuer: "Microsoft", title: "Azure AI Engineer Associate", date: "Jun 2024", id: "MS-AI-102", accent: "from-cyan-400/20 to-transparent" },
  { issuer: "AWS", title: "Cloud Practitioner", date: "Feb 2024", id: "AWS-CP-4471", accent: "from-orange-400/20 to-transparent" },
  { issuer: "Meta", title: "React Advanced", date: "Dec 2023", id: "META-RA-3390", accent: "from-indigo-400/20 to-transparent" },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Certifications"
          title={<>Verified expertise from <span className="italic font-light text-[var(--forest)]">the industry's best.</span></>}
          description="Continuously certified across the platforms and paradigms that power modern AI systems."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-[28px] border border-black/[0.06] bg-white p-6 overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(58,90,64,0.35)] transition-all"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="font-display text-lg font-semibold">{c.issuer}</div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--forest)]">
                    <HiOutlineCheckBadge className="h-4 w-4" /> Verified
                  </div>
                </div>
                <div className="mt-6 text-sm text-[var(--ink-soft)]">Certification</div>
                <h3 className="mt-1 font-display text-lg leading-snug text-[var(--ink)]">{c.title}</h3>
                <div className="mt-6 flex items-center justify-between text-[12px] text-[var(--ink-soft)]">
                  <span>{c.date}</span>
                  <span className="font-mono">{c.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
