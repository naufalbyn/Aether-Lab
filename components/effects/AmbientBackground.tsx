
import type { CSSProperties } from "react";

type AmbientVariant =
  | "light"
  | "dark"
  | "cyan"
  | "violet"
  | "burgundy";

interface AmbientBackgroundProps {
  variant?: AmbientVariant;
  intensity?: number;
  animated?: boolean;
  grid?: boolean;
  className?: string;
}

interface AmbientPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  grid: string;
}

const palettes: Record<AmbientVariant, AmbientPalette> = {
  light: {
    primary: "#4F46FF",
    secondary: "#1EC1CB",
    tertiary: "#C7FF3D",
    grid: "#0B0D10",
  },
  dark: {
    primary: "#4F46FF",
    secondary: "#8B5CF6",
    tertiary: "#1EC1CB",
    grid: "#FFFFFF",
  },
  cyan: {
    primary: "#1EC1CB",
    secondary: "#4F46FF",
    tertiary: "#C7FF3D",
    grid: "#FFFFFF",
  },
  violet: {
    primary: "#8B5CF6",
    secondary: "#4F46FF",
    tertiary: "#1EC1CB",
    grid: "#FFFFFF",
  },
  burgundy: {
    primary: "#A83265",
    secondary: "#8B5CF6",
    tertiary: "#4F46FF",
    grid: "#FFFFFF",
  },
};

export default function AmbientBackground({
  variant = "light",
  intensity = 1,
  animated = true,
  grid = false,
  className = "",
}: AmbientBackgroundProps) {
  const palette = palettes[variant];

  const safeIntensity = Math.max(
    0,
    Math.min(intensity, 2)
  );

  const isLight = variant === "light";

  const glowOpacity = isLight ? 0.1 : 0.16;

  const motionClass = animated
    ? "motion-safe:animate-[aether-float_18s_ease-in-out_infinite]"
    : "";

  const primaryStyle: CSSProperties = {
    backgroundColor: palette.primary,
    opacity: glowOpacity * safeIntensity,
    animationDelay: "0s",
  };

  const secondaryStyle: CSSProperties = {
    backgroundColor: palette.secondary,
    opacity: glowOpacity * safeIntensity * 0.8,
    animationDelay: "-6s",
  };

  const tertiaryStyle: CSSProperties = {
    backgroundColor: palette.tertiary,
    opacity: glowOpacity * safeIntensity * 0.55,
    animationDelay: "-12s",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Primary Ambient Glow */}
      <div
        className={`absolute right-[-15%] top-[-20%] h-[75%] w-[65%] rounded-full blur-[120px] md:blur-[160px] ${motionClass}`}
        style={primaryStyle}
      />

      {/* Secondary Ambient Glow */}
      <div
        className={`absolute bottom-[-25%] left-[-15%] h-[70%] w-[60%] rounded-full blur-[100px] md:blur-[140px] ${motionClass}`}
        style={secondaryStyle}
      />

      {/* Tertiary Accent */}
      <div
        className={`absolute bottom-[10%] right-[15%] h-[35%] w-[35%] rounded-full blur-[90px] md:blur-[120px] ${motionClass}`}
        style={tertiaryStyle}
      />

      {/* Optional Technical Grid */}
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            opacity:
              (isLight ? 0.035 : 0.055) *
              safeIntensity,
            backgroundImage: `
              linear-gradient(
                ${palette.grid} 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                ${palette.grid} 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 85%)",
          }}
        />
      )}
    </div>
  );
}
