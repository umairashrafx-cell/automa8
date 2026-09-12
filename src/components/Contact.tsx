import { useId, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { openBooking } from "@/components/BookingDialog";
import { BUDGETS, formatEnquiry } from "@/lib/enquiry";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { contact, whatsappLink } from "@/lib/site";
import { Reveal } from "./Reveal";

type Brief = { name: string; email: string; company: string; budget: string; project: string };

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; name: string }
  | { state: "invalid"; message: string }
  | { state: "unavailable"; brief: Brief };

export function Contact() {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const brief: Brief = {
      name: field("name"),
      email: field("email"),
      company: field("company"),
      budget: field("budget"),
      project: field("project"),
    };

    setStatus({ state: "sending" });
    try {
      const result = await send({ data: { ...brief, website: field("website") } });
      if (result.ok) {
        form.reset();
        setStatus({ state: "sent", name: brief.name.split(" ")[0] ?? brief.name });
      } else if (result.reason === "invalid") {
        setStatus({ state: "invalid", message: result.message });
      } else {
        setStatus({ state: "unavailable", brief });
      }
    } catch {
      setStatus({ state: "unavailable", brief });
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line py-20 md:py-28"
    >
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div
        className="absolute bottom-[-30%] left-1/2 -z-10 h-[520px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]"
        aria-hidden
      />

      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal className="lg:pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand">Contact</p>
          <h2
            id="contact-title"
            className="mt-4 font-display text-[34px] font-semibold leading-[1.08] text-text sm:text-5xl"
          >
            Have a business problem worth solving?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-soft">
            Tell me what you&apos;re trying to build, automate or improve.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#start-project"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-text px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-white lg:hidden"
            >
              Start a Project <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={whatsappLink("Hi Umair, I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-white/40 hover:bg-white/[0.04]"
            >
              <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden />
              Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <ul className="mt-10 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 text-text-soft transition-colors hover:text-text"
              >
                <Mail className="h-4 w-4 text-brand" aria-hidden />
                {contact.email}
              </a>
            </li>
            {contact.calLink && (
              <li>
                <button
                  type="button"
                  onClick={openBooking}
                  className="inline-flex items-center gap-3 text-text-soft transition-colors hover:text-text"
                >
                  <CalendarDays className="h-4 w-4 text-brand" aria-hidden />
                  Prefer a call? Book a time
                </button>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          {status.state === "sent" ? (
            <div
              id="start-project"
              role="status"
              className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-8 text-center sm:p-10"
            >
              <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-2xl font-semibold text-text">
                Thanks{status.name ? `, ${status.name}` : ""} — your brief is in.
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-text-soft">
                I&apos;ll read it and reply by email. If it&apos;s urgent, you can also message me
                on WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(
                    "Hi Umair, I've just sent a project brief through your website.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-text transition-colors hover:border-white/40"
                >
                  <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden />
                  WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle" })}
                  className="rounded-full px-5 py-3 text-sm font-medium text-text-soft transition-colors hover:text-text"
                >
                  Send another brief
                </button>
              </div>
            </div>
          ) : (
            <form
              id="start-project"
              onSubmit={onSubmit}
              aria-label="Start a project"
              aria-busy={status.state === "sending"}
              className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              {/* Honeypot for bots — hidden from people and assistive tech */}
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Business / Company" name="company" autoComplete="organization" />
                <SelectField label="Budget" optional name="budget" options={[...BUDGETS]} />
              </div>
              <div className="mt-5">
                <TextArea label="What do you want to build?" name="project" required />
              </div>

              <button
                type="submit"
                disabled={status.state === "sending"}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-text py-4 text-sm font-medium text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {status.state === "sending" ? (
                  <>
                    Sending
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  </>
                ) : (
                  <>
                    Start a Project
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </>
                )}
              </button>

              <div
                aria-live="polite"
                className="mt-4 text-center text-[13px] leading-relaxed text-text-faint"
              >
                {status.state === "invalid" && <p className="text-text">{status.message}</p>}
                {status.state === "unavailable" && <UnavailableNotice brief={status.brief} />}
                {(status.state === "idle" || status.state === "sending") && (
                  <p>Your brief comes straight to me. I reply by email.</p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** If sending fails, keep the visitor's words and give them two one-click ways to deliver them. */
function UnavailableNotice({ brief }: { brief: Brief }) {
  const text = formatEnquiry(brief);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    `New project enquiry${brief.company ? ` — ${brief.company}` : ""}`,
  )}&body=${encodeURIComponent(text)}`;

  return (
    <div className="rounded-xl border border-line-strong bg-ink/60 p-4 text-left">
      <p className="text-sm text-text">The form couldn&apos;t send just now.</p>
      <p className="mt-1">Your details are still here — send them another way in one click:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappLink(`Hi Umair, I'd like to start a project.\n\n${text}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-ink hover:bg-white"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden /> Send on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-text hover:border-white/40"
        >
          <Mail className="h-4 w-4" aria-hidden /> Send by email
        </a>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-ink/60 px-4 py-3 text-[15px] text-text placeholder:text-text-faint transition-colors hover:border-white/25 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

function Label({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-text">
      {label}
      {optional && <span className="ml-1.5 font-normal text-text-faint">(optional)</span>}
    </label>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={props.label} optional={!props.required} />
      <input
        id={id}
        name={props.name}
        type={props.type ?? "text"}
        required={props.required}
        autoComplete={props.autoComplete}
        maxLength={200}
        className={inputClass}
      />
    </div>
  );
}

function TextArea(props: { label: string; name: string; required?: boolean }) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={props.label} />
      <textarea
        id={id}
        name={props.name}
        rows={5}
        required={props.required}
        maxLength={2000}
        placeholder="A website, an AI assistant, an automated workflow — or a problem you want solved."
        className={`${inputClass} resize-y`}
      />
    </div>
  );
}

function SelectField(props: {
  label: string;
  name: string;
  options: string[];
  optional?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} label={props.label} optional={props.optional} />
      <select id={id} name={props.name} defaultValue="" className={inputClass}>
        <option value="">Select…</option>
        {props.options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
