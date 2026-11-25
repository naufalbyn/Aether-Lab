
export type TechnologyCategory =
  | "Framework"
  | "Frontend"
  | "Language"
  | "Backend"
  | "Database"
  | "Blockchain"
  | "Authentication"
  | "State Management"
  | "Styling"
  | "Animation"
  | "Graphics"
  | "Development Tools"
  | "Deployment"
  | "Asset Optimization"
  | "Artificial Intelligence"
  | "Other";

export interface Technology {
  name: string;
  slug: string;
  category: TechnologyCategory;

  description: string;

  color: string;

  icon?: string;

  initials: string;

  website?: string;
}

// ==========================================
// TECHNOLOGY REGISTRY
// ==========================================

export const technologies: Technology[] = [
  {
    name: "Next.js",
    slug: "nextdotjs",
    category: "Framework",

    description:
      "A React framework for application routing, rendering, static generation, and production web development.",

    color: "#FFFFFF",
    icon: "/technologies/nextdotjs.svg",
    initials: "NX",
    website: "https://nextjs.org",
  },

  {
    name: "React",
    slug: "react",
    category: "Frontend",

    description:
      "A component-based JavaScript library for building interactive user interfaces.",

    color: "#61DAFB",
    icon: "/technologies/react.svg",
    initials: "RE",
    website: "https://react.dev",
  },

  {
    name: "TypeScript",
    slug: "typescript",
    category: "Language",

    description:
      "A strongly typed extension of JavaScript designed to improve maintainability and development reliability.",

    color: "#3178C6",
    icon: "/technologies/typescript.svg",
    initials: "TS",
    website: "https://typescriptlang.org",
  },

  {
    name: "JavaScript",
    slug: "javascript",
    category: "Language",

    description:
      "A programming language for interactive interfaces, application logic, and web development.",

    color: "#F7DF1E",
    icon: "/technologies/javascript.svg",
    initials: "JS",
    website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },

  {
    name: "Node.js",
    slug: "nodedotjs",
    category: "Backend",

    description:
      "A JavaScript runtime for backend services, application infrastructure, APIs, and development tooling.",

    color: "#83CD29",
    icon: "/technologies/nodedotjs.svg",
    initials: "ND",
    website: "https://nodejs.org",
  },

  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    category: "Styling",

    description:
      "A utility-first CSS framework for developing responsive and consistent user interfaces.",

    color: "#38BDF8",
    icon: "/technologies/tailwindcss.svg",
    initials: "TW",
    website: "https://tailwindcss.com",
  },

  {
    name: "Solana",
    slug: "solana",
    category: "Blockchain",

    description:
      "A blockchain platform for decentralized applications, smart contracts, and on-chain transactions.",

    color: "#14F195",
    icon: "/technologies/solana.svg",
    initials: "SOL",
    website: "https://solana.com",
  },

  {
    name: "Rust",
    slug: "rust",
    category: "Language",

    description:
      "A systems programming language focused on performance, reliability, and memory safety.",

    color: "#DEA584",
    icon: "/technologies/rust.svg",
    initials: "RS",
    website: "https://rust-lang.org",
  },

  {
    name: "Anchor",
    slug: "anchor",
    category: "Blockchain",

    description:
      "A framework for building, testing, and interacting with Solana programs using Rust.",

    color: "#A78BFA",
    icon: "/technologies/anchor.svg",
    initials: "AN",
    website: "https://anchor-lang.com",
  },

  {
    name: "Prisma",
    slug: "prisma",
    category: "Database",

    description:
      "A database toolkit providing type-safe database access and schema management.",

    color: "#FFFFFF",
    icon: "/technologies/prisma.svg",
    initials: "PR",
    website: "https://prisma.io",
  },

  {
    name: "Telegraf",
    slug: "telegraf",
    category: "Backend",

    description:
      "A Node.js framework for building Telegram bots and automated messaging workflows.",

    color: "#229ED9",
    icon: "/technologies/telegraf.svg",
    initials: "TG",
    website: "https://telegraf.js.org",
  },

  {
    name: "Privy",
    slug: "privy",
    category: "Authentication",

    description:
      "Authentication and embedded wallet infrastructure for onboarding users into digital and Web3 applications.",

    color: "#A78BFA",
    icon: "/technologies/privy.svg",
    initials: "PV",
    website: "https://privy.io",
  },

  {
    name: "Zustand",
    slug: "zustand",
    category: "State Management",

    description:
      "A lightweight state management library for React applications.",

    color: "#D6A76C",
    icon: "/technologies/zustand.svg",
    initials: "ZU",
    website: "https://zustand.docs.pmnd.rs",
  },

  {
    name: "Solana Web3.js",
    slug: "solanaweb3js",
    category: "Blockchain",

    description:
      "A JavaScript library for connecting applications to Solana and interacting with blockchain transactions and accounts.",

    color: "#14F195",
    icon: "/technologies/solanaweb3js.svg",
    initials: "W3",
    website: "https://solana-foundation.github.io/solana-web3.js/",
  },

  {
    name: "Solana Wallet Adapter",
    slug: "solanawalletadapter",
    category: "Blockchain",

    description:
      "A collection of libraries for connecting Solana wallets to web applications.",

    color: "#14F195",
    icon: "/technologies/solanawalletadapter.svg",
    initials: "WA",
    website: "https://github.com/anza-xyz/wallet-adapter",
  },

  {
    name: "Vercel",
    slug: "vercel",
    category: "Deployment",

    description:
      "A deployment platform for frontend applications and web infrastructure.",

    color: "#FFFFFF",
    icon: "/technologies/vercel.svg",
    initials: "VC",
    website: "https://vercel.com",
  },

  {
    name: "Lucide React",
    slug: "lucide",
    category: "Frontend",

    description:
      "An SVG icon library for consistent and customizable React interface icons.",

    color: "#F56565",
    icon: "/technologies/lucide.svg",
    initials: "LC",
    website: "https://lucide.dev",
  },

  {
    name: "Motion",
    slug: "motion",
    category: "Animation",

    description:
      "An animation library for interactive interfaces, layout transitions, and motion-based user experiences.",

    color: "#FFF312",
    icon: "/technologies/motion.svg",
    initials: "MO",
    website: "https://motion.dev",
  },

  {
    name: "ESLint",
    slug: "eslint",
    category: "Development Tools",

    description:
      "A static analysis tool for identifying code quality issues and enforcing development standards.",

    color: "#A78BFA",
    icon: "/technologies/eslint.svg",
    initials: "ES",
    website: "https://eslint.org",
  },

  {
    name: "WebP",
    slug: "webp",
    category: "Asset Optimization",

    description:
      "An image format supporting efficient compression for web image delivery.",

    color: "#38BDF8",
    icon: "/technologies/webp.svg",
    initials: "WP",
    website: "https://developers.google.com/speed/webp",
  },

  // ========================================
  // ADDITIONAL STUDIO TECHNOLOGIES
  // ========================================

  {
    name: "Ethereum",
    slug: "ethereum",
    category: "Blockchain",

    description:
      "A decentralized blockchain platform supporting programmable smart contracts and applications.",

    color: "#8B9DDF",
    icon: "/technologies/ethereum.svg",
    initials: "ETH",
    website: "https://ethereum.org",
  },

  {
    name: "Solidity",
    slug: "solidity",
    category: "Language",

    description:
      "A programming language designed for developing smart contracts for Ethereum-compatible environments.",

    color: "#FFFFFF",
    icon: "/technologies/solidity.svg",
    initials: "SL",
    website: "https://soliditylang.org",
  },

  {
    name: "PostgreSQL",
    slug: "postgresql",
    category: "Database",

    description:
      "An open-source relational database system for structured application data and complex queries.",

    color: "#699ECA",
    icon: "/technologies/postgresql.svg",
    initials: "PG",
    website: "https://postgresql.org",
  },

  {
    name: "GSAP",
    slug: "gsap",
    category: "Animation",

    description:
      "A JavaScript animation platform for timelines, scroll-driven experiences, and advanced motion systems.",

    color: "#88CE02",
    icon: "/technologies/gsap.svg",
    initials: "GS",
    website: "https://gsap.com",
  },

  {
    name: "Three.js",
    slug: "threedotjs",
    category: "Graphics",

    description:
      "A JavaScript library for developing interactive three-dimensional experiences in the browser.",

    color: "#FFFFFF",
    icon: "/technologies/threedotjs.svg",
    initials: "3D",
    website: "https://threejs.org",
  },

  {
    name: "AI",
    slug: "artificial-intelligence",
    category: "Artificial Intelligence",

    description:
      "Artificial intelligence technologies for intelligent workflows, automation, and experimental software systems.",

    color: "#8B5CF6",
    initials: "AI",
  },
];

// ==========================================
// NORMALIZATION
// ==========================================

function normalizeTechnology(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// ==========================================
// ALIASES
// ==========================================

const TECHNOLOGY_ALIASES: Record<
  string,
  string
> = {
  nextjs: "nextdotjs",
  nodejs: "nodedotjs",
  threejs: "threedotjs",
  tailwind: "tailwindcss",
  framer: "motion",
  framermotion: "motion",
  motionreact: "motion",
  lucidereact: "lucide",
  solanawallet: "solanawalletadapter",
  web3js: "solanaweb3js",
  postgres: "postgresql",
  ai: "artificial-intelligence",
};

// ==========================================
// LOOKUP
// ==========================================

export function getTechnology(
  name: string
): Technology {
  const normalized =
    normalizeTechnology(name);

  const alias =
    TECHNOLOGY_ALIASES[normalized];

  const technology = technologies.find(
    (item) =>
      normalizeTechnology(item.name) ===
        normalized ||
      normalizeTechnology(item.slug) ===
        normalized ||
      item.slug === alias
  );

  if (technology) {
    return technology;
  }

  // Safe fallback for technologies
  // not yet included in the registry.

  return {
    name,
    slug:
      normalized || "unknown",
    category: "Other",

    description:
      "A technology included in the documented project stack. Additional information is not yet available.",

    color: "#8B8D91",

    initials:
      name
        .replace(/[^a-z0-9]/gi, "")
        .slice(0, 3)
        .toUpperCase() || "TECH",
  };
}

export function getTechnologies(
  names: string[]
): Technology[] {
  const seen = new Set<string>();

  return names
    .map(getTechnology)
    .filter((technology) => {
      if (seen.has(technology.slug)) {
        return false;
      }

      seen.add(technology.slug);

      return true;
    });
}

export function getAllTechnologies():
  Technology[] {
  return technologies;
}

export function getTechnologiesByCategory(
  category: TechnologyCategory
): Technology[] {
  return technologies.filter(
    (technology) =>
      technology.category === category
  );
}

export function getTechnologyCategories(
  items: Technology[] = technologies
): TechnologyCategory[] {
  return Array.from(
    new Set(
      items.map(
        (technology) =>
          technology.category
      )
    )
  );
}
