
export interface PhilosophyPrinciple {
  number: string;
  slug: string;
  title: string;
  label: string;
  description: string;
  accent: string;
}

export interface BrandSymbol {
  number: string;
  name: string;
  meaning: string;
  description: string;
  accent: string;
}

export const philosophy = {
  heading: {
    first: "Still searching.",
    second: "Still building.",
  },

  introduction:
    "Aether Lab does not begin with all the answers. It begins with curiosity, turns questions into experiments, and uses the process of building to discover what comes next.",

  direction:
    "Direction is discovered through motion.",

  closing:
    "We do not need to know exactly where we are going. We need to keep building toward it.",

  identity:
    "Independent Technology Studio",
};

export const principles: PhilosophyPrinciple[] = [
  {
    number: "01",
    slug: "curiosity",
    title: "Question first.",
    label: "Curiosity",

    description:
      "Every build starts with a question. What can be improved, changed, connected, or understood differently?",

    accent: "#4F46FF",
  },

  {
    number: "02",
    slug: "creation",
    title: "Build to learn.",
    label: "Creation",

    description:
      "Ideas become clearer when they exist as something real. Prototypes turn assumptions into things we can test.",

    accent: "#1EC1CB",
  },

  {
    number: "03",
    slug: "progress",
    title: "Keep moving.",
    label: "Progress",

    description:
      "Technology never stays still. Neither should the way we think, build, and explore what comes next.",

    accent: "#C7FF3D",
  },
];

export const brandSymbols: BrandSymbol[] = [
  {
    number: "01",
    name: "A",
    meaning: "The Beginning",

    description:
      "Identity, a starting point, and the courage to begin.",

    accent: "#F5F5F2",
  },

  {
    number: "02",
    name: "Orbit",
    meaning: "The Journey",

    description:
      "Exploration, movement, and the continuous process of learning.",

    accent: "#4F46FF",
  },

  {
    number: "03",
    name: "Star",
    meaning: "The Direction",

    description:
      "Hope, purpose, and the possibilities that lie ahead.",

    accent: "#C7FF3D",
  },
];

export function getPhilosophyPrinciples() {
  return principles;
}

export function getBrandSymbols() {
  return brandSymbols;
}
