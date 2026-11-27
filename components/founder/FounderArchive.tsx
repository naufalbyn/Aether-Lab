
"use client";

import { useId, useState } from "react";

import Link from "next/link";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowUpRight,
  Plus,
  Minus,
} from "lucide-react";

import {
  getFounderArchiveGroups,
} from "@/data/founder";

import type {
  FounderArchiveEntry,
} from "@/data/founder";

interface FounderArchiveProps {
  theme?: "light" | "dark";
  className?: string;
  defaultOpen?: string | null;
}

const groups = getFounderArchiveGroups();

// ==========================================
// CATEGORY LABELS
// ==========================================

const categoryLabels = {
  education: "Education",
  leadership: "Leadership",
  community: "Community",
  hackathon: "Hackathon",
  project: "Project",
  venture: "Venture",
  professional: "Professional Experience",
  achievement: "Achievement",
  certification: "Certification",
};

// ==========================================
// ARCHIVE ENTRY
// ==========================================

function ArchiveEntry({
  entry,
  dark,
}: {
  entry: FounderArchiveEntry;
  dark: boolean;
}) {
  const muted = dark
    ? "text-white/55"
    : "text-black/60";

  const subtle = dark
    ? "text-white/40"
    : "text-black/45";

  const accent = dark
    ? "text-[#A5A2FF]"
    : "text-[#4F46FF]";

  return (
    <article
      className={`min-w-0 border p-5 md:p-7 ${
        dark
          ? "border-white/10 bg-white/2.5"
          : "border-black/10 bg-white/55"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">

        <span
          className={`font-mono text-[9px] uppercase tracking-wider ${accent}`}
        >
          {categoryLabels[entry.category]}
        </span>

        {entry.period && (
          <span
            className={`font-mono text-[9px] ${subtle}`}
          >
            {entry.period}
          </span>
        )}
      </div>

      <h4 className="mt-5 wrap-break-word font-display text-xl font-medium tracking-tight md:text-2xl">
        {entry.title}
      </h4>

      {entry.organization && (
        <p className={`mt-2 text-sm ${muted}`}>
          {entry.organization}
        </p>
      )}

      {entry.role && (
        <p
          className={`mt-3 text-xs font-medium ${accent}`}
        >
          {entry.role}
        </p>
      )}

      <p
        className={`mt-5 text-sm leading-7 ${muted}`}
      >
        {entry.description}
      </p>

      {entry.highlights &&
        entry.highlights.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">

            {entry.highlights.map((highlight) => (
              <span
                key={highlight}
                className={`rounded-full border px-3 py-1.5 text-[10px] ${
                  dark
                    ? "border-white/10 text-white/65"
                    : "border-black/10 text-black/65"
                }`}
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

      {entry.href && (
        entry.href.startsWith("/") ? (
          <Link
            href={entry.href}
            className={`mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${accent}`}
          >
            Explore related work

            <ArrowUpRight
              size={14}
              aria-hidden="true"
            />
          </Link>
        ) : (
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${accent}`}
          >
            View reference

            <ArrowUpRight
              size={14}
              aria-hidden="true"
            />
          </a>
        )
      )}
    </article>
  );
}

// ==========================================
// FOUNDER ARCHIVE
// ==========================================

export default function FounderArchive({
  theme = "light",
  className = "",
  defaultOpen = null,
}: FounderArchiveProps) {
  const [openGroup, setOpenGroup] =
    useState<string | null>(defaultOpen);

  const archiveId = useId();
  const reducedMotion = useReducedMotion();

  const dark = theme === "dark";

  const border = dark
    ? "border-white/10"
    : "border-black/15";

  const muted = dark
    ? "text-white/45"
    : "text-black/50";

  const accent = dark
    ? "text-[#C7FF3D]"
    : "text-[#4F46FF]";

  if (groups.length === 0) {
    return null;
  }

  return (
    <div
      className={`border-t ${border} ${className}`}
    >
      {groups.map((group, index) => {
        const isOpen = openGroup === group.id;

        const buttonId =
          `${archiveId}-${group.id}-button`;

        const panelId =
          `${archiveId}-${group.id}-panel`;

        return (
          <div
            key={group.id}
            className={`border-b ${border}`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenGroup(
                    isOpen ? null : group.id
                  )
                }
                className={`group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-7 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F46FF] md:gap-8 md:py-10 ${
                  dark
                    ? "hover:bg-white/2.5"
                    : "hover:bg-white/50"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${muted}`}
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <span className="min-w-0">

                  <span className="block font-display text-[clamp(1.35rem,3vw,2.8rem)] font-medium leading-tight tracking-[-0.045em]">
                    {group.title}
                  </span>

                  <span
                    className={`mt-2 block text-xs font-normal leading-6 md:text-sm ${muted}`}
                  >
                    {group.description}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-4">

                  <span
                    className={`hidden font-mono text-[9px] sm:block ${muted}`}
                  >
                    {String(
                      group.entries.length
                    ).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 ${border} ${accent}`}
                  >
                    {isOpen ? (
                      <Minus
                        size={18}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    ) : (
                      <Plus
                        size={18}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
            >
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={group.id}
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: reducedMotion
                        ? 0
                        : 0.35,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="overflow-hidden"
                    inert={!isOpen}
                  >
                    <div className="grid gap-3 pb-8 md:grid-cols-2 md:gap-4 md:pb-10">

                      {group.entries.map(
                        (entry) => (
                          <ArchiveEntry
                            key={entry.id}
                            entry={entry}
                            dark={dark}
                          />
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
