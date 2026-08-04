import { FaLinkedin, FaWhatsapp, FaEnvelope, FaGlobe } from "react-icons/fa6";



const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];
const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/security", label: "Security" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/automa8-logo.png"
              alt="Automa8 logo"
              className="h-12 w-12 rounded-full bg-white object-contain p-1 ring-1 ring-black/5 shadow-sm"
            />
            <span className="font-display text-xl font-medium tracking-tight text-[var(--ink)]">Automa8</span>
          </div>

          <p className="mt-4 text-sm text-[var(--ink-soft)] max-w-sm leading-relaxed">
            Building Intelligent AI Systems for Modern Businesses. AI agents, Voice AI, workflow automation, and RAG systems — engineered for measurable outcomes.
          </p>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">Quick links</div>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[var(--ink)] hover:text-[var(--forest)]">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">Connect</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a className="inline-flex items-center gap-2 hover:text-[var(--forest)]" href="https://www.linkedin.com/in/umairock/" target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a></li>
            <li><a className="inline-flex items-center gap-2 hover:text-[var(--forest)]" href="https://wa.me/923429900050" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a></li>
            <li><a className="inline-flex items-center gap-2 hover:text-[var(--forest)]" href="mailto:hello@automa8.co"><FaEnvelope /> hello@automa8.co</a></li>
            <li><a className="inline-flex items-center gap-2 hover:text-[var(--forest)]" href="https://automa8.co" target="_blank" rel="noreferrer"><FaGlobe /> automa8.co</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5">
  <div className="mx-auto max-w-[1280px] px-6 py-6 flex flex-col gap-4 sm:flex-row items-center justify-between">
    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm text-[var(--ink-soft)]">
      <div>© 2026 Automa8. All Rights Reserved.</div>
      <div>Designed By Umair Ashraf.</div>
    </div>
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[var(--ink-soft)]">
      {legalLinks.map((l) => (
        <li key={l.href}>
          <a href={l.href} className="hover:text-[var(--forest)]">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>
    </footer>
  );
}
