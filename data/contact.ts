export type ContactLanguage = "en" | "id";

export type ContactPlatform =
  | "whatsapp"
  | "email"
  | "telegram"
  | "instagram"
  | "x";

export type ContactIntent =
  | "project"
  | "collaboration"
  | "research"
  | "general";

type LocalizedText = Record<ContactLanguage, string>;

export interface BusinessChannel {
  platform: ContactPlatform;
  name: string;
  address: string | null;
  description: LocalizedText;
  accent: string;
  primary: boolean;
  placement: ("contact" | "footer")[];
}

// ==========================================
// OFFICIAL AETHER LAB CONTACTS
// ==========================================

export const businessChannels: BusinessChannel[] = [
  {
    platform: "whatsapp",
    name: "WhatsApp Business",
    address: "6285121200406",
    description: {
      en: "Discuss your project directly.",
      id: "Diskusikan proyek Anda secara langsung.",
    },
    accent: "#C7FF3D",
    primary: true,
    placement: ["contact", "footer"],
  },
  {
    platform: "email",
    name: "Business Email",
    address: null,
    description: {
      en: "Formal business inquiries.",
      id: "Komunikasi bisnis formal.",
    },
    accent: "#A5A2FF",
    primary: false,
    placement: ["contact", "footer"],
  },
  {
    platform: "telegram",
    name: "Telegram",
    address: null,
    description: {
      en: "Technology and collaboration.",
      id: "Teknologi dan kolaborasi.",
    },
    accent: "#1EC1CB",
    primary: false,
    placement: ["contact", "footer"],
  },
  {
    platform: "instagram",
    name: "Instagram",
    address: null,
    description: {
      en: "Discover our work and updates.",
      id: "Temukan karya dan kabar terbaru kami.",
    },
    accent: "#E879F9",
    primary: false,
    placement: ["footer"],
  },
  {
    platform: "x",
    name: "X",
    address: null,
    description: {
      en: "Ideas, research, and technology.",
      id: "Ide, riset, dan teknologi.",
    },
    accent: "#F5F5F2",
    primary: false,
    placement: ["footer"],
  },
];

// ==========================================
// CONTACT INTENTS
// ==========================================

export interface InquiryIntent {
  id: ContactIntent;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
  subject: LocalizedText;
  message: LocalizedText;
}

export const contactIntents: InquiryIntent[] = [
  {
    id: "project",
    number: "01",
    title: {
      en: "Start a project",
      id: "Mulai proyek",
    },
    description: {
      en: "Software, websites, and digital systems.",
      id: "Software, website, dan sistem digital.",
    },
    subject: {
      en: "New Project Inquiry",
      id: "Pengajuan Proyek Baru",
    },
    message: {
      en: "Hello Aether Lab, I'd like to discuss a new project and explore how we can work together.",
      id: "Halo Aether Lab, saya ingin mendiskusikan proyek baru dan menjajaki kemungkinan bekerja sama.",
    },
  },
  {
    id: "collaboration",
    number: "02",
    title: {
      en: "Explore collaboration",
      id: "Jajaki kolaborasi",
    },
    description: {
      en: "Partnerships and shared possibilities.",
      id: "Kemitraan dan peluang kerja sama.",
    },
    subject: {
      en: "Collaboration Inquiry",
      id: "Pengajuan Kolaborasi",
    },
    message: {
      en: "Hello Aether Lab, I'd like to explore a potential collaboration opportunity.",
      id: "Halo Aether Lab, saya ingin mendiskusikan peluang kolaborasi.",
    },
  },
  {
    id: "research",
    number: "03",
    title: {
      en: "Research & experiments",
      id: "Riset & eksperimen",
    },
    description: {
      en: "Explore technology and emerging ideas.",
      id: "Eksplorasi teknologi dan ide baru.",
    },
    subject: {
      en: "Research and Technology Inquiry",
      id: "Diskusi Riset dan Teknologi",
    },
    message: {
      en: "Hello Aether Lab, I'd like to discuss a research or technology experiment.",
      id: "Halo Aether Lab, saya ingin berdiskusi mengenai riset atau eksperimen teknologi.",
    },
  },
  {
    id: "general",
    number: "04",
    title: {
      en: "General inquiry",
      id: "Pertanyaan umum",
    },
    description: {
      en: "Questions, ideas, and conversations.",
      id: "Pertanyaan, ide, dan diskusi umum.",
    },
    subject: {
      en: "General Inquiry",
      id: "Pertanyaan Umum",
    },
    message: {
      en: "Hello Aether Lab, I have an inquiry and would like to connect with your studio.",
      id: "Halo Aether Lab, saya memiliki pertanyaan dan ingin berdiskusi dengan studio Anda.",
    },
  },
];

// ==========================================
// REGISTRY HELPERS
// ==========================================

export function getContactChannels(placement: "contact" | "footer") {
  return businessChannels.filter((channel) =>
    channel.placement.includes(placement),
  );
}

export function getContactIntent(id: ContactIntent) {
  return contactIntents.find((intent) => intent.id === id) ?? contactIntents[0];
}

// ==========================================
// CONTACT URL GENERATOR
// ==========================================

export function getContactUrl(
  channel: BusinessChannel,
  message = "",
  subject = "",
): string | null {
  const address = channel.address?.trim();

  if (!address) return null;

  switch (channel.platform) {
    case "whatsapp": {
      const number = address.replace(/[\s()+-]/g, "");

      if (!/^[1-9]\d{7,14}$/.test(number)) {
        return null;
      }

      return message
        ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
        : `https://wa.me/${number}`;
    }

    case "email": {
      if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(address)) {
        return null;
      }

      const params = new URLSearchParams();

      if (subject) params.set("subject", subject);
      if (message) params.set("body", message);

      const query = params.toString().replace(/\+/g, "%20");

      return `mailto:${address}${query ? `?${query}` : ""}`;
    }

    case "telegram":
    case "instagram":
    case "x": {
      const username = address.replace(/^@/, "");

      if (!/^[a-zA-Z0-9_.]{1,64}$/.test(username)) {
        return null;
      }

      if (channel.platform === "telegram") {
        return `https://t.me/${username}`;
      }

      if (channel.platform === "instagram") {
        return `https://www.instagram.com/${username}/`;
      }

      return `https://x.com/${username}`;
    }

    default:
      return null;
  }
}
