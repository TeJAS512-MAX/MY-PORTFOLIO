"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolMark } from "@/components/ToolMark";
import { TECHNICAL_SKILLS, TOOLS } from "@/data/portfolio";

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const arsenalRef = useRef<HTMLUListElement>(null);
  const arsenalInView = useInView(arsenalRef, { once: false, amount: 0.15 });
  const [arsenalFromAbove, setArsenalFromAbove] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || arsenalInView || !arsenalRef.current) return;
    const rect = arsenalRef.current.getBoundingClientRect();
    setArsenalFromAbove(rect.bottom < window.innerHeight * 0.45);
  }, [arsenalInView, shouldReduceMotion]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden border-t border-[rgba(211,227,255,0.08)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[440px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(158,219,255,0.13) 0%, rgba(201,184,244,0.11) 48%, rgba(11,16,32,0) 76%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Part 1: Centered TECHNICAL SKILLS (matching video 28.0s-30.0s) */}
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="CAPABILITIES & DISCIPLINES"
            heading="TECHNICAL SKILLS."
            id="skills-heading"
          />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[880px] grid-cols-1 gap-4 md:grid-cols-2 lg:mt-12">
          {TECHNICAL_SKILLS.map((skill, idx) => (
            <Reveal key={skill.id} delay={Math.min(idx * 0.04, 0.2)}>
              <div className="glass-panel p-5 transition-colors duration-300 hover:border-[#9EDBFF]/45 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg font-medium text-[#F3F6FC]">
                    {skill.title}
                  </h3>
                  <span className="shrink-0 rounded-full border border-[rgba(158,219,255,0.3)] bg-[rgba(158,219,255,0.1)] px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#9EDBFF] uppercase">
                    {skill.focusLabel}
                  </span>
                </div>

                <p className="mt-1.5 text-xs text-[#B7C1D6]">{skill.stack}</p>

                <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-[rgba(218,231,255,0.08)]">
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { width: `${skill.fillPercent}%` }
                        : { width: 0 }
                    }
                    whileInView={{ width: `${skill.fillPercent}%` }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.08 + idx * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#9EDBFF] via-[#A9A7F8] to-[#C9B8F4] shadow-[0_0_12px_rgba(158,219,255,0.45)]"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Part 2: Centered MY ARSENAL Square Frosted Icon Tiles (matching video 30.0s & 41.0s) */}
        <Reveal delay={0.12}>
          <div className="mt-16 border-t border-[rgba(211,227,255,0.1)] pt-14">
            <SectionHeading
              align="center"
              eyebrow="SOFTWARE & STACK"
              heading="MY ARSENAL."
            />

            <ul
              ref={arsenalRef}
              aria-label="Tools and software"
              className="mx-auto mt-9 flex max-w-[980px] flex-wrap justify-center gap-3.5"
            >
              {TOOLS.map((tool, index) => (
                <motion.li
                  key={tool.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 18, scale: 0.88 }
                  }
                  animate={
                    shouldReduceMotion || arsenalInView
                      ? { opacity: 1, y: 0, scale: 1 }
                      : {
                          opacity: 0,
                          y: arsenalFromAbove ? -18 : 18,
                          scale: 0.88,
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : arsenalInView
                        ? {
                            type: "spring",
                            stiffness: 160,
                            damping: 20,
                            delay: Math.abs(index - 4) * 0.045,
                          }
                        : { duration: 0.2 }
                  }
                >
                  <div
                    tabIndex={0}
                    style={{ "--tool-color": tool.brandColor } as CSSProperties}
                    className="group glass-panel relative flex h-[88px] w-[88px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[18px] p-2 text-[#B7C1D6] transition-all duration-200 hover:-translate-y-1.5 hover:border-[#9EDBFF]/70 hover:text-[#F3F6FC] hover:shadow-[0_16px_36px_rgba(4,8,22,0.6),0_0_20px_rgba(158,219,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] sm:h-[92px] sm:w-[92px]"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-2 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-[var(--tool-color)] opacity-10 blur-md transition-opacity duration-200 group-hover:opacity-35"
                    />
                    <span className="relative transition-all duration-200 group-hover:scale-110 group-hover:text-[var(--tool-color)] group-focus-visible:text-[var(--tool-color)]">
                      <ToolMark id={tool.id} />
                    </span>
                    <span className="text-center font-mono text-[10px] leading-tight tracking-wide text-[#F3F6FC]/90">
                      {tool.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 bottom-1.5 left-3 h-[2px] rounded-full bg-[var(--tool-color)] opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80"
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
