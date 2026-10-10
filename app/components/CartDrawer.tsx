"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import QuantityStepper from "./QuantityStepper";
import { useCart } from "./CartContext";
import { getKit } from "../lib/data";
import { formatPrice } from "../lib/format";
import { buildOrderMessage } from "../lib/whatsapp";
import WhatsAppPanel, { useWhatsAppFlow } from "./WhatsAppFlow";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  display: "block",
  marginBottom: "0.35rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "0.6rem 0.9rem",
  fontSize: "0.95rem",
  background: "#fff",
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, cartTotal, updateQuantity, removeItem, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const isEmpty = items.length === 0;
  const canSubmit = !isEmpty && name.trim() !== "" && phone.trim() !== "";

  const flow = useWhatsAppFlow();

  // Called from the "Open WhatsApp" / "Try Again" click. The cart and form stay
  // untouched here: they only clear when the customer presses Done after a
  // successful open.
  function openOrder() {
    if (!canSubmit) return;
    flow.open(buildOrderMessage({ items, total: cartTotal, name, phone, city, notes }));
  }

  function finishOrder() {
    clearCart();
    setName("");
    setPhone("");
    setCity("");
    setNotes("");
    flow.reset();
    onClose();
  }

  function handleClose() {
    flow.reset();
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={handleClose}
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
                onClick={handleClose}
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

            {isEmpty ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "1rem",
                }}
              >
                <p style={{ fontSize: "1.15rem" }}>Your cart is empty</p>
                <p style={{ color: "var(--color-muted)", maxWidth: "26ch" }}>
                  Pick a kit and carry a piece of the Kumbh home.
                </p>
                <Link href="/kits" className="btn btn-marigold" onClick={onClose}>
                  Browse Kits
                </Link>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
                  {items.map((item) => {
                    const kit = getKit(item.kitSlug);
                    if (!kit) return null;
                    return (
                      <div
                        key={item.kitSlug}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1.25rem 0",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <div style={{ width: "84px", flexShrink: 0 }}>
                          <PlaceholderImage label={`[${kit.name}]`} aspectRatio="1 / 1" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
                            <p style={{ fontWeight: 500, marginBottom: "0.25rem" }}>{kit.name}</p>
                            <button
                              type="button"
                              aria-label={`Remove ${kit.name}`}
                              onClick={() => removeItem(item.kitSlug)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "var(--color-muted)",
                                fontSize: "0.85rem",
                                textDecoration: "underline",
                                padding: 0,
                              }}
                            >
                              Remove
                            </button>
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", marginBottom: "0.6rem" }}>
                            {formatPrice(kit.price)} each
                          </p>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <QuantityStepper
                              quantity={item.quantity}
                              min={0}
                              onChange={(q) => updateQuantity(item.kitSlug, q)}
                            />
                            <span style={{ fontWeight: 600, color: "var(--color-marigold)" }}>
                              {formatPrice(kit.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div style={{ padding: "1.25rem 0", borderBottom: "1px solid var(--color-border)" }}>
                    <label style={labelStyle}>
                      Discount Code <span style={{ textTransform: "none" }}>(coming soon)</span>
                    </label>
                    <input
                      disabled
                      placeholder="Enter code"
                      style={{ ...inputStyle, borderRadius: "999px", opacity: 0.5, cursor: "not-allowed" }}
                    />
                  </div>

                  <div style={{ padding: "1.25rem 0", display: "grid", gap: "0.9rem" }}>
                    <div>
                      <label htmlFor="co-name" style={labelStyle}>Name *</label>
                      <input
                        id="co-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="co-phone" style={labelStyle}>Phone *</label>
                      <input
                        id="co-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="co-city" style={labelStyle}>City / Delivery Area</label>
                      <input
                        id="co-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label htmlFor="co-notes" style={labelStyle}>Notes</label>
                      <textarea
                        id="co-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--color-border)" }}>
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
                  </p>
                  {flow.phase === "idle" ? (
                    <button
                      type="button"
                      className="btn btn-marigold"
                      disabled={!canSubmit}
                      onClick={flow.ask}
                      style={{
                        textAlign: "center",
                        width: "100%",
                        opacity: canSubmit ? 1 : 0.5,
                        cursor: canSubmit ? "pointer" : "not-allowed",
                      }}
                    >
                      Place Order via WhatsApp
                    </button>
                  ) : (
                    <WhatsAppPanel
                      phase={flow.phase}
                      onOpen={openOrder}
                      onCancel={flow.reset}
                      onDone={finishOrder}
                      openedText="WhatsApp opened in a new tab. Press Send there to complete your order."
                    />
                  )}
                  <p
                    style={{
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      color: "var(--color-muted)",
                      marginTop: "0.75rem",
                    }}
                  >
                    Checkout and online payment aren&apos;t live yet, so placing an order opens WhatsApp
                    with your details prefilled so we can confirm it with you directly.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
