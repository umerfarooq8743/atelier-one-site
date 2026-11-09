import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { InvoiceRelations } from "@/components/sections/WorkflowSection";
import { OrderLifecycle } from "@/components/interactive/OrderLifecycle";
import { Screen } from "@/components/mockups/registry";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journeys } from "@/data/workflows";
import { moduleById } from "@/data/modules";
import type { ScreenId } from "@/data/types";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "How It Works — Tailoring Order, Inventory & Finance Workflows",
  description:
    "See how Atelier One connects a tailoring business: from new customer and measurements to delivered order and final payment, plus inventory, employee wages and profit & loss workflows.",
  path: "/workflows",
  keywords: ["stitching order management", "tailoring order tracking", "tailoring workflow software"],
});

const journeyScreens: Record<string, ScreenId> = {
  "customer-to-delivery": "customer-360",
  inventory: "stock-movements",
  "employee-finance": "wages",
  "business-finance": "profit-loss",
};

export default function WorkflowsPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "How It Works", path: "/workflows" }}
        eyebrow="How it works"
        title={<>Every Activity <span className="text-gold">Connected to the Next</span></>}
        description="Four journeys show how a tailoring business runs in Atelier One — and how each step updates the records that follow it."
      >
        <nav aria-label="Journeys" className="flex flex-wrap justify-center gap-2">
          {journeys.map((j) => (
            <a key={j.id} href={`#${j.id}`} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-fg-2 transition-colors hover:border-brass/50 hover:text-fg">{j.title}</a>
          ))}
        </nav>
      </PageHero>

      <section className="pb-20" aria-labelledby="lifecycle-title">
        <div className="container-page">
          <SectionHeading eyebrow="Interactive" title={<span id="lifecycle-title">Walk an Order Through the Workshop</span>} description="Click through the lifecycle, or use the demo order to move items between stages and settle the balance." size="md" />
          <Reveal className="mt-12"><OrderLifecycle /></Reveal>
          <Reveal className="mt-12"><InvoiceRelations /></Reveal>
        </div>
      </section>

      {journeys.map((j, i) => (
        <section key={j.id} id={j.id} className={`scroll-mt-20 py-20 sm:py-24 ${i % 2 === 0 ? "bg-bg-raised/50" : ""}`} aria-labelledby={`${j.id}-t`}>
          <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <SectionHeading align="left" eyebrow={j.eyebrow} title={<span id={`${j.id}-t`}>{j.title}</span>} description={j.intro} size="md" />
              <RevealGroup as="ol" className="relative mt-10 space-y-3">
                <span aria-hidden className="stitch-v absolute left-[0.95rem] top-3 bottom-3" />
                {j.steps.map((s, si) => (
                  <RevealItem as="li" key={s.title} className="relative flex gap-4">
                    <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-bg font-display text-xs font-semibold text-brass-text">{si + 1}</span>
                    <div className="flex-1 pb-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display font-semibold">{s.title}</h3>
                        <Link href={`/modules#${s.module}`} className="rounded-full bg-surface-3 px-2.5 py-0.5 text-xs font-semibold text-muted hover:text-fg">{moduleById[s.module].name}</Link>
                      </div>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{s.detail}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Screen id={journeyScreens[j.id]} />
            </Reveal>
          </div>
        </section>
      ))}

      <CTASection title="Map Your Shop's Workflow to Atelier One" description="Every tailoring business works a little differently. Tell us how yours runs and we'll show you where Atelier One fits." primary={{ label: "Discuss Your Business Needs", href: "/contact" }} secondary={{ label: "Explore Modules", href: "/modules" }} />
    </>
  );
}
