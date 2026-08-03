import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  HiOutlinePhone, HiOutlineGlobeAlt, HiOutlineEnvelope, HiOutlineMapPin, HiOutlineArrowUpRight,
} from "react-icons/hi2";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { openBooking } from "@/components/BookingDialog";


const contacts = [
  { icon: HiOutlinePhone, label: "Phone / WhatsApp", value: "+92 342 9900050", href: "https://wa.me/923429900050" },
  { icon: HiOutlineEnvelope, label: "Email", value: "hello@automa8.co", href: "mailto:hello@automa8.co" },
  { icon: HiOutlineGlobeAlt, label: "Website", value: "automa8.co", href: "https://automa8.co" },
  { icon: FaLinkedin, label: "LinkedIn", value: "/in/umairock", href: "https://www.linkedin.com/in/umairock/" },
  { icon: HiOutlineMapPin, label: "Location", value: "Lahore, Pakistan", href: null },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
            <span className="h-1 w-1 rounded-full bg-[var(--tangerine)]" /> Contact
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight">
            Let's Build Your <span className="italic font-light text-[var(--forest)]">AI System.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink-soft)] max-w-md">
            Book a consultation and I'll map your first (or next) high-leverage AI system. Free 30-minute strategy call.
          </p>

          <div className="mt-10 space-y-3">
            {contacts.map((c) => {
              const Inner = (
                <div className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 hover:border-[var(--sage)] transition-colors">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cream)]/60 text-[var(--forest)]">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">{c.label}</div>
                    <div className="text-sm font-medium text-[var(--ink)]">{c.value}</div>
                  </div>
                  {c.href && <HiOutlineArrowUpRight className="h-4 w-4 text-[var(--ink-soft)] group-hover:text-[var(--forest)]" />}
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer">{Inner}</a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </div>

          <a
            href="https://wa.me/923429900050"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 text-sm font-medium transition-colors"
          >
            <FaWhatsapp className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onSubmit={onSubmit}
          className="glass-card rounded-[28px] p-7 lg:p-9 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Company" name="company" />
            <SelectField label="Project Type" name="projectType" options={["AI Agent", "Voice AI", "Workflow Automation", "RAG System", "AI Strategy", "Other"]} />
          </div>
          <SelectField label="Budget" name="budget" options={["< $2,000", "$2,000 – $5,000", "$5,000 – $15,000", "$15,000+"]} />
          <div>
            <label className="block text-[11px] uppercase tracking-widest text-[var(--ink-soft)] mb-1.5">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--sage)]/30 transition"
              placeholder="Tell me about the problem you'd like AI to solve..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] hover:bg-[var(--forest)] text-white py-3.5 text-sm font-medium transition-colors"
          >
            {sent ? "Message sent ✓" : "Book AI Strategy Call"}
            {!sent && <HiOutlineArrowUpRight className="h-4 w-4" />}
          </motion.button>
          <button
            type="button"
            onClick={openBooking}
            className="w-full rounded-full border border-black/10 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--forest)] transition-colors"
          >
            Or pick a time slot instantly →
          </button>
          <p className="text-center text-[11px] text-[var(--ink-soft)]">
            You'll hear back within one business day.
          </p>

        </motion.form>
      </div>
    </section>
  );
}

function Field(props: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-[var(--ink-soft)] mb-1.5">{props.label}</label>
      <input
        name={props.name}
        type={props.type || "text"}
        required={props.required}
        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--sage)]/30 transition"
      />
    </div>
  );
}

function SelectField(props: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-[var(--ink-soft)] mb-1.5">{props.label}</label>
      <select
        name={props.name}
        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--sage)]/30 transition"
        defaultValue=""
      >
        <option value="" disabled>Select...</option>
        {props.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
