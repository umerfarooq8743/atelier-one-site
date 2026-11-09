import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "invert";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#e6c98a_0%,#c9a961_45%,#a8843f_100%)] text-on-brass shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_10px_30px_-10px_rgba(184,154,90,0.7)] hover:shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_16px_40px_-12px_rgba(184,154,90,0.9)] hover:-translate-y-0.5",
  secondary:
    "border border-line-strong bg-surface/60 text-fg hover:border-brass/60 hover:bg-surface hover:-translate-y-0.5",
  ghost: "text-fg-2 hover:text-fg hover:bg-surface-3/60",
  invert: "bg-invert-bg text-invert-fg hover:-translate-y-0.5 hover:opacity-95",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Show a trailing arrow that nudges on hover. */
  arrow?: boolean;
  icon?: ReactNode;
}

type LinkButtonProps = CommonProps & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Inner({ children, arrow, icon }: Pick<CommonProps, "children" | "arrow" | "icon">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
      )}
    </>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", className, children, arrow, icon } = props;
  const classes = buttonClasses(variant, size, className);

  if (props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, arrow: _a, icon: _i, ...rest } = props;
    void _v; void _s; void _c; void _ch; void _a; void _i;
    const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      const newTab = href.startsWith("http");
      return (
        <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
          <Inner arrow={arrow} icon={icon}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        <Inner arrow={arrow} icon={icon}>{children}</Inner>
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, arrow: _a, icon: _i, href: _h, type = "button", ...rest } = props;
  void _v; void _s; void _c; void _ch; void _a; void _i; void _h;
  return (
    <button type={type} className={classes} {...rest}>
      <Inner arrow={arrow} icon={icon}>{children}</Inner>
    </button>
  );
}
