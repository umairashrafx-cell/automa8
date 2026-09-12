import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security | Automa8" },
      {
        name: "description",
        content: "How Automa8 protects client data and credentials in the systems we build.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/security` }],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <LegalPage title="Security" updated="August 2026">
      <h2>1. Data Protection</h2>
      <p>
        We use industry-standard tools (Supabase, hosted infrastructure with TLS encryption) to
        protect client data in transit and at rest across the systems we build and operate.
      </p>

      <h2>2. Access Control</h2>
      <p>
        Access to client systems, API keys, and credentials is limited to personnel directly
        involved in delivering the engagement, and stored using secure secrets management rather
        than plaintext files.
      </p>

      <h2>3. Third-Party Integrations</h2>
      <p>
        Our automation systems connect to platforms such as OpenAI, VAPI, WhatsApp Business API, and
        CRM tools using authenticated, scoped API access — never shared or hardcoded credentials in
        client-facing code.
      </p>

      <h2>4. Client Data Ownership</h2>
      <p>
        Clients retain ownership of their business data processed through Automa8-built systems. We
        do not use client data to train external models without explicit written consent.
      </p>

      <h2>5. Reporting a Concern</h2>
      <p>
        If you discover a security vulnerability related to a system we&apos;ve built, please report
        it to <a href="mailto:hello@automa8.co">hello@automa8.co</a>.
      </p>
    </LegalPage>
  );
}
