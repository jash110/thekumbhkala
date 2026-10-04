"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import QuantityStepper from "./QuantityStepper";
import { kits } from "../lib/data";
import { formatPrice } from "../lib/format";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const lineItem = kits[0]; // Sangam Kit — hardcoded single line item for this shell

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(26,26,26,0.45)",
              zIndex: 300,
            }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background: "var(--color-cream)",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              padding: "1.75rem",
              boxShadow: "-16px 0 40px rgba(26,26,26,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "1.25rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <h2 style={{ fontSize: "1.4rem" }}>Cart</h2>
              <button
                aria-label="Close cart"
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.4rem",
                  color: "var(--color-muted)",
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1.5rem 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div style={{ width: "84px", flexShrink: 0 }}>
                <PlaceholderImage label={`[${lineItem.name}]`} aspectRatio="1 / 1" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, marginBottom: "0.35rem" }}>
                  {lineItem.name}
                </p>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--color-marigold)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {formatPrice(lineItem.price)}
                </p>
                <QuantityStepper quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            <div style={{ padding: "1.5rem 0", borderBottom: "1px solid var(--color-border)" }}>
              <label
                style={{
                  fontSize: "0.95rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Discount Code
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  placeholder="Enter code"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: "1px solid var(--color-border)",
                    borderRadius: "999px",
                    padding: "0.6rem 1rem",
                    fontSize: "0.95rem",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ padding: "0.6rem 1.25rem", fontSize: "0.95rem" }}
                >
                  Apply
                </button>
              </div>
            </div>

            <div style={{ padding: "1.5rem 0" }}>
              <p style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem" }}>
                <span>Estimated Total</span>
                {/* TODO: recalculate live with quantity once pricing/checkout logic is wired up */}
                <span style={{ fontWeight: 600 }}>{formatPrice(lineItem.price)}</span>
              </p>
            </div>

            <button
              type="button"
              className="btn btn-marigold"
              style={{ marginTop: "auto", textAlign: "center", width: "100%" }}
            >
              Checkout
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
