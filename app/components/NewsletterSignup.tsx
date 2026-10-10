"use client";

import { useState } from "react";
import { buildNewsletterMessage } from "../lib/whatsapp";
import WhatsAppPanel, { useWhatsAppFlow } from "./WhatsAppFlow";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const flow = useWhatsAppFlow();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (flow.phase !== "idle") return;
    if (!EMAIL_RE.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    flow.ask();
  }

  // The input only clears once WhatsApp has actually opened.
  function openWhatsAppNow() {
    if (flow.open(buildNewsletterMessage(email))) setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="email"
          aria-label="Email address"
          aria-invalid={error}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
            if (flow.phase !== "idle") flow.reset();
          }}
          placeholder="Your email"
          style={{
            flex: 1,
            minWidth: 0,
            background: "rgba(240,232,220,0.08)",
            border: "1px solid rgba(240,232,220,0.3)",
            borderRadius: "999px",
            padding: "0.7rem 1rem",
            color: "var(--color-cream)",
            fontSize: "0.95rem",
          }}
        />
        <button type="submit" className="newsletter-btn">
          Sign Up
        </button>

        <style>{`
          .newsletter-btn {
            background: var(--color-button);
            color: var(--color-cream);
            border: none;
            border-radius: 999px;
            padding: 0.7rem 1.25rem;
            font-size: 0.95rem;
            font-weight: 500;
            white-space: nowrap;
            transition: background 0.25s ease;
          }
          .newsletter-btn:hover {
            background: var(--color-button-hover);
          }
        `}</style>
      </div>
      {error && (
        <p role="alert" style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#ff9a92" }}>
          Please enter a valid email address.
        </p>
      )}
      <WhatsAppPanel
        phase={flow.phase}
        variant="dark"
        onOpen={openWhatsAppNow}
        onCancel={flow.reset}
        openedText="WhatsApp opened in a new tab. Press Send there to finish signing up."
      />
    </form>
  );
}
