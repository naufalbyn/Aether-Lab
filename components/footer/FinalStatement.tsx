
import FooterBrand from "@/components/footer/FooterBrand";
import FooterNavigation from "@/components/footer/FooterNavigation";
import FooterContact from "@/components/footer/FooterContact";
import FooterBottomBar from "@/components/footer/FooterBottomBar";

import { footerBrand } from "@/data/footer";

// ==========================================
// THE FINAL STATEMENT
// Footer Design B
// ==========================================

export default function FinalStatement() {
  return (
    <footer
      id="footer"
      data-site-footer
      data-footer-design="final-statement"
      className="relative isolate overflow-hidden bg-aether-black text-white"
    >
      {/* ==================================
          SUBTLE AMBIENT LIGHTING
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 -top-48 h-120 w-120 rounded-full bg-[#4F46FF]/8 blur-[150px]" />

        <div className="absolute -bottom-48 right-0 h-100 w-100 rounded-full bg-[#8B5CF6]/5 blur-[140px]" />
      </div>

      {/* Top divider */}

      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="aether-container">

        {/* ==================================
            STUDIO STATUS
        ================================== */}

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-6 md:py-8">

          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/50">
            Aether / The Journey Continues
          </p>

          <div className="flex items-center gap-2.5">

            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-aether-lime"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/65">
              {footerBrand.availability}
            </span>
          </div>
        </div>

        {/* ==================================
            EDITORIAL CLOSING STATEMENT
        ================================== */}

        <div
          data-footer-statement
          className="relative py-16 sm:py-20 lg:py-28"
        >

          <div className="mb-7 flex items-center gap-3 md:mb-10">

            <span
              aria-hidden="true"
              className="h-px w-8 bg-aether-lime/70"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
              The philosophy
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.2rem,8.2vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.065em]">

            <span className="block text-white">
              {footerBrand.philosophy.first}
            </span>

            <span className="mt-2 block text-aether-lime md:mt-4">
              {footerBrand.philosophy.second}
            </span>
          </h2>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mt-12">

            <p className="max-w-sm font-display text-base leading-relaxed text-white/60 md:text-lg">
              Curiosity is where it begins.
            </p>

            <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.15em] text-white/45">
              Independent thinking.
              <br />
              Meaningful creation.
            </p>
          </div>
        </div>

        {/* ==================================
            COMPACT STUDIO DIRECTORY
        ================================== */}

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 border-t border-white/10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-12 lg:gap-y-0 lg:py-16">

          {/* Official identity */}

          <FooterBrand
            className="sm:col-span-2 lg:col-span-5 lg:pr-12"
            showDescription={true}
            showPhilosophy={false}
            showLocation={true}
          />

          {/* Navigation directory */}

          <FooterNavigation
            variant="explore"
            className="lg:col-span-2 lg:col-start-7"
          />

          {/* Business contact */}

          <div className="flex min-w-0 flex-col gap-8 lg:col-span-4">

            <FooterContact />

            <p className="max-w-xs text-sm leading-7 text-white/50">
              Open to meaningful projects,
              collaborations, and new possibilities.
            </p>
          </div>
        </div>

        {/* ==================================
            OVERSIZED BRAND WORDMARK
        ================================== */}

        <div className="relative overflow-hidden border-t border-white/10 pb-5 pt-8 md:pb-8 md:pt-12">

          <div className="mb-4 flex items-center justify-between gap-4">

            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
              Independent by design
            </span>

            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
              Aether / Indonesia
            </span>
          </div>

          <svg
            data-footer-wordmark
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1200 180"
            className="block h-auto w-full select-none text-white transition-colors duration-500 hover:text-aether-lime motion-reduce:transition-none"
          >
            <text
              x="600"
              y="90"
              textAnchor="middle"
              dominantBaseline="central"
              textLength="1180"
              lengthAdjust="spacingAndGlyphs"
              fill="currentColor"
              fontSize="180"
              fontWeight="700"
              letterSpacing="-8"
              className="font-display"
            >
              AETHER LAB
            </text>
          </svg>
        </div>

        {/* ==================================
            COPYRIGHT & BACK TO TOP
        ================================== */}

        <FooterBottomBar />
      </div>
    </footer>
  );
}
