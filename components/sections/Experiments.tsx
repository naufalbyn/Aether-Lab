"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Cpu,
  FlaskConical,
  Terminal,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const experiments = [
  {
    number: "01",
    title: "AI x Developer Tools",
    category: "AI / TOOLING",
    description:
      "Exploring how AI can become part of the development workflow, from structured prompts and technical exploration to developer-facing tools.",
    icon: Bot,
    accent: "#4F46FF",
    status: "EXPLORING",
    system: "AI / DEVTOOLS",
  },
  {
    number: "02",
    title: "On-Chain Systems",
    category: "BLOCKCHAIN / PROTOCOL",
    description:
      "Experiments around blockchain primitives, wallet interactions, transaction flows, smart contracts, and systems where on-chain logic actually matters.",
    icon: Boxes,
    accent: "#C7FF3D",
    status: "ACTIVE",
    system: "WEB3 / ON-CHAIN",
  },
  {
    number: "03",
    title: "Digital Automation",
    category: "AUTOMATION / SYSTEMS",
    description:
      "Exploring how software can connect services, automate repetitive workflows, and turn fragmented processes into a single system.",
    icon: Cpu,
    accent: "#8B5CF6",
    status: "EXPLORING",
    system: "AUTOMATION / API",
  },
  {
    number: "04",
    title: "Experimental Interfaces",
    category: "UI / INTERACTION",
    description:
      "Prototypes focused on interaction, motion, interface systems, and unusual ways of making digital products feel more alive.",
    icon: FlaskConical,
    accent: "#F97316",
    status: "R&D",
    system: "UI / MOTION",
  },
];

export default function Experiments() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExperiment = experiments[activeIndex];

  return (
    <section
      id="experiments"
      className="relative overflow-hidden bg-aether-cloud py-32 md:py-44"
    >
      {/* Ambient Orbital System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-72 top-1/2 hidden h-160 w-160 -translate-y-1/2 rounded-full border border-black/5 md:block"
      >
        <div className="absolute inset-[16%] rounded-full border border-black/3" />

        <div className="absolute inset-[32%] rounded-full border border-black/2" />

        <div className="absolute inset-[49%] rounded-full border border-black/2" />

        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[17%] left-[16%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-0 top-[20%] h-px w-[15vw] bg-black/5" />

        <div className="absolute right-0 top-[76%] h-px w-[13vw] bg-black/5" />

        <div className="absolute left-[6%] top-[11%] font-mono text-[8px] tracking-[0.2em] text-black/15">
          AETHER / 07
        </div>

        <div className="absolute bottom-[10%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-black/15">
          SYSTEM / EXPERIMENTS
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
                  07 / Experiments
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-black/25 md:block">
                Research / prototypes / unfinished ideas
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
              <h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[0.84] tracking-[-0.07em] md:col-span-8">
                Still
                <br />
                <span className="text-black/25">exploring.</span>
              </h2>

              <div className="md:col-span-4 md:pb-2">
                <p className="max-w-sm text-sm leading-7 text-black/45">
                  Not every idea needs to become a product. Some need to be
                  tested, broken, rebuilt, and understood first.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Experiment System */}
        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-6">
          {/* Active Experiment */}
          <Reveal className="md:col-span-4" y={35}>
            <div className="relative min-h-110 overflow-hidden bg-aether-black p-6 text-white md:min-h-145">
              {/* Technical Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[42px_42px]" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white/5" />
              </div>

              {/* Experimental Core */}
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 md:h-78 md:w-78">
                <div className="absolute inset-0 rounded-full border border-white/8" />

                <div className="absolute inset-[15%] rounded-full border border-white/6" />

                <div className="absolute inset-[31%] rounded-full border border-white/5" />

                <div className="absolute inset-[44%] rotate-45 border border-white/8" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white/5" />

                <span
                  className="absolute left-[14%] top-[28%] h-2.5 w-2.5 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: activeExperiment.accent,
                    boxShadow: `0 0 28px ${activeExperiment.accent}88`,
                  }}
                />

                <span className="absolute bottom-[16%] right-[15%] h-2 w-2 rounded-full bg-aether-lime shadow-[0_0_24px_rgba(199,255,61,0.5)]" />

                <span className="absolute right-[18%] top-[17%] h-1.5 w-1.5 rounded-full bg-aether-blue shadow-[0_0_20px_rgba(79,70,255,0.5)]" />

                <div className="absolute left-1/2 top-1/2 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.035]">
                  <div
                    className="h-4 w-4 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: activeExperiment.accent,
                      boxShadow: `0 0 28px ${activeExperiment.accent}99`,
                    }}
                  />
                </div>
              </div>

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Experimental System
                </span>

                <Terminal
                  size={13}
                  strokeWidth={1.3}
                  className="text-white/25"
                />
              </div>

              {/* Active Node */}
              <div className="absolute bottom-6 left-6 right-6 z-10 border-t border-white/10 pt-5">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
                      Active Experiment
                    </div>

                    <div className="mt-2 font-display text-2xl font-medium tracking-[-0.04em]">
                      {activeExperiment.system}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/25">
                      Status
                    </div>

                    <div
                      className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em]"
                      style={{
                        color: activeExperiment.accent,
                      }}
                    >
                      {activeExperiment.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Experiment Nodes */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 border-l border-t border-black/10 md:grid-cols-2">
              {experiments.map((experiment, index) => {
                const Icon = experiment.icon;
                const isActive = activeIndex === index;

                return (
                  <Reveal
                    key={experiment.number}
                    delay={index * 0.07}
                    y={30}
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group relative flex min-h-64 w-full flex-col justify-between border-b border-r border-black/10 p-6 text-left outline-none transition-colors duration-300 hover:bg-white focus:bg-white md:min-h-72 md:p-7"
                    >
                      {/* Top Meta */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-[8px] tracking-[0.14em] transition-colors duration-300 ${
                              isActive ? "text-black/55" : "text-black/20"
                            }`}
                          >
                            {experiment.number}
                          </span>

                          <span
                            className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
                            style={{
                              backgroundColor: experiment.accent,
                              transform: isActive
                                ? "scale(1.5)"
                                : "scale(1)",
                            }}
                          />
                        </div>

                        <div
                          className="flex h-9 w-9 items-center justify-center border transition-all duration-300"
                          style={{
                            borderColor: isActive
                              ? `${experiment.accent}55`
                              : "rgba(11, 13, 16, 0.10)",
                            backgroundColor: isActive
                              ? `${experiment.accent}0D`
                              : "transparent",
                            transform: isActive
                              ? "translateY(-2px)"
                              : "translateY(0)",
                          }}
                        >
                          <Icon
                            size={15}
                            strokeWidth={1.35}
                            className="transition-colors duration-300"
                            style={{
                              color: isActive
                                ? experiment.accent
                                : "rgba(11, 13, 16, 0.45)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-10">
                        <div className="mb-3 flex items-center gap-3">
                          <span
                            className={`font-mono text-[7px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                              isActive ? "text-black/45" : "text-black/25"
                            }`}
                          >
                            {experiment.category}
                          </span>

                          <span className="h-px w-5 bg-black/10" />

                          <span
                            className="font-mono text-[7px] uppercase tracking-[0.16em] transition-colors duration-300"
                            style={{
                              color: isActive
                                ? experiment.accent
                                : "rgba(11, 13, 16, 0.25)",
                            }}
                          >
                            {experiment.status}
                          </span>
                        </div>

                        <h3
                          className={`max-w-sm font-display text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[0.95] tracking-tighter transition-colors duration-300 ${
                            isActive ? "text-black" : "text-black/70"
                          }`}
                        >
                          {experiment.title}
                        </h3>

                        <p
                          className={`mt-5 max-w-md text-sm leading-6 transition-colors duration-300 ${
                            isActive ? "text-black/55" : "text-black/35"
                          }`}
                        >
                          {experiment.description}
                        </p>
                      </div>

                      {/* Bottom Interaction */}
                      <div className="mt-8 flex items-center justify-between">
                        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-black/20">
                          Explore / Iterate
                        </span>

                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
                          style={{
                            borderColor: isActive
                              ? `${experiment.accent}55`
                              : "rgba(11, 13, 16, 0.10)",
                            backgroundColor: isActive
                              ? `${experiment.accent}0D`
                              : "transparent",
                            transform: isActive
                              ? "translate(2px, -2px)"
                              : "translate(0, 0)",
                          }}
                        >
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.35}
                            style={{
                              color: isActive
                                ? experiment.accent
                                : "rgba(11, 13, 16, 0.40)",
                            }}
                          />
                        </div>
                      </div>

                      {/* Active Line */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px origin-left transition-all duration-500"
                        style={{
                          width: isActive ? "100%" : "0%",
                          backgroundColor: experiment.accent,
                        }}
                      />
                    </button>
                  </Reveal>
                );
              })}
            </div>

            {/* System Footer */}
            <Reveal
              className="mt-6"
              delay={0.25}
              y={20}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/25">
                  Research / Prototypes / Technical Exploration
                </span>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/20">
                    04 Experiments
                  </span>

                  <span className="h-px w-8 bg-black/10" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-black/20">
                    AETHER / 2026
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing Statement */}
        <Reveal
          className="mt-20 md:mt-28"
          delay={0.3}
          y={30}
        >
          <div className="grid gap-8 border-t border-black/10 pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/25">
                Exploration Principle
              </span>
            </div>

            <div className="md:col-span-7">
              <p className="font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-medium leading-[0.95] tracking-tighter">
                Build the strange thing.
                <span className="text-black/25">
                  {" "}
                  Learn what it teaches.
                </span>
              </p>
            </div>

            <div className="flex items-end md:col-span-2 md:justify-end">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/20">
                AETHER / R&D
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}