
"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  maxDistance?: number;
  disabled?: boolean;
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  maxDistance = 18,
  disabled = false,
  className = "",
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content || disabled) return;

    const media = gsap.matchMedia();

    const safeStrength = Math.max(
      0,
      Math.min(strength, 1)
    );

    const safeDistance = Math.max(
      0,
      Math.min(maxDistance, 40)
    );

    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const moveX = gsap.quickTo(content, "x", {
          duration: 0.45,
          ease: "power3.out",
        });

        const moveY = gsap.quickTo(content, "y", {
          duration: 0.45,
          ease: "power3.out",
        });

        const resetPosition = () => {
          moveX(0);
          moveY(0);
        };

        const handlePointerMove = (
          event: PointerEvent
        ) => {
          if (event.pointerType !== "mouse") {
            resetPosition();
            return;
          }

          const bounds =
            container.getBoundingClientRect();

          const centerX =
            bounds.left + bounds.width / 2;

          const centerY =
            bounds.top + bounds.height / 2;

          const offsetX =
            event.clientX - centerX;

          const offsetY =
            event.clientY - centerY;

          const targetX = gsap.utils.clamp(
            -safeDistance,
            safeDistance,
            offsetX * safeStrength
          );

          const targetY = gsap.utils.clamp(
            -safeDistance,
            safeDistance,
            offsetY * safeStrength
          );

          moveX(targetX);
          moveY(targetY);
        };

        container.addEventListener(
          "pointermove",
          handlePointerMove,
          { passive: true }
        );

        container.addEventListener(
          "pointerleave",
          resetPosition
        );

        container.addEventListener(
          "pointercancel",
          resetPosition
        );

        container.addEventListener(
          "focusin",
          resetPosition
        );

        window.addEventListener(
          "blur",
          resetPosition
        );

        return () => {
          container.removeEventListener(
            "pointermove",
            handlePointerMove
          );

          container.removeEventListener(
            "pointerleave",
            resetPosition
          );

          container.removeEventListener(
            "pointercancel",
            resetPosition
          );

          container.removeEventListener(
            "focusin",
            resetPosition
          );

          window.removeEventListener(
            "blur",
            resetPosition
          );

          gsap.killTweensOf(content);

          gsap.set(content, {
            clearProps: "transform",
          });
        };
      }
    );

    return () => {
      media.revert();
    };
  }, [strength, maxDistance, disabled]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex ${className}`}
    >
      <div
        ref={contentRef}
        className="inline-flex"
      >
        {children}
      </div>
    </div>
  );
}
