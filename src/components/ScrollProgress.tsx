"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#9EDBFF] via-[#A9A7F8] to-[#C9B8F4]"
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
