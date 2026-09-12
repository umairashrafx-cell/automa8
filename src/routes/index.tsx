import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SITE_URL, contact } from "@/lib/site";
import { projects } from "@/lib/projects";

const TITLE = "Automa8 | AI Systems, Websites & Business Automation";
const DESCRIPTION =
  "Automa8 builds AI systems, modern websites and business automation for real businesses.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Automa8",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  email: contact.email,
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressCountry: "PK" },
  founder: { "@type": "Person", name: "Umair Ashraf", sameAs: [contact.linkedin] },
  sameAs: [contact.linkedin],
  subjectOf: projects.map((p) => ({ "@type": "WebSite", name: p.name, url: p.url })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Automa8 — Websites, AI & Automation for Real Businesses.",
      },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    // The hero screenshot is preloaded automatically by React via fetchPriority="high".
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: Home,
});

function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Work />
          <Services />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
