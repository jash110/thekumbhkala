"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import { kits } from "../lib/data";
import { formatPrice } from "../lib/format";

interface SearchDropdownProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDropdown({ open, onClose }: SearchDropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: "100%",
            right: "1.5rem",
            width: "min(380px, calc(100vw - 3rem))",
            background: "var(--color-cream)",
            border: "1px solid var(--color-border)",
            borderRadius: "14px",
            boxShadow: "0 16px 40px rgba(26,26,26,0.15)",
            padding: "1.25rem",
            zIndex: 200,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="label">Our Kits</span>
            <button
              aria-label="Close search"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.1rem",
                color: "var(--color-muted)",
                width: "2rem",
                height: "2rem",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginTop: "0.75rem", display: "grid", gap: "0.5rem" }}>
            {kits.map((kit) => (
              <Link
                key={kit.slug}
                href={`/kits/${kit.slug}`}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  background: "#fff",
                }}
              >
                <div style={{ width: "56px", flexShrink: 0 }}>
                  <PlaceholderImage label={`[${kit.name}]`} aspectRatio="1 / 1" />
                </div>
                <div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    {kit.name} — {kit.comingSoon ? "Coming Soon" : formatPrice(kit.price)}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-muted)" }}>{kit.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
