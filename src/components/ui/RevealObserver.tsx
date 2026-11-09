"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-shown]), [data-reveal-group]:not([data-shown])";

/**
 * The single script behind every <Reveal>/<RevealGroup>: one
 * IntersectionObserver, plus a MutationObserver so content added by
 * client-side navigation is picked up too.
 */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: Element) => el.setAttribute("data-shown", "");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(SELECTOR).forEach(show);
      const mo = new MutationObserver(() => document.querySelectorAll(SELECTOR).forEach(show));
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    let queued = 0;
    const scan = () => {
      queued = 0;
      document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    };
    scan();
    const mo = new MutationObserver(() => { if (!queued) queued = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(queued);
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
