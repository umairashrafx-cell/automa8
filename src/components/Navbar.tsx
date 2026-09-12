import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid
          ? "border-line bg-ink/80 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/65"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between md:h-[72px]"
      >
        <a href="/" aria-label="Automa8 home" className="-ml-1 rounded-md px-1 py-1">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-text-soft transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-full bg-text px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white md:inline-flex"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-text md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-4 font-display text-2xl text-text"
              >
                {l.label}
                <ArrowUpRight className="h-5 w-5 text-text-faint" aria-hidden />
              </a>
            </li>
          ))}
          <li className="pb-3 pt-5">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-text py-3.5 text-sm font-medium text-ink"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
