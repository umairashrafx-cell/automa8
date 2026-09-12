import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid
          ? "border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-background"
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
                className="rounded-full px-4 py-2 text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="btn btn-primary group hidden h-10! px-5! text-sm! md:inline-flex"
          >
            Start a Project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-foreground md:hidden"
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

      <div id="mobile-menu" hidden={!open} className="border-t border-border md:hidden">
        <ul className="container-page flex flex-col pb-6 pt-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 text-xl font-medium tracking-tight text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
