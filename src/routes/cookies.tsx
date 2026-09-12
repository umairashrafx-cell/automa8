import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | Automa8" },
      { name: "description", content: "How the Automa8 website uses cookies." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cookies` }],
  }),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy" updated="August 2026">
      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device that help websites function properly and
        understand visitor behavior.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        Our website may use essential cookies to remember your preferences and, if applicable,
        analytics cookies to understand site traffic and improve the user experience.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Embedded tools such as scheduling (Cal.com) and chat/support widgets may set their own
        cookies according to their respective privacy policies.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control or delete cookies through your browser settings. Disabling cookies may
        affect some site functionality.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions: <a href="mailto:hello@automa8.co">hello@automa8.co</a>
      </p>
    </LegalPage>
  );
}
