/** Ribbon-style badge; place inside a `position: relative` container. */
export default function ComingSoonBadge() {
  return (
    <span
      style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        zIndex: 2,
        background: "var(--color-marigold)",
        color: "var(--color-cream)",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "0.45rem 0.9rem",
        borderRadius: "999px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        pointerEvents: "none",
      }}
    >
      Coming Soon
    </span>
  );
}
