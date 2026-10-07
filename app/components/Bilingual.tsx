import type { CSSProperties, ReactNode } from "react";

interface BilingualProps {
  en: ReactNode;
  hi: string;
  as: "h1" | "h2" | "h3" | "label";
  style?: CSSProperties;
  className?: string;
  /** Override the Hindi text colour — use on a pink surface, where the default pink would be unreadable. */
  hiColor?: string;
  /** Override the Hindi font size (default scales with the heading). */
  hiSize?: string;
}

export default function Bilingual({ en, hi, as, style, className, hiColor = "var(--color-pink)", hiSize = "max(1.2rem, 0.62em)" }: BilingualProps) {
  if (as === "label") {
    return (
      <span className={className ? `label ${className}` : "label"} style={style}>
        {en}
        {" · "}
        <span
          lang="hi"
          style={{
            fontFamily: "var(--font-hindi)",
            textTransform: "none",
            letterSpacing: "normal",
            color: hiColor,
          }}
        >
          {hi}
        </span>
      </span>
    );
  }

  const Tag = as;
  return (
    <Tag style={style} className={className}>
      {en}
      <span
        lang="hi"
        style={{
          display: "block",
          fontFamily: "var(--font-hindi)",
          fontWeight: 600,
          color: hiColor,
          fontSize: hiSize,
          lineHeight: 1.35,
          marginTop: "0.5rem",
        }}
      >
        {hi}
      </span>
    </Tag>
  );
}
