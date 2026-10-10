"use client";

import { useState } from "react";
import { buildContactMessage } from "../lib/whatsapp";
import WhatsAppPanel, { useWhatsAppFlow } from "./WhatsAppFlow";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "0.85rem 1rem",
  fontSize: "0.95rem",
  background: "#fff",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "var(--color-muted)",
  display: "block",
  marginBottom: "0.4rem",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#b3261e",
  marginTop: "0.35rem",
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const flow = useWhatsAppFlow();

  // Editing any field after a confirm/blocked/opened state goes back to the plain form.
  function edit(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
      if (flow.phase !== "idle") flow.reset();
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (flow.phase !== "idle") return;
    const next: { name?: string; message?: string } = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    flow.ask();
  }

  // Fields only reset once WhatsApp has actually opened.
  function openWhatsAppNow() {
    if (flow.open(buildContactMessage({ name, contact, message }))) {
      setName("");
      setContact("");
      setMessage("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "grid", gap: "1.1rem", maxWidth: "520px" }}
    >
      <div>
        <label htmlFor="contact-name" style={labelStyle}>Name *</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={edit(setName)}
          aria-invalid={!!errors.name}
          style={fieldStyle}
        />
        {errors.name && <p role="alert" style={errorStyle}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="contact-contact" style={labelStyle}>Email or Phone</label>
        <input
          id="contact-contact"
          type="text"
          name="contact"
          autoComplete="email"
          value={contact}
          onChange={edit(setContact)}
          style={fieldStyle}
        />
      </div>
      <div>
        <label htmlFor="contact-message" style={labelStyle}>Message *</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={edit(setMessage)}
          aria-invalid={!!errors.message}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
        {errors.message && <p role="alert" style={errorStyle}>{errors.message}</p>}
      </div>
      {flow.phase === "idle" ? (
        <button type="submit" className="btn btn-marigold" style={{ justifySelf: "start" }}>
          Send via WhatsApp
        </button>
      ) : (
        <WhatsAppPanel
          phase={flow.phase}
          onOpen={openWhatsAppNow}
          onCancel={flow.reset}
          openedText="WhatsApp opened in a new tab. Press Send there to complete your message."
        />
      )}
      <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
        We&apos;ll get back to you on WhatsApp, as this form doesn&apos;t send an email directly yet.
      </p>
    </form>
  );
}
