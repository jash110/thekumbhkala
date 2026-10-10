import Link from "next/link";
import FadeIn from "./FadeIn";
import PlaceholderImage from "./PlaceholderImage";
import KitImageToggle from "./KitImageToggle";
import PriceTag from "./PriceTag";
import ComingSoonBadge from "./ComingSoonBadge";
import Bilingual from "./Bilingual";
import { kits } from "../lib/data";

const KIT_HINDI_NAMES: Record<string, string> = {
  sangam: "संगम किट",
  trimbak: "त्र्यंबक किट",
};

export default function FeaturedKits() {
  return (
    <section className="section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <FadeIn>
          <Bilingual as="label" en="Our Kits" hi="हमारे किट" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Two ways to carry the Kumbh home."
            hi="कुंभ को घर ले जाने के दो रास्ते।"
            style={{ margin: "1.25rem 0 0" }}
          />
        </FadeIn>
      </div>

      <div className="featured-grid">
        {kits.map((kit, i) => {
          const isTrimbak = kit.slug === "trimbak";
          return (
            <FadeIn key={kit.slug} delay={0.15 + i * 0.15}>
              <div
                style={{
                  border: isTrimbak ? "1.5px solid var(--color-pink-soft)" : "1px solid var(--color-border)",
                  borderRadius: "20px",
                  padding: "1.75rem",
                  background: isTrimbak
                    ? "linear-gradient(165deg, var(--color-pink) 0%, var(--color-pink-deep) 100%)"
                    : "#faf5e9",
                  color: isTrimbak ? "var(--color-cream)" : "var(--color-ink)",
                  height: "100%",
                }}
              >
                <div style={{ position: "relative" }}>
                  {isTrimbak ? (
                  <PlaceholderImage
                    label={`[Photo: ${kit.name} packaging]`}
                    aspectRatio="4 / 3"
                    tone="maroon"
                  />
                ) : (
                  <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "14px", overflow: "hidden" }}>
                    <KitImageToggle sizes="(min-width: 860px) 45vw, 100vw" />
                  </div>
                )}
                  {kit.comingSoon && <ComingSoonBadge />}
                </div>
                <Bilingual
                  as="h3"
                  en={kit.name}
                  hi={KIT_HINDI_NAMES[kit.slug]}
                  hiColor={isTrimbak ? "var(--color-pink-soft)" : "var(--color-pink)"}
                  style={{ margin: "1.25rem 0 0.5rem", color: isTrimbak ? "var(--color-cream)" : "var(--color-ink)" }}
                />
                <div style={{ marginBottom: "0.75rem" }}>
                  <PriceTag mrp={kit.mrp} price={kit.price} comingSoon={kit.comingSoon} accent={isTrimbak ? "cream" : "marigold"} />
                </div>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: isTrimbak ? "rgba(240,232,220,0.75)" : "var(--color-muted)", marginBottom: "1.25rem" }}>
                  {kit.description}
                </p>
                <Link
                  href={`/kits/${kit.slug}`}
                  className={isTrimbak ? "btn btn-marigold" : "btn btn-outline"}
                >
                  View Kit
                </Link>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <style>{`
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 860px) {
          .featured-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
