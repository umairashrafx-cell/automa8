import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container-page max-w-3xl pb-24 pt-32 md:pt-40">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-soft transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
        </a>
        <h1 className="mt-8 font-display text-4xl font-semibold text-text sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-text-faint">Last updated: {updated}</p>
        <div className="legal mt-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
