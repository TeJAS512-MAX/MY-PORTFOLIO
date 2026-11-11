"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SERVICES } from "@/data/portfolio";

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden border-t border-[rgba(211,227,255,0.08)] py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(169,167,248,0.14) 0%, rgba(158,219,255,0.1) 48%, rgba(11,16,32,0) 76%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="WHAT I WORK ON"
            heading="SERVICES & COLLABORATION."
            id="services-heading"
          />
        </Reveal>

        {/* Narrower Centered Frosted Service Rows (matching video 25.5s) */}
        <div className="mx-auto mt-10 max-w-[840px] space-y-3 lg:mt-12">
          {SERVICES.map((service, idx) => {
            const isOpen = expandedId === service.id;
            return (
              <Reveal key={service.id} delay={idx * 0.055}>
                <div
                  className={`glass-panel overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-[#9EDBFF]/50 bg-[rgba(218,231,255,0.12)]"
                      : "hover:border-[#9EDBFF]/35 hover:bg-[rgba(218,231,255,0.1)]"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`service-btn-${service.id}`}
                      aria-expanded={isOpen}
                      aria-controls={`service-panel-${service.id}`}
                      onClick={() => toggleRow(service.id)}
                      className="group flex w-full flex-col justify-between gap-3 px-5 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9EDBFF] sm:flex-row sm:items-center sm:px-6 sm:py-5"
                    >
                      <div className="flex items-start gap-3.5 sm:items-center">
                        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(211,227,255,0.2)] bg-[#0B1020]/50 font-mono text-[11px] text-[#9EDBFF]">
                          {service.number}
                        </span>
                        <div>
                          <span className="block font-serif text-lg font-medium text-[#F3F6FC] transition-colors group-hover:text-[#9EDBFF] sm:text-xl">
                            {service.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-[#B7C1D6]">
                            {service.summary}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pl-10 sm:justify-end sm:pl-0">
                        <span className="rounded-full border border-[rgba(201,184,244,0.28)] bg-[rgba(169,167,248,0.1)] px-3 py-1 font-mono text-[11px] whitespace-nowrap text-[#C9B8F4]">
                          {service.mode}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(211,227,255,0.22)] text-[#B7C1D6] transition-all duration-300 group-hover:border-[#9EDBFF] group-hover:text-[#9EDBFF] ${
                            isOpen
                              ? "rotate-45 border-[#9EDBFF] text-[#9EDBFF]"
                              : ""
                          }`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-panel-${service.id}`}
                        role="region"
                        aria-labelledby={`service-btn-${service.id}`}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col justify-between gap-4 border-t border-[rgba(211,227,255,0.12)] px-5 pt-4 pb-5 sm:flex-row sm:items-center sm:px-6">
                          <p className="max-w-[54ch] text-sm leading-relaxed text-[#B7C1D6]">
                            {service.scope}
                          </p>
                          <a
                            href="#contact"
                            className="glass-button inline-flex min-h-[42px] shrink-0 items-center gap-1.5 self-start rounded-full px-5 text-xs font-medium text-[#F3F6FC] hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
                          >
                            <span>Collaborate</span>
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
