
import Image from "next/image";

import { MapPin } from "lucide-react";

import { footerBrand } from "@/data/footer";

interface FooterBrandProps {
  className?: string;
  showDescription?: boolean;
  showPhilosophy?: boolean;
  showLocation?: boolean;
}

export default function FooterBrand({
  className = "",
  showDescription = true,
  showPhilosophy = true,
  showLocation = true,
}: FooterBrandProps) {
  return (
    <div className={className}>

      {/* Official studio identity */}

      <a
        href="#top"
        aria-label="Aether Lab home"
        className="group inline-flex max-w-full items-center gap-4 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aether-lime"
      >
        <Image
          src="/aether-mark.svg"
          alt=""
          width={386}
          height={246}
          className="h-auto w-14 shrink-0 object-contain brightness-0 invert transition-transform duration-500 motion-safe:group-hover:rotate-6 motion-reduce:transition-none sm:w-16"
        />

        <div className="min-w-0">

          <p className="font-display text-lg font-semibold uppercase leading-none tracking-[0.12em] text-white sm:text-xl">
            {footerBrand.name}
          </p>

          <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-white/60">
            {footerBrand.positioning}
          </p>
        </div>
      </a>

      {/* Studio description */}

      {showDescription && (
        <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">
          {footerBrand.description}
        </p>
      )}

      {/* Studio philosophy */}

      {showPhilosophy && (
        <div className="mt-8">

          <p className="font-display text-xl font-medium tracking-tight text-white">
            {footerBrand.philosophy.first}
          </p>

          <p className="mt-1 font-display text-xl font-medium tracking-tight text-aether-lime">
            {footerBrand.philosophy.second}
          </p>
        </div>
      )}

      {/* Location */}

      {showLocation && (
        <div className="mt-7 flex items-center gap-2.5 text-white/60">

          <MapPin
            size={15}
            strokeWidth={1.5}
            aria-hidden="true"
          />

          <span className="font-mono text-[10px] uppercase tracking-widest">
            {footerBrand.location}
          </span>
        </div>
      )}
    </div>
  );
}
