import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import {
  HiOutlineCpuChip, HiOutlineMicrophone, HiOutlineChatBubbleLeftRight,
  HiOutlineBoltSlash, HiOutlineBookOpen, HiOutlineLightBulb,
} from "react-icons/hi2";
import { SectionHeader } from "./SectionHeader";
import type { ComponentType } from "react";

type Service = { icon: ComponentType<{ className?: string }>; title: string; desc: string; tags: string[] };

const services: Service[] = [
  { icon: HiOutlineCpuChip, title: "AI Automation Systems", desc: "End-to-end automation combining OpenAI, n8n, and custom logic to remove repetitive ops work.", tags: ["OpenAI", "n8n", "APIs"] },
  { icon: HiOutlineMicrophone, title: "Voice AI Agents", desc: "Natural, real-time voice agents on VAPI + ElevenLabs for reception, booking, and outbound calls.", tags: ["VAPI", "ElevenLabs", "Twilio"] },
  { icon: HiOutlineChatBubbleLeftRight, title: "WhatsApp AI Assistants", desc: "Conversational AI on WhatsApp for sales, support, bookings — connected to your CRM.", tags: ["WhatsApp", "GPT-4", "CRM"] },
  { icon: HiOutlineBoltSlash, title: "Workflow Automation", desc: "Business workflows engineered on n8n, Make, and Zapier — reliable, observable, versioned.", tags: ["n8n", "Make", "Zapier"] },
  { icon: HiOutlineBookOpen, title: "RAG Knowledge Systems", desc: "Private, grounded AI over your documents with Pinecone / Qdrant and LangChain.", tags: ["LangChain", "Pinecone", "Qdrant"] },
  { icon: HiOutlineLightBulb, title: "AI Strategy & Consulting", desc: "Roadmaps, audits, and hands-on advisory to help teams ship AI that actually moves the needle.", tags: ["Strategy", "Audits", "Advisory"] },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--cream)]/30">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeader
          eyebrow="Services"
          title={<>Premium AI capabilities, <span className="italic font-light text-[var(--forest)]">engineered end-to-end.</span></>}
          description="Six focused practices covering the entire lifecycle of a production AI system — from discovery and design to deployment and ongoing optimization."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-[28px] border border-black/[0.06] bg-white p-7 overflow-hidden hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(58,90,64,0.35)] transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(163,177,138,0.18), transparent 40%)" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--forest)] text-white">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <HiOutlineArrowUpRight className="h-4 w-4 text-[var(--ink-soft)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-[var(--ink)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{s.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10.5px] uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--cream)]/60 text-[var(--forest)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
