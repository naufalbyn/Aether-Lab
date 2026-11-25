
"use client";

import { useState } from "react";
import Image from "next/image";

import { getTechnology } from "@/data/technologies";

import type {
  Technology,
} from "@/data/technologies";

import iconManifest from "@/public/technologies/manifest.json";

// ==========================================
// TYPES
// ==========================================

type TechnologyLogoProps = {
  technology: Technology | string;

  size?: number;

  className?: string;

  showBackground?: boolean;
};

type IconManifestEntry = {
  src: string;
  title: string;
  source: string;
  color: string;
};

const availableIcons =
  iconManifest as Record<
    string,
    IconManifestEntry
  >;

// ==========================================
// TECHNOLOGY LOGO
// ==========================================

export default function TechnologyLogo({
  technology,
  size = 40,
  className = "",
  showBackground = false,
}: TechnologyLogoProps) {
  const item =
    typeof technology === "string"
      ? getTechnology(technology)
      : technology;

  return (
    <TechnologyLogoContent
      key={item.slug}
      technology={item}
      size={size}
      className={className}
      showBackground={showBackground}
    />
  );
}

// ==========================================
// LOGO CONTENT
// ==========================================

function TechnologyLogoContent({
  technology,
  size,
  className,
  showBackground,
}: {
  technology: Technology;
  size: number;
  className: string;
  showBackground: boolean;
}) {
  const [failed, setFailed] =
    useState(false);

  const availableIcon =
    availableIcons[technology.slug];

  const iconSource =
    availableIcon?.src;

  const hasLogo =
    Boolean(iconSource) && !failed;

  const containerSize =
    showBackground
      ? Math.round(size * 1.65)
      : size;

  return (
    <span
      role="img"
      aria-label={`${technology.name} ${
        hasLogo ? "logo" : "initials"
      }`}
      className={[
        "relative inline-flex shrink-0",
        "items-center justify-center",
        showBackground
          ? "rounded-2xl border"
          : "",
        className,
      ].join(" ")}
      style={{
        width: containerSize,
        height: containerSize,

        ...(showBackground
          ? {
              backgroundColor:
                `${technology.color}0A`,

              borderColor:
                `${technology.color}25`,
            }
          : {}),
      }}
    >
      {hasLogo && iconSource ? (
        <Image
          src={iconSource}
          alt=""
          width={size}
          height={size}
          unoptimized
          draggable={false}
          onError={() =>
            setFailed(true)
          }
          className="object-contain"
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="select-none font-display font-semibold leading-none tracking-tighter"
          style={{
            color: technology.color,
            fontSize: size * 0.48,
          }}
        >
          {technology.initials}
        </span>
      )}
    </span>
  );
}
