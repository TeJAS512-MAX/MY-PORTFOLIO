"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Tilt3DCard } from "@/components/Tilt3DCard";
import { PERSONAL_INFO } from "@/data/portfolio";

export function AboutSection() {
  const { about } = PERSONAL_INFO;
  const shouldReduceMotion = useReducedMotion();
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });
  const frameY = useTransform(smoothScroll, [0, 0.5, 1], [18, 0, -18]);
  const frameRotate = useTransform(smoothScroll, [0, 0.5, 1], [-2.5, 0, 2.5]);

  return (
    <section
      ref={aboutRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden border-t border-[rgba(211,227,255,0.08)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 h-[440px] w-[520px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(158,219,255,0.14) 0%, rgba(201,184,244,0.1) 45%, rgba(11,16,32,0) 76%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Heading + Frosted Glass Bio & Skill Pills Card (matching video 20.5s-23.0s) */}
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="WHO I AM"
              heading={about.heading}
              id="about-heading"
            />

            <div className="glass-panel mt-7 p-6 sm:p-8">
              <div className="max-w-[56ch] space-y-4 text-[0.98rem] leading-relaxed text-[#B7C1D6] sm:text-base">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-[#9EDBFF] uppercase">
                Core Disciplines & Focus
              </p>

              <ul
                aria-label="Core disciplines"
                className="mt-3 flex flex-wrap gap-2"
              >
                {about.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[rgba(158,219,255,0.22)] bg-[rgba(158,219,255,0.06)] px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-[#F3F6FC] transition-colors duration-200 hover:border-[#9EDBFF]/60 hover:bg-[rgba(158,219,255,0.14)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <dl className="mt-7 grid grid-cols-1 gap-4 border-t border-[rgba(211,227,255,0.12)] pt-5 sm:grid-cols-3">
                {about.details.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-[#9EDBFF]/85 uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#F3F6FC]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Right: Suspended 3D Tilted Framed Visual with Top Luminous Pin (matching video 20.5s-23.0s) */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { y: frameY, rotate: frameRotate }
              }
            >
              <Tilt3DCard
                restingRotateY={-6}
                maxTilt={9}
                className="group relative mx-auto max-w-[420px] lg:ml-auto lg:-rotate-2 lg:transition-transform lg:duration-500 lg:hover:rotate-0"
              >
              {/* Luminous top suspension pin */}
              <span
                aria-hidden="true"
                className="absolute -top-1.5 left-1/2 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[#F3F6FC]/60 bg-[#9EDBFF] shadow-[0_0_14px_rgba(158,219,255,0.9)]"
              />

              <figure className="glass-panel relative p-2.5 sm:p-3">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#111A33]">
                  <Image
                    src={about.image.src}
                    alt={about.image.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 420px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1020]/55 via-transparent to-transparent"
                  />
                </div>

                <figcaption className="glass-panel mt-3 rounded-[12px] px-4 py-2.5 sm:absolute sm:right-5 sm:bottom-5 sm:left-5 sm:mt-0">
                  <p className="font-serif text-sm italic text-[#F3F6FC]">
                    “{about.image.caption}”
                  </p>
                </figcaption>
              </figure>
              </Tilt3DCard>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
