"use client";

interface QuantityStepperProps {
  quantity: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "md" | "lg";
}

export default function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 9,
  size = "md",
}: QuantityStepperProps) {
  const buttonSize = size === "lg" ? "2.9rem" : "2.4rem";
  const buttonFontSize = size === "lg" ? "1.3rem" : "1.1rem";
  const quantityFontSize = size === "lg" ? "1.1rem" : "0.95rem";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1.5px solid var(--color-border)",
        borderRadius: "999px",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        style={{
          background: "none",
          border: "none",
          width: buttonSize,
          height: buttonSize,
          fontSize: buttonFontSize,
          color: "var(--color-ink)",
        }}
      >
        −
      </button>
      <span
        style={{
          width: "2.2rem",
          textAlign: "center",
          fontSize: quantityFontSize,
          fontWeight: 500,
        }}
      >
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        style={{
          background: "none",
          border: "none",
          width: buttonSize,
          height: buttonSize,
          fontSize: buttonFontSize,
          color: "var(--color-ink)",
        }}
      >
        +
      </button>
    </div>
  );
}
