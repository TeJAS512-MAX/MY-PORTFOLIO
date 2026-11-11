"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolio";

/**
 * Frame-accurate entry choreography matching the reference video:
 * - Immediate First-Paint visibility of both "00" and centered tagline (no blank SSR flash)
 * - 0.00s - 0.54s: Smooth "00 -> 100" counter + ice-blue hairline seam growth
 * - 0.56s - 1.05s: Tagline blur-dissolve + top/bottom curtains split apart to reveal Hero
 */
export function IntroCurtain() {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "splitting" | "done">("counting");

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase("done");
      return;
    }

    const start = performance.now();
    const countDuration = 520;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / countDuration);
      const eased = 1 - Math.pow(1 - progress, 2.1);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };
    rafId = window.requestAnimationFrame(tick);

    const splitTimer = window.setTimeout(() => {
      setPhase("splitting");
    }, 560);

    const doneTimer = window.setTimeout(() => {
      setPhase("done");
    }, 1100);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(splitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion || phase === "done") {
    return null;
  }

  const isSplitting = phase === "splitting";
  const formattedCount = String(count).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    >
      {/* Top Split Curtain Half */}
      <motion.div
        initial={false}
        animate={isSplitting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0B1020]"
      >
        <div className="p-6 sm:p-10">
          <span className="font-sans text-4xl font-semibold tracking-tight text-[#F3F6FC] tabular-nums sm:text-6xl">
            {formattedCount}
          </span>
        </div>

        {/* Glowing horizontal ice-blue aperture seam along split edge */}
        <motion.div
          initial={false}
          animate={
            isSplitting
              ? { scaleX: 1, opacity: [0.6, 1, 0] }
              : { scaleX: Math.max(0.08, count / 100), opacity: 0.55 }
          }
          transition={{ duration: isSplitting ? 0.34 : 0.08, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 h-[1.5px] origin-center bg-gradient-to-r from-transparent via-[#9EDBFF] to-transparent shadow-[0_0_22px_rgba(158,219,255,0.75)]"
        />
      </motion.div>

      {/* Bottom Split Curtain Half */}
      <motion.div
        initial={false}
        animate={isSplitting ? { y: "100%" } : { y: "0%" }}
        transition={{ duration: 0.46, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-center bg-[#0B1020] pb-12"
      >
        <motion.span
          initial={false}
          animate={isSplitting ? { opacity: 0, scale: 0.5 } : { opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="h-1.5 w-1.5 rounded-full bg-[#9EDBFF] shadow-[0_0_12px_#9EDBFF]"
        />
      </motion.div>

      {/* Center Tagline — immediately visible at first paint, dissolves cleanly on split */}
      <motion.div
        initial={false}
        animate={
          isSplitting
            ? {
                opacity: 0,
                scaleX: 1.14,
                filter: "blur(6px)",
              }
            : { opacity: 1, scaleX: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 flex h-full items-center justify-center px-6 text-center"
      >
        <div className="max-w-[34ch] bg-[#0B1020] px-5 py-2">
          <p className="font-mono text-[11px] font-medium tracking-[0.26em] text-[#F3F6FC] uppercase sm:text-xs">
            {PERSONAL_INFO.introLoaderLine}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
