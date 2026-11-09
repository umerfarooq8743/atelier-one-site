import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { GitHubIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { mainNav, productNav } from "@/data/navigation";
import { features } from "@/data/features";
import { CurrentYear } from "./CurrentYear";

const featureLinks = features.slice(0, 7);

export function Footer() {
  const { contact } = siteConfig;
  const hasContact = Boolean(contact.email || contact.phone || contact.whatsapp);

  return (
    <footer className="relative border-t border-line bg-bg-raised">
      <div aria-hidden className="stitch absolute inset-x-0 top-0" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo id="ftr" />
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-fg-2">
            Tailoring &amp; fabric business management software. {siteConfig.shortDescription}
          </p>
          <a
            href={siteConfig.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-fg-2 transition-colors hover:border-line-strong hover:text-fg"
          >
            <GitHubIcon className="size-4" />
            GitHub repository
          </a>
        </div>

        <nav aria-label="Product">
          <h2 className="text-sm font-semibold text-fg">Product</h2>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            {[{ label: "Home", href: "/" }, ...productNav, ...mainNav.slice(0, 1)].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-muted hover:text-fg">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Features">
          <h2 className="text-sm font-semibold text-fg">Features</h2>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            {featureLinks.map((f) => (
              <li key={f.id}>
                <Link href={`/features#${f.id}`} className="link-underline text-muted hover:text-fg">{f.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-fg">Company</h2>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            {mainNav.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline text-muted hover:text-fg">{l.label}</Link>
              </li>
            ))}
          </ul>
          {hasContact && (
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              {contact.email && (
                <li><a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Mail aria-hidden className="size-4" />{contact.email}</a></li>
              )}
              {contact.phone && (
                <li><a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 text-muted hover:text-fg"><Phone aria-hidden className="size-4" />{contact.phone}</a></li>
              )}
              {contact.whatsapp && (
                <li><Link href="/contact" className="inline-flex items-center gap-2 text-muted hover:text-fg"><WhatsAppIcon className="size-4" />WhatsApp inquiry</Link></li>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© <CurrentYear /> {siteConfig.name}. Product by {siteConfig.owner}.</p>
          <p>This website stores no inquiry data — contact requests open in WhatsApp or your email app.</p>
        </div>
      </div>
    </footer>
  );
}
