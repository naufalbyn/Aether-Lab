"use client";

import { useRef } from "react";
import Link from "next/link";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import ProjectVisual from "@/components/projects/ProjectVisual";

import type {
  Project,
  ProjectStatus,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  className?: string;
  priority?: boolean;
};

// ==========================================
// STATUS SYSTEM
// ==========================================

const statusColors: Record<ProjectStatus, string> = {
  Rebuilding: "#FBBF24",
  "Live on Devnet": "#C7FF3D",
  "Delivered to Client": "#4ADE80",
  "In Development": "#60A5FA",
  Prototype: "#A78BFA",
  Experiment: "#22D3EE",
  Completed: "#4ADE80",
  Live: "#4ADE80",
};

// ==========================================
// PROJECT CARD
// ==========================================

export default function ProjectCard({
  project,
  featured = false,
  className = "",
  priority = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const isInView = useInView(cardRef, {
    margin: "100px",
  });

  const prefersReducedMotion =
    useReducedMotion();

  const shouldAnimate =
    isInView && !prefersReducedMotion;

  const statusColor =
    statusColors[project.status];

  return (
    <motion.article
      ref={cardRef}
      className={[
        "group relative isolate",
        "flex h-full min-w-0 flex-col",
        className,
      ].join(" ")}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Explore ${project.title} project details`}
        draggable={false}
        className={[
          "relative flex h-full flex-1 flex-col",
          "rounded-2xl outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-[#C7FF3D]",
          "focus-visible:ring-offset-4",
          "focus-visible:ring-offset-[#0B0D10]",
        ].join(" ")}
      >
        {/* ==================================
            PROJECT META
        ================================== */}

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] tracking-[0.14em]"
              style={{
                color: project.accent,
              }}
            >
              / {project.number}
            </span>

            <span
              aria-hidden="true"
              className="h-3 w-px bg-white/15"
            />

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
              {project.projectType} Project
            </span>
          </div>

          {featured && (
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#C7FF3D]">
              Featured
            </span>
          )}
        </div>

        {/* ==================================
            VISUAL SHOWCASE
        ================================== */}

        <div className="relative isolate overflow-hidden rounded-2xl border border-white/10">
          {/* Project Visual */}

          <div
            className={[
              "transition-transform duration-700",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "motion-safe:group-hover:scale-[1.035]",
            ].join(" ")}
          >
            <ProjectVisual
              project={project}
              animated={shouldAnimate}
              priority={priority}
              className="aspect-4/3 rounded-none border-0"
            />
          </div>

          {/* Hover Glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              boxShadow: `inset 0 0 0 1px ${project.accent}80`,
            }}
          />

          {/* Hover Overlay */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Floating Action */}

          <motion.div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "left-1/2 top-1/2",
              "hidden -translate-x-1/2",
              "-translate-y-1/2",
              "items-center justify-center",
              "rounded-full border border-white/25",
              "bg-black/45 backdrop-blur-xl",
              "h-20 w-20",
              "opacity-0",
              "transition-[opacity,scale] duration-500",
              "motion-safe:scale-90",
              "group-hover:opacity-100",
              "motion-safe:group-hover:scale-100",
              "group-focus-within:opacity-100",
              "lg:flex",
            ].join(" ")}
          >
            <ArrowUpRight
              size={32}
              strokeWidth={1.4}
              className="text-white"
            />
          </motion.div>
        </div>

        {/* ==================================
            PROJECT INFORMATION
        ================================== */}

        <div className="flex flex-1 flex-col pt-6">
          {/* Category */}

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[9px] uppercase leading-5 tracking-[0.14em] text-white/50">
              {project.category}
            </span>
          </div>

          {/* Project Title */}

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3
              className={[
                "min-w-0",
                "font-display font-medium",
                "leading-[1.05]",
                "tracking-[-0.055em]",
                "text-[clamp(1.8rem,3vw,3.5rem)]",
                "text-white",
              ].join(" ")}
            >
              {project.title}
            </h3>

            <div
              aria-hidden="true"
              className={[
                "flex h-11 w-11 shrink-0",
                "items-center justify-center",
                "rounded-full border",
                "transition-colors duration-300",
                "group-hover:bg-white/5",
                "sm:h-12 sm:w-12",
              ].join(" ")}
              style={{
                borderColor: `${project.accent}50`,
                color: project.accent,
              }}
            >
              <ArrowUpRight
                size={21}
                strokeWidth={1.5}
                className={[
                  "transition-transform duration-300",
                  "motion-safe:group-hover:-translate-y-0.5",
                  "motion-safe:group-hover:translate-x-0.5",
                ].join(" ")}
              />
            </div>
          </div>

          {/* Tagline */}

          <p className="mt-3 font-display text-base leading-relaxed tracking-[-0.02em] text-white/70 sm:text-lg">
            {project.tagline}
          </p>

          {/* ==================================
              FOOTER INFORMATION
          ================================== */}

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              {/* Development Status */}

              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: statusColor,
                    boxShadow: `0 0 10px ${statusColor}45`,
                  }}
                />

                <span
                  className="font-mono text-[9px] uppercase tracking-widest"
                  style={{
                    color: statusColor,
                  }}
                >
                  {project.status}
                </span>
              </div>

              {/* Explore Action */}

              <div
                className="flex items-center gap-2 text-xs text-white/60 transition-colors duration-300 group-hover:text-white"
              >
                <span>Explore Project</span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.5}
                  className={[
                    "transition-transform duration-300",
                    "motion-safe:group-hover:translate-x-1",
                  ].join(" ")}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}