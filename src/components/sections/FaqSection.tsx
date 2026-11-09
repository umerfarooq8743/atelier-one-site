import { Plus } from "lucide-react";
import type { Faq } from "@/data/types";
import { faqs as allFaqs } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/lib/seo";

/** Native <details> accordion: keyboard and screen-reader friendly with no JavaScript. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-panel border border-line bg-surface">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 px-5 py-5 font-display text-[1.0625rem] font-semibold transition-colors hover:bg-surface-2 sm:px-7">
            {f.q}
            <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full border border-line text-brass-text transition-transform duration-300">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="px-5 pb-6 text-[0.9375rem] leading-relaxed text-muted sm:px-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ limit, title = "Questions, Answered" }: { limit?: number; title?: string }) {
  const faqs = limit ? allFaqs.slice(0, limit) : allFaqs;
  return (
    <section className="section" aria-labelledby="faq-title">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="container-page">
        <SectionHeading eyebrow="FAQ" title={<span id="faq-title">{title}</span>} />
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <FaqList faqs={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
