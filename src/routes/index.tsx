import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { HomeProjects } from "@/components/HomeProjects";
import { CtaSection } from "@/components/CtaSection";
import { SITE_URL, contact, pageHead } from "@/lib/site";
import { projects } from "@/lib/projects";

const TITLE = "Automa8 | AI Systems, Websites & Business Automation";
const DESCRIPTION =
  "Automa8 builds AI systems, modern websites and business automation for real businesses.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Automa8",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon/icon-512.png`,
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
    ...pageHead({ title: TITLE, description: DESCRIPTION, path: "/" }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <HomeProjects />
      <CtaSection />
    </SiteLayout>
  );
}
