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
    <footer className="border-t border-border bg-card">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
        <div className="col-span-2 md:col-span-1">
          <a href="/" aria-label="Automa8 home" className="inline-block rounded-md">
            <Wordmark className="text-lg" />
          </a>
          <p className="eyebrow mt-4">AI · Web · Automation</p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-3 text-[15px]">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
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
        <p className="container-page py-6 text-[13px] text-muted-foreground">© 2026 Automa8</p>
      </div>
    </footer>
  );
}
