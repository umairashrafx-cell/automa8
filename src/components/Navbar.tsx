import { motion } from "framer-motion";
import { HiOutlineArrowUpRight, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";


const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass-card w-full max-w-[1280px] rounded-full transition-all duration-500 ${
          scrolled ? "px-3 py-2 shadow-lg" : "px-4 py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 pl-1">
            <img
              src="/automa8-logo.png"
              alt="Automa8 logo"
              className="h-12 w-auto"
            />
            <span className="font-display text-lg font-medium tracking-tight text-[var(--ink)]">Automa8</span>
          </a>


          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-[13px] font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[var(--ink)] text-white px-4 py-2 text-[13px] font-medium hover:bg-[var(--forest)] transition-colors"
            >
              Let's Build AI Systems
              <HiOutlineArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              className="lg:hidden grid place-items-center h-10 w-10 rounded-full bg-white/60"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="lg:hidden mt-3 border-t border-black/5 pt-3 grid grid-cols-2 gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-[var(--ink-soft)] rounded-xl hover:bg-black/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="col-span-2 mt-2 text-center rounded-full bg-[var(--ink)] text-white px-4 py-2.5 text-sm"
            >
              Let's Build AI Systems
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
