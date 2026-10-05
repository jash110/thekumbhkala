"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import SearchDropdown from "./SearchDropdown";
import CartDrawer from "./CartDrawer";
import { useCart } from "./CartContext";
import { useNavBrandVisibility } from "./NavBrandVisibility";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Kits", href: "/kits" },
  { label: "Our Craft", href: "/our-craft" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { visible: brandVisible } = useNavBrandVisibility();

  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, drawerOpen, openDrawer, closeDrawer } = useCart();
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setCompact(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 859px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const solid = scrolled || !isHome;
  const expandedLogoSize = isMobile ? 48 : 64;
  const logoSize = compact ? 44 : expandedLogoSize;
  const expandedNavHeight = isMobile ? 80 : 92;
  const navHeight = compact ? 68 : expandedNavHeight;

  return (
    <>
      <div
        style={{
          background: "var(--color-pink)",
          height: "var(--tagline-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: "clamp(0.9rem, 1vw, 1.05rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-cream)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Souvenirs of the Sacred
        </span>
      </div>

      <motion.header
        animate={{ height: navHeight }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          height: navHeight,
          position: "sticky",
          top: 0,
          zIndex: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          background: solid ? "rgba(240,232,220,0.97)" : "transparent",
          borderBottom: solid ? "1px solid var(--color-border)" : "1px solid transparent",
          backdropFilter: solid ? "blur(6px)" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <button
          aria-label="Open menu"
          className="hamburger"
          onClick={() => setMobileMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "26px",
          }}
        >
          <span style={{ display: "block", height: "1.5px", width: "100%", background: "var(--color-ink)" }} />
          <span style={{ display: "block", height: "1.5px", width: "70%", background: "var(--color-ink)" }} />
        </button>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: isHome && !brandVisible ? 0 : 1,
            pointerEvents: isHome && !brandVisible ? "none" : "auto",
            transition: "opacity 0.3s ease",
          }}
        >
          <motion.img
            layoutId={isHome ? undefined : "kumbhkala-logo-mark"}
            src="/logo.png"
            alt=""
            transition={{
              layout: settled
                ? { duration: 0.3, ease: "easeOut" }
                : { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
            }}
            style={{
              width: logoSize,
              height: logoSize,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2vw, 1.9rem)",
              letterSpacing: "0.02em",
              fontWeight: 600,
            }}
          >
            Kumbhkala
          </span>
        </Link>

        <nav className="desktop-links" style={{ display: "none", gap: "2.25rem" }}>
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  paddingBottom: "0.4rem",
                  borderBottom: active
                    ? "2px solid var(--color-marigold)"
                    : "2px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", gap: "1.1rem", alignItems: "center" }}>
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            style={{ background: "none", border: "none" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="var(--color-ink)" strokeWidth="1.5" />
              <path d="M20 20l-4.5-4.5" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button aria-label="Account" style={{ background: "none", border: "none" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="3.5" stroke="var(--color-ink)" strokeWidth="1.5" />
              <path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            aria-label="Cart"
            onClick={openDrawer}
            style={{ background: "none", border: "none", position: "relative" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 8h12l-1 11.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 19.5L6 8Z" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M9 8V6.5a3 3 0 0 1 6 0V8" stroke="var(--color-ink)" strokeWidth="1.5" />
            </svg>
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "var(--color-marigold)",
                  color: "var(--color-cream)",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  minWidth: "16px",
                  height: "16px",
                  padding: "0 3px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <SearchDropdown open={searchOpen} onClose={() => setSearchOpen(false)} />
      </motion.header>

      <CartDrawer open={drawerOpen} onClose={closeDrawer} />

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, background: "rgba(26,26,26,0.45)", zIndex: 300 }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: "min(300px, 80vw)",
                background: "var(--color-cream)",
                zIndex: 301,
                padding: "1.75rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600 }}>
                  Kumbhkala
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ background: "none", border: "none", fontSize: "1.4rem", color: "var(--color-muted)" }}
                >
                  ×
                </button>
              </div>
              <nav style={{ display: "grid", gap: "1.25rem" }}>
                {NAV_LINKS.map((link) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        color: active ? "var(--color-marigold)" : "var(--color-ink)",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .hamburger { display: none !important; }
          .desktop-links { display: flex !important; }
        }
      `}</style>
    </>
  );
}
