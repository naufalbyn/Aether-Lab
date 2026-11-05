"use client";

import { useState } from "react";
import { ArrowUpRight, Blocks, Bot, Gamepad2, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const builds = [
  {
    number: "01",
    title: "TxShield",
    category: "Web3 / Security",
    description:
      "A Solana transaction safety concept designed to add a confirmation layer before potentially risky transactions are signed.",
    stack: ["Solana", "React", "TypeScript", "Phantom"],
    accent: "#4F46FF",
    icon: ShieldCheck,
    system: "TX / SHIELD",
    status: "PROTOTYPE",
  },
  {
    number: "02",
    title: "Stack Block Arcade",
    category: "Web3 / Game",
    description:
      "An experimental blockchain game concept exploring how on-chain mechanics can become part of a simple interactive experience.",
    stack: ["Solana", "Game", "Blockchain"],
    accent: "#C7FF3D",
    icon: Gamepad2,
    system: "GAME / ON-CHAIN",
    status: "EXPERIMENT",
  },
  {
    number: "03",
    title: "Axeon",
    category: "Web3 / Automation",
    description:
      "A management protocol concept for automating paid Telegram communities with blockchain-based payment flows.",
    stack: ["Solana", "Rust", "Telegram", "Automation"],
    accent: "#8B5CF6",
    icon: Bot,
    system: "AUTOMATION / PROTOCOL",
    status: "CONCEPT",
  },
  {
    number: "04",
    title: "VeritasVote",
    category: "Blockchain / Governance",
    description:
      "A blockchain-based voting system exploring transparent and verifiable digital governance.",
    stack: ["Ethereum", "Solidity", "Foundry", "Web3"],
    accent: "#F97316",
    icon: Blocks,
    system: "VOTE / GOVERNANCE",
    status: "EXPERIMENT",
  },
];

export default function SelectedBuilds() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="builds"
      className="relative overflow-hidden bg-aether-black py-32 text-white md:py-44"
    >
      {/* Ambient System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-72 top-1/2 hidden h-160 w-160 -translate-y-1/2 rounded-full border border-white/5 md:block"
      >
        <div className="absolute inset-[16%] rounded-full border border-white/[0.035]" />

        <div className="absolute inset-[32%] rounded-full border border-white/2.5" />

        <div className="absolute inset-[49%] rounded-full border border-white/2" />

        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[17%] left-[16%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Details */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-[22%] h-px w-[16vw] bg-white/5" />

        <div className="absolute right-0 top-[74%] h-px w-[12vw] bg-white/5" />

        <div className="absolute left-[6%] top-[13%] font-mono text-[8px] tracking-[0.2em] text-white/15">
          AETHER / 05
        </div>

        <div className="absolute bottom-[10%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-white/15">
          SYSTEM / BUILDS
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="border-b border-white/10 pb-6 md:pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-lime/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-aether-lime" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                  05 / Selected Builds
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 md:block">
                Things we&apos;ve actually built
              </span>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
              <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[0.82] tracking-[-0.07em] md:col-span-8">
                Selected
                <br />
                <span className="text-white/25">builds.</span>
              </h2>

              <div className="md:col-span-4 md:pb-2">
                <p className="max-w-sm text-sm leading-7 text-white/40">
                  Real projects, prototypes, and experiments built while
                  exploring software, blockchain, automation, and new digital
                  systems.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Build List */}
        <div className="mt-10 border-t border-white/10 md:mt-14">
          {builds.map((build, index) => {
            const Icon = build.icon;
            const isActive = activeIndex === index;

            return (
              <Reveal key={build.number} delay={index * 0.08} y={40}>
                <article
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group relative border-b border-white/10 py-9 outline-none md:py-12"
                >
                  {/* Accent Progress */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px origin-left transition-all duration-700"
                    style={{
                      width: isActive ? "100%" : "0%",
                      backgroundColor: build.accent,
                    }}
                  />

                  <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-6">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span
                        className={`font-mono text-[9px] tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? "text-white/70" : "text-white/25"
                        }`}
                      >
                        {build.number}
                      </span>
                    </div>

                    {/* Project Identity */}
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-5">
                        {/* System Icon */}
                        <div
                          className="relative mt-1 flex h-12 w-12 shrink-0 items-center justify-center border transition-all duration-500 md:h-14 md:w-14"
                          style={{
                            borderColor: isActive
                              ? `${build.accent}55`
                              : "rgba(255,255,255,0.10)",
                            backgroundColor: isActive
                              ? `${build.accent}0D`
                              : "transparent",
                          }}
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.35}
                            className="transition-all duration-500"
                            style={{
                              color: isActive
                                ? build.accent
                                : "rgba(255,255,255,0.40)",
                              transform: isActive ? "scale(1.08)" : "scale(1)",
                            }}
                          />

                          <span
                            aria-hidden="true"
                            className="absolute -right-px -top-px h-2 w-2 border-r border-t transition-opacity duration-300"
                            style={{
                              borderColor: build.accent,
                              opacity: isActive ? 1 : 0,
                            }}
                          />
                        </div>

                        <div>
                          <div className="mb-3 flex items-center gap-3">
                            <span
                              className="h-1.5 w-1.5 rounded-full transition-transform duration-500"
                              style={{
                                backgroundColor: build.accent,
                                transform: isActive ? "scale(1.5)" : "scale(1)",
                              }}
                            />

                            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                              {build.category}
                            </span>
                          </div>

                          <h3
                            className={`font-display text-[clamp(2.1rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em] transition-all duration-500 ${
                              isActive ? "text-white" : "text-white/70"
                            }`}
                          >
                            {build.title}
                          </h3>

                          <div className="mt-4 flex items-center gap-3">
                            <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/20">
                              {build.system}
                            </span>

                            <span className="h-px w-5 bg-white/10" />

                            <span
                              className="font-mono text-[7px] uppercase tracking-[0.18em] transition-colors duration-300"
                              style={{
                                color: isActive
                                  ? build.accent
                                  : "rgba(255,255,255,0.20)",
                              }}
                            >
                              {build.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description + Stack */}
                    <div className="md:col-span-4">
                      <p
                        className={`max-w-md text-sm leading-7 transition-colors duration-300 ${
                          isActive ? "text-white/60" : "text-white/40"
                        }`}
                      >
                        {build.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {build.stack.map((technology) => (
                          <span
                            key={technology}
                            className={`border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.15em] transition-all duration-300 ${
                              isActive
                                ? "border-white/15 text-white/45"
                                : "border-white/8 text-white/25"
                            }`}
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interaction */}
                    <div className="md:col-span-2 md:flex md:justify-end">
                      <div
                        className="relative flex h-14 w-14 items-center justify-center border transition-all duration-500 md:h-16 md:w-16"
                        style={{
                          borderColor: isActive
                            ? `${build.accent}55`
                            : "rgba(255,255,255,0.10)",
                          backgroundColor: isActive
                            ? `${build.accent}0D`
                            : "transparent",
                          transform: isActive
                            ? "translate(2px, -2px)"
                            : "translate(0, 0)",
                        }}
                      >
                        <ArrowUpRight
                          size={19}
                          strokeWidth={1.35}
                          className="transition-all duration-500"
                          style={{
                            color: isActive
                              ? build.accent
                              : "rgba(255,255,255,0.40)",
                            transform: isActive
                              ? "translate(2px, -2px)"
                              : "translate(0, 0)",
                          }}
                        />

                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-px transition-all duration-500"
                          style={{
                            width: isActive ? "100%" : "0%",
                            backgroundColor: build.accent,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer Meta */}
        <Reveal className="mt-8 md:mt-10" delay={0.25} y={20}>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-aether-lime" />

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                Real projects / ongoing experiments
              </span>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                04 Builds
              </span>

              <span className="h-px w-8 bg-white/10" />

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                AETHER LAB / 2026
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
