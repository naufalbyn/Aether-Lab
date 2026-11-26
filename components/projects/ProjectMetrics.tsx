
"use client";

import { useId, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  Activity,
  Smartphone,
  Monitor,
  Zap,
  LayoutGrid,
  HardDrive,
  ArrowDownRight,
  Info,
  Gauge,
  ShieldCheck,
  Accessibility,
  Search,
} from "lucide-react";

import type {
  Project,
  ProjectMetric,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectMetricsProps = {
  project: Project;
  sectionNumber: string;
};

type DeviceType = "mobile" | "desktop";

type ScoreIndicatorProps = {
  metric: ProjectMetric;
  index: number;
};

// ==========================================
// CONSTANTS
// ==========================================

const SCORE_LABELS = [
  "Performance",
  "Accessibility",
  "Best Practices",
  "SEO",
];

const PERFORMANCE_COLOR = "#C7FF3D";

const CIRCLE_RADIUS = 48;

const CIRCLE_CIRCUMFERENCE =
  2 * Math.PI * CIRCLE_RADIUS;

// ==========================================
// UTILITIES
// ==========================================

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function findMetric(
  metrics: ProjectMetric[],
  label: string
) {
  return metrics.find(
    (metric) =>
      normalize(metric.label) ===
      normalize(label)
  );
}

function getScore(
  value: string
): number | null {
  const match = value
    .trim()
    .match(/^(\d+(?:\.\d+)?)\s*\/\s*100$/);

  if (!match) return null;

  const score = Number(match[1]);

  if (
    !Number.isFinite(score) ||
    score < 0 ||
    score > 100
  ) {
    return null;
  }

  return score;
}

function getScoreColor(score: number) {
  if (score >= 90) return PERFORMANCE_COLOR;

  if (score >= 50) return "#F5B700";

  return "#F56565";
}

function getAssetComparison(
  description?: string
) {
  if (!description) return null;

  const matches = Array.from(
    description.matchAll(
      /(\d+(?:\.\d+)?)\s*(KB|MB|GB)\b/gi
    )
  );

  if (matches.length !== 2) {
    return null;
  }

  const before = Number(matches[0][1]);
  const after = Number(matches[1][1]);

  const beforeUnit =
    matches[0][2].toUpperCase();

  const afterUnit =
    matches[1][2].toUpperCase();

  if (
    beforeUnit !== afterUnit ||
    before <= 0 ||
    after < 0 ||
    after > before
  ) {
    return null;
  }

  return {
    before: `${before} ${beforeUnit}`,
    after: `${after} ${afterUnit}`,
    percentage: (after / before) * 100,
  };
}

// ==========================================
// METRIC ICON
// ==========================================

function MetricIcon({
  label,
}: {
  label: string;
}) {
  const props = {
    size: 17,
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (normalize(label)) {
    case "performance":
      return <Gauge {...props} />;

    case "accessibility":
      return <Accessibility {...props} />;

    case "best practices":
      return <ShieldCheck {...props} />;

    case "seo":
      return <Search {...props} />;

    default:
      return <Activity {...props} />;
  }
}

// ==========================================
// CIRCULAR SCORE INDICATOR
// ==========================================

function ScoreIndicator({
  metric,
  index,
}: ScoreIndicatorProps) {
  const prefersReducedMotion =
    useReducedMotion();

  const score = getScore(metric.value);

  if (score === null) {
    return (
      <article className="rounded-2xl border border-white/10 bg-white/3 p-6">
        <p className="text-sm text-white/55">
          {metric.label}
        </p>

        <p className="mt-5 font-display text-3xl font-medium">
          {metric.value}
        </p>

        {metric.description && (
          <p className="mt-3 text-xs leading-6 text-white/45">
            {metric.description}
          </p>
        )}
      </article>
    );
  }

  const color = getScoreColor(score);

  const offset =
    CIRCLE_CIRCUMFERENCE *
    (1 - score / 100);

  return (
    <article className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-4 transition-colors duration-300 hover:border-white/25 md:p-6">

      {/* AMBIENT GLOW */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 -z-10 h-28 w-28 -translate-x-1/2 rounded-full opacity-[0.06] blur-[50px]"
        style={{
          backgroundColor: color,
        }}
      />

      {/* CARD HEADER */}

      <div className="flex items-center justify-between gap-3">
        <span
          className="text-white/45"
        >
          <MetricIcon label={metric.label} />
        </span>

        <span className="font-mono text-[9px] text-white/35">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* SCORE RING */}

      <div className="mx-auto mt-6 w-full max-w-35">
        <svg
          viewBox="0 0 120 120"
          className="block h-auto w-full"
          role="img"
          aria-label={`${metric.label}: ${metric.value}`}
        >
          <circle
            cx={60}
            cy={60}
            r={CIRCLE_RADIUS}
            fill={color}
            fillOpacity={0.025}
            stroke="white"
            strokeOpacity={0.08}
            strokeWidth={4}
          />

          <motion.circle
            cx={60}
            cy={60}
            r={CIRCLE_RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray={
              CIRCLE_CIRCUMFERENCE
            }
            transform="rotate(-90 60 60)"
            initial={{
              strokeDashoffset:
                CIRCLE_CIRCUMFERENCE,
            }}
            whileInView={{
              strokeDashoffset: offset,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 1.1,

              delay: prefersReducedMotion
                ? 0
                : index * 0.12,

              ease: "easeOut",
            }}
          />

          <text
            x={60}
            y={64}
            fill={color}
            fontSize={31}
            fontWeight={500}
            textAnchor="middle"
            className="font-display"
          >
            {score}
          </text>

          <text
            x={60}
            y={81}
            fill="white"
            fillOpacity={0.4}
            fontSize={9}
            textAnchor="middle"
            fontFamily="monospace"
          >
            / 100
          </text>
        </svg>
      </div>

      {/* SCORE LABEL */}

      <h3 className="mt-5 text-center font-display text-sm font-medium text-white/85 md:text-base">
        {metric.label}
      </h3>

      {metric.description && (
        <p className="mt-2 text-center text-[11px] leading-5 text-white/40">
          {metric.description}
        </p>
      )}
    </article>
  );
}

// ==========================================
// PROJECT METRICS
// ==========================================

export default function ProjectMetrics({
  project,
  sectionNumber,
}: ProjectMetricsProps) {
  const componentId = useId();

  const prefersReducedMotion =
    useReducedMotion();

  const [device, setDevice] =
    useState<DeviceType>("mobile");

  const metrics = project.metrics ?? [];

  // ==========================================
  // DATA RESOLUTION
  // ==========================================

  const scoreMetrics = SCORE_LABELS
    .map((label) =>
      findMetric(metrics, label)
    )
    .filter(
      (metric): metric is ProjectMetric =>
        metric !== undefined
    );

  const mobileLcp = findMetric(
    metrics,
    "Mobile LCP"
  );

  const desktopLcp = findMetric(
    metrics,
    "Desktop LCP"
  );

  const cls = findMetric(
    metrics,
    "Cumulative Layout Shift"
  );

  const assetReduction = findMetric(
    metrics,
    "Asset Size Reduction"
  );

  const activeLcp =
    device === "mobile"
      ? mobileLcp
      : desktopLcp;

  const assetComparison =
    getAssetComparison(
      assetReduction?.description
    );

  const handledLabels = [
    ...SCORE_LABELS,
    "Mobile LCP",
    "Desktop LCP",
    "Cumulative Layout Shift",
    "Asset Size Reduction",
  ].map(normalize);

  const additionalMetrics =
    metrics.filter(
      (metric) =>
        !handledLabels.includes(
          normalize(metric.label)
        )
    );

  // ==========================================
  // CONDITIONAL RENDERING
  // ==========================================

  if (metrics.length === 0) {
    return null;
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section
      id="project-metrics"
      aria-labelledby={`${componentId}-title`}
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-32 lg:py-36"
    >
      {/* ==================================
          BACKGROUND SYSTEM
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-[#0B0D10] via-[#13151B] to-[#1D1D28]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-20 -z-10 h-125 w-125 rounded-full bg-[#C7FF3D] opacity-[0.035] blur-[150px]"
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
              {sectionNumber} / Performance Engineering
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
              Measured.
              <br />

              <span
                style={{
                  color: project.accent,
                }}
              >
                Not assumed.
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
                Engineering Quality
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65 md:text-base">
              Engineering quality, backed by
              measurable results. Explore the
              documented performance and
              optimization outcomes of this
              project.
            </p>
          </div>
        </div>

        {/* ==================================
            PERFORMANCE OBSERVATORY
        ================================== */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#101216]">

          {/* OBSERVATORY HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <Activity
                aria-hidden="true"
                size={19}
                strokeWidth={1.5}
                style={{
                  color: project.accent,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
                Aether Performance Observatory
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                Documented Results
              </span>
            </div>
          </div>

          <div className="p-5 md:p-8">

            {/* ==============================
                DEVICE SELECTOR
            ============================== */}

            {(mobileLcp || desktopLcp) && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                  Test Environment
                </span>

                <div
                  role="group"
                  aria-label="Select test device"
                  className="inline-flex gap-1 rounded-xl border border-white/10 bg-black/20 p-1"
                >
                  <button
                    type="button"
                    disabled={!mobileLcp}
                    aria-pressed={
                      device === "mobile"
                    }
                    onClick={() =>
                      setDevice("mobile")
                    }
                    className={[
                      "flex items-center gap-2",
                      "rounded-lg px-4 py-2.5",
                      "text-xs transition-colors",
                      "focus-visible:outline-2",
                      "focus-visible:outline-white",
                      "disabled:opacity-30",
                      device === "mobile"
                        ? "bg-white text-[#0B0D10]"
                        : "text-white/55 hover:text-white",
                    ].join(" ")}
                  >
                    <Smartphone
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.6}
                    />

                    Mobile
                  </button>

                  <button
                    type="button"
                    disabled={!desktopLcp}
                    aria-pressed={
                      device === "desktop"
                    }
                    onClick={() =>
                      setDevice("desktop")
                    }
                    className={[
                      "flex items-center gap-2",
                      "rounded-lg px-4 py-2.5",
                      "text-xs transition-colors",
                      "focus-visible:outline-2",
                      "focus-visible:outline-white",
                      "disabled:opacity-30",
                      device === "desktop"
                        ? "bg-white text-[#0B0D10]"
                        : "text-white/55 hover:text-white",
                    ].join(" ")}
                  >
                    <Monitor
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.6}
                    />

                    Desktop
                  </button>
                </div>
              </div>
            )}

            {/* ==============================
                LIGHTHOUSE SCORES
            ============================== */}

            {scoreMetrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
                {scoreMetrics.map(
                  (metric, index) => (
                    <ScoreIndicator
                      key={metric.label}
                      metric={metric}
                      index={index}
                    />
                  )
                )}
              </div>
            )}

            {/* ==============================
                CORE PERFORMANCE METRICS
            ============================== */}

            {(activeLcp || cls) && (
              <div className="mt-8">

                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                    Core Performance Metrics
                  </span>

                  <Gauge
                    aria-hidden="true"
                    size={17}
                    strokeWidth={1.5}
                    className="text-white/35"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  {/* LARGEST CONTENTFUL PAINT */}

                  {activeLcp && (
                    <article className="rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C7FF3D]/20 bg-[#C7FF3D]/5 text-[#C7FF3D]">
                          <Zap
                            aria-hidden="true"
                            size={21}
                            strokeWidth={1.5}
                          />
                        </div>

                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                          LCP
                        </span>
                      </div>

                      <h3 className="mt-6 text-sm text-white/60">
                        Largest Contentful Paint
                      </h3>

                      <motion.div
                        key={`lcp-${device}`}
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 5,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration:
                            prefersReducedMotion
                              ? 0
                              : 0.2,
                        }}
                        aria-live="polite"
                      >
                        <p className="mt-3 font-display text-5xl font-medium tabular-nums tracking-[-0.06em] text-[#C7FF3D] md:text-6xl">
                          {activeLcp.value}
                        </p>

                        <p className="mt-4 text-xs leading-6 text-white/45">
                          {activeLcp.description}
                        </p>
                      </motion.div>
                    </article>
                  )}

                  {/* CUMULATIVE LAYOUT SHIFT */}

                  {cls && (
                    <article className="rounded-2xl border border-white/10 bg-white/3 p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C7FF3D]/20 bg-[#C7FF3D]/5 text-[#C7FF3D]">
                          <LayoutGrid
                            aria-hidden="true"
                            size={21}
                            strokeWidth={1.5}
                          />
                        </div>

                        <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                          CLS
                        </span>
                      </div>

                      <h3 className="mt-6 text-sm text-white/60">
                        {cls.label}
                      </h3>

                      <p className="mt-3 font-display text-5xl font-medium tabular-nums tracking-[-0.06em] text-[#C7FF3D] md:text-6xl">
                        {cls.value}
                      </p>

                      <p className="mt-4 text-xs leading-6 text-white/45">
                        {cls.description}
                      </p>
                    </article>
                  )}
                </div>
              </div>
            )}

            {/* ==============================
                ASSET OPTIMIZATION
            ============================== */}

            {assetReduction && (
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/3">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 md:px-8">
                  <div className="flex items-center gap-3">
                    <HardDrive
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.5}
                      className="text-white/50"
                    />

                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                      Asset Optimization
                    </span>
                  </div>

                  <ArrowDownRight
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#C7FF3D]"
                  />
                </div>

                <div className="grid gap-8 p-6 lg:grid-cols-12 lg:items-center md:p-8">

                  {/* REDUCTION VALUE */}

                  <div className="lg:col-span-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                      {assetReduction.label}
                    </span>

                    <p className="mt-4 font-display text-6xl font-medium tabular-nums tracking-[-0.065em] text-[#C7FF3D] md:text-7xl">
                      {assetReduction.value}
                    </p>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">
                      {assetReduction.description}
                    </p>
                  </div>

                  {/* ASSET COMPARISON */}

                  {assetComparison && (
                    <div className="space-y-7 lg:col-span-7">

                      {/* BEFORE */}

                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                            Before Optimization
                          </span>

                          <span className="font-display text-xl font-medium tabular-nums">
                            {assetComparison.before}
                          </span>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{
                              width: "0%",
                            }}
                            whileInView={{
                              width: "100%",
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration:
                                prefersReducedMotion
                                  ? 0
                                  : 0.9,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-white/30"
                          />
                        </div>
                      </div>

                      {/* AFTER */}

                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                            After Optimization
                          </span>

                          <span className="font-display text-xl font-medium tabular-nums text-[#C7FF3D]">
                            {assetComparison.after}
                          </span>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{
                              width: "0%",
                            }}
                            whileInView={{
                              width:
                                `${assetComparison.percentage}%`,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration:
                                prefersReducedMotion
                                  ? 0
                                  : 1.1,

                              delay:
                                prefersReducedMotion
                                  ? 0
                                  : 0.15,

                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-[#C7FF3D]"
                          />
                        </div>
                      </div>

                      <p className="text-xs leading-6 text-white/40">
                        Comparison of the documented
                        public asset directory sizes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ==============================
                ADDITIONAL METRICS
            ============================== */}

            {additionalMetrics.length > 0 && (
              <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {additionalMetrics.map(
                  (metric) => (
                    <article
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/3 p-6"
                    >
                      <h3 className="text-sm text-white/55">
                        {metric.label}
                      </h3>

                      <p className="mt-4 font-display text-3xl font-medium tracking-[-0.045em]">
                        {metric.value}
                      </p>

                      {metric.description && (
                        <p className="mt-3 text-xs leading-6 text-white/45">
                          {metric.description}
                        </p>
                      )}
                    </article>
                  )
                )}
              </div>
            )}
          </div>

          {/* OBSERVATORY FOOTER */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-5 md:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
              Documented Project Metrics
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
              Historical Test Results
            </span>
          </div>
        </div>

        {/* ==================================
            TESTING CONTEXT
        ================================== */}

        {project.metricsNote && (
          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <Info
              aria-hidden="true"
              size={19}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-white/45"
            />

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                Testing Context
              </h3>

              <p className="mt-3 max-w-5xl text-xs leading-7 text-white/50">
                {project.metricsNote}
              </p>
            </div>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Performance Engineering
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Measured. Not Assumed.
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
