
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowDownRight,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import HeroScene from "@/components/3d/HeroScene";

const capabilities = [
  { number: "01", label: "SOFTWARE" },
  { number: "02", label: "WEB3" },
  { number: "03", label: "AI & AUTOMATION" },
  { number: "04", label: "EXPERIMENTS" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const timeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .from(".hero-eyebrow", {
            opacity: 0,
            y: 20,
            duration: 0.7,
          })
          .from(
            ".hero-title-line",
            {
              opacity: 0,
              y: 90,
              rotateX: 12,
              duration: 1.1,
              stagger: 0.1,
            },
            "-=0.4"
          )
          .from(
            ".hero-description",
            {
              opacity: 0,
              y: 24,
              duration: 0.8,
            },
            "-=0.65"
          )
          .from(
            ".hero-actions",
            {
              opacity: 0,
              y: 20,
              duration: 0.7,
            },
            "-=0.5"
          )
          .from(
            visualRef.current,
            {
              opacity: 0,
              scale: 0.85,
              duration: 1.5,
            },
            "-=1.3"
          )
          .from(
            ".hero-meta-item",
            {
              opacity: 0,
              y: 15,
              duration: 0.6,
              stagger: 0.08,
            },
            "-=0.8"
          );
      },
      heroRef
    );

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative isolate min-h-svh overflow-hidden bg-[#F5F5F2] text-[#0B0D10]"
    >
      {/* Background Foundation */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#0B0D10 1px, transparent 1px), linear-gradient(90deg, #0B0D10 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        />

        <div className="absolute right-[-15%] top-[5%] h-[65%] w-[65%] rounded-full bg-[#4F46FF]/8 blur-[140px]" />

        <div className="absolute right-[5%] top-[25%] h-[40%] w-[40%] rounded-full bg-[#1EC1CB]/10 blur-[120px]" />

        <div className="absolute bottom-[-20%] left-[-15%] h-[45%] w-[45%] rounded-full bg-[#C7FF3D]/8 blur-[140px]" />

        <div className="absolute left-[5%] top-[22%] h-px w-[12%] bg-[#0B0D10]/10" />

        <div className="absolute right-[5%] top-[22%] h-px w-[12%] bg-[#0B0D10]/10" />

        <div className="absolute left-[5%] top-[22%] -translate-y-1/2">
          <Plus
            size={12}
            strokeWidth={1}
            className="text-[#0B0D10]/25"
          />
        </div>

        <div className="absolute right-[5%] top-[22%] -translate-y-1/2">
          <Plus
            size={12}
            strokeWidth={1}
            className="text-[#0B0D10]/25"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="aether-container relative z-10 flex min-h-svh flex-col justify-between pb-8 pt-28 md:pb-10 md:pt-36">
        {/* Technical Header */}
        <div className="mb-8 flex items-center justify-between border-b border-[#0B0D10]/10 pb-4 font-mono text-[9px] tracking-[0.18em] text-[#0B0D10]/45 md:mb-12">
          <span>AETHER LAB / 001</span>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]" />
            <span>INDEPENDENT STUDIO</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-0">
          {/* Editorial Content */}
          <div
            ref={contentRef}
            className="relative z-20 lg:col-span-7"
          >
            <div className="hero-eyebrow mb-7 flex items-center gap-3 md:mb-10">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#C7FF3D]/60 motion-reduce:animate-none" />

                <span className="relative h-2 w-2 rounded-full bg-[#C7FF3D]" />
              </span>

              <span className="font-mono text-[9px] font-medium tracking-[0.2em] text-[#0B0D10]/65 md:text-[10px]">
                STILL SEARCHING. STILL BUILDING.
              </span>

              <span className="hidden h-px w-14 bg-[#0B0D10]/15 sm:block" />
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-[clamp(3.2rem,8vw,8.8rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              <span className="hero-title-line block">
                WE BUILD
              </span>

              <span className="hero-title-line block">
                DIGITAL
                <span className="text-[#4F46FF]">.</span>
              </span>

              <span className="hero-title-line block">
                SYSTEMS
                <span className="text-[#4F46FF]">.</span>
              </span>
            </h1>

            {/* Description */}
            <div className="mt-8 max-w-lg md:mt-10">
              <p className="hero-description text-sm leading-7 text-[#0B0D10]/60 md:text-base md:leading-8">
                An independent technology studio exploring
                the intersection of software, Web3,
                artificial intelligence, and experimental
                digital systems.
              </p>
            </div>

            {/* Actions */}
            <div className="hero-actions mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#builds"
                className="group inline-flex items-center gap-5 rounded-full bg-[#0B0D10] px-6 py-4 font-mono text-[10px] font-medium tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#4F46FF]"
              >
                EXPLORE BUILDS

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="#about"
                className="group inline-flex items-center gap-4 rounded-full border border-[#0B0D10]/15 bg-white/40 px-6 py-4 font-mono text-[10px] font-medium tracking-[0.12em] text-[#0B0D10]/75 backdrop-blur-md transition-colors duration-300 hover:border-[#0B0D10]/30 hover:bg-white"
              >
                ABOUT AETHER

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Interactive 3D Visual */}
          <div
            ref={visualRef}
            className="relative z-10 min-w-0 lg:col-span-5"
          >
            <div className="relative mx-auto aspect-square w-full max-w-170 lg:w-[120%] lg:max-w-none lg:translate-x-[-5%]">
              {/* Outer Frame */}
              <div className="pointer-events-none absolute inset-[3%] rounded-full border border-[#0B0D10]/5" />

              <div className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-[#0B0D10]/10" />

              {/* 3D Scene */}
              <HeroScene />

              {/* Brand Signature */}
              <div className="pointer-events-none absolute bottom-[4%] left-[5%] z-30 flex items-center gap-3">
                <Image
                  src="/aether-mark.svg"
                  alt=""
                  width={34}
                  height={34}
                  className="h-8 w-8 object-contain"
                />

                <div>
                  <p className="font-mono text-[9px] font-medium tracking-[0.14em]">
                    AETHER
                  </p>

                  <p className="mt-1 font-mono text-[8px] tracking-widest text-[#0B0D10]/40">
                    EXPERIMENTAL SYSTEM
                  </p>
                </div>
              </div>

              {/* Visual Index */}
              <div className="pointer-events-none absolute right-[5%] top-[4%] z-30 rounded-full border border-white/70 bg-white/40 px-3 py-2 backdrop-blur-md">
                <span className="font-mono text-[8px] tracking-[0.14em] text-[#0B0D10]/55">
                  FIG. 01 / 3D
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information Rail */}
        <div className="relative mt-12 border-t border-[#0B0D10]/10 pt-5 md:mt-16">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {capabilities.map((item) => (
              <div
                key={item.number}
                className="hero-meta-item group flex items-center gap-3"
              >
                <span className="font-mono text-[9px] text-[#0B0D10]/35 transition-colors duration-300 group-hover:text-[#4F46FF]">
                  {item.number}
                </span>

                <span className="font-mono text-[9px] font-medium tracking-widest text-[#0B0D10]/70">
                  {item.label}
                </span>

                <span className="hidden h-px flex-1 bg-[#0B0D10]/10 md:block" />
              </div>
            ))}

            <Link
              href="#builds"
              className="hero-meta-item group hidden items-center justify-end gap-3 lg:flex"
            >
              <span className="font-mono text-[8px] tracking-[0.14em] text-[#0B0D10]/45">
                EXPLORE
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B0D10]/10 transition-colors duration-300 group-hover:border-[#4F46FF] group-hover:bg-[#4F46FF] group-hover:text-white">
                <ArrowDownRight
                  size={15}
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
