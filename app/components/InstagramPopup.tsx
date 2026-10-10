"use client";

import { useCallback, useEffect, useState } from "react";
import { INSTAGRAM_URL } from "../lib/config";

const STORAGE_KEY = "kumbhkala-ig-popup";
const FIRST_DELAY_MS = 9000;
const COOLDOWN_MS = 90000;
const MAX_APPEARANCES = 3;

interface PopupState {
  count: number; // times shown this session
  done: boolean; // clicked through to Instagram, or hit the cap
  nextAt: number; // epoch ms when the next appearance is due
}

function readState(): PopupState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as PopupState;
    const fresh = { count: 0, done: false, nextAt: Date.now() + FIRST_DELAY_MS };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    return null; // storage blocked: never show, rather than risk an endless loop
  }
}

function writeState(state: PopupState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function InstagramPopup() {
  const [open, setOpen] = useState(false);
  // bumped after each dismissal so the scheduling effect re-runs
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (open) return;
    const state = readState();
    if (!state || state.done || state.count >= MAX_APPEARANCES) return;
    const timer = setTimeout(() => {
      // reserve the next slot now, so a reload while open doesn't skip the cooldown
      writeState({ ...state, count: state.count + 1, nextAt: Date.now() + COOLDOWN_MS });
      setOpen(true);
    }, Math.max(0, state.nextAt - Date.now()));
    return () => clearTimeout(timer);
  }, [open, tick]);

  const dismiss = useCallback((clickedThrough = false) => {
    const state = readState();
    if (state) {
      writeState({
        ...state,
        done: clickedThrough || state.count >= MAX_APPEARANCES,
        nextAt: Date.now() + COOLDOWN_MS,
      });
    }
    setOpen(false);
    setTick((t) => t + 1);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div className="ig-popup" role="dialog" aria-label="Follow us on Instagram">
      <button type="button" className="ig-popup-close" onClick={() => dismiss()} aria-label="Close">
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
        onClick={() => dismiss(true)}
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
