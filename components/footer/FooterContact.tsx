
import {
  ArrowUpRight,
  AtSign,
  Camera,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

import type {
  ContactPlatform,
} from "@/data/contact";

import { getFooterContacts } from "@/data/footer";

function ContactIcon({
  platform,
}: {
  platform: ContactPlatform;
}) {
  const props = {
    size: 17,
    strokeWidth: 1.5,
    "aria-hidden": true as const,
  };

  switch (platform) {
    case "whatsapp":
      return <MessageCircle {...props} />;

    case "email":
      return <Mail {...props} />;

    case "telegram":
      return <Send {...props} />;

    case "instagram":
      return <Camera {...props} />;

    case "x":
      return <AtSign {...props} />;
  }
}

export default function FooterContact({
  className = "",
}: {
  className?: string;
}) {
  const contacts = getFooterContacts();

  if (contacts.length === 0) {
    return null;
  }

  return (
    <div className={className}>

      <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
        Connect
      </h2>

      <ul className="mt-5 flex flex-col gap-2">

        {contacts.map((channel) => {
          const email =
            channel.platform === "email";

          return (
            <li key={channel.platform}>

              <a
                href={channel.href}
                target={
                  email ? undefined : "_blank"
                }
                rel={
                  email
                    ? undefined
                    : "noopener noreferrer"
                }
                data-footer-contact={channel.platform}
                className="group flex min-h-11 items-center justify-between gap-3 rounded-md border border-white/10 bg-white/2.5 px-3 py-3 transition-colors duration-300 hover:border-aether-lime/35 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aether-lime motion-reduce:transition-none"
              >

                <span className="flex min-w-0 items-center gap-3">

                  <span
                    className="shrink-0"
                    style={{
                      color: channel.accent,
                    }}
                  >
                    <ContactIcon
                      platform={channel.platform}
                    />
                  </span>

                  <span className="font-display text-sm leading-relaxed text-white/80 transition-colors group-hover:text-white">
                    {channel.name}
                  </span>
                </span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-white/35 transition-[color,transform] duration-300 group-hover:text-aether-lime motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
