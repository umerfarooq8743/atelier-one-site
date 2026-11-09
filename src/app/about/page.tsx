import { Compass, Layers, Ruler, Scissors } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoMark } from "@/components/ui/Logo";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About — Why Atelier One Exists",
  description:
    "Atelier One brings the disconnected operations of tailoring and fabric businesses into one workspace. Learn why it was built, the problems it addresses and how it has developed.",
  path: "/about",
});

const why = [
  { Icon: Ruler, t: "Measurements are the product", d: "A tailoring order is only as good as the measurements behind it. Generic tools have no place for a collar style, a daman or a measurement history." },
  { Icon: Scissors, t: "Work happens item by item", d: "One invoice can hold a kurta that's ready and a waistcoat still on the table. Orders need stages per item, not per bill." },
  { Icon: Layers, t: "Fabric is sold by the meter", d: "Stock is cut, sold and bought in bulk every day. It only stays accurate if every sale and purchase moves it automatically." },
  { Icon: Compass, t: "Money follows the order", d: "Advances, part-payments, staff loans and wages all touch the same order. They belong in the same system." },
];

const timeline = [
  { when: "Earlier", what: "Graphite & Gold theme with dark mode, activity log, financial integrity and security hardening." },
  { when: "Oct 2026", what: "Roles & permissions, the Setup hub and new reports; modules interlinked — invoice ↔ payment integrity, wages → expenses → P&L, the customer 360° page and global search." },
  { when: "Oct 2026", what: "Rebranded to Atelier One. Became multi-company: sign-up creates a company workspace with a 14-day trial; existing data moved into ROBE Cloth & Tailoring's own company." },
  { when: "Oct 2026", what: "Email over SMTP for invitations and password recovery; responsive layouts with phone-friendly tables." },
  { when: "Oct 2026", what: "Premium add/edit forms across the app; server-computed invoice totals and atomic, oversell-proof stock." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb={{ name: "About", path: "/about" }}
        eyebrow="About Atelier One"
        title={<>Built for the Craft — <span className="text-gold">and the Business Behind It</span></>}
        description="Atelier One exists because tailoring and fabric businesses deserve software that understands measurements, meters and the workshop — not a generic billing tool bent into shape."
      />

      <section className="pb-20" aria-labelledby="mission-t">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <Reveal>
            <h2 id="mission-t" className="display-md">Bringing disconnected operations together</h2>
            <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-fg-2">
              <p>
                A tailoring shop runs on many separate threads: customer registers, measurement slips, fabric notebooks, hand-written bills,
                calls to the workshop and a separate book for staff advances. Each works on its own, but none of them talk to each other.
              </p>
              <p>
                Atelier One ties those threads into one connected workspace. A sale moves the stock, the customer&apos;s balance and the receipt
                together; a wage becomes an expense; a measurement travels with the order it was cut from.
              </p>
            </div>
          </Reveal>
          <Reveal className="card relative overflow-hidden p-8 text-center">
            <div aria-hidden className="absolute inset-0" style={{ background: "var(--glow)" }} />
            <div className="relative">
              <LogoMark size={88} id="about" className="mx-auto" />
              <p className="mt-6 font-display text-2xl font-semibold">Atelier <span className="text-gold">One</span></p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                The mark is a brass &ldquo;A&rdquo; whose apex is a needle eye with a thread leaving it, and whose crossbar is a running stitch —
                one connected line through the whole business.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-bg-raised/50" aria-labelledby="why-t">
        <div className="container-page">
          <SectionHeading eyebrow="Why specialised software" title={<span id="why-t">Tailoring Has Its Own Logic</span>} />
          <RevealGroup as="ul" className="mt-14 grid gap-4 sm:grid-cols-2">
            {why.map(({ Icon, t, d }) => (
              <RevealItem as="li" key={t} className="card p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-brass-soft text-brass-text"><Icon aria-hidden className="size-5" /></span>
                <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section" aria-labelledby="bg-t">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading align="left" eyebrow="Development background" title={<span id="bg-t">From One Shop to a Multi-Company Platform</span>} size="md"
              description={<>Atelier One began as a single-shop application — the repository is still named <em>RobeApp</em>. Its first customer is {siteConfig.firstCustomer}, whose data now lives in its own company workspace. The product is designed, built and maintained by {siteConfig.owner}, and remains in active development.</>} />
            <div className="mt-8">
              <Button href={siteConfig.repository} variant="secondary" icon={<GitHubIcon className="size-4" />}>View on GitHub</Button>
            </div>
          </div>
          <RevealGroup as="ol" className="relative space-y-4">
            <span aria-hidden className="stitch-v absolute left-[0.95rem] top-3 bottom-3" />
            {timeline.map((t, i) => (
              <RevealItem as="li" key={i} className="relative flex gap-4">
                <span aria-hidden className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-bg"><span className="size-2 rounded-full bg-brass" /></span>
                <div className="card flex-1 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brass-text">{t.when}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-2">{t.what}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="pb-12" aria-labelledby="vision-t">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Vision</p>
            <h2 id="vision-t" className="display-md mt-4">One connected workspace for every detail of a tailoring and fabric business.</h2>
            <p className="mt-5 text-[0.9375rem] text-muted">
              What&apos;s next is guided by the product&apos;s documented roadmap gaps — such as billing for paid plans, company logos on invoices, SMS and scheduled backups — none of which are available today.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
