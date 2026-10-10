"use client";

import { whatsappUrl } from "../lib/whatsapp";

const MESSAGE = "Hi Kumbhkala, I'm interested in bulk/corporate gifting for 15+ hampers.";

export default function BulkGiftingCard() {
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "1.75rem",
        background: "#faf5e9",
      }}
    >
      <h2 style={{ fontSize: "clamp(1.4rem, 2vw, 1.7rem)", marginBottom: "0.6rem" }}>Corporate &amp; Bulk Gifting</h2>
      <p style={{ fontSize: "1rem", lineHeight: 1.65, color: "var(--color-muted)", marginBottom: "1.25rem", maxWidth: "62ch" }}>
        Ordering 15+ hampers for your company or event? We can add your company&apos;s logo to the packaging using
        custom sleeves. If you&apos;d like to provide your own branding elements, we&apos;re happy to explore
        integrating them too.
      </p>
      <a href={whatsappUrl(MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
        Contact Us
      </a>
    </div>
  );
}
