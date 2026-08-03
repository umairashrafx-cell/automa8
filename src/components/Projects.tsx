import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { SectionHeader } from "./SectionHeader";

type Project = {
  title: string;
  category: string;
  desc: string;
  metric: { value: string; label: string };
  status: "Live" | "Deployed" | "Scaling";
  size: "lg" | "md" | "sm";
  visual: "workflow" | "json" | "voice" | "analytics" | "architecture" | "chat";
};

const projects: Project[] = [
  { title: "AI Restaurant Receptionist", category: "Voice AI", desc: "Handles reservations, menu queries, and callbacks in real time across 6 languages.", metric: { value: "94%", label: "call resolution" }, status: "Live", size: "lg", visual: "voice" },
  { title: "WhatsApp Sales Agent", category: "Conversational AI", desc: "Qualifies leads and books demos automatically from WhatsApp inbox.", metric: { value: "3.2x", label: "conversion lift" }, status: "Deployed", size: "md", visual: "chat" },
  { title: "Voice Appointment Scheduler", category: "Voice AI", desc: "Outbound + inbound voice agent syncing with Google Calendar and CRM.", metric: { value: "1,200+", label: "bookings / mo" }, status: "Live", size: "md", visual: "workflow" },
  { title: "Retail AI Assistant", category: "AI Agent", desc: "Personalized product recommender across Shopify and Instagram DMs.", metric: { value: "+41%", label: "AOV uplift" }, status: "Scaling", size: "sm", visual: "analytics" },
  { title: "AI Knowledge Base", category: "RAG System", desc: "Private RAG over 24k docs with citations for an insurance ops team.", metric: { value: "24k", label: "docs indexed" }, status: "Deployed", size: "sm", visual: "json" },
  { title: "Customer Support AI Agent", category: "AI Agent", desc: "Tier-1 support automation with clean human handoff and audit trails.", metric: { value: "78%", label: "auto-resolved" }, status: "Live", size: "md", visual: "architecture" },
];

const statusColor: Record<Project["status"], string> = {
  Live: "bg-emerald-500/15 text-emerald-700",
  Deployed: "bg-[var(--tangerine)]/15 text-[var(--tangerine)]",
  Scaling: "bg-[var(--sage)]/20 text-[var(--forest)]",
};

const sizeSpan: Record<Project["size"], string> = {
  lg: "md:col-span-2 md:row-span-2",
  md: "md:col-span-2",
  sm: "md:col-span-1",
};

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--sage)]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-[1280px] px-6 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <span className="h-1 w-1 rounded-full bg-[var(--tangerine)]" /> Featured Projects
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Enterprise AI systems, <span className="italic font-light text-[var(--sage)]">shipped and running.</span>
          </h2>
          <p className="mt-4 text-white/60 text-[15px] leading-relaxed">
            A selection of production deployments across hospitality, retail, healthcare, and SaaS.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-4 md:auto-rows-[220px] gap-5">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`group relative rounded-[24px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] p-6 overflow-hidden ${sizeSpan[p.size]}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-[10.5px] uppercase tracking-widest text-white/50">{p.category}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                  ● {p.status}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-[13px] text-white/60 leading-relaxed max-w-md">{p.desc}</p>

              <div className="mt-5">
                <ProjectVisual variant={p.visual} />
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl font-medium text-[var(--sage)]">{p.metric.value}</div>
                  <div className="text-[11px] uppercase tracking-wider text-white/50">{p.metric.label}</div>
                </div>
                <HiOutlineArrowUpRight className="h-4 w-4 text-white/50 group-hover:text-white transition-colors" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ variant }: { variant: Project["visual"] }) {
  if (variant === "voice") {
    return (
      <div className="rounded-2xl bg-black/40 border border-white/5 p-3 flex items-end gap-1 h-16">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ height: [`${25 + (i % 5) * 10}%`, `${65 + (i % 3) * 10}%`, `${25 + (i % 5) * 10}%`] }}
            transition={{ duration: 1.2 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.03 }}
            className="flex-1 rounded-full bg-gradient-to-t from-[var(--forest)] to-[var(--sage)]"
          />
        ))}
      </div>
    );
  }
  if (variant === "json") {
    return (
      <pre className="rounded-2xl bg-black/40 border border-white/5 p-3 font-mono text-[10.5px] text-white/70 overflow-hidden">
        {`{ "matches": 12, "grounded": true,
  "sources": ["policy_v3.pdf", "faq.md"] }`}
      </pre>
    );
  }
  if (variant === "chat") {
    return (
      <div className="rounded-2xl bg-black/40 border border-white/5 p-3 text-[11px] space-y-1.5">
        <div className="text-white/60"><span className="text-[var(--sage)]">User:</span> Do you deliver to Lahore?</div>
        <div className="text-white/60"><span className="text-[var(--tangerine)]">Agent:</span> Yes — free above PKR 3,000.</div>
      </div>
    );
  }
  if (variant === "workflow") {
    return (
      <div className="rounded-2xl bg-black/40 border border-white/5 p-3 flex items-center justify-between">
        {["Trigger", "GPT", "Sheets", "Notify"].map((s, i) => (
          <div key={s} className="flex-1 text-center">
            <div className="mx-auto h-6 w-6 rounded-lg bg-[var(--sage)]/30 border border-[var(--sage)]/40" />
            <div className="mt-1 text-[9.5px] uppercase tracking-widest text-white/50">{s}</div>
          </div>
        ))}
      </div>
    );
  }
  if (variant === "analytics") {
    return (
      <div className="rounded-2xl bg-black/40 border border-white/5 p-3 flex items-end gap-1.5 h-16">
        {[40, 60, 45, 75, 65, 90, 80].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-[var(--tangerine)]/60 to-[var(--sage)]" style={{ height: `${h}%` }} />
        ))}
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-black/40 border border-white/5 p-3 grid grid-cols-3 gap-2 text-[10px] text-white/60">
      <div className="rounded-lg bg-white/5 p-2">Ingest</div>
      <div className="rounded-lg bg-white/5 p-2">Reason</div>
      <div className="rounded-lg bg-white/5 p-2">Act</div>
    </div>
  );
}
