import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

interface CTASectionProps {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function CTASection({
  title = "Bring Your Entire Tailoring Business Together.",
  description = "Tell us how your shop works today — customers, fabric, workshop and staff — and we'll show you how Atelier One fits.",
  primary = { label: "Get in Touch", href: "/contact" },
  secondary = { label: "Explore the Platform", href: "/modules" },
}: CTASectionProps) {
  return (
    <section className="pb-24 pt-8 sm:pb-32">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212] px-6 py-16 text-center text-[#f7f5f0] sm:px-12 sm:py-24">
          <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 80% at 50% 0%, rgba(184,154,90,0.32), transparent 70%)" }} />
          <div aria-hidden className="absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
          <LogoMark size={56} id="cta" className="mx-auto" />
          <h2 className="display-lg mx-auto mt-8 max-w-3xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#cfccc4]">{description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg" arrow className="w-full sm:w-auto">{primary.label}</Button>
            <Link
              href={secondary.href}
              className="inline-flex h-13 w-full items-center justify-center rounded-full border border-white/20 px-7 font-semibold text-[#f7f5f0] transition-colors hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              {secondary.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
