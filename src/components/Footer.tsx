import { Link } from "@tanstack/react-router";
import { contact, navLinks, whatsappLink } from "@/lib/site";
import { Wordmark } from "./Wordmark";

const socials = [
  { href: contact.linkedin, label: "LinkedIn", external: true },
  { href: whatsappLink(), label: "WhatsApp", external: true },
  { href: `mailto:${contact.email}`, label: "Email", external: false },
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

        <ul className="space-y-3 text-[15px]">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={linkClass}
              >
                {s.label}
              </a>
            </li>
          ))}
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
