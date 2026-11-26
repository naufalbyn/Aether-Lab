
"use client";

import { useRef, useState } from "react";

import {
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  Workflow,
  Layers3,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Plus,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import Reveal from "@/components/ui/Reveal";

import ChamberVisual from "@/components/experiments/ChamberVisual";

import {
  getAllExperiments,
  type ExperimentVisual,
} from "@/data/experiments";

// ==========================================
// DATA
// ==========================================

const experiments = getAllExperiments();

// ==========================================
// EXPERIMENT ICON
// ==========================================

function ExperimentIcon({
  visual,
  size = 20,
}: {
  visual: ExperimentVisual;
  size?: number;
}) {
  const props = {
    size,
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (visual) {
    case "intelligence":
      return <BrainCircuit {...props} />;

    case "blockchain":
      return <Boxes {...props} />;

    case "automation":
      return <Workflow {...props} />;

    case "interface":
      return <Layers3 {...props} />;
  }
}

// ==========================================
// EXPERIMENTAL CHAMBERS
// ==========================================

export default function ExperimentalChambers() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const visualRef =
    useRef<HTMLDivElement>(null);

  const isInView =
    useInView(visualRef);

  const reducedMotion =
    useReducedMotion();

  const activeExperiment =
    experiments[activeIndex];

  const shouldAnimate =
    isInView &&
    !isPaused &&
    !reducedMotion;

  function navigateChamber(direction: number) {
    setActiveIndex(
      (current) =>
        (
          current +
          direction +
          experiments.length
        ) % experiments.length
    );
  }

  return (
    <section
      id="experiments"
      aria-labelledby="experimental-chambers-title"
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-36 lg:py-44"
    >
      {/* ==================================
          AMBIENT BACKGROUND
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-48 top-10 h-150 w-150 rounded-full bg-[#4F46FF]/10 blur-[160px]" />

        <div className="absolute -right-48 bottom-0 h-130 w-130 rounded-full bg-[#8B5CF6]/5 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      <div className="aether-container relative">

        {/* ==================================
            EDITORIAL HEADER
        ================================== */}

        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                07 / Experiments
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[9px] uppercase tracking-wide text-white/35 sm:block">
                Research / Exploration / Concepts
              </span>

              <Plus
                aria-hidden="true"
                size={17}
                strokeWidth={1}
                className="text-white/35"
              />
            </div>
          </div>

          <div className="grid gap-8 pb-14 pt-12 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-20">
            <h2
              id="experimental-chambers-title"
              className="font-display text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.9] tracking-[-0.065em] lg:col-span-8"
            >
              Inside the
              <br />

              <span className="text-[#C7FF3D]">
                unknown.
              </span>
            </h2>

            <p className="max-w-sm text-sm leading-7 text-white/55 md:text-base md:leading-8 lg:col-span-4">
              Not every idea needs to become a
              product. Some need to be tested,
              broken, rebuilt, and understood
              first.
            </p>
          </div>
        </Reveal>

        {/* ==================================
            CHAMBER WORKSPACE
        ================================== */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101218]">

          {/* WORKSPACE HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <FlaskConical
                aria-hidden="true"
                size={20}
                strokeWidth={1.5}
                className="text-[#C7FF3D]"
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Aether / Experimental Chambers
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-wide text-white/45">
              {String(experiments.length).padStart(2, "0")}
              {" "}Research Directions
            </span>
          </div>

          {/* ==================================
              MAIN WORKSPACE
          ================================== */}

          <div className="grid lg:grid-cols-12">

            {/* ==================================
                VISUAL CHAMBER
            ================================== */}

            <div className="flex min-w-0 flex-col border-b border-white/10 lg:col-span-7 lg:border-b-0 lg:border-r">

              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        activeExperiment.accent,
                    }}
                  />

                  <span className="font-mono text-[9px] uppercase tracking-wide text-white/50">
                    Chamber / 0{activeExperiment.number}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setIsPaused((value) => !value)
                  }
                  disabled={Boolean(reducedMotion)}
                  aria-label={
                    isPaused
                      ? "Resume chamber animation"
                      : "Pause chamber animation"
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D] disabled:opacity-30"
                >
                  {isPaused || reducedMotion ? (
                    <Play
                      size={15}
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Pause
                      size={15}
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>

              {/* VISUAL STAGE */}

              <div
                ref={visualRef}
                className="relative isolate flex flex-1 items-center overflow-hidden"
                style={{
                  backgroundColor:
                    activeExperiment.surface,
                }}
              >
                <div className="relative aspect-3/2 w-full">
                  <AnimatePresence
                    initial={false}
                    mode="wait"
                  >
                    <motion.div
                      key={activeExperiment.slug}
                      initial={{
                        opacity: 0,
                        scale: reducedMotion
                          ? 1
                          : 0.97,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: reducedMotion
                          ? 1
                          : 1.02,
                      }}
                      transition={{
                        duration: reducedMotion
                          ? 0
                          : 0.25,
                      }}
                      className="absolute inset-0"
                    >
                      <ChamberVisual
                        visual={
                          activeExperiment.visual
                        }
                        accent={
                          activeExperiment.accent
                        }
                        animated={shouldAnimate}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <span className="pointer-events-none absolute left-4 top-4 font-mono text-[8px] uppercase tracking-wide text-white/30 md:left-6 md:top-6">
                  Concept Visualization
                </span>

                <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[8px] uppercase tracking-wide text-white/30 md:bottom-6 md:right-6">
                  Aether / R&D
                </span>
              </div>

              {/* VISUAL STATUS */}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-7">
                <span className="font-mono text-[8px] uppercase tracking-wide text-white/40">
                  Illustrative system model
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        shouldAnimate
                          ? activeExperiment.accent
                          : "#FBBF24",
                    }}
                  />

                  <span className="font-mono text-[8px] uppercase tracking-wide text-white/45">
                    {reducedMotion
                      ? "Reduced Motion"
                      : isPaused
                        ? "Animation Paused"
                        : isInView
                          ? "Animation Enabled"
                          : "Animation Standby"}
                  </span>
                </div>
              </div>
            </div>

            {/* ==================================
                RESEARCH INSPECTOR
            ================================== */}

            <div className="flex min-h-0 min-w-0 flex-col lg:col-span-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-7">
                <span className="font-mono text-[10px] uppercase tracking-wide text-white/50">
                  Research Inspector
                </span>

                <span className="font-mono text-[9px] text-white/35">
                  {activeExperiment.number}
                  {" / "}
                  {String(experiments.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-5 md:p-8">

                {/* FIXED CONTENT AREA */}

                <div
                  aria-live="polite"
                  data-lenis-prevent
                  className="h-115 min-h-0 overflow-y-auto overscroll-contain pr-2 md:h-120"
                >
                  <AnimatePresence
                    initial={false}
                    mode="wait"
                  >
                    <motion.div
                      key={activeExperiment.slug}
                      initial={{
                        opacity: 0,
                        y: reducedMotion ? 0 : 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: reducedMotion ? 0 : -8,
                      }}
                      transition={{
                        duration: reducedMotion
                          ? 0
                          : 0.2,
                      }}
                    >
                      {/* EXPERIMENT IDENTITY */}

                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                        style={{
                          backgroundColor:
                            `${activeExperiment.accent}0D`,

                          borderColor:
                            `${activeExperiment.accent}35`,

                          color:
                            activeExperiment.accent,
                        }}
                      >
                        <ExperimentIcon
                          visual={
                            activeExperiment.visual
                          }
                          size={28}
                        />
                      </div>

                      <span
                        className="mt-6 block font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{
                          color:
                            activeExperiment.accent,
                        }}
                      >
                        {activeExperiment.category}
                      </span>

                      <h3 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,3.4rem)] font-medium leading-none tracking-[-0.055em]">
                        {activeExperiment.title}
                      </h3>

                      <p className="mt-5 text-sm leading-7 text-white/60">
                        {activeExperiment.description}
                      </p>

                      {/* RESEARCH QUESTION */}

                      <div className="mt-7 rounded-xl border border-white/10 bg-white/2.5 p-4">
                        <span className="font-mono text-[8px] uppercase tracking-wide text-white/40">
                          Research Question
                        </span>

                        <p className="mt-3 font-display text-lg leading-snug tracking-tight text-white/85">
                          {activeExperiment.researchQuestion}
                        </p>
                      </div>

                      {/* FOCUS AREAS */}

                      <div className="mt-7">
                        <span className="font-mono text-[9px] uppercase tracking-wide text-white/45">
                          Focus Areas
                        </span>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {activeExperiment.focusAreas.map(
                            (area) => (
                              <span
                                key={area}
                                className="rounded-full border px-3 py-2 text-[10px]"
                                style={{
                                  borderColor:
                                    `${activeExperiment.accent}25`,

                                  backgroundColor:
                                    `${activeExperiment.accent}06`,

                                  color:
                                    activeExperiment.accent,
                                }}
                              >
                                {area}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* CONCEPT DIRECTIONS */}

                      <div className="mt-7 border-t border-white/10 pb-4 pt-6">
                        <span className="font-mono text-[9px] uppercase tracking-wide text-white/45">
                          Concept Directions
                        </span>

                        <ul className="mt-4 space-y-3">
                          {activeExperiment.concepts.map(
                            (concept) => (
                              <li
                                key={concept}
                                className="flex items-start gap-3 text-xs leading-6 text-white/60"
                              >
                                <span
                                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                  style={{
                                    backgroundColor:
                                      activeExperiment.accent,
                                  }}
                                />

                                {concept}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* STABLE NAVIGATION */}

                <div className="mt-auto flex shrink-0 items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    aria-label="Previous chamber"
                    onClick={() =>
                      navigateChamber(-1)
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                  >
                    <ChevronLeft
                      size={19}
                      strokeWidth={1.5}
                    />
                  </button>

                  <span className="text-center font-mono text-[9px] uppercase tracking-wide text-white/35">
                    Navigate Chambers
                  </span>

                  <button
                    type="button"
                    aria-label="Next chamber"
                    onClick={() =>
                      navigateChamber(1)
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                  >
                    <ChevronRight
                      size={19}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ==================================
              CHAMBER SELECTOR
          ================================== */}

          <div className="border-t border-white/10 p-4 md:p-7">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {experiments.map(
                (experiment, index) => {
                  const active =
                    index === activeIndex;

                  return (
                    <button
                      key={experiment.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setActiveIndex(index)
                      }
                      className="group relative flex min-h-36 min-w-0 flex-col justify-between overflow-hidden rounded-xl border p-4 text-left transition-[background-color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7FF3D] sm:min-h-40"
                      style={{
                        borderColor: active
                          ? `${experiment.accent}85`
                          : "rgba(255,255,255,0.10)",

                        backgroundColor: active
                          ? `${experiment.accent}0B`
                          : "#14161C",
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] uppercase tracking-wide text-white/35">
                          / {experiment.number}
                        </span>

                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: active
                              ? experiment.accent
                              : "rgba(255,255,255,0.15)",
                          }}
                        />
                      </div>

                      <div
                        className="my-4 transition-transform duration-300 motion-safe:group-hover:scale-110"
                        style={{
                          color: experiment.accent,
                        }}
                      >
                        <ExperimentIcon
                          visual={experiment.visual}
                          size={27}
                        />
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <span className="font-display text-sm font-medium leading-snug text-white/85 sm:text-base">
                          {experiment.title}
                        </span>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={15}
                          strokeWidth={1.5}
                          className="shrink-0 text-white/35"
                        />
                      </div>

                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300"
                        style={{
                          backgroundColor:
                            experiment.accent,

                          transform: active
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        }}
                      />
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* ==================================
              RESEARCH CONTEXT
          ================================== */}

          <div className="flex items-start gap-3 border-t border-white/10 bg-white/1.5 px-5 py-5 md:px-8">
            <FlaskConical
              aria-hidden="true"
              size={17}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-white/45"
            />

            <p className="max-w-3xl text-xs leading-6 text-white/45">
              These chambers represent research
              directions and conceptual system
              visualizations. They are not claims
              of completed products, live services,
              or production-ready implementations.
            </p>
          </div>
        </div>

        {/* ==================================
            EXPLORATION PRINCIPLE
        ================================== */}

        <Reveal className="mt-20 md:mt-28">
          <div className="grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/35">
                Exploration Principle
              </span>
            </div>

            <div className="lg:col-span-7">
              <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-none tracking-tighter">
                Build the strange thing.

                <span className="text-white/30">
                  {" "}
                  Learn what it teaches.
                </span>
              </p>
            </div>

            <div className="flex items-end lg:col-span-2 lg:justify-end">
              <span className="font-mono text-[9px] uppercase tracking-wide text-white/25">
                Aether / R&D
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
