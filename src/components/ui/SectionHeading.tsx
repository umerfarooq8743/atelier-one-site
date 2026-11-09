import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  size?: "lg" | "md";
  children?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  size = "lg",
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow">
          <span aria-hidden className="stitch w-6" />
          {eyebrow}
        </p>
      )}
      <Tag className={size === "lg" ? "display-lg" : "display-md"}>{title}</Tag>
      {description && <div className="lead max-w-2xl">{description}</div>}
      {children}
    </Reveal>
  );
}
