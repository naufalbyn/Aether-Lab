
export type ArchiveCategory =
  | "education"
  | "leadership"
  | "community"
  | "hackathon"
  | "project"
  | "venture"
  | "professional"
  | "achievement"
  | "certification";

export type ConnectionPlatform =
  | "github"
  | "linkedin"
  | "instagram"
  | "x"
  | "telegram"
  | "website"
  | "email";

export interface FounderIdentity {
  name: string;
  initials: string;
  role: string;
  studio: string;
  location: string;
  positioning: string;
  portrait: string | null;
  portraitAlt: string;
}

export interface FounderValue {
  number: string;
  slug: string;
  title: string;
  description: string;
  accent: string;
}

export interface FounderDomain {
  number: string;
  slug: string;
  title: string;
  description: string;
  topics: string[];
  accent: string;
}

export interface FounderArchiveEntry {
  id: string;
  category: ArchiveCategory;
  title: string;
  organization?: string;
  role?: string;
  period?: string;
  description: string;
  highlights?: string[];
  href?: string;
}

export interface FounderConnection {
  platform: ConnectionPlatform;
  label: string;
  handle: string;
  href: string;
}

export interface FounderVenture {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  href?: string;
}

// ==========================================
// PERMANENT IDENTITY
// ==========================================

export const founderIdentity: FounderIdentity = {
  name: "Naufal Aufaa Abyan",
  initials: "NA",
  role: "Founder of Aether Lab",
  studio: "Aether Lab",
  location: "Jambi, Indonesia",

  positioning:
    "Technology. Entrepreneurship. Innovation.",

  // Set a local image path when a real
  // founder portrait becomes available.
  portrait: null,

  portraitAlt:
    "Portrait of Naufal Aufaa Abyan, founder of Aether Lab",
};

// ==========================================
// EVERGREEN BIOGRAPHY
// ==========================================

export const founderBiography = {
  headline: "Beyond the ordinary.",

  statement:
    "Transforming curiosity into meaningful systems and new possibilities.",

  paragraphs: [
    "I'm Naufal Aufaa Abyan, the founder of Aether Lab, an independent technology studio built around curiosity, experimentation, and the pursuit of meaningful innovation.",

    "My interests span the intersection of technology, entrepreneurship, design, and problem-solving. I believe technology is more than a collection of tools; it is a means of transforming ideas into systems, addressing challenges, and creating new possibilities.",

    "Through Aether Lab, I explore software engineering, decentralized systems, artificial intelligence, automation, and emerging technologies, with an emphasis on building, experimenting, and continuously evolving.",

    "My approach is guided by independent thinking, continuous learning, and the belief that meaningful progress comes from questioning conventions and having the courage to create something different.",

    "My long-term vision is to build technology that creates lasting value, contributes to meaningful progress, and expands what is possible.",

    "Aether Lab is a reflection of that journey.",
  ],
};

// ==========================================
// PERSONAL PHILOSOPHY
// ==========================================

export const founderPhilosophy = {
  headline:
    "Building is a way of understanding the world.",

  description:
    "Ideas are starting points, not conclusions. Through questioning, experimentation, and creation, we discover possibilities that were previously unexplored.",

  statement:
    "Think independently. Create fearlessly. Evolve continuously.",
};

// ==========================================
// CORE VALUES
// ==========================================

export const founderValues: FounderValue[] = [
  {
    number: "01",
    slug: "curiosity",
    title: "Curiosity",
    description:
      "Question what already exists and remain open to what has yet to be understood.",
    accent: "#4F46FF",
  },
  {
    number: "02",
    slug: "independence",
    title: "Independent Thinking",
    description:
      "Develop perspectives through exploration, reasoning, and practical experience.",
    accent: "#8B5CF6",
  },
  {
    number: "03",
    slug: "creation",
    title: "Meaningful Creation",
    description:
      "Transform ideas into systems, products, and experiences that have a reason to exist.",
    accent: "#1EC1CB",
  },
  {
    number: "04",
    slug: "evolution",
    title: "Continuous Evolution",
    description:
      "Treat growth as an ongoing process rather than a destination.",
    accent: "#C7FF3D",
  },
];

// ==========================================
// AREAS OF EXPLORATION
// ==========================================

export const founderDomains: FounderDomain[] = [
  {
    number: "01",
    slug: "technology",
    title: "Technology",
    description:
      "Exploring digital systems and emerging technologies to understand how they can shape new possibilities.",

    topics: [
      "Software Engineering",
      "Blockchain",
      "Artificial Intelligence",
      "Automation",
    ],

    accent: "#4F46FF",
  },
  {
    number: "02",
    slug: "entrepreneurship",
    title: "Entrepreneurship",
    description:
      "Exploring how ideas can become sustainable products, services, and ventures that create meaningful value.",

    topics: [
      "Product Development",
      "Business Models",
      "Digital Ventures",
      "Value Creation",
    ],

    accent: "#FF9135",
  },
  {
    number: "03",
    slug: "engineering",
    title: "Engineering",
    description:
      "Turning abstract ideas into practical systems through structured reasoning, experimentation, and implementation.",

    topics: [
      "System Design",
      "Problem Solving",
      "Prototyping",
      "Technical Architecture",
    ],

    accent: "#1EC1CB",
  },
  {
    number: "04",
    slug: "innovation",
    title: "Innovation",
    description:
      "Questioning conventional approaches and exploring new intersections between technology, creativity, and human needs.",

    topics: [
      "Emerging Technologies",
      "Experimental Interfaces",
      "Creative Thinking",
      "Research & Exploration",
    ],

    accent: "#8B5CF6",
  },
];

// ==========================================
// HISTORICAL ARCHIVE
// ==========================================

export const founderArchive: FounderArchiveEntry[] = [
  {
    id: "unama-education",
    category: "education",

    title: "Informatics Engineering",

    organization:
      "Universitas Dinamika Bangsa",

    description:
      "An academic journey in informatics, programming, software development, and the foundations of digital systems.",

    highlights: [
      "Programming & Computer Science",
      "Software Development",
      "Information Systems",
    ],
  },

  {
    id: "unama-blockchain-leadership",
    category: "leadership",

    title: "Student Technology Leadership",

    organization:
      "UNAMA Blockchain Club",

    role: "Vice President",

    period: "2026",

    description:
      "Leadership experience within a student-led blockchain community, involving collaboration, organizational development, and technology-focused initiatives.",

    highlights: [
      "Community Development",
      "Team Collaboration",
      "Event Organization",
      "Member Recruitment",
    ],
  },

  {
    id: "blockdevid-builder-fellow",
    category: "community",

    title: "BlockDevId Builder Fellow",

    organization:
      "UNAMA Blockchain Club",

    role: "Event Lead",

    period: "2026",

    description:
      "Contributing to the organization of a blockchain-focused learning initiative within the student technology community.",

    highlights: [
      "Event Coordination",
      "Community Learning",
      "Collaborative Initiatives",
    ],
  },

  {
    id: "solana-frontier-hackathon",
    category: "hackathon",

    title: "Solana Frontier Hackathon",

    organization: "Colosseum",

    role: "Team Participant",

    period: "2026",

    description:
      "Collaborative participation through the development of Stack Block Arcade, an experimental blockchain gaming project.",

    href: "/projects/stack-block-arcade",
  },

  {
    id: "national-campus-hackathon",
    category: "hackathon",

    title: "Indonesia National Campus Hackathon",

    organization: "Superteam Indonesia",

    role: "Team Participant",

    period: "2026",

    description:
      "Participation in a national campus hackathon through collaborative development and Web3 product exploration.",

    href: "/projects/stack-block-arcade",
  },

  {
    id: "axeon-protocol-development",
    category: "project",

    title: "Axeon Protocol",

    role: "Independent Developer",

    description:
      "Independent exploration of programmable membership, payment validation, and blockchain-integrated access systems.",

    href: "/projects/axeon-protocol",
  },

  {
    id: "stack-block-arcade-development",
    category: "project",

    title: "Stack Block Arcade",

    role: "Collaborative Project Lead",

    description:
      "Collaborative exploration of blockchain gaming, gameplay mechanics, and competitive digital experiences.",

    href: "/projects/stack-block-arcade",
  },

  {
    id: "bangau-matahari-development",
    category: "professional",

    title: "Bangau Matahari",

    role: "Full-Stack Developer",

    description:
      "Commercial website development for a local business, translating product information and customer needs into a responsive digital experience.",

    href: "/projects/bangau-matahari",
  },

  {
    id: "aether-lab-origin",
    category: "venture",

    title: "Aether Lab",

    role: "Founder",

    description:
      "Building an independent technology studio centered on software engineering, blockchain, AI, automation, and experimental technologies.",
  },
];

// ==========================================
// ARCHIVE GROUPS
// ==========================================

export interface FounderArchiveGroup {
  id: string;
  title: string;
  description: string;
  categories: ArchiveCategory[];
}

export const founderArchiveGroups:
  FounderArchiveGroup[] = [
    {
      id: "foundations",
      title: "Education & Foundations",
      description:
        "The foundations behind the journey.",
      categories: ["education"],
    },
    {
      id: "leadership-community",
      title: "Leadership & Community",
      description:
        "Experiences built through collaboration.",
      categories: [
        "leadership",
        "community",
      ],
    },
    {
      id: "engineering-creations",
      title: "Engineering & Creations",
      description:
        "Learning through building and competition.",
      categories: [
        "project",
        "hackathon",
        "professional",
      ],
    },
    {
      id: "entrepreneurial-journey",
      title: "Entrepreneurial Journey",
      description:
        "Turning ideas into independent ventures.",
      categories: ["venture"],
    },
    {
      id: "recognition",
      title: "Achievements & Recognition",
      description:
        "Documented milestones and recognition.",
      categories: [
        "achievement",
        "certification",
      ],
    },
  ];

// ==========================================
// VENTURES
// ==========================================

export const founderVentures: FounderVenture[] = [
  {
    id: "aether-lab",
    name: "Aether Lab",
    role: "Founder",
    category: "Independent Technology Studio",

    description:
      "An independent space for engineering, experimentation, product development, and technological exploration.",
  },
];

// ==========================================
// LONG-TERM VISION
// ==========================================

export const founderVision = {
  first: "Create lasting value.",

  second: "Expand what is possible.",

  paragraphs: [
    "To continuously explore, create, and evolve through technology and entrepreneurship.",

    "To build systems, products, and ventures that solve meaningful problems, create lasting value, and open new possibilities.",

    "To remain curious regardless of experience, ambitious regardless of limitations, and willing to challenge what is considered possible.",
  ],

  closing:
    "The journey is far from finished.",
};

// ==========================================
// PROFESSIONAL CONNECTIONS
// ==========================================

export const founderConnections:
  FounderConnection[] = [
    {
      platform: "github",
      label: "GitHub",
      handle: "naufalbyn",
      href: "https://github.com/naufalbyn",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      handle: "Naufal Aufaa Abyan",
      href:
        "https://www.linkedin.com/in/naufal-aufaa-abyan-25604044a/",
    },
    {
      platform: "instagram",
      label: "Instagram",
      handle: "@nauflbynn",
      href:
        "https://www.instagram.com/nauflbynn/",
    },
    {
      platform: "x",
      label: "X",
      handle: "@naufalbyn",
      href: "https://x.com/naufalbyn",
    },
    {
      platform: "telegram",
      label: "Telegram",
      handle: "@naufalbyn",
      href: "https://t.me/naufalbyn",
    },
  ];

// ==========================================
// DATA HELPERS
// ==========================================

export function getFounderArchiveByCategory(
  category: ArchiveCategory
) {
  return founderArchive.filter(
    (entry) => entry.category === category
  );
}

export function getFounderArchiveGroups() {
  return founderArchiveGroups
    .map((group) => ({
      ...group,

      entries: founderArchive.filter(
        (entry) =>
          group.categories.includes(
            entry.category
          )
      ),
    }))
    .filter(
      (group) => group.entries.length > 0
    );
}

export function getFounderVentures() {
  return founderVentures;
}

export function getFounderConnections() {
  return founderConnections;
}
