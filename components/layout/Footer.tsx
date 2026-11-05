
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  AtSign,
  Camera,
  Code2,
  Send,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Builds", href: "#builds" },
  { label: "Experiments", href: "#experiments" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/nauflbynn",
    icon: Camera,
  },
  {
    label: "X",
    href: "https://x.com/naufalbyn",
    icon: AtSign,
  },
  {
    label: "GitHub",
    href: "https://github.com/naufalbyn",
    icon: Code2,
  },
  {
    label: "Telegram",
    href: "https://t.me/naufalbyn",
    icon: Send,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-aether-black text-white">
      <div className="h-px w-full bg-white/10" />

      <div className="aether-container">
        <div className="grid gap-14 py-16 md:grid-cols-12 md:gap-6 md:py-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Aether Lab home"
              className="group inline-flex items-center"
            >
              <div className="relative flex h-12 w-12 items-center justify-center">
                <Image
                  src="/aether-mark.svg"
                  alt="Aether Lab"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:rotate-12"
                />
              </div>

              <div className="ml-3 flex flex-col leading-none">
                <span className="font-display text-sm font-semibold tracking-[0.2em]">
                  AETHER LAB
                </span>

                <span className="mt-1.5 font-mono text-[8px] tracking-[0.16em] text-white/35">
                  INDEPENDENT TECHNOLOGY STUDIO
                </span>
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              Exploring ideas through software, Web3, AI, and experimental
              digital systems. Still searching. Still building.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-lime/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-aether-lime" />
              </span>

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
                Independent / Active
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              Navigation
            </div>

            <nav className="mt-6 flex flex-col items-start gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 font-display text-sm text-white/60 transition-colors duration-300 hover:text-aether-lime"
                >
                  <span>{item.label}</span>

                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className="opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              Find Us
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-white/8 pb-3 transition-colors duration-300 hover:border-aether-lime/50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={15}
                        strokeWidth={1.5}
                        className="text-white/35 transition-colors duration-300 group-hover:text-aether-lime"
                      />

                      <span className="font-display text-sm text-white/60 transition-colors duration-300 group-hover:text-white">
                        {social.label}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-aether-lime"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-5 border-t border-white/10 py-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[8px] tracking-[0.14em] text-white/30">
            © {new Date().getFullYear()} AETHER LAB. ALL RIGHTS RESERVED.
          </span>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[8px] tracking-[0.14em] text-white/30">
              DESIGNED & BUILT WITH CURIOSITY
            </span>

            <span className="h-1 w-1 rounded-full bg-aether-lime" />

            <span className="font-mono text-[8px] tracking-[0.14em] text-white/30">
              INDONESIA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
