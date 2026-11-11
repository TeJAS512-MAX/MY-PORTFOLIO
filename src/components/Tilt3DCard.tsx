"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  restingRotateY?: number;
  maxTilt?: number;
}

export function Tilt3DCard({
  children,
  className = "",
  restingRotateY = 0,
  maxTilt = 8,
}: Tilt3DCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(restingRotateY);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);

  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 24 });
  const sheen = useMotionTemplate`radial-gradient(360px circle at ${sheenX}% ${sheenY}%, rgba(158, 219, 255, 0.14), transparent 65%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rawRotateX.set((0.5 - py) * maxTilt * 2);
    rawRotateY.set((px - 0.5) * maxTilt * 2);
    sheenX.set(px * 100);
    sheenY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(restingRotateY);
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective: "1100px" }} className={className}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </motion.div>
    </div>
  );
}
