import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Navbar() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
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
                className="rounded-full px-4 py-2 text-[15px] text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="btn btn-primary group hidden px-5! py-2.5! text-sm! md:inline-flex"
          >
            Start a Project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground md:hidden"
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
        className="border-t border-border bg-background md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-4 text-2xl font-medium tracking-tight text-foreground"
              >
                {l.label}
                <ArrowRight className="h-5 w-5 text-muted-foreground" aria-hidden />
              </a>
            </li>
          ))}
          <li className="pb-4 pt-5">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full py-4!"
            >
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
