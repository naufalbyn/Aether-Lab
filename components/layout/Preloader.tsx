"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, 1500);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2100);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-[#F5F5F2] transition-all duration-600 ${
        isLeaving
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      <div className="flex w-[min(92vw,700px)] flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex h-105 w-105 items-center justify-center">
          <Image
            src="/aether-mark.svg"
            alt="Aether Lab"
            width={380}
            height={380}
            priority
            className="h-95 w-95 object-contain"
          />
        </div>

        {/* Brand */}
        <div className="mt-2 flex flex-col items-center text-center">
          <div className="font-display text-2xl font-semibold tracking-[0.28em] text-[#0B0D10]">
            AETHER LAB
          </div>

          <div className="mt-3 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-[#0B0D10]/65">
            Independent Technology Studio
          </div>
        </div>

        {/* Loading */}
        <div className="mt-10 flex w-[min(80vw,420px)] flex-col gap-3">
          <div className="flex items-center justify-between font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[#0B0D10]/70">
            <span>Initializing System</span>
            <span>087%</span>
          </div>

          <div className="h-0.75 w-full overflow-hidden bg-[#0B0D10]/12">
            <div
              className="h-full origin-left bg-[#0B0D10]"
              style={{
                animation: "aether-loader 1.7s cubic-bezier(0.65, 0, 0.35, 1) forwards",
              }}
            />
          </div>
        </div>

        {/* System information */}
        <div className="mt-8 flex items-center gap-3 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-[#0B0D10]/50">
          <span>SYS</span>
          <span className="h-1 w-1 rounded-full bg-[#0B0D10]/40" />
          <span>AETHER-01</span>
          <span className="h-1 w-1 rounded-full bg-[#0B0D10]/40" />
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}