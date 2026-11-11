"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Tilt3DCard } from "@/components/Tilt3DCard";
import { PERSONAL_INFO, PROJECTS, type ProjectItem } from "@/data/portfolio";

interface ProjectsSectionProps {
  onPreviewProject: (project: ProjectItem) => void;
}

interface ProjectCardItemProps {
  project: ProjectItem;
  index: number;
  shouldReduceMotion: boolean;
  onPreviewProject: (project: ProjectItem) => void;
}

function ProjectCardItem({
  project,
  index,
  shouldReduceMotion,
  onPreviewProject,
}: ProjectCardItemProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cellRef, { once: false, amount: 0.08 });
  const [fromAbove, setFromAbove] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || isInView || !cellRef.current) return;
    const rect = cellRef.current.getBoundingClientRect();
    setFromAbove(rect.bottom < window.innerHeight * 0.45);
  }, [isInView, shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: cellRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.5,
  });

  const col = (index % 3) - 1; // -1 (left), 0 (center), +1 (right)
  const row = Math.floor(index / 3); // 0 or 1

  // Symmetric center-vs-wing scroll depth parallax while traversing the viewport
  const depthY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    col === 0 ? [12, 0, -12] : [-10, 0, 10]
  );
  const scrollRotateX = useTransform(smoothProgress, [0, 0.5, 1], [3.5, 0, -3.5]);

  // Reverse row stagger when scrolling back up so the leading row always blooms first
  const rowOrder = fromAbove ? 1 - row : row;
  const entryDelay = rowOrder * 0.075 + Math.abs(col) * 0.06;

  return (
    <div
      ref={cellRef}
      style={{ perspective: "1500px" }}
      className="h-full"
    >
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : {
                y: depthY,
                rotateX: scrollRotateX,
                transformStyle: "preserve-3d",
              }
        }
        className="h-full"
      >
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -col * 82,
                  y: 48,
                  rotateY: col * -34,
                  rotateX: 18,
                  scale: 0.58,
                }
          }
          animate={
            shouldReduceMotion || isInView
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1,
                }
              : {
                  opacity: 0,
                  x: -col * 82,
                  y: fromAbove ? -48 : 48,
                  rotateY: col * -34,
                  rotateX: fromAbove ? -18 : 18,
                  scale: 0.58,
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : isInView
                ? {
                    type: "spring",
                    stiffness: 102,
                    damping: 17,
                    delay: entryDelay,
                  }
                : { duration: 0.24, ease: "easeOut" }
          }
          style={{ transformStyle: "preserve-3d" }}
          className="h-full"
        >
          <Tilt3DCard maxTilt={6} className="group h-full">
            <div className="glass-panel relative flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#9EDBFF]/70 group-hover:shadow-[0_24px_56px_rgba(4,8,22,0.65),0_0_32px_rgba(158,219,255,0.22)]">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 z-20 h-[1px] bg-gradient-to-r from-transparent via-[#9EDBFF]/65 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* Specular frosted crystal light sweep on scroll reveal (both directions) */}
              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-160%", opacity: 0 }}
                  animate={
                    isInView
                      ? { x: "180%", opacity: [0, 0.85, 0] }
                      : { x: "-160%", opacity: 0 }
                  }
                  transition={
                    isInView
                      ? {
                          duration: 0.95,
                          delay: entryDelay + 0.16,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      : { duration: 0 }
                  }
                  className="pointer-events-none absolute inset-y-0 z-20 w-1/2 -skew-x-12"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(158,219,255,0.16) 50%, transparent 100%)",
                  }}
                />
              )}

              <button
                type="button"
                onClick={() => onPreviewProject(project)}
                aria-label={`Preview ${project.title} (${project.category})`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1020] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9EDBFF]"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 400px"
                  className="object-cover brightness-105 contrast-105 saturate-[1.14] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1020]/70 via-transparent to-transparent"
                />
                <span className="absolute top-3.5 left-3.5 rounded-full border border-[rgba(211,227,255,0.22)] bg-[#0B1020]/75 px-2.5 py-0.5 font-mono text-[10px] text-[#9EDBFF] backdrop-blur-md">
                  {project.number}
                </span>
              </button>

              {/* Compact Card Footer (matching video 15.8s-18.0s crisp tile rhythm) */}
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate font-mono text-[10px] tracking-[0.08em] text-[#9EDBFF]/85 uppercase">
                    {project.category}
                  </p>
                  <h3 className="mt-1 truncate font-serif text-lg font-medium text-[#F3F6FC] transition-colors group-hover:text-[#9EDBFF]">
                    {project.title}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live deployment for ${project.title}`}
                      className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-[#8FE3CB]/35 bg-[#8FE3CB]/10 px-2.5 text-[11px] font-medium text-[#8FE3CB] transition-colors hover:bg-[#8FE3CB]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FE3CB]"
                    >
                      <span>Live</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repository for ${project.title}`}
                      className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-[rgba(211,227,255,0.2)] px-2.5 text-[11px] text-[#F3F6FC] transition-colors hover:border-[#9EDBFF] hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
                    >
                      <span>Code</span>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection({ onPreviewProject }: ProjectsSectionProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative overflow-hidden border-t border-[rgba(211,227,255,0.08)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 h-[420px] w-[880px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(158,219,255,0.16) 0%, rgba(169,167,248,0.12) 45%, rgba(11,16,32,0) 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* Centered Header + Frosted GitHub Pill (matching video 11.5s) */}
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="SELECTED REPOSITORIES & VISUAL WORK"
            heading="PROJECTS."
            id="projects-heading"
          />

          <div className="mt-6 flex justify-center">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button inline-flex min-h-[42px] items-center gap-2 rounded-full px-5 text-xs font-medium tracking-wide text-[#F3F6FC] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
            >
              <span>View Repositories on GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Curved 3D Ribbon Arc <-> 3x2 Gallery Grid Unfold (identical style on Scroll Down & Scroll Up) */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {PROJECTS.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
              onPreviewProject={onPreviewProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
