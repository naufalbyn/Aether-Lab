"use client";

import type { LucideProps } from "lucide-react";



import { useId, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Plus,
  Layers,
  Network,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Monitor,
  Server,
  Database,
  Wallet,
  Shield,
  Bot,
  Clock3,
  CreditCard,
  Code2,
  Info,
  Gamepad2,
  LayoutGrid,
} from "lucide-react";

import type {
  Project,
  ProjectArchitecture as ArchitectureLayer,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectArchitectureProps = {
  project: Project;
};

type DiagramNode = {
  layer: number;
  label: string;
  x: number;
  y: number;
};

type DiagramEdge = {
  from: number;
  to: number;
};

type DiagramConfig = {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  note: string;
};

// ==========================================
// DIAGRAM CONFIGURATION
// ==========================================

const NODE_WIDTH = 200;
const NODE_HEIGHT = 68;

const DIAGRAMS: Record<string, DiagramConfig> = {
  "axeon-protocol": {
    width: 740,
    height: 610,

    nodes: [
      {
        layer: 0,
        label: "Frontend",
        x: 90,
        y: 30,
      },
      {
        layer: 3,
        label: "Auth & Wallet",
        x: 450,
        y: 30,
      },
      {
        layer: 1,
        label: "Backend Services",
        x: 270,
        y: 150,
      },
      {
        layer: 4,
        label: "Payment Validation",
        x: 90,
        y: 270,
      },
      {
        layer: 5,
        label: "Privacy Verification",
        x: 450,
        y: 270,
      },
      {
        layer: 2,
        label: "Smart Contracts",
        x: 270,
        y: 390,
      },
      {
        layer: 6,
        label: "Telegram Integration",
        x: 90,
        y: 510,
      },
      {
        layer: 7,
        label: "Hourly Guard",
        x: 450,
        y: 510,
      },
    ],

    edges: [
      { from: 0, to: 3 },
      { from: 0, to: 1 },
      { from: 3, to: 1 },
      { from: 1, to: 4 },
      { from: 1, to: 5 },
      { from: 4, to: 2 },
      { from: 5, to: 2 },
      { from: 2, to: 6 },
      { from: 2, to: 7 },
    ],

    note: "Conceptual system relationships based on the documented implementation and proposed independent rebuild.",
  },

  "stack-block-arcade": {
    width: 740,
    height: 480,

    nodes: [
      {
        layer: 0,
        label: "Game Client",
        x: 270,
        y: 40,
      },
      {
        layer: 1,
        label: "Web3 Provider",
        x: 270,
        y: 205,
      },
      {
        layer: 2,
        label: "Smart Contracts",
        x: 270,
        y: 370,
      },
    ],

    edges: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
    ],

    note: "Conceptual representation of the documented hackathon implementation.",
  },

  "bangau-matahari": {
    width: 740,
    height: 470,

    nodes: [
      {
        layer: 0,
        label: "Application Layer",
        x: 270,
        y: 30,
      },
      {
        layer: 1,
        label: "Presentation Layer",
        x: 90,
        y: 190,
      },
      {
        layer: 2,
        label: "Content Layer",
        x: 450,
        y: 190,
      },
      {
        layer: 3,
        label: "Ordering Layer",
        x: 270,
        y: 350,
      },
    ],

    edges: [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
    ],

    note: "Conceptual representation of the delivered website. Ordering is handled through external channels.",
  },
};

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

function ArchitectureIcon({
  title,
  ...props
}: LucideProps & { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("game")) {
    return <Gamepad2 {...props} />;
  }

  if (
    normalized.includes("frontend") ||
    normalized.includes("presentation")
  ) {
    return <Monitor {...props} />;
  }

  if (
    normalized.includes("backend") ||
    normalized.includes("server")
  ) {
    return <Server {...props} />;
  }

  if (
    normalized.includes("wallet") ||
    normalized.includes("web3 provider") ||
    normalized.includes("authentication")
  ) {
    return <Wallet {...props} />;
  }

  if (normalized.includes("privacy")) {
    return <Shield {...props} />;
  }

  if (normalized.includes("telegram")) {
    return <Bot {...props} />;
  }

  if (
    normalized.includes("monitoring") ||
    normalized.includes("guard")
  ) {
    return <Clock3 {...props} />;
  }

  if (
    normalized.includes("payment") ||
    normalized.includes("ordering")
  ) {
    return <CreditCard {...props} />;
  }

  if (
    normalized.includes("contract") ||
    normalized.includes("blockchain")
  ) {
    return <Network {...props} />;
  }

  if (normalized.includes("content")) {
    return <Database {...props} />;
  }

  if (normalized.includes("application")) {
    return <Code2 {...props} />;
  }

  return <Layers {...props} />;
}

function createFallbackDiagram(
  layers: ArchitectureLayer[]
): DiagramConfig {
  const rows = Math.ceil(layers.length / 2);

  return {
    width: 740,
    height: Math.max(160, rows * 125 + 35),

    nodes: layers.map((layer, index) => ({
      layer: index,
      label: layer.title,
      x: index % 2 === 0 ? 110 : 430,
      y: Math.floor(index / 2) * 125 + 30,
    })),

    edges: [],

    note: "Component overview. System connections have not been specified.",
  };
}

function getDiagram(
  project: Project
): DiagramConfig {
  const configuration = DIAGRAMS[project.slug];

  if (!configuration) {
    return createFallbackDiagram(
      project.architecture
    );
  }

  const isCompatible =
    configuration.nodes.length ===
      project.architecture.length &&
    configuration.nodes.every(
      (node) =>
        node.layer >= 0 &&
        node.layer < project.architecture.length
    );

  return isCompatible
    ? configuration
    : createFallbackDiagram(
        project.architecture
      );
}

function getEdgePath(
  source: DiagramNode,
  target: DiagramNode
) {
  // Horizontal connections

  if (source.y === target.y) {
    const movingRight = source.x < target.x;

    const startX = movingRight
      ? source.x + NODE_WIDTH
      : source.x;

    const endX = movingRight
      ? target.x
      : target.x + NODE_WIDTH;

    const y = source.y + NODE_HEIGHT / 2;

    return `M ${startX} ${y} H ${endX}`;
  }

  // Vertical / orthogonal connections

  const startX = source.x + NODE_WIDTH / 2;

  const startY = source.y + NODE_HEIGHT;

  const endX = target.x + NODE_WIDTH / 2;

  const endY = target.y;

  const middleY = (startY + endY) / 2;

  return [
    `M ${startX} ${startY}`,
    `V ${middleY}`,
    `H ${endX}`,
    `V ${endY}`,
  ].join(" ");
}

// ==========================================
// ARCHITECTURE DIAGRAM
// ==========================================

function ArchitectureDiagram({
  project,
  diagram,
  activeLayer,
  onSelect,
}: {
  project: Project;
  diagram: DiagramConfig;
  activeLayer: number;
  onSelect: (layer: number) => void;
}) {
  const uniqueId = useId();

  const gridId = `${uniqueId}-grid`;
  const titleId = `${uniqueId}-title`;

  const prefersReducedMotion =
    useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${diagram.width} ${diagram.height}`}
      className="block h-auto w-full"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        {project.title} architecture explorer
      </title>

      <defs>
        <pattern
          id={gridId}
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 28 0 H 0 V 28"
            fill="none"
            stroke="white"
            strokeOpacity={0.045}
          />
        </pattern>
      </defs>

      {/* Technical Grid */}

      <rect
        width={diagram.width}
        height={diagram.height}
        fill={`url(#${gridId})`}
      />

      {/* System Connections */}

      {diagram.edges.map((edge, index) => {
        const source = diagram.nodes.find(
          (node) => node.layer === edge.from
        );

        const target = diagram.nodes.find(
          (node) => node.layer === edge.to
        );

        if (!source || !target) {
          return null;
        }

        const isConnected =
          edge.from === activeLayer ||
          edge.to === activeLayer;

        const path = getEdgePath(
          source,
          target
        );

        return (
          <g
            key={`${edge.from}-${edge.to}-${index}`}
            aria-hidden="true"
          >
            <path
              d={path}
              fill="none"
              stroke={
                isConnected
                  ? project.accent
                  : "white"
              }
              strokeOpacity={
                isConnected ? 0.55 : 0.12
              }
              strokeWidth={
                isConnected ? 1.8 : 1
              }
              strokeLinejoin="round"
            />

            {/* Animated Connection */}

            {isConnected && (
              <motion.path
                d={path}
                fill="none"
                stroke={project.accent}
                strokeOpacity={0.9}
                strokeWidth={2}
                strokeDasharray="5 11"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  strokeDashoffset:
                    prefersReducedMotion
                      ? 0
                      : [0, -32],
                }}
                transition={{
                  duration:
                    prefersReducedMotion
                      ? 0
                      : 1.5,
                  ease: "linear",
                  repeat:
                    prefersReducedMotion
                      ? 0
                      : Infinity,
                }}
              />
            )}
          </g>
        );
      })}

      {/* Interactive System Nodes */}

      {diagram.nodes.map((node) => {
        const isActive =
          node.layer === activeLayer;

        const layer =
          project.architecture[node.layer];

        

        return (
          <g
            key={node.layer}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${layer.title}`}
            aria-pressed={isActive}
            onClick={() =>
              onSelect(node.layer)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();

                onSelect(node.layer);
              }
            }}
            className="group cursor-pointer outline-none"
          >
            {/* Active Node Glow */}

            {isActive && (
              <rect
                x={node.x - 5}
                y={node.y - 5}
                width={NODE_WIDTH + 10}
                height={NODE_HEIGHT + 10}
                rx={15}
                fill={`${project.accent}0A`}
                stroke={project.accent}
                strokeOpacity={0.12}
              />
            )}

            {/* Node Background */}

            <rect
              x={node.x}
              y={node.y}
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={11}
              fill={
                isActive
                  ? project.surface
                  : "#16181E"
              }
              stroke={
                isActive
                  ? project.accent
                  : "#383B42"
              }
              strokeWidth={
                isActive ? 1.8 : 1
              }
              className="transition-all duration-300 group-hover:stroke-white/60 group-focus-visible:stroke-white group-focus-visible:stroke-[2.5]"
            />

            {/* Node Icon */}

            <ArchitectureIcon title={layer.title}
              x={node.x + 15}
              y={node.y + 24}
              size={20}
              strokeWidth={1.5}
              color={
                isActive
                  ? project.accent
                  : "#9CA3AF"
              }
              aria-hidden="true"
            />

            {/* Node Number */}

            <text
              x={node.x + NODE_WIDTH - 12}
              y={node.y + 16}
              fill={
                isActive
                  ? project.accent
                  : "#666A73"
              }
              textAnchor="end"
              fontSize={9}
              fontFamily="monospace"
            >
              {formatNumber(node.layer + 1)}
            </text>

            {/* Node Label */}

            <text
              x={node.x + 44}
              y={node.y + 39}
              fill="#F5F5F2"
              fontSize={12}
              fontWeight={500}
              fontFamily="sans-serif"
            >
              {node.label.length > 23
                ? `${node.label.slice(0, 21)}…`
                : node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ==========================================
// MAIN ARCHITECTURE SECTION
// ==========================================

export default function ProjectArchitecture({
  project,
}: ProjectArchitectureProps) {
  const layers = project.architecture ?? [];

  const [selectedLayer, setSelectedLayer] =
    useState(0);

  const prefersReducedMotion =
    useReducedMotion();

  if (layers.length === 0) {
    return null;
  }

  const diagram = getDiagram(project);

  const activeLayer = Math.min(
    selectedLayer,
    layers.length - 1
  );

  const currentLayer = layers[activeLayer];

  

  const connectedLayers = Array.from(
    new Set(
      diagram.edges
        .filter(
          (edge) =>
            edge.from === activeLayer ||
            edge.to === activeLayer
        )
        .map((edge) =>
          edge.from === activeLayer
            ? edge.to
            : edge.from
        )
    )
  );

  function navigateLayer(direction: number) {
    const nextLayer =
      (activeLayer +
        direction +
        layers.length) %
      layers.length;

    setSelectedLayer(nextLayer);
  }

  return (
    <section
      id="project-architecture"
      aria-labelledby="architecture-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] py-24 text-[#0B0D10] md:py-32 lg:py-36"
    >
      {/* ==================================
          BACKGROUND DECORATION
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-24 -z-10 hidden h-162.5 w-162.5 rounded-full border border-black/5 lg:block"
      >
        <div className="absolute inset-16 rounded-full border border-black/5" />

        <div className="absolute inset-32 rounded-full border border-[#4F46FF]/5" />
      </div>

      <div className="aether-container relative z-10">
        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4F46FF]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55">
              03 / Technical Architecture
            </span>
          </div>

          <Plus
            aria-hidden="true"
            size={17}
            strokeWidth={1}
            className="text-black/35"
          />
        </div>

        {/* ==================================
            EDITORIAL HEADING
        ================================== */}

        <div className="grid gap-10 pb-14 pt-14 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-20">
          <div className="lg:col-span-7">
            <h2
              id="architecture-title"
              className="font-display text-[clamp(3rem,6.8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em]"
            >
              Under the
              <br />

              <span className="text-[#4F46FF]">
                hood.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#4F46FF]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
                System Design
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-black/65 md:text-base">
              Explore the technical components,
              system relationships, and
              architectural decisions behind
              this project.
            </p>
          </div>
        </div>

        {/* ==================================
            SYSTEM EXPLORER
        ================================== */}

        <div className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-[#0B0D10] text-white">
          {/* Explorer Glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-40 top-0 -z-10 h-125 w-125 rounded-full opacity-10 blur-[130px]"
            style={{
              backgroundColor: project.accent,
            }}
          />

          {/* Explorer Header */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-6 md:px-8">
            <div className="flex items-center gap-3">
              <Network
                size={20}
                strokeWidth={1.4}
                style={{
                  color: project.accent,
                }}
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                System Explorer
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                {formatNumber(layers.length)}
                {" "}System Layers
              </span>

              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    project.accent,
                }}
              />
            </div>
          </div>

          {/* Diagram and Inspector */}

          <div className="grid lg:grid-cols-12">
            {/* ==================================
                SYSTEM DIAGRAM
            ================================== */}

            <div className="min-w-0 border-b border-white/10 p-5 lg:col-span-8 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  System Relationships
                </span>

                <LayoutGrid
                  aria-hidden="true"
                  size={15}
                  strokeWidth={1.4}
                  className="text-white/35"
                />
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/15">
                {/* Large Screen Diagram */}

                <div className="hidden sm:block">
                  <ArchitectureDiagram
                    project={project}
                    diagram={diagram}
                    activeLayer={activeLayer}
                    onSelect={setSelectedLayer}
                  />
                </div>

                {/* Mobile Layer Explorer */}

                <div className="grid gap-3 p-4 sm:hidden">
                  {layers.map((layer, index) => {
                    

                    const isActive =
                      index === activeLayer;

                    return (
                      <button
                        key={layer.title}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() =>
                          setSelectedLayer(index)
                        }
                        className="flex items-center gap-3 rounded-xl border p-4 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        style={{
                          borderColor: isActive
                            ? project.accent
                            : "#FFFFFF18",
                          backgroundColor: isActive
                            ? `${project.accent}10`
                            : "#FFFFFF04",
                        }}
                      >
                        <ArchitectureIcon title={layer.title}
                          aria-hidden="true"
                          size={20}
                          strokeWidth={1.5}
                          style={{
                            color: isActive
                              ? project.accent
                              : "#9CA3AF",
                          }}
                        />

                        <span className="min-w-0 flex-1 text-sm leading-6">
                          {layer.title}
                        </span>

                        <span className="font-mono text-[10px] text-white/40">
                          {formatNumber(
                            index + 1
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-white/45">
                {diagram.note}
              </p>

              {/* Layer Navigation */}

              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
                {layers.map((layer, index) => (
                  <button
                    key={layer.title}
                    type="button"
                    aria-label={`Explore ${layer.title}`}
                    aria-pressed={
                      activeLayer === index
                    }
                    onClick={() =>
                      setSelectedLayer(index)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border font-mono text-xs transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    style={{
                      borderColor:
                        activeLayer === index
                          ? project.accent
                          : "#FFFFFF18",

                      backgroundColor:
                        activeLayer === index
                          ? `${project.accent}15`
                          : "#FFFFFF04",

                      color:
                        activeLayer === index
                          ? project.accent
                          : "#FFFFFF90",
                    }}
                  >
                    {formatNumber(index + 1)}
                  </button>
                ))}
              </div>
            </div>

            {/* ==================================
                COMPONENT INSPECTOR
            ================================== */}

            <div className="flex min-w-0 flex-col p-6 md:p-8 lg:col-span-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  Component Inspector
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.3}
                  className="text-white/35"
                />
              </div>

              <motion.div
                key={`${project.slug}-${activeLayer}`}
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
                className="mt-8 flex-1"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border"
                  style={{
                    backgroundColor:
                      `${project.accent}0D`,

                    borderColor:
                      `${project.accent}30`,
                  }}
                >
                  <ArchitectureIcon title={currentLayer.title}
                    aria-hidden="true"
                    size={30}
                    strokeWidth={1.4}
                    style={{
                      color: project.accent,
                    }}
                  />
                </div>

                <span
                  className="mt-7 block font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    color: project.accent,
                  }}
                >
                  Layer /{" "}
                  {formatNumber(activeLayer + 1)}
                </span>

                <div
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <h3 className="mt-4 wrap-break-word font-display text-[clamp(1.7rem,2.7vw,2.8rem)] font-medium leading-tight tracking-[-0.045em]">
                    {currentLayer.title}
                  </h3>

                  <p className="mt-5 text-sm leading-8 text-white/65">
                    {currentLayer.description}
                  </p>
                </div>

                {/* Connected Layers */}

                {connectedLayers.length > 0 && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                      Connected Components
                    </span>

                    <div className="mt-4 grid gap-2">
                      {connectedLayers.map(
                        (layerIndex) => (
                          <button
                            key={layerIndex}
                            type="button"
                            onClick={() =>
                              setSelectedLayer(
                                layerIndex
                              )
                            }
                            className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/2.5 p-3 text-left transition-colors duration-300 hover:border-white/30 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-white"
                          >
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{
                                backgroundColor:
                                  project.accent,
                              }}
                            />

                            <span className="min-w-0 flex-1 text-xs leading-5 text-white/75">
                              {
                                layers[layerIndex]
                                  .title
                              }
                            </span>

                            <ArrowUpRight
                              aria-hidden="true"
                              size={14}
                              strokeWidth={1.4}
                              className="shrink-0 text-white/35"
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Inspector Navigation */}

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                <span className="font-mono text-[10px] text-white/50">
                  {formatNumber(activeLayer + 1)}
                  {" / "}
                  {formatNumber(layers.length)}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous architecture layer"
                    disabled={layers.length < 2}
                    onClick={() =>
                      navigateLayer(-1)
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowLeft
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>

                  <button
                    type="button"
                    aria-label="Next architecture layer"
                    disabled={layers.length < 2}
                    onClick={() =>
                      navigateLayer(1)
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Explorer Footer */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Interactive Architecture Explorer
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              {project.title}
            </span>
          </div>
        </div>

        {/* ==================================
            ARCHITECTURE DOCUMENTATION NOTE
        ================================== */}

        {project.architectureNote && (
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-black/10 bg-white/60 p-6">
            <Info
              aria-hidden="true"
              size={20}
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-[#4F46FF]"
            />

            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4F46FF]">
                Architecture Context
              </h3>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-black/60">
                {project.architectureNote}
              </p>
            </div>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
            Aether Lab / Technical Architecture
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
              Designed as a System
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]" />
          </div>
        </div>
      </div>
    </section>
  );
}

