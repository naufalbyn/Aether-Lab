
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const interactiveSelector = [
  "a[href]",
  "button:not(:disabled)",
  '[role="button"]',
  '[data-cursor="interactive"]',
].join(",");

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    const media = gsap.matchMedia();

    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        let isVisible = false;
        let isInteractive = false;
        let isPressed = false;

        gsap.set(cursor, {
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
        });

        gsap.set(ring, {
          scale: 1,
          opacity: 0.65,
        });

        const moveX = gsap.quickTo(cursor, "x", {
          duration: 0.32,
          ease: "power3.out",
        });

        const moveY = gsap.quickTo(cursor, "y", {
          duration: 0.32,
          ease: "power3.out",
        });

        const updateAppearance = () => {
          const scale = isPressed
            ? 0.72
            : isInteractive
              ? 1.65
              : 1;

          gsap.to(ring, {
            scale,
            opacity: isInteractive ? 0.9 : 0.65,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        const showCursor = (
          x: number,
          y: number
        ) => {
          if (isVisible) return;

          isVisible = true;

          gsap.set(cursor, { x, y });

          gsap.to(cursor, {
            opacity: 1,
            duration: 0.2,
            overwrite: "auto",
          });
        };

        const hideCursor = () => {
          isVisible = false;
          isPressed = false;
          isInteractive = false;

          gsap.to(cursor, {
            opacity: 0,
            duration: 0.2,
            overwrite: "auto",
          });

          updateAppearance();
        };

        const handlePointerMove = (
          event: PointerEvent
        ) => {
          if (event.pointerType !== "mouse") {
            hideCursor();
            return;
          }

          showCursor(
            event.clientX,
            event.clientY
          );

          moveX(event.clientX);
          moveY(event.clientY);

          const target = event.target;

          const nextInteractive =
            target instanceof Element &&
            Boolean(
              target.closest(interactiveSelector)
            );

          if (nextInteractive !== isInteractive) {
            isInteractive = nextInteractive;
            updateAppearance();
          }
        };

        const handlePointerDown = (
          event: PointerEvent
        ) => {
          if (event.pointerType !== "mouse") return;

          isPressed = true;
          updateAppearance();
        };

        const handlePointerUp = () => {
          isPressed = false;
          updateAppearance();
        };

        const handleVisibilityChange = () => {
          if (document.hidden) {
            hideCursor();
          }
        };

        window.addEventListener(
          "pointermove",
          handlePointerMove,
          { passive: true }
        );

        window.addEventListener(
          "pointerdown",
          handlePointerDown
        );

        window.addEventListener(
          "pointerup",
          handlePointerUp
        );

        window.addEventListener(
          "pointercancel",
          hideCursor
        );

        window.addEventListener(
          "blur",
          hideCursor
        );

        document.documentElement.addEventListener(
          "pointerleave",
          hideCursor
        );

        document.addEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        return () => {
          window.removeEventListener(
            "pointermove",
            handlePointerMove
          );

          window.removeEventListener(
            "pointerdown",
            handlePointerDown
          );

          window.removeEventListener(
            "pointerup",
            handlePointerUp
          );

          window.removeEventListener(
            "pointercancel",
            hideCursor
          );

          window.removeEventListener(
            "blur",
            hideCursor
          );

          document.documentElement.removeEventListener(
            "pointerleave",
            hideCursor
          );

          document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
          );

          gsap.killTweensOf([cursor, ring]);

          gsap.set(cursor, {
            opacity: 0,
          });
        };
      }
    );

    return () => {
      media.revert();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden h-10 w-10 opacity-0 md:block"
    >
      <div
        ref={ringRef}
        className="absolute inset-0 rounded-full border border-[#4F46FF] will-change-transform"
        style={{
          boxShadow:
            "0 0 12px rgba(79, 70, 255, 0.12)",
        }}
      />
    </div>
  );
}
