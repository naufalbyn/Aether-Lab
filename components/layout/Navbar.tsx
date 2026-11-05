"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { label: "BUILDS", href: "#builds" },
  { label: "EXPERIMENTS", href: "#experiments" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-90 px-5 transition-all duration-500 md:px-8 ${
          scrolled ? "pt-4 md:pt-5" : "pt-5 md:pt-7"
        }`}
      >
        <div
          className={`mx-auto flex max-w-360 items-center justify-between transition-all duration-500 ${
            scrolled
              ? "rounded-full border border-[#0B0D10]/10 bg-[#F5F5F2]/88 px-4 py-3 shadow-[0_12px_40px_rgba(11,13,16,0.08)] backdrop-blur-xl md:px-5"
              : "px-0 py-1"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Aether Lab home"
            className="group relative z-10 flex items-center"
            onClick={handleNavClick}
          >
            <div className="relative flex h-10 w-10 items-center justify-center md:h-11 md:w-11">
              <Image
                src="/aether-mark.svg"
                alt="Aether Lab"
                width={44}
                height={44}
                priority
                className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:rotate-12"
              />
            </div>

            <div className="ml-3 hidden flex-col leading-none sm:flex">
              <span className="font-display text-[13px] font-semibold tracking-[0.18em] text-[#0B0D10]">
                AETHER
              </span>

              <span className="mt-1 font-mono text-[8px] font-medium tracking-[0.2em] text-[#0B0D10]/90">
                TECHNOLOGY STUDIO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative px-4 py-2 font-mono text-[10px] font-medium tracking-[0.16em] text-[#0B0D10]/65 transition-colors duration-300 hover:text-[#0B0D10]"
              >
                <span>{item.label}</span>

                <span className="absolute bottom-0.5 left-4 right-4 h-px origin-left scale-x-0 bg-[#0B0D10] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Availability + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-[#0B0D10]/12 bg-[#FFFFFF]/55 px-4 py-2.5 transition-all duration-300 hover:border-[#0B0D10]/25 hover:bg-[#FFFFFF] md:flex"
            >
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#C7FF3D] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />
              </span>

              <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-[#0B0D10]/70">
                AVAILABLE FOR PROJECTS
              </span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#0B0D10]/10 bg-[#FFFFFF]/60 text-[#0B0D10] backdrop-blur-md transition-all duration-300 hover:bg-[#FFFFFF] lg:hidden"
            >
              {menuOpen ? (
                <X size={18} strokeWidth={1.7} />
              ) : (
                <Menu size={18} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-80 bg-[#F5F5F2] transition-all duration-500 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col px-6 pb-8 pt-28 md:px-10">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-[#0B0D10]/10 pb-5">
            <div>
              <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-[#0B0D10]/45">
                Navigation
              </p>

              <p className="mt-2 font-display text-sm font-medium tracking-[0.08em] text-[#0B0D10]">
                AETHER LAB
              </p>
            </div>

            <span className="font-mono text-[9px] tracking-[0.16em] text-[#0B0D10]/35">
              01 — 04
            </span>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-1 flex-col justify-center">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="group flex items-end justify-between border-b border-[#0B0D10]/10 py-5 transition-colors duration-300 hover:text-[#4F46FF]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[9px] tracking-[0.16em] text-[#0B0D10]/35">
                    0{index + 1}
                  </span>

                  <span className="font-display text-4xl font-medium tracking-[-0.04em] md:text-5xl">
                    {item.label}
                  </span>
                </div>

                <ArrowUpRight
                  size={20}
                  strokeWidth={1.5}
                  className="mb-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Footer */}
          <div className="flex items-center justify-between border-t border-[#0B0D10]/10 pt-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#C7FF3D] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />
              </span>

              <span className="font-mono text-[9px] font-medium tracking-[0.14em] text-[#0B0D10]/60">
                AVAILABLE FOR PROJECTS
              </span>
            </div>

            <span className="font-mono text-[9px] tracking-[0.16em] text-[#0B0D10]/35">
              IND / 2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}