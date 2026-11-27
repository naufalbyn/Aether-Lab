
"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizonVisual() {
  const id = useId();

  const visualRef = useRef<HTMLDivElement>(null);

  const glowId = `${id}-glow`;
  const lineId = `${id}-line`;
  const planetId = `${id}-planet`;
  const skyId = `${id}-sky`;

  useEffect(() => {
    const root = visualRef.current;

    if (!root) return;

    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const context = gsap.context(() => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 95%",
              end: "center 40%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .fromTo(
              "[data-horizon-stars]",
              { opacity: 0.2 },
              { opacity: 1, duration: 1 }
            )
            .fromTo(
              "[data-horizon-rings]",
              {
                opacity: 0.15,
                y: 35,
              },
              {
                opacity: 1,
                y: 0,
                duration: 1.4,
              },
              0
            )
            .fromTo(
              "[data-horizon-light]",
              {
                opacity: 0.2,
                scaleX: 0.25,
                transformOrigin: "center center",
              },
              {
                opacity: 1,
                scaleX: 1,
                duration: 1.2,
              },
              0.2
            )
            .fromTo(
              "[data-horizon-guide]",
              {
                opacity: 0,
                strokeDashoffset: 70,
              },
              {
                opacity: 1,
                strokeDashoffset: 0,
                duration: 1,
              },
              0.3
            )
            .fromTo(
              "[data-horizon-star]",
              {
                opacity: 0.35,
                y: 45,
                scale: 0.6,
                transformOrigin: "center center",
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.3,
              },
              0.4
            );
        }, root);

        return () => context.revert();
      }
    );

    return () => media.revert();
  }, []);

  return (
    <div
      ref={visualRef}
      data-horizon-visual
      aria-hidden="true"
      className="relative isolate mx-auto w-full max-w-6xl overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 520"
        className="block h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={glowId}>
            <stop
              offset="0%"
              stopColor="#4F46FF"
              stopOpacity="0.48"
            />

            <stop
              offset="48%"
              stopColor="#4F46FF"
              stopOpacity="0.13"
            />

            <stop
              offset="100%"
              stopColor="#4F46FF"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient id={lineId}>
            <stop
              offset="0%"
              stopColor="#4F46FF"
              stopOpacity="0"
            />

            <stop
              offset="28%"
              stopColor="#4F46FF"
              stopOpacity="0.5"
            />

            <stop
              offset="50%"
              stopColor="#B9B5FF"
            />

            <stop
              offset="72%"
              stopColor="#C7FF3D"
              stopOpacity="0.45"
            />

            <stop
              offset="100%"
              stopColor="#C7FF3D"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient
            id={planetId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#17172B"
            />

            <stop
              offset="55%"
              stopColor="#0B0D10"
            />

            <stop
              offset="100%"
              stopColor="#0B0D10"
            />
          </linearGradient>

          <radialGradient id={skyId}>
            <stop
              offset="0%"
              stopColor="#C7FF3D"
              stopOpacity="0.12"
            />

            <stop
              offset="100%"
              stopColor="#C7FF3D"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Deep space atmosphere */}

        <ellipse
          cx="600"
          cy="345"
          rx="590"
          ry="330"
          fill={`url(#${glowId})`}
        />

        {/* Deterministic star field */}

        <g data-horizon-stars>
          {Array.from({ length: 96 }, (_, index) => (
            <circle
              key={index}
              cx={(index * 137 + 43) % 1200}
              cy={(index * 73 + 21) % 360}
              r={index % 9 === 0 ? 1.7 : 0.8}
              fill={
                index % 13 === 0
                  ? "#C7FF3D"
                  : "#FFFFFF"
              }
              opacity={0.12 + (index % 5) * 0.13}
            />
          ))}
        </g>

        {/* Horizon orbital rings */}

        <g data-horizon-rings>
          {[150, 230, 310, 390, 470].map(
            (radius, index) => (
              <circle
                key={radius}
                cx="600"
                cy="575"
                r={radius}
                stroke={
                  index % 2 === 0
                    ? "#817BFF"
                    : "#FFFFFF"
                }
                strokeOpacity={0.06 + index * 0.025}
                strokeWidth="1"
              />
            )
          )}

          <ellipse
            cx="600"
            cy="345"
            rx="470"
            ry="100"
            stroke="#817BFF"
            strokeOpacity="0.12"
            transform="rotate(-7 600 345)"
          />

          <path
            d="M-100 530 Q600 145 1300 530"
            fill={`url(#${planetId})`}
            stroke="#817BFF"
            strokeOpacity="0.25"
          />
        </g>

        {/* Illuminated horizon */}

        <g data-horizon-light>
          <path
            d="M40 337 H1160"
            stroke={`url(#${lineId})`}
            strokeWidth="2"
          />

          <ellipse
            cx="600"
            cy="337"
            rx="160"
            ry="36"
            fill={`url(#${skyId})`}
          />
        </g>

        {/* Direction guide */}

        <path
          data-horizon-guide
          d="M600 133 V337"
          stroke="#C7FF3D"
          strokeOpacity="0.28"
          strokeDasharray="3 9"
        />

        {/* Aether direction star */}

        <g data-horizon-star>
          <circle
            cx="600"
            cy="103"
            r="57"
            stroke="#C7FF3D"
            strokeOpacity="0.08"
          />

          <circle
            cx="600"
            cy="103"
            r="37"
            stroke="#C7FF3D"
            strokeOpacity="0.12"
          />

          <path
            d="M600 75
               L606 96
               L628 103
               L606 110
               L600 131
               L594 110
               L572 103
               L594 96 Z"
            fill="#C7FF3D"
          />
        </g>

        {/* Technical framing */}

        <path
          d="M55 85 V55 H85 M1115 55 H1145 V85"
          stroke="#FFFFFF"
          strokeOpacity="0.13"
        />

        <path
          d="M55 435 V465 H85 M1115 465 H1145 V435"
          stroke="#FFFFFF"
          strokeOpacity="0.13"
        />

        <text
          x="600"
          y="445"
          fill="#FFFFFF"
          fillOpacity="0.35"
          fontSize="10"
          letterSpacing="5"
          textAnchor="middle"
          fontFamily="monospace"
        >
          THE NEXT FRONTIER
        </text>
      </svg>
    </div>
  );
}
