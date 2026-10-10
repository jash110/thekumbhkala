import { pageMetadata } from "../lib/seo";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import BulkGiftingCard from "../components/BulkGiftingCard";
import PlaceholderImage from "../components/PlaceholderImage";
import KitImageToggle from "../components/KitImageToggle";
import PriceTag from "../components/PriceTag";
import ComingSoonBadge from "../components/ComingSoonBadge";
import ToteShowcase from "../components/ToteShowcase";
import Bilingual from "../components/Bilingual";
import { kits } from "../lib/data";

export const metadata = pageMetadata({
  title: "Shop Kumbh Mela Souvenir Kits: Sangam & Trimbak Kits | Kumbhkala",
  description:
    "Pre-book Kumbhkala's Kumbh Mela 2027 souvenir kits from Nashik: the Sangam Kit, a starter set of ritual and remembrance, and the Trimbak Kit, elevated for gifting.",
  path: "/kits",
});

export default function KitsPage() {
  return (
    <div>
      <FadeIn>
        <div style={{ position: "relative", width: "100%", maxWidth: "1100px", margin: "0 auto", aspectRatio: "3 / 2" }}>
          <Image
            src="/products/sangam-kit-steps.png"
            alt="Sangam Kit staged on the Godavari ghat steps"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </FadeIn>

      <div className="kits-intro">
        <FadeIn delay={0.1}>
          <Bilingual
            as="h1"
            en="Kumbh Yatra Experience Kits"
            hi="कुंभ यात्रा अनुभव किट"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
          />
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.75, color: "var(--color-muted)", maxWidth: "64ch" }}>
            Experience the essence of the Kumbh Mela from home: sacred
            elements, local flavors, and a keepsake to carry the memory
            forward. Each kit is assembled with intention, inspired by the
            journey of the Yatra itself.
          </p>
        </FadeIn>
      </div>

      <div className="kits-grid-wrap">
        <div className="kits-grid">
          {kits.map((kit, i) => {
            const isTrimbak = kit.slug === "trimbak";
            return (
              <FadeIn key={kit.slug} delay={0.1 * i}>
                <div
                  style={{
                    border: isTrimbak ? "1.5px solid var(--color-pink-soft)" : "1px solid var(--color-border)",
                    borderRadius: "20px",
                    padding: "2rem",
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
                  <h2 style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.2rem)", margin: "1.5rem 0 0.5rem", color: isTrimbak ? "var(--color-cream)" : "var(--color-ink)" }}>
                    {kit.name}
                  </h2>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <PriceTag mrp={kit.mrp} price={kit.price} comingSoon={kit.comingSoon} size="lg" accent={isTrimbak ? "cream" : "marigold"} />
                  </div>
                  <p style={{ fontSize: "clamp(1.05rem, 1.2vw, 1.15rem)", lineHeight: 1.6, color: isTrimbak ? "rgba(240,232,220,0.75)" : "var(--color-muted)" }}>
                    {kit.description}
                  </p>

                  <div
                    style={{
                      marginTop: "1.25rem",
                      paddingTop: "1.25rem",
                      borderTop: isTrimbak ? "1px solid rgba(240,232,220,0.2)" : "1px solid var(--color-border)",
                    }}
                  >
                    <span className="label" style={{ color: isTrimbak ? "var(--color-pink-soft)" : "var(--color-marigold)" }}>
                      What&apos;s Inside
                    </span>
                    <ul style={{ display: "grid", gap: "0.6rem", margin: "1rem 0" }}>
                      {kit.whatsInside.map((item) => {
                        const isPlaceholder = item.includes("TBD");
                        return (
                          <li
                            key={item}
                            style={{
                              fontSize: "1rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.6rem",
                              fontStyle: isPlaceholder ? "italic" : "normal",
                              color: isPlaceholder
                                ? isTrimbak
                                  ? "var(--color-pink-soft)"
                                  : "var(--color-gold)"
                                : isTrimbak
                                ? "var(--color-cream)"
                                : "var(--color-ink)",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: isTrimbak ? "var(--color-pink-soft)" : "var(--color-marigold)",
                                flexShrink: 0,
                              }}
                            />
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <Link href={`/kits/${kit.slug}`} className={isTrimbak ? "btn btn-marigold" : "btn btn-outline"}>
                    View Kit
                  </Link>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <ToteShowcase />

      <div style={{ padding: "0 var(--page-gutter) clamp(48px, 6vw, 80px)" }}>
        <BulkGiftingCard />
      </div>

      <style>{`
        .kits-intro {
          padding-inline: var(--page-gutter);
          padding-block: clamp(40px, 5vw, 64px) clamp(24px, 3vw, 40px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .kits-grid-wrap {
          padding-inline: var(--page-gutter);
          padding-block: 0 clamp(48px, 6vw, 80px);
        }
        .kits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .kits-intro { grid-template-columns: 1fr 1fr; gap: clamp(32px, 4vw, 64px); align-items: start; }
          .kits-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}
