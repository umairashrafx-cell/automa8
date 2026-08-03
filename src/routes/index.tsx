import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Automa8 — AI Agents, Voice AI & Workflow Automation" },
      {
        name: "description",
        content:
          "Automa8 builds AI agents, Voice AI receptionists, RAG systems, and workflow automation for growing businesses. Book a free AI strategy call.",
      },
      { property: "og:title", content: "Automa8 — AI Agents, Voice AI & Workflow Automation" },
      {
        property: "og:description",
        content:
          "Intelligent AI systems engineered for measurable business outcomes. Book a free 30-minute AI strategy call with Automa8.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BookingDialog />
    </div>

  );
}
