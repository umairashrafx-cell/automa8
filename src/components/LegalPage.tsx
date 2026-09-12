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
      <main className="container-page max-w-3xl pb-24 pt-16 md:pb-32 md:pt-24">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
        </a>
        <h1 className="mt-8 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="legal mt-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
