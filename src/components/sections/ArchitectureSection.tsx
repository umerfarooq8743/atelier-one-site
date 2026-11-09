import { ArrowDown, Database, KeyRound, Monitor, Server, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const tiers = [
  { Icon: Monitor, name: "Angular SPA", meta: "Angular 18.2 · TypeScript 5.5 · Material", detail: "Lazy feature routes, permission guards, Graphite & Gold theme" },
  { Icon: Server, name: "Express REST API", meta: "Node.js · Express 4.19 · /api/*", detail: "protect → requirePermission → controllers → models" },
  { Icon: Database, name: "MongoDB + Mongoose", meta: "Mongoose 8.5 · one database", detail: "companyId on every business document, added by tenantPlugin" },
];

/** Three-tier diagram of the real product architecture (from DOCUMENTATION.md §3). */
export function ArchitectureDiagram() {
  return (
    <figure className="mx-auto max-w-2xl">
      <ol className="space-y-2">
        {tiers.map((t, i) => (
          <li key={t.name}>
            <div className="card flex items-start gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brass-soft text-brass-text"><t.Icon aria-hidden className="size-5" /></span>
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold">{t.name}</p>
                <p className="text-sm font-medium text-brass-text">{t.meta}</p>
                <p className="mt-1 text-[0.9375rem] text-muted">{t.detail}</p>
              </div>
            </div>
            {i < tiers.length - 1 && (
              <div aria-hidden className="flex items-center justify-center gap-2 py-1.5 text-xs text-muted">
                <ArrowDown className="size-4 text-brass" />
                {i === 0 ? "JWT in Authorization header" : "Tenant-scoped queries"}
              </div>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">The Angular single-page app calls the Express REST API with a JWT; the API reads and writes MongoDB through Mongoose with every query scoped to the user&apos;s company.</figcaption>
    </figure>
  );
}

const security = [
  { Icon: KeyRound, t: "JWT sessions with tokenVersion", d: "Changing a role, deactivating a user or changing a password signs out their other sessions immediately." },
  { Icon: ShieldCheck, t: "Server-side permissions", d: "Every route checks module.action permissions — not just the interface." },
  { Icon: Database, t: "Tenant isolation", d: "Business queries are scoped to the user's company; a query without company context fails loudly." },
];

export function ArchitectureSection() {
  return (
    <section className="section" aria-labelledby="arch-title">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Technology & security"
            title={<span id="arch-title">Engineered Like Serious Business Software</span>}
            description="A documented Angular, Express and MongoDB architecture, with money and stock rules enforced on the server — not left to the browser."
          />
          <Reveal as="ul" className="mt-10 space-y-5">
            {security.map(({ Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface text-brass-text"><Icon aria-hidden className="size-[18px]" /></span>
                <div>
                  <h3 className="font-display font-semibold">{t}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
                </div>
              </li>
            ))}
          </Reveal>
          <div className="mt-10"><Button href="/technology" variant="secondary" arrow>Explore the Architecture</Button></div>
        </div>
        <Reveal><ArchitectureDiagram /></Reveal>
      </div>
    </section>
  );
}
