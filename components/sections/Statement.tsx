import Reveal from "@/components/ui/Reveal";

export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-aether-black py-32 text-white md:py-48">
      {/* Ambient Orbital System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-130 w-130 -translate-y-1/2 rounded-full border border-white/5 md:-right-60 md:h-180 md:w-180"
      >
        <div className="absolute inset-[14%] rounded-full border border-white/[0.035]" />

        <div className="absolute inset-[29%] rounded-full border border-white/2.5" />

        <span className="absolute left-1/2 -top-0.75 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[14%] left-[12%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-[24%] h-px w-[18vw] bg-white/6" />

        <div className="absolute right-0 top-[68%] h-px w-[14vw] bg-white/6" />

        <div className="absolute left-[6%] top-[16%] font-mono text-[8px] tracking-[0.2em] text-white/20">
          AETHER / 02
        </div>

        <div className="absolute right-[7%] bottom-[14%] font-mono text-[8px] tracking-[0.18em] text-white/20">
          SYSTEM / STATEMENT
        </div>
      </div>

      <div className="aether-container relative z-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-6">
          {/* Section Label */}
          <Reveal className="md:col-span-3" y={24}>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-lime/40" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-aether-lime" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                02 / Statement
              </span>
            </div>

            <div className="mt-8 hidden max-w-32 font-mono text-[8px] uppercase leading-5 tracking-[0.16em] text-white/20 md:block">
              Ideas become
              <br />
              systems.
              <br />
              Systems become
              <br />
              experience.
            </div>
          </Reveal>

          {/* Main Statement */}
          <Reveal className="md:col-span-8 md:col-start-5" delay={0.12} y={50}>
            <div className="relative">
              <div className="mb-7 flex items-center gap-3 md:mb-10">
                <span className="h-px w-10 bg-aether-blue md:w-16" />

                <span className="font-mono text-[8px] tracking-[0.18em] text-white/25">
                  BUILD / EXPLORE / REPEAT
                </span>
              </div>

              <h2 className="font-display text-[clamp(2.8rem,6.3vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                Technology should be
                <span className="text-aether-blue"> built,</span>
                <br />
                not just discussed.
              </h2>

              <div className="mt-8 h-px w-full bg-white/8 md:mt-12" />
            </div>
          </Reveal>

          {/* Description */}
          <Reveal className="md:col-span-5 md:col-start-5" delay={0.2} y={30}>
            <div className="flex gap-5">
              <span className="mt-2 font-mono text-[8px] tracking-[0.16em] text-aether-lime/70">
                01
              </span>

              <p className="max-w-lg text-sm leading-7 text-white/45 md:text-base md:leading-8">
                Aether Lab is an independent technology studio exploring ideas
                through real software, blockchain systems, AI, and experimental
                digital products.
              </p>
            </div>
          </Reveal>

          {/* Philosophy Metadata */}
          <Reveal
            className="md:col-span-3 md:col-start-10 md:self-end"
            delay={0.28}
            y={24}
          >
            <div className="border-l border-white/10 pl-5">
              <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                Current Direction
              </div>

              <div className="mt-3 font-display text-lg tracking-[-0.02em] text-white/80">
                Still searching.
              </div>

              <div className="font-display text-lg tracking-[-0.02em] text-white/80">
                Still building.
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom System Rail */}
        <Reveal
          className="mt-20 border-t border-white/8 pt-5 md:mt-28"
          delay={0.3}
          y={20}
        >
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] text-white/20">
                MODE
              </div>

              <div className="mt-2 font-mono text-[9px] tracking-[0.12em] text-white/50">
                EXPLORATION
              </div>
            </div>

            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] text-white/20">
                FOCUS
              </div>

              <div className="mt-2 font-mono text-[9px] tracking-[0.12em] text-white/50">
                DIGITAL SYSTEMS
              </div>
            </div>

            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] text-white/20">
                APPROACH
              </div>

              <div className="mt-2 font-mono text-[9px] tracking-[0.12em] text-white/50">
                BUILD / TEST
              </div>
            </div>

            <div>
              <div className="font-mono text-[8px] tracking-[0.16em] text-white/20">
                STATUS
              </div>

              <div className="mt-2 flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-aether-lime" />
                ACTIVE
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
