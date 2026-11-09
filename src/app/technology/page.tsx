import { ArrowRight, Check, Database, FileText, KeyRound, Lock, Mail, Server, ShieldCheck, Table2 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureSection";
import { TechDiagrams } from "@/components/sections/TechDiagrams";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Technology — Architecture & Security of Atelier One",
  description:
    "Atelier One runs on an Angular 18 single-page app, an Express REST API and MongoDB with Mongoose — with JWT sessions, server-side permissions, tenant isolation, audit logging and atomic stock updates.",
  path: "/technology",
  keywords: ["tailoring software architecture", "multi-tenant business software", "Angular Express MongoDB business app"],
});

const frontend = [
  ["Angular", "18.2", "Standalone components, signals, functional guards, lazy routes"],
  ["TypeScript", "5.5", "Language"],
  ["Angular Material + CDK", "18.2", "Dialogs, tabs, tooltips, sidenav, date picker"],
  ["RxJS", "7.8", "HTTP and reactive forms"],
  ["ng-select", "12", "Searchable dropdowns"],
  ["Chart.js + ng2-charts", "4.5 / 10", "Dashboard and report charts"],
  ["SCSS + CSS variables", "—", "Graphite & Gold theme, light and dark"],
];
const backend = [
  ["Node.js + Express", "4.19", "REST API"],
  ["MongoDB + Mongoose", "8.5", "Database and models"],
  ["jsonwebtoken", "9", "JWT sessions with per-user tokenVersion"],
  ["bcryptjs", "2.4", "Password hashing"],
  ["helmet, cors", "—", "Security headers, allow-listed origins"],
  ["express-validator", "7", "Request validation"],
  ["Nodemailer", "—", "SMTP email (invitations, password reset)"],
  ["PDFKit", "0.15", "Sale invoice PDFs"],
  ["Jest", "30", "Backend tests"],
];

const security = [
  { t: "JWT authentication", d: "Every request except sign-up, sign-in and password recovery carries a signed token." },
  { t: "Per-user tokenVersion", d: "A role change, deactivation or password change bumps the version and ends other sessions immediately." },
  { t: "Company-level tenant isolation", d: "Business documents carry companyId; a plugin scopes every query, and a query with no company context throws." },
  { t: "Backend permission enforcement", d: "requirePermission('module.action') on every route — the interface hides what the server also refuses." },
  { t: "Password hashing", d: "Passwords are hashed with bcrypt and never emailed. Reset tokens are stored only as SHA-256 hashes." },
  { t: "Request validation", d: "express-validator checks input; Mongo-operator injection is covered by tests." },
  { t: "Security headers", d: "helmet sets security headers; CORS allows only configured origins." },
  { t: "Audit logging", d: "Creates, updates (with field-level changes), deletes and business actions are logged with user and role." },
  { t: "Atomic inventory deductions", d: "One conditional update per product — all or nothing. A short sale is refused with no partial changes." },
  { t: "Server-side invoice calculations", d: "Line amounts, totals and balances are recomputed by the server; totals sent by the browser are ignored." },
];

const tests = [
  "Tenancy — company isolation, per-company numbering, owner protection",
  "Financial — invoice totals, balances, stock",
  "Wiring — advance → payment, wage ↔ expense, P&L",
  "Invoice math — rounding, discounts, oversell refused",
  "Security — operator injection, deletion safety",
  "Roles, auth sessions, password reset, delete-in-use guards",
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "Technology", path: "/technology" }}
        eyebrow="Technology & security"
        title={<>A Coherent Architecture, <span className="text-gold">Documented End to End</span></>}
        description="Atelier One is an Angular single-page app talking to an Express REST API backed by MongoDB. Money, stock and access rules live on the server."
      >
        <Button href={siteConfig.repository} variant="secondary" icon={<GitHubIcon className="size-4" />}>View the repository</Button>
      </PageHero>

      <section className="pb-20" aria-labelledby="arch-t">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="System architecture" title={<span id="arch-t">One SPA, One API, One Database</span>} size="md"
              description="In production the frontend calls a relative /api path, so it is served from the same origin as the API or behind a reverse proxy." />
            <ul className="mt-8 space-y-3">
              {[["Mail", Mail, "SMTP email via Nodemailer — invitations, password reset, welcome"], ["PDF", FileText, "Sale invoice PDFs with PDFKit"], ["CSV", Table2, "Report and list exports, built in the browser"]].map(([k, Icon, d]) => {
                const I = Icon as typeof Mail;
                return (
                  <li key={String(k)} className="flex items-center gap-3 text-[0.9375rem] text-fg-2">
                    <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-brass-text"><I aria-hidden className="size-4" /></span>{String(d)}
                  </li>
                );
              })}
            </ul>
          </div>
          <Reveal><ArchitectureDiagram /></Reveal>
        </div>
      </section>

      <section className="section bg-bg-raised/50" aria-labelledby="flow-t">
        <div className="container-page">
          <SectionHeading eyebrow="Diagrams" title={<span id="flow-t">How a Request Travels</span>} description="Four views of the same system: the request pipeline, tenant isolation, permission checks and what happens when a sale is saved." />
          <Reveal className="mt-14">
            <TechDiagrams />
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-t">
        <div className="container-page">
          <SectionHeading eyebrow="Technology stack" title={<span id="stack-t">Frontend and Backend</span>} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[["Frontend", frontend, ArrowRight], ["Backend", backend, Server]].map(([name, rows]) => (
              <Reveal key={String(name)} className="overflow-hidden rounded-card border border-line bg-surface shadow-soft">
                <table className="w-full text-left text-[0.9375rem]">
                  <caption className="border-b border-line bg-surface-2 px-5 py-4 text-left font-display text-lg font-semibold">{String(name)}</caption>
                  <thead className="sr-only"><tr><th scope="col">Technology</th><th scope="col">Version</th><th scope="col">Used for</th></tr></thead>
                  <tbody>
                    {(rows as string[][]).map(([t, v, u]) => (
                      <tr key={t} className="border-b border-line last:border-0">
                        <th scope="row" className="px-5 py-3 font-semibold">{t}</th>
                        <td className="px-2 py-3 font-display text-brass-text">{v}</td>
                        <td className="px-5 py-3 text-muted">{u}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-bg-raised/50" aria-labelledby="sec-t">
        <div className="container-page">
          <SectionHeading eyebrow="Security" title={<span id="sec-t">Security Mechanisms in the Application</span>} description="These are the mechanisms documented in and implemented by the Atelier One application." />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {security.map((s, i) => (
              <RevealItem as="li" key={s.t} className="card p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-brass-soft text-brass-text">
                  {i % 3 === 0 ? <ShieldCheck aria-hidden className="size-5" /> : i % 3 === 1 ? <KeyRound aria-hidden className="size-5" /> : <Lock aria-hidden className="size-5" />}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted">
            Atelier One holds no security certifications (such as SOC 2 or ISO 27001), and this page claims no regulatory compliance. This marketing
            website is a separate static site: it has no database, no sign-in, and stores no inquiry data.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="qa-t">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading align="left" eyebrow="Quality" title={<span id="qa-t">Tested Where It Matters Most</span>} size="md"
            description="Each backend suite runs against its own throw-away database. The project documentation (24 Oct 2026) records 11 backend Jest suites with 74 tests and 59 frontend unit specs passing, plus browser QA scripts at desktop and phone widths in both themes." />
          <Reveal as="ul" className="card divide-y divide-line">
            {tests.map((t) => (
              <li key={t} className="flex gap-3 px-5 py-3.5 text-[0.9375rem] text-fg-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ok" />{t}</li>
            ))}
            <li className="flex gap-3 px-5 py-3.5 text-sm text-muted"><Database aria-hidden className="mt-0.5 size-4 shrink-0" />Test databases are dropped after each suite — tests never touch real data.</li>
          </Reveal>
        </div>
      </section>

      <CTASection title="Talk Through the Technical Details" description="Questions about hosting, data or how the architecture fits your business? Get in touch." secondary={{ label: "Explore Modules", href: "/modules" }} />
    </>
  );
}
