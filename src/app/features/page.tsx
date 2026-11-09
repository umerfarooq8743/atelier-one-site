import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { featureGroups, features } from "@/data/features";
import { moduleById } from "@/data/modules";
import { personas } from "@/data/comparison";
import { icons } from "@/lib/icons";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Features — Tailoring Shop Software Capabilities",
  description:
    "Every Atelier One feature: customer management, garment measurements, fabric inventory, sale and purchase invoices, stitching order tracking, payments, wages, expenses, reports and role-based access.",
  path: "/features",
  keywords: ["tailoring shop software features", "tailor shop billing software", "garment measurement management", "fabric shop management software"],
});

const notYet = [
  "Subscription billing and paid-plan upgrades",
  "Company logo upload (the business profile is text only)",
  "SMS notifications (email only)",
  "Scheduled automatic backups",
  "Excel (.xlsx) export — exports are CSV",
  "Payment gateway integration",
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Features", path: "/features" }}
        eyebrow="Features"
        title={<>Every Capability a Tailoring Business <span className="text-gold">Runs On</span></>}
        description="Eighteen connected capabilities, grouped by where the work happens: the front counter, the workshop, the stock room, the cash drawer, your team and your own oversight."
      >
        <nav aria-label="Feature groups" className="flex flex-wrap justify-center gap-2">
          {featureGroups.map((g) => (
            <a key={g.name} href={`#${g.name.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg-2 transition-colors hover:border-brass/50 hover:text-fg">
              {g.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {featureGroups.map((g, gi) => {
        const list = features.filter((f) => f.group === g.name);
        return (
          <section key={g.name} id={g.name.toLowerCase().replace(/\s+/g, "-")} className={`py-16 sm:py-20 ${gi % 2 ? "bg-bg-raised/50" : ""}`} aria-labelledby={`g-${gi}`}>
            <div className="container-page grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <Reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-display text-sm font-semibold text-brass-text">0{gi + 1}</p>
                <h2 id={`g-${gi}`} className="display-md mt-2">{g.name}</h2>
                <p className="mt-3 text-[0.9375rem] text-muted">{g.blurb}</p>
              </Reveal>
              <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
                {list.map((f) => {
                  const Icon = icons[f.icon];
                  const mod = moduleById[f.module];
                  return (
                    <RevealItem as="li" key={f.id} id={f.id} className="card flex scroll-mt-28 flex-col p-6">
                      <span className="grid size-11 place-items-center rounded-xl bg-brass-soft text-brass-text"><Icon aria-hidden className="size-5" /></span>
                      <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-2">{f.description}</p>
                      <ul className="mt-5 space-y-2 border-t border-line pt-5">
                        {mod.capabilities.slice(0, 3).map((c) => (
                          <li key={c} className="flex gap-2.5 text-sm text-muted"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />{c}</li>
                        ))}
                      </ul>
                      <Link href={`/modules#${mod.id}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brass-text hover:underline">
                        {mod.name} module <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </section>
        );
      })}

      <section className="section" aria-labelledby="who-title">
        <div className="container-page">
          <SectionHeading eyebrow="Who it's for" title={<span id="who-title">Designed for Everyone in the Shop</span>} description="From the owner reviewing profit to the counter staff writing invoices, each role gets what it needs." />
          <RevealGroup as="ul" className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {personas.map((p) => (
              <RevealItem as="li" key={p.role} className="card flex flex-col p-6">
                <h3 className="font-display text-lg font-semibold">{p.role}</h3>
                <ul className="mt-4 space-y-1.5">
                  {p.pains.map((x) => <li key={x} className="text-sm text-muted">— {x}</li>)}
                </ul>
                <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] font-medium text-fg">{p.outcome}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.modules.map((id) => (
                    <Link key={id} href={`/modules#${id}`} className="rounded-full bg-surface-3 px-3 py-1 text-xs font-semibold text-fg-2 hover:text-fg">{moduleById[id].name}</Link>
                  ))}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
            Multi-company workspaces give each business its own isolated books. Cross-company consolidated reporting and branch-level management are not part of the product today.
          </p>
        </div>
      </section>

      <section className="pb-8" aria-labelledby="limits-title">
        <div className="container-page">
          <Reveal className="card mx-auto max-w-4xl p-6 sm:p-8">
            <h2 id="limits-title" className="font-display text-xl font-semibold">Not built yet — stated plainly</h2>
            <p className="mt-2 text-[0.9375rem] text-muted">Atelier One is in active development. These are documented limitations, not features:</p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {notYet.map((n) => <li key={n} className="flex gap-2.5 text-[0.9375rem] text-fg-2"><X aria-hidden className="mt-0.5 size-4 shrink-0 text-muted" />{n}</li>)}
            </ul>
            <div className="mt-6"><Button href="/contact" variant="secondary" size="sm" arrow>Discuss Your Business Needs</Button></div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
      <CTASection />
    </>
  );
}
