import { formatPrice } from "../lib/format";

interface PriceTagProps {
  mrp: number;
  price: number;
  size?: "sm" | "lg" | "xl";
  accent?: "marigold" | "gold" | "cream";
}

export default function PriceTag({ mrp, price, size = "sm", accent = "marigold" }: PriceTagProps) {
  const priceColor =
    accent === "cream" ? "var(--color-cream)" : accent === "gold" ? "var(--color-gold)" : "var(--color-marigold)";
  const mrpColor = accent === "cream" ? "rgba(240,232,220,0.85)" : "var(--color-muted)";
  const fontSize =
    size === "xl" ? "clamp(1.7rem, 2.6vw, 2.6rem)" : size === "lg" ? "1.4rem" : "1.05rem";
  const mrpFontSize = size === "xl" ? "1.1rem" : "0.85rem";

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize, fontWeight: 600, color: priceColor }}>
        {formatPrice(price)}
      </span>
      <span style={{ fontSize: mrpFontSize, color: mrpColor, textDecoration: "line-through" }}>
        {formatPrice(mrp)}
      </span>
    </div>
  );
}
