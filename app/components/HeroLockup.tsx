"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavBrandVisibility } from "./NavBrandVisibility";

export default function HeroLockup() {
  const ref = useRef<HTMLDivElement>(null);
  const { setVisible } = useNavBrandVisibility();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { rootMargin: "-100px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setVisible]);

  return (
    <div ref={ref} className="hero-lockup">
      <motion.img
        layoutId="kumbhkala-logo-mark"
        src="/logo.png"
        alt="Kumbhkala"
        transition={{ layout: { duration: 1.1, ease: [0.65, 0, 0.35, 1] } }}
        className="hero-lockup-mark"
      />
      <span className="hero-lockup-wordmark">Kumbhkala</span>

      <style>{`
        .hero-lockup {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 20px;
          margin-bottom: 1.5rem;
        }
        .hero-lockup-mark {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        .hero-lockup-wordmark {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 2rem;
          line-height: 1;
          white-space: nowrap;
        }
        /* 768–899px: the hero is still stacked (full-width text), so the
           original viewport-based sizes are fine. */
        @media (min-width: 768px) {
          .hero-lockup-mark {
            width: clamp(112px, 11vw, 176px);
            height: clamp(112px, 11vw, 176px);
          }
          .hero-lockup-wordmark {
            font-size: clamp(3rem, 5.2vw, 4.8rem);
          }
        }
        /* From 900px the hero is side-by-side and the text column is 42% wide
           (SplitSection default) minus its horizontal page-gutter padding. Size
           the mark and wordmark from that width so "Kumbhkala" always fits
           beside the image. 41vw (not 42) leaves room for the scrollbar. The
           wordmark is ~5.3em wide. */
        @media (min-width: 900px) {
          .hero-lockup {
            --avail: calc(41vw - 2 * clamp(20px, 5vw, 88px));
            --mark: clamp(64px, calc(var(--avail) * 0.3), 176px);
          }
          .hero-lockup-mark {
            width: var(--mark);
            height: var(--mark);
          }
          .hero-lockup-wordmark {
            font-size: min(4.8rem, calc((var(--avail) - var(--mark) - 20px) / 5.4));
          }
        }
      `}</style>
    </div>
  );
}
