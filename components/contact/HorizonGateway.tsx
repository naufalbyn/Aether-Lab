
"use client";

import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRight,
  ArrowDown,
  Check,
  Code2,
  Copy,
  FlaskConical,
  Handshake,
  Mail,
  MessageCircle,
  MessagesSquare,
  Send,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import HorizonVisual from "@/components/contact/HorizonVisual";

import {
  contactIntents,
  getContactChannels,
  getContactIntent,
  getContactUrl,
  type ContactLanguage,
  type ContactIntent,
  type ContactPlatform,
  type BusinessChannel,
} from "@/data/contact";

// ==========================================
// LOCALIZATION
// ==========================================

const translations = {
  en: {
    section: "Start Project",
    availability: "Projects / Collaboration",
    chapter: "The next chapter begins here",
    headlineFirst: "What comes next",
    headlineSecond: "is up to us.",
    introduction:
      "Ideas become possibilities. Possibilities become systems. Let's build something meaningful together.",
    discover: "Start a conversation",
    gateway: "Connection Gateway",
    gatewayDescription:
      "Choose how you would like to connect with Aether Lab.",
    intent: "Select your intent",
    channel: "Choose your channel",
    message: "Your opening message",
    copy: "Copy message",
    copied: "Message copied",
    copyFailed: "Copy failed. Please select and copy the message manually.",
    unavailable: "Coming soon",
    unavailableNotice:
      "Our official communication channels are being prepared.",
    telegramNotice:
      "For Telegram, copy the message and paste it into the conversation.",
    privacy:
      "No forms. No accounts. Just a conversation.",
    closing: "Still searching. Still building.",
    email: "Business Email",
    selectLanguage: "Select contact language",
    intentGroup: "Choose contact intent",
    open: "Open channel",
  },

  id: {
    section: "Mulai Proyek",
    availability: "Proyek / Kolaborasi",
    chapter: "Babak berikutnya dimulai di sini",
    headlineFirst: "Apa yang berikutnya",
    headlineSecond: "kita tentukan bersama.",
    introduction:
      "Ide membuka kemungkinan. Kemungkinan menjadi sistem. Mari membangun sesuatu yang bermakna bersama.",
    discover: "Mulai percakapan",
    gateway: "Jalur Komunikasi",
    gatewayDescription:
      "Pilih cara Anda ingin terhubung dengan Aether Lab.",
    intent: "Pilih tujuan Anda",
    channel: "Pilih jalur komunikasi",
    message: "Pesan pembuka Anda",
    copy: "Salin pesan",
    copied: "Pesan berhasil disalin",
    copyFailed: "Gagal menyalin. Silakan pilih dan salin pesan secara manual.",
    unavailable: "Segera hadir",
    unavailableNotice:
      "Jalur komunikasi resmi kami sedang dipersiapkan.",
    telegramNotice:
      "Untuk Telegram, salin pesan dan tempelkan ke dalam percakapan.",
    privacy:
      "Tanpa formulir. Tanpa akun. Langsung berdiskusi.",
    closing: "Terus mencari. Terus membangun.",
    email: "Email Bisnis",
    selectLanguage: "Pilih bahasa komunikasi",
    intentGroup: "Pilih tujuan komunikasi",
    open: "Buka jalur komunikasi",
  },
} as const;

// ==========================================
// ICON SYSTEM
// ==========================================

function IntentIcon({
  intent,
  size = 25,
}: {
  intent: ContactIntent;
  size?: number;
}) {
  const props = {
    size,
    strokeWidth: 1.4,
    "aria-hidden": true as const,
  };

  switch (intent) {
    case "project":
      return <Code2 {...props} />;

    case "collaboration":
      return <Handshake {...props} />;

    case "research":
      return <FlaskConical {...props} />;

    case "general":
      return <MessagesSquare {...props} />;
  }
}

function ChannelIcon({
  platform,
  size = 22,
}: {
  platform: ContactPlatform;
  size?: number;
}) {
  const props = {
    size,
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

    default:
      return <ArrowUpRight {...props} />;
  }
}

// ==========================================
// CHANNEL CARD
// ==========================================

function ContactChannelCard({
  channel,
  language,
  message,
  subject,
}: {
  channel: BusinessChannel;
  language: ContactLanguage;
  message: string;
  subject: string;
}) {
  const t = translations[language];

  const url = getContactUrl(
    channel,
    message,
    subject
  );

  const primary = channel.primary;

  const channelName =
    channel.platform === "email"
      ? t.email
      : channel.name;

  const content = (
    <>
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border ${
          primary && url
            ? "border-black/15 bg-black/5"
            : "border-white/10 bg-white/5"
        }`}
        style={{
          color:
            primary && url
              ? "#0B0D10"
              : channel.accent,
        }}
      >
        <ChannelIcon
          platform={channel.platform}
          size={24}
        />
      </div>

      <div className="min-w-0 flex-1">
        <span className="block font-display text-lg font-medium tracking-tight">
          {channelName}
        </span>

        <span
          className={`mt-1 block text-xs leading-5 ${
            primary && url
              ? "text-black/65"
              : "text-white/50"
          }`}
        >
          {channel.description[language]}
        </span>

        {!url && (
          <span className="mt-2 block font-mono text-[9px] uppercase tracking-wider text-white/40">
            {t.unavailable}
          </span>
        )}
      </div>

      {url && (
        <ArrowUpRight
          size={21}
          strokeWidth={1.5}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
        />
      )}
    </>
  );

  if (!url) {
    return (
      <div
        data-contact-platform={channel.platform}
        data-contact-available="false"
        className="flex min-h-28 min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-white/2.5 p-4 text-white sm:p-5"
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target={
        channel.platform === "email"
          ? undefined
          : "_blank"
      }
      rel={
        channel.platform === "email"
          ? undefined
          : "noopener noreferrer"
      }
      aria-label={`${t.open}: ${channelName}`}
      data-contact-platform={channel.platform}
      data-contact-available="true"
      className={`group flex min-h-28 min-w-0 items-center gap-4 rounded-xl border p-4 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D] sm:p-5 ${
        primary
          ? "border-[#C7FF3D] bg-[#C7FF3D] text-[#0B0D10] hover:border-white hover:bg-white"
          : "border-white/10 bg-white/2.5 text-white hover:border-[#817BFF]/40 hover:bg-white/5"
      }`}
    >
      {content}
    </a>
  );
}

// ==========================================
// HORIZON GATEWAY
// ==========================================

export default function HorizonGateway() {
  const [language, setLanguage] =
    useState<ContactLanguage>("en");

  const [activeIntent, setActiveIntent] =
    useState<ContactIntent>("project");

  const [copyStatus, setCopyStatus] =
    useState<"idle" | "copied" | "error">("idle");

  const copyTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = translations[language];

  const intent = getContactIntent(activeIntent);

  const message = intent.message[language];

  const subject = intent.subject[language];

  const channels = getContactChannels("contact");

  const primaryChannel = channels.find(
    (channel) => channel.primary
  );

  const secondaryChannels = channels.filter(
    (channel) => !channel.primary
  );

  const hasAvailableChannel = channels.some(
    (channel) => Boolean(getContactUrl(channel))
  );

  const telegramAvailable = channels.some(
    (channel) =>
      channel.platform === "telegram" &&
      Boolean(getContactUrl(channel))
  );

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  function resetCopyStatus() {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }

    setCopyStatus("idle");
  }

  function changeLanguage(next: ContactLanguage) {
    resetCopyStatus();
    setLanguage(next);
  }

  function changeIntent(next: ContactIntent) {
    resetCopyStatus();
    setActiveIntent(next);
  }

  async function copyMessage() {
    resetCopyStatus();

    try {
      await navigator.clipboard.writeText(message);

      setCopyStatus("copied");

      copyTimeoutRef.current = setTimeout(() => {
        setCopyStatus("idle");
        copyTimeoutRef.current = null;
      }, 2500);
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <section
      id="contact"
      lang={language}
      aria-labelledby="horizon-heading"
      className="relative isolate overflow-hidden bg-[#0B0D10] pb-16 pt-24 text-white md:pb-24 md:pt-32"
    >
      {/* Background atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-20 h-160 w-180 -translate-x-1/2 rounded-full bg-[#4F46FF]/5 blur-[160px]" />

        <div className="absolute -bottom-48 -right-48 h-140 w-140 rounded-full bg-[#C7FF3D]/2.5 blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      <div className="aether-container">

        {/* Section header */}

        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 md:pb-8">

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                10 / {t.section}
              </span>
            </div>

            <span className="hidden font-mono text-[9px] uppercase tracking-wider text-white/35 lg:block">
              {t.availability}
            </span>

            {/* Language switcher */}

            <div
              role="group"
              aria-label={t.selectLanguage}
              className="flex items-center rounded-lg border border-white/10 bg-white/2.5 p-1"
            >
              {(["en", "id"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={language === item}
                  onClick={() => changeLanguage(item)}
                  className={`min-h-11 min-w-11 rounded-md px-3 font-mono text-[10px] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-[#C7FF3D] ${
                    language === item
                      ? "bg-[#C7FF3D] text-[#0B0D10]"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ==================================
            THE FINAL HORIZON
        ================================== */}

        <div className="relative pt-6 md:pt-10">

          <HorizonVisual />

          <Reveal
            y={30}
            className="relative mx-auto -mt-2 max-w-6xl text-center md:-mt-10"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
              {t.chapter}
            </span>

            <h2
              id="horizon-heading"
              className="mt-7 font-display text-[clamp(2.7rem,7.2vw,8rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            >
              {t.headlineFirst}

              <span className="mt-2 block text-[#C7FF3D]">
                {t.headlineSecond}
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-white/60 md:text-base">
              {t.introduction}
            </p>

            <a
              href="#contact-gateway"
              className="group mt-9 inline-flex min-h-14 items-center justify-center gap-5 rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition-colors hover:border-[#C7FF3D]/40 hover:text-[#C7FF3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D]"
            >
              {t.discover}

              <ArrowDown
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:translate-y-1 motion-reduce:transition-none"
              />
            </a>
          </Reveal>
        </div>

        {/* ==================================
            THE PROJECT GATEWAY
        ================================== */}

        <div
          id="contact-gateway"
          className="mx-auto mt-20 max-w-6xl scroll-mt-28 md:mt-28"
        >
          <Reveal y={25}>
            <div className="mb-8 grid gap-5 border-b border-white/10 pb-7 md:grid-cols-2 md:items-end">

              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#C7FF3D]">
                  Aether / Connection
                </span>

                <h3 className="mt-4 font-display text-[clamp(1.8rem,4vw,4rem)] font-medium leading-tight tracking-[-0.055em]">
                  {t.gateway}
                </h3>
              </div>

              <p className="max-w-sm text-sm leading-7 text-white/50 md:justify-self-end">
                {t.gatewayDescription}
              </p>
            </div>
          </Reveal>

          <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#11131A] p-4 sm:p-6 lg:p-9">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-48 -top-48 -z-10 h-140 w-140 rounded-full bg-[#4F46FF]/5.5 blur-[130px]"
            />

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">

              {/* Intent selection */}

              <div className="min-w-0 lg:col-span-7">

                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#C7FF3D]">
                    01
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {t.intent}
                  </span>
                </div>

                <div
                  role="group"
                  aria-label={t.intentGroup}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {contactIntents.map((item) => {
                    const selected =
                      item.id === activeIntent;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => changeIntent(item.id)}
                        className={`group flex min-h-44 min-w-0 flex-col justify-between gap-6 rounded-xl border p-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D] ${
                          selected
                            ? "border-[#817BFF]/80 bg-[#4F46FF]/10"
                            : "border-white/10 bg-white/2.5 hover:border-white/25 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">

                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-lg border ${
                              selected
                                ? "border-[#817BFF]/25 bg-[#817BFF]/10 text-[#A5A2FF]"
                                : "border-white/10 text-white/55"
                            }`}
                          >
                            <IntentIcon intent={item.id} />
                          </span>

                          {selected ? (
                            <Check
                              size={18}
                              aria-hidden="true"
                              className="text-[#C7FF3D]"
                            />
                          ) : (
                            <span className="font-mono text-[10px] text-white/35">
                              {item.number}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="block font-display text-xl font-medium leading-tight tracking-tight">
                            {item.title[language]}
                          </span>

                          <span className="mt-2 block text-xs leading-6 text-white/50">
                            {item.description[language]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Communication channels */}

              <div className="min-w-0 border-t border-white/10 pt-7 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">

                <div className="mb-5 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#C7FF3D]">
                    02
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {t.channel}
                  </span>
                </div>

                <div className="flex flex-col gap-3">

                  {primaryChannel && (
                    <ContactChannelCard
                      channel={primaryChannel}
                      language={language}
                      message={message}
                      subject={subject}
                    />
                  )}

                  {secondaryChannels.map((channel) => (
                    <ContactChannelCard
                      key={channel.platform}
                      channel={channel}
                      language={language}
                      message={message}
                      subject={subject}
                    />
                  ))}
                </div>

                {!hasAvailableChannel && (
                  <p className="mt-4 text-xs leading-6 text-white/45">
                    {t.unavailableNotice}
                  </p>
                )}
              </div>
            </div>

            {/* ==================================
                GENERATED OPENING MESSAGE
            ================================== */}

            <div className="mt-8 border-t border-white/10 pt-7">

              <div className="rounded-xl border border-white/10 bg-[#0B0D10]/70 p-5 md:p-6">

                <div className="flex flex-wrap items-center justify-between gap-3">

                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                    {t.message}
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#A5A2FF]">
                    {intent.title[language]}
                  </span>
                </div>

                <div className="mt-5 grid items-start gap-5 md:grid-cols-[1fr_auto]">

                  <p
                    data-contact-message
                    aria-live="polite"
                    className="select-text wrap-break-word text-sm leading-7 text-white/80"
                  >
                    {message}
                  </p>

                  <button
                    type="button"
                    onClick={copyMessage}
                    className="flex min-h-11 items-center justify-center gap-3 rounded-lg border border-white/15 px-4 py-2 text-xs text-white/70 transition-colors hover:border-[#C7FF3D]/40 hover:text-[#C7FF3D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7FF3D]"
                  >
                    {copyStatus === "copied" ? (
                      <Check
                        size={16}
                        aria-hidden="true"
                        className="text-[#C7FF3D]"
                      />
                    ) : (
                      <Copy
                        size={16}
                        aria-hidden="true"
                      />
                    )}

                    {copyStatus === "copied"
                      ? t.copied
                      : t.copy}
                  </button>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className={
                    copyStatus === "error"
                      ? "mt-4 text-xs leading-6 text-[#FF9135]"
                      : "sr-only"
                  }
                >
                  {copyStatus === "error"
                    ? t.copyFailed
                    : copyStatus === "copied"
                      ? t.copied
                      : ""}
                </p>

                {telegramAvailable && (
                  <p className="mt-4 text-xs leading-6 text-white/40">
                    {t.telegramNotice}
                  </p>
                )}
              </div>

              <p className="mt-6 text-center font-mono text-[9px] uppercase leading-6 tracking-wider text-white/40">
                {t.privacy}
              </p>
            </div>
          </div>
        </div>

        {/* ==================================
            CLOSING STATEMENT
        ================================== */}

        <Reveal
          y={20}
          className="mt-20 md:mt-28"
        >
          <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center md:flex-row md:text-left">

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C7FF3D]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                {t.closing}
              </span>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
              Aether Lab / Independent Technology Studio
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
