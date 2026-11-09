import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  /** Breadcrumb name and path for this page. */
  crumb: { name: string; path: string };
  children?: ReactNode;
}

/** Shared header for inner pages: breadcrumb (+ JSON-LD), H1 and intro. */
export function PageHero({ eyebrow, title, description, crumb, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      <JsonLd data={breadcrumbJsonLd([crumb])} />
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[36rem]" style={{ background: "var(--glow)" }} />
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="hero-in mb-8 flex justify-center">
          <ol className="flex items-center gap-1.5 text-sm text-muted">
            <li><Link href="/" className="hover:text-fg">Home</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-fg-2">{crumb.name}</li>
          </ol>
        </nav>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="eyebrow hero-in"><span aria-hidden className="stitch w-6" />{eyebrow}</p>
          <h1 className="hero-title display-xl mt-5 !text-[clamp(2.25rem,5.4vw,4.25rem)]">{title}</h1>
          <div className="hero-in lead mt-6 max-w-2xl" style={{ animationDelay: "120ms" }}>{description}</div>
          {children && <div className="hero-in mt-9 w-full" style={{ animationDelay: "220ms" }}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
