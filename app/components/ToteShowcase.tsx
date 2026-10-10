import Image from "next/image";
import FadeIn from "./FadeIn";
import Bilingual from "./Bilingual";

export default function ToteShowcase() {
  return (
    <section style={{ paddingBlock: "clamp(48px, 6vw, 80px)" }}>
      <div style={{ marginBottom: "2.5rem", paddingInline: "var(--page-gutter)" }}>
        <FadeIn>
          <Bilingual as="label" en="5 Collectible Designs" hi="५ संग्रहणीय डिज़ाइन" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Your tote arrives as one of five."
            hi="आपका टोट पाँच डिज़ाइनों में से एक होगा।"
            style={{ margin: "1.25rem 0 1.5rem" }}
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              lineHeight: 1.75,
              color: "var(--color-muted)",
              maxWidth: "64ch",
            }}
          >
            Each hamper includes one tote bag design, chosen at random: Times
            of Kumbh, Stamps of Kumbh, Notes of Kumbh, Passport of Kumbh, or
            Station of Kumbh. Explore all five below.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.3}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "var(--color-cream)" }}>
          <Image
            src="/products/tote-bags-showcase.png"
            alt="All five collectible Kumbhkala tote bag designs"
            fill
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </div>
        <p style={{ fontSize: "0.95rem", color: "var(--color-muted)", marginTop: "0.9rem", paddingInline: "var(--page-gutter)" }}>
          1 of 5 designs included per hamper, selected at random.
        </p>
      </FadeIn>
    </section>
  );
}
