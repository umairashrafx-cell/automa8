import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 prose">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: August 2026</p>

      <h2>1. Services</h2>
      <p>
        Automa8 provides AI automation, voice AI, workflow engineering, and
        related consulting services as agreed upon in individual client
        engagements or proposals.
      </p>

      <h2>2. Engagement & Payment</h2>
      <p>
        Project scope, timelines, and payment terms are defined per engagement
        via a separate agreement or proposal. Unless otherwise stated, deposits
        are non-refundable once work has commenced.
      </p>

      <h2>3. Client Responsibilities</h2>
      <p>
        Clients are responsible for providing timely access, information, and
        approvals required to complete a project. Delays caused by missing
        client input may affect delivery timelines.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        Upon full payment, clients receive rights to use the delivered
        automation/workflow for their business. Automa8 retains rights to
        reusable internal frameworks, templates, and methodologies developed
        prior to or independent of the engagement.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        Automa8 is not liable for indirect, incidental, or consequential
        damages arising from the use of delivered systems, including
        third-party API outages or changes.
      </p>

      <h2>6. Termination</h2>
      <p>
        Either party may terminate an engagement with written notice. Work
        completed up to that point remains payable.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:hello@automa8.co">hello@automa8.co</a>
      </p>
    </div>
  );
}