
"use client";

import { useId, useState } from "react";
import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Wallet,
  Bot,
  CreditCard,
  Layers,
  Network,
  Gamepad2,
  Store,
  Plus,
} from "lucide-react";

import type { Project } from "@/data/projects";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  animated?: boolean;
  priority?: boolean;
};

// ==========================================
// PROTOCOL VISUAL
// ==========================================

function ProtocolVisual({
  accent,
  animated,
}: {
  accent: string;
  animated: boolean;
}) {
  const nodes = [
    {
      x: 100,
      y: 85,
      label: "WALLET",
      icon: Wallet,
    },
    {
      x: 460,
      y: 85,
      label: "PAYMENT",
      icon: CreditCard,
    },
    {
      x: 100,
      y: 275,
      label: "SUBSCRIPTION",
      icon: Layers,
    },
    {
      x: 460,
      y: 275,
      label: "TELEGRAM",
      icon: Bot,
    },
  ];

  const centerX = 280;
  const centerY = 180;

  return (
    <svg
      viewBox="0 0 560 360"
      className="h-full w-full"
      aria-hidden="true"
    >
      {[70, 100, 135].map((radius) => (
        <circle
          key={radius}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={accent}
          strokeOpacity={0.13}
          strokeWidth={1}
        />
      ))}

      <path
        d="M30 180 H530 M280 20 V340"
        stroke="white"
        strokeOpacity={0.07}
        strokeWidth={1}
        strokeDasharray="4 6"
      />

      {nodes.map((node, index) => (
        <g key={node.label}>
          <line
            x1={centerX}
            y1={centerY}
            x2={node.x}
            y2={node.y}
            stroke={accent}
            strokeOpacity={0.4}
            strokeDasharray="5 7"
          />

          <motion.circle
            r={3}
            fill={accent}
            initial={false}
            animate={
              animated
                ? {
                    cx: [node.x, centerX],
                    cy: [node.y, centerY],
                    opacity: [0, 1, 1, 0],
                  }
                : {
                    cx: (node.x + centerX) / 2,
                    cy: (node.y + centerY) / 2,
                    opacity: 0.75,
                  }
            }
            transition={
              animated
                ? {
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 0.6,
                    delay: index * 0.5,
                    ease: "linear",
                  }
                : {
                    duration: 0,
                  }
            }
          />
        </g>
      ))}

      {nodes.map((node) => {
        const Icon = node.icon;

        return (
          <g key={node.label}>
            <rect
              x={node.x - 65}
              y={node.y - 27}
              width={130}
              height={54}
              rx={12}
              fill="#17121F"
              stroke={accent}
              strokeOpacity={0.5}
            />

            <Icon
              x={node.x - 52}
              y={node.y - 8}
              size={17}
              strokeWidth={1.4}
              color={accent}
            />

            <text
              x={node.x - 27}
              y={node.y + 3}
              fill="white"
              fillOpacity={0.8}
              fontSize={9}
              letterSpacing={0.5}
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      <motion.circle
        cx={centerX}
        cy={centerY}
        r={51}
        fill="none"
        stroke={accent}
        strokeWidth={1}
        animate={{
          opacity: animated
            ? [0.25, 0.8, 0.25]
            : 0.4,
        }}
        transition={
          animated
            ? {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0,
              }
        }
      />

      <circle
        cx={centerX}
        cy={centerY}
        r={41}
        fill="#241936"
        stroke={accent}
        strokeOpacity={0.8}
        strokeWidth={1.5}
      />

      <Network
        x={centerX - 19}
        y={centerY - 22}
        size={38}
        color="#C4B5FD"
        strokeWidth={1.3}
      />

      <text
        x={centerX}
        y={centerY + 29}
        textAnchor="middle"
        fill="#C4B5FD"
        fontSize={8}
        fontFamily="monospace"
        letterSpacing={1}
      >
        AXEON
      </text>

      <text
        x={centerX}
        y={340}
        textAnchor="middle"
        fontSize={9}
        fill="white"
        fillOpacity={0.35}
        fontFamily="monospace"
        letterSpacing={2}
      >
        SUBSCRIPTION INFRASTRUCTURE
      </text>
    </svg>
  );
}

// ==========================================
// ARCADE VISUAL
// ==========================================

function ArcadeVisual({
  accent,
  animated,
}: {
  accent: string;
  animated: boolean;
}) {
  const blocks = [
    { x: 161, y: 270, width: 205 },
    { x: 178, y: 230, width: 180 },
    { x: 191, y: 190, width: 155 },
    { x: 207, y: 150, width: 130 },
    { x: 222, y: 110, width: 105 },
  ];

  return (
    <svg
      viewBox="0 0 560 360"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g
        stroke={accent}
        strokeOpacity={0.09}
        strokeWidth={1}
      >
        {Array.from({ length: 11 }).map(
          (_, index) => (
            <line
              key={`vertical-${index}`}
              x1={280}
              y1={170}
              x2={index * 56}
              y2={360}
            />
          )
        )}

        {[205, 225, 250, 280, 315, 350].map(
          (y) => (
            <line
              key={y}
              x1={0}
              y1={y}
              x2={560}
              y2={y}
            />
          )
        )}
      </g>

      <path
        d="M125 303 L353 303 L429 260 L201 260 Z"
        fill={accent}
        fillOpacity={0.04}
        stroke={accent}
        strokeOpacity={0.25}
      />

      {blocks.map((block, index) => (
        <g key={index}>
          <path
            d={`
              M ${block.x} ${block.y}
              L ${block.x + block.width} ${block.y}
              L ${block.x + block.width + 34} ${block.y - 19}
              L ${block.x + 34} ${block.y - 19}
              Z
            `}
            fill={accent}
            fillOpacity={0.65 + index * 0.08}
            stroke={accent}
            strokeOpacity={0.65}
          />

          <rect
            x={block.x}
            y={block.y}
            width={block.width}
            height={21}
            fill="#789B26"
            stroke={accent}
            strokeOpacity={0.25}
          />

          <path
            d={`
              M ${block.x + block.width} ${block.y}
              L ${block.x + block.width + 34} ${block.y - 19}
              V ${block.y + 2}
              L ${block.x + block.width} ${block.y + 21}
              Z
            `}
            fill="#405718"
            stroke={accent}
            strokeOpacity={0.2}
          />
        </g>
      ))}

      <motion.g
        animate={{
          x: animated
            ? [-65, 65, -65]
            : 0,
        }}
        transition={
          animated
            ? {
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0,
              }
        }
      >
        <path
          d="M232 65 H317 L351 46 H266 Z"
          fill="#E1FF9A"
          stroke={accent}
        />

        <rect
          x={232}
          y={65}
          width={85}
          height={21}
          fill={accent}
        />

        <path
          d="M317 65 L351 46 V67 L317 86 Z"
          fill="#6B8E23"
        />
      </motion.g>

      <g
        fill="white"
        fillOpacity={0.4}
        fontSize={9}
        fontFamily="monospace"
        letterSpacing={1}
      >
        <text x={28} y={32}>
          ARCADE / 01
        </text>

        <text
          x={532}
          y={32}
          textAnchor="end"
        >
          SOLANA DEVNET
        </text>

        <text
          x={280}
          y={340}
          textAnchor="middle"
        >
          ON-CHAIN GAMING CONCEPT
        </text>
      </g>

      <path
        d="M28 43 H105 M455 43 H532"
        stroke={accent}
        strokeOpacity={0.3}
      />
    </svg>
  );
}

// ==========================================
// GENERIC FALLBACK VISUAL
// ==========================================

function GenericVisual({
  project,
  animated,
}: {
  project: Project;
  animated: boolean;
}) {
  const Icon =
    project.visualType === "commerce"
      ? Store
      : project.visualType === "arcade"
        ? Gamepad2
        : Layers;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="absolute aspect-square rounded-full border"
          style={{
            width: `${34 + index * 17}%`,
            borderColor: `${project.accent}35`,
          }}
        />
      ))}

      <motion.div
        animate={{
          y: animated
            ? [-5, 5, -5]
            : 0,
        }}
        transition={
          animated
            ? {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {
                duration: 0,
              }
        }
        className="relative flex h-24 w-24 items-center justify-center rounded-3xl border bg-white/5 backdrop-blur-lg"
        style={{
          borderColor: `${project.accent}65`,
          boxShadow: `0 0 50px ${project.accent}20`,
        }}
      >
        <Icon
          size={42}
          strokeWidth={1.2}
          style={{
            color: project.accent,
          }}
        />
      </motion.div>
    </div>
  );
}

// ==========================================
// MAIN PROJECT VISUAL
// ==========================================

export default function ProjectVisual({
  project,
  className = "",
  animated = true,
  priority = false,
}: ProjectVisualProps) {
  const visualId = useId();

  const prefersReducedMotion =
    useReducedMotion();

  const shouldAnimate =
    animated && !prefersReducedMotion;

  const cover = project.images?.cover;

  const [failedCover, setFailedCover] =
    useState<string | null>(null);

  const hasCover =
    Boolean(cover) &&
    failedCover !== cover &&
    project.visualMode !== "concept";

  const coverImage =
    project.images?.gallery?.find(
      (image) => image.src === cover
    );

  const visualLabel = hasCover
    ? project.visualMode === "mockup"
      ? "Project Mockup"
      : "Product Screenshot"
    : "Concept Visualization";

  return (
    <figure
      aria-labelledby={visualId}
      className={[
        "group relative isolate overflow-hidden",
        "aspect-4/3 w-full rounded-2xl",
        "border border-white/10",
        className,
      ].join(" ")}
      style={{
        background: project.gradient,
      }}
    >
      {/* ==================================
          FULL-BLEED PROJECT IMAGE
      ================================== */}

      {hasCover && cover ? (
        <>
          <Image
            src={cover}
            alt={
              coverImage?.alt ??
              `${project.title} project preview`
            }
            fill
            priority={priority}
            draggable={false}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 540px"
            onError={() =>
              setFailedCover(cover)
            }
            className="object-cover object-center"
          />

          {/* Subtle Bottom Gradient */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/45 to-transparent"
          />

          {/* Minimal Mockup Caption */}

          <figcaption
            id={visualId}
            className="pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5"
          >
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
              {visualLabel}
            </span>
          </figcaption>
        </>
      ) : (
        <>
          {/* ==================================
              CONCEPT BACKGROUND
          ================================== */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[90px]"
            style={{
              backgroundColor: project.accent,
            }}
          />

          {/* Concept Renderer */}

          <div className="absolute inset-0">
            {project.visualType === "protocol" ? (
              <ProtocolVisual
                accent={project.accent}
                animated={shouldAnimate}
              />
            ) : project.visualType === "arcade" ? (
              <ArcadeVisual
                accent={project.accent}
                animated={shouldAnimate}
              />
            ) : (
              <GenericVisual
                project={project}
                animated={shouldAnimate}
              />
            )}
          </div>

          {/* Technical Header */}

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: project.accent,
                }}
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/80">
                Project / {project.number}
              </span>
            </div>

            <Plus
              size={17}
              strokeWidth={1}
              className="text-white/65"
            />
          </div>

          {/* Concept Caption */}

          <figcaption
            id={visualId}
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5"
          >
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-white/85 backdrop-blur-md">
              {visualLabel}
            </span>

            <span className="hidden font-mono text-[8px] uppercase tracking-[0.16em] text-white/65 sm:block">
              Aether Lab
            </span>
          </figcaption>
        </>
      )}
    </figure>
  );
}
