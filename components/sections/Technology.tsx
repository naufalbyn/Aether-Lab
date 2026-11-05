"use client";

import { useState } from "react";
import {
  Blocks,
  Bot,
  Braces,
  Database,
  Globe,
  Layers3,
  Network,
  Server,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const technologies = [
  {
    name: "React",
    type: "Frontend",
    icon: Braces,
    accent: "#4F46FF",
  },
  {
    name: "Next.js",
    type: "Framework",
    icon: Layers3,
    accent: "#0B0D10",
  },
  {
    name: "Node.js",
    type: "Backend",
    icon: Server,
    accent: "#C7FF3D",
  },
  {
    name: "TypeScript",
    type: "Language",
    icon: Braces,
    accent: "#4F46FF",
  },
  {
    name: "Solana",
    type: "Blockchain",
    icon: Network,
    accent: "#C7FF3D",
  },
  {
    name: "Ethereum",
    type: "Blockchain",
    icon: Blocks,
    accent: "#8B5CF6",
  },
  {
    name: "Solidity",
    type: "Smart Contracts",
    icon: Globe,
    accent: "#FF8A3D",
  },
  {
    name: "Rust",
    type: "Systems",
    icon: Network,
    accent: "#FF8A3D",
  },
  {
    name: "PostgreSQL",
    type: "Database",
    icon: Database,
    accent: "#4F46FF",
  },
  {
    name: "AI",
    type: "Intelligence",
    icon: Bot,
    accent: "#C7FF3D",
  },
];

export default function Technology() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTechnology = technologies[activeIndex];

  return (
    <section
      id="technology"
      className="relative overflow-hidden bg-aether-cloud py-32 md:py-44"
    >
      {/* Ambient Technical System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 top-[52%] hidden h-140 w-140 -translate-y-1/2 rounded-full border border-black/5 md:block"
      >
        <div className="absolute inset-[15%] rounded-full border border-black/3" />

        <div className="absolute inset-[31%] rounded-full border border-black/2" />

        <div className="absolute inset-[48%] rounded-full border border-black/2" />

        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[17%] right-[16%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-0 top-[24%] h-px w-[14vw] bg-black/5" />

        <div className="absolute right-0 top-[72%] h-px w-[14vw] bg-black/5" />

        <div className="absolute left-[6%] top-[12%] font-mono text-[8px] tracking-[0.2em] text-black/15">
          AETHER / 06
        </div>

        <div className="absolute bottom-[10%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-black/15">
          SYSTEM / TECHNOLOGY
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="border-b border-black/10 pb-6 md:pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-blue/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-aether-blue" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40">
                  06 / Technology
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-black/25 md:block">
                Tools behind the systems
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
              <h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[0.84] tracking-[-0.07em] md:col-span-8">
                The tools
                <br />
                <span className="text-black/25">behind the build.</span>
              </h2>

              <div className="md:col-span-4 md:pb-2">
                <p className="max-w-sm text-sm leading-7 text-black/45">
                  Technologies are selected around the problem, product, and
                  system being built, not the other way around.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Main Technical System */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
          {/* System Core */}
          <Reveal className="md:col-span-4" y={35}>
            <div className="relative min-h-110 overflow-hidden border border-black/10 bg-aether-black p-6 text-white md:min-h-145">
              {/* Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[42px_42px]" />

                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/5" />

                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/5" />
              </div>

              {/* Orbital Core */}
              <div className="absolute left-1/2 top-1/2 h-70 w-70 -translate-x-1/2 -translate-y-1/2 md:h-85 md:w-85">
                <div className="absolute inset-0 rounded-full border border-white/8" />

                <div className="absolute inset-[14%] rounded-full border border-white/6" />

                <div className="absolute inset-[30%] rounded-full border border-white/5" />

                <div className="absolute inset-[43%] rotate-45 border border-white/7" />

                <div
                  className="absolute left-1/2 top-0 h-full w-px origin-center bg-white/5"
                  style={{
                    transform: "rotate(27deg)",
                  }}
                />

                <div
                  className="absolute left-1/2 top-0 h-full w-px origin-center bg-white/5"
                  style={{
                    transform: "rotate(-27deg)",
                  }}
                />

                <span
                  className="absolute left-[13%] top-[25%] h-2.5 w-2.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: activeTechnology.accent,
                    boxShadow: `0 0 28px ${activeTechnology.accent}88`,
                  }}
                />

                <span className="absolute bottom-[17%] right-[13%] h-2 w-2 rounded-full bg-aether-lime shadow-[0_0_24px_rgba(199,255,61,0.55)]" />

                <span className="absolute right-[19%] top-[16%] h-1.5 w-1.5 rounded-full bg-aether-blue shadow-[0_0_20px_rgba(79,70,255,0.55)]" />

                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.035] backdrop-blur-sm">
                  <div
                    className="h-3.5 w-3.5 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: activeTechnology.accent,
                      boxShadow: `0 0 25px ${activeTechnology.accent}99`,
                    }}
                  />
                </div>
              </div>

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Technical System
                </span>

                <span className="font-mono text-[8px] tracking-[0.14em] text-white/20">
                  AETHER / 006
                </span>
              </div>

              {/* Active Node */}
              <div className="absolute bottom-6 left-6 right-6 z-10 border-t border-white/10 pt-5">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
                      Active Node
                    </div>

                    <div className="mt-2 font-display text-2xl font-medium tracking-[-0.04em]">
                      {activeTechnology.name}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
                      Category
                    </div>

                    <div
                      className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em]"
                      style={{
                        color: activeTechnology.accent,
                      }}
                    >
                      {activeTechnology.type}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Technology Nodes */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 border-l border-t border-black/10 md:grid-cols-3">
              {technologies.map((technology, index) => {
                const Icon = technology.icon;
                const isActive = activeIndex === index;

                return (
                  <Reveal
                    key={technology.name}
                    delay={index * 0.05}
                    y={30}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group relative flex min-h-44 w-full flex-col justify-between border-b border-r border-black/10 p-5 text-left outline-none transition-colors duration-300 hover:bg-white focus:bg-white md:min-h-48 md:p-6"
                    >
                      {/* Top Meta */}
                      <div className="flex items-start justify-between">
                        <span
                          className={`font-mono text-[8px] tracking-[0.14em] transition-colors duration-300 ${
                            isActive ? "text-black/50" : "text-black/20"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div
                          className="flex h-8 w-8 items-center justify-center border transition-all duration-300"
                          style={{
                            borderColor: isActive
                              ? `${technology.accent}55`
                              : "rgba(11, 13, 16, 0.10)",
                            backgroundColor: isActive
                              ? `${technology.accent}0D`
                              : "transparent",
                            transform: isActive
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          }}
                        >
                          <Icon
                            size={14}
                            strokeWidth={1.4}
                            className="transition-colors duration-300"
                            style={{
                              color: isActive
                                ? technology.accent
                                : "rgba(11, 13, 16, 0.45)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Node Information */}
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <span
                            className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                            style={{
                              backgroundColor: technology.accent,
                              transform: isActive
                                ? "scale(1.5)"
                                : "scale(1)",
                            }}
                          />

                          <span
                            className={`font-mono text-[7px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                              isActive ? "text-black/45" : "text-black/25"
                            }`}
                          >
                            {technology.type}
                          </span>
                        </div>

                        <h3
                          className={`font-display text-xl font-medium tracking-[-0.035em] transition-colors duration-300 md:text-2xl ${
                            isActive ? "text-black" : "text-black/70"
                          }`}
                        >
                          {technology.name}
                        </h3>
                      </div>

                      {/* Active Line */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px origin-left transition-all duration-500"
                        style={{
                          width: isActive ? "100%" : "0%",
                          backgroundColor: technology.accent,
                        }}
                      />
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* Footer Meta */}
            <Reveal
              className="mt-6"
              delay={0.2}
              y={20}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/25">
                  Technologies / Tools / Infrastructure
                </span>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/20">
                    10 Nodes
                  </span>

                  <span className="h-px w-8 bg-black/10" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/20">
                    Active System
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Statement */}
        <Reveal
          className="mt-20 md:mt-28"
          delay={0.25}
          y={30}
        >
          <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/25">
                System Principle
              </span>
            </div>

            <div className="md:col-span-7">
              <p className="font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-medium leading-[0.95] tracking-tighter">
                The stack follows the problem.
                <span className="text-black/25">
                  {" "}
                  The system follows the idea.
                </span>
              </p>
            </div>

            <div className="flex items-end md:col-span-2 md:justify-end">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/20">
                AETHER / 2026
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}