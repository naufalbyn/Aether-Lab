
"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  ArrowUpRight,
  Menu,
} from "lucide-react";

import NavigationBrand from "@/components/navigation/NavigationBrand";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import useNavigationState from "@/components/navigation/useNavigationState";

import {
  primaryNavigation,
  contactNavigation,
} from "@/data/navigation";

// ==========================================
// ADAPTIVE GLASS COMMAND
// Hybrid Design A + B
// ==========================================

export default function AdaptiveGlassCommand() {
  const {
    scrolled,
    activeSection,
    theme,
    progress,
  } = useNavigationState();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const dark = theme === "dark";

  const contactActive =
    activeSection === "contact";

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        data-site-navigation
        data-navbar-design="adaptive-glass-command"
        data-navbar-theme={theme}
        data-navbar-scrolled={String(scrolled)}
        data-navbar-active={
          activeSection ?? "none"
        }
        data-navbar-progress={progress}
        className={`pointer-events-none fixed inset-x-0 top-0 z-90 px-4 transition-[padding] duration-500 motion-reduce:transition-none sm:px-6 md:px-8 ${
          scrolled
            ? "pt-3 md:pt-4"
            : "pt-5 md:pt-7"
        }`}
      >
        {/* ==================================
            ADAPTIVE GLASS SURFACE
        ================================== */}

        <div
          className={`pointer-events-auto relative mx-auto max-w-360 rounded-4xl border transition-[background-color,border-color,box-shadow,padding] duration-500 motion-reduce:transition-none ${
            scrolled
              ? dark
                ? "border-white/15 bg-[#11131A]/90 px-4 pb-2 pt-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl md:px-6"
                : "border-black/10 bg-[#F5F5F2]/90 px-4 pb-2 pt-2.5 shadow-[0_12px_40px_rgba(11,13,16,0.08)] backdrop-blur-xl md:px-6"
              : "border-transparent px-0 py-1"
          }`}
        >

          {/* ==================================
              MAIN NAVIGATION ROW
          ================================== */}

          <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">

            {/* Official brand */}

            <div className="min-w-0 justify-self-start">
              <NavigationBrand
                theme={theme}
                onClick={closeMenu}
              />
            </div>

            {/* ==================================
                DESKTOP NAVIGATION
            ================================== */}

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {primaryNavigation.map((item) => {
                const active =
                  activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-current={
                      active
                        ? "location"
                        : undefined
                    }
                    className={`group relative inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full px-4 font-mono text-[10px] font-medium uppercase tracking-[0.09em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none xl:px-5 ${
                      dark
                        ? active
                          ? "bg-white/10 text-[#C7FF3D] focus-visible:outline-[#C7FF3D]"
                          : "text-white/60 hover:bg-white/5 hover:text-white focus-visible:outline-[#C7FF3D]"
                        : active
                          ? "bg-[#4F46FF]/8 text-[#4F46FF] focus-visible:outline-[#4F46FF]"
                          : "text-black/60 hover:bg-black/5 hover:text-black focus-visible:outline-[#4F46FF]"
                    }`}
                  >
                    {item.label}

                    <span
                      aria-hidden="true"
                      className={`absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
                        active
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      } ${
                        dark
                          ? "bg-[#C7FF3D]"
                          : "bg-[#4F46FF]"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ==================================
                CONTACT CTA + MENU
            ================================== */}

            <div className="flex shrink-0 items-center justify-self-end gap-2 md:gap-3">

              <a
                href={contactNavigation.href}
                aria-current={
                  contactActive
                    ? "location"
                    : undefined
                }
                className={`group hidden min-h-11 items-center justify-center gap-3 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none sm:inline-flex xl:px-5 ${
                  dark
                    ? "border-[#C7FF3D] bg-[#C7FF3D] text-[#0B0D10] hover:border-white hover:bg-white focus-visible:outline-[#C7FF3D]"
                    : "border-[#0B0D10] bg-[#0B0D10] text-white hover:border-[#4F46FF] hover:bg-[#4F46FF] focus-visible:outline-[#4F46FF]"
                } ${
                  contactActive
                    ? dark
                      ? "ring-2 ring-[#C7FF3D]/25 ring-offset-2 ring-offset-[#11131A]"
                      : "ring-2 ring-[#4F46FF]/25 ring-offset-2 ring-offset-[#F5F5F2]"
                    : ""
                }`}
              >
                <span className="font-display tracking-tight">
                  {contactNavigation.label}
                </span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none ${
                    dark
                      ? "text-[#0B0D10]"
                      : "text-[#C7FF3D]"
                  }`}
                />
              </a>

              <button
                type="button"
                aria-label="Open navigation"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none lg:hidden ${
                  dark
                    ? "border-white/15 bg-white/5 text-white hover:bg-white/10 focus-visible:outline-[#C7FF3D]"
                    : "border-black/10 bg-white/60 text-black hover:bg-white focus-visible:outline-[#4F46FF]"
                }`}
              >
                <Menu
                  size={21}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* ==================================
              INTEGRATED SCROLL PROGRESS
          ================================== */}

          <div
            data-glass-progress
            inert={!scrolled}
            aria-hidden={!scrolled}
            className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${
              scrolled
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">

              <div className="flex items-center gap-3 px-2 pt-2 md:gap-4 md:px-3">

                {/* Desktop progress label */}

                <span
                  aria-hidden="true"
                  className={`hidden shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] xl:block ${
                    dark
                      ? "text-white/45"
                      : "text-black/50"
                  }`}
                >
                  Scroll progress
                </span>

                {/* Progress track */}

                <div
                  role="progressbar"
                  aria-label="Page scroll progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className={`relative h-0.5 min-w-0 flex-1 overflow-hidden rounded-full ${
                    dark
                      ? "bg-white/10"
                      : "bg-black/10"
                  }`}
                >
                  <div
                    data-glass-progress-fill
                    className={`absolute inset-0 origin-left rounded-full transition-transform duration-150 ease-out motion-reduce:transition-none ${
                      dark
                        ? "bg-[#C7FF3D]"
                        : "bg-[#4F46FF]"
                    }`}
                    style={{
                      transform: `scaleX(${progress / 100})`,
                    }}
                  />
                </div>

                {/* Numeric scroll percentage */}

                <span
                  data-glass-progress-value
                  aria-hidden="true"
                  className={`w-9 shrink-0 text-right font-mono text-[9px] tabular-nums ${
                    dark
                      ? "text-[#C7FF3D]"
                      : "text-[#4F46FF]"
                  }`}
                >
                  {String(progress).padStart(2, "0")}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================
          SHARED MOBILE NAVIGATION
      ================================== */}

      <MobileNavigation
        open={menuOpen}
        onClose={closeMenu}
        activeSection={activeSection}
      />
    </>
  );
}
