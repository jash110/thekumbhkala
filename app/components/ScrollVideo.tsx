"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const HOLD_MS = 1000;

interface ScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** Fill the parent box (width/height 100%, cropped with object-fit: cover). */
  fill?: boolean;
  /** CSS aspect-ratio, e.g. "941 / 1672". Used when not filling. */
  aspectRatio?: string;
  style?: CSSProperties;
  label?: string;
}

export default function ScrollVideo({
  src,
  poster,
  className,
  fill = false,
  aspectRatio,
  style,
  label,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // required for autoplay; React's muted prop is unreliable

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clearTimer = () => {
      if (timer !== undefined) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const playFromStart = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        /* autoplay blocked or interrupted: stay on the poster */
      });
    };

    const onEnded = () => {
      if (!inView) return;
      clearTimer();
      timer = setTimeout(() => {
        timer = undefined;
        if (inView) playFromStart();
      }, HOLD_MS);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (inView) return;
          inView = true;
          clearTimer();
          playFromStart();
        } else {
          inView = false;
          clearTimer();
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    video.addEventListener("ended", onEnded);
    observer.observe(video);

    return () => {
      inView = false;
      clearTimer();
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      // #t=0.001 makes browsers paint the first frame when no autoplay happens (reduced motion)
      src={`${src}#t=0.001`}
      poster={poster}
      className={className}
      muted
      playsInline
      loop={false}
      preload="metadata"
      aria-label={label}
      style={{
        display: "block",
        objectFit: "cover",
        ...(fill ? { width: "100%", height: "100%" } : { aspectRatio }),
        ...style,
      }}
    />
  );
}
