import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { contact, whatsappLink } from "@/lib/site";

export const BOOKING_EVENT = "umair:open-booking";

export function openBooking() {
  window.dispatchEvent(new Event(BOOKING_EVENT));
}

const CAL_ORIGIN = "https://app.cal.com";
const CAL_NAMESPACE = "automa8";

type CalApi = ((...args: unknown[]) => void) & {
  ns: Record<string, (...args: unknown[]) => void>;
  loaded?: boolean;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

/**
 * Cal.com's official embed loader, adapted from their snippet. It queues calls until
 * embed.js has loaded, and is only run the first time someone opens the booking dialog.
 */
function loadCal(): CalApi {
  if (window.Cal) return window.Cal;
  const push = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
  const cal = function (...args: unknown[]) {
    const self = window.Cal!;
    if (!self.loaded) {
      self.ns = {};
      self.q = self.q || [];
      const script = document.createElement("script");
      script.src = `${CAL_ORIGIN}/embed/embed.js`;
      script.async = true;
      document.head.appendChild(script);
      self.loaded = true;
    }
    if (args[0] === "init") {
      const api = Object.assign((...a: unknown[]) => push(api, a), { q: [] as unknown[] });
      const namespace = args[1];
      if (typeof namespace === "string") {
        self.ns[namespace] = self.ns[namespace] || api;
        push(self.ns[namespace] as unknown as { q: unknown[] }, args);
        push(self as unknown as { q: unknown[] }, ["initNamespace", namespace]);
      } else {
        push(self as unknown as { q: unknown[] }, args);
      }
      return;
    }
    push(self as unknown as { q: unknown[] }, args);
  } as CalApi;
  window.Cal = cal;
  cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
  cal.ns[CAL_NAMESPACE]!("ui", {
    theme: "dark",
    cssVarsPerTheme: { dark: { "cal-brand": "#4c9dff" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
  return cal;
}

export function BookingDialog() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!contact.calLink) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-3xl border border-line-strong bg-surface shadow-2xl sm:max-w-[1000px] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">
                  Book a call
                </p>
                <h2
                  id="booking-title"
                  className="mt-2 font-display text-xl font-semibold text-text sm:text-2xl"
                >
                  Pick a time that works.
                </h2>
              </div>
              <button
                ref={closeRef}
                onClick={() => setOpen(false)}
                aria-label="Close booking"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-text-soft transition-colors hover:text-text"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <CalInline calLink={contact.calLink} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CalInline({ calLink }: { calLink: string }) {
  const containerId = "automa8-cal-inline";
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const cal = loadCal();
    const container = document.getElementById(containerId);
    // React may run this effect twice in development; only embed once per container.
    if (container && !container.hasChildNodes()) {
      cal.ns[CAL_NAMESPACE]!("inline", {
        elementOrSelector: `#${containerId}`,
        calLink,
        config: { layout: "month_view", theme: "dark" },
      });
    }
    cal.ns[CAL_NAMESPACE]!("on", {
      action: "linkReady",
      callback: () => setStatus("ready"),
    });
    cal.ns[CAL_NAMESPACE]!("on", {
      action: "linkFailed",
      callback: () => setStatus("failed"),
    });
    // If the embed hasn't reported ready after a while (blocked script, offline), offer a way out.
    const timeout = window.setTimeout(
      () => setStatus((s) => (s === "loading" ? "failed" : s)),
      12000,
    );
    return () => window.clearTimeout(timeout);
  }, [calLink]);

  return (
    <div className="relative min-h-[520px] flex-1 overflow-y-auto">
      {status !== "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          {status === "loading" ? (
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-line-strong border-t-brand"
              aria-label="Loading available times"
            />
          ) : (
            <>
              <p className="text-sm text-text-soft">The booking calendar didn&apos;t load here.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <a
                  href={`https://cal.com/${calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2.5 text-sm font-medium text-ink hover:bg-white"
                >
                  Open the booking page <ArrowUpRight className="h-4 w-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a
                  href={whatsappLink("Hi Umair, I'd like to book a call about a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-medium text-text hover:border-white/40"
                >
                  Message me on WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </>
          )}
        </div>
      )}
      <div
        id={containerId}
        className={`h-full w-full px-2 pb-2 sm:px-4 ${status === "failed" ? "invisible" : ""}`}
      />
    </div>
  );
}
