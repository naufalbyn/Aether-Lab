
import { Plus, ArrowDownRight } from "lucide-react";

import AmbientBackground from "@/components/effects/AmbientBackground";
import ProjectCarousel from "@/components/projects/ProjectCarousel";

import { getAllProjects } from "@/data/projects";

const FEATURED_PROJECT_SLUG = "bangau-matahari";

export default function SelectedBuilds() {
  const projects = getAllProjects();

  const featuredProject = projects.find(
    (project) => project.slug === FEATURED_PROJECT_SLUG
  );

  const orderedProjects = featuredProject
    ? [
        featuredProject,
        ...projects.filter(
          (project) => project.slug !== featuredProject.slug
        ),
      ]
    : projects;

  const projectCount = String(
    orderedProjects.length
  ).padStart(2, "0");

  if (orderedProjects.length === 0) {
    return null;
  }

  return (
    <section
      id="builds"
      aria-labelledby="builds-title"
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-36 lg:py-44"
    >
      {/* Background System */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(155deg, #0B0D10 0%, #111318 50%, #17131E 100%)",
        }}
      />

      <AmbientBackground
        variant="dark"
        intensity={0.7}
        animated
        grid
        className="-z-10"
      />

      {/* Decorative Orbital System */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-16 -z-10 hidden h-212.5 w-212.5 opacity-40 lg:block"
      >
        <div
          data-motion-parallax="60"
          className="relative h-full w-full"
        >
          <div className="absolute inset-[8%] rounded-full border border-white/10" />

          <div className="absolute inset-[20%] rounded-full border border-white/5" />

          <div className="absolute inset-[32%] rounded-full border border-[#4F46FF]/20" />

          <div className="absolute inset-[20%] rotate-45 scale-y-[0.4] rounded-full border border-white/10" />

          <div className="absolute inset-[30%] rounded-full bg-[#4F46FF]/10 blur-[100px]" />

          <span className="absolute left-1/2 top-[8%] h-2 w-2 rounded-full bg-[#C7FF3D] shadow-[0_0_18px_#C7FF3D]" />
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}

        <div
          data-motion="fade"
          className="flex items-center justify-between border-b border-white/15 pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C7FF3D] shadow-[0_0_12px_rgba(199,255,61,0.5)]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              04 / Selected Builds
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              From Idea to Implementation
            </span>

            <Plus
              size={16}
              strokeWidth={1}
              className="text-white/40"
            />
          </div>
        </div>

        {/* Editorial Heading */}

        <div className="grid gap-10 pb-14 pt-14 lg:grid-cols-12 lg:items-end lg:pb-20 lg:pt-24">
          <div
            data-motion="up"
            data-motion-distance="45"
            className="lg:col-span-8"
          >
            <h2
              id="builds-title"
              className="font-display text-[clamp(3.5rem,8.5vw,9rem)] font-medium leading-[0.88] tracking-[-0.07em]"
            >
              Selected
              <br />

              <span className="text-[#C7FF3D]">
                builds.
              </span>
            </h2>
          </div>

          <div
            data-motion="up"
            data-motion-delay="0.12"
            className="lg:col-span-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C7FF3D]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C7FF3D]">
                The Work
              </span>
            </div>

            <p className="mt-5 max-w-sm text-base leading-8 text-white/60">
              Real projects. Different challenges.
              Continuous exploration across software,
              blockchain, and digital experiences.
            </p>

            <ArrowDownRight
              size={34}
              strokeWidth={1}
              className="mt-8 hidden text-white/30 lg:block"
            />
          </div>
        </div>

        {/* Horizontal Project Showcase */}

        <div
          data-motion="up"
          data-motion-distance="30"
          data-motion-duration="1"
          className="min-w-0"
        >
          <ProjectCarousel
            projects={orderedProjects}
            featuredSlug={featuredProject?.slug}
          />
        </div>

        {/* Continuous Development */}

        <div
          data-motion="up"
          data-motion-distance="25"
          className="mt-12 rounded-2xl border border-dashed border-white/15 bg-white/2.5 px-6 py-8 md:mt-20 md:px-10 md:py-12"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#C7FF3D]/40 motion-safe:animate-ping" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C7FF3D]" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#C7FF3D]">
                  Continuous Exploration
                </span>
              </div>

              <h3 className="mt-5 font-display text-2xl leading-tight tracking-[-0.04em] text-white/85 md:text-4xl">
                More to explore.
                <br />
                More to build.
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
                This collection evolves with every
                new project, prototype, and technical
                exploration.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:h-24 md:w-24"
            >
              <div className="absolute inset-3 rounded-xl border border-white/5" />

              <Plus
                size={32}
                strokeWidth={1}
                className="text-white/35"
              />

              <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-[#C7FF3D]/50" />

              <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-[#C7FF3D]/50" />
            </div>
          </div>
        </div>

        {/* Section Footer */}

        <div
          data-motion="fade"
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
            Aether Lab / Project Archive
          </span>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              {projectCount} Selected Builds
            </span>

            <span className="h-3 w-px bg-white/15" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              Still Building
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
