"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import { kits } from "../lib/data";
import { formatPrice } from "../lib/format";

interface SearchDropdownProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDropdown({ open, onClose }: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kits, rituals, elements..."
              style={{
                flex: 1,
                border: "1px solid var(--color-border)",
                borderRadius: "999px",
                padding: "0.6rem 1rem",
                fontSize: "0.95rem",
                background: "#fff",
              }}
            />
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

          <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
            {kits.map((kit) => (
              <div
                key={kit.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ width: "48px", flexShrink: 0 }}>
                  <PlaceholderImage label={`[${kit.name}]`} aspectRatio="1 / 1" />
                </div>
                <div>
                  <p style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    {kit.name} — {formatPrice(kit.price)}
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--color-muted)" }}>
                    {kit.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
