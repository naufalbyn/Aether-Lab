
"use client";

import { useId } from "react";

const MARK_PATH =
  "M187.683 16.543c3.386.026 4.117 1.341 5.854 4.081 2.732 4.309 5.17 8.837 7.74 13.25l14.429 24.565a2800 2800 0 0 1 22.423 38.36c3.288 5.72 6.932 11.658 9.968 17.471-9.839 5.9-19.619 10.392-29.121 16.023-2.393-4.415-6.024-9.835-9.436-14.639-3.988-5.614-12.54-21.98-20.045-22.948-4.204-.542-11.033 6.63-14.13 9.651a1144 1144 0 0 1-10.062 9.767 1688 1688 0 0 0-31.209 30.984c-9.64 9.952-19.797 20.844-29.817 30.269 1.078-1.784 1.81-3.169 2.602-5.098 6.448-15.69 13.681-31.019 21.131-46.254 1.501-3.068 2.924-6.041 4.826-8.898-23.463 12.115-50.196 28.757-63.897 52.292-2.188 3.759-3.858 9.622-.518 13.249 6.28 6.82 17.477 5.327 25.687 4.135 32.247-4.811 62.954-18.654 92.412-32.086a717 717 0 0 0 50.629-25.158c8.159-4.393 15.461-8.265 23.435-13.165a220 220 0 0 0 23.712-16.778c3.407-2.773 10.747-9.876 10.96-14.298.414-8.601-18.555-7.442-23.254-7.714 6.132-1.998 15.244-2.206 21.739-2.147 14.172.13 23.25 4.266 12.297 18.118-12.181 13.158-27.752 22.652-42.974 31.894-4.843 2.941-9.734 6.09-14.594 8.958-6.33 3.733-11.775 6.312-17.739 10.681 9.324-2.508 17.788-7.558 27.027-11.285 2.281 4.963 8.445 14.431 11.367 19.43l25.592 44.441c4.388 7.577 11.61 19.042 14.992 26.511-4.218.745-9.87.383-14.07.376-9.699-.051-20.609-2.786-26.592-11.041-3.437-4.742-6.573-9.784-9.761-14.699l-16.719-25.882c-3.113-4.905-5.749-9.775-9.73-14.076-9.161-9.988-21.34-4.179-31.7-.076-29.801 11.803-52.658 34.666-74.786 57.038-5.632 5.694-12.369 8.477-20.02 10.411-7.953 2.011-15.372 2.358-23.511 2.214a812 812 0 0 0 9.68-19.474c1.538-3.152 4.18-8.865 6.051-11.637-8.646 2.474-23.657 3.435-32.195.666-4.236-1.373-8.061-3.758-10.128-7.827-2.248-4.428-1.65-9.413-.126-13.972 6.7-20.035 41.706-42.775 59.561-53.062 5.12-2.949 15.46-7.268 19.168-11.468 3.047-3.449 6.385-12.123 8.793-16.568a2909 2909 0 0 1 27.527-49.313c2.235-3.886 4.505-7.904 6.74-11.782 2.192-3.804 5.947-11.572 9.792-13.49";

const STAR_PATH =
  "M273.262 24.382c1.04.64 1.341 9.27 3.835 12.557 3.225 4.25 9.992 4.902 15.081 5.78-10.034 2.68-16.165.424-17.871 13.971-.114.907-.479 3.56-1.062 4.164-1.297-4.186-.954-12.653-5.781-14.963-3.856-1.845-9.348-2.552-13.576-3.278 15.952-2.376 16.466-2.598 19.374-18.231";

// Deterministic decorative starfield.
// No random values during rendering.

const stars = Array.from(
  { length: 48 },
  (_, index) => ({
    x: ((index * 137.3) % 590) + 5,
    y: ((index * 83.7) % 430) + 5,
    radius: index % 7 === 0 ? 1.5 : 0.65,
    opacity: index % 7 === 0 ? 0.5 : 0.22,
  })
);

export default function OriginMark() {
  const clipId = useId();
  const gradientId = useId();
  const glowId = useId();

  return (
    <svg
      viewBox="0 0 600 440"
      role="img"
      aria-label="Aether Lab logo, combining the letter A, an orbit, and a star"
      className="block h-auto w-full"
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            data-origin-clip
            x="0"
            y="0"
            width="386"
            height="246"
          />
        </clipPath>

        <linearGradient
          id={gradientId}
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#F5F5F2" />
          <stop offset="100%" stopColor="#C4C1FF" />
        </linearGradient>

        <radialGradient id={glowId}>
          <stop
            offset="0%"
            stopColor="#4F46FF"
            stopOpacity="0.22"
          />

          <stop
            offset="65%"
            stopColor="#4F46FF"
            stopOpacity="0.05"
          />

          <stop
            offset="100%"
            stopColor="#4F46FF"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* Ambient lighting */}

      <circle
        cx="300"
        cy="220"
        r="215"
        fill={`url(#${glowId})`}
      />

      {/* Decorative starfield */}

      <g aria-hidden="true">
        {stars.map((star, index) => (
          <circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.radius}
            fill="#FFFFFF"
            opacity={star.opacity}
          />
        ))}
      </g>

      {/* Technical guides */}

      <g
        data-origin-guides
        aria-hidden="true"
        fill="none"
      >
        {[85, 130, 175, 205].map(
          (radius) => (
            <circle
              key={radius}
              cx="300"
              cy="220"
              r={radius}
              stroke="#FFFFFF"
              strokeOpacity="0.065"
            />
          )
        )}

        <path
          d="M300 15 V425 M80 220 H520"
          stroke="#FFFFFF"
          strokeOpacity="0.08"
          strokeDasharray="3 7"
        />

        <ellipse
          cx="300"
          cy="220"
          rx="245"
          ry="100"
          transform="rotate(-25 300 220)"
          stroke="#817BFF"
          strokeOpacity="0.24"
          strokeDasharray="3 8"
        />

        <circle
          cx="104"
          cy="329"
          r="3"
          fill="#817BFF"
        />

        <circle
          cx="475"
          cy="108"
          r="3"
          fill="#1EC1CB"
        />
      </g>

      {/* Original logo geometry */}

      <g transform="translate(107 97)">
        <path
          data-origin-mark
          d={MARK_PATH}
          fill={`url(#${gradientId})`}
          clipPath={`url(#${clipId})`}
        />

        <path
          data-origin-star
          d={STAR_PATH}
          fill="#C7FF3D"
        />
      </g>

      {/* Editorial annotations */}

      <g
        data-origin-annotations
        aria-hidden="true"
        fontFamily="monospace"
        fontSize="9"
        letterSpacing="1.1"
      >
        <path
          d="M78 100 H170 L256 151"
          stroke="#FFFFFF"
          strokeOpacity="0.25"
          fill="none"
        />

        <text
          x="78"
          y="88"
          fill="#FFFFFF"
          opacity="0.65"
        >
          01 / BEGINNING
        </text>

        <path
          d="M70 338 H155 L213 273"
          stroke="#817BFF"
          strokeOpacity="0.6"
          fill="none"
        />

        <text
          x="70"
          y="356"
          fill="#A5A2FF"
        >
          02 / JOURNEY
        </text>

        <path
          d="M380 119 V70 H475"
          stroke="#C7FF3D"
          strokeOpacity="0.45"
          fill="none"
        />

        <text
          x="410"
          y="58"
          fill="#C7FF3D"
        >
          03 / DIRECTION
        </text>
      </g>
    </svg>
  );
}
