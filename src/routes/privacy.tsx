import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 prose">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: August 2026</p>

      <h2>1. Information We Collect</h2>
      <p>
        When you contact Automa8 via our website, WhatsApp, or email, we collect
        information you provide directly — such as your name, email, company,
        project type, and message content — to respond to your inquiry and
        deliver our services.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use collected information to communicate with you about your project,
        schedule consultations, deliver contracted services, and improve our
        offerings. We do not sell your personal information to third parties.
      </p>

      <h2>3. Third-Party Services</h2>
      <p>
        We use third-party tools including Calendly (scheduling), WhatsApp
        Business (messaging), and hosting providers to operate our website and
        services. These providers process data according to their own privacy
        policies.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain client communication and project data for as long as
        necessary to provide services and comply with legal obligations.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        data by contacting us at hello@automa8.co.
      </p>

      <h2>6. Contact</h2>
      <p>
        For privacy-related questions, reach us at{" "}
        <a href="mailto:hello@automa8.co">hello@automa8.co</a> or via WhatsApp
        at +92 342 9900050.
      </p>
    </div>
  );
}