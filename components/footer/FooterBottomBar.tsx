
import { ArrowUp } from "lucide-react";

import { footerBrand } from "@/data/footer";

export default function FooterBottomBar({
  className = "",
}: {
  className?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <div
      className={`flex flex-col gap-5 border-t border-white/10 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between ${className}`}
    >

      {/* Copyright */}

      <p className="font-mono text-[9px] uppercase leading-relaxed tracking-widest text-white/50">

        &copy; {year} {footerBrand.name}.
        All rights reserved.
      </p>

      {/* Closing statement */}

      <div className="flex items-center gap-3">

        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-aether-lime"
        />

        <p className="font-mono text-[9px] uppercase leading-relaxed tracking-widest text-white/50">
          {footerBrand.closingStatement}
        </p>
      </div>

      {/* Back to top */}

      <a
        href="#top"
        data-footer-back-to-top
        className="group inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-white/10 px-4 text-white/70 transition-colors duration-300 hover:border-aether-lime/40 hover:text-aether-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aether-lime motion-reduce:transition-none"
      >

        <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
          Back to top
        </span>

        <ArrowUp
          size={15}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-reduce:transition-none"
        />
      </a>
    </div>
  );
}
