
"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  ArrowRight,
  Orbit,
  Plus,
  Search,
  X,
  Layers3,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Network,
  Compass,
  Pause,
  Play,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "motion/react";

import { useRef } from "react";

import Reveal from "@/components/ui/Reveal";
import TechnologyLogo from "@/components/ui/TechnologyLogo";

import {
  getAllTechnologies,
  getTechnologies,
  type Technology,
  type TechnologyCategory,
} from "@/data/technologies";

import { getAllProjects } from "@/data/projects";

// ==========================================
// DATA REGISTRY
// ==========================================

const technologies = getAllTechnologies();
const projects = getAllProjects();

const projectStacks = projects.map((project) => ({
  project,
  slugs: new Set(
    getTechnologies(project.technologies).map(
      (technology) => technology.slug
    )
  ),
}));

const connections = new Map(
  technologies.map((technology) => [
    technology.slug,
    projectStacks
      .filter(({ slugs }) =>
        slugs.has(technology.slug)
      )
      .map(({ project }) => project),
  ])
);

// ==========================================
// CATEGORY GROUPS
// ==========================================

type FilterId =
  | "all"
  | "software"
  | "blockchain"
  | "data"
  | "motion"
  | "infrastructure"
  | "ai";

type TechnologyFilter = {
  id: FilterId;
  label: string;
  categories?: TechnologyCategory[];
};

const filters: TechnologyFilter[] = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "software",
    label: "Web & Software",
    categories: [
      "Framework",
      "Frontend",
      "Language",
      "Backend",
      "Styling",
      "State Management",
    ],
  },
  {
    id: "blockchain",
    label: "Blockchain",
    categories: [
      "Blockchain",
      "Authentication",
    ],
  },
  {
    id: "data",
    label: "Data Systems",
    categories: ["Database"],
  },
  {
    id: "motion",
    label: "Motion & 3D",
    categories: [
      "Animation",
      "Graphics",
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    categories: [
      "Development Tools",
      "Deployment",
      "Asset Optimization",
      "Other",
    ],
  },
  {
    id: "ai",
    label: "Intelligence",
    categories: [
      "Artificial Intelligence",
    ],
  },
];

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function matchesFilter(
  technology: Technology,
  filter: TechnologyFilter
) {
  return (
    filter.id === "all" ||
    Boolean(
      filter.categories?.includes(
        technology.category
      )
    )
  );
}

function getRelatedTechnologies(
  activeTechnology: Technology
) {
  return technologies
    .filter(
      (technology) =>
        technology.slug !==
        activeTechnology.slug
    )
    .map((technology) => {
      const sharedProjects =
        projectStacks.filter(({ slugs }) =>
          slugs.has(activeTechnology.slug) &&
          slugs.has(technology.slug)
        );

      return {
        technology,
        sharedCount: sharedProjects.length,
      };
    })
    .filter(
      (item) => item.sharedCount > 0
    )
    .sort(
      (first, second) =>
        second.sharedCount -
          first.sharedCount ||
        first.technology.name.localeCompare(
          second.technology.name
        )
    );
}

function getOrbitPosition(
  index: number,
  total: number
) {
  const angle =
    (index / total) * Math.PI * 2 -
    Math.PI / 2;

  return {
    x: 50 + Math.cos(angle) * 36,
    y: 50 + Math.sin(angle) * 36,
  };
}

// ==========================================
// ORBITAL NODE
// ==========================================

type AtlasNodeProps = {
  technology: Technology;
  sharedCount: number;
  index: number;
  total: number;
  onSelect: () => void;
};

function AtlasNode({
  technology,
  sharedCount,
  index,
  total,
  onSelect,
}: AtlasNodeProps) {
  const position = getOrbitPosition(
    index,
    total
  );

  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <div className="aether-atlas-counter-rotation relative">
        <motion.div
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.85,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.25,
          }}
        >
          <button
            type="button"
            onClick={onSelect}
            aria-label={`Explore ${technology.name}`}
            title={`${technology.name} - ${sharedCount} shared project${sharedCount === 1 ? "" : "s"}`}
            className={[
              "pointer-events-auto group relative",
              "flex h-10 w-10 items-center justify-center",
              "rounded-full border bg-[#171A23]",
              "transition-[border-color,box-shadow]",
              "duration-300",
              "focus-visible:outline-2",
              "focus-visible:outline-offset-4",
              "focus-visible:outline-[#C7FF3D]",
              "sm:h-14 sm:w-14",
              "lg:h-16 lg:w-16",
            ].join(" ")}
            style={{
              borderColor: `${technology.color}66`,
              boxShadow: `0 0 18px ${technology.color}08`,
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1.5 rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{
                borderColor: `${technology.color}55`,
              }}
            />

            <TechnologyLogo
              technology={technology}
              size={24}
              className="transition-transform duration-300 motion-safe:group-hover:scale-110"
            />

            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border border-white/15 bg-[#101218] px-1 font-mono text-[8px] text-white/75"
            >
              {sharedCount}
            </span>
          </button>
        </motion.div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-full mt-2 w-20 -translate-x-1/2 text-center font-mono text-[7px] leading-tight text-white/60 sm:w-24 sm:text-[8px]"
        >
          {technology.name}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// DYNAMIC ORBITAL VISUALIZATION
// ==========================================

type AtlasOrbitProps = {
  technology: Technology;
  onSelect: (slug: string) => void;
};

function AtlasOrbit({
  technology,
  onSelect,
}: AtlasOrbitProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);

  const isInView = useInView(stageRef);

  const reducedMotion = useReducedMotion();

  const gradientId = useId();

  const relatedTechnologies =
    getRelatedTechnologies(technology);

  const orbitalNodes =
    relatedTechnologies.slice(0, 6);

  const hasConnections =
    orbitalNodes.length > 0;

  const shouldPause =
    isPaused ||
    !isInView ||
    Boolean(reducedMotion) ||
    !hasConnections;

  return (
    <div className="min-w-0 border-b border-white/10 lg:border-b-0 lg:border-r">

      {/* ==================================
          SHARED ORBITAL ANIMATION
      ================================== */}

      <style>{`
        @property --aether-atlas-orbit-angle {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        @keyframes aether-atlas-orbit-spin {
          from {
            --aether-atlas-orbit-angle: 0deg;
          }

          to {
            --aether-atlas-orbit-angle: 360deg;
          }
        }

        @keyframes aether-atlas-connection-flow {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -54;
          }
        }

        .aether-atlas-rotating-layer {
          animation:
            aether-atlas-orbit-spin
            90s
            linear
            infinite;

          transform:
            rotate(var(--aether-atlas-orbit-angle, 0deg));

          transform-origin: center;
        }

        .aether-atlas-counter-rotation {
          transform:
            rotate(calc(-1 * var(--aether-atlas-orbit-angle, 0deg)));

          transform-origin: center;
        }

        .aether-atlas-flow {
          animation:
            aether-atlas-connection-flow
            4s
            linear
            infinite;
        }

        .aether-atlas-paused
        .aether-atlas-rotating-layer,

        .aether-atlas-paused
        .aether-atlas-flow,

        .aether-atlas-stage:hover
        .aether-atlas-rotating-layer,

        .aether-atlas-stage:hover
        .aether-atlas-flow,

        .aether-atlas-stage:focus-within
        .aether-atlas-rotating-layer,

        .aether-atlas-stage:focus-within
        .aether-atlas-flow {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .aether-atlas-rotating-layer {
            animation: none !important;
            --aether-atlas-orbit-angle: 0deg;
          }

          .aether-atlas-flow {
            animation: none !important;
          }
        }
      `}</style>

      {/* ==================================
          ORBIT HEADER
      ================================== */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-7">
        <div className="flex items-center gap-3">
          <Orbit
            aria-hidden="true"
            size={19}
            strokeWidth={1.5}
            className="text-[#C7FF3D]"
          />

          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
              Dynamic Technology Orbit
            </span>

            <p className="mt-1 font-mono text-[9px] text-white/35">
              {formatNumber(orbitalNodes.length)}
              {" "}Related Nodes
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={
            Boolean(reducedMotion) ||
            !hasConnections
          }
          onClick={() =>
            setIsPaused((value) => !value)
          }
          aria-label={
            isPaused
              ? "Resume orbital animation"
              : "Pause orbital animation"
          }
          title={
            reducedMotion
              ? "Reduced motion enabled"
              : isPaused
                ? "Resume orbit"
                : "Pause orbit"
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D] disabled:cursor-not-allowed disabled:opacity-30"
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

      {/* ==================================
          ORBITAL STAGE
      ================================== */}

      <div
        ref={stageRef}
        className={[
          "aether-atlas-stage",
          shouldPause
            ? "aether-atlas-paused"
            : "",
          "relative isolate overflow-hidden",
          "bg-[#0D1017]",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[42px_42px]"
        />

        <div className="relative mx-auto aspect-square w-full max-w-155">

          {/* ==================================
              STATIC BACKGROUND
          ================================== */}

          <svg
            aria-hidden="true"
            viewBox="0 0 600 600"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <radialGradient id={gradientId}>
                <stop
                  offset="0%"
                  stopColor={technology.color}
                  stopOpacity="0.16"
                />

                <stop
                  offset="100%"
                  stopColor={technology.color}
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>

            <circle
              cx="300"
              cy="300"
              r="280"
              fill={`url(#${gradientId})`}
            />

            <path
              d="M300 24 V576 M24 300 H576"
              stroke="#FFFFFF"
              strokeOpacity="0.045"
            />

            {[100, 160, 216, 270].map(
              (radius, index) => (
                <circle
                  key={radius}
                  cx="300"
                  cy="300"
                  r={radius}
                  fill="none"
                  stroke={
                    index === 2
                      ? technology.color
                      : "#FFFFFF"
                  }
                  strokeOpacity={
                    index === 2 ? 0.24 : 0.08
                  }
                  strokeDasharray={
                    index % 2 === 0
                      ? "none"
                      : "3 8"
                  }
                />
              )
            )}

            <ellipse
              cx="300"
              cy="300"
              rx="255"
              ry="165"
              transform="rotate(-25 300 300)"
              stroke={technology.color}
              strokeOpacity="0.07"
              fill="none"
            />

            {Array.from(
              { length: 32 },
              (_, index) => (
                <circle
                  key={index}
                  cx={(index * 137 + 41) % 600}
                  cy={(index * 83 + 29) % 600}
                  r={index % 6 === 0 ? 1.3 : 0.6}
                  fill="#FFFFFF"
                  opacity={
                    index % 6 === 0 ? 0.35 : 0.12
                  }
                />
              )
            )}
          </svg>

          {/* ==================================
              ROTATING ORBITAL LAYER
          ================================== */}

          <div className="aether-atlas-rotating-layer pointer-events-none absolute inset-0 z-10">

            {/* Rotating Connections */}

            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              {orbitalNodes.map((item, index) => {
                const position =
                  getOrbitPosition(
                    index,
                    orbitalNodes.length
                  );

                return (
                  <g key={item.technology.slug}>
                    <line
                      x1="300"
                      y1="300"
                      x2={position.x * 6}
                      y2={position.y * 6}
                      stroke={technology.color}
                      strokeWidth="1.2"
                      strokeOpacity="0.28"
                    />

                    <line
                      x1="300"
                      y1="300"
                      x2={position.x * 6}
                      y2={position.y * 6}
                      stroke={technology.color}
                      strokeWidth="1.5"
                      strokeDasharray="3 24"
                      strokeLinecap="round"
                      opacity="0.65"
                      className="aether-atlas-flow"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Rotating Technology Nodes */}

            {orbitalNodes.map((item, index) => (
              <AtlasNode
                key={item.technology.slug}
                technology={item.technology}
                sharedCount={item.sharedCount}
                index={index}
                total={orbitalNodes.length}
                onSelect={() =>
                  onSelect(item.technology.slug)
                }
              />
            ))}
          </div>

          {/* ==================================
              STATIONARY ACTIVE CORE
          ================================== */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">

            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-full border"
              style={{
                borderColor: `${technology.color}20`,
              }}
            />

            <div
              className="relative flex h-full w-full items-center justify-center rounded-full border bg-[#171A23] transition-[border-color,box-shadow] duration-500"
              style={{
                borderColor: `${technology.color}80`,
                boxShadow: `0 0 60px ${technology.color}18`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={technology.slug}
                  initial={{
                    opacity: 0,
                    scale: reducedMotion ? 1 : 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                  }}
                  className="flex items-center justify-center"
                >
                  <TechnologyLogo
                    technology={technology}
                    size={44}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pointer-events-none absolute top-full mt-4 whitespace-nowrap text-center">
              <span
                className="font-mono text-[8px] uppercase tracking-[0.15em]"
                style={{
                  color: technology.color,
                }}
              >
                Active Core
              </span>
            </div>
          </div>

          {/* Stage Metadata */}

          <span className="pointer-events-none absolute left-4 top-4 font-mono text-[8px] uppercase tracking-wide text-white/20 sm:left-5 sm:top-5">
            Atlas / Origin
          </span>

          <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[8px] tracking-wide text-white/20 sm:bottom-5 sm:right-5">
            Orbital Cycle / 90s
          </span>
        </div>

        {!hasConnections && (
          <div className="mx-auto max-w-xs px-5 pb-8 text-center">
            <p className="text-xs leading-6 text-white/45">
              No documented shared-project
              technology connections yet.
            </p>
          </div>
        )}
      </div>

      {/* ==================================
          ORBIT FOOTER
      ================================== */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-7">
        <div className="flex items-center gap-2">
          <span
            className="h-px w-6"
            style={{
              backgroundColor: `${technology.color}80`,
            }}
          />

          <span className="font-mono text-[8px] uppercase tracking-wide text-white/40">
            Shared Project Connection
          </span>
        </div>

        <span className="font-mono text-[8px] uppercase tracking-wide text-white/35">
          {relatedTechnologies.length}
          {" "}Total Related
        </span>
      </div>

      {/* ANIMATION STATUS */}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/1.5 px-5 py-3 md:px-7">
        <span className="font-mono text-[8px] uppercase tracking-wide text-white/35">
          Hover or focus to pause
        </span>

        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor:
                shouldPause
                  ? "#FBBF24"
                  : "#C7FF3D",
            }}
          />

          <span className="font-mono text-[8px] uppercase tracking-wide text-white/45">
            {reducedMotion
              ? "Reduced Motion"
              : !hasConnections
                ? "No Connections"
                : isPaused
                  ? "Orbit Paused"
                  : !isInView
                    ? "Orbit Standby"
                    : "Orbit Enabled"}
          </span>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// TECHNOLOGY DIRECTORY CARD
// ==========================================

type DirectoryNodeProps = {
  technology: Technology;
  active: boolean;
  onSelect: () => void;
};

function DirectoryNode({
  technology,
  active,
  onSelect,
}: DirectoryNodeProps) {
  const projectCount =
    connections.get(
      technology.slug
    )?.length ?? 0;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={[
        "group relative flex h-full min-h-30",
        "w-full min-w-0 flex-col",
        "items-start justify-between gap-4",
        "overflow-hidden rounded-2xl border",
        "p-3 text-left sm:min-h-36 sm:p-4",
        "transition-[border-color,background-color,box-shadow]",
        "duration-300",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-3",
        "focus-visible:outline-[#4F46FF]",
        active
          ? "border-[#4F46FF]/70 bg-white shadow-[0_8px_24px_rgba(79,70,255,0.07)]"
          : "border-black/10 bg-white/40 hover:border-black/25 hover:bg-white",
      ].join(" ")}
    >
      <div className="flex w-full items-start justify-between gap-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#171920] sm:h-12 sm:w-12">
          <TechnologyLogo
            technology={technology}
            size={25}
            className="transition-transform duration-300 motion-safe:group-hover:scale-110"
          />
        </span>

        <ArrowUpRight
          aria-hidden="true"
          size={14}
          strokeWidth={1.5}
          className={[
            "shrink-0 transition-colors",
            active
              ? "text-[#4F46FF]"
              : "text-black/25 group-hover:text-black/60",
          ].join(" ")}
        />
      </div>

      <div className="w-full">
        <h3 className="wrap-break-word font-display text-sm font-medium leading-snug tracking-tight text-[#0B0D10] sm:text-base">
          {technology.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
          <span className="font-mono text-[8px] uppercase leading-4 tracking-wide text-black/45">
            {technology.category}
          </span>

          {projectCount > 0 && (
            <span className="font-mono text-[9px] text-black/50">
              {formatNumber(projectCount)}
            </span>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#4F46FF] transition-transform duration-300"
        style={{
          transform: active
            ? "scaleX(1)"
            : "scaleX(0)",
        }}
      />
    </button>
  );
}

// ==========================================
// TECHNOLOGY ATLAS
// ==========================================

export default function TechnologyAtlas() {
  const [activeSlug, setActiveSlug] =
    useState("react");

  const [activeFilter, setActiveFilter] =
    useState<FilterId>("all");

  const [search, setSearch] =
    useState("");

  const [showAll, setShowAll] =
    useState(false);

  const reducedMotion =
    useReducedMotion();

  const selectId = useId();

  const activeTechnology =
    technologies.find(
      (technology) =>
        technology.slug === activeSlug
    ) ?? technologies[0];

  const activeIndex =
    technologies.findIndex(
      (technology) =>
        technology.slug ===
        activeTechnology.slug
    );

  const connectedProjects =
    connections.get(
      activeTechnology.slug
    ) ?? [];

  const filteredTechnologies =
    useMemo(() => {
      const filter =
        filters.find(
          (item) => item.id === activeFilter
        ) ?? filters[0];

      const query =
        search.trim().toLowerCase();

      return technologies.filter(
        (technology) => {
          const matchesCategory =
            matchesFilter(
              technology,
              filter
            );

          const matchesSearch =
            !query ||
            technology.name
              .toLowerCase()
              .includes(query) ||
            technology.category
              .toLowerCase()
              .includes(query) ||
            technology.description
              .toLowerCase()
              .includes(query);

          return (
            matchesCategory &&
            matchesSearch
          );
        }
      );
    }, [activeFilter, search]);

  const directoryLimit = 12;

  const visibleTechnologies =
    showAll
      ? filteredTechnologies
      : filteredTechnologies.slice(
          0,
          directoryLimit
        );

  // ========================================
  // INTERACTION
  // ========================================

  function selectTechnology(slug: string) {
    setActiveSlug(slug);
  }

  function navigateTechnology(
    direction: number
  ) {
    const nextIndex =
      (
        activeIndex +
        direction +
        technologies.length
      ) % technologies.length;

    selectTechnology(
      technologies[nextIndex].slug
    );
  }

  function resetDirectory() {
    setActiveFilter("all");
    setSearch("");
    setShowAll(false);
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <section
      id="technology"
      aria-labelledby="technology-atlas-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] py-24 text-[#0B0D10] md:py-36 lg:py-44"
    >
      {/* ==================================
          AMBIENT BACKGROUND
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-20 -z-10 hidden h-200 w-200 rounded-full border border-black/5 lg:block"
      >
        <div className="absolute inset-16 rounded-full border border-black/[0.035]" />

        <div className="absolute inset-32 rounded-full border border-[#4F46FF]/5" />

        <div className="absolute inset-48 rounded-full border border-black/2.5" />
      </div>

      <div className="aether-container relative">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#4F46FF]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
                06 / Technology
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-black/35 sm:block">
                Technology Atlas
              </span>

              <Plus
                aria-hidden="true"
                size={17}
                strokeWidth={1}
                className="text-black/35"
              />
            </div>
          </div>

          <div className="grid gap-8 pb-14 pt-12 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-20">
            <h2
              id="technology-atlas-title"
              className="font-display text-[clamp(2.8rem,7vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em] lg:col-span-8"
            >
              The tools
              <br />

              <span className="text-[#4F46FF]">
                behind the build.
              </span>
            </h2>

            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#4F46FF]" />

                <span className="font-mono text-[9px] uppercase tracking-wide text-black/45">
                  Connected Systems
                </span>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-7 text-black/60 md:text-base md:leading-8">
                An atlas of technologies,
                connected through documented
                projects and continuous exploration.
                The right tools for the right systems.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ==================================
            DARK ATLAS WORKSPACE
        ================================== */}

        <div className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-[#0B0D10] text-white">

          {/* WORKSPACE HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <Compass
                aria-hidden="true"
                size={20}
                strokeWidth={1.5}
                className="text-[#C7FF3D]"
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Aether / Technology Atlas
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[9px] uppercase tracking-wide text-white/45">
                {formatNumber(technologies.length)}
                {" "}Registered Technologies
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12">

            {/* ==================================
                ORBIT WORKSPACE
            ================================== */}

            <div className="min-w-0 lg:col-span-7">
              <AtlasOrbit
                technology={activeTechnology}
                onSelect={selectTechnology}
              />
            </div>

            {/* ==================================
                TECHNOLOGY INSPECTOR
            ================================== */}

            <div className="flex min-h-0 min-w-0 flex-col lg:col-span-5">

              {/* INSPECTOR HEADER */}

              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-7">
                <div className="flex items-center gap-3">
                  <Layers3
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.5}
                    className="text-white/45"
                  />

                  <span className="font-mono text-[10px] uppercase tracking-wide text-white/50">
                    Technology Inspector
                  </span>
                </div>

                <span className="font-mono text-[9px] text-white/35">
                  {formatNumber(activeIndex + 1)}
                  {" / "}
                  {formatNumber(technologies.length)}
                </span>
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-5 md:p-8">

                {/* DIRECT SELECTION */}

                <label
                  htmlFor={selectId}
                  className="font-mono text-[9px] uppercase tracking-wide text-white/45"
                >
                  Explore Technology
                </label>

                <select
                  id={selectId}
                  value={activeTechnology.slug}
                  onChange={(event) =>
                    selectTechnology(
                      event.target.value
                    )
                  }
                  className="mt-3 min-h-12 w-full rounded-xl border border-white/15 bg-[#171920] px-4 py-3 text-sm text-white outline-none focus-visible:border-[#C7FF3D]"
                >
                  {technologies.map((technology) => (
                    <option
                      key={technology.slug}
                      value={technology.slug}
                    >
                      {technology.name}
                    </option>
                  ))}
                </select>

                <div
                  aria-live="polite"
                  data-lenis-prevent className="mt-8 h-110 min-h-0 overflow-y-auto overscroll-contain pr-2 md:h-120 lg:h-110"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTechnology.slug}
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
                        duration: reducedMotion ? 0 : 0.2,
                      }}
                    >

                      {/* ACTIVE TECHNOLOGY */}

                      <div className="flex items-center gap-4">
                        <TechnologyLogo
                          technology={activeTechnology}
                          size={38}
                          showBackground
                        />

                        <div className="min-w-0">
                          <span
                            className="font-mono text-[9px] uppercase tracking-[0.14em]"
                            style={{
                              color: activeTechnology.color,
                            }}
                          >
                            {activeTechnology.category}
                          </span>

                          <h3 className="mt-2 wrap-break-word font-display text-[clamp(1.7rem,3.5vw,3.2rem)] font-medium leading-none tracking-[-0.055em]">
                            {activeTechnology.name}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-7 text-white/65">
                        {activeTechnology.description}
                      </p>

                      {/* OFFICIAL RESOURCE */}

                      {activeTechnology.website && (
                        <a
                          href={activeTechnology.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-5 inline-flex items-center gap-2 rounded-md text-xs text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                        >
                          Official Resource

                          <ArrowUpRight
                            aria-hidden="true"
                            size={15}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                          />
                        </a>
                      )}

                      {/* PROJECT CONNECTIONS */}

                      <div className="mt-8 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Network
                              aria-hidden="true"
                              size={15}
                              strokeWidth={1.5}
                              className="text-white/40"
                            />

                            <span className="font-mono text-[9px] uppercase tracking-wide text-white/50">
                              Project Connections
                            </span>
                          </div>

                          <span
                            className="font-mono text-xs"
                            style={{
                              color: activeTechnology.color,
                            }}
                          >
                            {formatNumber(
                              connectedProjects.length
                            )}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          {connectedProjects.length > 0 ? (
                            connectedProjects.map(
                              (project) => (
                                <Link
                                  key={project.slug}
                                  href={`/projects/${project.slug}`}
                                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/2.5 px-4 py-3.5 transition-colors hover:border-white/25 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                                >
                                  <div className="flex min-w-0 items-center gap-3">
                                    <span
                                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                                      style={{
                                        backgroundColor:
                                          project.accent,
                                      }}
                                    />

                                    <div className="min-w-0">
                                      <p className="wrap-break-word text-xs text-white/80">
                                        {project.title}
                                      </p>

                                      <p className="mt-1 font-mono text-[8px] uppercase tracking-wide text-white/35">
                                        {project.projectType}
                                      </p>
                                    </div>
                                  </div>

                                  <ArrowUpRight
                                    aria-hidden="true"
                                    size={16}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-white/35 transition-colors group-hover:text-white"
                                  />
                                </Link>
                              )
                            )
                          ) : (
                            <div className="rounded-xl border border-dashed border-white/10 p-4">
                              <p className="text-xs leading-6 text-white/45">
                                No documented Selected
                                Build connections yet.
                                Part of the broader
                                studio technology registry.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* INSPECTOR NAVIGATION */}

                <div className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      navigateTechnology(-1)
                    }
                    aria-label="Previous technology"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
                  >
                    <ChevronLeft
                      size={19}
                      strokeWidth={1.5}
                    />
                  </button>

                  <span className="text-center font-mono text-[9px] uppercase tracking-wide text-white/35">
                    Navigate Atlas
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      navigateTechnology(1)
                    }
                    aria-label="Next technology"
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

          {/* WORKSPACE FOOTER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-8">
            <span className="font-mono text-[9px] uppercase tracking-wide text-white/35">
              Aether Lab / Technology Atlas
            </span>

            <span className="font-mono text-[9px] uppercase tracking-wide text-white/35">
              Connections based on documented stacks
            </span>
          </div>
        </div>

        {/* ==================================
            TECHNOLOGY DIRECTORY
        ================================== */}

        <div className="mt-12 md:mt-16">

          {/* DIRECTORY HEADING */}

          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-black/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <LayoutGrid
                  aria-hidden="true"
                  size={16}
                  strokeWidth={1.5}
                  className="text-[#4F46FF]"
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/45">
                  Complete Registry
                </span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,3rem)] font-medium leading-none tracking-tighter">
                Explore the stack.
              </h3>
            </div>

            {/* DIRECTORY SEARCH */}

            <div className="relative w-full max-w-xs">
              <Search
                aria-hidden="true"
                size={17}
                strokeWidth={1.5}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setShowAll(false);
                }}
                aria-label="Search technology registry"
                placeholder="Search technology..."
                className="min-h-12 w-full rounded-xl border border-black/10 bg-white/60 py-3 pl-11 pr-10 text-sm text-[#0B0D10] outline-none placeholder:text-black/35 focus:border-[#4F46FF]/60 [&::-webkit-search-cancel-button]:appearance-none"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-black/40 hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-[#4F46FF]"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* FILTER BAR */}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const isActive =
                activeFilter === filter.id;

              const count =
                technologies.filter(
                  (technology) =>
                    matchesFilter(
                      technology,
                      filter
                    )
                ).length;

              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setShowAll(false);
                  }}
                  className={[
                    "flex min-h-10 items-center gap-2",
                    "rounded-full border px-4 py-2",
                    "text-xs transition-colors duration-300",
                    "focus-visible:outline-2",
                    "focus-visible:outline-offset-2",
                    "focus-visible:outline-[#4F46FF]",
                    isActive
                      ? "border-[#0B0D10] bg-[#0B0D10] text-white"
                      : "border-black/10 bg-white/40 text-black/60 hover:border-black/25 hover:text-black",
                  ].join(" ")}
                >
                  {filter.label}

                  <span
                    className={[
                      "font-mono text-[9px]",
                      isActive
                        ? "text-white/45"
                        : "text-black/35",
                    ].join(" ")}
                  >
                    {formatNumber(count)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DIRECTORY GRID */}

          <div className="mt-6">
            {visibleTechnologies.length > 0 ? (
              <motion.div
                layout={!reducedMotion}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6"
              >
                <AnimatePresence mode="popLayout">
                  {visibleTechnologies.map(
                    (technology) => (
                      <motion.div
                        key={technology.slug}
                        layout={!reducedMotion}
                        initial={{
                          opacity: reducedMotion ? 1 : 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                        transition={{
                          duration:
                            reducedMotion ? 0 : 0.2,
                        }}
                        className="min-w-0"
                      >
                        <DirectoryNode
                          technology={technology}
                          active={
                            activeTechnology.slug ===
                            technology.slug
                          }
                          onSelect={() =>
                            selectTechnology(
                              technology.slug
                            )
                          }
                        />
                      </motion.div>
                    )
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 px-5 text-center">
                <Search
                  size={26}
                  strokeWidth={1.3}
                  className="text-black/25"
                />

                <h3 className="mt-4 font-display text-xl">
                  No matching technologies.
                </h3>

                <p className="mt-3 text-xs text-black/45">
                  Try a different search or category.
                </p>

                <button
                  type="button"
                  onClick={resetDirectory}
                  className="mt-5 rounded-full border border-black/15 bg-white px-5 py-3 text-xs text-black/70 transition-colors hover:border-black/30 hover:text-black focus-visible:outline-2 focus-visible:outline-[#4F46FF]"
                >
                  Reset Directory
                </button>
              </div>
            )}
          </div>

          {/* DIRECTORY FOOTER */}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5">
            <span
              aria-live="polite"
              className="font-mono text-[9px] uppercase tracking-wide text-black/40"
            >
              Showing{" "}
              {formatNumber(
                visibleTechnologies.length
              )}
              {" / "}
              {formatNumber(
                filteredTechnologies.length
              )}
              {" "}Matching Technologies
            </span>

            {filteredTechnologies.length >
              directoryLimit && (
              <button
                type="button"
                onClick={() =>
                  setShowAll((value) => !value)
                }
                aria-expanded={showAll}
                className="group flex items-center gap-3 rounded-full border border-black/15 bg-white/50 px-5 py-3 text-xs text-black/70 transition-colors hover:border-black/30 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-[#4F46FF]"
              >
                {showAll
                  ? "Show Less"
                  : "Explore All Technologies"}

                <ArrowRight
                  aria-hidden="true"
                  size={15}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                />
              </button>
            )}
          </div>
        </div>

        {/* ==================================
            SYSTEM PRINCIPLE
        ================================== */}

        <Reveal className="mt-20 md:mt-28">
          <div className="grid gap-8 border-t border-black/15 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
                System Principle
              </span>
            </div>

            <div className="lg:col-span-7">
              <p className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] font-medium leading-none tracking-tighter">
                The stack follows the problem.

                <span className="text-black/30">
                  {" "}
                  The system follows the idea.
                </span>
              </p>
            </div>

            <div className="flex items-end lg:col-span-2 lg:justify-end">
              <span className="font-mono text-[9px] uppercase tracking-wide text-black/35">
                Aether / 2026
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
