"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Plus,
} from "lucide-react";

const capabilities = ["SOFTWARE", "WEB3", "AI", "EXPERIMENTS"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const orbitReverseRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    const orbit = orbitRef.current;
    const orbitReverse = orbitReverseRef.current;
    const satellite = satelliteRef.current;
    const content = contentRef.current;
    const meta = metaRef.current;

    if (
      !hero ||
      !visual ||
      !orbit ||
      !orbitReverse ||
      !satellite ||
      !content ||
      !meta
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          content.querySelectorAll(".hero-eyebrow"),
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }
        )
        .fromTo(
          content.querySelectorAll(".hero-title-line"),
          {
            opacity: 0,
            y: 80,
            rotateX: 10,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.09,
          },
          "-=0.45"
        )
        .fromTo(
          content.querySelectorAll(".hero-description"),
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .fromTo(
          content.querySelectorAll(".hero-actions"),
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .fromTo(
          meta.querySelectorAll(".hero-meta-item"),
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.4"
        )
        .fromTo(
          visual,
          {
            opacity: 0,
            scale: 0.72,
            rotate: -8,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=1.1"
        )
        .fromTo(
          satellite,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.6"
        );

      gsap.to(orbit, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(orbitReverse, {
        rotate: -360,
        duration: 42,
        repeat: -1,
        ease: "none",
      });

      gsap.to(satellite, {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const handleMouseMove = (event: MouseEvent) => {
        const rect = hero.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(visual, {
          x: x * 28,
          y: y * 22,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(content, {
          x: x * -5,
          y: y * -3,
          duration: 1.4,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(visual, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(content, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      };

      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#F5F5F2]"
    >
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="aether-container h-full">
          <div className="aether-grid h-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className="absolute inset-[3%] rounded-full border border-dashed border-[#0B0D10]/5.5"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ambient Technical Lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-[27%] h-px w-[22vw] bg-[#0B0D10]/10" />

        <div className="absolute right-0 top-[37%] h-px w-[17vw] bg-[#0B0D10]/10" />

        <div className="absolute bottom-[22%] left-[7%] h-px w-[11vw] bg-[#0B0D10]/10" />

        <div className="absolute bottom-[17%] right-[8%] h-px w-[15vw] bg-[#0B0D10]/10" />

        <div className="absolute left-[6%] top-[20%] font-mono text-[8px] tracking-[0.2em] text-[#0B0D10]/30">
          AETHER / 01
        </div>

        <div className="absolute right-[6%] top-[20%] flex items-center gap-2 font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/30">
          <span>EST. 2026</span>
          <span className="h-1 w-1 rounded-full bg-[#C7FF3D]" />
          <span>IND</span>
        </div>

        <div className="absolute bottom-[27%] left-[6%] font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/25">
          04°04&apos; / 103°37&apos;
        </div>
      </div>

      {/* Main Content */}
      <div className="aether-container relative z-10 flex min-h-screen flex-col justify-between pb-8 pt-32 md:pb-10 md:pt-36">
        <div className="grid flex-1 grid-cols-4 items-center gap-x-4 md:grid-cols-12 md:gap-x-6">
          {/* Main Copy */}
          <div
            ref={contentRef}
            className="relative z-20 col-span-4 self-center md:col-span-9"
          >
            <div className="hero-eyebrow mb-7 flex items-center gap-3 md:mb-9">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#C7FF3D]/60" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />
              </span>

              <span className="font-mono text-[9px] font-medium tracking-[0.2em] text-[#0B0D10]/65 md:text-[10px]">
                INDEPENDENT TECHNOLOGY STUDIO
              </span>

              <span className="hidden h-px w-20 bg-[#0B0D10]/15 sm:block" />
            </div>

            <h1 className="font-display max-w-245 perspective-[1000px] text-[clamp(3.7rem,9.5vw,9.5rem)] font-medium leading-[0.82] tracking-[-0.068em] text-[#0B0D10]">
              <span className="hero-title-line block">WE BUILD</span>

              <span className="hero-title-line block">
                DIGITAL
                <span className="relative text-[#4F46FF]">
                  .
                  <span className="absolute -right-3 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#4F46FF] md:block" />
                </span>
              </span>

              <span className="hero-title-line block">
                SYSTEMS
                <span className="text-[#C7FF3D]">.</span>
              </span>
            </h1>

            <div className="mt-9 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:gap-12">
              <p className="hero-description max-w-97.5 text-sm leading-6 text-[#0B0D10]/60 md:text-[15px] md:leading-7">
                Aether Lab is an independent technology studio exploring
                software, Web3, AI, and experimental digital systems.
              </p>

              <div className="hero-actions flex flex-wrap items-center gap-3">
                <Link
                  href="#builds"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#0B0D10] px-5 py-3.5 font-mono text-[9px] font-medium tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#4F46FF]"
                >
                  EXPLORE BUILDS

                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  href="#about"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#0B0D10]/15 bg-[#F5F5F2]/40 px-5 py-3.5 font-mono text-[9px] font-medium tracking-[0.16em] text-[#0B0D10]/75 transition-all duration-300 hover:border-[#0B0D10]/30 hover:bg-white"
                >
                  ABOUT AETHER

                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Aether Orbital System */}
          <div
            ref={visualRef}
            className="pointer-events-none absolute right-[-10%] top-1/2 z-10 hidden -translate-y-1/2 md:block"
          >
            <div className="relative flex h-135 w-135 items-center justify-center lg:h-155 lg:w-155">
              {/* Ambient Glow */}
              <div className="absolute h-[55%] w-[55%] rounded-full bg-[#4F46FF]/5.5 blur-[90px]" />

              {/* Outer Dashed Orbit */}
              <div
                ref={orbitRef}
                className="absolute inset-[3%] rounded-full border border-dashed border-[#0B0D10]/10"
              >
                <span className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-[#4F46FF] shadow-[0_0_20px_rgba(79,70,255,0.35)]" />

                <span className="absolute bottom-[9%] left-[7%] h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />
              </div>

              {/* Main Orbit */}
              <div className="absolute inset-[13%] rounded-full border border-[#0B0D10]/10" />

              {/* Reverse Orbit */}
              <div
                ref={orbitReverseRef}
                className="absolute inset-[24%] rounded-full border border-dashed border-[#4F46FF]/15"
              >
                <span className="absolute right-[13%] top-[9%] h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />
              </div>

              {/* Inner Orbit */}
              <div className="absolute inset-[36%] rounded-full border border-[#0B0D10]/6" />

              {/* Crosshair */}
              <div className="absolute h-px w-[86%] bg-[#0B0D10]/5.5" />

              <div className="absolute h-[86%] w-px bg-[#0B0D10]/5.5" />

              {/* Corner Markers */}
              <div className="absolute left-[17%] top-[17%]">
                <Plus
                  size={12}
                  strokeWidth={1}
                  className="text-[#0B0D10]/25"
                />
              </div>

              <div className="absolute right-[17%] bottom-[17%]">
                <Plus
                  size={12}
                  strokeWidth={1}
                  className="text-[#0B0D10]/25"
                />
              </div>

              {/* Central Logo */}
              <div className="relative z-10 flex h-[45%] w-[45%] items-center justify-center">
                <div className="absolute inset-[5%] rounded-full bg-white/35 blur-2xl" />

                <Image
                  src="/aether-mark.svg"
                  alt="Aether Lab"
                  width={380}
                  height={380}
                  className="relative h-full w-full object-contain"
                />
              </div>

              {/* Floating Technical Satellite */}
              <div
                ref={satelliteRef}
                className="absolute right-[8%] top-[27%] flex items-center gap-2"
              >
                <span className="font-mono text-[8px] tracking-[0.16em] text-[#0B0D10]/35">
                  NODE 01
                </span>

                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#0B0D10]/10 bg-[#F5F5F2]/80">
                  <Circle
                    size={5}
                    fill="currentColor"
                    strokeWidth={0}
                    className="text-[#4F46FF]"
                  />
                </span>
              </div>

              {/* Technical Labels */}
              <div className="absolute left-[9%] top-[31%] font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/30">
                04.04
              </div>

              <div className="absolute bottom-[23%] left-[12%] font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/30">
                BUILD / 087
              </div>

              <div className="absolute right-[10%] bottom-[29%] font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/30">
                AETHER-01
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Capability Rail */}
        <div
          ref={metaRef}
          className="mt-14 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[#0B0D10]/10 pt-5 sm:grid-cols-4 md:mt-10"
        >
          {capabilities.map((item, index) => (
            <div
              key={item}
              className="hero-meta-item group flex items-center gap-3"
            >
              <span className="font-mono text-[8px] tracking-[0.14em] text-[#0B0D10]/30 transition-colors duration-300 group-hover:text-[#4F46FF]">
                0{index + 1}
              </span>

              <span className="font-mono text-[9px] font-medium tracking-[0.16em] text-[#0B0D10]/65">
                {item}
              </span>

              <span className="hidden h-px flex-1 bg-[#0B0D10]/8 sm:block" />
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-9 right-0 hidden items-center gap-3 md:flex">
          <span className="font-mono text-[8px] font-medium tracking-[0.18em] text-[#0B0D10]/40">
            SCROLL TO EXPLORE
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0B0D10]/10 bg-[#F5F5F2]/50">
            <ArrowDownRight
              size={13}
              strokeWidth={1.5}
              className="text-[#0B0D10]/55"
            />
          </span>
        </div>
      </div>
    </section>
  );
}