
"use client";

import { useId, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  Layers,
  ArrowUpRight,
  CircleCheck,
  Clock3,
  RefreshCw,
} from "lucide-react";

import AmbientBackground from "@/components/effects/AmbientBackground";

import type {
  Project,
  FeatureStatus,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectFeaturesProps = {
  project: Project;
};

type FeatureFilter = "All" | FeatureStatus;

// ==========================================
// CONFIGURATION
// ==========================================

const FEATURE_STATUSES: FeatureStatus[] = [
  "Documented",
  "Rebuilding",
  "Planned",
];

const STATUS_CONFIG = {
  Documented: {
    color: "#4ADE80",
    icon: CircleCheck,
    description: "Recorded project capabilities.",
  },

  Rebuilding: {
    color: "#FBBF24",
    icon: RefreshCw,
    description: "Part of the current rebuild.",
  },

  Planned: {
    color: "#60A5FA",
    icon: Clock3,
    description: "Proposed future capabilities.",
  },
} satisfies Record<
  FeatureStatus,
  {
    color: string;
    icon: typeof Layers;
    description: string;
  }
>;

const FILTERS: FeatureFilter[] = [
  "All",
  ...FEATURE_STATUSES,
];

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

// ==========================================
// PROJECT FEATURES
// ==========================================

export default function ProjectFeatures({
  project,
}: ProjectFeaturesProps) {
  const componentId = useId();

  const prefersReducedMotion = useReducedMotion();

  const [selectedFilter, setSelectedFilter] =
    useState<FeatureFilter>("All");

  const features = project.features ?? [];

  const statusCounts: Record<FeatureStatus, number> = {
    Documented: features.filter(
      (feature) => feature.status === "Documented"
    ).length,

    Rebuilding: features.filter(
      (feature) => feature.status === "Rebuilding"
    ).length,

    Planned: features.filter(
      (feature) => feature.status === "Planned"
    ).length,
  };

  const availableFilters = FILTERS.filter(
    (filter) =>
      filter === "All" || statusCounts[filter] > 0
  );

  const activeFilter = availableFilters.includes(
    selectedFilter
  )
    ? selectedFilter
    : "All";

  const visibleFeatures = features
    .map((feature, index) => ({
      ...feature,
      originalIndex: index,
    }))
    .filter(
      (feature) =>
        activeFilter === "All" ||
        feature.status === activeFilter
    );

  const hasUnfinishedFeatures =
    statusCounts.Rebuilding > 0 ||
    statusCounts.Planned > 0;

  const sectionDescription = hasUnfinishedFeatures
    ? "A closer look at the documented capabilities, ongoing development, and proposed direction of this project."
    : "A closer look at the capabilities documented throughout the development of this project.";

  if (features.length === 0) {
    return null;
  }

  return (
    <section
      id="project-features"
      aria-labelledby={`${componentId}-title`}
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-32 lg:py-36"
    >
      {/* ==================================
          BACKGROUND
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(150deg, #0B0D10 0%, #111318 55%, #171820 100%)",
        }}
      />

      <AmbientBackground
        variant="dark"
        intensity={0.4}
        animated
        grid
        className="-z-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-20 -z-10 h-150 w-150 rounded-full opacity-10 blur-[150px]"
        style={{
          backgroundColor: project.accent,
        }}
      />

      <div className="aether-container relative z-10">
        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              02 / Core Features
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
              Built with
              <br />

              <span
                style={{
                  color: project.accent,
                }}
              >
                purpose.
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
                System Capabilities
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65 md:text-base">
              {sectionDescription}
            </p>
          </div>
        </div>

        {/* ==================================
            FEATURE STATUS SUMMARY
        ================================== */}

        <div className="grid gap-3 sm:grid-cols-3">
          {FEATURE_STATUSES.map((status) => {
            const config = STATUS_CONFIG[status];
            const Icon = config.icon;

            return (
              <div
                key={status}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-5 md:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                    {status}
                  </span>

                  <Icon
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.4}
                    style={{
                      color: config.color,
                    }}
                  />
                </div>

                <div
                  className="mt-5 font-display text-4xl font-medium tabular-nums tracking-[-0.055em] md:text-5xl"
                  style={{
                    color: config.color,
                  }}
                >
                  {formatNumber(
                    statusCounts[status]
                  )}
                </div>

                <p className="mt-3 text-xs leading-6 text-white/50">
                  {config.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ==================================
            FEATURE FILTERS
        ================================== */}

        <div className="mt-12 flex flex-col gap-5 border-y border-white/10 py-5 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter project features"
            className="flex flex-wrap items-center gap-2"
          >
            {availableFilters.map((filter) => {
              const isActive =
                activeFilter === filter;

              const count =
                filter === "All"
                  ? features.length
                  : statusCounts[filter];

              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={`${componentId}-features`}
                  onClick={() =>
                    setSelectedFilter(filter)
                  }
                  className={[
                    "flex items-center gap-2 rounded-full border px-4 py-2.5",
                    "text-xs font-medium transition-colors duration-300",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D]",
                    isActive
                      ? "border-white bg-white text-[#0B0D10]"
                      : "border-white/15 bg-white/2.5 text-white/60 hover:border-white/35 hover:text-white",
                  ].join(" ")}
                >
                  {filter === "All"
                    ? "All Features"
                    : filter}

                  <span
                    className={[
                      "font-mono text-[9px]",
                      isActive
                        ? "text-black/50"
                        : "text-white/40",
                    ].join(" ")}
                  >
                    {formatNumber(count)}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45"
          >
            Showing {formatNumber(visibleFeatures.length)}
            {" / "}
            {formatNumber(features.length)} Features
          </p>
        </div>

        {/* ==================================
            FEATURES GRID
        ================================== */}

        <motion.ul
          id={`${componentId}-features`}
          className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {visibleFeatures.map((feature) => {
            const config =
              STATUS_CONFIG[feature.status];

            const StatusIcon = config.icon;

            return (
              <motion.li
                key={`${feature.title}-${feature.originalIndex}`}
                layout={
                  prefersReducedMotion
                    ? false
                    : "position"
                }
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: prefersReducedMotion
                    ? 0
                    : 0.3,
                }}
                className="min-w-0"
              >
                <article className="group relative isolate flex h-full min-h-67.5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 p-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/4.5 md:p-8">
                  {/* Decorative Glow */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 -z-10 h-48 w-48 rounded-full opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-15"
                    style={{
                      backgroundColor: project.accent,
                    }}
                  />

                  {/* Card Header */}

                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border"
                      style={{
                        borderColor:
                          `${project.accent}30`,
                        backgroundColor:
                          `${project.accent}0D`,
                      }}
                    >
                      <Layers
                        aria-hidden="true"
                        size={23}
                        strokeWidth={1.4}
                        style={{
                          color: project.accent,
                        }}
                      />
                    </div>

                    <span className="font-mono text-[10px] tracking-[0.14em] text-white/35">
                      / {formatNumber(
                        feature.originalIndex + 1
                      )}
                    </span>
                  </div>

                  {/* Feature Content */}

                  <div className="mt-8 flex-1">
                    <h3 className="wrap-break-word font-display text-xl font-medium leading-tight tracking-[-0.035em] md:text-2xl">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/60">
                      {feature.description}
                    </p>
                  </div>

                  {/* Feature Status */}

                  <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2.5">
                      <StatusIcon
                        aria-hidden="true"
                        size={15}
                        strokeWidth={1.6}
                        style={{
                          color: config.color,
                        }}
                      />

                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.12em]"
                        style={{
                          color: config.color,
                        }}
                      >
                        {feature.status}
                      </span>
                    </div>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={17}
                      strokeWidth={1.2}
                      className="text-white/25 transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                    />
                  </div>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* ==================================
            FEATURE STATUS DISCLAIMER
        ================================== */}

        {hasUnfinishedFeatures && (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/2.5 p-5 md:p-6">
            <div className="flex items-start gap-4">
              <Clock3
                aria-hidden="true"
                size={19}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-[#FBBF24]"
              />

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                  Development Transparency
                </span>

                <p className="mt-3 max-w-3xl text-xs leading-7 text-white/55 md:text-sm">
                  Documented features are based on
                  available project documentation.
                  Features marked as rebuilding or
                  planned should not be interpreted
                  as currently operational or
                  production-ready capabilities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Core Features
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              {formatNumber(features.length)}
              {" "}Documented & Proposed Capabilities
            </span>

            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
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
