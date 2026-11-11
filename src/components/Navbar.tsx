"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.id);

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 24);

      if (scrollY < 160) {
        setActiveId("");
        return;
      }

      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveId("contact");
        return;
      }

      const triggerLine = window.innerHeight * 0.38;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerLine) {
          current = id;
        }
      }

      setActiveId(current);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={shouldReduceMotion ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.5, delay: 0.82, ease: [0.22, 1, 0.36, 1] }
        }
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[rgba(211,227,255,0.16)] bg-[rgba(11,16,32,0.72)] shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-md md:backdrop-blur-[18px]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-18 max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* Left: Logo / Name */}
          <a
            href="#hero"
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(211,227,255,0.22)] bg-[rgba(218,231,255,0.08)] font-mono text-[11px] font-medium tracking-wider text-[#9EDBFF] transition-colors group-hover:border-[#9EDBFF]/60">
              {PERSONAL_INFO.monogram}
            </span>
            <span className="font-sans text-sm font-medium tracking-tight text-[#F3F6FC]">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Center: Navigation Links */}
          <nav
            aria-label="Primary navigation"
            onMouseLeave={() => setHoveredId(null)}
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              const isHovered = hoveredId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHoveredId(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-flex min-h-[44px] items-center px-3.5 text-[13px] font-medium tracking-[0.02em] transition-colors focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] ${
                    isActive
                      ? "text-[#F3F6FC]"
                      : "text-[#B7C1D6] hover:text-[#9EDBFF]"
                  }`}
                >
                  {isHovered && !shouldReduceMotion && (
                    <motion.span
                      layoutId="nav-hover-glass"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-1 inset-y-1.5 -z-10 rounded-full border border-[rgba(211,227,255,0.16)] bg-[rgba(158,219,255,0.08)]"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 32 }
                      }
                      className="absolute right-3.5 bottom-2 left-3.5 h-[1.5px] rounded-full bg-[#9EDBFF]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Frosted Glass CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="glass-button hidden min-h-[42px] items-center gap-2 rounded-full px-5 text-xs font-medium tracking-wide text-[#F3F6FC] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#9EDBFF] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] sm:inline-flex"
            >
              <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
                {!shouldReduceMotion && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8FE3CB]/75 opacity-75" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8FE3CB]" />
              </span>
              <span>Let’s Talk</span>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-overlay"
              aria-label="Open navigation menu"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[rgba(211,227,255,0.18)] bg-[rgba(218,231,255,0.08)] text-[#F3F6FC] transition-colors hover:border-[#9EDBFF]/60 hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[75] flex flex-col justify-between bg-[#0B1020]/96 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(211,227,255,0.22)] bg-[rgba(218,231,255,0.08)] font-mono text-[11px] text-[#9EDBFF]">
                  {PERSONAL_INFO.monogram}
                </span>
                <span className="text-sm font-medium text-[#F3F6FC]">
                  {PERSONAL_INFO.name}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[rgba(211,227,255,0.18)] bg-[rgba(218,231,255,0.08)] text-[#F3F6FC] hover:border-[#9EDBFF]/60 hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile menu links" className="my-auto py-8">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeId === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex min-h-[52px] items-baseline justify-between border-b border-[rgba(211,227,255,0.1)] py-3 font-serif text-3xl tracking-[0.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF] ${
                          isActive
                            ? "text-[#9EDBFF]"
                            : "text-[#F3F6FC] hover:text-[#9EDBFF]"
                        }`}
                      >
                        <span>{link.label}</span>
                        <span className="font-mono text-xs text-[#B7C1D6]/70">
                          0{index + 1}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-4 border-t border-[rgba(211,227,255,0.12)] pt-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-[#8FE3CB]"
                  />
                  <span className="text-xs text-[#B7C1D6]">
                    {PERSONAL_INFO.availability}
                  </span>
                </div>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-[44px] items-center rounded-full bg-[#9EDBFF] px-5 text-xs font-medium text-[#0B1020] hover:bg-[#B8E5FF]"
                >
                  Let’s Talk
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.id === "email" ? undefined : "_blank"}
                    rel={
                      social.id === "email" ? undefined : "noopener noreferrer"
                    }
                    className="inline-flex min-h-[44px] items-center text-xs text-[#B7C1D6] hover:text-[#9EDBFF]"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
