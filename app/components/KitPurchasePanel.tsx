"use client";

import { useState } from "react";
import PriceTag from "./PriceTag";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "./CartContext";
import type { Kit } from "../lib/data";

export default function KitPurchasePanel({ kit }: { kit: Kit }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openDrawer } = useCart();
  const isTrimbak = kit.slug === "trimbak";

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <PriceTag mrp={kit.mrp} price={kit.price} comingSoon={kit.comingSoon} size="xl" accent={isTrimbak ? "gold" : "marigold"} />
      </div>

      <p style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.35rem)", lineHeight: 1.7, color: "var(--color-muted)", marginBottom: "1.75rem", maxWidth: "60ch" }}>
        {kit.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {kit.comingSoon ? (
          <button
            type="button"
            className="btn btn-marigold"
            disabled
            style={{ padding: "1.05rem 2.4rem", fontSize: "1.05rem", opacity: 0.55, cursor: "not-allowed" }}
          >
            Coming Soon
          </button>
        ) : (
          <>
            <QuantityStepper quantity={quantity} onChange={setQuantity} size="lg" />
            <button
              type="button"
              className="btn btn-marigold"
              style={{ padding: "1.05rem 2.4rem", fontSize: "1.05rem" }}
              onClick={() => {
                addItem(kit.slug, quantity);
                openDrawer();
              }}
            >
              Pre-Order {kit.name}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
