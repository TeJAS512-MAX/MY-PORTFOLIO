"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(triggerRef, { once: false, amount: 0.06 });
  const [fromAbove, setFromAbove] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || isInView || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setFromAbove(rect.bottom < window.innerHeight * 0.45);
  }, [isInView, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={triggerRef} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: fromAbove ? -20 : 20 }
        }
        transition={{
          duration: 0.48,
          delay: isInView ? delay : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
