
import {
  mkdir,
  writeFile,
} from "node:fs/promises";

import path from "node:path";

import {
  fileURLToPath,
} from "node:url";

import * as simpleIcons from "simple-icons";

// ==========================================
// PATH CONFIGURATION
// ==========================================

const scriptDirectory = path.dirname(
  fileURLToPath(import.meta.url)
);

const projectRoot = path.resolve(
  scriptDirectory,
  ".."
);

const outputDirectory = path.join(
  projectRoot,
  "public",
  "technologies"
);

// ==========================================
// ICON CONFIGURATION
// ==========================================

const technologies = [
  {
    name: "Next.js",
    slug: "nextdotjs",
    color: "#FFFFFF",
  },
  {
    name: "React",
    slug: "react",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    slug: "typescript",
    color: "#3178C6",
  },
  {
    name: "JavaScript",
    slug: "javascript",
    color: "#F7DF1E",
  },
  {
    name: "Node.js",
    slug: "nodedotjs",
    color: "#83CD29",
  },
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    color: "#38BDF8",
  },
  {
    name: "Solana",
    slug: "solana",
    color: "#14F195",
  },
  {
    name: "Rust",
    slug: "rust",
    color: "#FFFFFF",
  },
  {
    name: "Anchor",
    slug: "anchor",
    color: "#FFFFFF",
  },
  {
    name: "Prisma",
    slug: "prisma",
    color: "#FFFFFF",
  },
  {
    name: "Telegraf",
    slug: "telegraf",
    color: "#FFFFFF",
  },
  {
    name: "Privy",
    slug: "privy",
    color: "#A78BFA",
  },
  {
    name: "Zustand",
    slug: "zustand",
    color: "#D6A76C",
  },
  {
    name: "Solana Web3.js",
    slug: "solanaweb3js",
    color: "#14F195",
  },
  {
    name: "Solana Wallet Adapter",
    slug: "solanawalletadapter",
    color: "#14F195",
  },
  {
    name: "Vercel",
    slug: "vercel",
    color: "#FFFFFF",
  },
  {
    name: "Lucide React",
    slug: "lucide",
    color: "#F56565",
  },
  {
    name: "Motion",
    slug: "motion",
    color: "#FFF312",
  },
  {
    name: "ESLint",
    slug: "eslint",
    color: "#A78BFA",
  },
  {
    name: "WebP",
    slug: "webp",
    color: "#38BDF8",
  },

  // Future homepage technologies

  {
    name: "Ethereum",
    slug: "ethereum",
    color: "#8B9DDF",
  },
  {
    name: "Solidity",
    slug: "solidity",
    color: "#FFFFFF",
  },
  {
    name: "PostgreSQL",
    slug: "postgresql",
    color: "#699ECA",
  },
  {
    name: "GSAP",
    slug: "gsap",
    color: "#88CE02",
  },
  {
    name: "Three.js",
    slug: "threedotjs",
    color: "#FFFFFF",
  },
];

// ==========================================
// BUILD ICON LOOKUP
// ==========================================

const availableIcons = new Map(
  Object.values(simpleIcons)
    .filter(
      (icon) =>
        icon &&
        typeof icon === "object" &&
        typeof icon.slug === "string" &&
        typeof icon.path === "string"
    )
    .map((icon) => [
      icon.slug,
      icon,
    ])
);

// ==========================================
// GENERATE SVG
// ==========================================

function createSvg(icon, color) {
  const safeTitle = icon.title
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  return [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    ' viewBox="0 0 24 24"',
    ` fill="${color}">`,
    `<title>${safeTitle}</title>`,
    `<path d="${icon.path}"/>`,
    "</svg>",
  ].join("");
}

// ==========================================
// GENERATOR
// ==========================================

async function generateIcons() {
  await mkdir(outputDirectory, {
    recursive: true,
  });

  const generated = [];
  const missing = [];
  const manifest = {};

  console.log(
    "\nAETHER LAB — TECHNOLOGY ICON GENERATOR\n"
  );

  for (const technology of technologies) {
    const icon = availableIcons.get(
      technology.slug
    );

    if (!icon) {
      missing.push({
        name: technology.name,
        slug: technology.slug,
      });

      console.log(
        `[MISSING] ${technology.name}`
      );

      continue;
    }

    const filename =
      `${technology.slug}.svg`;

    const destination = path.join(
      outputDirectory,
      filename
    );

    await writeFile(
      destination,
      createSvg(
        icon,
        technology.color
      ),
      "utf8"
    );

    manifest[technology.slug] = {
      src: `/technologies/${filename}`,
      title: icon.title,
      source: icon.source,
      color: technology.color,
      guidelines:
        icon.guidelines ?? null,
      license:
        icon.license ?? null,
    };

    generated.push(technology.name);

    console.log(
      `[CREATED] ${filename}`
    );
  }

  await writeFile(
    path.join(
      outputDirectory,
      "manifest.json"
    ),
    JSON.stringify(
      manifest,
      null,
      2
    ),
    "utf8"
  );

  console.log(
    "\n=========================================="
  );

  console.log(
    `Generated : ${generated.length}`
  );

  console.log(
    `Missing   : ${missing.length}`
  );

  console.log(
    `Total     : ${technologies.length}`
  );

  console.log(
    "==========================================\n"
  );

  if (missing.length > 0) {
    console.log(
      "Technologies requiring additional logo assets:"
    );

    console.table(missing);
  }

  console.log(
    "\nTechnology icon generation completed.\n"
  );
}

generateIcons().catch((error) => {
  console.error(
    "Technology icon generation failed:",
    error
  );

  process.exitCode = 1;
});
