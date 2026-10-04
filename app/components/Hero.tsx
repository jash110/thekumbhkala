import Link from "next/link";
import FadeIn from "./FadeIn";
import SplitSection from "./SplitSection";
import HeroLockup from "./HeroLockup";
import HomeImageSlot from "./HomeImageSlot";

export default function Hero() {
  return (
    <SplitSection
      imageSide="right"
      fullHeight
      minHeight="max(620px, calc(100svh - var(--tagline-height) - var(--nav-height)))"
      className="hero-split"
      image={
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <HomeImageSlot slot="hero" fill rounded={false} />
        </div>
      }
    >
      <FadeIn delay={0}>
        <HeroLockup />
      </FadeIn>

      <FadeIn delay={0.08}>
        <p
          lang="hi"
          style={{
            fontFamily: "var(--font-devanagari)",
            color: "var(--color-pink)",
            fontSize: "clamp(2rem, 3.6vw, 3.6rem)",
            lineHeight: 1.2,
            textAlign: "left",
          }}
        >
          हर हर गोदा हर हर गंगे
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <span
          style={{
            display: "inline-block",
            background: "rgba(196,30,84,0.12)",
            color: "var(--color-marigold)",
            fontSize: "clamp(0.85rem, 0.2vw + 0.8rem, 1rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            padding: "0.4rem 0.9rem",
            borderRadius: "999px",
          }}
        >
          Pre-Bookings Open
        </span>
        <span className="label" style={{ display: "block" }}>
          Nashik · Simhastha 2027
        </span>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1
          style={{
            fontSize: "clamp(3rem, 6.5vw, 6rem)",
            lineHeight: 1.02,
          }}
        >
          Kumbh is what you bring back.
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--color-muted)", maxWidth: "48ch" }}>
          Kumbhkala brings together the elements of the Kumbh Yatra — the
          sacred, the tasted, the kept — into one hamper you carry home.
        </p>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}>
          <Link href="/kits" className="btn btn-marigold">
            Discover the Kits
          </Link>
          <a
            href="#kumbh-context"
            style={{
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "var(--color-ink)",
              borderBottom: "1.5px solid var(--color-ink)",
              paddingBottom: "2px",
            }}
          >
            Why Nashik →
          </a>
        </div>
      </FadeIn>

      <style>{`
        .hero-split .split-text-inner {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.8vw, 28px);
        }
        .hero-split .split-text-col {
          padding-top: clamp(16px, 3vw, 32px);
        }
        @media (min-width: 768px) {
          .hero-split .split-text-col {
            align-items: flex-start;
            padding-top: clamp(12px, 1.6vw, 24px);
          }
        }
      `}</style>
    </SplitSection>
  );
}
