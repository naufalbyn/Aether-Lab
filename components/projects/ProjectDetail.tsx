
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
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectGameplay from "@/components/projects/ProjectGameplay";
import ProjectMetrics from "@/components/projects/ProjectMetrics";
import RelatedProjects from "@/components/projects/RelatedProjects";

import {
  getRelatedProjects,
  type Project,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectDetailProps = {
  project: Project;
};

// ==========================================
// SECTION NUMBERING SYSTEM
// ==========================================

function formatSectionNumber(number: number) {
  return String(number).padStart(2, "0");
}

function getProjectSections(project: Project) {
  const hasGallery =
    (project.images?.gallery?.length ?? 0) > 0;

  const hasGameplay =
    Boolean(project.gameplay) &&
    project.slug === "stack-block-arcade";

  const hasMetrics =
    (project.metrics?.length ?? 0) > 0;

  const hasRelatedProjects =
    getRelatedProjects(project.slug, 2).length > 0;

  const optionalSections = [
    {
      id: "gallery",
      visible: hasGallery,
    },
    {
      id: "gameplay",
      visible: hasGameplay,
    },
    {
      id: "metrics",
      visible: hasMetrics,
    },
    {
      id: "related",
      visible: hasRelatedProjects,
    },
  ] as const;

  return optionalSections
    .filter((section) => section.visible)
    .map((section, index) => ({
      id: section.id,

      number: formatSectionNumber(
        index + 5
      ),
    }));
}

// ==========================================
// PROJECT DETAIL
// ==========================================

export default function ProjectDetail({
  project,
}: ProjectDetailProps) {
  const sections = getProjectSections(project);

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
              aria-hidden="true"
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
          CORE PROJECT SECTIONS
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
          DYNAMIC OPTIONAL SECTIONS
      ================================== */}

      {sections.map((section) => {
        const key =
          `${section.id}-${project.slug}`;

        switch (section.id) {
          case "gallery":
            return (
              <ProjectGallery
                key={key}
                project={project}
                sectionNumber={section.number}
              />
            );

          case "gameplay":
            return (
              <ProjectGameplay
                key={key}
                project={project}
                sectionNumber={section.number}
              />
            );

          case "metrics":
            return (
              <ProjectMetrics
                key={key}
                project={project}
                sectionNumber={section.number}
              />
            );

          case "related":
            return (
              <RelatedProjects
                key={key}
                project={project}
                sectionNumber={section.number}
              />
            );

          default:
            return null;
        }
      })}

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
              aria-hidden="true"
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
