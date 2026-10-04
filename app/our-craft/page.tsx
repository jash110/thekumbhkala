import FadeIn from "../components/FadeIn";
import PlaceholderImage from "../components/PlaceholderImage";
import AlternatingFeature from "../components/AlternatingFeature";
import Bilingual from "../components/Bilingual";

export const metadata = {
  title: "Our Craft — Kumbhkala",
};

export default function OurCraftPage() {
  return (
    <div>
      <div style={{ padding: "2rem var(--page-gutter) 0" }}>
        <FadeIn>
          <span className="label">How Kumbhkala Is Made</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h1"
            en="Our Craft"
            hi="हमारी कारीगरी"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", margin: "1rem 0 2.5rem" }}
          />
        </FadeIn>
      </div>

      <section style={{ paddingBlock: "0 clamp(48px, 6vw, 80px)" }}>
        <div style={{ paddingInline: "var(--page-gutter)" }}>
          <FadeIn>
            <h2 style={{ marginBottom: "1.25rem" }}>
              What Authenticity Means to Us
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.75, color: "var(--color-muted)", maxWidth: "64ch", marginBottom: "2.5rem" }}>
              Every element in a Kumbhkala kit is sourced with intention, not
              convenience. We work directly with vendors, temple trusts, and
              printers in and around Nashik so that what reaches you is what
              we said it would be — the same water, the same thread, the
              same soil that the Yatra itself moves through.
            </p>
          </FadeIn>
        </div>

        <div className="authenticity-row">
          {["ritual object close-up 1", "ritual object close-up 2", "ritual object close-up 3"].map((label, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <PlaceholderImage label={`[Photo: ${label}]`} aspectRatio="1 / 1" rounded={false} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "var(--color-pink)",
          color: "var(--color-cream)",
          padding: "clamp(48px, 7vw, 96px) var(--page-gutter)",
        }}
      >
        <FadeIn>
          <p className="devanagari" style={{ fontSize: "clamp(2.4rem, 7vw, 4.2rem)", marginBottom: "1rem" }}>
            सत्यमेव जयते
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", color: "rgba(240,232,220,0.75)", maxWidth: "64ch" }}>
            We source what we promise, from where we promise it.
          </p>
        </FadeIn>
      </section>

      <AlternatingFeature
        title="Printed in Nashik"
        titleHi="नाशिक में मुद्रित"
        body="Our tote bags, leaflets, and packaging are printed locally in Nashik, often carrying real Devanagari typography drawn from the city's own newspapers and signage — a small way of keeping the craft rooted where the Yatra happens."
        imageLabel="[Photo: local printing press / Devanagari typography detail]"
      />
      <AlternatingFeature
        title="Sourced with Intention"
        titleHi="श्रद्धा से चुना गया"
        body="Godavari Jal is drawn from the Godavari Ghats, Kalawa thread is tied at Trimbakeshwar Temple, and each diya is lit at Ramkund — every element travels the same path as the pilgrims who carry it home."
        imageLabel="[Photo: Godavari Ghats / Trimbakeshwar Temple / Ramkund sourcing]"
        reverse
      />
      <AlternatingFeature
        title="Made to Keep"
        titleHi="सहेजने के लिए बना"
        body="We build with materials meant to last — canvas, metal, and glass rather than plastic and foil — because a souvenir worth keeping shouldn't be disposable."
        imageLabel="[Photo: durable materials — canvas, metal, glass detail]"
      />

      <style>{`
        .authenticity-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .authenticity-row { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
}
