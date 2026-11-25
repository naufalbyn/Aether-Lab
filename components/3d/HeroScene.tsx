
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import SceneEnvironment from "./SceneEnvironment";
import OrbitalSystem from "./OrbitalSystem";
import FloatingObjects from "./FloatingObjects";

const AetherScene = dynamic(
  () => import("./AetherScene"),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  }
);

interface HeroSceneProps {
  className?: string;
}

function SceneFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-[65%] w-[65%] rounded-full bg-[#4F46FF]/10 blur-[80px]" />

      <div className="absolute inset-[8%] rounded-full border border-dashed border-[#4F46FF]/20" />

      <div className="absolute inset-[20%] rounded-full border border-[#1EC1CB]/20" />

      <div className="absolute inset-[32%] rounded-full border border-[#0B0D10]/10" />

      <Image
        src="/aether-mark.svg"
        alt=""
        width={280}
        height={280}
        className="relative h-[38%] w-[38%] object-contain"
      />
    </div>
  );
}

export default function HeroScene({
  className = "",
}: HeroSceneProps) {
  const [reducedMotion, setReducedMotion] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const mobileQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const syncPreferences = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    syncPreferences();

    motionQuery.addEventListener(
      "change",
      syncPreferences
    );

    mobileQuery.addEventListener(
      "change",
      syncPreferences
    );

    return () => {
      motionQuery.removeEventListener(
        "change",
        syncPreferences
      );

      mobileQuery.removeEventListener(
        "change",
        syncPreferences
      );
    };
  }, []);

  const animated = !reducedMotion;

  return (
    <div
      className={`relative h-full w-full ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F46FF]/10 blur-[90px]" />

        <div className="absolute right-[10%] top-[15%] h-[35%] w-[35%] rounded-full bg-[#1EC1CB]/10 blur-[75px]" />

        <div className="absolute bottom-[10%] left-[15%] h-[30%] w-[30%] rounded-full bg-[#8B5CF6]/10 blur-[80px]" />
      </div>

      {/* Technical Orbit Background */}
      <div className="pointer-events-none absolute inset-[7%] rounded-full border border-dashed border-[#0B0D10]/10" />

      <div className="pointer-events-none absolute inset-[17%] rounded-full border border-[#0B0D10]/5" />

      {/* Crosshair */}
      <div className="pointer-events-none absolute left-[5%] right-[5%] top-1/2 h-px bg-[#0B0D10]/5" />

      <div className="pointer-events-none absolute bottom-[5%] left-1/2 top-[5%] w-px bg-[#0B0D10]/5" />

      {/* WebGL Scene */}
      <div className="relative z-10 h-full w-full">
        <AetherScene
          animated={animated}
          fallback={<SceneFallback />}
        >
          <SceneEnvironment
            intensity={isMobile ? 0.85 : 1}
          />

          <OrbitalSystem
            scale={isMobile ? 0.82 : 1}
            animated={animated}
            interactive={!isMobile && animated}
          />

          {!isMobile && (
            <FloatingObjects
              animated={animated}
              scale={1}
            />
          )}
        </AetherScene>
      </div>

      {/* Technical Labels */}
      <div className="pointer-events-none absolute left-[8%] top-[12%] z-20 font-mono text-[8px] tracking-[0.2em] text-[#0B0D10]/35">
        AETHER / 3D SYSTEM
      </div>

      <div className="pointer-events-none absolute bottom-[12%] right-[8%] z-20 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4F46FF]" />

        <span className="font-mono text-[8px] tracking-[0.18em] text-[#0B0D10]/40">
          ORBITAL CORE
        </span>
      </div>
    </div>
  );
}
