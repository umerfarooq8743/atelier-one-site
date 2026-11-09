"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { buttonClasses } from "@/components/ui/Button";
import { mainNav, productNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./MobileNavigation";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  const productActive = productNav.some((l) => isActive(pathname, l.href));

  const linkClass = (active: boolean) =>
    cn(
      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
      active ? "text-fg" : "text-fg-2 hover:text-fg",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled ? "glass border-b border-line shadow-[0_10px_30px_-20px_rgba(0,0,0,0.5)]" : "border-b border-transparent",
      )}
    >
      <div className="container-page flex h-[4.25rem] items-center gap-4">
        <Link href="/" aria-label="Atelier One — home" className="mr-2 rounded-lg">
          <Logo id="hdr" size={32} />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            <li>
              <div ref={menuRef} className="relative" onMouseLeave={() => setMenuOpen(false)}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  onClick={() => setMenuOpen((v) => !v)}
                  className={cn(linkClass(productActive), "inline-flex items-center gap-1")}
                >
                  Product
                  <ChevronDown aria-hidden className={cn("size-3.5 transition-transform duration-300", menuOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <m.div
                      id={menuId}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3"
                    >
                      <ul className="card glass grid gap-1 p-2">
                        {productNav.map((l) => (
                          <li key={l.href}>
                            <Link
                              href={l.href}
                              onClick={() => setMenuOpen(false)}
                              aria-current={isActive(pathname, l.href) ? "page" : undefined}
                              className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-3"
                            >
                              <span className="block text-sm font-semibold text-fg">{l.label}</span>
                              <span className="mt-0.5 block text-[0.8125rem] text-muted">{l.description}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
            {mainNav.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link href={l.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                    {l.label}
                    {active && <span aria-hidden className="stitch absolute inset-x-3.5 -bottom-0.5" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <ThemeToggle />
          <Link href="/contact" className={buttonClasses("primary", "sm", "max-sm:hidden")}>
            Talk to Our Team
          </Link>
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
