export const SITE_URL = "https://www.automa8.co";

export const contact = {
  email: "hello@automa8.co",
  whatsappNumber: "923429900050",
  whatsappDisplay: "+92 342 9900050",
  linkedin: "https://www.linkedin.com/in/umairock/",
  instagram: "https://www.instagram.com/autom.a8/",
  facebook: "https://www.facebook.com/automa8/",
  discord: "https://discord.gg/pg7cTK8ek",
  /**
   * Cal.com booking link, the part after cal.com/ (e.g. "automa8/intro-call").
   * Leave empty to hide the "Book a call" option.
   */
  calLink: "automa8/30min",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const navLinks = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Title, description, Open Graph, Twitter and canonical tags for a page. */
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = "Automa8 — Websites, AI & Automation for Real Businesses.",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
