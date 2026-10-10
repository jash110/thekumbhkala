"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES = [
  { src: "/products/sangam-kit-closed.png", alt: "Sangam Kit, closed box" },
  { src: "/products/sangam-kit-inside.png", alt: "Sangam Kit, inside the box" },
];
const INTERVAL_MS = 3500;

/** Fills its positioned parent, crossfading between the closed and open Sangam Kit photos. */
export default function KitImageToggle({ sizes, priority = false }: { sizes: string; priority?: boolean }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % IMAGES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {IMAGES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          aria-hidden={i !== active}
          style={{
            objectFit: "cover",
            opacity: i === active ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </>
  );
}
