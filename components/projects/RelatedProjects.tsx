
import Link from "next/link";

import {
  Plus,
  ArrowUpRight,
  LayoutGrid,
  Layers,
} from "lucide-react";

import ProjectCard from "@/components/projects/ProjectCard";

import {
  getRelatedProjects,
  type Project,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type RelatedProjectsProps = {
  project: Project;
  sectionNumber: string;
};

// ==========================================
// UTILITIES
// ==========================================

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

// ==========================================
// RELATED PROJECTS
// ==========================================

export default function RelatedProjects({
  project,
  sectionNumber,
}: RelatedProjectsProps) {
  const relatedProjects = getRelatedProjects(
    project.slug,
    2
  );

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="related-projects"
      aria-labelledby="related-projects-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] py-24 text-[#0B0D10] md:py-32 lg:py-36"
    >
      {/* ==================================
          DECORATIVE BACKGROUND
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-0 -z-10 hidden h-175 w-175 rounded-full border border-black/[0.035] lg:block"
      >
        <div className="absolute inset-16 rounded-full border border-black/[0.035]" />

        <div className="absolute inset-32 rounded-full border border-[#4F46FF]/5" />

        <div className="absolute inset-48 rounded-full border border-[#4F46FF]/5" />
      </div>

      <div className="aether-container relative">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4F46FF]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55">
              {sectionNumber} / Continue Exploring
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
              id="related-projects-title"
              className="font-display text-[clamp(3rem,6.8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.065em]"
            >
              Beyond
              <br />

              <span className="text-[#4F46FF]">
                this build.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#4F46FF]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
                Project Continuum
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-8 text-black/65 md:text-base">
              Different challenges. Different systems.
              The same curiosity to build what comes
              next. Explore more projects from Aether Lab.
            </p>
          </div>
        </div>

        {/* ==================================
            PROJECT ARCHIVE PANEL
        ================================== */}

        <div className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-[#0B0D10] text-white">

          {/* PANEL BACKGROUND */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-br from-[#0B0D10] via-[#121419] to-[#1D1D28]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 -z-10 h-100 w-100 rounded-full bg-[#4F46FF] opacity-[0.055] blur-[120px]"
          />

          {/* PANEL HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8">
            <div className="flex items-center gap-3">
              <Layers
                aria-hidden="true"
                size={18}
                strokeWidth={1.5}
                className="text-[#C7FF3D]"
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                Selected Projects / Archive
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                {formatNumber(relatedProjects.length)}
                {" "}
                Available
              </span>
            </div>
          </div>

          {/* ==================================
              RELATED PROJECT CARDS
          ================================== */}

          <div
            className={[
              "grid gap-12 p-5",
              "md:p-8 lg:p-10",
              relatedProjects.length > 1
                ? "md:grid-cols-2 md:gap-8 lg:gap-12"
                : "grid-cols-1",
            ].join(" ")}
          >
            {relatedProjects.map((relatedProject) => (
              <ProjectCard
                key={relatedProject.slug}
                project={relatedProject}
                featured={false}
                priority={false}
                imageSizes={(relatedProjects.length === 1) ? "(max-width: 767px) 90vw, 672px" : "(max-width: 767px) 90vw, (max-width: 1439px) 45vw, 640px"}
                className={
                  relatedProjects.length === 1
                    ? "w-full max-w-2xl"
                    : "w-full"
                }
              />
            ))}
          </div>

          {/* PANEL FOOTER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-5 md:px-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              Different Builds. Shared Curiosity.
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
              Aether Lab / Project Archive
            </span>
          </div>
        </div>

        {/* ==================================
            EXPLORE ALL BUILDS
        ================================== */}

        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href="/#builds"
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-black/15 bg-white/60 px-6 py-4 text-sm font-medium text-[#0B0D10] transition-colors duration-300 hover:border-black/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46FF] sm:px-8"
          >
            <LayoutGrid
              aria-hidden="true"
              size={18}
              strokeWidth={1.5}
              className="text-[#4F46FF]"
            />

            <span>Explore All Builds</span>

            <ArrowUpRight
              aria-hidden="true"
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6 md:mt-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
            Aether Lab / Project Continuum
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/40">
              Still Searching. Still Building.
            </span>

            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
