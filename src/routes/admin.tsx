import { createFileRoute, Link, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { LogOut } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { signOut } from "@/lib/admin.functions";

/**
 * The admin area's shell. Everything under /admin is for one person and must never be indexed,
 * so the whole branch carries noindex and the pages themselves check the session.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin | Automa8" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

const navLinks = [
  { to: "/admin", label: "Proposals" },
  { to: "/admin/rates", label: "Rates" },
] as const;

function AdminLayout() {
  const router = useRouter();
  const signOutFn = useServerFn(signOut);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onLogin = pathname.startsWith("/admin/login");

  async function handleSignOut() {
    await signOutFn();
    await router.navigate({ to: "/admin/login" });
    await router.invalidate();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur print:hidden">
        <div className="container-page flex h-16 items-center gap-4">
          <Link to="/" className="shrink-0">
            <Wordmark height={22} />
          </Link>
          <span className="hidden rounded-full border border-border px-2.5 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-brand sm:inline">
            Admin
          </span>

          {!onLogin && (
            <>
              <nav className="ml-auto flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    activeOptions={{ exact: link.to === "/admin" }}
                    activeProps={{ className: "bg-secondary text-foreground" }}
                    className="rounded-[10px] px-3 py-2 font-display text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                onClick={handleSignOut}
                // The label is hidden on narrow screens, so name the button for screen readers.
                aria-label="Sign out"
                className="flex items-center gap-1.5 rounded-[10px] border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <LogOut className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          )}
        </div>
      </header>

      <main className="container-page py-8 print:p-0">
        <Outlet />
      </main>
    </div>
  );
}
