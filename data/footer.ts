
import {
  getContactChannels,
  getContactUrl,
} from "@/data/contact";

export const footerBrand = {
  name: "Aether Lab",
  positioning: "Independent Technology Studio",

  description:
    "Exploring ideas through software, decentralized systems, artificial intelligence, and emerging technologies.",

  location: "Jambi, Indonesia",

  philosophy: {
    first: "Still searching.",
    second: "Still building.",
  },

  closingStatement:
    "Designed & built with curiosity.",

  availability: "Open for projects",
};

export const footerCapabilities = [
  {
    id: "software",
    label: "Software & Web Development",
    href: "#capabilities",
  },
  {
    id: "blockchain",
    label: "Web3 & Blockchain",
    href: "#capabilities",
  },
  {
    id: "ai",
    label: "AI & Automation",
    href: "#capabilities",
  },
  {
    id: "experimental",
    label: "Experimental Technology",
    href: "#capabilities",
  },
];

export function getFooterContacts() {
  return getContactChannels("footer").flatMap(
    (channel) => {
      const href = getContactUrl(channel);

      if (!href) {
        return [];
      }

      return [
        {
          ...channel,
          href,
        },
      ];
    }
  );
}
