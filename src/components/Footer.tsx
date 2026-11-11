"use client";

import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolio";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-[rgba(211,227,255,0.1)] bg-[#0B1020]/90 py-8 backdrop-blur-sm sm:py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-5 px-5 sm:px-8 md:flex-row md:items-center lg:px-10">
        <div className="space-y-1">
          <p className="font-serif text-sm font-medium tracking-wide text-[#F3F6FC]">
            {PERSONAL_INFO.name}
          </p>
          <p className="text-xs text-[#B7C1D6]/75">
            {PERSONAL_INFO.footer.copyright}
          </p>
        </div>

        <ul
          aria-label="Footer social links"
          className="flex flex-wrap items-center gap-x-5 gap-y-1"
        >
          {SOCIAL_LINKS.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target={social.id === "email" ? undefined : "_blank"}
                rel={social.id === "email" ? undefined : "noopener noreferrer"}
                className="inline-flex min-h-[40px] items-center text-xs text-[#B7C1D6] transition-colors hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={scrollToTop}
          className="glass-button group inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 text-xs font-medium text-[#F3F6FC] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#9EDBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EDBFF]"
        >
          <span>Back to top</span>
          <ArrowUp
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </footer>
  );
}
