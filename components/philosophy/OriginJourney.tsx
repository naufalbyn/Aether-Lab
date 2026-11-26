
"use client";

import {
  useEffect,
  useId,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Triangle,
  Orbit,
  Sparkles,
  Search,
  Box,
  MoveUpRight,
  ArrowDown,
  ArrowDownRight,
  Plus,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import OriginMark from "@/components/philosophy/OriginMark";

import {
  philosophy,
  getBrandSymbols,
  getPhilosophyPrinciples,
} from "@/data/philosophy";

// ==========================================
// DATA
// ==========================================

const symbols = getBrandSymbols();
const principles = getPhilosophyPrinciples();

const stageColors = [
  "#817BFF",
  "#1EC1CB",
  "#C7FF3D",
];

// ==========================================
// ICON SYSTEM
// ==========================================

function JourneyIcon({
  name,
  size = 24,
}: {
  name: string;
  size?: number;
}) {
  const props = {
    size,
    strokeWidth: 1.3,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "A":
      return <Triangle {...props} />;

    case "Orbit":
      return <Orbit {...props} />;

    case "Star":
      return <Sparkles {...props} />;

    case "curiosity":
      return <Search {...props} />;

    case "creation":
      return <Box {...props} />;

    case "progress":
      return <MoveUpRight {...props} />;

    default:
      return <Plus {...props} />;
  }
}

// ==========================================
// JOURNEY TRACK
// ==========================================

function OriginJourneyTrack() {
  const desktopGradient = useId();
  const mobileGradient = useId();

  const desktopPath =
    "M120 0 L120 150 C120 220 220 230 220 300 S120 380 120 450 S20 520 20 600 S120 680 120 750 L120 900";

  const mobilePath = "M20 0 V900";

  return (
    <>
      {/* Desktop track */}

      <svg
        aria-hidden="true"
        viewBox="0 0 240 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-[22%] -translate-x-1/2 lg:block"
      >
        <defs>
          <linearGradient
            id={desktopGradient}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#817BFF"
            />

            <stop
              offset="50%"
              stopColor="#1EC1CB"
            />

            <stop
              offset="100%"
              stopColor="#C7FF3D"
            />
          </linearGradient>
        </defs>

        <path
          d={desktopPath}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.055"
          strokeWidth="10"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={desktopPath}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        <path
          data-hybrid-path
          d={desktopPath}
          fill="none"
          stroke={`url(#${desktopGradient})`}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Mobile track */}

      <svg
        aria-hidden="true"
        viewBox="0 0 40 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-10 lg:hidden"
      >
        <defs>
          <linearGradient
            id={mobileGradient}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#817BFF"
            />

            <stop
              offset="50%"
              stopColor="#1EC1CB"
            />

            <stop
              offset="100%"
              stopColor="#C7FF3D"
            />
          </linearGradient>
        </defs>

        <path
          d={mobilePath}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.12"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        <path
          data-hybrid-path
          d={mobilePath}
          fill="none"
          stroke={`url(#${mobileGradient})`}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}

// ==========================================
// PRINCIPLE VISUAL
// ==========================================

function PrincipleArtwork({
  slug,
  accent,
}: {
  slug: string;
  accent: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex aspect-square w-full max-w-56 items-center justify-center"
    >
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: `${accent}15`,
        }}
      />

      <div
        className="absolute inset-[16%] rounded-full border border-dashed"
        style={{
          borderColor: `${accent}30`,
        }}
      />

      <div
        className="absolute inset-[32%] rounded-full border"
        style={{
          borderColor: `${accent}35`,
        }}
      />

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            `radial-gradient(circle, ${accent}13, transparent 65%)`,
        }}
      />

      <div
        className="relative flex h-17 w-17 items-center justify-center rounded-2xl border"
        style={{
          color: accent,
          borderColor: `${accent}40`,
          backgroundColor: `${accent}0A`,
        }}
      >
        <JourneyIcon
          name={slug}
          size={32}
        />
      </div>

      <span
        className="absolute right-0 top-[15%] h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 15px ${accent}60`,
        }}
      />
    </div>
  );
}

// ==========================================
// ORIGIN JOURNEY
// ==========================================

export default function OriginJourney() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const originRef =
    useRef<HTMLDivElement>(null);

  const journeyRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const origin = originRef.current;
    const journey = journeyRef.current;

    if (!section || !origin || !journey) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {

          // ==================================
          // CHAPTER I / ORIGIN REVEAL
          // ==================================

          const originTimeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: origin,
              start: "top 90%",
              end: "bottom 45%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          originTimeline.fromTo(
            origin.querySelector(
              "[data-origin-guides]"
            ),
            {
              opacity: 0.2,
              scale: 0.95,
              transformOrigin: "50% 50%",
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
            },
            0
          );

          originTimeline.fromTo(
            origin.querySelector(
              "[data-origin-clip]"
            ),
            {
              attr: {
                width: 0,
              },
            },
            {
              attr: {
                width: 386,
              },
              duration: 1.4,
            },
            0
          );

          originTimeline.fromTo(
            origin.querySelector(
              "[data-origin-star]"
            ),
            {
              opacity: 0,
              scale: 0.65,
              transformOrigin: "50% 50%",
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
            },
            1.4
          );

          originTimeline.fromTo(
            origin.querySelector(
              "[data-origin-annotations]"
            ),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.4,
            },
            1.5
          );

          // ==================================
          // CHAPTER II / JOURNEY PATH
          // ==================================

          const paths =
            journey.querySelectorAll<SVGPathElement>(
              "[data-hybrid-path]"
            );

          gsap.fromTo(
            paths,
            {
              attr: {
                "stroke-dashoffset": 1,
              },
            },
            {
              attr: {
                "stroke-dashoffset": 0,
              },

              ease: "none",

              scrollTrigger: {
                trigger: journey,
                start: "top 70%",
                end: "bottom 50%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            }
          );

          // ==================================
          // MILESTONE ACTIVATION
          // ==================================

          const milestones =
            journey.querySelectorAll<HTMLElement>(
              "[data-hybrid-milestone]"
            );

          milestones.forEach((milestone) => {
            const node =
              milestone.querySelector(
                "[data-hybrid-node]"
              );

            if (!node) {
              return;
            }

            gsap.fromTo(
              node,
              {
                opacity: 0.25,
                scale: 0.7,
              },
              {
                opacity: 1,
                scale: 1,
                ease: "none",

                scrollTrigger: {
                  trigger: milestone,
                  start: "center 80%",
                  end: "center 55%",
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                },
              }
            );
          });
        }, section);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-labelledby="origin-journey-title"
      className="relative isolate overflow-hidden bg-[#0B0D10] text-white"
    >
      {/* ==================================
          CHAPTER I / THE BEGINNING
      ================================== */}

      <div className="relative isolate pb-20 pt-24 md:pb-28 md:pt-32 lg:pt-36">

        {/* Ambient lighting */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-[#4F46FF]/10 blur-[150px]" />

          <div className="absolute -right-40 bottom-0 h-100 w-100 rounded-full bg-[#1EC1CB]/5 blur-[130px]" />

          <div className="absolute inset-y-0 left-[8%] hidden w-px bg-white/2.5 lg:block" />

          <div className="absolute inset-y-0 right-[8%] hidden w-px bg-white/2.5 lg:block" />
        </div>

        <div className="aether-container">

          {/* Section header */}

          <Reveal>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6 md:pb-8">

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#C7FF3D]" />

                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                  08 / Philosophy
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-[9px] uppercase tracking-wider text-white/45 sm:block">
                  Aether / The Origin Journey
                </span>

                <Plus
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1}
                  className="text-white/40"
                />
              </div>
            </div>
          </Reveal>

          {/* Chapter heading */}

          <Reveal
            className="mt-14 md:mt-20"
            y={25}
          >
            <div className="text-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A5A2FF]">
                Chapter I / The Beginning
              </span>

              <p className="mt-5 font-display text-[clamp(1.6rem,3.3vw,3.4rem)] font-medium tracking-[-0.045em] text-white/85">
                Everything begins somewhere.
              </p>
            </div>
          </Reveal>

          {/* Official logo */}

          <div
            ref={originRef}
            className="relative mx-auto mt-5 max-w-3xl"
          >
            <OriginMark />

            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">

              <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
                Aether / Identity
              </span>

              <span className="font-mono text-[8px] uppercase tracking-wider text-white/40">
                A + Orbit + Star
              </span>
            </div>
          </div>

          {/* Compact brand symbolism */}

          <div className="mt-14 grid gap-0 border-y border-white/10 md:mt-20 md:grid-cols-3">

            {symbols.map((symbol, index) => (
              <Reveal
                key={symbol.number}
                delay={index * 0.07}
                y={20}
              >
                <article
                  className={`h-full py-7 md:px-7 md:py-9 ${
                    index !== 0
                      ? "border-t border-white/10 md:border-l md:border-t-0"
                      : "md:pl-0"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">

                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                      Symbol / {symbol.number}
                    </span>

                    <div
                      style={{
                        color:
                          index === 1
                            ? "#A5A2FF"
                            : symbol.accent,
                      }}
                    >
                      <JourneyIcon
                        name={symbol.name}
                        size={23}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-5 font-display text-[clamp(2.3rem,4vw,4.5rem)] font-medium leading-none tracking-[-0.06em]"
                    style={{
                      color:
                        index === 1
                          ? "#A5A2FF"
                          : symbol.accent,
                    }}
                  >
                    {symbol.name}
                  </div>

                  <h3 className="mt-3 font-display text-xl tracking-tight">
                    {symbol.meaning}
                  </h3>

                  <p className="mt-3 max-w-xs text-sm leading-7 text-white/60">
                    {symbol.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================
          CORE MANIFESTO
      ================================== */}

      <div className="relative isolate py-20 md:py-28">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 top-1/2 h-130 w-180 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F46FF]/[0.07] blur-[150px]" />
        </div>

        <div className="aether-container">

          <Reveal y={25}>
            <div className="text-center">

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                The Core Philosophy
              </span>

              <h2
                id="origin-journey-title"
                className="mt-8 font-display text-[clamp(2.5rem,8.4vw,9rem)] font-medium leading-[0.94] tracking-[-0.075em]"
              >
                <span className="block">
                  {philosophy.heading.first}
                </span>

                <span className="mt-3 block text-[#C7FF3D] md:mt-5">
                  {philosophy.heading.second}
                </span>
              </h2>
            </div>
          </Reveal>

          <Reveal
            className="mx-auto mt-9 max-w-xl text-center md:mt-12"
            delay={0.1}
            y={25}
          >
            <p className="text-sm leading-8 text-white/60 md:text-base md:leading-9">
              {philosophy.introduction}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ==================================
          CHAPTER II / THE JOURNEY
      ================================== */}

      <div className="relative isolate">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-48 top-0 h-120 w-120 rounded-full bg-[#4F46FF]/6 blur-[140px]" />

          <div className="absolute -right-48 top-1/3 h-120 w-120 rounded-full bg-[#1EC1CB]/5 blur-[140px]" />

          <div className="absolute -left-48 bottom-0 h-120 w-120 rounded-full bg-[#C7FF3D]/3 blur-[140px]" />
        </div>

        <div className="aether-container">

          {/* Journey header */}

          <Reveal y={20}>
            <div className="flex flex-col items-start gap-5 pb-10 lg:items-center">

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A5A2FF]">
                Chapter II / The Journey
              </span>

              <p className="font-display text-2xl tracking-tight text-white/80">
                Three principles. One direction.
              </p>

              <ArrowDown
                aria-hidden="true"
                size={22}
                strokeWidth={1.2}
                className="text-[#817BFF]"
              />
            </div>
          </Reveal>

          {/* Journey milestones */}

          <div
            ref={journeyRef}
            className="relative grid auto-rows-fr"
          >
            <OriginJourneyTrack />

            {principles.map((principle, index) => {
              const accent =
                stageColors[index];

              const isRight =
                index % 2 !== 0;

              return (
                <article
                  key={principle.slug}
                  data-hybrid-milestone
                  className="relative grid min-h-64 items-center py-8 pl-16 lg:min-h-88 lg:grid-cols-[39%_22%_39%] lg:py-12 lg:pl-0"
                >

                  {/* Milestone node */}

                  <div className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 lg:left-1/2">

                    <div
                      data-hybrid-node
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border bg-[#0B0D10] lg:h-13 lg:w-13"
                      style={{
                        borderColor: `${accent}75`,
                      }}
                    >
                      <span
                        className="absolute -inset-2 rounded-full border"
                        style={{
                          borderColor: `${accent}20`,
                        }}
                      />

                      <span
                        className="h-2 w-2 rounded-full lg:h-3 lg:w-3"
                        style={{
                          backgroundColor: accent,
                          boxShadow:
                            `0 0 20px ${accent}80`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Principle content */}

                  <Reveal
                    y={25}
                    className={
                      isRight
                        ? "lg:col-start-3 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1"
                    }
                  >
                    <div
                      className={
                        isRight
                          ? "text-left"
                          : "text-left lg:text-right"
                      }
                    >
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.16em]"
                        style={{
                          color: accent,
                        }}
                      >
                        {principle.number}
                        {" / "}
                        {principle.label}
                      </span>

                      <h3 className="mt-5 font-display text-[clamp(2rem,4vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                        {principle.title}
                      </h3>

                      <p
                        className={`mt-5 max-w-sm text-sm leading-7 text-white/60 md:text-base md:leading-8 ${
                          !isRight
                            ? "lg:ml-auto"
                            : ""
                        }`}
                      >
                        {principle.description}
                      </p>
                    </div>
                  </Reveal>

                  {/* Decorative artwork */}

                  <Reveal
                    y={20}
                    className={`hidden lg:block ${
                      isRight
                        ? "lg:col-start-1 lg:row-start-1"
                        : "lg:col-start-3 lg:row-start-1"
                    }`}
                  >
                    <PrincipleArtwork
                      slug={principle.slug}
                      accent={accent}
                    />
                  </Reveal>
                </article>
              );
            })}
          </div>

          {/* Journey destination */}

          <div className="relative flex flex-col items-start lg:items-center">

            <div
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C7FF3D]/35 bg-[#C7FF3D]/5 text-[#C7FF3D] lg:h-15 lg:w-15"
            >
              <Sparkles
                size={24}
                strokeWidth={1.25}
              />
            </div>

            <Reveal
              className="mt-6"
              y={15}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#C7FF3D]">
                Beyond the Known
              </span>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ==================================
          DARK TO LIGHT TRANSITION
      ================================== */}

      <div
        aria-hidden="true"
        className="h-32 bg-linear-to-b from-[#0B0D10] via-[#343448] to-[#F5F5F2] md:h-48"
      />

      {/* ==================================
          CHAPTER III / THE DIRECTION
      ================================== */}

      <div className="bg-[#F5F5F2] pb-24 pt-14 text-[#0B0D10] md:pb-32 md:pt-20">

        <div className="aether-container">

          <Reveal y={20}>
            <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6">

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#4F46FF]">
                Chapter III / The Direction
              </span>

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">
                The Journey Continues
              </span>
            </div>
          </Reveal>

          <Reveal
            className="mt-14 md:mt-20"
            y={35}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">

              <div className="lg:col-span-10">
                <p className="font-display text-[clamp(2.4rem,6.6vw,7rem)] font-medium leading-[0.98] tracking-[-0.065em]">
                  Direction is discovered

                  <span className="mt-2 block text-[#4F46FF]">
                    through motion.
                  </span>
                </p>
              </div>

              <div
                aria-hidden="true"
                className="hidden items-end justify-end lg:col-span-2 lg:flex"
              >
                <ArrowDownRight
                  size={64}
                  strokeWidth={0.8}
                  className="text-[#4F46FF]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            className="mt-10 md:mt-14"
            y={25}
            delay={0.08}
          >
            <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-12 md:gap-6">

              <div className="md:col-span-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-black/50">
                  Aether / Direction
                </span>
              </div>

              <p className="max-w-xl text-base leading-8 text-black/60 md:col-span-7 md:col-start-5 md:text-lg">
                {philosophy.closing}
              </p>
            </div>
          </Reveal>

          {/* Footer */}

          <Reveal
            className="mt-16 md:mt-24"
            y={15}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">
                Identity / Exploration / Direction
              </span>

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">
                Aether / {philosophy.identity}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
