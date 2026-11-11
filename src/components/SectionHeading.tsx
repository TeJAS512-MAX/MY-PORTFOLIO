interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
  accentBar?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  id,
  align = "left",
  accentBar = false,
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const hasTrailingDot = heading.endsWith(".");
  const stem = hasTrailingDot ? heading.slice(0, -1) : heading;

  return (
    <div className={`${isCentered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <div className={`mb-3.5 flex ${isCentered ? "justify-center" : ""}`}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(158,219,255,0.24)] bg-[rgba(158,219,255,0.07)] px-3.5 py-1 font-mono text-[10px] font-medium tracking-[0.18em] text-[#9EDBFF] uppercase backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#9EDBFF] shadow-[0_0_8px_#9EDBFF]"
            />
            <span>{eyebrow}</span>
          </p>
        </div>
      )}
      <h2
        id={id}
        className="font-serif text-[2.1rem] leading-[1.06] font-medium tracking-[0.04em] uppercase sm:text-[2.75rem] lg:text-[3.25rem]"
      >
        <span className="text-frost-gradient">{stem}</span>
        {hasTrailingDot && <span className="text-[#9EDBFF]">.</span>}
      </h2>
      {accentBar && (
        <span
          aria-hidden="true"
          className={`mt-4 block h-[2px] w-12 rounded-full bg-gradient-to-r from-[#9EDBFF] via-[#A9A7F8] to-[#C9B8F4] shadow-[0_0_14px_rgba(158,219,255,0.75)] ${
            isCentered ? "mx-auto" : ""
          }`}
        />
      )}
      {intro && (
        <p
          className={`mt-4 max-w-[54ch] text-base leading-relaxed text-[#B7C1D6] ${
            isCentered ? "mx-auto" : ""
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
