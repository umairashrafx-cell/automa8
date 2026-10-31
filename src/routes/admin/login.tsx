import { useState, type FormEvent } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const submit = useServerFn(signIn);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setState("sending");

    const result = await submit({ data: { password } }).catch(() => null);
    if (result?.ok) {
      await router.navigate({ to: "/admin" });
      await router.invalidate();
      return;
    }
    setMessage(result?.message ?? "Couldn't sign in just now. Please try again.");
    setState("error");
  }

  return (
    <div className="mx-auto max-w-sm py-12">
      <h1 className="text-2xl tracking-[-0.02em]">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The proposal builder is private. Enter the admin password to continue.
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="h-12 w-full rounded-[10px] border border-input bg-card px-3.5 text-[15px] outline-none transition-colors focus:border-brand"
          />
        </div>

        {state === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {message}
          </p>
        )}

        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full">
          {state === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Checking…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </div>
  );
}
