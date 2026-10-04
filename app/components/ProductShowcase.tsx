"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Bilingual from "./Bilingual";
import type { ProductShot } from "../lib/data";

export default function ProductShowcase({ shots }: { shots: ProductShot[] }) {
  const [paused, setPaused] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const [bleed, setBleed] = useState<{ marginLeft: number; width: number } | null>(null);
  const duration = Math.max(20, (shots.length / 3) * 35);
  const trackItems = [...shots, ...shots];

  useEffect(() => {
    const measure = () => {
      const el = stripRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const currentMarginLeft = parseFloat(getComputedStyle(el).marginLeft) || 0;
      setBleed({ marginLeft: currentMarginLeft - rect.left, width: document.documentElement.clientWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="product-showcase">
      <div className="product-showcase-heading">
        <Bilingual as="label" en="Inside the Kit" hi="किट के अंदर" />
        <Bilingual
          as="h2"
          en="Every piece, up close."
          hi="हर वस्तु, करीब से।"
          style={{ margin: "1.1rem 0 1rem" }}
        />
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-muted)" }}>
          The pieces that arrive in your hamper, each made for this Kumbh.
        </p>
      </div>

      <div
        ref={stripRef}
        className="product-strip"
        style={bleed ? { marginLeft: bleed.marginLeft, width: bleed.width } : undefined}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onTouchCancel={() => setPaused(false)}
      >
        <div
          className="product-strip-track"
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {trackItems.map((shot, i) => {
            const isDuplicate = i >= shots.length;
            const ratio = shot.width && shot.height ? `${shot.width} / ${shot.height}` : "1 / 1";
            return (
              <figure
                className="product-strip-item"
                key={`${shot.label}-${i}`}
                aria-hidden={isDuplicate}
                style={{ aspectRatio: ratio }}
              >
                {shot.src ? (
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    width={shot.width ?? 400}
                    height={shot.height ?? 400}
                  />
                ) : (
                  <div className="product-strip-placeholder">[Photo: {shot.label}]</div>
                )}
                <figcaption>{shot.label}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <style>{`
        .product-showcase {
          padding-block: clamp(40px, 6vw, 72px);
        }
        .product-showcase-heading {
          text-align: left;
          max-width: 640px;
          margin-bottom: 2.25rem;
          padding-inline: var(--page-gutter);
        }
        .product-strip {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          overflow-x: hidden;
        }
        .product-strip-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding-inline: clamp(20px, 4vw, 64px);
          animation-name: product-strip-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .product-strip-item {
          flex-shrink: 0;
          height: clamp(300px, 36vw, 520px);
          width: auto;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .product-strip-item img {
          height: 100%;
          width: auto;
          border-radius: 14px;
          display: block;
        }
        .product-strip-placeholder {
          height: 100%;
          width: auto;
          aspect-ratio: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1rem;
          font-size: 0.78rem;
          color: var(--color-muted);
          background: linear-gradient(145deg, #e8ddc8, var(--color-cream));
          border: 1.5px dashed rgba(26,26,26,0.22);
          border-radius: 14px;
          box-sizing: border-box;
        }
        .product-strip-item figcaption {
          align-self: stretch;
          margin-top: 0.6rem;
          font-size: 0.95rem;
          color: var(--color-muted);
          text-align: center;
        }

        @keyframes product-strip-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .product-strip-track {
            animation: none !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }
          .product-strip-item {
            scroll-snap-align: start;
          }
          .product-strip-item[aria-hidden="true"] {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
