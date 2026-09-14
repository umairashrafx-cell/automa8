import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { FaDiscord, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { contact, navLinks, whatsappLink } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const socials = [
  { href: contact.instagram, label: "Instagram", icon: FaInstagram, external: true },
  { href: contact.facebook, label: "Facebook", icon: FaFacebookF, external: true },
  { href: contact.discord, label: "Discord", icon: FaDiscord, external: true },
  { href: contact.linkedin, label: "LinkedIn", icon: FaLinkedinIn, external: true },
  { href: whatsappLink(), label: "WhatsApp", icon: FaWhatsapp, external: true },
  { href: `mailto:${contact.email}`, label: "Email", icon: Mail, external: false },
];

const linkClass = "text-muted-foreground transition-colors duration-200 hover:text-brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label="Automa8 home" className="inline-block rounded-md">
            <Wordmark height={28} />
          </Link>
          <p className="eyebrow mt-4">AI · Web · Automation</p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Automa8 on social media">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-signal-deep hover:text-brand"
                >
                  <s.icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-3 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="space-y-3 text-[15px]" aria-label="Contact">
          <li>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {contact.whatsappDisplay}
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-muted-foreground sm:flex-row sm:justify-between">
          <p>© 2026 Automa8</p>
          <Link to="/privacy" className={linkClass}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
