/**
 * ============================================================================
 * THEJAS GOWDA — PORTFOLIO CONFIGURATION & VERIFIED DATA
 * ============================================================================
 * Sourced from public GitHub (https://github.com/TeJAS512-MAX), LinkedIn, and
 * Discord links provided by Thejas Gowda. Edit any field below anytime.
 * ============================================================================
 */

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export interface SocialLinkItem {
  id: string;
  label: string;
  href: string;
  handle: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/TeJAS512-MAX",
    handle: "github.com/TeJAS512-MAX",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thejas-gowda-26b202340",
    handle: "in/thejas-gowda-26b202340",
  },
  {
    id: "discord",
    label: "Discord",
    href: "https://discord.gg/tqkUzGGHS",
    handle: "discord.gg/tqkUzGGHS",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:tejasgowdahr09@gmail.com",
    handle: "tejasgowdahr09@gmail.com",
  },
];

export const PERSONAL_INFO = {
  monogram: "TG",
  name: "THEJAS GOWDA",
  displayName: "Thejas Gowda",
  introLoaderLine: "THE AI ENGINEER & CREATIVE BUILDER YOU NEED",
  eyebrow: "B.TECH CSE (AI/ML) · AMITY UNIVERSITY BENGALURU",
  role: "AI Engineer, Prompt Engineer, Web Developer & Graphic Designer",
  heroIntro:
    "3rd-year B.Tech CSE (AI/ML) student at Amity University Bengaluru. Building intelligent LLM agents, full-stack web apps, and visual design systems where solid engineering meets clean craft.",
  heroPrimaryCta: "Explore Projects",
  heroSecondaryCta: "Join Discord",
  discordInvite: "https://discord.gg/tqkUzGGHS",
  discordHandle: "honest_chipmunk_0906_84724",
  githubUrl: "https://github.com/TeJAS512-MAX",
  linkedinUrl: "https://www.linkedin.com/in/thejas-gowda-26b202340",
  email: "tejasgowdahr09@gmail.com",
  location: "Bengaluru, India · Remote Worldwide",
  availability: "Open to Internships, OSS & AI / Web / Design Collaborations",
  /** Replace with your own photo at public/images/hero-visual.jpg anytime */
  heroVisual: {
    src: "/images/hero-visual.jpg",
    alt: "Midnight Frost 3D faceted crystal prism representing Thejas Gowda's engineering and design studio",
    tag: "AI · FULL-STACK WEB · DESIGN",
  },
  /** Verified profile metrics shown in the 3-column highlight strip (matching reference video flow) */
  highlights: [
    {
      value: "05",
      label: "Public GitHub Repos",
      detail: "AI Agents · Deepfake CNN · TypeScript",
    },
    {
      value: "3rd Yr",
      label: "B.Tech CSE (AI / ML)",
      detail: "Amity University Bengaluru",
    },
    {
      value: "AI + Web",
      label: "Core Engineering Focus",
      detail: "LLM Agents · PyTorch · TypeScript",
    },
  ],
  about: {
    heading: "ABOUT THEJAS GOWDA.",
    paragraphs: [
      "I’m Thejas Gowda, a 3rd-year B.Tech Computer Science Engineering (AI/ML) student at Amity University Bengaluru.",
      "I work at the intersection of AI engineering, prompt engineering, full-stack web development, and graphic design — treating prompts like versioned code and visual design as a core part of every product.",
    ],
    tags: [
      "AI Engineering",
      "Prompt Engineering",
      "Full-Stack Web",
      "PyTorch & Vision",
      "RAG & Agents",
      "AWS Cloud",
      "Graphic Design",
    ],
    details: [
      { label: "University", value: "Amity University Bengaluru" },
      { label: "Location", value: "Bengaluru, India" },
      { label: "Open To", value: "Internships & Collabs" },
    ],
    image: {
      src: "/images/about-studio.jpg",
      alt: "Late-night AI engineering and design workspace in deep midnight navy lighting",
      caption: "Prompts are code. Design is part of the product.",
    },
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Thejas Gowda. Built with Next.js & Midnight Frost.`,
  },
} as const;

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tech: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  repoUrl?: string;
  liveUrl?: string;
}

/**
 * Six real projects & showcases sourced directly from github.com/TeJAS512-MAX
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: "food-bridge",
    number: "01",
    title: "FoodBridge",
    category: "Full-Stack Web · TypeScript",
    tech: "TypeScript · Civic Logistics UI",
    year: "2026",
    summary:
      "Real-time surplus food rescue platform built for OSCode AI Prompt Battle, matching catering surplus with community shelters inside a 38-minute EV courier window.",
    image: "/images/project-neon-horizons.jpg",
    imageAlt: "FoodBridge Midnight Frost civic delivery network visualization",
    repoUrl: "https://github.com/TeJAS512-MAX/FOOD-BRIDGE",
    liveUrl: "https://food-bridge-ruddy.vercel.app",
  },
  {
    id: "northstar-audit-agent",
    number: "02",
    title: "Northstar Audit Agent",
    category: "Autonomous AI Agent",
    tech: "Python · Gemini · Neuro-Symbolic",
    year: "2026",
    summary:
      "7-stage neuro-symbolic temporal verification agent built for HackerRank Orchestrate Hackathon (Ghost Data Still Exists) with deterministic compliance rules.",
    image: "/images/project-northstar-agent.jpg",
    imageAlt: "Northstar Audit Agent translucent 3D verification lattice",
    repoUrl: "https://github.com/TeJAS512-MAX/ai-agent-gostData_exist",
  },
  {
    id: "deepfake-detector",
    number: "03",
    title: "Deepfake Image Classifier",
    category: "Computer Vision · PyTorch",
    tech: "PyTorch · MobileNetV2 · Grad-CAM",
    year: "2026",
    summary:
      "CNN-based real vs. AI-generated face classifier using MobileNetV2 with Grad-CAM visual explainability, FastAPI inference, and MongoDB logging.",
    image: "/images/featured-work.jpg",
    imageAlt: "Deepfake Image Classifier refractive optical glass threshold study",
    repoUrl: "https://github.com/TeJAS512-MAX/deepfake-image-classifier",
  },
  {
    id: "side-agents",
    number: "04",
    title: "Side Agents Forensics App",
    category: "AI Backend & Frontend",
    tech: "FastAPI · MongoDB · PyTorch",
    year: "2026",
    summary:
      "End-to-end college forensics application pairing MobileNetV2 deepfake inference with an integrated FastAPI REST backend, MongoDB history, and web UI.",
    image: "/images/project-future-forms.jpg",
    imageAlt: "Translucent 3D refractive glass material representing AI inference pipeline",
    repoUrl: "https://github.com/TeJAS512-MAX/side-agents",
  },
  {
    id: "brand-visual-systems",
    number: "05",
    title: "Visual Identity & Branding",
    category: "Graphic & Brand Design",
    tech: "Canva · Visual Identity · Editorial Art",
    year: "2026",
    summary:
      "Posters, social media creatives, pitch decks, and visual identity systems crafted for developer projects, hackathons, and technical showcases.",
    image: "/images/project-beyond-the-frame.jpg",
    imageAlt: "Editorial print spread and optical inspection frame representing visual identity systems",
    repoUrl: "https://github.com/TeJAS512-MAX/TeJAS512-MAX",
  },
  {
    id: "prompt-eval-workbench",
    number: "06",
    title: "Prompt & RAG Architecture",
    category: "Prompt Engineering",
    tech: "LLM Evals · JSON Schemas · RAG",
    year: "2026",
    summary:
      "Structured system-prompt templates, XML grounding patterns, hallucination-reduction rubrics, and regression workflows documented in my engineering hub.",
    image: "/images/project-think-brighter.jpg",
    imageAlt: "Structured frosted paper and glass architecture representing prompt systems",
    repoUrl: "https://github.com/TeJAS512-MAX/TeJAS512-MAX",
  },
];

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  mode: string;
  scope: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "ai-engineering",
    number: "01",
    title: "AI & LLM Engineering",
    summary: "Building RAG systems, multi-step AI agents, and ML-backed APIs.",
    mode: "Internships / Projects",
    scope:
      "Retrieval pipelines, tool-calling workflows, PyTorch model inference, and FastAPI services.",
  },
  {
    id: "prompt-engineering",
    number: "02",
    title: "Prompt Engineering & Evals",
    summary:
      "Structured system prompts, JSON schema outputs, and grounding workflows.",
    mode: "Collaborations",
    scope:
      "Few-shot & chain-of-thought design, prompt versioning, regression testing",
  },
  {
    id: "web-development",
    number: "03",
    title: "Full-Stack Web Development",
    summary:
      "Responsive React, Next.js, TypeScript, and Python-backed web applications.",
    mode: "Project-based",
    scope:
      "Modern UI engineering, REST APIs, database integration, and clean Git workflows.",
  },
  {
    id: "graphic-design",
    number: "04",
    title: "Graphic & Visual Design",
    summary:
      "Event branding, posters, social media creatives, and UI-minded layouts.",
    mode: "Community / Freelance",
    scope:
      "Canva design systems, pitch decks, technical community posters, and cohesive visual identity.",
  },
];

export interface TechnicalSkillItem {
  id: string;
  title: string;
  stack: string;
  focusLabel: string;
  fillPercent: number;
}

export const TECHNICAL_SKILLS: TechnicalSkillItem[] = [
  {
    id: "ai-ml",
    title: "AI & LLM Engineering",
    stack: "RAG · LangChain · Agents · OpenAI / Claude / Gemini APIs",
    focusLabel: "Core Focus",
    fillPercent: 89,
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering",
    stack: "Structured JSON · Few-Shot · Evals · Grounding",
    focusLabel: "INTERMEDIATE",
    fillPercent: 80,
  },
  {
    id: "web-dev",
    title: "Full-Stack Web Dev",
    stack: "TypeScript · React · Next.js · Tailwind · FastAPI · Node.js",
    focusLabel: "Production",
    fillPercent: 90,
  },
  {
    id: "deep-learning",
    title: "Deep Learning & Vision",
    stack: "PyTorch · TensorFlow · scikit-learn · MobileNetV2 · Grad-CAM",
    focusLabel: "Research & Apps",
    fillPercent: 80,
  },
  {
    id: "cloud-devops",
    title: "Cloud, Data & DevOps",
    stack: "GCP · AWS · Docker · SQL · MongoDB · Git · Bash",
    focusLabel: "INTERMEDIATE",
    fillPercent: 74,
  },
  {
    id: "graphic-design",
    title: "Graphic & UI Design",
    stack: "Canva · Visual Identity · Event Branding · UI Layouts",
    focusLabel: "Visual Craft",
    fillPercent: 88,
  },
];

export interface ToolItem {
  id: string;
  name: string;
  brandColor: string;
}

export const TOOLS: ToolItem[] = [
  { id: "python", name: "Python", brandColor: "#4B8BBE" },
  { id: "typescript", name: "TypeScript", brandColor: "#3178C6" },
  { id: "react", name: "React / Next.js", brandColor: "#61DAFB" },
  { id: "pytorch", name: "PyTorch", brandColor: "#9EDBFF" },
  { id: "fastapi", name: "FastAPI", brandColor: "#8FE3CB" },
  { id: "aws", name: "AWS", brandColor: "#F4EEE8" },
  { id: "langchain", name: "LangChain", brandColor: "#A9A7F8" },
  { id: "docker", name: "Docker", brandColor: "#2496ED" },
  { id: "canva", name: "Canva", brandColor: "#00C4CC" },
];
