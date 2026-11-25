
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ==========================================
// TYPES
// ==========================================

type MotionDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade";

// ==========================================
// MOTION UTILITIES
// ==========================================

function getMotionValues(
  direction: MotionDirection,
  distance: number
): gsap.TweenVars {
  switch (direction) {
    case "up":
      return { y: distance };

    case "down":
      return { y: -distance };

    case "left":
      return { x: distance };

    case "right":
      return { x: -distance };

    case "scale":
      return { scale: 0.92 };

    case "fade":
      return {};

    default:
      return { y: distance };
  }
}

function getNumber(
  value: string | undefined,
  fallback: number,
  min: number,
  max: number
) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return gsap.utils.clamp(
    min,
    max,
    parsed
  );
}

// ==========================================
// GLOBAL MOTION
// ==========================================

export default function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pageRoot =
      document.querySelector("main");

    if (!pageRoot) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        // ==================================
        // REVEAL ANIMATIONS
        // ==================================

        const revealElements =
          Array.from(
            pageRoot.querySelectorAll<HTMLElement>(
              "[data-motion]"
            )
          );

        revealElements.forEach(
          (element) => {
            const direction = (
              element.dataset.motion ||
              "up"
            ) as MotionDirection;

            const distance = getNumber(
              element.dataset.motionDistance,
              40,
              0,
              150
            );

            const duration = getNumber(
              element.dataset.motionDuration,
              0.9,
              0.2,
              3
            );

            const delay = getNumber(
              element.dataset.motionDelay,
              0,
              0,
              2
            );

            gsap.from(element, {
              ...getMotionValues(
                direction,
                distance
              ),

              opacity: 0,
              duration,
              delay,
              ease: "power3.out",

              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                once: true,
              },
            });
          }
        );

        // ==================================
        // STAGGER ANIMATIONS
        // ==================================

        const staggerGroups =
          Array.from(
            pageRoot.querySelectorAll<HTMLElement>(
              "[data-motion-stagger]"
            )
          );

        staggerGroups.forEach(
          (group) => {
            const children =
              Array.from(
                group.querySelectorAll<HTMLElement>(
                  "[data-motion-item]"
                )
              );

            if (!children.length) {
              return;
            }

            const stagger = getNumber(
              group.dataset.motionStagger,
              0.1,
              0,
              0.5
            );

            gsap.from(children, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              stagger,
              ease: "power3.out",

              scrollTrigger: {
                trigger: group,
                start: "top 85%",
                once: true,
              },
            });
          }
        );

        // ==================================
        // PARALLAX ANIMATIONS
        // ==================================

        const parallaxElements =
          Array.from(
            pageRoot.querySelectorAll<HTMLElement>(
              "[data-motion-parallax]"
            )
          );

        parallaxElements.forEach(
          (element) => {
            const distance = getNumber(
              element.dataset.motionParallax,
              40,
              -120,
              120
            );

            gsap.fromTo(
              element,
              {
                y: -distance / 2,
              },
              {
                y: distance / 2,
                ease: "none",

                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        );

        // ==================================
        // REFRESH CURRENT PAGE
        // ==================================

        const refreshFrame =
          window.requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();

              ScrollTrigger.update();
            }
          );

        return () => {
          window.cancelAnimationFrame(
            refreshFrame
          );
        };
      }
    );

    // ======================================
    // ROUTE CLEANUP
    // ======================================

    return () => {
      media.revert();
    };
  }, [pathname]);

  return null;
}
