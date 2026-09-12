export const SITE_URL = "https://www.automa8.co";

export const contact = {
  email: "hello@automa8.co",
  whatsappNumber: "923429900050",
  whatsappDisplay: "+92 342 9900050",
  linkedin: "https://www.linkedin.com/in/umairock/",
  /**
   * Cal.com booking link, the part after cal.com/ (e.g. "automa8/intro-call").
   * Leave empty to hide the "Book a time" option.
   */
  calLink: "automa8/30min",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Absolute-from-root hashes so the same links work on the legal pages too. */
export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
