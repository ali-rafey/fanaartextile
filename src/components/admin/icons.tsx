/** Inline icon set for the admin nav — stroked, rounded, Pinterest-plain. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export type IconName = "grid" | "play" | "layers" | "book" | "chat";

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg {...base} className={className}>
      {name === "grid" && (
        <>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </>
      )}
      {name === "play" && (
        <>
          <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
          <path d="M10 9.2v5.6l4.6-2.8L10 9.2Z" />
        </>
      )}
      {name === "layers" && (
        <>
          <path d="M12 3 3 7.6l9 4.6 9-4.6L12 3Z" />
          <path d="m3 12.4 9 4.6 9-4.6" />
          <path d="m3 16.9 9 4.6 9-4.6" />
        </>
      )}
      {name === "book" && (
        <>
          <path d="M12 6.5C10.5 5.2 8.5 4.7 6 4.9c-.6 0-1 .5-1 1.1v10.4c0 .6.5 1.1 1.1 1 2.3-.2 4.2.3 5.9 1.6 1.7-1.3 3.6-1.8 5.9-1.6.6 0 1.1-.4 1.1-1V6c0-.6-.4-1.1-1-1.1-2.5-.2-4.5.3-6 1.6Z" />
          <path d="M12 6.5V19" />
        </>
      )}
      {name === "chat" && (
        <path d="M20.5 11.4c0 3.9-3.8 7-8.5 7-1 0-2-.1-2.9-.4l-5 1.6 1.7-4.2a6.6 6.6 0 0 1-2.3-4.9c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7Z" />
      )}
    </svg>
  );
}
