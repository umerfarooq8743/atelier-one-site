import { DashboardShowcase } from "@/components/interactive/DashboardShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  ["Every KPI card opens its list", "Pending invoices, today's sales or low stock — one click to the filtered records behind the number."],
  ["One-click reorder", "Low-stock rows open a purchase pre-filled with the suggested quantity."],
  ["Staff workload", "See how many assigned items each tailor has and how many are delivered."],
];

export function DashboardSection() {
  return (
    <section className="section relative overflow-hidden bg-bg-raised/50" aria-labelledby="dash-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[30rem]" style={{ background: "var(--glow)" }} />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="Dashboard"
          title={<span id="dash-title">The Whole Shop on One Screen</span>}
          description="Switch the period and theme below — the preview responds just like the real dashboard does."
        />
        <Reveal className="mx-auto mt-12 max-w-6xl">
          <DashboardShowcase />
        </Reveal>
        <Reveal className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
          {points.map(([t, d]) => (
            <div key={t} className="border-l border-brass/40 pl-5">
              <h3 className="font-display font-semibold">{t}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
