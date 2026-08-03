import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow, title, description, align = "left",
}: { eyebrow: string; title: ReactNode; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]"
      >
        <span className="h-1 w-1 rounded-full bg-[var(--tangerine)]" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--ink)]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
