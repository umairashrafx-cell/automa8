import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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
  const close = () => setOpen(false);

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
        <Link
          to="/"
          aria-label="Automa8 home"
          className="-ml-1 rounded-md px-1 py-1"
          onClick={close}
        >
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                activeProps={{ className: "text-foreground!" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="btn btn-primary group hidden h-10! px-5! text-sm! md:inline-flex"
          >
            Start a Project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
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
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={close}
                className="flex items-center justify-between border-b border-border py-4 text-xl font-medium tracking-tight text-foreground"
                activeProps={{ "aria-current": "page" }}
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
                    )}
                  </>
                )}
              </Link>
            </li>
          ))}
          <li className="pt-6">
            <Link to="/contact" onClick={close} className="btn btn-primary w-full">
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
