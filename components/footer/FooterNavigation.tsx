
import { ArrowUpRight } from "lucide-react";

import { footerNavigation } from "@/data/navigation";

import { footerCapabilities } from "@/data/footer";

interface FooterLink {
  label: string;
  href: string;
}

function FooterLinkGroup({
  title,
  links,
  className = "",
}: {
  title: string;
  links: FooterLink[];
  className?: string;
}) {
  return (
    <nav
      aria-label={`Footer ${title}`}
      className={className}
    >

      <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
        {title}
      </h2>

      <ul className="mt-5 flex flex-col items-start gap-3.5">

        {links.map((item) => (
          <li key={item.label}>

            <a
              href={item.href}
              className="group inline-flex min-h-7 items-center gap-2 rounded-sm font-display text-sm leading-relaxed text-white/75 transition-colors duration-300 hover:text-aether-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aether-lime motion-reduce:transition-none"
            >
              <span>{item.label}</span>

              <ArrowUpRight
                size={12}
                strokeWidth={1.5}
                aria-hidden="true"
                className="shrink-0 opacity-0 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function FooterNavigation({
  variant = "explore",
  className = "",
}: {
  variant?: "explore" | "expertise";
  className?: string;
}) {
  return (
    <FooterLinkGroup
      title={
        variant === "explore"
          ? "Explore"
          : "Expertise"
      }
      links={
        variant === "explore"
          ? footerNavigation
          : footerCapabilities
      }
      className={className}
    />
  );
}
