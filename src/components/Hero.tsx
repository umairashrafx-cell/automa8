import { motion } from "framer-motion";
import { HiOutlineArrowUpRight, HiOutlineSparkles, HiOutlineBolt, HiOutlineCheckCircle } from "react-icons/hi2";
import { TbBrandOpenai } from "react-icons/tb";
import { SiSupabase, SiLangchain, SiWhatsapp } from "react-icons/si";
import { openBooking } from "@/components/BookingDialog";


const metrics = [
  { value: "50+", label: "AI Systems Delivered" },
  { value: "10+", label: "AI Technologies" },
  { value: "1000+", label: "Hours Automated" },
  { value: "99%", label: "Workflow Reliability" },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* mesh background */}
      <div className="absolute inset-0 mesh-bg -z-10" />
      <div className="absolute inset-0 noise-overlay -z-10" />
      {/* floating blur */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[var(--sage)]/30 blur-[120px] -z-10" />
      <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-[var(--tangerine)]/15 blur-[120px] -z-10" />

      <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass-card px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tangerine)]" />
            AI • Automation • AI Agents • Voice AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-[44px] leading-[1.02] sm:text-[56px] lg:text-[68px] font-medium tracking-tight text-[var(--ink)]"
          >
            Building Intelligent{" "}
            <span className="relative inline-block">
              <span className="italic font-light text-[var(--forest)]">AI Systems</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="var(--tangerine)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            That Scale Businesses.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[var(--ink-soft)]"
          >
            At Automa8, I help businesses automate operations, deploy intelligent AI agents,
            build Voice AI systems, and engineer enterprise-grade workflow automations using OpenAI,
            n8n, VAPI, Supabase, and LangChain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={openBooking}
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] hover:bg-[var(--forest)] text-white px-5 py-3 text-sm font-medium transition-colors"
            >
              Let's Build Your AI System
              <HiOutlineArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-medium text-[var(--ink)] hover:bg-white transition-colors"
            >
              View My Work
            </a>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              >
                <div className="font-display text-2xl sm:text-3xl font-medium text-[var(--forest)]">
                  {m.value}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--ink-soft)]">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — animated dashboard */}
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[4/4.6] lg:aspect-[4/4.4] w-full"
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[var(--sage)]/20 via-transparent to-[var(--tangerine)]/20 blur-2xl" />

      {/* main card */}
      <div className="absolute inset-0 rounded-[28px] glass-dark p-5 overflow-hidden">
        <div className="flex items-center justify-between text-white/70 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--tangerine)] animate-pulse" />
            AI ORCHESTRATOR — LIVE
          </div>
          <div>v2.4.1</div>
        </div>

        {/* workflow */}
        <div className="mt-4 rounded-2xl bg-white/[0.04] border border-white/10 p-4">
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-3">n8n workflow</div>
          <div className="flex items-center justify-between text-white gap-2">
            {[SiWhatsapp, TbBrandOpenai, SiLangchain, SiSupabase].map((Icon, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="h-10 w-10 grid place-items-center rounded-xl bg-white/10 border border-white/10"
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                {i < 3 && (
                  <div className="w-full h-px bg-white/10 relative mt-[-22px] -z-0" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-emerald-300/80">
            <HiOutlineCheckCircle className="h-3 w-3" /> 12,483 runs · 99.7% success
          </div>
        </div>

        {/* voice agent */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="mt-3 rounded-2xl bg-white/[0.04] border border-white/10 p-4"
        >
          <div className="flex items-center justify-between text-white/60 text-[10px] uppercase tracking-widest">
            <span>VAPI Voice Agent</span>
            <span className="text-[var(--tangerine)]">● Speaking</span>
          </div>
          <div className="mt-2 flex items-end gap-1 h-8">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                animate={{ height: [`${20 + (i % 5) * 12}%`, `${60 + (i % 3) * 15}%`, `${20 + (i % 5) * 12}%`] }}
                transition={{ duration: 1 + (i % 4) * 0.2, repeat: Infinity, delay: i * 0.04 }}
                className="flex-1 rounded-full bg-[var(--sage)]"
              />
            ))}
          </div>
          <div className="mt-2 text-[11px] text-white/70">
            "I've booked your table for 8 PM tomorrow at Nero. Anything else?"
          </div>
        </motion.div>

        {/* JSON */}
        <div className="mt-3 rounded-2xl bg-white/[0.04] border border-white/10 p-4 font-mono text-[10.5px] leading-relaxed text-white/70">
          <div className="text-white/40">POST /agent/respond · 200 OK</div>
          <div className="mt-1">
            <span className="text-[var(--sage)]">{"{"}</span><br />
            &nbsp;&nbsp;"intent": <span className="text-[var(--tangerine)]">"book_reservation"</span>,<br />
            &nbsp;&nbsp;"confidence": <span className="text-white">0.98</span>,<br />
            &nbsp;&nbsp;"handoff": <span className="text-white">false</span><br />
            <span className="text-[var(--sage)]">{"}"}</span>
          </div>
        </div>
      </div>

      {/* floating cards */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -left-4 top-24 hidden sm:block glass-card rounded-2xl px-3.5 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--forest)] text-white">
            <HiOutlineSparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">Deployed</div>
            <div className="text-xs font-semibold">RAG · 24k docs</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -right-3 bottom-16 hidden sm:block glass-card rounded-2xl px-3.5 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-[var(--tangerine)] text-white">
            <HiOutlineBolt className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[var(--ink-soft)]">Automated</div>
            <div className="text-xs font-semibold">312 tasks / day</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        className="absolute right-6 top-6 hidden md:flex glass-card rounded-full px-3 py-1.5 text-[11px] items-center gap-1.5"
      >
        <TbBrandOpenai className="text-[var(--forest)]" /> n8n · connected
      </motion.div>
    </motion.div>
  );
}
