"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  node: ReactNode;
}

/** Filterable gallery of product previews with an accessible, keyboard-driven lightbox. */
export function ScreenGallery({ items, categories }: { items: GalleryItem[]; categories: string[] }) {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);
  const current = open !== null ? visible[open] : null;

  const go = useCallback(
    (delta: number) => {
      setDir(delta);
      setOpen((o) => (o === null ? o : (o + delta + visible.length) % visible.length));
    },
    [visible.length],
  );

  const close = useCallback(() => {
    const id = open !== null ? visible[open]?.id : null;
    setOpen(null);
    if (id) window.setTimeout(() => triggerRefs.current[id]?.focus(), 0);
  }, [open, visible]);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, go]);

  const counts = (c: string) => (c === "All" ? items.length : items.filter((i) => i.category === c).length);

  return (
    <div>
      <div role="group" aria-label="Filter screens by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === c ? "border-transparent bg-invert-bg text-invert-fg" : "border-line bg-surface text-fg-2 hover:text-fg",
            )}
          >
            {c}
            <span className={cn("rounded-full px-1.5 text-xs", filter === c ? "bg-white/15" : "bg-surface-3 text-muted")}>{counts(c)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} screens shown</p>

      <m.ul layout={false} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((it, i) => (
            <m.li
              key={it.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <button
                ref={(el) => { triggerRefs.current[it.id] = el; }}
                type="button"
                onClick={() => { setDir(1); setOpen(i); }}
                aria-haspopup="dialog"
                aria-label={`Open preview: ${it.title}`}
                className="card group block w-full overflow-hidden text-left transition-[transform,border-color,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift"
              >
                <div className="mk-force-desktop pointer-events-none relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-raised">
                  <div className="absolute inset-x-0 top-0">{it.node}</div>
                  <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                    <span className="grid size-11 scale-90 place-items-center rounded-full bg-white/90 text-[#141414] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Expand aria-hidden className="size-5" />
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brass-text">{it.category}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold">{it.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{it.caption}</p>
                </div>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <AnimatePresence>
        {current && open !== null && (
          <m.div
            className="fixed inset-0 z-[70] flex flex-col bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lb-title"
              aria-describedby="lb-caption"
              className="mx-auto flex h-full w-full max-w-6xl flex-col px-3 py-4 sm:px-6 sm:py-6"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <div className="flex items-start justify-between gap-4 text-[#f7f5f0]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#d6bc83]">
                    {current.category} · {open + 1} / {visible.length}
                  </p>
                  <h2 id="lb-title" className="mt-1 font-display text-xl font-semibold sm:text-2xl">{current.title}</h2>
                </div>
                <button ref={closeRef} type="button" onClick={close} aria-label="Close preview" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 hover:bg-white/10">
                  <X aria-hidden className="size-5" />
                </button>
              </div>

              <div className="relative mt-4 min-h-0 flex-1">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <m.div
                    key={current.id}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full overflow-y-auto overscroll-contain rounded-2xl"
                  >
                    {current.node}
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 text-[#cfccc4]">
                <button type="button" onClick={() => go(-1)} aria-label="Previous screen" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-[#f7f5f0] hover:bg-white/10">
                  <ChevronLeft aria-hidden className="size-5" />
                </button>
                <p id="lb-caption" className="text-center text-sm sm:text-[0.9375rem]">
                  {current.caption} <span className="text-[#929292]">Illustrative preview with sample data.</span>
                </p>
                <button type="button" onClick={() => go(1)} aria-label="Next screen" className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 text-[#f7f5f0] hover:bg-white/10">
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
