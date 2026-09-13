import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { contact, pageHead, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact | Automa8",
      description:
        "Start a project with Automa8. Tell me what you’re trying to build, automate or improve.",
      path: "/contact",
    }),
  component: ContactPage,
});

const channels = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false },
  {
    label: "WhatsApp",
    value: contact.whatsappDisplay,
    href: whatsappLink("Hi, I'd like to talk about a project."),
    external: true,
  },
  { label: "LinkedIn", value: "Umair Ashraf", href: contact.linkedin, external: true },
  ...(contact.calLink
    ? [
        {
          label: "Book a call",
          value: "30-minute intro call",
          href: `https://cal.com/${contact.calLink}`,
          external: true,
        },
      ]
    : []),
];

function ContactPage() {
  return (
    <SiteLayout>
      <div className="container-page grid gap-14 pb-24 pt-14 md:pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:pb-[120px] lg:pt-28">
        <div>
          <p className="eyebrow animate-rise flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden />
            Contact
          </p>
          <h1
            className="animate-rise mt-6 text-[40px] leading-[1.04] tracking-[-0.035em] text-foreground min-[420px]:text-[44px] sm:text-[52px] md:text-[60px] lg:text-[56px] xl:text-[68px]"
            style={{ animationDelay: "60ms" }}
          >
            Let’s build something useful.
          </h1>
          <p
            className="animate-rise mt-6 max-w-md text-base leading-[1.7] text-muted-foreground md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            Tell me what you’re trying to build, automate or improve.
          </p>

          <ul
            className="animate-rise mt-12 divide-y divide-border border-y border-border"
            style={{ animationDelay: "180ms" }}
          >
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block text-[13px] text-muted-foreground">{c.label}</span>
                    <span className="mt-0.5 block text-[15px] text-foreground transition-colors duration-200 group-hover:text-brand">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-brand transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise lg:pt-2" style={{ animationDelay: "160ms" }}>
          <ContactForm />
        </div>
      </div>
    </SiteLayout>
  );
}
