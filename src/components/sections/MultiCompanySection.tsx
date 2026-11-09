import { WorkspaceSwitcher } from "@/components/interactive/WorkspaceSwitcher";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const steps = [
  ["Anyone can register", "Sign-up asks for a business name, your name, a work email and a password."],
  ["A company is created", "Registration creates the company and its private workspace."],
  ["You become the owner", "The registering user is the Admin owner — and can never be demoted or deactivated."],
  ["Add your staff", "Users you add belong to your company and sign in with their own email."],
];

const isolation = [
  "Separate business data",
  "Company-specific users",
  "Company-specific roles",
  "Independent settings & dropdowns",
  "Company-specific invoice numbering",
  "Server-side tenant isolation",
];

export function MultiCompanySection() {
  return (
    <section className="section relative bg-bg-raised/50" aria-labelledby="mc-title">
      <div aria-hidden className="stitch absolute inset-x-0 top-0" />
      <div className="container-page">
        <SectionHeading
          eyebrow="Multi-company architecture"
          title={<span id="mc-title">Every Company Gets Its Own Private Workspace</span>}
          description="Atelier One is a multi-company platform. Each business that signs up works in an isolated workspace — its own records, people, roles and settings."
        />
        <RevealGroup as="ol" className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <RevealItem as="li" key={t} className="card p-6">
              <span className="font-display text-sm font-semibold text-brass-text">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <WorkspaceSwitcher />
          <div className="card flex flex-col p-6 sm:p-7">
            <h3 className="font-display text-lg font-semibold">What stays separate</h3>
            <ul className="mt-4 space-y-3">
              {isolation.map((x) => (
                <li key={x} className="flex items-center gap-3 text-[0.9375rem] text-fg-2">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brass" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-2xl border border-line bg-surface-2 p-4 text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-fg">{siteConfig.trialDays}-day trial.</strong> New companies start on a {siteConfig.trialDays}-day trial
              and the app shows the days left. Billing isn&apos;t built yet, so the trial ending doesn&apos;t restrict access today.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
