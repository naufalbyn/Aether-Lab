import Reveal from "@/components/ui/Reveal";
import {
  ArrowUpRight,
  Blocks,
  Code2,
  Cpu,
  FlaskConical,
} from "lucide-react";

const focusAreas = [
  {
    number: "01",
    label: "Software Development",
    icon: Code2,
  },
  {
    number: "02",
    label: "Web3 & Blockchain",
    icon: Blocks,
  },
  {
    number: "03",
    label: "AI & Automation",
    icon: Cpu,
  },
  {
    number: "04",
    label: "Experimental Technology",
    icon: FlaskConical,
  },
];

export default function Founder() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-aether-cloud py-32 md:py-44"
    >
      {/* Ambient Orbital System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-72 top-1/2 hidden h-160 w-160 -translate-y-1/2 rounded-full border border-black/5 md:block"
      >
        <div className="absolute inset-[16%] rounded-full border border-black/3" />

        <div className="absolute inset-[32%] rounded-full border border-black/2" />

        <div className="absolute inset-[49%] rounded-full border border-black/2" />

        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-aether-blue" />

        <span className="absolute bottom-[17%] left-[16%] h-1.5 w-1.5 rounded-full bg-aether-lime" />
      </div>

      {/* Technical Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-0 top-[24%] h-px w-[15vw] bg-black/5" />

        <div className="absolute right-0 top-[74%] h-px w-[13vw] bg-black/5" />

        <div className="absolute left-[6%] top-[11%] font-mono text-[8px] tracking-[0.2em] text-black/15">
          AETHER / 09
        </div>

        <div className="absolute bottom-[10%] right-[6%] font-mono text-[8px] tracking-[0.18em] text-black/15">
          PROFILE / FOUNDER
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="border-b border-black/10 pb-6 md:pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-aether-blue/40" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-aether-blue" />
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/40">
                  09 / Founder
                </span>
              </div>

              <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-black/25 md:block">
                The person behind the studio
              </span>
            </div>
          </div>
        </Reveal>

        {/* Founder Profile */}
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-6">
          {/* Identity Panel */}
          <Reveal className="md:col-span-5" y={35}>
            <div className="relative flex min-h-115 flex-col justify-between overflow-hidden bg-aether-black p-7 text-white md:min-h-145 md:p-9">
              {/* Background Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[42px_42px]" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white/5" />
              </div>

              {/* Orbital Mark */}
              <div className="absolute left-1/2 top-[47%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 md:h-90 md:w-90">
                <div className="absolute inset-0 rounded-full border border-white/10" />

                <div className="absolute inset-[16%] rounded-full border border-white/7" />

                <div className="absolute inset-[33%] rounded-full border border-white/5" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-white/5" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white/5" />

                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aether-blue shadow-[0_0_24px_rgba(79,70,255,0.7)]" />

                <span className="absolute bottom-[16%] right-[16%] h-2 w-2 rounded-full bg-aether-lime shadow-[0_0_24px_rgba(199,255,61,0.5)]" />

                <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.035]">
                  <span className="font-display text-4xl font-semibold tracking-[-0.08em] text-white">
                    NA
                  </span>
                </div>
              </div>

              {/* Top Metadata */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Founder Identity
                </span>

                <span className="font-mono text-[8px] tracking-[0.14em] text-white/20">
                  AETHER / 001
                </span>
              </div>

              {/* Bottom Identity */}
              <div className="relative z-10 border-t border-white/10 pt-6">
                <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  Independent Builder
                </div>

                <div className="mt-3 font-display text-3xl font-medium tracking-[-0.055em] md:text-4xl">
                  Naufal Aufaa
                  <br />
                  Abyan.
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-aether-lime" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
                    Founder / Aether Lab
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Founder Information */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal y={30}>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-aether-blue" />

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/35">
                  About The Founder
                </span>
              </div>

              <h2 className="mt-7 font-display text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.9] tracking-[-0.065em]">
                Curiosity
                <br />
                <span className="text-black/25">into creation.</span>
              </h2>

              <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-black/50 md:mt-10 md:text-base md:leading-8">
                <p>
                  I&apos;m Naufal, a technology enthusiast and independent
                  builder with an interest in turning ideas into useful
                  digital systems.
                </p>

                <p>
                  Currently studying Informatics Engineering at Universitas
                  Dinamika Bangsa, while exploring software development,
                  blockchain, AI, and emerging technologies through projects
                  and experiments.
                </p>

                <p>
                  Beyond building, I&apos;m also involved in the Web3 community
                  through UNAMA Blockchain Club, learning and collaborating
                  with other people who share an interest in technology.
                </p>
              </div>
            </Reveal>

            {/* Education & Community */}
            <Reveal
              className="mt-10 grid gap-6 border-t border-black/10 pt-7 sm:grid-cols-2"
              delay={0.12}
              y={25}
            >
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/30">
                  Education
                </span>

                <div className="mt-3 font-display text-lg font-medium tracking-tight text-black/80">
                  Informatics Engineering
                </div>

                <p className="mt-1 text-xs leading-5 text-black/40">
                  Universitas Dinamika Bangsa
                </p>
              </div>

              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/30">
                  Community
                </span>

                <div className="mt-3 font-display text-lg font-medium tracking-tight text-black/80">
                  UNAMA Blockchain Club
                </div>

                <p className="mt-1 text-xs leading-5 text-black/40">
                  Vice President
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Focus Areas */}
        <Reveal
          className="mt-24 border-t border-black/10 pt-8 md:mt-32"
          delay={0.15}
          y={25}
        >
          <div className="grid gap-8 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">
                Areas of Interest
              </span>

              <p className="mt-3 max-w-48 text-xs leading-6 text-black/40">
                The fields shaping what I explore and build.
              </p>
            </div>

            <div className="md:col-span-9">
              <div className="grid grid-cols-1 border-l border-t border-black/10 sm:grid-cols-2">
                {focusAreas.map((area) => {
                  const Icon = area.icon;

                  return (
                    <div
                      key={area.number}
                      className="group flex items-center justify-between border-b border-r border-black/10 p-5 transition-colors duration-300 hover:bg-white md:p-6"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[8px] tracking-[0.14em] text-black/25">
                          {area.number}
                        </span>

                        <div>
                          <div className="font-display text-base font-medium tracking-tight text-black/75 transition-colors duration-300 group-hover:text-black md:text-lg">
                            {area.label}
                          </div>
                        </div>
                      </div>

                      <Icon
                        size={17}
                        strokeWidth={1.35}
                        className="text-black/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-aether-blue"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing Statement */}
        <Reveal
          className="mt-20 border-t border-black/10 pt-8 md:mt-28"
          delay={0.25}
          y={25}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-black/30">
                Personal Direction
              </span>

              <p className="mt-4 font-display text-[clamp(2rem,4vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em]">
                Learn something.
                <br />
                <span className="text-black/25">Build something.</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-black/30">
                Connect / Collaborate
              </span>

              <ArrowUpRight
                size={15}
                strokeWidth={1.4}
                className="text-aether-blue"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}