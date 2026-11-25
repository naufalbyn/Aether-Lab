
import Image from "next/image";

import { Plus } from "lucide-react";

import AmbientBackground from "@/components/effects/AmbientBackground";
import ProjectVisual from "@/components/projects/ProjectVisual";

import type {
  Project,
  ProjectStatus,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectHeroProps = {
  project: Project;
};

// ==========================================
// STATUS COLORS
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
// PROJECT HERO
// ==========================================

export default function ProjectHero({
  project,
}: ProjectHeroProps) {
  const statusColor =
    statusColors[project.status];

  const gallery = project.images?.gallery ?? [];

  const coverImage = gallery.find(
    (image) => image.src === project.images?.cover
  );

  const supportingImage = gallery.find(
    (image) => image.src !== project.images?.cover
  );

  const presentationImages = [
    supportingImage,
    coverImage,
  ].filter(
    (image): image is NonNullable<typeof image> =>
      image !== undefined
  );

  const hasPresentationImages =
    project.visualMode !== "concept" &&
    presentationImages.length > 0;

  const projectInformation = [
    {
      label: "Project Type",
      value: project.projectType,
    },
    {
      label: "My Role",
      value: project.role,
    },
    ...(project.network
      ? [
          {
            label: "Network",
            value: project.network,
          },
        ]
      : []),
    ...(project.deliveryModel
      ? [
          {
            label: "Delivery",
            value: project.deliveryModel,
          },
        ]
      : []),
  ];

  return (
    <section
      aria-labelledby="project-title"
      className="relative isolate overflow-hidden pb-20 pt-12 md:pb-28 md:pt-20"
    >
      {/* ==================================
          BACKGROUND SYSTEM
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-45"
        style={{
          background: project.gradient,
        }}
      />

      <AmbientBackground
        variant="dark"
        intensity={0.5}
        animated
        grid
        className="-z-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-150 w-150 rounded-full opacity-10 blur-[140px]"
        style={{
          backgroundColor: project.accent,
        }}
      />

      <div className="aether-container relative z-10">
        {/* ==================================
            PROJECT HEADER
        ================================== */}

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
              Project / {project.number}
            </span>

            <span className="h-3 w-px bg-white/15" />

            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
              {project.projectType}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 sm:block">
              Aether Lab / Project Archive
            </span>

            <Plus
              size={17}
              strokeWidth={1}
              className="text-white/40"
            />
          </div>
        </div>

        {/* ==================================
            PROJECT TITLE
        ================================== */}

        <div className="pb-10 pt-12 md:pb-14 md:pt-16">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 shrink-0"
              style={{
                backgroundColor: project.accent,
              }}
            />

            <span className="font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-white/60">
              {project.category}
            </span>
          </div>

          <h1
            id="project-title"
            className="mt-6 max-w-6xl wrap-break-word font-display text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.065em]"
          >
            {project.title}

            <span
              style={{
                color: project.accent,
              }}
            >
              .
            </span>
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p
                className="max-w-3xl font-display text-[clamp(1.3rem,3vw,2.6rem)] leading-tight tracking-[-0.035em]"
                style={{
                  color: project.accent,
                }}
              >
                {project.tagline}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                {project.description}
              </p>
            </div>

            {/* ==================================
                PROJECT STATUS
            ================================== */}

            <div className="lg:col-span-4">
              <div
                className="rounded-2xl border p-6 backdrop-blur-md"
                style={{
                  borderColor: `${statusColor}35`,
                  backgroundColor: `${statusColor}08`,
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                  Current Status
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: statusColor,
                      boxShadow: `0 0 14px ${statusColor}50`,
                    }}
                  />

                  <span
                    className="text-base font-medium"
                    style={{
                      color: statusColor,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/65">
                  {project.statusDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            PROJECT INFORMATION
        ================================== */}

        <dl
          className={[
            "grid grid-cols-1 gap-6",
            "border-y border-white/15 py-7",
            "sm:grid-cols-2",
            projectInformation.length === 3
              ? "lg:grid-cols-3"
              : projectInformation.length === 4
                ? "lg:grid-cols-4"
                : "lg:grid-cols-2",
          ].join(" ")}
        >
          {projectInformation.map(
            (information) => (
              <div
                key={information.label}
                className="min-w-0"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
                  {information.label}
                </dt>

                <dd className="mt-3 text-sm leading-6 text-white/85 md:text-base">
                  {information.value}
                </dd>
              </div>
            )
          )}
        </dl>

        {/* ==================================
            PROJECT PRESENTATION
        ================================== */}

        <div className="mt-10 md:mt-14">
          {hasPresentationImages ? (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-6 md:p-8">
              {/* Presentation Header */}

              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: project.accent,
                    }}
                  />

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                    Project Presentation
                  </span>
                </div>

                <Plus
                  size={16}
                  strokeWidth={1}
                  className="text-white/40"
                />
              </div>

              {/* Presentation Images */}

              <div
                className={[
                  "mt-6 grid items-start gap-6",
                  presentationImages.length > 1
                    ? "md:grid-cols-2"
                    : "mx-auto max-w-3xl",
                ].join(" ")}
              >
                {presentationImages.map(
                  (image, index) => (
                    <figure
                      key={image.src}
                      className="min-w-0"
                    >
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/15">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width ?? 1122}
                          height={image.height ?? 1402}
                          sizes="(max-width: 767px) 90vw, (max-width: 1536px) 45vw, 680px"
                          quality={75}
                          loading={
                            index === 0
                              ? "eager"
                              : "lazy"
                          }
                          draggable={false}
                          className="block h-auto w-full"
                        />
                      </div>

                      <figcaption className="mt-4 flex items-start gap-3">
                        <span
                          className="font-mono text-[10px]"
                          style={{
                            color: project.accent,
                          }}
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-xs leading-6 text-white/55">
                          {image.caption ?? image.alt}
                        </span>
                      </figcaption>
                    </figure>
                  )
                )}
              </div>

              {/* Presentation Footer */}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  {project.title} /{" "}
                  {project.visualMode === "mockup"
                    ? "Project Mockups"
                    : "Project Screenshots"}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
                  Aether Lab / Selected Builds
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-5xl">
              <ProjectVisual
                project={project}
                animated={false}
                className="rounded-3xl"
              />

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  Project Presentation / {project.title}
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                  Aether Lab / Selected Builds
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
