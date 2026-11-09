import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { icons } from "@/lib/icons";
import type { Feature } from "@/data/types";
import { features } from "@/data/features";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Small product-flavoured visuals for the featured cards. */
function MiniVisual({ id }: { id: string }) {
  if (id === "garment-measurements") {
    return (
      <div aria-hidden className="grid grid-cols-4 gap-1.5">
        {[["Neck", "15½"], ["Chest", "42"], ["Waist", "38"], ["Length", "42"], ["Sleeves", "24¾"], ["Hips", "42½"], ["Collar", "Square"], ["Fit", "Regular"]].map(([k, v], i) => (
          <div key={k} className={cn("rounded-lg border px-2 py-1.5", i === 1 ? "border-brass/50 bg-brass-soft" : "border-line bg-surface-2")}>
            <div className="text-[0.5625rem] uppercase tracking-wider text-muted">{k}</div>
            <div className="truncate font-display text-[0.8125rem] font-semibold">{v}</div>
          </div>
        ))}
      </div>
    );
  }
  if (id === "order-tracking") {
    return (
      <div aria-hidden className="space-y-2">
        {[["Kurta Pajama", 2, "Ready", "text-[#7d9cf0]"], ["Waistcoat", 1, "In process", "text-warn"], ["Coat", 3, "Delivered", "text-ok"]].map(([n, step, s, c]) => (
          <div key={String(n)} className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2">
            <span className="w-24 truncate text-xs font-semibold">{n}</span>
            <span className="flex flex-1 gap-1">
              {[1, 2, 3].map((x) => (
                <span key={x} className={cn("h-1.5 flex-1 rounded-full", x <= Number(step) ? (step === 3 ? "bg-ok" : "bg-brass") : "bg-surface-3")} />
              ))}
            </span>
            <span className={cn("w-16 text-right text-[0.6875rem] font-semibold", String(c))}>{s}</span>
          </div>
        ))}
      </div>
    );
  }
  if (id === "inventory") {
    return (
      <div aria-hidden className="space-y-2.5">
        {[["Egyptian Cotton", 142, 40], ["Premium Wash & Wear", 18, 25], ["Khaddar — Charcoal", 9, 20]].map(([n, s, min]) => {
          const low = Number(s) < Number(min);
          return (
            <div key={String(n)}>
              <div className="flex justify-between text-xs"><span className="font-medium text-fg-2">{n}</span><span className={low ? "font-semibold text-bad" : "text-muted"}>{s} m{low ? " · low" : ""}</span></div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3"><div className={cn("h-full rounded-full", low ? "bg-bad/80" : "bg-brass")} style={{ width: `${Math.min(100, (Number(s) / 150) * 100)}%` }} /></div>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

export function FeatureCard({ feature, featured = false }: { feature: Feature; featured?: boolean }) {
  const Icon = icons[feature.icon];
  return (
    <Link
      href={`/features#${feature.id}`}
      className={cn(
        "card group relative flex h-full flex-col overflow-hidden p-6 transition-[transform,border-color,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift",
        featured && "lg:p-7",
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-3 text-brass-text transition-colors duration-500 group-hover:border-brass/40 group-hover:bg-brass-soft">
          <Icon aria-hidden className="size-5" />
        </span>
        <ArrowUpRight aria-hidden className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-text" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{feature.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{feature.description}</p>
      {featured && <div className="mt-6 pt-1"><MiniVisual id={feature.id} /></div>}
    </Link>
  );
}

const featuredIds = ["garment-measurements", "order-tracking", "inventory"];

export function FeaturesSection() {
  const featured = featuredIds.map((id) => features.find((f) => f.id === id)!);
  const rest = features.filter((f) => !featuredIds.includes(f.id));
  return (
    <section className="section" aria-labelledby="features-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="Core features"
          title={<span id="features-title">Built Around How a Tailoring Shop Actually Works</span>}
          description="Eighteen capabilities, from the measurement tape to the month-end report — each one connected to the rest."
        />
        <RevealGroup as="ul" className="mt-14 grid gap-4 lg:grid-cols-3">
          {featured.map((f) => (
            <RevealItem as="li" key={f.id}><FeatureCard feature={f} featured /></RevealItem>
          ))}
        </RevealGroup>
        <RevealGroup as="ul" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {rest.map((f) => (
            <RevealItem as="li" key={f.id}><FeatureCard feature={f} /></RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-10 flex justify-center">
          <Button href="/features" variant="secondary" arrow>Explore Features</Button>
        </div>
      </div>
    </section>
  );
}
