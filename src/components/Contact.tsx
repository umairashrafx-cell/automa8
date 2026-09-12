import { useId, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
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
      className="border-t border-border bg-card py-24 md:py-32 lg:py-40"
    >
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2
            id="contact-title"
            className="mt-5 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
          >
            Have something worth building?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Tell us what you&apos;re trying to build, improve or automate.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#start-project" className="btn btn-primary group">
              Start a Project
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
            <a
              href={whatsappLink("Hi, I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary group"
            >
              Chat on WhatsApp
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <ul className="mt-12 space-y-3 border-t border-border pt-6 text-[15px]">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {contact.email}
              </a>
            </li>
            {contact.calLink && (
              <li>
                {/* Opens Cal.com directly: booking inside an embedded iframe fails in Chrome. */}
                <a
                  href={`https://cal.com/${contact.calLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  Prefer a call? Book a time
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          {status.state === "sent" ? (
            <div
              id="start-project"
              role="status"
              className="flex min-h-[460px] flex-col items-center justify-center rounded-3xl border border-border bg-background p-8 text-center sm:p-10"
            >
              <CheckCircle2 className="h-10 w-10 text-foreground" aria-hidden strokeWidth={1.25} />
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                Thanks{status.name ? `, ${status.name}` : ""} — your brief is in.
              </h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
                We&apos;ll read it and reply by email. If it&apos;s urgent, message us on WhatsApp.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink("Hi, I've just sent a project brief through your website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  WhatsApp
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setStatus({ state: "idle" })}
                  className="btn text-muted-foreground hover:text-foreground"
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
              className="relative overflow-hidden rounded-3xl border border-border bg-background p-6 sm:p-8 lg:p-10"
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
                className="btn btn-primary group mt-7 w-full py-4! disabled:cursor-wait disabled:opacity-70"
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
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </>
                )}
              </button>

              <div
                aria-live="polite"
                className="mt-4 text-center text-[13px] leading-relaxed text-muted-foreground"
              >
                {status.state === "invalid" && <p className="text-foreground">{status.message}</p>}
                {status.state === "unavailable" && <UnavailableNotice brief={status.brief} />}
                {(status.state === "idle" || status.state === "sending") && (
                  <p>Your brief comes straight to our inbox. We reply by email.</p>
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
    <div className="rounded-2xl border border-border bg-card p-4 text-left">
      <p className="text-sm text-foreground">The form couldn&apos;t send just now.</p>
      <p className="mt-1">Your details are still here — send them another way in one click:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappLink(`Hi, I'd like to start a project.\n\n${text}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary px-4! py-2.5! text-sm!"
        >
          Send on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a href={mailto} className="btn btn-secondary px-4! py-2.5! text-sm!">
          Send by email
        </a>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 hover:border-border-strong focus:border-foreground focus:outline-none focus:ring-4 focus:ring-foreground/5";

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
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
      {label}
      {optional && <span className="ml-1.5 font-normal text-muted-foreground">(optional)</span>}
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
        maxLength={3000}
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
