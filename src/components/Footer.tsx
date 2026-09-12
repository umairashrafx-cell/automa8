import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { contact, navLinks, whatsappLink } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

const socials = [
  { href: contact.linkedin, label: "LinkedIn", icon: FaLinkedin, external: true },
  { href: whatsappLink(), label: "WhatsApp", icon: FaWhatsapp, external: true },
  { href: `mailto:${contact.email}`, label: "Email", icon: Mail, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:py-16">
        <div className="col-span-2 md:col-span-1">
          <a href="/" aria-label="Automa8 home" className="inline-block rounded-md">
            <Wordmark className="text-lg" />
          </a>
          <p className="mt-3 text-sm text-text-faint">AI · Web · Automation</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-faint">Links</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-text-soft transition-colors hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-faint">Social</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2.5 text-text-soft transition-colors hover:text-text"
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-[13px] text-text-faint md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <span>© 2026 Automa8. All Rights Reserved.</span>
            <span>Built by Umair Ashraf.</span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-text">
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
