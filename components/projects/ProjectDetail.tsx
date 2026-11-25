
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";

import ProjectHero from "@/components/projects/ProjectHero";
import ProjectOverview from "@/components/projects/ProjectOverview";
import ProjectFeatures from "@/components/projects/ProjectFeatures";
import ProjectArchitecture from "@/components/projects/ProjectArchitecture";
import ProjectTechnology from "@/components/projects/ProjectTechnology";

import type { Project } from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectDetailProps = {
  project: Project;
};

// ==========================================
// PROJECT DETAIL
// ==========================================

export default function ProjectDetail({
  project,
}: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-[#0B0D10] text-white">

      {/* ==================================
          PROJECT NAVIGATION
      ================================== */}

      <header className="relative z-30 border-b border-white/10">
        <div className="aether-container flex min-h-21 items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="Aether Lab homepage"
            className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-[#C7FF3D]"
          >
            <Image
              src="/aether-mark.svg"
              alt=""
              width={34}
              height={34}
              className="h-8.5 w-8.5 object-contain brightness-0 invert"
            />

            <span className="font-display text-lg font-medium tracking-[-0.04em]">
              AETHER LAB.
            </span>
          </Link>

          <Link
            href="/#builds"
            className="group flex items-center gap-3 rounded-full border border-white/15 px-4 py-3 text-xs text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D]"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 motion-safe:group-hover:-translate-x-1"
            />

            <span className="hidden sm:inline">
              Back to Selected Builds
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </Link>
        </div>
      </header>

      {/* ==================================
          PROJECT SECTIONS
      ================================== */}

      <ProjectHero project={project} />

      <ProjectOverview project={project} />

      <ProjectFeatures
        key={`features-${project.slug}`}
        project={project}
      />

      <ProjectArchitecture
        key={`architecture-${project.slug}`}
        project={project}
      />

      <ProjectTechnology
        key={`technology-${project.slug}`}
        project={project}
      />

      {/* ==================================
          PROJECT FOOTER
      ================================== */}

      <footer className="border-t border-white/10 bg-[#0B0D10] py-12">
        <div className="aether-container flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg tracking-[-0.03em]">
              AETHER LAB.
            </span>

            <p className="mt-2 text-xs text-white/45">
              Still searching. Still building.
            </p>
          </div>

          <Link
            href="/#builds"
            className="group flex items-center gap-3 rounded-md text-sm text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D]"
          >
            Explore more builds

            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1"
            />
          </Link>
        </div>
      </footer>
    </main>
  );
}
