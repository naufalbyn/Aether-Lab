
import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  BriefcaseBusiness,
  Camera,
  Code2,
  Compass,
  Globe,
  Mail,
  Plus,
  Send,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

import FounderArchive from "@/components/founder/FounderArchive";
import HumanDimensions from "@/components/founder/HumanDimensions";

import {
  founderIdentity,
  founderBiography,
  founderPhilosophy,
  founderVision,
  getFounderArchiveGroups,
  getFounderConnections,
} from "@/data/founder";

// ==========================================
// CONNECTION ICON SYSTEM
// ==========================================

function ConnectionIcon({
  platform,
  size = 20,
}: {
  platform: string;
  size?: number;
}) {
  const props = {
    size,
    strokeWidth: 1.4,
    "aria-hidden": true as const,
  };

  switch (platform) {
    case "github":
      return <Code2 {...props} />;

    case "linkedin":
      return <BriefcaseBusiness {...props} />;

    case "instagram":
      return <Camera {...props} />;

    case "x":
      return <AtSign {...props} />;

    case "telegram":
      return <Send {...props} />;

    case "email":
      return <Mail {...props} />;

    default:
      return <Globe {...props} />;
  }
}

// ==========================================
// SECTION LABEL
// ==========================================

function FounderLabel({
  number,
  label,
  dark = false,
}: {
  number: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">

      <span
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          dark
            ? "bg-[#C7FF3D]"
            : "bg-[#4F46FF]"
        }`}
      />

      <span
        className={`font-mono text-[10px] uppercase tracking-[0.15em] ${
          dark
            ? "text-white/50"
            : "text-black/50"
        }`}
      >
        {number} / {label}
      </span>
    </div>
  );
}

// ==========================================
// THE HUMAN BEHIND AETHER
// ==========================================

export default function HumanBehindAether() {
  const connections = getFounderConnections();

  const archiveGroups = getFounderArchiveGroups();

  return (
    <section
      id="about"
      aria-labelledby="human-behind-aether-title"
      className="relative isolate overflow-hidden bg-[#F5F5F2] text-[#0B0D10]"
    >

      {/* ==================================
          OPENING / BEYOND THE CODE
          Source: Design F
      ================================== */}

      <div className="relative isolate pb-20 pt-24 md:pb-28 md:pt-36 lg:pt-40">

        {/* Editorial background */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-y-0 left-[8%] hidden w-px bg-black/[0.035] lg:block" />

          <div className="absolute inset-y-0 right-[8%] hidden w-px bg-black/[0.035] lg:block" />

          <div className="absolute -right-48 top-0 h-150 w-150 rounded-full bg-[#4F46FF]/4.5 blur-[150px]" />
        </div>

        <div className="aether-container">

          {/* Section header */}

          <Reveal>
            <div className="flex items-center justify-between gap-4 border-b border-black/15 pb-6 md:pb-8">

              <FounderLabel
                number="09"
                label="Founder"
              />

              <div className="flex items-center gap-4">

                <span className="hidden font-mono text-[9px] uppercase tracking-wider text-black/45 sm:block">
                  Aether / Human Origin
                </span>

                <Plus
                  size={17}
                  strokeWidth={1}
                  aria-hidden="true"
                  className="text-black/40"
                />
              </div>
            </div>
          </Reveal>

          {/* Opening typography */}

          <Reveal
            className="mt-14 md:mt-20 lg:mt-24"
            y={35}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">

              <div className="lg:col-span-8">

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45">
                  The Human Behind Aether
                </span>

                <h2
                  id="human-behind-aether-title"
                  className="mt-7 font-display text-[clamp(3rem,8vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.075em]"
                >
                  Beyond

                  <span className="block text-[#4F46FF]">
                    the code.
                  </span>
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-8 text-black/60 md:text-base lg:col-span-4 lg:pb-2">

                The perspective behind
                Aether Lab. An independent
                technology studio shaped by
                curiosity, creation, and
                continuous exploration.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ==================================
          01 / HUMAN ORIGIN
          Source: Design D
          No portrait or monogram
      ================================== */}

      <div className="border-y border-white/10 bg-[#11131A] py-20 text-white md:py-28 lg:py-32">

        <div className="aether-container">

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">

            {/* Founder identity */}

            <Reveal
              y={25}
              className="min-w-0 lg:col-span-4"
            >
              <div>

                <FounderLabel
                  number="01"
                  label="Human Origin"
                  dark
                />

                <h3 className="mt-7 wrap-break-word font-display text-[clamp(2.3rem,4vw,4.5rem)] font-medium leading-[0.97] tracking-[-0.06em]">

                  {founderIdentity.name}.
                </h3>

                <p className="mt-6 text-sm text-[#C7FF3D]">

                  {founderIdentity.role}
                </p>

                <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">

                  {founderIdentity.positioning}
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">

                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">

                    {founderIdentity.location}
                  </span>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {connections.map((connection) => (
                      <a
                        key={connection.platform}
                        href={connection.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={connection.label}
                        title={connection.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/65 transition-colors hover:border-[#C7FF3D]/40 hover:text-[#C7FF3D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7FF3D]"
                      >
                        <ConnectionIcon
                          platform={connection.platform}
                          size={18}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Founder biography */}

            <Reveal
              y={30}
              delay={0.08}
              className="min-w-0 lg:col-span-7 lg:col-start-6"
            >
              <div>

                <h3 className="font-display text-[clamp(2rem,4.4vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.06em]">

                  More than the systems
                  I build.
                </h3>

                <div className="mt-9 max-w-2xl space-y-5 text-sm leading-8 text-white/65 md:text-base md:leading-9">

                  {founderBiography.paragraphs
                    .slice(0, 3)
                    .map((paragraph, index) => (
                      <p key={index}>
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ==================================
          02 / THE PERSPECTIVE
          Source: Design F
      ================================== */}

      <div className="py-24 md:py-36">

        <div className="aether-container">

          <Reveal y={20}>
            <div className="border-b border-black/15 pb-7">

              <FounderLabel
                number="02"
                label="The Perspective"
              />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-12">

            {/* Permanent personal principles */}

            <Reveal
              y={35}
              className="min-w-0 lg:col-span-5"
            >
              <div className="font-display text-[clamp(2.5rem,5.4vw,6.2rem)] font-medium leading-[1.03] tracking-[-0.065em]">

                <span className="block">
                  Curiosity.
                </span>

                <span className="block">
                  Creation.
                </span>

                <span className="block text-[#4F46FF]">
                  Evolution.
                </span>
              </div>
            </Reveal>

            {/* Remaining evergreen biography */}

            <Reveal
              y={30}
              delay={0.08}
              className="min-w-0 lg:col-span-7"
            >
              <h3 className="max-w-2xl font-display text-[clamp(1.6rem,2.9vw,3.2rem)] font-medium leading-snug tracking-[-0.045em]">

                {founderPhilosophy.headline}
              </h3>

              <div className="mt-8 max-w-2xl space-y-5 text-sm leading-8 text-black/65 md:text-base md:leading-9">

                {founderBiography.paragraphs
                  .slice(3)
                  .map((paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            </Reveal>
          </div>

          {/* Personal manifesto */}

          <Reveal
            className="mt-14 md:mt-20"
            y={20}
          >
            <div className="grid gap-6 border-y border-black/15 py-8 md:grid-cols-12 md:items-center md:gap-6">

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45 md:col-span-3">
                A Personal Manifesto
              </span>

              <p className="font-display text-xl font-medium leading-relaxed tracking-tight text-[#4F46FF] md:col-span-8 md:text-2xl">

                {founderPhilosophy.statement}
              </p>

              <ArrowDownRight
                size={28}
                strokeWidth={1}
                aria-hidden="true"
                className="hidden text-[#4F46FF] md:block"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ==================================
          03 / THE DIMENSIONS
          Source: Design F
      ================================== */}

      <div className="border-y border-black/10 bg-[#ECECE8] py-20 md:py-28">

        <div className="aether-container">

          <Reveal y={25}>
            <div className="mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end">

              <div className="md:col-span-8">

                <FounderLabel
                  number="03"
                  label="The Dimensions"
                />

                <h3 className="mt-7 font-display text-[clamp(2.4rem,5.8vw,6.3rem)] font-medium leading-[0.96] tracking-[-0.065em]">

                  More than

                  <span className="mt-2 block text-[#4F46FF]">
                    one dimension.
                  </span>
                </h3>
              </div>

              <p className="max-w-sm text-sm leading-7 text-black/60 md:col-span-4 md:text-base">

                Explore the perspectives,
                experiences, creations,
                and ambitions behind
                Aether Lab.
              </p>
            </div>
          </Reveal>

          <HumanDimensions />
        </div>
      </div>

      {/* ==================================
          04 / THE LIVING ARCHIVE
          Source: Design F
      ================================== */}

      {archiveGroups.length > 0 && (
        <div
          id="founder-human-archive"
          className="scroll-mt-24 py-24 md:py-36"
        >
          <div className="aether-container">

            <Reveal y={25}>
              <div className="mb-10 grid gap-8 md:mb-14 md:grid-cols-12 md:items-end">

                <div className="md:col-span-8">

                  <FounderLabel
                    number="04"
                    label="The Living Archive"
                  />

                  <h3 className="mt-7 font-display text-[clamp(2.4rem,5.8vw,6.3rem)] font-medium leading-[0.96] tracking-[-0.065em]">

                    A journey

                    <span className="mt-2 block text-[#4F46FF]">
                      still unfolding.
                    </span>
                  </h3>
                </div>

                <p className="max-w-sm text-sm leading-7 text-black/60 md:col-span-4">

                  Education, leadership,
                  collaboration, and creation.
                  Experiences collected
                  along the way.
                </p>
              </div>
            </Reveal>

            <FounderArchive theme="light" />

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">
                Aether / Founder Archive
              </span>

              <span className="font-mono text-[9px] uppercase tracking-wider text-black/45">
                An Ongoing Record
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ==================================
          05 / THE FUTURE IS UNWRITTEN
          Source: Design D
      ================================== */}

      <div
        id="founder-human-vision"
        className="relative isolate scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#11131A] py-24 text-white md:py-36"
      >

        {/* Cinematic ambient lighting */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >

          <div className="absolute left-1/2 top-0 h-150 w-180 -translate-x-1/2 rounded-full bg-[#4F46FF]/10 blur-[160px]" />

          {/* Decorative concentric rings */}

          <div className="absolute -bottom-96 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full border border-white/10">

            <div className="absolute inset-[15%] rounded-full border border-white/5" />

            <div className="absolute inset-[30%] rounded-full border border-white/5" />

            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#C7FF3D] shadow-[0_0_25px_rgba(199,255,61,0.5)]" />
          </div>
        </div>

        <div className="aether-container">

          <Reveal y={35}>
            <div className="mx-auto max-w-6xl text-center">

              <Compass
                size={36}
                strokeWidth={1.1}
                aria-hidden="true"
                className="mx-auto text-[#C7FF3D]"
              />

              <span className="mt-8 block font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                05 / The Future Is Unwritten
              </span>

              <h3 className="mt-8 font-display text-[clamp(2.4rem,6.6vw,7rem)] font-medium leading-[0.98] tracking-[-0.065em]">

                {founderVision.first}

                <span className="mt-3 block text-[#C7FF3D]">

                  {founderVision.second}
                </span>
              </h3>

              <div className="mx-auto mt-10 max-w-2xl space-y-5 text-sm leading-8 text-white/65 md:text-base">

                {founderVision.paragraphs.map(
                  (paragraph, index) => (
                    <p key={index}>
                      {paragraph}
                    </p>
                  )
                )}
              </div>

              <p className="mt-12 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">

                {founderVision.closing}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ==================================
          06 / THE CONNECTIONS
          Source: Design D
      ================================== */}

      <div className="bg-[#0B0D10] py-20 text-white md:py-28">

        <div className="aether-container">

          <Reveal y={25}>
            <div className="grid gap-7 border-b border-white/10 pb-9 md:grid-cols-12 md:items-end">

              <div className="md:col-span-8">

                <FounderLabel
                  number="06"
                  label="The Connections"
                  dark
                />

                <h3 className="mt-6 font-display text-[clamp(2rem,4.8vw,4.8rem)] font-medium tracking-[-0.055em]">

                  Beyond the universe.
                </h3>
              </div>

              <p className="max-w-sm text-sm leading-7 text-white/55 md:col-span-4">

                Connecting perspectives,
                ideas, and possibilities.
              </p>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {connections.map(
              (connection, index) => (
                <Reveal
                  key={connection.platform}
                  y={20}
                  delay={index * 0.04}
                >
                  <a
                    href={connection.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-white/2.5 p-5 transition-colors hover:border-[#817BFF]/40 hover:bg-[#817BFF]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7FF3D]"
                  >

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#A5A2FF]">

                      <ConnectionIcon
                        platform={connection.platform}
                        size={21}
                      />
                    </span>

                    <span className="min-w-0 flex-1">

                      <span className="block font-display text-lg font-medium tracking-tight">

                        {connection.label}
                      </span>

                      <span className="mt-1 block wrap-break-word text-xs leading-5 text-white/45">

                        {connection.handle}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.3}
                      aria-hidden="true"
                      className="shrink-0 text-white/40 transition-colors group-hover:text-[#C7FF3D]"
                    />
                  </a>
                </Reveal>
              )
            )}
          </div>

          {/* Section footer */}

          <Reveal
            className="mt-16"
            y={15}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">

              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Curiosity / Creation / Evolution
              </span>

              <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                Aether / Human Origin
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
