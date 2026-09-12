import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Clock, X } from "lucide-react";
import {
  getConsultationEventTypes,
  getConsultationSlots,
  type CalendlyEventType,
} from "@/lib/calendly.functions";
import { whatsappLink } from "@/lib/site";

export const BOOKING_EVENT = "umair:open-booking";

export function openBooking() {
  window.dispatchEvent(new Event(BOOKING_EVENT));
}

/** Days shown per page in the date strip. */
const DAYS_PER_PAGE = 7;

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
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
            className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-line-strong bg-surface shadow-2xl sm:max-w-[720px] sm:rounded-3xl"
          >
            <button
              ref={closeRef}
              onClick={() => setOpen(false)}
              aria-label="Close booking"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line-strong text-text-soft transition-colors hover:text-text"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
            <BookingFlow />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BookingFlow() {
  const loadEventTypes = useServerFn(getConsultationEventTypes);

  const typesQuery = useQuery({
    queryKey: ["calendly", "event-types"],
    queryFn: () => loadEventTypes(),
    staleTime: 60_000,
    retry: 1,
  });

  const [selected, setSelected] = useState<CalendlyEventType | null>(null);

  useEffect(() => {
    const list = typesQuery.data?.eventTypes;
    if (list && list.length === 1 && !selected) setSelected(list[0]!);
  }, [typesQuery.data, selected]);

  return (
    <div className="p-7 sm:p-9">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">Book a call</p>
      <h2
        id="booking-title"
        className="mt-3 pr-10 font-display text-2xl font-semibold text-text sm:text-3xl"
      >
        {selected ? "Pick a time that works." : "Choose a session."}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-text-soft">
        {selected
          ? `${selected.duration} minutes · times shown in your local timezone.`
          : "A short call to talk through what you want to build."}
      </p>

      {typesQuery.isLoading && <SkeletonRows />}

      {typesQuery.isError && (
        <FallbackNotice message="Live availability couldn't be loaded right now." />
      )}

      {typesQuery.data && typesQuery.data.eventTypes.length === 0 && (
        <FallbackNotice
          message="No public session types are published yet."
          href={typesQuery.data.schedulingUrl}
        />
      )}

      {typesQuery.data && typesQuery.data.eventTypes.length > 0 && !selected && (
        <div className="mt-7 space-y-3">
          {typesQuery.data.eventTypes.map((t) => (
            <button
              key={t.uri}
              onClick={() => setSelected(t)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface-2 p-4 text-left transition-colors hover:border-brand/50"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Clock className="h-5 w-5" aria-hidden />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text">{t.name}</div>
                <div className="text-xs text-text-soft">
                  {t.duration} minutes{t.description ? ` · ${t.description.slice(0, 70)}` : ""}
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-text-faint group-hover:text-brand"
                aria-hidden
              />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <SlotPicker
          eventType={selected}
          canGoBack={(typesQuery.data?.eventTypes.length ?? 0) > 1}
          onBack={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function SlotPicker({
  eventType,
  canGoBack,
  onBack,
}: {
  eventType: CalendlyEventType;
  canGoBack: boolean;
  onBack: () => void;
}) {
  const loadSlots = useServerFn(getConsultationSlots);
  const [page, setPage] = useState(0);
  const [activeDay, setActiveDay] = useState(0);

  const today = useMemo(() => startOfDay(new Date()), []);
  const rangeStart = useMemo(() => addDays(today, page * DAYS_PER_PAGE), [today, page]);
  const days = useMemo(
    () => Array.from({ length: DAYS_PER_PAGE }, (_, i) => addDays(rangeStart, i)),
    [rangeStart],
  );

  // Calendly requires start_time to be in the future.
  const startTime = useMemo(() => {
    const now = new Date();
    const s = new Date(rangeStart);
    return (s < now ? new Date(now.getTime() + 60_000) : s).toISOString();
  }, [rangeStart]);
  const endTime = useMemo(() => addDays(rangeStart, DAYS_PER_PAGE).toISOString(), [rangeStart]);

  const slotsQuery = useQuery({
    queryKey: ["calendly", "slots", eventType.uri, startTime],
    queryFn: () => loadSlots({ data: { eventTypeUri: eventType.uri, startTime, endTime } }),
    staleTime: 60_000,
    retry: 1,
  });

  const slotsByDay = useMemo(() => {
    const map = new Map<string, { startTime: string; schedulingUrl: string }[]>();
    for (const slot of slotsQuery.data ?? []) {
      const key = startOfDay(new Date(slot.startTime)).toDateString();
      const list = map.get(key) ?? [];
      list.push(slot);
      map.set(key, list);
    }
    return map;
  }, [slotsQuery.data]);

  const goPage = useCallback((delta: number) => {
    setPage((p) => Math.max(0, p + delta));
    setActiveDay(0);
  }, []);

  const daySlots = slotsByDay.get(days[activeDay]!.toDateString()) ?? [];

  return (
    <div className="mt-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-text-soft">
          <CalendarDays className="h-4 w-4" aria-hidden />
          {rangeStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goPage(-1)}
            disabled={page === 0}
            aria-label="Previous week"
            className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-text transition-colors hover:border-brand/50 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            onClick={() => goPage(1)}
            aria-label="Next week"
            className="grid h-8 w-8 place-items-center rounded-full border border-line-strong text-text transition-colors hover:border-brand/50"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const count = (slotsByDay.get(d.toDateString()) ?? []).length;
          const active = i === activeDay;
          return (
            <button
              key={d.toISOString()}
              onClick={() => setActiveDay(i)}
              disabled={count === 0}
              aria-pressed={active}
              className={`rounded-xl border px-1 py-2.5 text-center transition-colors ${
                active
                  ? "border-brand bg-brand text-ink"
                  : count === 0
                    ? "border-line text-text-faint/50"
                    : "border-line text-text hover:border-brand/50"
              }`}
            >
              <div className="text-[10px] uppercase tracking-widest opacity-70">
                {d.toLocaleDateString(undefined, { weekday: "short" })}
              </div>
              <div className="text-sm font-medium">{d.getDate()}</div>
              <div className="text-[9px] opacity-70">{count > 0 ? `${count}` : "—"}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 min-h-[132px]">
        {slotsQuery.isLoading && <SkeletonRows />}
        {slotsQuery.isError && (
          <FallbackNotice
            message="Availability couldn't be loaded for this week."
            href={eventType.schedulingUrl}
          />
        )}
        {slotsQuery.data && daySlots.length === 0 && (
          <p className="text-sm text-text-soft">No open times this week — try the next one.</p>
        )}
        {daySlots.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {daySlots.map((s) => (
              <a
                key={s.startTime}
                href={s.schedulingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-line-strong px-3 py-3 text-center text-sm font-medium text-text transition-colors hover:border-text hover:bg-text hover:text-ink"
              >
                {new Date(s.startTime).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {canGoBack ? (
          <button
            onClick={onBack}
            className="text-xs uppercase tracking-widest text-text-soft transition-colors hover:text-text"
          >
            ← Change session
          </button>
        ) : (
          <span />
        )}
        <a
          href={eventType.schedulingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest text-brand hover:underline"
        >
          Full calendar
        </a>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="mt-7 space-y-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-14 animate-pulse rounded-2xl bg-surface-2" />
      ))}
    </div>
  );
}

function FallbackNotice({ message, href }: { message: string; href?: string }) {
  return (
    <div className="mt-7 rounded-2xl border border-line bg-surface-2 p-5">
      <p className="text-sm text-text-soft">{message}</p>
      <a
        href={href ?? whatsappLink("Hi Umair, I'd like to book a call about a project.")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-text px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white"
      >
        {href ? "Open the booking calendar" : "Message me on WhatsApp"}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
