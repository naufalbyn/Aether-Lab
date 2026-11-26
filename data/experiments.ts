
export type ExperimentVisual =
  | "intelligence"
  | "blockchain"
  | "automation"
  | "interface";

export interface Experiment {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  researchQuestion: string;
  focusAreas: string[];
  concepts: string[];
  accent: string;
  surface: string;
  visual: ExperimentVisual;
  status: "Research Direction";
}

export const experiments: Experiment[] = [
  {
    number: "01",
    slug: "ai-developer-tools",
    title: "AI × Developer Tools",
    category: "Artificial Intelligence",

    description:
      "Exploring how intelligent systems can become part of the software development process, from structured reasoning to agent-assisted workflows.",

    researchQuestion:
      "How can intelligent agents extend developer capabilities without removing human oversight?",

    focusAreas: [
      "Multi-Agent Systems",
      "AI-Assisted Development",
      "Developer Workflows",
      "Human Oversight",
    ],

    concepts: [
      "Coordinated specialist agents",
      "Context-aware developer assistants",
      "Automated development workflows",
    ],

    accent: "#A78BFA",
    surface: "#1A1429",
    visual: "intelligence",
    status: "Research Direction",
  },

  {
    number: "02",
    slug: "on-chain-systems",
    title: "On-Chain Systems",
    category: "Blockchain Engineering",

    description:
      "Exploring programmable digital infrastructure through smart contracts, wallet interactions, transaction systems, and decentralized applications.",

    researchQuestion:
      "Which parts of a digital system genuinely benefit from being on-chain?",

    focusAreas: [
      "Smart Contracts",
      "Wallet Infrastructure",
      "Transaction Systems",
      "Decentralized Applications",
    ],

    concepts: [
      "Programmable access systems",
      "Transaction verification workflows",
      "Hybrid on-chain and off-chain systems",
    ],

    accent: "#C7FF3D",
    surface: "#171F13",
    visual: "blockchain",
    status: "Research Direction",
  },

  {
    number: "03",
    slug: "digital-automation",
    title: "Digital Automation",
    category: "Connected Systems",

    description:
      "Exploring how independent software services can communicate, coordinate tasks, and automate repetitive digital processes.",

    researchQuestion:
      "How can fragmented workflows become reliable, connected systems?",

    focusAreas: [
      "Workflow Orchestration",
      "API Integration",
      "Event-Driven Systems",
      "Digital Assistants",
    ],

    concepts: [
      "Connected service workflows",
      "Automated task execution",
      "Event-based notification systems",
    ],

    accent: "#1EC1CB",
    surface: "#102226",
    visual: "automation",
    status: "Research Direction",
  },

  {
    number: "04",
    slug: "experimental-interfaces",
    title: "Experimental Interfaces",
    category: "Creative Engineering",

    description:
      "Exploring unconventional interaction models, spatial interfaces, creative coding, and motion systems that make digital experiences feel more alive.",

    researchQuestion:
      "How can motion and spatial interaction improve the way people understand digital systems?",

    focusAreas: [
      "Interactive 3D",
      "Spatial Interfaces",
      "Creative Coding",
      "Motion Engineering",
    ],

    concepts: [
      "Interactive spatial workspaces",
      "Motion-driven information systems",
      "Experimental web experiences",
    ],

    accent: "#FF9135",
    surface: "#261911",
    visual: "interface",
    status: "Research Direction",
  },
];

export function getAllExperiments(): Experiment[] {
  return experiments;
}

export function getExperimentBySlug(
  slug: string
): Experiment | undefined {
  return experiments.find(
    (experiment) => experiment.slug === slug
  );
}
