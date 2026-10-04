export default function NewsletterSignup() {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="email"
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
      <button type="button" className="newsletter-btn">
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
  );
}
