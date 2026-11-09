import { CheckCircle2, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/mockups/DashboardPreview";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pb-24">
      {/* Ambient background: fine grid + brass glow */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[46rem]" style={{ background: "var(--glow)" }} />
      <div aria-hidden className="absolute inset-x-0 top-[26rem] -z-10 h-[40rem]" style={{ background: "radial-gradient(45% 50% at 50% 50%, rgba(184,154,90,0.12), transparent 70%)" }} />

      <div className="container-page">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 text-[0.8125rem] text-fg-2 backdrop-blur" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-1 rounded-full bg-brass-soft px-2 py-0.5 text-xs font-semibold text-brass-text">
              <Sparkles aria-hidden className="size-3" /> Tailoring Business Suite
            </span>
            Built for tailoring &amp; fabric businesses
          </p>

          <h1 className="hero-title display-xl mt-7">
            Every Detail of Your Tailoring Business.{" "}
            <span className="text-gold">One Connected Workspace.</span>
          </h1>

          <p className="hero-in lead mt-7 max-w-2xl" style={{ animationDelay: "120ms" }}>
            Manage customers, garment measurements, fabric inventory, stitching orders, payments, employees and business
            performance through one intelligent business management platform.
          </p>

          <div className="hero-in mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={{ animationDelay: "220ms" }}>
            <Button href="/modules" size="lg" arrow className="w-full sm:w-auto">Explore Atelier One</Button>
            <Button href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">Talk to Us</Button>
          </div>

          <ul className="hero-in mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted" style={{ animationDelay: "320ms" }}>
            {["Measurements with history", "Item-level order stages", "13 built-in reports"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 aria-hidden className="size-4 text-brass" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          <div aria-hidden className="absolute -inset-x-6 -inset-y-6 -z-10 rounded-[2.5rem]" style={{ background: "radial-gradient(60% 40% at 50% 0%, rgba(184,154,90,0.22), transparent 75%)" }} />
          <div className="hero-in" style={{ animationDelay: "200ms" }}>
            <DashboardPreview animate />
          </div>

          {/* Floating layers — decorative, desktop only */}
          <div aria-hidden className="float-slow pointer-events-none absolute -left-10 top-[38%] hidden w-64 lg:block xl:-left-16">
            <div className="card glass p-4 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-brass-text"><Ruler className="size-3.5" /> Measurement snapshot</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[["Chest", "42"], ["Waist", "38"], ["Length", "42"]].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-line bg-surface-2 px-2 py-1.5">
                    <div className="text-[0.625rem] uppercase tracking-wider text-muted">{k}</div>
                    <div className="font-display text-sm font-semibold">{v}″</div>
                  </div>
                ))}
              </div>
              <div className="mt-2.5 text-[0.6875rem] text-muted">Saved on SI-0148 · Kurta Pajama</div>
            </div>
          </div>
          <div aria-hidden className="float-slower pointer-events-none absolute -right-8 top-[16%] hidden w-60 lg:block xl:-right-14">
            <div className="card glass flex items-center gap-3 p-3.5 text-left">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ok/15 text-ok"><CheckCircle2 className="size-5" /></span>
              <div>
                <div className="text-sm font-semibold">Order item Ready</div>
                <div className="text-xs text-muted">SI-0148 · Kurta · Usman</div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-muted">Illustrative product preview with sample data.</p>
      </div>
    </section>
  );
}
