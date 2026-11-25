
"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  duration = 0.8,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y,
          },
          {
            opacity: 1,
            y: 0,
            duration: Math.max(0.1, duration),
            delay: Math.max(0, delay),
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
            clearProps: "opacity,transform",
          }
        );
      }
    );

    return () => {
      media.revert();
    };
  }, [delay, duration, y]);

  return (
    <div
      ref={elementRef}
      className={className}
    >
      {children}
    </div>
  );
}
