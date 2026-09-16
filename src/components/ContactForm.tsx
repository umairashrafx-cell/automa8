import { useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { BUDGETS, PROJECT_TYPES, TIMELINES, formatEnquiry } from "@/lib/enquiry";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { contact, whatsappLink } from "@/lib/site";

type Brief = {
  name: string;
  email: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  currentSite: string;
  project: string;
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; name: string }
  | { state: "invalid"; message: string; field?: string }
  | { state: "unavailable"; brief: Brief };

/** Project enquiry form. Saves to Supabase and emails via Resend (see lib/enquiry*). */
export function ContactForm() {
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
      services: data.getAll("services").map(String),
      budget: field("budget"),
      timeline: field("timeline"),
      currentSite: field("currentSite"),
      project: field("project"),
    };

    if (brief.services.length === 0) {
      setStatus({
        state: "invalid",
        message: "Choose what you’d like to build.",
        field: "services",
      });
      form.querySelector<HTMLInputElement>('input[name="services"]')?.focus();
      return;
    }

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

  if (status.state === "sent") {
    return (
      <div
        id="project-form"
        role="status"
        className="flex min-h-[460px] flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center sm:p-10"
      >
        <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden strokeWidth={1.25} />
        <h2 className="mt-6 text-2xl tracking-[-0.02em] text-foreground">
          Thanks{status.name ? `, ${status.name}` : ""} — your inquiry is in.
        </h2>
        <p className="mt-3 max-w-sm text-base leading-[1.7] text-muted-foreground">
          I&apos;ll read it and reply by email. If it&apos;s urgent, message me on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink("Hi, I've just sent a project inquiry through your website.")}
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
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="project-form"
      onSubmit={onSubmit}
      aria-label="Project inquiry"
      aria-busy={status.state === "sending"}
      className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10"
    >
      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <ProjectTypes invalid={status.state === "invalid" && status.field === "services"} />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" autoComplete="organization" />
        <Field
          label="Current website or app"
          name="currentSite"
          autoComplete="url"
          placeholder="Link, if you have one"
        />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <SelectField label="Budget" optional name="budget" options={[...BUDGETS]} />
        <SelectField label="Timeline" optional name="timeline" options={[...TIMELINES]} />
      </div>
      <div className="mt-5">
        <TextArea label="Project description" name="project" required />
      </div>

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="btn btn-primary group mt-7 h-[52px]! w-full disabled:cursor-wait disabled:opacity-70"
      >
        {status.state === "sending" ? (
          <>
            Sending
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          </>
        ) : (
          <>
            Send Project Inquiry
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
          <p>
            Your inquiry comes straight to me. See the{" "}
            <Link
              to="/privacy"
              className="underline decoration-border-strong underline-offset-2 hover:text-brand hover:decoration-brand"
            >
              privacy policy
            </Link>
            .
          </p>
        )}
      </div>
    </form>
  );
}

/** If sending fails, keep the visitor's words and give them two one-click ways to deliver them. */
function UnavailableNotice({ brief }: { brief: Brief }) {
  const text = formatEnquiry(brief);
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    `New project inquiry${brief.company ? ` — ${brief.company}` : ""}`,
  )}&body=${encodeURIComponent(text)}`;

  return (
    <div className="rounded-2xl border border-border bg-background p-4 text-left">
      <p className="text-sm text-foreground">The form couldn&apos;t send just now.</p>
      <p className="mt-1">Your details are still here — send them another way in one click:</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={whatsappLink(`Hi, I'd like to start a project.\n\n${text}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary h-10! px-4! text-sm!"
        >
          Send on WhatsApp
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a href={mailto} className="btn btn-secondary h-10! px-4! text-sm!">
          Send by email
        </a>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 hover:border-border-strong focus:border-signal-deep focus:outline-none focus:ring-4 focus:ring-signal/15";

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

/** "What do you need?" — pick one or more. Checkboxes styled as chips. */
function ProjectTypes({ invalid }: { invalid: boolean }) {
  const hintId = useId();
  return (
    <fieldset aria-describedby={hintId} aria-invalid={invalid || undefined}>
      <legend className="mb-1 block text-sm font-medium text-foreground">What do you need?</legend>
      <p
        id={hintId}
        className={`mb-3 text-[13px] ${invalid ? "font-medium text-[#B42318]" : "text-muted-foreground"}`}
      >
        {invalid ? "Choose at least one option." : "Choose all that apply."}
      </p>
      <div className="flex flex-wrap gap-2">
        {PROJECT_TYPES.map((type) => (
          <label key={type} className="cursor-pointer">
            <input type="checkbox" name="services" value={type} className="peer sr-only" />
            <span className="inline-flex h-10 items-center rounded-[10px] border border-border bg-background px-4 text-sm text-foreground transition-colors duration-200 select-none hover:border-border-strong peer-checked:border-signal-deep peer-checked:bg-signal/10 peer-checked:text-brand peer-focus-visible:ring-4 peer-focus-visible:ring-signal/25">
              {type}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field(props: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
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
        placeholder={props.placeholder}
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
        rows={6}
        required={props.required}
        maxLength={3000}
        placeholder="What you want to build, automate or improve — and anything you already know about it."
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
