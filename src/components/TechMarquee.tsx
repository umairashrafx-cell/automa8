import { motion } from "framer-motion";

const logos = [
  "OpenAI", "Claude", "Gemini", "n8n", "VAPI", "ElevenLabs", "Supabase",
  "LangChain", "Pinecone", "Qdrant", "PostgreSQL", "Redis", "Zapier", "Make",
  "Airtable", "Retool", "Appsmith", "Railway", "Render", "Vercel",
];

export function TechMarquee() {
  return (
    <section className="py-14 border-y border-black/5 bg-[var(--cream)]/40 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="text-center text-[11px] uppercase tracking-[0.24em] text-[var(--ink-soft)] mb-8">
          Powering AI systems with a modern stack
        </div>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--cream)]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--cream)]/80 to-transparent z-10" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap w-max"
        >
          {[...logos, ...logos].map((l, i) => (
            <div
              key={i}
              className="font-display text-2xl md:text-3xl font-medium text-[var(--ink)]/60 hover:text-[var(--forest)] transition-colors"
            >
              {l}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
