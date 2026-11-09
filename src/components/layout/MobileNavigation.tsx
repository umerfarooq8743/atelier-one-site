"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { allPages } from "@/data/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const noop = () => () => {};

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  // true only after hydration, so the portal never mismatches server HTML
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a,button")?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        // Keep focus inside the drawer while it is open.
        const items = panelRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[60] lg:hidden">
                <m.div
                  className="absolute inset-0 bg-black/55 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  aria-hidden
                />
                <m.div
                  ref={panelRef}
                  id="mobile-nav"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                  className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col border-l border-line bg-bg p-5 shadow-lift"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">Menu</span>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="grid size-10 place-items-center rounded-full border border-line text-fg"
                    >
                      <X aria-hidden className="size-5" />
                    </button>
                  </div>
                  <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
                    <ul className="flex flex-col">
                      {allPages.map((l, i) => {
                        const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                        return (
                          <m.li
                            key={l.href}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + i * 0.03, duration: 0.3 }}
                          >
                            <Link
                              href={l.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between border-b border-line py-3.5 font-display text-lg font-medium",
                                active ? "text-brass-text" : "text-fg",
                              )}
                            >
                              {l.label}
                              {active && <span aria-hidden className="size-1.5 rounded-full bg-brass" />}
                            </Link>
                          </m.li>
                        );
                      })}
                    </ul>
                  </nav>
                  <Link href="/contact" onClick={() => setOpen(false)} className={buttonClasses("primary", "md", "mt-6 w-full")}>
                    Talk to Our Team
                  </Link>
                </m.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
