"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { AlertCircle, Mail, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buildInquiryMessage, buildWhatsAppUrl, normalizeWhatsAppNumber, type InquiryFields } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(80, "Name is too long."),
  business: z.string().trim().min(2, "Please enter your business name.").max(120, "Business name is too long."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(30, "Phone number is too long.")
    .regex(/^\+?[\d\s\-()]{7,}$/, "Use digits, spaces, dashes or a leading +."),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email address.").max(120)]),
  businessType: z.string().min(1, "Please choose your business type."),
  module: z.string().min(1, "Please choose what you're interested in."),
  message: z.string().trim().max(1000, "Please keep the message under 1000 characters."),
});

type Errors = Partial<Record<keyof InquiryFields, string>>;

const empty: InquiryFields = { name: "", business: "", phone: "", email: "", businessType: "", module: "", message: "" };

interface ContactFormProps {
  whatsapp?: string;
  email?: string;
  businessTypes: string[];
  modules: string[];
}

export function ContactForm({ whatsapp, email, businessTypes, modules }: ContactFormProps) {
  const [values, setValues] = useState<InquiryFields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "ok" | "blocked" | "unconfigured"; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const number = normalizeWhatsAppNumber(whatsapp);

  const set = (k: keyof InquiryFields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof InquiryFields;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    const message = buildInquiryMessage(parsed.data);

    if (!number) {
      setStatus({
        kind: "unconfigured",
        text: email
          ? "WhatsApp isn't set up for this site yet, so nothing was sent. You can send the same inquiry by email instead."
          : "WhatsApp isn't set up for this site yet, so nothing was sent. Please use another contact method below.",
      });
      return;
    }
    // "noopener" in the features string makes window.open return null, so detach the opener manually.
    const win = window.open(buildWhatsAppUrl(number, message), "_blank");
    if (win) win.opener = null;
    setStatus(
      win === null
        ? { kind: "blocked", text: "Your browser blocked the new tab. Use the link below to open WhatsApp with your message." }
        : { kind: "ok", text: "WhatsApp opened in a new tab with your message ready. Press send in WhatsApp to deliver it — nothing is sent until you do." },
    );
  };

  const message = buildInquiryMessage(values);
  const mailto = email ? `mailto:${email}?subject=${encodeURIComponent("Atelier One inquiry")}&body=${encodeURIComponent(message)}` : null;

  const field = "mt-1.5 block w-full rounded-xl border bg-surface-2 px-4 py-3 text-[0.9375rem] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] focus:border-brass focus:outline-none focus:ring-4 focus:ring-brass/15";
  const errClass = (k: keyof InquiryFields) => (errors[k] ? "border-bad" : "border-line-strong");
  const describedBy = (k: keyof InquiryFields) => (errors[k] ? `${uid}-${k}-err` : undefined);
  const err = (k: keyof InquiryFields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-bad"><AlertCircle aria-hidden className="size-3.5" />{errors[k]}</p>
    ) : null;
  const label = (k: keyof InquiryFields, children: string, optional = false) => (
    <label htmlFor={`${uid}-${k}`} className="text-sm font-semibold text-fg-2">
      {children} {optional ? <span className="font-normal text-muted">(optional)</span> : <span aria-hidden className="text-bad">*</span>}
    </label>
  );

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-8" aria-labelledby={`${uid}-title`}>
      <h2 id={`${uid}-title`} className="font-display text-2xl font-semibold">Send an inquiry</h2>
      <p className="mt-1.5 text-[0.9375rem] text-muted">Your message opens in WhatsApp, ready to send. This website doesn&apos;t store anything you type.</p>

      <div aria-live="assertive" className="sr-only">{errorCount ? `${errorCount} field${errorCount > 1 ? "s" : ""} need attention.` : ""}</div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", "Full name")}
          <input id={`${uid}-name`} name="name" autoComplete="name" required value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={cn(field, errClass("name"))} />
          {err("name")}
        </div>
        <div>
          {label("business", "Business name")}
          <input id={`${uid}-business`} name="business" autoComplete="organization" required value={values.business} onChange={set("business")} aria-invalid={!!errors.business} aria-describedby={describedBy("business")} className={cn(field, errClass("business"))} />
          {err("business")}
        </div>
        <div>
          {label("phone", "Phone number")}
          <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required value={values.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} className={cn(field, errClass("phone"))} />
          {err("phone")}
        </div>
        <div>
          {label("email", "Email address", true)}
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={cn(field, errClass("email"))} />
          {err("email")}
        </div>
        <div>
          {label("businessType", "Business type")}
          <select id={`${uid}-businessType`} name="businessType" required value={values.businessType} onChange={set("businessType")} aria-invalid={!!errors.businessType} aria-describedby={describedBy("businessType")} className={cn(field, errClass("businessType"), "appearance-none")}>
            <option value="">Choose…</option>
            {businessTypes.map((b) => <option key={b}>{b}</option>)}
          </select>
          {err("businessType")}
        </div>
        <div>
          {label("module", "Interested module")}
          <select id={`${uid}-module`} name="module" required value={values.module} onChange={set("module")} aria-invalid={!!errors.module} aria-describedby={describedBy("module")} className={cn(field, errClass("module"), "appearance-none")}>
            <option value="">Choose…</option>
            <option>The complete platform</option>
            {modules.map((m) => <option key={m}>{m}</option>)}
          </select>
          {err("module")}
        </div>
        <div className="sm:col-span-2">
          {label("message", "Message", true)}
          <textarea id={`${uid}-message`} name="message" rows={5} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={describedBy("message")} placeholder="Tell us about your shop — how many staff, what you sell, what you'd like to improve." className={cn(field, errClass("message"), "resize-y")} />
          <div className="flex justify-between">{err("message")}<span className="ml-auto mt-1.5 text-xs text-muted">{values.message.length}/1000</span></div>
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#e6c98a_0%,#c9a961_45%,#a8843f_100%)] px-7 font-semibold text-on-brass shadow-[0_10px_30px_-10px_rgba(184,154,90,0.7)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <WhatsAppIcon className="size-5" /> Continue in WhatsApp
        <Send aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div role="status" aria-live="polite">
        {status && (
          <div className={cn("mt-5 rounded-xl border p-4 text-[0.9375rem]", status.kind === "ok" ? "border-ok/30 bg-ok/10" : "border-warn/30 bg-warn/10")}>
            <p className="text-fg">{status.text}</p>
            {status.kind === "blocked" && number && (
              <a href={buildWhatsAppUrl(number, message)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brass-text underline">
                <WhatsAppIcon className="size-4" /> Open WhatsApp
              </a>
            )}
            {status.kind === "unconfigured" && mailto && (
              <a href={mailto} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-brass-text underline"><Mail aria-hidden className="size-4" /> Send by email instead</a>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
