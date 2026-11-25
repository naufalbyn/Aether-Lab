
import type { ReactNode } from "react";

type GlassVariant = "light" | "dark" | "cyan";
type GlassRadius = "sm" | "md" | "lg" | "xl";
type GlassPadding = "none" | "sm" | "md" | "lg";

interface GlassPanelProps {
  children: ReactNode;
  variant?: GlassVariant;
  radius?: GlassRadius;
  padding?: GlassPadding;
  interactive?: boolean;
  highlight?: boolean;
  className?: string;
}

const variants: Record<GlassVariant, string> = {
  light:
    "border-white/70 bg-white/45 text-[#0B0D10] shadow-[0_8px_32px_rgba(11,13,16,0.06)]",

  dark:
    "border-white/10 bg-[#1D1D28]/55 text-white shadow-[0_8px_32px_rgba(0,0,0,0.18)]",

  cyan:
    "border-[#1EC1CB]/25 bg-[#1EC1CB]/8 text-white shadow-[0_8px_32px_rgba(30,193,203,0.08)]",
};

const radii: Record<GlassRadius, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

const paddings: Record<GlassPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export default function GlassPanel({
  children,
  variant = "light",
  radius = "lg",
  padding = "md",
  interactive = false,
  highlight = true,
  className = "",
}: GlassPanelProps) {
  const interactiveClass = interactive
    ? "transition-[transform,border-color,box-shadow] duration-500 ease-out motion-safe:hover:-translate-y-1 hover:border-[#4F46FF]/40 hover:shadow-[0_12px_40px_rgba(79,70,255,0.12)]"
    : "";

  return (
    <div
      className={[
        "group relative isolate overflow-hidden border backdrop-blur-xl",
        variants[variant],
        radii[radius],
        paddings[padding],
        interactiveClass,
        className,
      ].join(" ")}
    >
      {/* Glass Surface Highlight */}
      {highlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div
            className={[
              "absolute inset-x-0 top-0 h-px",
              variant === "light"
                ? "bg-linear-to-r from-transparent via-white to-transparent"
                : "bg-linear-to-r from-transparent via-white/30 to-transparent",
            ].join(" ")}
          />

          <div
            className={[
              "absolute left-[-25%] top-[-50%] h-full w-[80%] rounded-full blur-[70px]",
              variant === "light"
                ? "bg-white/35"
                : "bg-white/5",
            ].join(" ")}
          />

          <div
            className={[
              "absolute bottom-[-50%] right-[-25%] h-full w-[70%] rounded-full blur-[80px]",
              variant === "cyan"
                ? "bg-[#1EC1CB]/10"
                : "bg-[#4F46FF]/5",
            ].join(" ")}
          />
        </div>
      )}

      {/* Panel Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
