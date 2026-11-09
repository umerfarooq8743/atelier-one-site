import { cn } from "@/lib/utils";

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Unique gradient id — needed when several marks render on one page. */
  id?: string;
  title?: string;
}

/**
 * The Atelier One mark, reproduced from the product's `ui-logo` component:
 * a brass "A" on graphite whose apex is a needle eye with a thread leaving it,
 * and whose crossbar is a running stitch.
 */
export function LogoMark({ size = 36, className, id = "ao", title }: LogoMarkProps) {
  const gid = `${id}-grad`;
  const grad = `url(#${gid})`;
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="8" y1="6" x2="40" y2="42">
          <stop offset="0" stopColor="#F2D490" />
          <stop offset="1" stopColor="#B8893A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="#17171A" />
      <rect x=".75" y=".75" width="46.5" height="46.5" rx="12.25" fill="none" stroke={grad} strokeOpacity=".38" strokeWidth="1.5" />
      <path d="M14.5 36 L24 11.5 L33.5 36" fill="none" stroke={grad} strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.4 27.6 H29.6" fill="none" stroke={grad} strokeWidth="2.8" strokeLinecap="round" strokeDasharray="2.6 2.2" />
      <ellipse cx="24" cy="16.2" rx="1.05" ry="2.3" fill="#17171A" />
      <path d="M24 11.5 C27.5 6.2 34.5 5.8 36.4 10.6" fill="none" stroke={grad} strokeWidth="1.6" strokeLinecap="round" opacity=".9" />
      <circle cx="36.6" cy="11.6" r="1.5" fill={grad} />
    </svg>
  );
}

export function Logo({ className, size = 34, id }: { className?: string; size?: number; id?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={size} id={id} />
      <span className="font-display text-[1.15rem] font-semibold leading-none tracking-[-0.01em] whitespace-nowrap text-fg">
        Atelier <span className="text-gold">One</span>
      </span>
    </span>
  );
}
