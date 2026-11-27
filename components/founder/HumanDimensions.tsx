
"use client";

import { useId, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  BrainCircuit,
  Route,
  Layers3,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  founderValues,
  founderPhilosophy,
  founderDomains,
  founderVision,
  getFounderArchiveGroups,
  getFounderVentures,
} from "@/data/founder";

// ==========================================
// DIMENSION CONFIGURATION
// ==========================================

const dimensions = [
  {
    id: "mind",
    number: "01",
    title: "The Mind",
    subtitle: "Philosophy & Values",
    description:
      "The principles and perspectives behind meaningful creation.",
    accent: "#A78BFA",
    icon: BrainCircuit,
  },
  {
    id: "journey",
    number: "02",
    title: "The Journey",
    subtitle: "Experience & Growth",
    description:
      "Experiences that continue to shape an evolving identity.",
    accent: "#817BFF",
    icon: Route,
  },
  {
    id: "work",
    number: "03",
    title: "The Work",
    subtitle: "Engineering & Ventures",
    description:
      "Exploring the intersection of ideas, technology, and entrepreneurship.",
    accent: "#1EC1CB",
    icon: Layers3,
  },
  {
    id: "future",
    number: "04",
    title: "The Future",
    subtitle: "Ambition & Vision",
    description:
      "A continuing pursuit of meaningful progress and new possibilities.",
    accent: "#C7FF3D",
    icon: Compass,
  },
] as const;

type DimensionId =
  (typeof dimensions)[number]["id"];

// ==========================================
// DIMENSION CONTENT
// ==========================================

function DimensionContent({
  id,
  accent,
}: {
  id: DimensionId;
  accent: string;
}) {
  switch (id) {
    case "mind":
      return (
        <div>
          <p className="font-display text-xl leading-relaxed tracking-tight text-white/90 md:text-2xl">
            {founderPhilosophy.headline}
          </p>

          <p className="mt-4 text-sm leading-7 text-white/60">
            {founderPhilosophy.description}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {founderValues.map((value) => (
              <article
                key={value.slug}
                className="rounded-lg border border-white/10 bg-white/2.5 p-4 md:p-5"
              >
                <span
                  className="font-mono text-[9px]"
                  style={{ color: accent }}
                >
                  {value.number}
                </span>

                <h4 className="mt-3 font-display text-lg font-medium tracking-tight">
                  {value.title}
                </h4>

                <p className="mt-3 text-xs leading-6 text-white/60 md:text-sm">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      );

    case "journey":
      return (
        <div>
          <div className="space-y-3">
            {getFounderArchiveGroups().map((group) => (
              <article
                key={group.id}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-5 pt-2"
              >
                <div className="min-w-0">
                  <h4 className="font-display text-xl font-medium tracking-tight">
                    {group.title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {group.description}
                  </p>
                </div>

                <span
                  className="shrink-0 font-mono text-[10px]"
                  style={{ color: accent }}
                >
                  {String(group.entries.length).padStart(
                    2,
                    "0"
                  )}
                </span>
              </article>
            ))}
          </div>

          <a
            href="#founder-human-archive"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ color: accent }}
          >
            Explore the complete journey

            <ArrowDownRight
              size={16}
              aria-hidden="true"
            />
          </a>
        </div>
      );

    case "work":
      return (
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            {founderDomains.map((domain) => (
              <article
                key={domain.slug}
                className="rounded-lg border border-white/10 bg-white/2.5 p-5"
              >
                <h4
                  className="font-display text-xl font-medium tracking-tight"
                  style={{ color: accent }}
                >
                  {domain.title}
                </h4>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  {domain.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {domain.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/65"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {getFounderVentures().length > 0 && (
            <a
              href="#founder-human-archive"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{ color: accent }}
            >
              Explore the ventures in the archive

              <ArrowDownRight
                size={16}
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      );

    case "future":
      return (
        <div>
          <h4 className="font-display text-3xl font-medium leading-tight tracking-tighter md:text-4xl">
            {founderVision.first}

            <span
              className="mt-2 block"
              style={{ color: accent }}
            >
              {founderVision.second}
            </span>
          </h4>

          <div className="mt-7 space-y-5 text-sm leading-7 text-white/65">
            {founderVision.paragraphs.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}
          </div>

          <a
            href="#founder-human-vision"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ color: accent }}
          >
            Discover the long-term vision

            <ArrowDownRight
              size={16}
              aria-hidden="true"
            />
          </a>
        </div>
      );
  }
}

// ==========================================
// LEGACY DIMENSIONS
// ==========================================

export default function HumanDimensions() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const contentRef =
    useRef<HTMLDivElement>(null);

  const panelId = useId();

  const reducedMotion =
    useReducedMotion();

  const active =
    dimensions[activeIndex];

  const ActiveIcon =
    active.icon;

  function selectDimension(index: number) {
    setActiveIndex(index);

    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }

  function navigate(direction: number) {
    const length = dimensions.length;

    selectDimension(
      (activeIndex + direction + length) %
        length
    );
  }

  return (
    <div className="min-w-0">
      {/* Dimension navigation */}

      <div
        role="group"
        aria-label="Explore founder dimensions"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dimensions.map((dimension, index) => {
          const Icon = dimension.icon;

          const selected =
            index === activeIndex;

          return (
            <button
              key={dimension.id}
              type="button"
              aria-pressed={selected}
              aria-controls={panelId}
              onClick={() =>
                selectDimension(index)
              }
              className="group relative isolate flex min-h-44 min-w-0 flex-col justify-between gap-7 overflow-hidden rounded-xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46FF] md:min-h-52 md:p-7"
              style={{
                borderColor: selected
                  ? "#4F46FF"
                  : "rgba(0,0,0,0.12)",

                backgroundColor: selected
                  ? "#0B0D10"
                  : "#FFFFFF",

                color: selected
                  ? "#FFFFFF"
                  : "#0B0D10",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    color: selected
                      ? dimension.accent
                      : "#4F46FF",

                    borderColor: selected
                      ? `${dimension.accent}35`
                      : "#4F46FF20",

                    backgroundColor: selected
                      ? `${dimension.accent}0D`
                      : "#4F46FF08",
                  }}
                >
                  <Icon
                    size={25}
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </div>

                <span
                  className={`font-mono text-[9px] ${
                    selected
                      ? "text-white/45"
                      : "text-black/40"
                  }`}
                >
                  {dimension.number}
                </span>
              </div>

              <div>
                <span className="block font-display text-2xl font-medium leading-tight tracking-[-0.045em] md:text-3xl">
                  {dimension.title}
                </span>

                <span
                  className={`mt-2 block text-xs leading-5 ${
                    selected
                      ? "text-white/55"
                      : "text-black/55"
                  }`}
                >
                  {dimension.subtitle}
                </span>
              </div>

              <ArrowUpRight
                size={17}
                strokeWidth={1.3}
                aria-hidden="true"
                className={`absolute bottom-6 right-5 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1 ${
                  selected
                    ? "text-white/45"
                    : "text-black/30"
                }`}
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left transition-transform duration-300 motion-reduce:transition-none"
                style={{
                  backgroundColor:
                    dimension.accent,

                  transform: selected
                    ? "scaleX(1)"
                    : "scaleX(0)",
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Dimension detail panel */}

      <div
        id={panelId}
        className="relative isolate mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D10] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 h-100 w-100 rounded-full"
          style={{
            background:
              `radial-gradient(circle, ${active.accent}18, transparent 70%)`,
          }}
        />

        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-9">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor:
                  active.accent,
              }}
            />

            <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
              Identity / Dimension
            </span>
          </div>

          <span
            className="font-mono text-[10px]"
            style={{ color: active.accent }}
          >
            {active.number} / 04
          </span>
        </div>

        <div
          ref={contentRef}
          data-human-dimension-content
          data-lenis-prevent
          aria-live="polite"
          tabIndex={0}
          role="region"
          aria-label={`${active.title} details`}
          className="h-110 min-w-0 overflow-y-auto overscroll-contain p-5 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#817BFF] md:h-115 md:p-9"
        >
          <AnimatePresence
            initial={false}
            mode="wait"
          >
            <motion.div
              key={active.id}
              initial={{
                opacity: 0,
                y: reducedMotion ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: reducedMotion
                  ? 0
                  : 0.22,
              }}
            >
              <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
                <div className="min-w-0 lg:col-span-4">
                  <ActiveIcon
                    size={42}
                    strokeWidth={1.1}
                    aria-hidden="true"
                    style={{
                      color: active.accent,
                    }}
                  />

                  <span
                    className="mt-6 block font-mono text-[9px] uppercase tracking-wider"
                    style={{
                      color: active.accent,
                    }}
                  >
                    {active.subtitle}
                  </span>

                  <h3 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.06em]">
                    {active.title}
                  </h3>

                  <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
                    {active.description}
                  </p>
                </div>

                <div className="min-w-0 border-t border-white/10 pt-7 lg:col-span-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <DimensionContent
                    id={active.id}
                    accent={active.accent}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-9">
          <button
            type="button"
            aria-label="Previous dimension"
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
          >
            <ChevronLeft
              size={20}
              aria-hidden="true"
            />
          </button>

          <div
            role="group"
            aria-label="Dimension navigation"
            className="flex items-center gap-2"
          >
            {dimensions.map((dimension, index) => (
              <button
                key={dimension.id}
                type="button"
                aria-label={
                  `Select ${dimension.title}`
                }
                aria-pressed={
                  index === activeIndex
                }
                onClick={() =>
                  selectDimension(index)
                }
                className="flex h-10 w-8 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      index === activeIndex
                        ? active.accent
                        : "#FFFFFF30",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next dimension"
            onClick={() => navigate(1)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
          >
            <ChevronRight
              size={20}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
