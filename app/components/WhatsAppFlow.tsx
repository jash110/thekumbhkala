"use client";

import { useCallback, useState } from "react";
import { openWhatsApp } from "../lib/whatsapp";

/**
 * idle     – nothing pending, show the normal submit button
 * confirm  – asking the user to confirm before we open WhatsApp
 * blocked  – window.open returned null (pop-up blocker)
 * opened   – WhatsApp tab opened; the user still has to press Send there
 */
export type WhatsAppPhase = "idle" | "confirm" | "blocked" | "opened";

export function useWhatsAppFlow() {
  const [phase, setPhase] = useState<WhatsAppPhase>("idle");

  const ask = useCallback(() => setPhase("confirm"), []);
  const reset = useCallback(() => setPhase("idle"), []);
  /** Must be called from a click handler so the browser treats it as user-initiated. */
  const open = useCallback((message: string): boolean => {
    const ok = openWhatsApp(message);
    setPhase(ok ? "opened" : "blocked");
    return ok;
  }, []);

  return { phase, ask, reset, open };
}

interface PanelProps {
  phase: WhatsAppPhase;
  onOpen: () => void;
  onCancel: () => void;
  openedText: string;
  /** If given, the "opened" state shows a Done button that calls this. */
  onDone?: () => void;
  variant?: "light" | "dark";
}

const CONFIRM_TEXT =
  "This will open WhatsApp with your message ready to send to our team. You'll need to press Send there to complete it.";
const BLOCKED_TEXT =
  "Your pop-up blocker may have stopped WhatsApp from opening. Please allow pop-ups for this site and try again.";

export default function WhatsAppPanel({
  phase,
  onOpen,
  onCancel,
  openedText,
  onDone,
  variant = "light",
}: PanelProps) {
  if (phase === "idle") return null;
  const dark = variant === "dark";

  const text = phase === "confirm" ? CONFIRM_TEXT : phase === "blocked" ? BLOCKED_TEXT : openedText;

  return (
    <div
      role={phase === "blocked" ? "alert" : "status"}
      className={`wa-panel ${dark ? "wa-panel-dark" : ""}`}
      style={{
        border: `1px solid ${
          phase === "blocked" ? (dark ? "#ffb4ab" : "#b3261e") : dark ? "rgba(240,232,220,0.4)" : "var(--color-border)"
        }`,
        background: dark ? "rgba(240,232,220,0.1)" : "#fff",
        color: dark ? "var(--color-cream)" : "var(--color-ink)",
        borderRadius: "12px",
        padding: "0.9rem 1rem",
        fontSize: "0.9rem",
        lineHeight: 1.5,
        marginTop: "0.75rem",
      }}
    >
      <p style={{ marginBottom: phase === "opened" && !onDone ? 0 : "0.8rem" }}>{text}</p>

      {(phase === "confirm" || phase === "blocked") && (
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button type="button" className="wa-btn wa-btn-primary" onClick={onOpen}>
            {phase === "blocked" ? "Try Again" : "Open WhatsApp"}
          </button>
          <button type="button" className="wa-btn wa-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}

      {phase === "opened" && onDone && (
        <button type="button" className="wa-btn wa-btn-primary" onClick={onDone}>
          Done
        </button>
      )}

      <style>{`
        .wa-btn {
          border-radius: 999px;
          padding: 0.55rem 1.2rem;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.25s ease, opacity 0.25s ease;
        }
        .wa-btn-primary {
          background: var(--color-button);
          color: var(--color-cream);
          border: 1.5px solid var(--color-button);
        }
        .wa-btn-primary:hover { background: var(--color-button-hover); }
        .wa-btn-secondary {
          background: transparent;
          color: inherit;
          border: 1.5px solid currentColor;
          opacity: 0.8;
        }
        .wa-btn-secondary:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
