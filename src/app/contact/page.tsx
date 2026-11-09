import { Info, Mail, MessageSquareText, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/interactive/ContactForm";
import { FaqList } from "@/components/sections/FaqSection";
import { Reveal } from "@/components/ui/Reveal";
import { GitHubIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { modules } from "@/data/modules";
import { audiences } from "@/data/comparison";
import { faqs } from "@/data/faqs";
import { normalizeWhatsAppNumber } from "@/lib/whatsapp";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact — Talk to the Atelier One Team",
  description: "Get in touch about Atelier One, the tailoring and fabric business management software. Send an inquiry through WhatsApp or contact us directly.",
  path: "/contact",
});

const contactFaqs = faqs.filter((f) => ["Is there a free trial?", "How long does the trial last?", "Does Atelier One support mobile devices?", "How can I get started?"].includes(f.q));

export default function ContactPage() {
  const { whatsapp, email, phone } = siteConfig.contact;
  const wa = normalizeWhatsAppNumber(whatsapp);
  const configured = Boolean(wa || email || phone);
  const isDev = process.env.NODE_ENV !== "production";

  const methods = [
    wa && { Icon: WhatsAppIcon, label: "WhatsApp", value: `+${wa}`, href: `https://wa.me/${wa}`, external: true },
    email && { Icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && { Icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
  ].filter(Boolean) as { Icon: typeof Mail; label: string; value: string; href: string; external?: boolean }[];

  return (
    <>
      <PageHero
        crumb={{ name: "Contact", path: "/contact" }}
        eyebrow="Contact"
        title={<>Let&apos;s Talk About <span className="text-gold">Your Business</span></>}
        description="Tell us how your shop runs today. We'll come back to you about how Atelier One fits your customers, workshop, stock and staff."
      />

      <section className="pb-24" aria-label="Contact options">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Reveal>
            <ContactForm
              whatsapp={whatsapp}
              email={email}
              businessTypes={[...audiences.filter((a) => a !== "Bespoke Tailors"), "Other"]}
              modules={modules.map((m) => m.name)}
            />
          </Reveal>

          <div className="space-y-5">
            <Reveal className="card p-6">
              <h2 className="font-display text-lg font-semibold">Contact directly</h2>
              {methods.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {methods.map(({ Icon, label, value, href, external }) => (
                    <li key={label}>
                      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center gap-3 rounded-xl border border-line bg-surface-2 p-3.5 transition-colors hover:border-brass/40">
                        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brass-soft text-brass-text"><Icon className="size-5" /></span>
                        <span className="min-w-0"><span className="block text-xs text-muted">{label}</span><span className="block truncate font-semibold">{value}</span></span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[0.9375rem] text-muted">
                  Direct contact details haven&apos;t been published yet. In the meantime you can follow the product on GitHub.
                </p>
              )}
              <a href={siteConfig.repository} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-fg-2 hover:text-fg">
                <GitHubIcon className="size-4" /> {siteConfig.repository.replace("https://", "")}
              </a>
            </Reveal>

            {!configured && isDev && (
              <Reveal className="rounded-card border border-warn/40 bg-warn/10 p-5 text-sm">
                <p className="flex items-center gap-2 font-semibold text-fg"><Info aria-hidden className="size-4 text-warn" /> Development notice: contact not configured</p>
                <p className="mt-2 text-fg-2">Set these in <code>.env.local</code> (or Vercel project settings) before production:</p>
                <ul className="mt-2 space-y-1 font-mono text-xs text-fg-2">
                  <li>NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567</li>
                  <li>NEXT_PUBLIC_CONTACT_EMAIL=…</li>
                  <li>NEXT_PUBLIC_CONTACT_PHONE=…</li>
                </ul>
                <p className="mt-2 text-muted">This notice only appears in development.</p>
              </Reveal>
            )}

            <Reveal className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold"><MessageSquareText aria-hidden className="size-5 text-brass-text" /> What happens next</h2>
              <ol className="mt-4 space-y-3 text-[0.9375rem] text-fg-2">
                <li className="flex gap-3"><span className="font-display font-semibold text-brass-text">1</span>WhatsApp opens with your inquiry written out — you review it and press send.</li>
                <li className="flex gap-3"><span className="font-display font-semibold text-brass-text">2</span>The team replies to discuss your business and workflows.</li>
                <li className="flex gap-3"><span className="font-display font-semibold text-brass-text">3</span>New companies start on a {siteConfig.trialDays}-day trial workspace.</li>
              </ol>
            </Reveal>

            <Reveal className="flex gap-3 rounded-card border border-line p-5 text-sm text-muted">
              <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-ok" />
              This site has no database and no forms backend. Your details go only into the WhatsApp message (or email) you choose to send.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24" aria-labelledby="cfaq">
        <div className="container-page mx-auto max-w-3xl">
          <h2 id="cfaq" className="display-md mb-8 text-center">Before you get in touch</h2>
          <FaqList faqs={contactFaqs} />
        </div>
      </section>
    </>
  );
}
