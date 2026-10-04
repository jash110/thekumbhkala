import FadeIn from "./FadeIn";
import Bilingual from "./Bilingual";

export default function ClosingCTA() {
  return (
    <section
      style={{
        background: "var(--color-pink)",
        color: "var(--color-cream)",
        paddingBlock: "var(--section-space, 6rem)",
        paddingInline: "1.5rem",
        textAlign: "center",
      }}
    >
      <FadeIn>
        <span className="label" style={{ color: "var(--color-pink-soft)" }}>
          Simhastha 2027
        </span>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Bilingual
          as="h2"
          en="Carry the Kumbh home."
          hi="कुंभ को घर ले जाइए।"
          hiColor="var(--color-pink-soft)"
          style={{ margin: "1.25rem 0 1rem", color: "var(--color-cream)" }}
        />
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{ fontSize: "1.05rem", color: "rgba(240,232,220,0.8)", marginBottom: "2.25rem" }}>
          Reserve your hamper ahead of the Mela.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <a href="#" className="btn btn-marigold">
          Reserve Now
        </a>
      </FadeIn>
    </section>
  );
}
