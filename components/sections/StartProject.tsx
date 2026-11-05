import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

export default function StartProject() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-aether-black py-32 text-white md:py-48"
    >
      {/* Background Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[80px_80px]" />

        {/* Ambient Glow */}
        <div className="absolute -right-40 top-1/2 h-120 w-120 -translate-y-1/2 rounded-full bg-aether-blue/10 blur-[120px]" />

        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-aether-lime/5 blur-[110px]" />

        {/* Orbital Rings */}
        <div className="absolute -right-64 top-1/2 hidden h-160 w-160 -translate-y-1/2 rounded-full border border-white/5 md:block">
          <div className="absolute inset-[18%] rounded-full border border-white/5" />

          <div className="absolute inset-[36%] rounded-full border border-white/5" />

          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-aether-blue shadow-[0_0_20px_rgba(79,70,255,0.8)]" />

          <span className="absolute bottom-[18%] left-[18%] h-2 w-2 rounded-full bg-aether-lime shadow-[0_0_20px_rgba(199,255,61,0.6)]" />
        </div>

        {/* Technical Lines */}
        <div className="absolute left-0 top-[22%] h-px w-[12vw] bg-white/10" />

        <div className="absolute bottom-[20%] right-0 h-px w-[12vw] bg-white/10" />

        <div className="absolute left-[6%] top-[11%] font-mono text-[8px] tracking-[0.2em] text-white/15">
          AETHER / 10
        </div>

        <div className="absolute bottom-[9%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-white/15">
          INITIATE / CONNECTION
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="flex items-center justify-between border-b border-white/10 pb-6 md:pb-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-lime/40" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-aether-lime" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                10 / Start Project
              </span>
            </div>

            <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 md:block">
              Open for ideas / Collaboration
            </span>
          </div>
        </Reveal>

        {/* Main CTA */}
        <div className="relative mt-20 md:mt-32">
          <Reveal y={40}>
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-aether-lime md:w-20" />

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                Every idea starts somewhere
              </span>
            </div>

            <h2 className="max-w-6xl font-display text-[clamp(3.5rem,9.5vw,9rem)] font-medium leading-[0.82] tracking-[-0.075em]">
              Have an idea?
              <br />
              <span className="text-white/25">Let&apos;s explore</span>
              <br />
              <span className="text-aether-blue">what&apos;s next.</span>
            </h2>
          </Reveal>

          {/* Supporting Content */}
          <div className="mt-12 grid gap-10 border-t border-white/10 pt-8 md:mt-16 md:grid-cols-12 md:gap-6">
            <Reveal className="md:col-span-5" delay={0.1} y={25}>
              <p className="max-w-md text-sm leading-7 text-white/45 md:text-base md:leading-8">
                Have a project in mind, an interesting problem to solve, or
                simply want to exchange ideas? Let&apos;s start a conversation
                and see where it leads.
              </p>
            </Reveal>

            <Reveal
              className="flex flex-col gap-5 md:col-span-4 md:col-start-9"
              delay={0.2}
              y={25}
            >
              <a
                href="https://t.me/naufalbyn"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between bg-aether-lime px-6 py-5 text-aether-black transition-colors duration-300 hover:bg-white"
              >
                <span className="font-display text-base font-semibold tracking-tight">
                  Start a conversation
                </span>

                <ArrowUpRight
                  size={20}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                  Direct Contact
                </span>

                <span className="font-mono text-[9px] text-white/55">
                  Telegram / @naufalbyn
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Statement */}
        <Reveal className="mt-28 md:mt-40" delay={0.25} y={25}>
          <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-7 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10">
                <MoveUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="text-aether-lime"
                />
              </div>

              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
                No fixed destination. Just possibilities.
              </span>
            </div>

            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
              Aether Lab / Let&apos;s build something meaningful.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}