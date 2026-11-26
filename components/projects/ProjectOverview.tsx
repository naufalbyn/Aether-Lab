
import {
  Plus,
  ScanSearch,
  Target,
  ArrowUpRight,
  Users,
  Fingerprint,
  Flag,
  Globe,
  CalendarDays,
  Layers,
  Monitor,
  Code2,
} from "lucide-react";

import type {
  Project,
  ProjectEvent,
} from "@/data/projects";

// ==========================================
// TYPES
// ==========================================

type ProjectOverviewProps = {
  project: Project;
};

type EventCardProps = {
  event: ProjectEvent;
  index: number;
  accent: string;
};

// ==========================================
// UTILITIES
// ==========================================

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

function formatNumber(number: number) {
  return String(number).padStart(2, "0");
}

// ==========================================
// EVENT CARD
// ==========================================

function EventCard({
  event,
  index,
  accent,
}: EventCardProps) {
  const isGlobal =
    /global|international/i.test(event.type);

  return (
    <article className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/65 p-6 transition-all duration-300 hover:border-black/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] md:p-7">

      {/* DECORATIVE BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 -z-10 h-40 w-40 rounded-full border"
        style={{
          borderColor: `${accent}15`,
        }}
      >
        <div
          className="absolute inset-5 rounded-full border"
          style={{
            borderColor: `${accent}10`,
          }}
        />
      </div>

      {/* EVENT HEADER */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#0B0D10]">

          {isGlobal ? (
            <Globe
              aria-hidden="true"
              size={25}
              strokeWidth={1.4}
              style={{
                color: accent,
              }}
            />
          ) : (
            <Flag
              aria-hidden="true"
              size={25}
              strokeWidth={1.4}
              style={{
                color: accent,
              }}
            />
          )}

        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/40">
          Event_{formatNumber(index + 1)}
        </span>
      </div>

      {/* EVENT IDENTITY */}

      <div className="mt-7">
        <span className="inline-flex rounded-full border border-black/10 bg-black/3 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-black/60">
          {event.type}
        </span>

        <h4 className="mt-4 wrap-break-word font-display text-2xl font-medium leading-tight tracking-[-0.045em]">
          {event.name}
        </h4>

        {event.organizer && (
          <div className="mt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-black/40">
              Organized By
            </span>

            <p className="mt-1.5 text-sm font-medium text-black/75">
              {event.organizer}
            </p>
          </div>
        )}
      </div>

      {/* EVENT METADATA */}

      <dl className="mt-6 flex-1 space-y-4 border-t border-black/10 pt-5">

        {event.ecosystem && (
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2.5 text-xs text-black/50">
              <Layers
                aria-hidden="true"
                size={14}
                strokeWidth={1.5}
                className="shrink-0"
              />

              Ecosystem
            </dt>

            <dd className="text-right text-xs font-medium text-black/75">
              {event.ecosystem}
            </dd>
          </div>
        )}

        {event.format && (
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2.5 text-xs text-black/50">
              <Monitor
                aria-hidden="true"
                size={14}
                strokeWidth={1.5}
                className="shrink-0"
              />

              Format
            </dt>

            <dd className="text-right text-xs font-medium text-black/75">
              {event.format}
            </dd>
          </div>
        )}

        {event.period && (
          <div className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2.5 text-xs text-black/50">
              <CalendarDays
                aria-hidden="true"
                size={14}
                strokeWidth={1.5}
                className="shrink-0"
              />

              Period
            </dt>

            <dd className="text-right text-xs font-medium leading-5 text-black/75">
              {event.period}
            </dd>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <dt className="flex items-center gap-2.5 text-xs text-black/50">
            <Code2
              aria-hidden="true"
              size={14}
              strokeWidth={1.5}
              className="shrink-0"
            />

            Participation
          </dt>

          <dd className="text-right text-xs font-medium leading-5 text-black/75">
            {event.participation}
          </dd>
        </div>
      </dl>

      {/* EVENT WEBSITE */}

      {event.website && (
        <div className="mt-6 border-t border-black/10 pt-5">
          <a
            href={event.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${event.name} official website`}
            className="group/link flex min-h-11 items-center justify-between gap-3 rounded-xl border border-black/10 px-4 py-3 text-xs font-medium text-black/70 transition-colors duration-300 hover:border-black/25 hover:bg-black/3 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46FF]"
          >
            Event Website

            <ArrowUpRight
              aria-hidden="true"
              size={16}
              strokeWidth={1.6}
              className="shrink-0 transition-transform duration-300 motion-safe:group-hover/link:-translate-y-0.5 motion-safe:group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
      )}
    </article>
  );
}

// ==========================================
// PROJECT OVERVIEW
// ==========================================

export default function ProjectOverview({
  project,
}: ProjectOverviewProps) {
  const focusAreas = project.focusAreas ?? [];

  const team = project.team ?? [];

  const events = project.events ?? [];

  return (
    <section
      id="project-overview"
      aria-labelledby="overview-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] py-24 text-[#0B0D10] md:py-32 lg:py-36"
    >
      {/* ==================================
          DECORATIVE BACKGROUND
      ================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-64 top-24 -z-10 hidden h-170 w-170 opacity-60 lg:block"
      >
        <div className="absolute inset-[8%] rounded-full border border-black/[0.035]" />

        <div className="absolute inset-[20%] rounded-full border border-black/[0.035]" />

        <div className="absolute inset-[32%] rounded-full border border-[#4F46FF]/5" />

        <div className="absolute inset-[24%] rotate-45 scale-y-[0.4] rounded-full border border-[#4F46FF]/5" />
      </div>

      <div className="aether-container relative z-10">

        {/* ==================================
            SECTION HEADER
        ================================== */}

        <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4F46FF]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/55">
              01 / Project Overview
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
            EDITORIAL OVERVIEW
        ================================== */}

        <div className="grid gap-10 pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-20">
          <div className="lg:col-span-5">
            <h2
              id="overview-title"
              className="font-display text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.06em]"
            >
              The
              <br />

              <span className="text-[#4F46FF]">
                project.
              </span>
            </h2>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <span className="h-px w-8 bg-black/20" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/45">
                Context & Direction
              </span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-3xl font-display text-xl leading-relaxed tracking-tight text-black/75 md:text-3xl">
              {project.overview}
            </p>
          </div>
        </div>

        {/* ==================================
            MY CONTRIBUTION
        ================================== */}

        <div className="mt-16 grid gap-8 border-t border-black/15 pt-8 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Fingerprint
                aria-hidden="true"
                size={17}
                strokeWidth={1.5}
                className="text-[#4F46FF]"
              />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4F46FF]">
                My Contribution
              </span>
            </div>

            <h3 className="mt-5 max-w-lg font-display text-[clamp(1.8rem,3vw,3rem)] font-medium leading-tight tracking-[-0.045em]">
              {project.role}

              <span className="text-[#4F46FF]">
                .
              </span>
            </h3>
          </div>

          <div className="lg:col-span-7">
            <p className="max-w-2xl text-base leading-8 text-black/65">
              {project.contribution}
            </p>
          </div>
        </div>

        {/* ==================================
            DEVELOPMENT FOCUS AREAS
        ================================== */}

        {focusAreas.length > 0 && (
          <div className="mt-12 grid gap-6 border-t border-black/10 pt-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50">
                Development Focus
              </span>

              <p className="mt-3 max-w-xs text-sm leading-6 text-black/55">
                Key areas of exploration and
                development within this project.
              </p>
            </div>

            <ul
              aria-label="Development focus areas"
              className="flex flex-wrap items-start gap-3 lg:col-span-7"
            >
              {focusAreas.map((area, index) => (
                <li
                  key={`${area}-${index}`}
                  className="group flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-4 py-3 transition-colors duration-300 hover:border-[#4F46FF]/25 hover:bg-[#4F46FF]/5"
                >
                  <Plus
                    aria-hidden="true"
                    size={13}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#4F46FF] transition-transform duration-300 motion-safe:group-hover:rotate-90"
                  />

                  <span className="text-xs font-medium leading-5 text-black/70 md:text-sm">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ==================================
            PROBLEM & OBJECTIVE
        ================================== */}

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24 lg:gap-6">

          {/* PROBLEM CARD */}

          <article className="group relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white/60 p-7 transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.045)] md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4F46FF]/15 bg-[#4F46FF]/5">
                <ScanSearch
                  aria-hidden="true"
                  size={25}
                  strokeWidth={1.4}
                  className="text-[#4F46FF]"
                />
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/40">
                / 01
              </span>
            </div>

            <div className="relative z-10 mt-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/45">
                The Challenge
              </span>

              <h3 className="mt-4 font-display text-[clamp(2rem,3.3vw,3.5rem)] font-medium leading-tight tracking-[-0.055em]">
                The problem.
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-8 text-black/65 md:text-base">
                {project.problem}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full border border-[#4F46FF]/10"
            >
              <div className="absolute inset-6 rounded-full border border-[#4F46FF]/5" />

              <div className="absolute inset-12 rounded-full border border-[#4F46FF]/5" />
            </div>
          </article>

          {/* OBJECTIVE CARD */}

          <article className="group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0B0D10] p-7 text-white md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20"
              style={{
                background:
                  "linear-gradient(145deg, #0B0D10 10%, #1D1D28 100%)",
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-[#4F46FF]/15 blur-[90px]"
            />

            <div className="flex items-center justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C7FF3D]/20 bg-[#C7FF3D]/5">
                <Target
                  aria-hidden="true"
                  size={25}
                  strokeWidth={1.4}
                  className="text-[#C7FF3D]"
                />
              </div>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                / 02
              </span>
            </div>

            <div className="relative z-10 mt-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C7FF3D]">
                The Direction
              </span>

              <h3 className="mt-4 font-display text-[clamp(2rem,3.3vw,3.5rem)] font-medium leading-tight tracking-[-0.055em]">
                The objective.
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-8 text-white/65 md:text-base">
                {project.objective}
              </p>
            </div>

            <ArrowUpRight
              aria-hidden="true"
              size={120}
              strokeWidth={0.5}
              className="pointer-events-none absolute -bottom-7 -right-7 -z-10 rotate-12 text-white/[0.035] transition-transform duration-500 motion-safe:group-hover:translate-x-2 motion-safe:group-hover:-translate-y-2"
            />
          </article>
        </div>

        {/* ==================================
            PROJECT TEAM
        ================================== */}

        {team.length > 0 && (
          <div className="mt-16 border-t border-black/15 pt-10 lg:mt-24 lg:pt-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">

              {/* TEAM HEADING */}

              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <Users
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#4F46FF]"
                  />

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4F46FF]">
                    Project Team
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.05] tracking-[-0.055em]">
                  People behind
                  <br />

                  <span className="text-[#4F46FF]">
                    the build.
                  </span>
                </h3>

                <p className="mt-5 max-w-xs text-sm leading-7 text-black/55">
                  Contributors involved in bringing
                  this project from concept to its
                  documented state.
                </p>

                {project.teamSize !== undefined && (
                  <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-4 py-2.5">
                    <Users
                      aria-hidden="true"
                      size={15}
                      strokeWidth={1.5}
                      className="text-[#4F46FF]"
                    />

                    <span className="font-mono text-[10px] uppercase tracking-widest text-black/60">
                      {formatNumber(project.teamSize)}
                      {" "}
                      {project.teamSize === 1
                        ? "Member"
                        : "Members"}
                    </span>
                  </div>
                )}
              </div>

              {/* TEAM MEMBERS */}

              <div className="lg:col-span-8">
                <ul
                  aria-label="Project team members"
                  className="grid gap-3"
                >
                  {team.map((member, index) => (
                    <li
                      key={`${member.name}-${index}`}
                      className="group flex items-center gap-4 rounded-2xl border border-black/10 bg-white/60 p-4 transition-colors duration-300 hover:border-[#4F46FF]/25 sm:gap-5 sm:p-6"
                    >
                      {/* INITIALS AVATAR */}

                      <div
                        aria-hidden="true"
                        className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#4F46FF]/10 bg-[#4F46FF]/5 sm:h-16 sm:w-16"
                      >
                        <span className="font-display text-xl font-medium tracking-tighter text-[#4F46FF]">
                          {getInitials(member.name)}
                        </span>

                        <span className="absolute -bottom-3 -right-3 h-10 w-10 rounded-full border border-[#4F46FF]/15" />
                      </div>

                      {/* MEMBER INFORMATION */}

                      <div className="min-w-0 flex-1">
                        <h4 className="wrap-break-word font-display text-base font-medium leading-tight tracking-tight sm:text-xl">
                          {member.name}
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-black/55 sm:text-sm">
                          {member.role}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="hidden shrink-0 font-mono text-[10px] text-black/35 sm:block"
                      >
                        / {formatNumber(index + 1)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* TEAM CONTEXT */}

                {project.teamNote && (
                  <p className="mt-4 text-xs leading-6 text-black/50">
                    {project.teamNote}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================
            HACKATHON PARTICIPATION
        ================================== */}

        {events.length > 0 && (
          <div
            id="project-events"
            aria-labelledby="project-events-title"
            className="mt-16 border-t border-black/15 pt-10 lg:mt-24 lg:pt-14"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">

              {/* EVENT SECTION HEADING */}

              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <Flag
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.4}
                    className="text-[#4F46FF]"
                  />

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#4F46FF]">
                    Competitive Experience
                  </span>
                </div>

                <h3
                  id="project-events-title"
                  className="mt-5 font-display text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.055em]"
                >
                  Built through
                  <br />

                  <span className="text-[#4F46FF]">
                    competition.
                  </span>
                </h3>

                <p className="mt-5 max-w-xs text-sm leading-7 text-black/55">
                  Collaborative technology
                  development through hackathons
                  and competitive project building.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-6 bg-black/20" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/45">
                    {formatNumber(events.length)}
                    {" "}
                    {events.length === 1
                      ? "Documented Event"
                      : "Documented Events"}
                  </span>
                </div>
              </div>

              {/* EVENT CARDS */}

              <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-8">
                {events.map((event, index) => (
                  <EventCard
                    key={`${event.name}-${index}`}
                    event={event}
                    index={index}
                    accent={project.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================
            SECTION FOOTER
        ================================== */}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-black/15 pt-6 lg:mt-24">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
            Aether Lab / Project Overview
          </span>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40">
              Built with Purpose
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]" />
          </div>
        </div>
      </div>
    </section>
  );
}
