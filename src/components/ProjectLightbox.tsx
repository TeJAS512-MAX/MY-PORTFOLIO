"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectItem } from "@/data/portfolio";

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      prevFocus?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0B1020]/84 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-[820px] bg-[#111A33]/92 p-5 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-[#9EDBFF] uppercase">
                  {project.number} · {project.category} · {project.year}
                </p>
                <h2
                  id="lightbox-title"
                  className="mt-1 font-serif text-2xl font-medium text-[#F3F6FC] sm:text-3xl"
                >
                  {project.title}
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[rgba(211,227,255,0.2)] bg-[#0B1020]/50 text-[#F3F6FC] transition-colors hover:border-[#9EDBFF] hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden rounded-[14px] border border-[rgba(211,227,255,0.16)] bg-[#0B1020]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 860px) 92vw, 780px"
                className="object-cover"
              />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#B7C1D6]">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(211,227,255,0.12)] pt-4">
              <span className="font-mono text-xs text-[#A9A7F8]">
                {project.tech}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#8FE3CB] px-5 text-xs font-medium text-[#0B1020] hover:opacity-90"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#9EDBFF] px-5 text-xs font-medium text-[#0B1020] hover:bg-[#B8E5FF]"
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
