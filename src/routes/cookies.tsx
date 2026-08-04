import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 prose">
      <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: August 2026</p>

      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device that help websites
        function properly and understand visitor behavior.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        Our website may use essential cookies to remember your preferences
        and, if applicable, analytics cookies to understand site traffic and
        improve the user experience.
      </p>

      <h2>3. Third-Party Cookies</h2>
      <p>
        Embedded tools such as scheduling (Calendly) and chat/support widgets
        may set their own cookies according to their respective privacy
        policies.
      </p>

      <h2>4. Managing Cookies</h2>
      <p>
        You can control or delete cookies through your browser settings.
        Disabling cookies may affect some site functionality.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions: <a href="mailto:hello@automa8.co">hello@automa8.co</a>
      </p>
    </div>
  );
}