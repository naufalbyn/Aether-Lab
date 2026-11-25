
export type ProjectStatus =
  | "Rebuilding"
  | "Live on Devnet"
  | "Delivered to Client"
  | "In Development"
  | "Prototype"
  | "Experiment"
  | "Completed"
  | "Live";

export type ProjectType =
  | "Personal"
  | "Collaborative"
  | "Commercial";

export type ProjectVisualType =
  | "protocol"
  | "arcade"
  | "commerce"
  | "software"
  | "automation"
  | "experimental";

export type ProjectVisualMode =
  | "concept"
  | "mockup"
  | "screenshot";

export type FeatureStatus =
  | "Documented"
  | "Planned"
  | "Rebuilding";

// ==========================================
// PROJECT INTERFACES
// ==========================================

export interface ProjectFeature {
  title: string;
  description: string;
  status: FeatureStatus;
}

export interface ProjectTeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
}

export interface ProjectRoadmapItem {
  title: string;
  completed: boolean;
  description?: string;
}

export interface ProjectStrategicMilestone {
  period: string;
  title: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// ==========================================
// PROJECT EVENT
// ==========================================

export interface ProjectEvent {
  name: string;
  type: string;
  participation: string;
}

// ==========================================
// BUSINESS MODEL
// ==========================================

export interface ProjectBusinessAllocation {
  label: string;
  percentage: number;
  purpose: string;
}

export interface ProjectBusinessModel {
  status: "Proposed" | "Active";

  modelType:
    | "Transaction Fee"
    | "Fund Distribution";

  description: string;

  allocationBasis: string;

  totalPercentage: number;

  transactionFee?: number;

  allocations: ProjectBusinessAllocation[];

  note?: string;
}

// ==========================================
// MARKET OPPORTUNITY
// ==========================================

export interface ProjectMarketOpportunity {
  description: string;

  segments: string[];

  target?: {
    label: string;
    value: string;
    description?: string;
  };

  note?: string;
}

// ==========================================
// GAMEPLAY SYSTEM
// ==========================================

export interface ProjectGameMechanic {
  title: string;
  description: string;
  status: FeatureStatus;
}

export interface ProjectGameArena {
  number: string;
  name: string;
  description: string;
  accent: string;
}

export interface ProjectGameplay {
  description: string;

  mechanics: ProjectGameMechanic[];

  arenas: ProjectGameArena[];

  modes: string[];

  note?: string;
}

// ==========================================
// MAIN PROJECT INTERFACE
// ==========================================

export interface Project {
  number: string;
  slug: string;
  title: string;
  category: string;
  projectType: ProjectType;

  tagline: string;
  positioning?: string;

  description: string;
  overview: string;
  problem: string;
  objective: string;

  status: ProjectStatus;
  statusDescription: string;

  role: string;
  contribution: string;

  developmentModel?: string;
  futureDevelopment?: string;

  teamSize?: number;

  technologies: string[];
  technologyNote?: string;

  focusAreas: string[];

  features: ProjectFeature[];

  architecture: ProjectArchitecture[];
  architectureNote?: string;

  roadmap?: ProjectRoadmapItem[];
  roadmapNote?: string;

  strategicRoadmap?: ProjectStrategicMilestone[];
  strategicRoadmapNote?: string;

  metrics?: ProjectMetric[];
  metricsNote?: string;

  team?: ProjectTeamMember[];
  teamNote?: string;

  events?: ProjectEvent[];

  businessModel?: ProjectBusinessModel;
  marketOpportunity?: ProjectMarketOpportunity;

  gameplay?: ProjectGameplay;

  network?: string;
  deliveryModel?: string;

  accent: string;
  surface: string;
  gradient: string;

  visualType: ProjectVisualType;
  visualMode: ProjectVisualMode;

  links?: {
    github?: string;
    demo?: string;
    website?: string;
    documentation?: string;
  };

  images?: {
    logo?: string;
    cover?: string;
    gallery?: ProjectImage[];
  };
}

// ==========================================
// PROJECT COLLECTION
// ==========================================

export const projects: Project[] = [

  // ========================================
  // 01 — AXEON PROTOCOL
  // ========================================

  {
    number: "01",
    slug: "axeon-protocol",
    title: "Axeon Protocol",

    category: "Web3 / Community Infrastructure",
    projectType: "Personal",

    tagline:
      "The Operating System for Communities.",

    description:
      "An independently developed community monetization and access management protocol exploring automated subscriptions, hybrid payments, and blockchain-powered infrastructure.",

    overview:
      "Axeon Protocol is an independent technology project focused on improving how premium digital communities manage payments, subscriptions, and member access. The product vision combines automated payment validation, Telegram community management, Solana-based subscription infrastructure, and planned Web2 and Web3 payment integrations. The project is currently being rebuilt from the ground up as a solo development initiative.",

    problem:
      "Paid digital communities often rely on manual payment verification, inconsistent membership access control, and fragmented payment systems. These processes create operational friction and become increasingly difficult to manage as communities grow.",

    objective:
      "Build a unified community infrastructure that reduces manual administration through automated payment validation, subscription management, access enforcement, and planned privacy-preserving verification across Web2 and Web3 payment channels.",

    status: "Rebuilding",

    statusDescription:
      "Axeon Protocol is currently being rebuilt independently from the ground up. Previously documented components and the original pitch deck inform the project direction. Hybrid payments, zero-knowledge verification, and other proposed capabilities are not represented as production-ready features.",

    role: "Solo Developer & Project Lead",

    contribution:
      "Independently responsible for the current project direction, software development, system architecture, frontend and backend systems, blockchain integration, technical research, and the ongoing rebuild of Axeon Protocol.",

    developmentModel:
      "Independent Solo Development",

    futureDevelopment:
      "Independent system rebuild.",

    teamSize: 1,

    network: "Solana Devnet",

    technologies: [
      "Solana",
      "Rust",
      "Anchor",
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Prisma",
      "Telegraf",
      "Privy",
      "Zustand",
    ],

    technologyNote:
      "The technology stack reflects the previously documented implementation and its technical direction. Final technology choices may change during the independent rebuild.",

    focusAreas: [
      "Community Monetization",
      "Subscription Infrastructure",
      "Non-Custodial Systems",
      "Smart Contracts",
      "Payment Verification",
      "Hybrid Payment Research",
      "Community Automation",
      "Access Management",
      "Zero-Knowledge Privacy Research",
    ],

    // CORE FEATURES

    features: [
      {
        title: "Automated Payment Validation",
        description:
          "A payment verification system designed to reduce manual transaction checks and connect verified payments with subscription access.",
        status: "Rebuilding",
      },
      {
        title: "On-Chain Subscription Management",
        description:
          "Rust-based smart contract architecture using Anchor to manage subscription agreements and membership information on Solana.",
        status: "Rebuilding",
      },
      {
        title: "Telegram Access Enforcement",
        description:
          "Automated membership administration designed to grant or revoke access according to verified subscription status.",
        status: "Rebuilding",
      },
      {
        title: "The Hourly Guard",
        description:
          "An automated monitoring system designed to scan membership records, check subscription expiration, and remove expired members.",
        status: "Rebuilding",
      },
      {
        title: "PDA-Based Architecture",
        description:
          "Program Derived Addresses designed to manage subscription information directly on the Solana ledger.",
        status: "Rebuilding",
      },
      {
        title: "Embedded Wallet Integration",
        description:
          "Privy-based authentication and embedded wallet integration designed to simplify Web3 onboarding.",
        status: "Rebuilding",
      },
      {
        title: "Subscription Dashboard",
        description:
          "Administrative and subscriber interfaces designed for managing memberships, subscription information, and payment status.",
        status: "Rebuilding",
      },
      {
        title: "Unified Hybrid Payments",
        description:
          "A proposed payment infrastructure supporting fiat payment channels such as QRIS and bank transfers alongside cryptocurrency transactions.",
        status: "Planned",
      },
      {
        title: "Zero-Knowledge Privacy Verification",
        description:
          "A proposed research direction exploring zero-knowledge proofs for privacy-preserving verification of payment and subscription information.",
        status: "Planned",
      },
      {
        title: "Unified Community Onboarding",
        description:
          "A planned onboarding experience connecting Telegram users with Web2 and Web3 authentication and subscription workflows.",
        status: "Planned",
      },
    ],

    // TECHNICAL ARCHITECTURE

    architecture: [
      {
        title: "Frontend Application",
        description:
          "Next.js and React interfaces for subscription discovery, authentication, payment interactions, and community administration.",
      },
      {
        title: "Backend Services",
        description:
          "Node.js and TypeScript services designed to connect payment verification, application data, subscription workflows, and Telegram integrations.",
      },
      {
        title: "Smart Contract Layer",
        description:
          "Rust programs using Anchor for Solana-based subscription management and PDA-based membership records.",
      },
      {
        title: "Authentication and Wallet Layer",
        description:
          "Authentication and embedded wallet workflows designed to reduce onboarding friction.",
      },
      {
        title: "Payment Validation Layer",
        description:
          "A proposed verification layer connecting confirmed cryptocurrency payments and future fiat payment integrations with subscription records.",
      },
      {
        title: "Privacy Verification Layer",
        description:
          "A proposed zero-knowledge research component exploring privacy-preserving verification mechanisms.",
      },
      {
        title: "Telegram Integration",
        description:
          "Bot-based community access administration connected to payment and subscription verification services.",
      },
      {
        title: "Automated Membership Monitoring",
        description:
          "The Hourly Guard concept monitors subscription expiration and is designed to synchronize membership access with verified subscription status.",
      },
    ],

    architectureNote:
      "This architecture combines previously documented technical components with the original pitch deck's proposed design. The independent rebuild may introduce changes. Proposed capabilities are not confirmed as operational.",

    // DEVELOPMENT ROADMAP

    roadmap: [
      {
        title: "Initial product concept and pitch deck",
        completed: true,
      },
      {
        title: "Independent architecture rebuild",
        completed: false,
      },
      {
        title: "Core subscription smart contracts",
        completed: false,
      },
      {
        title: "Automated payment validation",
        completed: false,
      },
      {
        title: "Telegram access management",
        completed: false,
      },
      {
        title: "The Hourly Guard monitoring system",
        completed: false,
      },
      {
        title: "Authentication and wallet onboarding",
        completed: false,
      },
      {
        title: "Subscription dashboard rebuild",
        completed: false,
      },
      {
        title: "Hybrid payment research",
        completed: false,
      },
      {
        title: "Zero-knowledge verification research",
        completed: false,
      },
      {
        title: "Integrated Devnet testing",
        completed: false,
      },
      {
        title: "Security review and deployment readiness",
        completed: false,
      },
    ],

    roadmapNote:
      "Indicative development stages for the independent rebuild. Milestones and implementation order may change.",

    // PROPOSED BUSINESS MODEL

    businessModel: {
      status: "Proposed",

      modelType: "Transaction Fee",

      description:
        "The original pitch deck proposes a transaction-based monetization model, allocating protocol fees toward maintenance, research and development, and project revenue.",

      allocationBasis:
        "Percentage of transaction value",

      totalPercentage: 5,

      transactionFee: 5,

      allocations: [
        {
          label: "Maintenance",
          percentage: 2,
          purpose:
            "Infrastructure maintenance, server availability, and automated membership monitoring.",
        },
        {
          label: "Research & Development",
          percentage: 2,
          purpose:
            "Technical research, zero-knowledge verification development, and security reviews.",
        },
        {
          label: "Project Revenue",
          percentage: 1,
          purpose:
            "Proposed revenue allocation for the project.",
        },
      ],

      note:
        "Historical business proposal from the original pitch deck. It does not represent active pricing, realized revenue, or a finalized policy for the independent rebuild.",
    },

    // MARKET OPPORTUNITY

    marketOpportunity: {
      description:
        "Axeon Protocol explores monetization infrastructure for digital communities providing subscription-based access to premium content, education, and specialized information.",

      segments: [
        "Trading & Alpha Groups",
        "Premium Video Communities",
        "Paid Educational Communities",
      ],

      target: {
        label: "Proposed Transaction Target",
        value: "10,000 / month",
        description:
          "Monthly transaction target presented in the original pitch deck.",
      },

      note:
        "These market segments and transaction targets represent the original product proposal, not verified customer counts or achieved transaction volumes.",
    },

    team: [
      {
        name: "Naufal Aufaa Abyan",
        role: "Solo Developer & Project Lead",
      },
    ],

    teamNote:
      "Represents the current independent development of Axeon Protocol.",

    accent: "#0080FF",
    surface: "#102A4A",

    gradient:
      "linear-gradient(135deg, #0B0D10 0%, #102A4A 55%, #1945A5 100%)",

    visualType: "protocol",
    visualMode: "concept",

    links: {
      github:
        "https://github.com/Opayys/Axeon-Management-Protocol",
    },
  },

  // ========================================
  // 02 — STACK BLOCK ARCADE
  // ========================================

  {
    number: "02",
    slug: "stack-block-arcade",
    title: "Stack Block Arcade",

    category: "Web3 / GameFi",
    projectType: "Collaborative",

    tagline:
      "Play. Stack. Compete on-chain.",

    positioning:
      "On-Chain Skill Wagering: The Future of GameFi Economy",

    description:
      "A collaborative Solana-based arcade game developed by a four-person hackathon team, combining skill-based block-stacking gameplay with blockchain-recorded scores and wallet-connected experiences.",

    overview:
      "Stack Block Arcade is a collaborative arcade project developed by a four-person team for the Colosseum National Hackathon and National Campus Hackathon. It explores skill-based gameplay as an alternative to passive click-to-earn gaming models. The project combines precision-based block stacking, wallet connectivity, blockchain-recorded scores, and competitive gameplay concepts. A playable demo has been developed on Solana Devnet.",

    problem:
      "The original project proposal identifies passive click-to-earn models, inflationary reward structures, and limited skill-based challenges as problems within the GameFi ecosystem. Traditional centralized leaderboards also make independent verification of recorded achievements difficult.",

    objective:
      "Explore an engaging, skill-based blockchain arcade experience where precision, timing, and player performance form the foundation of gameplay, supported by transparent score recording and wallet-connected interactions.",

    status: "Live on Devnet",

    statusDescription:
      "A playable game demo has been developed on Solana Devnet. Additional economic systems, Mainnet deployment, and future development remain subject to technical validation and team discussion.",

    role: "Chief Executive Officer (CEO)",

    contribution:
      "Initiated the Stack Block Arcade project, shaped its product direction, contributed to gameplay concepts and game mechanics, and designed the game's calculation systems alongside a collaborative four-person hackathon team.",

    developmentModel:
      "Collaborative Hackathon Development",

    futureDevelopment:
      "Pending Team Discussion",

    teamSize: 4,

    network: "Solana Devnet",

    // HACKATHON PARTICIPATION

    events: [
      {
        name: "Colosseum National Hackathon",
        type: "National Hackathon",
        participation: "Project Development",
      },
      {
        name: "National Campus Hackathon",
        type: "National Campus Competition",
        participation: "Project Development",
      },
    ],

    // TECHNOLOGY STACK

    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Lucide React",
      "Solana",
      "Solana Web3.js",
      "Solana Wallet Adapter",
      "Rust",
      "Anchor",
      "Vercel",
    ],

    focusAreas: [
      "Blockchain Gaming",
      "GameFi",
      "Skill-Based Gameplay",
      "On-Chain Scoring",
      "Wallet Integration",
      "Arcade Mechanics",
      "Progressive Difficulty",
      "Transparent Leaderboards",
      "Collaborative Development",
      "Hackathon Product Development",
    ],

    // CORE FEATURES

    features: [
      {
        title: "Block-Stacking Gameplay",
        description:
          "Classic arcade mechanics where players stack moving blocks with precise timing.",
        status: "Documented",
      },
      {
        title: "On-Chain Score Submission",
        description:
          "Blockchain transactions used to submit game scores to the Solana smart contract.",
        status: "Documented",
      },
      {
        title: "Transparent Leaderboard",
        description:
          "A leaderboard designed around blockchain-recorded scoring information.",
        status: "Documented",
      },
      {
        title: "Non-Custodial Wallet Connection",
        description:
          "Solana wallet integration allowing players to connect and sign transactions using supported wallets.",
        status: "Documented",
      },
      {
        title: "Multiple Game Arenas",
        description:
          "The pitch deck presents three distinct environments with escalating gameplay difficulty.",
        status: "Documented",
      },
      {
        title: "Practice and Ranked Modes",
        description:
          "The documented deployment lobby presents separate practice and ranked gameplay options.",
        status: "Documented",
      },
      {
        title: "Progressive Difficulty",
        description:
          "The game design describes increasing block speed and additional movement challenges as difficulty progresses.",
        status: "Documented",
      },
      {
        title: "Ticket-Based Gameplay Concept",
        description:
          "The original pitch deck proposes a one-ticket-per-attempt system. Its final implementation and economic behavior remain unconfirmed.",
        status: "Planned",
      },
      {
        title: "Tokenized Rewards",
        description:
          "Potential blockchain-based rewards for player achievements and leaderboard performance.",
        status: "Planned",
      },
      {
        title: "Multiplayer Modes",
        description:
          "Future competitive gameplay and head-to-head arcade experiences.",
        status: "Planned",
      },
    ],

    // GAMEPLAY PRESENTATION

    gameplay: {
      description:
        "Stack Block Arcade explores timing, mechanical precision, and progressively challenging gameplay environments.",

      mechanics: [
        {
          title: "Mechanical Precision",
          description:
            "Players rely on timing and precise block placement to build their stack.",
          status: "Documented",
        },
        {
          title: "One Ticket, One Attempt",
          description:
            "The original game proposal describes a single-attempt mechanic without spare lives.",
          status: "Planned",
        },
        {
          title: "Progressive Difficulty",
          description:
            "Increasing speed and more challenging block movements are part of the documented game design.",
          status: "Documented",
        },
      ],

      arenas: [
        {
          number: "01",
          name: "Neon Void",
          description:
            "Stable gravity and normal block speed.",
          accent: "#06B6D4",
        },
        {
          number: "02",
          name: "Toxic Sector",
          description:
            "A higher-difficulty environment featuring erratic block movements.",
          accent: "#A3E635",
        },
        {
          number: "03",
          name: "Plasma Core",
          description:
            "An extreme environment featuring maximum block velocity.",
          accent: "#A855F7",
        },
      ],

      modes: [
        "Practice",
        "Ranked",
      ],

      note:
        "Gameplay concepts, arena names, and mode labels are based on the original pitch deck and documented interface. The availability of every arena and economic mechanic in the current demo has not been independently confirmed.",
    },

    // TECHNICAL ARCHITECTURE

    architecture: [
      {
        title: "Game Client",
        description:
          "Next.js frontend responsible for gameplay, user interactions, and score generation.",
      },
      {
        title: "Web3 Provider",
        description:
          "Solana Wallet Adapter and Solana Web3.js for wallet connections and transaction signing.",
      },
      {
        title: "Smart Contract Layer",
        description:
          "Anchor-based Rust program designed to process score submissions and update on-chain leaderboard state.",
      },
    ],

    architectureNote:
      "Architecture reflects the documented hackathon implementation. Smart contract audit results and comprehensive anti-cheat validation have not been confirmed.",

    // DEVELOPMENT ROADMAP

    roadmap: [
      {
        title: "Core game loop development",
        completed: true,
      },
      {
        title: "Smart contract scoring integration",
        completed: true,
      },
      {
        title: "Playable Devnet demo",
        completed: true,
      },
      {
        title: "Future development team discussion",
        completed: false,
        description:
          "Determine the collaboration arrangement before continuing development.",
      },
      {
        title: "Smart contract security review",
        completed: false,
      },
      {
        title: "Anti-cheat validation",
        completed: false,
      },
      {
        title: "Tokenized rewards research",
        completed: false,
      },
      {
        title: "Multiplayer and head-to-head modes",
        completed: false,
      },
      {
        title: "Mainnet deployment evaluation",
        completed: false,
      },
    ],

    roadmapNote:
      "Completed items reflect the previously documented project state. Future development remains subject to team agreement and technical review.",

    // HISTORICAL STRATEGIC ROADMAP

    strategicRoadmap: [
      {
        period: "Q2 2026",
        title: "Foundation",
        description:
          "Devnet alpha launch, Anchor smart contract audit, and anti-cheat validation.",
      },
      {
        period: "Q3 2026",
        title: "Acquisition",
        description:
          "Mainnet release and B2C market development.",
      },
      {
        period: "Q4 2026",
        title: "Expansion",
        description:
          "B2B advertising, Watch-to-Play, and partner revenue program.",
      },
      {
        period: "Q1 2027",
        title: "Global",
        description:
          "Large-scale sponsored tournaments and Game-as-a-Service infrastructure.",
      },
    ],

    strategicRoadmapNote:
      "Original strategic roadmap from the hackathon pitch deck. These dates are historical targets, not confirmed completed milestones or current delivery commitments.",

    // PROPOSED ECONOMIC MODEL

    businessModel: {
      status: "Proposed",

      modelType: "Fund Distribution",

      description:
        "The original pitch deck presents a proposed economic allocation model for the arcade ecosystem, covering player rewards, partners, development, infrastructure maintenance, and referrals.",

      allocationBasis:
        "Percentage of proposed distributable funds",

      totalPercentage: 100,

      allocations: [
        {
          label: "Prize Pool",
          percentage: 70,
          purpose:
            "Proposed reward allocation for the top 30 winners.",
        },
        {
          label: "B2B Partner",
          percentage: 10,
          purpose:
            "Proposed allocation for business partners.",
        },
        {
          label: "Development Team",
          percentage: 5,
          purpose:
            "Proposed allocation for the development team.",
        },
        {
          label: "Maintenance",
          percentage: 10,
          purpose:
            "Hosting, security, and scaling costs.",
        },
        {
          label: "Referral",
          percentage: 5,
          purpose:
            "Proposed referral and organic growth incentives.",
        },
      ],

      note:
        "Historical economic proposal from the original pitch deck. These allocations do not represent active payment flows, actual payouts, or realized project revenue. Any future implementation requires team agreement, technical validation, and applicable legal and regulatory review.",
    },

    // ORIGINAL HACKATHON TEAM

    team: [
      {
        name: "Naufal Aufaa Abyan",
        role: "CEO",
      },
      {
        name: "Della",
        role: "COO",
      },
      {
        name: "Reza Dwi Wiranata",
        role: "CTO",
      },
      {
        name: "Alya",
        role: "Manager",
      },
    ],

    teamNote:
      "Original four-person hackathon team. Roles follow the project pitch deck. Future development arrangements remain subject to team discussion.",

    // VISUAL IDENTITY

    accent: "#FF9135",
    surface: "#302015",

    gradient:
      "linear-gradient(135deg, #08090D 0%, #302015 55%, #542B12 100%)",

    visualType: "arcade",
    visualMode: "concept",

    links: {
      github:
        "https://github.com/wiranatareza24-beep/StackBlockArcade",
    },
  },

  // ========================================
  // 03 — BANGAU MATAHARI
  // ========================================

  {
    number: "03",
    slug: "bangau-matahari",
    title: "Bangau Matahari",

    category: "Web Development / Product Catalog",
    projectType: "Commercial",

    tagline:
      "Bringing local products into the digital space.",

    description:
      "A commercial product catalog website for Bangau Matahari, a local Jambi snack brand, connecting customers with WhatsApp and Shopee ordering channels.",

    overview:
      "Bangau Matahari is a responsive commercial website developed as a digital product catalog and customer information platform. Customers can explore products and bundles, select packaging variants, calculate order subtotals, and continue their purchases through WhatsApp or Shopee.",

    problem:
      "Customers need a convenient way to discover products, compare packaging options, access business information, and connect with the available ordering channels.",

    objective:
      "Deliver a fast, accessible, and responsive digital catalog that presents the brand's products clearly and simplifies the customer ordering journey.",

    status: "Delivered to Client",

    statusDescription:
      "Development has been completed and the website has been handed over to the client through a one-time purchase arrangement. Public hosting and domain activation are not confirmed.",

    role: "Full-Stack Developer",

    contribution:
      "Responsible for website development, responsive interfaces, product catalog architecture, ordering integrations, SEO implementation, accessibility, and performance optimization.",

    deliveryModel:
      "One-Time Project Delivery",

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "ESLint",
      "WebP",
    ],

    focusAreas: [
      "Commercial Web Development",
      "Product Catalog",
      "Responsive Design",
      "Ordering Integration",
      "Search Engine Optimization",
      "Web Performance",
      "Accessibility",
    ],

    features: [
      {
        title: "Responsive Landing Page",
        description:
          "A responsive brand website designed for mobile, tablet, and desktop devices.",
        status: "Documented",
      },
      {
        title: "Product and Bundle Catalog",
        description:
          "A structured catalog containing seven products and six product bundles, with category filtering and detailed information.",
        status: "Documented",
      },
      {
        title: "Product Configuration",
        description:
          "Packaging variant selection, quantity controls, and automatic subtotal calculation.",
        status: "Documented",
      },
      {
        title: "WhatsApp Ordering",
        description:
          "Order information is prepared and transferred to WhatsApp for direct customer communication.",
        status: "Documented",
      },
      {
        title: "Shopee Integration",
        description:
          "Direct navigation to the brand's marketplace ordering channel.",
        status: "Documented",
      },
      {
        title: "SEO and Social Metadata",
        description:
          "Search engine metadata, Open Graph configuration, sitemap, and robots.txt.",
        status: "Documented",
      },
      {
        title: "Performance Optimization",
        description:
          "Static prerendering, optimized WebP assets, and production-focused website optimization.",
        status: "Documented",
      },
      {
        title: "Accessibility",
        description:
          "Keyboard navigation support and basic accessibility improvements.",
        status: "Documented",
      },
    ],

    architecture: [
      {
        title: "Application Layer",
        description:
          "Next.js App Router with React, TypeScript, static prerendering, and Cache Components.",
      },
      {
        title: "Presentation Layer",
        description:
          "Responsive components developed with Tailwind CSS and Motion.",
      },
      {
        title: "Content Layer",
        description:
          "Source-controlled product, bundle, and business information without a database or CMS.",
      },
      {
        title: "Ordering Layer",
        description:
          "Order-link generation and integration with WhatsApp and Shopee. Payments are not processed directly by the website.",
      },
    ],

    metrics: [
      {
        label: "Performance",
        value: "100/100",
        description:
          "Mobile and desktop Lighthouse score.",
      },
      {
        label: "Accessibility",
        value: "100/100",
        description:
          "Mobile and desktop Lighthouse score.",
      },
      {
        label: "Best Practices",
        value: "100/100",
        description:
          "Mobile and desktop Lighthouse score.",
      },
      {
        label: "SEO",
        value: "100/100",
        description:
          "Mobile and desktop Lighthouse score.",
      },
      {
        label: "Mobile LCP",
        value: "0.9s",
        description:
          "Largest Contentful Paint on mobile.",
      },
      {
        label: "Desktop LCP",
        value: "0.2s",
        description:
          "Largest Contentful Paint on desktop.",
      },
      {
        label: "Asset Size Reduction",
        value: "~89%",
        description:
          "Public asset directory reduced from approximately 35 MB to 3.8 MB.",
      },
      {
        label: "Cumulative Layout Shift",
        value: "0",
        description:
          "Recorded on mobile and desktop.",
      },
    ],

    metricsNote:
      "Based on documented local production-build Lighthouse testing conducted on November 24, 2026, before final repository cleanup. Production results may vary depending on device, network, and hosting conditions.",

    team: [
      {
        name: "Naufal Aufaa Abyan",
        role: "Full-Stack Developer",
      },
      {
        name: "Reza Dwi Wiranata",
        role: "Non-Technical Project Contributor",
      },
    ],

    accent: "#F5B700",
    surface: "#084E25",

    gradient:
      "linear-gradient(135deg, #062D17 0%, #084E25 55%, #176B3A 100%)",

    visualType: "commerce",
    visualMode: "mockup",

    images: {
      cover:
        "/projects/bangau-matahari/03-floating-ui.webp",

      gallery: [
        {
          src:
            "/projects/bangau-matahari/01-hero-laptop.webp",
          alt:
            "Bangau Matahari website presentation on a laptop beside branded gift packaging.",
          caption:
            "Desktop website and brand presentation.",
          width: 1122,
          height: 1402,
        },
        {
          src:
            "/projects/bangau-matahari/02-product-scene.webp",
          alt:
            "Bangau Matahari website on a laptop alongside snack product packaging.",
          caption:
            "Website presentation in a product-focused setting.",
          width: 1122,
          height: 1402,
        },
        {
          src:
            "/projects/bangau-matahari/03-floating-ui.webp",
          alt:
            "Bangau Matahari landing page presented on a textured green background.",
          caption:
            "Landing page and visual identity showcase.",
          width: 1122,
          height: 1402,
        },
        {
          src:
            "/projects/bangau-matahari/04-contact-tablet.webp",
          alt:
            "Bangau Matahari contact and ordering section presented on a tablet.",
          caption:
            "Customer contact and ordering channels.",
          width: 1122,
          height: 1402,
        },
      ],
    },
  },
];

// ==========================================
// PROJECT DATA HELPERS
// ==========================================

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(
  slug: string
): Project | undefined {
  return projects.find(
    (project) => project.slug === slug
  );
}

export function getProjectSlugs(): string[] {
  return projects.map(
    (project) => project.slug
  );
}

export function getProjectsByType(
  projectType: ProjectType
): Project[] {
  return projects.filter(
    (project) => project.projectType === projectType
  );
}

export function getProjectsByStatus(
  status: ProjectStatus
): Project[] {
  return projects.filter(
    (project) => project.status === status
  );
}

export function getRelatedProjects(
  slug: string,
  limit = 2
): Project[] {
  return projects
    .filter((project) => project.slug !== slug)
    .slice(0, Math.max(0, limit));
}

