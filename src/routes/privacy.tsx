import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Automa8" },
      {
        name: "description",
        content: "How Automa8 collects, uses and protects the information you share with us.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <h2>1. Information We Collect</h2>
      <p>
        When you contact Automa8 via our website, WhatsApp, or email, we collect information you
        provide directly — such as your name, email, business or company name, a description of what
        you want to build, an optional budget, and message content — to respond to your inquiry and
        deliver our services.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use collected information to communicate with you about your project, schedule
        consultations, deliver contracted services, and improve our offerings. We do not sell your
        personal information to third parties.
      </p>

      <h2>3. Third-Party Services</h2>
      <p>
        We use third-party tools including Cal.com (scheduling), WhatsApp (messaging), Supabase
        (securely storing project form submissions), Resend (email notifications) and hosting
        providers to operate our website and services. These providers process data according to
        their own privacy policies.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain client communication and project data for as long as necessary to provide services
        and comply with legal obligations.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data by contacting us
        at hello@automa8.co.
      </p>

      <h2>6. Contact</h2>
      <p>
        For privacy-related questions, reach us at{" "}
        <a href="mailto:hello@automa8.co">hello@automa8.co</a> or via WhatsApp at +92 342 9900050.
      </p>
    </LegalPage>
  );
}
