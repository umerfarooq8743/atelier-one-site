import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals without per-element JavaScript.
 *
 * These render plain server HTML with data attributes; one <RevealObserver/>
 * in the root layout marks them visible as they scroll into view, and CSS
 * (globals.css) does the fade/slide and the stagger. Content is only hidden
 * when the `js` class is present, so it stays visible if scripts fail, and
 * prefers-reduced-motion skips the motion entirely.
 *
 * suppressHydrationWarning: the observer may set `data-shown` before React
 * hydrates a streamed part of the page. That attribute is expected to differ.
 */

type Tag = "div" | "section" | "ul" | "ol" | "li" | "figure" | "article";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds. */
  delay?: number;
  as?: Tag;
  id?: string;
}

export function Reveal({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined;
  return (
    <Tag id={id} className={className} data-reveal="" style={style} suppressHydrationWarning>
      {children}
    </Tag>
  );
}

/** Parent whose direct <RevealItem> children appear in a staggered sequence. */
export function RevealGroup({ children, className, as: Tag = "div", id }: Omit<RevealProps, "delay">) {
  return (
    <Tag id={id} className={className} data-reveal-group="" suppressHydrationWarning>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as: Tag = "div", id }: Omit<RevealProps, "delay">) {
  return (
    <Tag id={id} className={className} data-reveal-item="">
      {children}
    </Tag>
  );
}
