
import Image from "next/image";

import type {
  NavigationTheme,
} from "@/components/navigation/useNavigationState";

export default function NavigationBrand({
  theme = "light",
  onClick,
}: {
  theme?: NavigationTheme;
  onClick?: () => void;
}) {
  const dark = theme === "dark";

  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label="Aether Lab home"
      data-navigation-brand
      className={`group inline-flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 ${
        dark
          ? "focus-visible:outline-[#C7FF3D]"
          : "focus-visible:outline-[#4F46FF]"
      }`}
    >
      <div className="flex h-10 w-11 shrink-0 items-center justify-center md:h-11 md:w-12">

        <Image
          src="/aether-mark.svg"
          alt=""
          width={386}
          height={246}
          priority
          className={`h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:rotate-6 motion-reduce:transition-none ${
            dark
              ? "brightness-0 invert"
              : ""
          }`}
        />
      </div>

      <div className="hidden flex-col leading-none sm:flex">

        <span
          className={`font-display text-[13px] font-semibold tracking-[0.14em] ${
            dark
              ? "text-white"
              : "text-[#0B0D10]"
          }`}
        >
          AETHER LAB
        </span>

        <span
          className={`mt-1.5 font-mono text-[7px] uppercase tracking-[0.15em] ${
            dark
              ? "text-white/50"
              : "text-black/50"
          }`}
        >
          Independent Technology Studio
        </span>
      </div>
    </a>
  );
}
