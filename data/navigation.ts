
export type NavigationId =
  | "work"
  | "capabilities"
  | "lab"
  | "about"
  | "contact";

export interface NavigationItem {
  id: NavigationId;
  label: string;
  href: string;
  description: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    id: "work",
    label: "Work",
    href: "#builds",
    description: "Selected builds and projects.",
  },
  {
    id: "capabilities",
    label: "Capabilities",
    href: "#capabilities",
    description: "What we build and explore.",
  },
  {
    id: "lab",
    label: "Lab",
    href: "#experiments",
    description: "Research and experimentation.",
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    description: "The human behind Aether.",
  },
];

export const contactNavigation: NavigationItem = {
  id: "contact",
  label: "Start Project",
  href: "#contact",
  description: "Let's build something meaningful.",
};

export const mobileNavigation = [
  ...primaryNavigation,
  contactNavigation,
];

export const footerNavigation = [
  {
    label: "Home",
    href: "#top",
  },
  {
    label: "Capabilities",
    href: "#capabilities",
  },
  {
    label: "Selected Builds",
    href: "#builds",
  },
  {
    label: "Technology",
    href: "#technology",
  },
  {
    label: "Experiments",
    href: "#experiments",
  },
  {
    label: "Philosophy",
    href: "#philosophy",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Start Project",
    href: "#contact",
  },
];
