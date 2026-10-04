import type { CSSProperties, ReactNode } from "react";

interface SplitSectionProps {
  imageSide: "left" | "right";
  image: ReactNode;
  children: ReactNode;
  imageAspect?: string;
  fullHeight?: boolean;
  minHeight?: string;
  mobileImageHeight?: string;
  background?: string;
  className?: string;
  style?: CSSProperties;
  breakpoint?: number;
  imageWidthPercent?: number;
}

export default function SplitSection({
  imageSide,
  image,
  children,
  imageAspect = "4 / 5",
  fullHeight = false,
  minHeight,
  mobileImageHeight = "62svh",
  background,
  className = "",
  style,
  breakpoint = 768,
  imageWidthPercent = 58,
}: SplitSectionProps) {
  const isRight = imageSide === "right";

  return (
    <section
      className={`split-section ${isRight ? "split-image-right" : "split-image-left"} ${className}`}
      style={
        {
          background,
          "--split-min-height": minHeight,
          "--split-mobile-image-height": mobileImageHeight,
          ...style,
        } as CSSProperties
      }
    >
      <div className={`split-image-col ${fullHeight ? "split-image-full" : ""}`} style={!fullHeight ? { aspectRatio: imageAspect } : undefined}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>{image}</div>
      </div>

      <div className="split-text-col">
        <div className="split-text-inner">{children}</div>
      </div>

      <style>{`
        .split-section {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .split-image-col {
          width: 100%;
          flex-shrink: 0;
        }
        .split-image-full {
          height: var(--split-mobile-image-height, 62svh);
        }
        .split-text-col {
          width: 100%;
          padding: clamp(40px, 8vw, 72px) var(--page-gutter, clamp(20px, 5vw, 88px));
        }
        .split-text-inner {
          max-width: 560px;
          text-align: left;
        }

        @media (min-width: ${breakpoint}px) {
          .split-section {
            flex-direction: row;
            align-items: stretch;
            min-height: var(--split-min-height, auto);
          }
          .split-image-right {
            flex-direction: row-reverse;
          }
          .split-image-col {
            width: ${imageWidthPercent}%;
          }
          .split-image-full {
            height: auto;
          }
          .split-text-col {
            width: ${100 - imageWidthPercent}%;
            display: flex;
            align-items: center;
            padding: clamp(40px, 6vw, 80px) var(--page-gutter, clamp(20px, 5vw, 88px));
          }
        }
      `}</style>
    </section>
  );
}
