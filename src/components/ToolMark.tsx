export function ToolMark({ id }: { id: string }) {
  const common = {
    className: "h-5 w-5 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "python":
      return (
        <svg {...common}>
          <path d="M12 3c-3 0-3.5 1.3-3.5 3v2h5v1H7c-2 0-3.5 1.3-3.5 3.5S4.5 16 6.5 16H8v-2c0-1.6 1.2-2.8 2.8-2.8h3.4c1.3 0 2.3-1 2.3-2.3V6c0-1.7-1.2-3-4.5-3Z" />
          <path d="M12 21c3 0 3.5-1.3 3.5-3v-2h-5v-1H17c2 0 3.5-1.3 3.5-3.5S19.5 8 17.5 8H16v2c0 1.6-1.2 2.8-2.8 2.8H9.8c-1.3 0-2.3 1-2.3 2.3V18c0 1.7 1.2 3 4.5 3Z" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M7.5 10.5h4.5M9.75 10.5v6.5" />
          <path d="M16.8 11.4c-.5-.4-1.5-.5-2 .1-.4.6.1 1.2 1 1.5.9.3 1.3.8 1 1.6-.3.7-1.4.9-2.2.4" />
        </svg>
      );
    case "react":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </svg>
      );
    case "pytorch":
      return (
        <svg {...common}>
          <path d="M16.2 7.8a6 6 0 1 1-8.4 0L12 3.6" />
          <circle cx="14.8" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "fastapi":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m13 6.5-4.5 6h3.2L10.8 17.5l4.7-6h-3.2L13 6.5Z" />
        </svg>
      );
    case "aws":
      return (
        <svg {...common}>
          <path d="M6.5 14.5h11a3 3 0 0 0 .4-5.95A4.8 4.8 0 0 0 8.5 7.2 3.8 3.8 0 0 0 6.5 14.5Z" />
          <path d="M5.5 18c4 2.2 9 2.2 13 0" />
        </svg>
      );
    case "langchain":
      return (
        <svg {...common}>
          <path d="M9.5 14.5 6 18a2.8 2.8 0 0 1-4-4l3.5-3.5a2.8 2.8 0 0 1 4 0" />
          <path d="M14.5 9.5 18 6a2.8 2.8 0 0 1 4 4l-3.5 3.5a2.8 2.8 0 0 1-4 0" />
          <path d="m9 15 6-6" />
        </svg>
      );
    case "docker":
      return (
        <svg {...common}>
          <path d="M4 13h16c-.4 3.6-3 6-7.8 6C7.5 19 4.5 16.8 4 13Z" />
          <rect x="6" y="9.5" width="3" height="2.5" />
          <rect x="10" y="9.5" width="3" height="2.5" />
          <rect x="14" y="9.5" width="3" height="2.5" />
          <rect x="10" y="6" width="3" height="2.5" />
        </svg>
      );
    case "canva":
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M14.8 9.2a3.8 3.8 0 1 0 0 5.6" />
        </svg>
      );
  }
}
