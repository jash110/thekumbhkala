import ElementMedia from "./ElementMedia";
import type { KumbhElement } from "../lib/data";

export default function ElementCard(element: KumbhElement) {
  const { name, location, description } = element;
  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "1.25rem",
        background: "#faf5e9",
        height: "100%",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "1 / 1", width: "100%", borderRadius: "14px", overflow: "hidden" }}>
        <ElementMedia {...element} />
      </div>
      <h3 style={{ fontSize: "1.2rem", marginTop: "1.1rem" }}>{name}</h3>
      <p
        style={{
          fontSize: "0.95rem",
          fontStyle: "italic",
          color: "var(--color-muted)",
          margin: "0.4rem 0 0.75rem",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "0.75rem",
        }}
      >
        Location: {location}
      </p>
      <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-muted)" }}>
        {description}
      </p>
    </div>
  );
}
