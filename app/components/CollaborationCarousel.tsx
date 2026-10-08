"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/our-craft/collaboration-1.jpg", alt: "Our first collaboration — photo 1" },
  { src: "/our-craft/collaboration-2.jpg", alt: "Our first collaboration — photo 2" },
  { src: "/our-craft/collaboration-3.jpeg", alt: "Our first collaboration — photo 3" },
  { src: "/our-craft/collaboration-4.jpeg", alt: "Our first collaboration — photo 4" },
];
const INTERVAL_MS = 3500;

export default function CollaborationCarousel({ fill = false }: { fill?: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % IMAGES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        ...(fill
          ? { position: "absolute" as const, inset: 0 }
          : { position: "relative" as const, width: "100%", aspectRatio: "3 / 2" }),
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
      }}
    >
      {IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={i === 0}
          sizes="(min-width: 768px) 50vw, 100vw"
          style={{
            objectFit: "cover",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
