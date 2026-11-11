"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Tilt3DCard } from "@/components/Tilt3DCard";
import { PERSONAL_INFO } from "@/data/portfolio";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.35 });
  const [repoCount, setRepoCount] = useState(shouldReduceMotion ? 5 : 0);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const smoothHeroScroll = useSpring(heroScroll, {
    stiffness: 120,
    damping: 26,
  });
  const wireframeParallaxY = useTransform(smoothHeroScroll, [0, 1], [0, 34]);
  const visualParallaxY = useTransform(smoothHeroScroll, [0, 1], [0, 44]);

  useEffect(() => {
    if (shouldReduceMotion || !metricsInView) return;
    let frame = 0;
    const start = performance.now();
    const duration = 650;
    const animate = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setRepoCount(Math.round(p * 5));
      if (p < 1) frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [metricsInView, shouldReduceMotion]);

  const introTransition = (delay: number) =>
    shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Subtle architectural line texture */}
      <div
        aria-hidden="true"
        className="editorial-grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_72%_40%,black_10%,transparent_72%)]"
      />

      {/* Video-inspired diagonal chamfered frosted wireframe lines framing the hero stage */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={shouldReduceMotion ? undefined : { y: wireframeParallaxY }}
        transition={introTransition(0.75)}
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <path
          d="M 540 0 L 710 220 L 420 560 L 210 820"
          stroke="rgba(158, 219, 255, 0.16)"
          strokeWidth="1"
        />
        <path
          d="M 1160 0 L 950 260 L 1220 590 L 1380 820"
          stroke="rgba(169, 167, 248, 0.16)"
          strokeWidth="1"
        />
        <line
          x1="360"
          y1="540"
          x2="1080"
          y2="470"
          stroke="url(#hero-beam)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient
            id="hero-beam"
            x1="360"
            y1="540"
            x2="1080"
            y2="470"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(158, 219, 255, 0)" />
            <stop offset="48%" stopColor="rgba(158, 219, 255, 0.55)" />
            <stop offset="100%" stopColor="rgba(169, 167, 248, 0)" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Rich Ambient Ice Blue + Periwinkle + Lavender radiant aurora behind hero stage */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={introTransition(0.72)}
        className="pointer-events-none absolute top-[2%] right-[-4%] h-[460px] w-[460px] rounded-full blur-3xl sm:h-[620px] sm:w-[620px] lg:right-[4%]"
        style={{
          background:
            "radial-gradient(circle, rgba(158,219,255,0.34) 0%, rgba(169,167,248,0.22) 38%, rgba(201,184,244,0.12) 58%, rgba(11,16,32,0) 76%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={introTransition(0.82)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(158,219,255,0.28)] bg-[rgba(158,219,255,0.08)] px-3.5 py-1.5 backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#9EDBFF] shadow-[0_0_10px_#9EDBFF]"
              />
              <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-[#9EDBFF] uppercase sm:text-[11px]">
                {PERSONAL_INFO.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, x: -20, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={introTransition(0.88)}
              className="text-frost-gradient font-serif text-[2.75rem] leading-[0.98] font-medium tracking-[0.02em] uppercase drop-shadow-[0_12px_32px_rgba(158,219,255,0.14)] sm:text-[3.85rem] lg:text-[4.75rem]"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={introTransition(0.95)}
              className="mt-4 max-w-[44ch] bg-gradient-to-r from-[#9EDBFF] via-[#A9A7F8] to-[#C9B8F4] bg-clip-text text-lg font-medium text-transparent sm:text-xl"
            >
              {PERSONAL_INFO.role}
            </motion.p>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={introTransition(1.02)}
              className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-[#B7C1D6] sm:text-base"
            >
              {PERSONAL_INFO.heroIntro}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={introTransition(1.09)}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#projects"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-r from-[#9EDBFF] via-[#B4E4FF] to-[#C9D2FF] px-6 text-sm font-semibold text-[#0B1020] shadow-[0_10px_30px_rgba(158,219,255,0.32),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_38px_rgba(158,219,255,0.48)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1020]"
              >
                <span>{PERSONAL_INFO.heroPrimaryCta}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={PERSONAL_INFO.discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button inline-flex min-h-[46px] items-center gap-2 rounded-full px-6 text-sm font-medium text-[#F3F6FC] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#9EDBFF] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                <MessageSquare
                  className="h-4 w-4 text-[#A9A7F8]"
                  aria-hidden="true"
                />
                <span>{PERSONAL_INFO.heroSecondaryCta}</span>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1 px-3 text-xs font-medium tracking-wide text-[#B7C1D6] transition-colors hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1 px-2 text-xs font-medium tracking-wide text-[#B7C1D6] transition-colors hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Illuminated Frosted Crystal Portal Stage */}
          <motion.div
            style={shouldReduceMotion ? undefined : { y: visualParallaxY }}
            className="lg:col-span-5"
          >
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Tilt3DCard
                  maxTilt={8}
                  className="group relative mx-auto max-w-[440px] lg:ml-auto"
                >
                  {/* Subtle orbital crystal ring halo around the hero portal */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 rounded-[32px] border border-[rgba(158,219,255,0.14)] bg-gradient-to-tr from-[#9EDBFF]/8 via-transparent to-[#C9B8F4]/10 opacity-75 blur-[1px]"
                  />

                  <div className="glass-panel relative overflow-hidden rounded-[24px] p-2 shadow-[0_24px_60px_rgba(4,8,22,0.6),0_0_40px_rgba(158,219,255,0.14)] sm:p-2.5">
                    {/* Top specular crystal edge hairline */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-10 top-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#9EDBFF]/80 to-transparent"
                    />

                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-[#0B1020]">
                      <Image
                        src={PERSONAL_INFO.heroVisual.src}
                        alt={PERSONAL_INFO.heroVisual.alt}
                        fill
                        priority
                        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 44vw, 440px"
                        className="object-cover brightness-105 contrast-105 saturate-[1.15] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      {/* Ice Blue -> Lavender atmospheric light wash integrating visual into Midnight Frost */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B1020]/70 via-[#9EDBFF]/10 to-[#C9B8F4]/20"
                      />
                    </div>

                    {/* Top-right live availability chip */}
                    <div className="glass-panel absolute top-5 right-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#8FE3CB] shadow-[0_0_8px_#8FE3CB]"
                      />
                      <span className="font-mono text-[9px] font-medium tracking-[0.16em] text-[#F3F6FC] uppercase">
                        Open to Build
                      </span>
                    </div>

                    <div className="glass-panel absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-[#9EDBFF] uppercase">
                        {PERSONAL_INFO.heroVisual.tag}
                      </span>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Unified 3-Column Frosted Glass Highlight Capsule (matching video 9.0s) */}
        <motion.div
          ref={metricsRef}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel relative mx-auto mt-16 grid max-w-[860px] grid-cols-1 divide-y divide-[rgba(211,227,255,0.16)] overflow-hidden sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-20"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#9EDBFF]/70 to-transparent"
          />
          {PERSONAL_INFO.highlights.map((item, idx) => (
            <div
              key={item.label}
              className="px-6 py-6 text-center transition-colors duration-200 hover:bg-[rgba(158,219,255,0.04)] sm:py-7"
            >
              <p className="bg-gradient-to-r from-[#9EDBFF] via-[#C3D8FF] to-[#C9B8F4] bg-clip-text font-serif text-3xl font-medium tracking-tight text-transparent tabular-nums sm:text-4xl">
                {idx === 0 ? String(repoCount).padStart(2, "0") : item.value}
              </p>
              <p className="mt-2 font-mono text-[11px] font-medium tracking-[0.14em] text-[#F3F6FC] uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-[#B7C1D6]">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
