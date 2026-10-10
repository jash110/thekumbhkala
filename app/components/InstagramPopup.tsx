"use client";

import { useEffect, useState } from "react";
import { INSTAGRAM_URL } from "../lib/config";

const STORAGE_KEY = "kumbhkala-ig-popup-shown";
const DELAY_MS = 9000;

export default function InstagramPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return; // storage blocked: skip rather than risk re-showing on every page
    }
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="ig-popup" role="dialog" aria-label="Follow us on Instagram">
      <button type="button" className="ig-popup-close" onClick={() => setOpen(false)} aria-label="Close">
        ×
      </button>
      <h2 className="ig-popup-title">Follow us on Instagram</h2>
      <p className="ig-popup-body">
        We post Kumbh 2027 dates, behind-the-scenes, and stories about Nashik&apos;s traditions. Follow along{" "}
        <strong>@thekumbhkala</strong>
      </p>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-marigold"
        onClick={() => setOpen(false)}
      >
        Follow on Instagram
      </a>
      <style>{`
        .ig-popup {
          position: fixed;
          z-index: 900;
          right: 20px;
          bottom: 20px;
          width: min(360px, calc(100vw - 40px));
          background: var(--color-cream);
          border: 1.5px solid var(--color-pink);
          border-radius: 18px;
          padding: 1.75rem 1.5rem 1.5rem;
          box-shadow: 0 12px 40px rgba(26, 26, 26, 0.25);
          animation: ig-pop-in 0.4s ease both;
        }
        .ig-popup-close {
          position: absolute;
          top: 8px;
          right: 12px;
          background: none;
          border: 0;
          font-size: 1.8rem;
          line-height: 1;
          cursor: pointer;
          color: var(--color-muted);
        }
        .ig-popup-title { font-size: 1.4rem; color: var(--color-pink); margin-bottom: 0.6rem; }
        .ig-popup-body { font-size: 0.98rem; line-height: 1.55; color: var(--color-muted); margin-bottom: 1.1rem; }
        @keyframes ig-pop-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .ig-popup { animation: none; } }
      `}</style>
    </div>
  );
}
