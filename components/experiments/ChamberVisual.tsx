
"use client";

import { useId } from "react";
import { motion } from "motion/react";

import type {
  ExperimentVisual,
} from "@/data/experiments";

// ==========================================
// TYPES
// ==========================================

type VisualProps = {
  accent: string;
  animated: boolean;
};

type ChamberVisualProps = VisualProps & {
  visual: ExperimentVisual;
};

// ==========================================
// AI AGENT NETWORK
// ==========================================

const agentNodes = [
  { x: 105, y: 90, label: "PLAN" },
  { x: 300, y: 60, label: "REASON" },
  { x: 495, y: 90, label: "BUILD" },
  { x: 495, y: 310, label: "TEST" },
  { x: 300, y: 340, label: "REVIEW" },
  { x: 105, y: 310, label: "CONTEXT" },
];

function IntelligenceVisual({
  accent,
  animated,
}: VisualProps) {
  return (
    <g>
      {agentNodes.map((node, index) => (
        <g key={node.label}>
          <line
            x1="300"
            y1="200"
            x2={node.x}
            y2={node.y}
            stroke={accent}
            strokeOpacity="0.25"
          />

          {animated && (
            <motion.circle
              r="3.5"
              fill={accent}
              initial={{
                cx: 300,
                cy: 200,
                opacity: 0,
              }}
              animate={{
                cx: [300, node.x],
                cy: [200, node.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: index * 0.35,
                ease: "linear",
              }}
            />
          )}

          <rect
            x={node.x - 35}
            y={node.y - 25}
            width="70"
            height="50"
            rx="12"
            fill="#171920"
            stroke={accent}
            strokeOpacity="0.55"
          />

          <rect
            x={node.x - 9}
            y={node.y - 12}
            width="18"
            height="18"
            rx="4"
            fill={accent}
            fillOpacity="0.15"
            stroke={accent}
            strokeOpacity="0.7"
          />

          <circle
            cx={node.x}
            cy={node.y - 3}
            r="3"
            fill={accent}
          />

          <text
            x={node.x}
            y={node.y + 16}
            fill={accent}
            fontSize="8"
            textAnchor="middle"
            letterSpacing="1"
          >
            {node.label}
          </text>
        </g>
      ))}

      <motion.circle
        cx="300"
        cy="200"
        r="75"
        fill="none"
        stroke={accent}
        initial={false}
        animate={{
          r: animated ? [70, 82, 70] : 70,
          opacity: animated
            ? [0.12, 0.3, 0.12]
            : 0.2,
        }}
        transition={{
          duration: animated ? 3 : 0,
          repeat: animated ? Infinity : 0,
        }}
      />

      <circle
        cx="300"
        cy="200"
        r="59"
        fill="#171920"
        stroke={accent}
        strokeOpacity="0.8"
      />

      <rect
        x="277"
        y="166"
        width="46"
        height="42"
        rx="10"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
      />

      <circle cx="290" cy="183" r="3" fill={accent} />
      <circle cx="310" cy="183" r="3" fill={accent} />

      <path
        d="M290 195 H310"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <text
        x="300"
        y="230"
        fill={accent}
        fontSize="10"
        textAnchor="middle"
        letterSpacing="2"
      >
        ORCHESTRATOR
      </text>
    </g>
  );
}

// ==========================================
// BLOCKCHAIN VISUAL
// ==========================================

function BlockchainVisual({
  accent,
  animated,
}: VisualProps) {
  const blocks = [
    { x: 135, y: 240 },
    { x: 300, y: 180 },
    { x: 465, y: 120 },
  ];

  return (
    <g>
      <path
        d="M135 240 L300 180 L465 120"
        stroke={accent}
        strokeOpacity="0.2"
        strokeWidth="2"
        fill="none"
      />

      <motion.path
        d="M135 240 L300 180 L465 120"
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="4 14"
        fill="none"
        initial={false}
        animate={{
          strokeDashoffset: animated
            ? [0, -72]
            : 0,
        }}
        transition={{
          duration: animated ? 3 : 0,
          repeat: animated ? Infinity : 0,
          ease: "linear",
        }}
      />

      {blocks.map((block, index) => (
        <g
          key={index}
          transform={`translate(${block.x} ${block.y})`}
        >
          <motion.g
            initial={false}
            animate={{
              y: animated
                ? [0, -12, 0]
                : 0,
            }}
            transition={{
              duration: animated ? 4 : 0,
              repeat: animated ? Infinity : 0,
              delay: animated
                ? index * 0.5
                : 0,
              ease: "easeInOut",
            }}
          >
            <path
              d="M-55 0 L0 -30 L55 0 L0 30 Z"
              fill={accent}
              fillOpacity="0.16"
              stroke={accent}
              strokeWidth="1.4"
            />

            <path
              d="M-55 0 V65 L0 95 V30 Z"
              fill="#182019"
              stroke={accent}
              strokeOpacity="0.65"
            />

            <path
              d="M0 30 L55 0 V65 L0 95 Z"
              fill="#202A17"
              stroke={accent}
              strokeOpacity="0.65"
            />

            <path
              d="M-30 0 L0 -16 L30 0 L0 16 Z"
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
            />

            <path
              d="M-42 25 L-13 41 M-42 36 L-13 52"
              stroke={accent}
              strokeOpacity="0.3"
            />

            <circle
              cx="30"
              cy="45"
              r="4"
              fill={accent}
            />

            <text
              x="0"
              y="118"
              fill={accent}
              fontSize="10"
              textAnchor="middle"
              letterSpacing="2"
            >
              {`BLOCK / 0${index + 1}`}
            </text>
          </motion.g>
        </g>
      ))}
    </g>
  );
}

// ==========================================
// AUTOMATION WORKFLOW
// ==========================================

const workflowNodes = [
  { x: 90, y: 100, title: "INPUT" },
  { x: 90, y: 300, title: "EVENT" },
  { x: 300, y: 200, title: "LOGIC" },
  { x: 510, y: 100, title: "API" },
  { x: 510, y: 300, title: "ACTION" },
];

const workflowPaths = [
  "M90 100 H195 V200 H300",
  "M90 300 H195 V200 H300",
  "M300 200 H405 V100 H510",
  "M300 200 H405 V300 H510",
];

function AutomationVisual({
  accent,
  animated,
}: VisualProps) {
  return (
    <g>
      {workflowPaths.map((path) => (
        <g key={path}>
          <path
            d={path}
            stroke={accent}
            strokeOpacity="0.2"
            strokeWidth="2"
            fill="none"
          />

          <motion.path
            d={path}
            stroke={accent}
            strokeWidth="2"
            strokeDasharray="5 24"
            strokeLinecap="round"
            fill="none"
            initial={false}
            animate={{
              strokeDashoffset: animated
                ? [0, -87]
                : 0,
            }}
            transition={{
              duration: animated ? 3 : 0,
              repeat: animated ? Infinity : 0,
              ease: "linear",
            }}
          />
        </g>
      ))}

      {workflowNodes.map((node, index) => (
        <g key={node.title}>
          <rect
            x={node.x - 42}
            y={node.y - 32}
            width="84"
            height="64"
            rx="12"
            fill="#132126"
            stroke={accent}
            strokeOpacity={
              index === 2 ? 0.9 : 0.45
            }
          />

          <motion.circle
            cx={node.x}
            cy={node.y - 8}
            r="6"
            fill={accent}
            initial={false}
            animate={{
              opacity: animated
                ? [0.3, 1, 0.3]
                : 1,
            }}
            transition={{
              duration: animated ? 2 : 0,
              delay: animated ? index * 0.3 : 0,
              repeat: animated ? Infinity : 0,
            }}
          />

          <text
            x={node.x}
            y={node.y + 18}
            textAnchor="middle"
            fill={accent}
            fontSize="10"
            letterSpacing="1.5"
          >
            {node.title}
          </text>
        </g>
      ))}
    </g>
  );
}

// ==========================================
// SPATIAL INTERFACE VISUAL
// ==========================================

function InterfaceVisual({
  accent,
  animated,
}: VisualProps) {
  return (
    <g>
      {[3, 2, 1, 0].map((layer) => (
        <g
          key={layer}
          transform={`translate(0 ${layer * 55})`}
        >
          <motion.g
            initial={false}
            animate={{
              y: animated
                ? [0, -layer * 6 - 5, 0]
                : 0,
            }}
            transition={{
              duration: animated ? 5 : 0,
              repeat: animated ? Infinity : 0,
              delay: animated ? layer * 0.15 : 0,
              ease: "easeInOut",
            }}
          >
            <path
              d="M100 105 L340 35 L500 105 L260 175 Z"
              fill="#211A19"
              fillOpacity="0.9"
              stroke={accent}
              strokeOpacity={0.8 - layer * 0.13}
              strokeWidth="1.4"
            />

            <path
              d="M135 105 L340 48 L465 105 L260 162 Z"
              fill={accent}
              fillOpacity="0.035"
              stroke={accent}
              strokeOpacity="0.2"
            />

            {layer === 0 && (
              <g>
                <path
                  d="M155 100 L240 75 L290 95 L205 120 Z"
                  fill={accent}
                  fillOpacity="0.18"
                  stroke={accent}
                  strokeOpacity="0.5"
                />

                <path
                  d="M275 65 L336 48 M290 72 L351 55"
                  stroke={accent}
                  strokeOpacity="0.65"
                  strokeWidth="2"
                />

                <path
                  d="M300 114 L365 95 L415 110 L350 129 Z"
                  fill={accent}
                  fillOpacity="0.1"
                  stroke={accent}
                  strokeOpacity="0.45"
                />
              </g>
            )}
          </motion.g>
        </g>
      ))}
    </g>
  );
}

// ==========================================
// CHAMBER VISUAL SYSTEM
// ==========================================

export default function ChamberVisual({
  visual,
  accent,
  animated,
}: ChamberVisualProps) {
  const gradientId = useId();
  const gridId = useId();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 400"
      className="block h-full w-full"
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop
            offset="0%"
            stopColor={accent}
            stopOpacity="0.13"
          />

          <stop
            offset="100%"
            stopColor={accent}
            stopOpacity="0"
          />
        </radialGradient>

        <pattern
          id={gridId}
          width="35"
          height="35"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M35 0 H0 V35"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.035"
          />
        </pattern>
      </defs>

      <rect
        width="600"
        height="400"
        fill={`url(#${gridId})`}
      />

      <ellipse
        cx="300"
        cy="200"
        rx="290"
        ry="190"
        fill={`url(#${gradientId})`}
      />

      <path
        d="M20 35 V20 H35 M565 20 H580 V35 M20 365 V380 H35 M565 380 H580 V365"
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {visual === "intelligence" && (
        <IntelligenceVisual
          accent={accent}
          animated={animated}
        />
      )}

      {visual === "blockchain" && (
        <BlockchainVisual
          accent={accent}
          animated={animated}
        />
      )}

      {visual === "automation" && (
        <AutomationVisual
          accent={accent}
          animated={animated}
        />
      )}

      {visual === "interface" && (
        <InterfaceVisual
          accent={accent}
          animated={animated}
        />
      )}
    </svg>
  );
}
