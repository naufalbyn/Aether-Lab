"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  ArrowUpRight,
  Bot,
  Blocks,
  Code2,
  FlaskConical,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Software",
    description:
      "Web applications, digital products, and technical systems built around real problems.",
    technologies: "WEB / APP / SYSTEMS",
    icon: Code2,
    accent: "#4F46FF",
  },
  {
    number: "02",
    title: "Web3",
    description:
      "Blockchain products, on-chain systems, smart contracts, and decentralized experiences.",
    technologies: "BLOCKCHAIN / ON-CHAIN / PROTOCOL",
    icon: Blocks,
    accent: "#C7FF3D",
  },
  {
    number: "03",
    title: "AI",
    description:
      "AI-powered workflows, developer tools, automation, and experiments that make software more capable.",
    technologies: "AI / AUTOMATION / TOOLS",
    icon: Bot,
    accent: "#8B5CF6",
  },
  {
    number: "04",
    title: "Experiments",
    description:
      "Unfinished ideas, prototypes, and technical explorations built to understand what is possible.",
    technologies: "R&D / PROTOTYPES / EXPLORATION",
    icon: FlaskConical,
    accent: "#F97316",
  },
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-aether-cloud py-32 md:py-44"
    >
      {/* Background Detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-45 top-1/2 hidden h-100 w-100 -translate-y-1/2 rounded-full border border-black/5 md:block"
      >
        <div className="absolute inset-[18%] rounded-full border border-black/4" />

        <div className="absolute inset-[38%] rounded-full border border-black/3" />
      </div>

      <div className="aether-container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-16 border-b border-black/10 pb-5 md:mb-20">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-blue/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-aether-blue" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/45">
                  03 / Capabilities
                </span>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/25">
                  What we build
                </span>

                <span className="h-px w-12 bg-black/10" />
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="font-display max-w-3xl text-[clamp(2.8rem,5.5vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                Built around
                <br />
                <span className="text-black/30">possibility.</span>
              </h2>

              <p className="max-w-xs text-sm leading-6 text-black/45 md:pb-1">
                Four directions. One studio. Every build starts with a
                question worth exploring.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Capability System */}
        <div className="border-t border-black/10">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isActive = activeIndex === index;

            return (
              <Reveal
                key={capability.number}
                delay={index * 0.08}
                y={35}
              >
                <article
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group relative border-b border-black/10 py-7 outline-none md:py-9"
                >
                  {/* Active Accent Line */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px origin-left transition-all duration-500"
                    style={{
                      width: isActive ? "100%" : "0%",
                      backgroundColor: capability.accent,
                    }}
                  />

                  <div className="grid gap-7 md:grid-cols-12 md:items-center md:gap-6">
                    {/* Number */}
                    <div className="md:col-span-1">
                      <span
                        className={`font-mono text-[9px] tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? "text-black/65" : "text-black/25"
                        }`}
                      >
                        {capability.number}
                      </span>
                    </div>

                    {/* Title + Icon */}
                    <div className="md:col-span-5">
                      <div className="flex items-center gap-5">
                        <div
                          className="relative flex h-12 w-12 shrink-0 items-center justify-center border transition-all duration-500 md:h-14 md:w-14"
                          style={{
                            borderColor: isActive
                              ? `${capability.accent}55`
                              : "rgba(11, 13, 16, 0.10)",
                            backgroundColor: isActive
                              ? `${capability.accent}0D`
                              : "transparent",
                          }}
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.4}
                            className="transition-all duration-500"
                            style={{
                              color: isActive
                                ? capability.accent
                                : "rgba(11, 13, 16, 0.45)",
                              transform: isActive
                                ? "scale(1.08)"
                                : "scale(1)",
                            }}
                          />

                          <span
                            aria-hidden="true"
                            className="absolute -right-px -top-px h-2 w-2 border-r border-t transition-opacity duration-300"
                            style={{
                              borderColor: capability.accent,
                              opacity: isActive ? 1 : 0,
                            }}
                          />
                        </div>

                        <h3
                          className={`font-display text-[clamp(2rem,3.5vw,3.5rem)] font-medium tracking-tighter transition-colors duration-300 ${
                            isActive ? "text-black" : "text-black/75"
                          }`}
                        >
                          {capability.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-4">
                      <p
                        className={`max-w-md text-sm leading-7 transition-colors duration-300 ${
                          isActive ? "text-black/60" : "text-black/40"
                        }`}
                      >
                        {capability.description}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <span
                          className="h-px w-6 transition-all duration-500"
                          style={{
                            backgroundColor: capability.accent,
                            opacity: isActive ? 1 : 0.25,
                            width: isActive ? "32px" : "20px",
                          }}
                        />

                        <span className="font-mono text-[7px] tracking-[0.16em] text-black/30">
                          {capability.technologies}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="md:col-span-2 md:flex md:justify-end">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 md:h-12 md:w-12"
                        style={{
                          borderColor: isActive
                            ? `${capability.accent}55`
                            : "rgba(11, 13, 16, 0.10)",
                          backgroundColor: isActive
                            ? `${capability.accent}0D`
                            : "transparent",
                          transform: isActive
                            ? "translate(2px, -2px)"
                            : "translate(0, 0)",
                        }}
                      >
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.4}
                          style={{
                            color: isActive
                              ? capability.accent
                              : "rgba(11, 13, 16, 0.45)",
                          }}
                          className="transition-transform duration-500"
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
        <Reveal
          className="mt-8 md:mt-10"
          delay={0.25}
          y={20}
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <span className="font-mono text-[8px] tracking-[0.18em] text-black/25">
              AETHER LAB / CAPABILITY SYSTEM
            </span>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-aether-lime" />

              <span className="font-mono text-[8px] tracking-[0.16em] text-black/35">
                CURRENTLY EXPLORING
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}