
"use client";

import { useId, useState } from "react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  Gamepad2,
  ArrowUpRight,
  Code2,
  Layers,
  Zap,
  Target,
  Info,
  Film,
  MonitorPlay,
  RefreshCw,
} from "lucide-react";

import type { Project } from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectGameplayProps = {
  project: Project;
  sectionNumber: string;
};

// ==========================================
// GAMEPLAY MEDIA
// ==========================================

const STACK_BLOCK_MEDIA = {
  video:
    "/projects/stack-block-arcade/gameplay-showcase.mp4",

  poster:
    "/projects/stack-block-arcade/gameplay-poster.webp",

  website:
    "https://stack-block-arcade-ten.vercel.app",

  repository:
    "https://github.com/wiranatareza24-beep/StackBlockArcade",

  resolution: "1920 Ã— 728",

  duration: "02:11",

  frameRate: "30 FPS",
};

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

// ==========================================
// PROJECT GAMEPLAY
// ==========================================

export default function ProjectGameplay({
  project,
  sectionNumber,
}: ProjectGameplayProps) {
  const componentId = useId();

  const prefersReducedMotion =
    useReducedMotion();

  const gameplay = project.gameplay;

  const arenas = gameplay?.arenas ?? [];

  const [selectedArena, setSelectedArena] =
    useState(0);

  const [videoError, setVideoError] =
    useState(false);

  const [videoAttempt, setVideoAttempt] =
    useState(0);

  const activeArena =
    arenas[selectedArena] ?? arenas[0];

  const arenaColor =
    activeArena?.accent ?? project.accent;

  // ==========================================
  // CONDITIONAL RENDERING
  // ==========================================

  if (
    !gameplay ||
    project.slug !== "stack-block-arcade"
  ) {
    return null;
  }

  const media = STACK_BLOCK_MEDIA;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="project-gameplay"
      aria-labelledby={`${componentId}-title`}
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-32 lg:py-36"
    >
      {/* ==================================
          BACKGROUND SYSTEM
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-[#0B0D10] via-[#13151B] to-[#191920]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-32 -z-10 h-125 w-125 rounded-full opacity-[0.06] blur-[150px]"
        style={{
          backgroundColor: project.accent,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-24 -z-10 hidden h-175 w-175 rounded-full border border-white/5 lg:block"
      >
        <div className="absolute inset-20 rounded-full border border-white/5" />

        <div className="absolute inset-40 rounded-full border border-white/5" />
      </div>

      <div className="aether-container relative">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              {sectionNumber} / Gameplay Experience
            </span>
          </div>

          <Plus
            aria-hidden="true"
            size={17}
            strokeWidth={1}
            className="text-white/40"
          />
        </div>

        {/* ==================================
            EDITORIAL HEADING
        ================================== */}

        <div className="grid gap-10 pb-14 pt-14 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-20">
          <div className="lg:col-span-7">
            <h2
              id={`${componentId}-title`}
              className="font-display text-[clamp(3rem,6.8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em]"
            >
              Built to
              <br />

              <span
                style={{
                  color: project.accent,
                }}
              >
                be played.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{
                  backgroundColor: project.accent,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                Gameplay Exploration
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65 md:text-base">
              {gameplay.description}
            </p>
          </div>
        </div>

        {/* ==================================
            ORIGINAL GAMEPLAY PLAYER
        ================================== */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101216]">

          {/* PLAYER HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <Film
                aria-hidden="true"
                size={19}
                strokeWidth={1.5}
                style={{
                  color: project.accent,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
                Original Gameplay Footage
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                {media.duration}
              </span>

              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: project.accent,
                }}
              />
            </div>
          </div>

          {/* NATIVE VIDEO PLAYER */}

          <div className="relative overflow-hidden bg-[#08090B]">

            {videoError ? (
              <div className="flex aspect-240/91 min-h-48 flex-col items-center justify-center gap-4 p-6 text-center">
                <Info
                  aria-hidden="true"
                  size={28}
                  strokeWidth={1.5}
                  className="text-white/45"
                />

                <p className="text-sm text-white/65">
                  The gameplay video could not be loaded.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setVideoError(false);
                    setVideoAttempt(
                      (previous) => previous + 1
                    );
                  }}
                  className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-xs text-white/75 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
                >
                  <RefreshCw
                    aria-hidden="true"
                    size={14}
                  />

                  Try Again
                </button>
              </div>
            ) : (
              <video
                key={videoAttempt}
                controls
                playsInline
                preload="none"
                poster={media.poster}
                aria-label="Original Stack Block Arcade gameplay recording"
                className="block aspect-240/91 w-full bg-black object-contain"
                onError={() => setVideoError(true)}
              >
                <source
                  src={media.video}
                  type="video/mp4"
                />

                Your browser does not support
                HTML video playback.
              </video>
            )}
          </div>

          {/* VIDEO METADATA */}

          <div className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
            <div className="p-4 md:p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                Resolution
              </span>

              <p className="mt-2 font-display text-sm font-medium tabular-nums text-white/85 md:text-xl">
                {media.resolution}
              </p>
            </div>

            <div className="p-4 md:p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                Frame Rate
              </span>

              <p className="mt-2 font-display text-sm font-medium text-white/85 md:text-xl">
                {media.frameRate}
              </p>
            </div>

            <div className="p-4 md:p-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                Duration
              </span>

              <p className="mt-2 font-display text-sm font-medium tabular-nums text-white/85 md:text-xl">
                {media.duration}
              </p>
            </div>
          </div>

          {/* VIDEO DOCUMENTATION */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <MonitorPlay
                aria-hidden="true"
                size={17}
                strokeWidth={1.5}
                className="text-white/45"
              />

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                Recorded from the Original Build
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">
              Gameplay Archive / 2026
            </span>
          </div>
        </div>

        {/* ==================================
            ORIGINAL BUILD & REBUILD STATUS
        ================================== */}

        <div className="mt-5 grid gap-5 lg:grid-cols-12">

          {/* ORIGINAL BUILD */}

          <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8 lg:col-span-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full opacity-10 blur-[90px]"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <div className="flex items-center justify-between gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border"
                style={{
                  color: project.accent,

                  borderColor:
                    `${project.accent}30`,

                  backgroundColor:
                    `${project.accent}0A`,
                }}
              >
                <Gamepad2
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                Original Implementation
              </span>
            </div>

            <h3 className="mt-7 font-display text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-tight tracking-[-0.045em]">
              Experience the
              <br />
              original build.
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
              Explore the original hackathon
              implementation of Stack Block Arcade,
              developed as a collaborative
              four-person project.
            </p>

            <p className="mt-3 max-w-xl text-xs leading-6 text-white/45">
              The external demo represents the
              previous implementation, not the
              planned rebuild. Availability may
              depend on the original deployment.
            </p>

            {/* EXTERNAL LINKS */}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={media.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-5 py-3 text-sm font-medium text-[#0B0D10] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                style={{
                  backgroundColor: project.accent,
                }}
              >
                Play Original Build

                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </a>

              <a
                href={media.repository}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/15 px-5 py-3 text-sm text-white/70 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Code2
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.5}
                />

                View Repository
              </a>
            </div>
          </div>

          {/* REBUILD STATUS */}

          <div className="rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8 lg:col-span-5">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                Development Status
              </span>

              <RefreshCw
                aria-hidden="true"
                size={17}
                strokeWidth={1.5}
                className="text-white/40"
              />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FF9135]/25 bg-[#FF9135]/8 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF9135]" />

              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF9135]">
                Rebuild Planned
              </span>
            </div>

            <h3 className="mt-5 font-display text-3xl font-medium tracking-[-0.045em]">
              The next iteration.
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/60">
              Stack Block Arcade is planned for
              a future rebuild, with an opportunity
              to revisit its gameplay systems,
              technical architecture, and overall
              player experience.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                Future Development
              </span>

              <p className="mt-3 text-xs leading-6 text-white/55">
                Development scope and future team
                arrangements are subject to
                further discussion.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================
            ARENA EXPLORER
        ================================== */}

        {arenas.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  Game Environments
                </span>

                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl">
                  Explore the arenas.
                </h3>
              </div>

              <Layers
                aria-hidden="true"
                size={26}
                strokeWidth={1.2}
                className="text-white/35"
              />
            </div>

            {/* ARENA SELECTION */}

            <div
              role="group"
              aria-label="Select an arena to explore"
              className="mt-6 grid gap-4 md:grid-cols-3"
            >
              {arenas.map((arena, index) => {
                const isActive =
                  index === selectedArena;

                return (
                  <button
                    key={arena.name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setSelectedArena(index)
                    }
                    className="group relative isolate w-full overflow-hidden rounded-2xl border p-6 text-left transition-colors duration-300 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    style={{
                      borderColor: isActive
                        ? `${arena.accent}80`
                        : "#FFFFFF18",

                      backgroundColor: isActive
                        ? `${arena.accent}08`
                        : "#FFFFFF03",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full opacity-10 blur-[70px]"
                      style={{
                        backgroundColor: arena.accent,
                      }}
                    />

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.14em]"
                        style={{
                          color: isActive
                            ? arena.accent
                            : "#FFFFFF70",
                        }}
                      >
                        Arena_
                        {formatNumber(index + 1)}
                      </span>

                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: arena.accent,
                        }}
                      />
                    </div>

                    <h4 className="mt-8 font-display text-xl font-medium tracking-[-0.035em] md:text-2xl">
                      {arena.name}
                    </h4>

                    <div className="mt-6 flex gap-1.5">
                      {[0, 1, 2].map((level) => (
                        <span
                          key={level}
                          className="h-0.5 flex-1 rounded-full"
                          style={{
                            backgroundColor:
                              level <= index
                                ? arena.accent
                                : "#FFFFFF15",
                          }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ACTIVE ARENA INSPECTOR */}

            {activeArena && (
              <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white/3">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
                  <div className="flex items-center gap-3">
                    <Zap
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.5}
                      style={{
                        color: arenaColor,
                      }}
                    />

                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                      Arena Inspector
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-white/45">
                    {formatNumber(
                      selectedArena + 1
                    )}
                    {" / "}
                    {formatNumber(arenas.length)}
                  </span>
                </div>

                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  <motion.div
                    key={activeArena.name}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 5 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    transition={{
                      duration:
                        prefersReducedMotion
                          ? 0
                          : 0.2,
                    }}
                    className="grid gap-6 p-6 md:grid-cols-12 md:items-center md:p-8"
                  >
                    <div className="md:col-span-5">
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{
                          color: arenaColor,
                        }}
                      >
                        Selected Environment
                      </span>

                      <h4
                        className="mt-3 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl"
                        style={{
                          color: arenaColor,
                        }}
                      >
                        {activeArena.name}
                      </h4>
                    </div>

                    <div
                      aria-live="polite"
                      className="md:col-span-7"
                    >
                      <p className="text-sm leading-8 text-white/65 md:text-base">
                        {activeArena.description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            <p className="mt-4 text-xs leading-6 text-white/40">
              Arena information describes the
              documented original game concept.
              Selecting an arena here does not
              launch or modify the external game.
            </p>
          </div>
        )}

        {/* ==================================
            GAME MODES
        ================================== */}

        {gameplay.modes.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  Gameplay Structure
                </span>

                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl">
                  Game modes.
                </h3>
              </div>

              <Gamepad2
                aria-hidden="true"
                size={26}
                strokeWidth={1.2}
                className="text-white/35"
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {gameplay.modes.map((mode, index) => (
                <article
                  key={mode}
                  className="rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8"
                >
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      color: project.accent,
                    }}
                  >
                    Mode_
                    {formatNumber(index + 1)}
                  </span>

                  <h4 className="mt-5 font-display text-2xl font-medium tracking-[-0.04em]">
                    {mode}
                  </h4>
                </article>
              ))}
            </div>

            <p className="mt-4 text-xs leading-6 text-white/40">
              Documented game modes. Current
              availability in the original
              deployment has not been verified.
            </p>
          </div>
        )}

        {/* ==================================
            GAME MECHANICS
        ================================== */}

        {gameplay.mechanics.length > 0 && (
          <div className="mt-16 md:mt-20">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  Gameplay Systems
                </span>

                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.045em] md:text-4xl">
                  Game mechanics.
                </h3>
              </div>

              <Target
                aria-hidden="true"
                size={26}
                strokeWidth={1.2}
                className="text-white/35"
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gameplay.mechanics.map(
                (mechanic, index) => (
                  <article
                    key={mechanic.title}
                    className="rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-white/25 md:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span
                        className="font-mono text-xs"
                        style={{
                          color: project.accent,
                        }}
                      >
                        {formatNumber(index + 1)}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-white/55">
                        {mechanic.status}
                      </span>
                    </div>

                    <h4 className="mt-7 font-display text-xl font-medium tracking-[-0.03em]">
                      {mechanic.title}
                    </h4>

                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {mechanic.description}
                    </p>
                  </article>
                )
              )}
            </div>
          </div>
        )}

        {/* DOCUMENTATION NOTE */}

        {gameplay.note && (
          <div className="mt-6 flex items-start gap-4 rounded-xl border border-white/10 bg-white/3 p-5">
            <Info
              aria-hidden="true"
              size={18}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-white/45"
            />

            <p className="max-w-4xl text-xs leading-7 text-white/50">
              {gameplay.note}
            </p>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Gameplay Archive
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Still Searching. Still Building.
            </span>

            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
