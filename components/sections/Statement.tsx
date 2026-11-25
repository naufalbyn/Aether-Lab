
import Image from "next/image";
import { ArrowDownRight, Plus } from "lucide-react";

import AmbientBackground from "@/components/effects/AmbientBackground";

const principles = [
  {
    number: "01",
    title: "Explore.",
    description: "Question what already exists.",
  },
  {
    number: "02",
    title: "Build.",
    description: "Turn ideas into working systems.",
  },
  {
    number: "03",
    title: "Evolve.",
    description: "Learn, refine, and keep moving.",
  },
];

export default function Statement() {
  return (
    <section
      id="statement"
      aria-labelledby="statement-title"
      className="relative isolate overflow-hidden bg-[#0B0D10] py-24 text-white md:py-36 lg:py-44"
    >
      {/* Background System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,#0B0D10_15%,#1D1D28_65%,#1A0A0F_100%)]"
      />

      <AmbientBackground
        variant="dark"
        intensity={0.8}
        animated
        grid
        className="-z-10"
      />

      {/* Decorative Orbital System */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-20 -z-10 h-162.5 w-162.5 opacity-50 md:-right-40 md:h-212.5 md:w-212.5 lg:-right-24"
      >
        <div
          data-motion-parallax="80"
          className="relative h-full w-full"
        >
          <div className="absolute inset-[8%] rounded-full border border-white/10" />

          <div className="absolute inset-[18%] rounded-full border border-white/10" />

          <div className="absolute inset-[30%] rounded-full border border-[#4F46FF]/30" />

          <div className="absolute inset-[42%] rounded-full border border-white/15" />

          <div className="absolute inset-[18%] rotate-[-35deg] rounded-[50%] border border-[#1EC1CB]/20 scale-y-[0.45]" />

          <div className="absolute inset-[18%] rotate-35 rounded-[50%] border border-white/15 scale-y-[0.45]" />

          <div className="absolute inset-[25%] rounded-full bg-[#4F46FF]/10 blur-[100px]" />

          <div className="absolute left-1/2 top-[8%] h-2 w-2 -translate-x-1/2 rounded-full bg-[#C7FF3D] shadow-[0_0_20px_#C7FF3D]" />

          <div className="absolute right-[18%] top-1/2 h-2 w-2 rounded-full bg-[#1EC1CB] shadow-[0_0_20px_#1EC1CB]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/aether-mark.svg"
              alt=""
              width={160}
              height={160}
              className="h-24 w-24 object-contain brightness-0 invert opacity-20 md:h-40 md:w-40"
            />
          </div>

          <div className="absolute inset-x-[4%] top-1/2 h-px bg-white/5" />

          <div className="absolute inset-y-[4%] left-1/2 w-px bg-white/5" />
        </div>
      </div>

      <div className="aether-container relative z-10">
        {/* Section Header */}
        <div
          data-motion="fade"
          className="flex items-center justify-between border-b border-white/15 pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#C7FF3D] shadow-[0_0_12px_rgba(199,255,61,0.5)]" />

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
              02 / Studio Statement
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
              Aether Lab
            </span>

            <Plus
              size={16}
              strokeWidth={1}
              className="text-white/40"
            />
          </div>
        </div>

        {/* Main Editorial Content */}
        <div className="grid grid-cols-1 gap-12 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          {/* Editorial Sidebar */}
          <div
            data-motion="up"
            data-motion-distance="24"
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C7FF3D]" />

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C7FF3D]">
                Our Perspective
              </span>
            </div>

            <p className="mt-6 max-w-55 text-sm leading-7 text-white/55">
              Curiosity is the starting point.
              Building is how we move forward.
            </p>

            <ArrowDownRight
              size={36}
              strokeWidth={1}
              className="mt-10 hidden text-white/25 lg:block"
            />
          </div>

          {/* Main Statement */}
          <div className="lg:col-span-9">
            <h2
              id="statement-title"
              className="font-display text-[clamp(2.8rem,6.8vw,7.5rem)] font-medium leading-[0.98] tracking-[-0.065em]"
            >
              <span
                data-motion="up"
                data-motion-distance="50"
                className="block"
              >
                Technology
              </span>

              <span
                data-motion="up"
                data-motion-distance="50"
                data-motion-delay="0.08"
                className="block"
              >
                should be{" "}
                <span className="text-[#C7FF3D]">
                  built.
                </span>
              </span>

              <span
                data-motion="up"
                data-motion-distance="50"
                data-motion-delay="0.16"
                className="mt-2 block text-white/65"
              >
                Not just
              </span>

              <span
                data-motion="up"
                data-motion-distance="50"
                data-motion-delay="0.24"
                className="block text-white/65"
              >
                discussed.
              </span>
            </h2>

            {/* Description */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/15 pt-8 md:grid-cols-2 lg:mt-16">
              <p
                data-motion="up"
                data-motion-distance="24"
                className="max-w-lg text-base leading-8 text-white/65 md:text-lg md:leading-9"
              >
                Aether Lab is an independent
                technology studio exploring the
                intersection of software,
                blockchain, artificial intelligence,
                and experimental digital systems.
              </p>

              <div
                data-motion="up"
                data-motion-distance="24"
                data-motion-delay="0.12"
                className="flex flex-col justify-end md:items-end"
              >
                <div className="border-l border-[#C7FF3D]/50 pl-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    The Aether Philosophy
                  </span>

                  <p className="mt-4 font-display text-xl leading-snug tracking-[-0.03em] text-white md:text-2xl">
                    Still searching.
                    <br />
                    Still building.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Principles */}
        <div
          data-motion-stagger="0.12"
          className="mt-20 grid grid-cols-1 border-y border-white/15 md:mt-28 md:grid-cols-3"
        >
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              data-motion-item
              className={[
                "group relative py-8 md:px-8 md:py-10",
                index === 0 ? "md:pl-0" : "",
                index === principles.length - 1
                  ? ""
                  : "border-b border-white/15 md:border-b-0 md:border-r",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#C7FF3D]/80">
                  / {principle.number}
                </span>

                <ArrowDownRight
                  size={18}
                  strokeWidth={1.2}
                  className="text-white/35 transition-colors duration-300 group-hover:text-[#C7FF3D]"
                />
              </div>

              <h3 className="mt-8 font-display text-3xl tracking-tighter text-white md:text-4xl">
                {principle.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Signature */}
        <div
          data-motion="fade"
          className="mt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
            Independent Technology Studio
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
            Explore / Build / Evolve
          </span>
        </div>
      </div>
    </section>
  );
}
