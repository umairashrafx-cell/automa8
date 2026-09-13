import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteLayout } from "./SiteLayout";

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
    <SiteLayout>
      <div className="container-page max-w-3xl pb-24 pt-14 md:pb-32 md:pt-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
        </Link>
        <h1 className="mt-8 text-4xl leading-[1.05] text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="legal mt-10">{children}</div>
      </div>
    </SiteLayout>
  );
}
