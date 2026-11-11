"use client";

import { useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { FilmGrain } from "@/components/FilmGrain";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { IntroCurtain } from "@/components/IntroCurtain";
import { Live3DBackground } from "@/components/Live3DBackground";
import { Navbar } from "@/components/Navbar";
import { ProjectLightbox } from "@/components/ProjectLightbox";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ServicesSection } from "@/components/ServicesSection";
import { SkillsSection } from "@/components/SkillsSection";
import type { ProjectItem } from "@/data/portfolio";

export function PortfolioApp() {
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-[#F3F6FC]">
      <IntroCurtain />
      <Live3DBackground />
      <ScrollProgress />
      <FilmGrain />
      <Navbar />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ProjectsSection onPreviewProject={setPreviewProject} />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />

      <ProjectLightbox
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </div>
  );
}
