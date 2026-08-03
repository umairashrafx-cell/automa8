import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  HiOutlineXMark,
  HiOutlineArrowUpRight,
  HiOutlineClock,
  HiOutlineCalendarDays,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import {
  getConsultationEventTypes,
  getConsultationSlots,
  type CalendlyEventType,
} from "@/lib/calendly.functions";

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

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(BOOKING_EVENT, handler);
    return () => window.removeEventListener(BOOKING_EVENT, handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div
            className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book a consultation"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-[720px] max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white shadow-2xl border border-black/[0.06]"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close booking"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              <HiOutlineXMark className="h-4 w-4" />
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
  });

  const [selected, setSelected] = useState<CalendlyEventType | null>(null);

  useEffect(() => {
    const list = typesQuery.data?.eventTypes;
    if (list && list.length === 1 && !selected) setSelected(list[0]!);
  }, [typesQuery.data, selected]);

  return (
    <div className="p-7 sm:p-9">
      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        <span className="h-1 w-1 rounded-full bg-[var(--tangerine)]" /> Consultation
      </div>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl font-medium tracking-tight">
        {selected ? "Pick a time that works." : "Choose your session."}
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-[var(--ink-soft)]">
        {selected
          ? `${selected.duration} minutes · times shown in your local timezone.`
          : "A free strategy call to map your first (or next) high-leverage AI system."}
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
              className="group w-full text-left flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 hover:border-[var(--sage)] transition-colors"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--cream)]/60 text-[var(--forest)]">
                <HiOutlineClock className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--ink)]">{t.name}</div>
                <div className="text-[12px] text-[var(--ink-soft)]">
                  {t.duration} minutes{t.description ? ` · ${t.description.slice(0, 70)}` : ""}
                </div>
              </div>
              <HiOutlineArrowUpRight className="h-4 w-4 text-[var(--ink-soft)] group-hover:text-[var(--forest)]" />
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
  const rangeStart = useMemo(
    () => addDays(today, page * DAYS_PER_PAGE),
    [today, page],
  );
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
  const endTime = useMemo(
    () => addDays(rangeStart, DAYS_PER_PAGE).toISOString(),
    [rangeStart],
  );

  const slotsQuery = useQuery({
    queryKey: ["calendly", "slots", eventType.uri, startTime],
    queryFn: () =>
      loadSlots({ data: { eventTypeUri: eventType.uri, startTime, endTime } }),
    staleTime: 60_000,
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
        <div className="flex items-center gap-2 text-[12px] text-[var(--ink-soft)]">
          <HiOutlineCalendarDays className="h-4 w-4" />
          {rangeStart.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goPage(-1)}
            disabled={page === 0}
            aria-label="Previous week"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/10 disabled:opacity-30 hover:border-[var(--sage)] transition-colors"
          >
            <HiOutlineChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => goPage(1)}
            aria-label="Next week"
            className="grid h-8 w-8 place-items-center rounded-full border border-black/10 hover:border-[var(--sage)] transition-colors"
          >
            <HiOutlineChevronRight className="h-4 w-4" />
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
              className={`rounded-2xl border px-1 py-2.5 text-center transition-colors ${
                active
                  ? "border-[var(--forest)] bg-[var(--forest)] text-white"
                  : count === 0
                    ? "border-black/[0.06] text-[var(--ink-soft)]/40"
                    : "border-black/[0.06] hover:border-[var(--sage)] text-[var(--ink)]"
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
          <p className="text-sm text-[var(--ink-soft)]">
            No open times this week — try the next one.
          </p>
        )}
        {daySlots.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {daySlots.map((s) => (
              <a
                key={s.startTime}
                href={s.schedulingUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-black/10 px-3 py-3 text-center text-sm font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-colors"
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
            className="text-[12px] uppercase tracking-widest text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
          >
            ← Change session
          </button>
        ) : (
          <span />
        )}
        <a
          href={eventType.schedulingUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[12px] uppercase tracking-widest text-[var(--forest)] hover:underline"
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
        <div key={i} className="h-14 rounded-2xl bg-[var(--cream)]/70 animate-pulse" />
      ))}
    </div>
  );
}

function FallbackNotice({ message, href }: { message: string; href?: string }) {
  return (
    <div className="mt-7 rounded-2xl border border-black/[0.06] bg-[var(--cream)]/50 p-5">
      <p className="text-sm text-[var(--ink-soft)]">{message}</p>
      <a
        href={href ?? "https://wa.me/923429900050"}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] hover:bg-[var(--forest)] text-white px-4 py-2.5 text-sm font-medium transition-colors"
      >
        {href ? "Open the booking calendar" : "Message me on WhatsApp"}
        <HiOutlineArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
