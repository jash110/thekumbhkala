import Link from "next/link";
import NewsletterSignup from "./NewsletterSignup";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Kits", href: "/kits" },
  { label: "Our Craft", href: "/our-craft" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = ["Authenticity", "FAQ", "Returns and Refunds"];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-pink)",
        color: "var(--color-cream)",
        padding: "3.5rem var(--page-gutter) 2rem",
      }}
    >
      <div className="footer-grid">
        <div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 600 }}>
            Kumbhkala
          </span>
          <p style={{ fontSize: "0.95rem", color: "rgba(240,232,220,0.65)", marginTop: "0.5rem" }}>
            Carrying the Yatra Home
          </p>
          <div style={{ marginTop: "1.5rem", fontSize: "0.95rem", lineHeight: 1.9 }}>
            <p style={{ color: "rgba(240,232,220,0.8)" }}>info@kumbhkala.com</p>
            <p style={{ color: "rgba(240,232,220,0.8)" }}>+91 [PHONE]</p>
          </div>
        </div>

        <div>
          <span className="label" style={{ color: "var(--color-pink-soft)", display: "block", marginBottom: "1rem" }}>
            Quick Links
          </span>
          <ul style={{ display: "grid", gap: "0.65rem" }}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={{ color: "rgba(240,232,220,0.8)", fontSize: "0.95rem" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="label" style={{ color: "var(--color-pink-soft)", display: "block", marginBottom: "1rem" }}>
            Support
          </span>
          <ul style={{ display: "grid", gap: "0.65rem" }}>
            {supportLinks.map((label) => (
              <li key={label}>
                <a href="#" style={{ color: "rgba(240,232,220,0.8)", fontSize: "0.95rem" }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="label" style={{ color: "var(--color-pink-soft)", display: "block", marginBottom: "1rem" }}>
            Stay Updated
          </span>
          <NewsletterSignup />

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {["IG", "FB", "X"].map((s) => (
              <span
                key={s}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  border: "1px solid rgba(240,232,220,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  color: "rgba(240,232,220,0.7)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(240,232,220,0.15)",
          marginTop: "3rem",
          paddingTop: "1.5rem",
          fontSize: "0.85rem",
          color: "rgba(240,232,220,0.5)",
        }}
      >
        © 2026 Kumbhkala.
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 720px) {
          .footer-grid {
            grid-template-columns: 1.1fr 0.7fr 0.8fr 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
