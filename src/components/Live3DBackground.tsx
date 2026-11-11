"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  speedY: number;
  speedZ: number;
  alpha: number;
  color: string;
}

interface AmbientOrb {
  baseX: number;
  baseY: number;
  radius: number;
  speedX: number;
  speedY: number;
  phase: number;
  color: string;
  alpha: number;
}

const PALETTE = [
  "158, 219, 255", // Ice Blue #9EDBFF
  "169, 167, 248", // Soft Periwinkle #A9A7F8
  "201, 184, 244", // Muted Lavender #C9B8F4
  "244, 238, 232", // Warm Pearl #F4EEE8
];

const OCTAHEDRON_VERTICES: [number, number, number][] = [
  [0, 1.35, 0],
  [1, 0, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, 0, -1],
  [0, -1.35, 0],
  [0.58, 0.58, 0.58],
  [-0.58, 0.58, 0.58],
  [-0.58, 0.58, -0.58],
  [0.58, 0.58, -0.58],
  [0.58, -0.58, 0.58],
  [-0.58, -0.58, 0.58],
  [-0.58, -0.58, -0.58],
  [0.58, -0.58, -0.58],
];

const OCTAHEDRON_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 1],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 6],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 10],
  [6, 10],
  [7, 11],
  [8, 12],
  [9, 13],
];

/**
 * Real-time 3D perspective depth particle field, drifting bokeh orbs that
 * refract behind frosted-glass panels, subtle pointer halo, and Hero 3D prism.
 */
export function Live3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = width < 768 ? 64 : 125;
    const particles: Particle3D[] = Array.from({ length: count }, (_, i) => ({
      x: ((i * 197.3) % 2400) - 1200,
      y: ((i * 313.7) % 1800) - 900,
      z: ((i * 89.1) % 950) + 80,
      baseSize: 1.35 + (i % 5) * 0.85,
      speedY: 0.16 + (i % 4) * 0.07,
      speedZ: 0.28 + (i % 3) * 0.14,
      alpha: 0.32 + (i % 6) * 0.08,
      color: PALETTE[i % PALETTE.length],
    }));

    const orbs: AmbientOrb[] = [
      {
        baseX: 0.18,
        baseY: 0.24,
        radius: 360,
        speedX: 0.24,
        speedY: 0.18,
        phase: 0.4,
        color: "158, 219, 255",
        alpha: 0.17,
      },
      {
        baseX: 0.78,
        baseY: 0.36,
        radius: 420,
        speedX: 0.19,
        speedY: 0.22,
        phase: 2.1,
        color: "169, 167, 248",
        alpha: 0.16,
      },
      {
        baseX: 0.48,
        baseY: 0.74,
        radius: 340,
        speedX: 0.26,
        speedY: 0.15,
        phase: 4.2,
        color: "201, 184, 244",
        alpha: 0.14,
      },
      {
        baseX: 0.86,
        baseY: 0.82,
        radius: 260,
        speedX: 0.21,
        speedY: 0.19,
        phase: 1.3,
        color: "143, 227, 203",
        alpha: 0.09,
      },
    ];

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let cursorPxX = width * 0.5;
    let cursorPxY = height * 0.5;
    let pointerActive = false;
    let scrollOffset = window.scrollY;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / Math.max(width, 1) - 0.5) * 2;
      targetMouseY = (e.clientY / Math.max(height, 1) - 0.5) * 2;
      cursorPxX = e.clientX;
      cursorPxY = e.clientY;
      pointerActive = true;
    };

    const onScroll = () => {
      scrollOffset = window.scrollY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    let frameId = 0;
    let angle = 0.4;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // 0. Drifting luminous Midnight Frost ambient spheres behind glass panels
      for (const orb of orbs) {
        const ox =
          width * orb.baseX + Math.sin(angle * orb.speedX + orb.phase) * 90;
        const oy =
          height * orb.baseY + Math.cos(angle * orb.speedY + orb.phase) * 70;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${orb.color}, ${orb.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle luminous cursor spotlight behind cards
      if (pointerActive && width >= 768) {
        const halo = ctx.createRadialGradient(
          cursorPxX,
          cursorPxY,
          0,
          cursorPxX,
          cursorPxY,
          220
        );
        halo.addColorStop(0, "rgba(158, 219, 255, 0.12)");
        halo.addColorStop(0.55, "rgba(169, 167, 248, 0.045)");
        halo.addColorStop(1, "rgba(11, 16, 32, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cursorPxX, cursorPxY, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      const fov = 420;
      const cx = width * 0.5;
      const cy = height * 0.5;

      // 1. Rotating 3D crystal prism + orbital halo behind Hero stage
      const heroFade = Math.max(0, 1 - scrollOffset / (height * 0.95));
      if (heroFade > 0.02) {
        const prismCenterX = width >= 1024 ? width * 0.72 : width * 0.5;
        const prismCenterY = width >= 1024 ? height * 0.46 : height * 0.65;
        const prismScale = width >= 1024 ? 230 : 138;

        const rotY = angle * 0.65 + mouseX * 0.35;
        const rotX = 0.38 + Math.sin(angle * 0.4) * 0.18 - mouseY * 0.28;

        const projected = OCTAHEDRON_VERTICES.map(([vx, vy, vz]) => {
          const x1 = vx * Math.cos(rotY) - vz * Math.sin(rotY);
          const z1 = vx * Math.sin(rotY) + vz * Math.cos(rotY);
          const y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = vy * Math.sin(rotX) + z1 * Math.cos(rotX);

          const scale = 3.2 / (3.2 + z2 * 0.45);
          return {
            px: prismCenterX + x1 * prismScale * scale,
            py: prismCenterY + y2 * prismScale * scale,
            depth: z2,
          };
        });

        const mobilePrismDim = width < 1024 ? 0.42 : 1;
        ctx.save();
        ctx.lineWidth = 1.35;
        for (const [a, b] of OCTAHEDRON_EDGES) {
          const v1 = projected[a];
          const v2 = projected[b];
          const avgDepth = (v1.depth + v2.depth) * 0.5;
          const edgeAlpha =
            Math.max(0.14, Math.min(0.46, 0.32 - avgDepth * 0.09)) *
            heroFade *
            mobilePrismDim;
          ctx.strokeStyle =
            a < 6
              ? `rgba(158, 219, 255, ${edgeAlpha})`
              : `rgba(201, 184, 244, ${edgeAlpha * 0.85})`;
          ctx.beginPath();
          ctx.moveTo(v1.px, v1.py);
          ctx.lineTo(v2.px, v2.py);
          ctx.stroke();
        }

        // Outer crystalline orbital ring framing the 3D stage
        ctx.strokeStyle = `rgba(158, 219, 255, ${0.18 * heroFade * mobilePrismDim})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(
          prismCenterX,
          prismCenterY,
          prismScale * 1.18,
          prismScale * 0.52,
          -0.28 + Math.sin(angle * 0.3) * 0.08,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        for (let i = 0; i < 6; i++) {
          const v = projected[i];
          ctx.fillStyle = `rgba(243, 246, 252, ${0.65 * heroFade * mobilePrismDim})`;
          ctx.beginPath();
          ctx.arc(v.px, v.py, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 2. 3D depth particles & out-of-focus bokeh motes
      for (const p of particles) {
        if (!shouldReduceMotion) {
          p.y -= p.speedY;
          p.z -= p.speedZ;
          if (p.y < -900) p.y = 900;
          if (p.z < 60) {
            p.z = 1020;
            p.y = ((p.y + 400) % 1800) - 900;
          }
        }

        const parallaxY = ((scrollOffset * 0.25) % 1800) - 900;
        const shiftedX = p.x - mouseX * (550 / p.z) * 28;
        const shiftedY =
          ((p.y - parallaxY * (160 / p.z) + 2700) % 1800) -
          900 -
          mouseY * (450 / p.z) * 22;

        const scale = fov / (fov + p.z);
        const sx = cx + shiftedX * scale;
        const sy = cy + shiftedY * scale;

        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) {
          continue;
        }

        const radius = p.baseSize * scale * 2.2;
        const depthAlpha = p.alpha * Math.min(1, scale * 1.45);

        if (radius > 2.2) {
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 3.2);
          grad.addColorStop(0, `rgba(${p.color}, ${depthAlpha * 0.85})`);
          grad.addColorStop(0.45, `rgba(${p.color}, ${depthAlpha * 0.22})`);
          grad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${p.color}, ${depthAlpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.8, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!shouldReduceMotion) {
        angle += 0.0055;
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-95"
    />
  );
}
