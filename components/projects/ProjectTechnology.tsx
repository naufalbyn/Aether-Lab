
"use client";

import { useId, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  ArrowUpRight,
  Layers,
  Cpu,
  Info,
} from "lucide-react";

import TechnologyLogo from "@/components/ui/TechnologyLogo";

import {
  getTechnologies,
  getTechnologyCategories,
} from "@/data/technologies";

import type {
  TechnologyCategory,
} from "@/data/technologies";

import type { Project } from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectTechnologyProps = {
  project: Project;
};

type TechnologyFilter =
  | "All"
  | TechnologyCategory;

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

// ==========================================
// PROJECT TECHNOLOGY
// ==========================================

export default function ProjectTechnology({
  project,
}: ProjectTechnologyProps) {
  const componentId = useId();

  const prefersReducedMotion =
    useReducedMotion();

  const technologies = getTechnologies(
    project.technologies
  );

  const categories =
    getTechnologyCategories(technologies);

  const [selectedCategory, setSelectedCategory] =
    useState<TechnologyFilter>("All");

  const [selectedSlug, setSelectedSlug] =
    useState<string | null>(null);

  const activeCategory =
    selectedCategory === "All" ||
    categories.includes(selectedCategory)
      ? selectedCategory
      : "All";

  const visibleTechnologies =
    technologies.filter(
      (technology) =>
        activeCategory === "All" ||
        technology.category === activeCategory
    );

  const activeTechnology =
    visibleTechnologies.find(
      (technology) =>
        technology.slug === selectedSlug
    ) ?? visibleTechnologies[0];

  const filters: TechnologyFilter[] = [
    "All",
    ...categories,
  ];

  if (technologies.length === 0) {
    return null;
  }

  function changeCategory(
    category: TechnologyFilter
  ) {
    setSelectedCategory(category);
    setSelectedSlug(null);
  }

  return (
    <section
      id="project-technology"
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
            "linear-gradient(145deg, #0B0D10 0%, #111318 60%, #191920 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-16 -z-10 h-150 w-150 rounded-full opacity-10 blur-[150px]"
        style={{
          backgroundColor: project.accent,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-20 -z-10 hidden h-175 w-175 rounded-full border border-white/5 lg:block"
      >
        <div className="absolute inset-20 rounded-full border border-white/5" />

        <div className="absolute inset-40 rounded-full border border-white/5" />
      </div>

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
              04 / Technology Stack
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
              The tools
              <br />

              <span
                style={{
                  color: project.accent,
                }}
              >
                behind it.
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
                Engineering Toolkit
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-white/65 md:text-base">
              Explore the technologies,
              frameworks, and development tools
              documented in the project stack.
              Each serves a different purpose
              within the wider system.
            </p>
          </div>
        </div>

        {/* ==================================
            STACK SUMMARY
        ================================== */}

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
                Technologies
              </span>

              <Cpu
                aria-hidden="true"
                size={20}
                strokeWidth={1.4}
                style={{
                  color: project.accent,
                }}
              />
            </div>

            <div
              className="mt-5 font-display text-4xl font-medium tabular-nums tracking-[-0.055em] md:text-6xl"
              style={{
                color: project.accent,
              }}
            >
              {formatNumber(
                technologies.length
              )}
            </div>

            <p className="mt-3 text-xs leading-6 text-white/45">
              Documented stack entries.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
                Categories
              </span>

              <Layers
                aria-hidden="true"
                size={20}
                strokeWidth={1.4}
                className="text-white/65"
              />
            </div>

            <div className="mt-5 font-display text-4xl font-medium tabular-nums tracking-[-0.055em] md:text-6xl">
              {formatNumber(
                categories.length
              )}
            </div>

            <p className="mt-3 text-xs leading-6 text-white/45">
              Areas of technology.
            </p>
          </div>
        </div>

        {/* ==================================
            TECHNOLOGY FILTERS
        ================================== */}

        <div className="mt-12 flex flex-col gap-5 border-y border-white/10 py-5 lg:mt-16">
          <div
            role="group"
            aria-label="Filter technologies by category"
            className="flex flex-wrap items-center gap-2"
          >
            {filters.map((category) => {
              const isActive =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={`${componentId}-grid`}
                  onClick={() =>
                    changeCategory(category)
                  }
                  className={[
                    "rounded-full border px-4 py-2.5",
                    "text-xs font-medium",
                    "transition-colors duration-300",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-4",
                    "focus-visible:outline-[#C7FF3D]",
                    isActive
                      ? "border-white bg-white text-[#0B0D10]"
                      : "border-white/15 bg-white/3 text-white/55 hover:border-white/35 hover:text-white",
                  ].join(" ")}
                >
                  {category === "All"
                    ? "All Technologies"
                    : category}
                </button>
              );
            })}
          </div>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45"
          >
            Showing{" "}
            {formatNumber(
              visibleTechnologies.length
            )}
            {" / "}
            {formatNumber(
              technologies.length
            )}
            {" "}Technologies
          </p>
        </div>

        {/* ==================================
            TECHNOLOGY EXPLORER
        ================================== */}

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-12">

          {/* TECHNOLOGY GRID */}

          <div className="min-w-0 lg:col-span-8">
            <motion.ul
              id={`${componentId}-grid`}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
            >
              {visibleTechnologies.map(
                (technology) => {
                  const isActive =
                    activeTechnology?.slug ===
                    technology.slug;

                  return (
                    <motion.li
                      key={technology.slug}
                      layout={
                        prefersReducedMotion
                          ? false
                          : "position"
                      }
                      initial={false}
                      transition={{
                        duration:
                          prefersReducedMotion
                            ? 0
                            : 0.3,
                      }}
                      className="min-w-0"
                    >
                      <button
                        type="button"
                        aria-pressed={isActive}
                        aria-controls={`${componentId}-inspector`}
                        onClick={() =>
                          setSelectedSlug(
                            technology.slug
                          )
                        }
                        className={[
                          "group relative isolate",
                          "flex h-full min-h-46 w-full",
                          "flex-col items-center",
                          "justify-center overflow-hidden",
                          "rounded-2xl border",
                          "px-3 py-6 text-center",
                          "transition-colors duration-300",
                          "focus-visible:outline-2",
                          "focus-visible:outline-offset-4",
                          "focus-visible:outline-[#C7FF3D]",
                          isActive
                            ? "bg-white/5"
                            : "bg-white/2 hover:bg-white/5",
                        ].join(" ")}
                        style={{
                          borderColor: isActive
                            ? technology.color
                            : "#FFFFFF18",
                        }}
                      >
                        {/* Decorative Glow */}

                        <span
                          aria-hidden="true"
                          className={[
                            "pointer-events-none",
                            "absolute left-1/2 top-1/2",
                            "-z-10 h-28 w-28",
                            "-translate-x-1/2",
                            "-translate-y-1/2",
                            "rounded-full blur-[65px]",
                            "transition-opacity duration-500",
                            isActive
                              ? "opacity-15"
                              : "opacity-0 group-hover:opacity-10",
                          ].join(" ")}
                          style={{
                            backgroundColor:
                              technology.color,
                          }}
                        />

                        {/* Selected Indicator */}

                        <span
                          aria-hidden="true"
                          className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full transition-opacity duration-300"
                          style={{
                            backgroundColor:
                              technology.color,

                            opacity: isActive
                              ? 1
                              : 0,
                          }}
                        />

                        {/* Technology Logo */}

                        <div className="transition-transform duration-300 motion-safe:group-hover:scale-110">
                          <TechnologyLogo
                            technology={technology}
                            size={40}
                            showBackground
                          />
                        </div>

                        {/* Technology Information */}

                        <span className="mt-5 wrap-break-word font-display text-sm font-medium leading-5 text-white/90">
                          {technology.name}
                        </span>

                        <span className="mt-2 font-mono text-[8px] uppercase leading-4 tracking-widest text-white/45">
                          {technology.category}
                        </span>
                      </button>
                    </motion.li>
                  );
                }
              )}
            </motion.ul>
          </div>

          {/* ==================================
              TECHNOLOGY INSPECTOR
          ================================== */}

          <div
            id={`${componentId}-inspector`}
            className="min-w-0 rounded-3xl border border-white/10 bg-white/3 p-6 md:p-8 lg:col-span-4"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
                Technology Inspector
              </span>

              <Cpu
                aria-hidden="true"
                size={17}
                strokeWidth={1.4}
                className="text-white/40"
              />
            </div>

            {activeTechnology && (
              <motion.div
                key={activeTechnology.slug}
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 8,
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
                      : 0.25,
                }}
              >
                {/* Large Logo */}

                <div className="mt-8">
                  <TechnologyLogo
                    technology={
                      activeTechnology
                    }
                    size={56}
                    showBackground
                  />
                </div>

                {/* Technology Details */}

                <div
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span
                    className="mt-8 block font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{
                      color:
                        activeTechnology.color,
                    }}
                  >
                    {activeTechnology.category}
                  </span>

                  <h3 className="mt-3 wrap-break-word font-display text-[clamp(1.8rem,3vw,3rem)] font-medium leading-tight tracking-[-0.055em]">
                    {activeTechnology.name}
                  </h3>

                  <p className="mt-5 text-sm leading-8 text-white/65">
                    {activeTechnology.description}
                  </p>
                </div>

                {/* Project Context */}

                <div className="mt-8 border-t border-white/10 pt-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                    Documented in
                  </span>

                  <p className="mt-3 font-display text-lg tracking-tight text-white/80">
                    {project.title}
                  </p>
                </div>

                {/* Official Resources */}

                {activeTechnology.website && (
                  <a
                    href={activeTechnology.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 flex items-center justify-between gap-4 rounded-xl border border-white/15 px-4 py-4 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                  >
                    <span>
                      Official Resources
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.4}
                      className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* ==================================
            TECHNOLOGY CONTEXT
        ================================== */}

        {project.technologyNote && (
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-5 md:p-6">
            <Info
              aria-hidden="true"
              size={20}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0"
              style={{
                color: project.accent,
              }}
            />

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                Technology Context
              </h3>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-white/55">
                {project.technologyNote}
              </p>
            </div>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Technology Stack
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              Built with Intention
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
