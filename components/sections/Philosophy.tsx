import Reveal from "@/components/ui/Reveal";

const principles = [
  {
    number: "01",
    title: "Question first.",
    description:
      "Every build starts with a question. What can be improved, changed, connected, or understood differently?",
  },
  {
    number: "02",
    title: "Build to learn.",
    description:
      "Ideas become clearer when they exist as something real. Prototypes turn assumptions into things we can test.",
  },
  {
    number: "03",
    title: "Keep moving.",
    description:
      "Technology never stays still. Neither should the way we think, build, and explore what comes next.",
  },
];

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-aether-black py-32 text-white md:py-48"
    >
      {/* Ambient Orbital System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-72 top-1/2 hidden h-160 w-160 -translate-y-1/2 rounded-full border border-white/5 md:block"
      >
        <div className="absolute inset-[16%] rounded-full border border-white/3" />

        <div className="absolute inset-[32%] rounded-full border border-white/2" />

        <div className="absolute inset-[49%] rounded-full border border-white/2" />

        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[17%] right-[16%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-0 top-[25%] h-px w-[16vw] bg-white/5" />

        <div className="absolute right-0 top-[70%] h-px w-[13vw] bg-white/5" />

        <div className="absolute left-[6%] top-[11%] font-mono text-[8px] tracking-[0.2em] text-white/15">
          AETHER / 08
        </div>

        <div className="absolute bottom-[10%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-white/15">
          SYSTEM / PHILOSOPHY
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="border-b border-white/10 pb-6 md:pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-lime/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-aether-lime" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                  08 / Philosophy
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-white/20 md:block">
                How we think / build / explore
              </span>
            </div>
          </div>
        </Reveal>

        {/* Main Philosophy */}
        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-6">
          {/* Label */}
          <Reveal className="md:col-span-3" y={25}>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-aether-blue" />

              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Core Principle
                </div>

                <div className="mt-4 max-w-28 font-mono text-[8px] uppercase leading-5 tracking-[0.14em] text-white/15">
                  Direction is
                  <br />
                  discovered
                  <br />
                  through motion.
                </div>
              </div>
            </div>
          </Reveal>

          {/* Statement */}
          <Reveal
            className="md:col-span-8 md:col-start-5"
            delay={0.12}
            y={45}
          >
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-12 bg-aether-lime md:w-20" />

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
                  STILL / SEARCHING / BUILDING
                </span>
              </div>

              <h2 className="font-display text-[clamp(3.2rem,7.5vw,7.5rem)] font-medium leading-[0.82] tracking-[-0.07em]">
                Still
                <br />
                <span className="text-white/25">searching.</span>
                <br />
                Still
                <br />
                <span className="text-aether-blue">building.</span>
              </h2>

              <div className="mt-10 max-w-xl border-t border-white/10 pt-7 md:mt-14 md:pt-8">
                <p className="text-sm leading-7 text-white/45 md:text-base md:leading-8">
                  Aether Lab does not begin with all the answers. It begins
                  with curiosity, turns questions into experiments, and uses
                  the process of building to discover what comes next.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Principles */}
        <div className="mt-24 border-t border-white/10 md:mt-32">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.number}
              delay={index * 0.08}
              y={30}
            >
              <article className="group relative border-b border-white/10 py-8 md:py-10">
                <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-6">
                  {/* Number */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-[9px] tracking-[0.16em] text-white/25 transition-colors duration-300 group-hover:text-aether-lime">
                      {principle.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-5">
                    <h3 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-medium leading-none tracking-[-0.055em] text-white/85 transition-colors duration-300 group-hover:text-white">
                      {principle.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5 md:col-start-8">
                    <p className="max-w-lg text-sm leading-7 text-white/35 transition-colors duration-300 group-hover:text-white/55">
                      {principle.description}
                    </p>
                  </div>
                </div>

                {/* Accent */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-aether-lime transition-all duration-500 group-hover:w-full" />
              </article>
            </Reveal>
          ))}
        </div>

        {/* Closing System */}
        <Reveal
          className="mt-20 md:mt-28"
          delay={0.3}
          y={25}
        >
          <div className="grid gap-8 border-t border-white/10 pt-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
                Aether / Direction
              </span>
            </div>

            <div className="md:col-span-7">
              <p className="font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-medium leading-[0.95] tracking-tighter">
                We do not need to know exactly where we are going.
                <span className="text-white/25">
                  {" "}
                  We need to keep building toward it.
                </span>
              </p>
            </div>

            <div className="flex items-end md:col-span-2 md:justify-end">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aether-lime" />

                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
                  Moving
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}