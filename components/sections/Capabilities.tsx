
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  Bot,
  Blocks,
  Code2,
  FlaskConical,
  Plus,
  ArrowRight,
} from "lucide-react";

import AmbientBackground from "@/components/effects/AmbientBackground";
import Magnetic from "@/components/effects/Magnetic";
import GlassPanel from "@/components/ui/GlassPanel";

const capabilities = [
  {
    number: "01",
    title: "Software",
    category: "Software Development",
    headline: "Ideas into working systems.",
    description:
      "Web applications, digital products, and technical systems built around real problems.",
    technologies: [
      "Web Applications",
      "Digital Products",
      "Backend Systems",
      "API Integration",
    ],
    icon: Code2,
    accent: "#4F46FF",
    surface: "#161432",
    gradient:
      "linear-gradient(135deg, #0B0D10 0%, #161432 55%, #30248A 100%)",
    label: "SOFTWARE / SYSTEMS",
  },
  {
    number: "02",
    title: "Web3",
    category: "Blockchain Development",
    headline: "Beyond traditional systems.",
    description:
      "Exploring blockchain products, on-chain systems, smart contracts, and decentralized experiences.",
    technologies: [
      "Smart Contracts",
      "On-Chain Applications",
      "Blockchain Protocols",
      "Decentralized Systems",
    ],
    icon: Blocks,
    accent: "#C7FF3D",
    surface: "#1B2512",
    gradient:
      "linear-gradient(135deg, #0B0D10 0%, #1B2512 55%, #354C18 100%)",
    label: "WEB3 / PROTOCOLS",
  },
  {
    number: "03",
    title: "AI & Automation",
    category: "Intelligent Systems",
    headline: "Make software more capable.",
    description:
      "AI-powered workflows, developer tools, and automation designed to simplify complex digital processes.",
    technologies: [
      "AI Integration",
      "Workflow Automation",
      "Developer Tools",
      "Intelligent Applications",
    ],
    icon: Bot,
    accent: "#8B5CF6",
    surface: "#251637",
    gradient:
      "linear-gradient(135deg, #0B0D10 0%, #251637 55%, #4C2473 100%)",
    label: "AI / AUTOMATION",
  },
  {
    number: "04",
    title: "Experiments",
    category: "Experimental Technology",
    headline: "Explore what comes next.",
    description:
      "Prototypes, unfinished ideas, and technical explorations built to understand what technology can become.",
    technologies: [
      "Rapid Prototyping",
      "Experimental Interfaces",
      "Technical Research",
      "Emerging Technology",
    ],
    icon: FlaskConical,
    accent: "#F97316",
    surface: "#321C12",
    gradient:
      "linear-gradient(135deg, #0B0D10 0%, #321C12 55%, #713817 100%)",
    label: "R&D / EXPLORATION",
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prefersReducedMotion = useReducedMotion();

  const activeCapability = capabilities[activeIndex];

  const ActiveIcon = activeCapability.icon;

  const handleNext = () => {
    setActiveIndex(
      (current) => (current + 1) % capabilities.length
    );
  };

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] py-24 text-[#0B0D10] md:py-36 lg:py-40"
    >
      <AmbientBackground
        variant="light"
        intensity={0.6}
        animated
        grid
        className="-z-10"
      />

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div
          data-motion="fade"
          className="flex items-center justify-between border-b border-black/10 pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#4F46FF]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/55">
              03 / Capabilities
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
              What We Build
            </span>

            <Plus
              size={16}
              strokeWidth={1}
              className="text-black/40"
            />
          </div>
        </div>

        {/* Editorial Heading */}
        <div className="grid gap-8 pb-14 pt-14 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-20">
          <div
            data-motion="up"
            className="lg:col-span-8"
          >
            <h2
              id="capabilities-title"
              className="font-display text-[clamp(2.8rem,6.5vw,7rem)] font-medium leading-[0.95] tracking-[-0.065em]"
            >
              Built around
              <br />

              <span className="text-[#4F46FF]">
                possibility.
              </span>
            </h2>
          </div>

          <div
            data-motion="up"
            data-motion-delay="0.12"
            className="lg:col-span-4"
          >
            <p className="max-w-sm text-base leading-8 text-black/60">
              Four directions. One independent studio.
              Exploring technology through ideas,
              working systems, and continuous experimentation.
            </p>
          </div>
        </div>

        {/* Interactive Capability Explorer */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Capability Selector */}
          <div
            data-motion="up"
            className="lg:col-span-5"
          >
            <div className="border-t border-black/15">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;

                const isActive = activeIndex === index;

                return (
                  <button
                    key={capability.number}
                    type="button"
                    aria-pressed={isActive}
                    aria-controls="capability-showcase"
                    onClick={() => setActiveIndex(index)}
                    className={[
                      "group relative w-full overflow-hidden border-b border-black/15 px-3 py-6 text-left",
                      "transition-colors duration-300",
                      "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#4F46FF]",
                      isActive
                        ? "bg-white/80"
                        : "hover:bg-white/50",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0.75 transition-opacity duration-300"
                      style={{
                        backgroundColor: capability.accent,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    <div className="flex items-center gap-4 sm:gap-5">
                      <span className="font-mono text-[10px] tracking-[0.12em] text-black/45">
                        {capability.number}
                      </span>

                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 sm:h-14 sm:w-14"
                        style={{
                          borderColor: isActive
                            ? capability.accent
                            : "rgba(11,13,16,0.10)",
                          backgroundColor: isActive
                            ? capability.surface
                            : "transparent",
                        }}
                      >
                        <Icon
                          size={22}
                          strokeWidth={1.5}
                          style={{
                            color: isActive
                              ? capability.accent
                              : "#6B6B70",
                          }}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-medium leading-tight tracking-[-0.04em]">
                          {capability.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-black/50">
                          {capability.category}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={21}
                        strokeWidth={1.5}
                        className={[
                          "shrink-0 transition-transform duration-300",
                          isActive
                            ? "text-black motion-safe:-translate-y-0.5 motion-safe:translate-x-0.5"
                            : "text-black/30",
                        ].join(" ")}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selector Footer */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/45">
                Select a capability
              </span>

              <span className="font-mono text-[10px] tracking-[0.12em] text-black/45">
                {activeCapability.number} / 04
              </span>
            </div>
          </div>

          {/* Dynamic Visual Showcase */}
          <div
            id="capability-showcase"
            data-motion="up"
            data-motion-delay="0.15"
            className="min-w-0 lg:col-span-7"
          >
            <div
              className="relative isolate flex min-h-140 flex-col overflow-hidden rounded-3xl border border-black/10 p-5 text-white sm:p-8 lg:min-h-150"
              style={{
                background: activeCapability.gradient,
              }}
            >
              {/* Technical Grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-15"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 -z-10 h-96 w-96 rounded-full opacity-20 blur-[100px]"
                style={{
                  backgroundColor: activeCapability.accent,
                }}
              />

              {/* Showcase Header */}
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: activeCapability.accent,
                    }}
                  />

                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">
                    Capability / {activeCapability.number}
                  </span>
                </div>

                <Plus
                  size={18}
                  strokeWidth={1}
                  className="shrink-0 text-white/40"
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeCapability.number}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 12 }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: prefersReducedMotion ? 0 : -8,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                  className="relative flex flex-1 flex-col"
                >
                  {/* Orbital Illustration */}
                  <div
                    aria-hidden="true"
                    className="relative mx-auto flex h-57.5 w-full max-w-90 items-center justify-center sm:h-70"
                  >
                    <div className="absolute left-1/2 top-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute inset-0 rounded-full border border-white/10" />

                      <div className="absolute inset-[12%] rounded-full border border-white/15" />

                      <div
                        className="absolute inset-[25%] rounded-full border"
                        style={{
                          borderColor: `${activeCapability.accent}55`,
                        }}
                      />

                      <div className="absolute inset-[10%] rotate-45 scale-y-[0.45] rounded-full border border-white/20" />

                      <div
                        className="absolute inset-[10%] -rotate-45 scale-y-[0.45] rounded-full border"
                        style={{
                          borderColor: `${activeCapability.accent}55`,
                        }}
                      />

                      <motion.div
                        animate={{
                          rotate: prefersReducedMotion ? 0 : 360,
                        }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 24,
                          repeat: prefersReducedMotion ? 0 : Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-[12%]"
                      >
                        <span
                          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            backgroundColor: activeCapability.accent,
                            boxShadow: `0 0 20px ${activeCapability.accent}`,
                          }}
                        />
                      </motion.div>

                      <div
                        className="absolute inset-[32%] rounded-full blur-2xl"
                        style={{
                          backgroundColor: `${activeCapability.accent}30`,
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="flex h-24 w-24 items-center justify-center rounded-3xl border bg-white/5 backdrop-blur-md sm:h-28 sm:w-28"
                          style={{
                            borderColor: `${activeCapability.accent}70`,
                            boxShadow: `0 0 40px ${activeCapability.accent}20`,
                          }}
                        >
                          <ActiveIcon
                            size={48}
                            strokeWidth={1.2}
                            style={{
                              color: activeCapability.accent,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information Panel */}
                  <GlassPanel
                    variant="dark"
                    radius="xl"
                    padding="md"
                    className="mt-auto"
                  >
                    <div
                      className="font-mono text-[9px] uppercase tracking-[0.16em]"
                      style={{
                        color: activeCapability.accent,
                      }}
                    >
                      {activeCapability.label}
                    </div>

                    <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tighter sm:text-4xl">
                      {activeCapability.headline}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                      {activeCapability.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeCapability.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] text-white/70"
                          >
                            {technology}
                          </span>
                        )
                      )}
                    </div>
                  </GlassPanel>
                </motion.div>
              </AnimatePresence>

              {/* Showcase Navigation */}
              <div className="relative z-10 mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {capabilities.map((capability, index) => (
                    <span
                      key={capability.number}
                      aria-hidden="true"
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: activeIndex === index ? 28 : 8,
                        backgroundColor:
                          activeIndex === index
                            ? activeCapability.accent
                            : "rgba(255,255,255,0.20)",
                      }}
                    />
                  ))}
                </div>

                <Magnetic
                  strength={0.15}
                  maxDistance={8}
                >
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Show next capability"
                    className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-xs text-white transition-colors duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Next Capability

                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                    />
                  </button>
                </Magnetic>
              </div>
            </div>

            <p
              role="status"
              className="sr-only"
            >
              Showing {activeCapability.category}
            </p>
          </div>
        </div>

        {/* Bottom Signature */}
        <div
          data-motion="fade"
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
            Aether Lab / Capability System
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
            Explore / Build / Evolve
          </span>
        </div>
      </div>
    </section>
  );
}
