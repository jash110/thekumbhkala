"use client";

import { useEffect, useState } from "react";

interface PlaceholderImageProps {
  label: string;
  aspectRatio?: string;
  aspect?: string;
  fill?: boolean;
  rounded?: boolean;
  className?: string;
  tone?: "cream" | "maroon";
  mediaType?: "image" | "video";
}

export default function PlaceholderImage({
  label,
  aspectRatio = "4 / 5",
  aspect,
  fill = false,
  rounded = true,
  className = "",
  tone = "cream",
  mediaType = "image",
}: PlaceholderImageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isMaroon = tone === "maroon";
  const isVideo = mediaType === "video";
  const displayLabel = isVideo ? label.replace(/^\[Photo:/, "[Video:") : label;
  const resolvedAspect = aspect ?? aspectRatio;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...(fill
          ? { width: "100%", height: "100%" }
          : { aspectRatio: resolvedAspect, width: "100%" }),
        borderRadius: rounded ? "14px" : 0,
        overflow: "hidden",
        border: `1.5px dashed ${
          isMaroon ? "rgba(240,232,220,0.35)" : "rgba(26,26,26,0.22)"
        }`,
        background: isMaroon
          ? "linear-gradient(145deg, rgba(240,232,220,0.08), rgba(240,232,220,0.03))"
          : "linear-gradient(145deg, #e8ddc8, var(--color-cream))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          transform: mounted ? "scale(1)" : "scale(1.04)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isVideo && (
          <div
            style={{
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              border: `1.5px solid ${isMaroon ? "rgba(240,232,220,0.5)" : "rgba(26,26,26,0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "0.55rem solid transparent",
                borderBottom: "0.55rem solid transparent",
                borderLeft: `0.85rem solid ${isMaroon ? "rgba(240,232,220,0.6)" : "rgba(26,26,26,0.35)"}`,
                marginLeft: "0.2rem",
              }}
            />
          </div>
        )}
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            letterSpacing: "0.03em",
            color: isMaroon ? "rgba(240,232,220,0.55)" : "var(--color-muted)",
            lineHeight: 1.5,
            maxWidth: "26ch",
          }}
        >
          {displayLabel}
        </span>
      </div>
    </div>
  );
}
