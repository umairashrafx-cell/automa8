import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { SectionHeader } from "./SectionHeader";

const items = [
  { name: "Sarah Lin", role: "Founder, LinaCo (SaaS)", initials: "SL", quote: "Umair replaced three manual workflows with an AI agent that quietly saves us 40 hours a week. It just runs." },
  { name: "Ahmed Raza", role: "Owner, Nero Grill (Restaurant)", initials: "AR", quote: "Our voice AI receptionist takes reservations at 2 AM. Reviews mention how 'polite' our staff is — they mean the AI." },
  { name: "Priya Menon", role: "CEO, Northfold (SaaS)", initials: "PM", quote: "Best AI engineering partner we've worked with. Everything is versioned, observable, and rock solid." },
  { name: "Daniel Cooper", role: "Founder, Rowan Agency", initials: "DC", quote: "Umair delivered a WhatsApp sales agent that outperforms our SDRs on booked meetings. Wild ROI." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[var(--cream)]/30">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Testimonials"
          align="center"
          title={<>Trusted by <span className="italic font-light text-[var(--forest)]">founders and operators.</span></>}
          description="A few words from the teams building alongside Automa8."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="rounded-[28px] border border-black/[0.06] bg-white p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 text-[var(--tangerine)]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <HiStar key={k} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-[19px] leading-relaxed text-[var(--ink)]">
                  "{t.quote}"
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--forest)] text-white font-display font-medium">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--ink-soft)]">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
