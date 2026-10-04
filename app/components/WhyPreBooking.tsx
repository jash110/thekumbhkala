import FadeIn from "./FadeIn";
import Bilingual from "./Bilingual";

const reasons = [
  {
    glyph: "✦",
    title: "Made for This Kumbh",
    description: "Assembled specifically for Simhastha 2027, not generic year-round stock.",
  },
  {
    glyph: "◈",
    title: "Limited Quantities",
    description: "Small batches to keep every piece genuine.",
  },
  {
    glyph: "ॐ",
    title: "Elements Sourced On-Site",
    description: "Ritual items sourced directly from Nashik's ghats and temples.",
  },
  {
    glyph: "⚑",
    title: "Reserve Your Place",
    description: "Pre-booking guarantees arrival well ahead of Mela dates.",
  },
];

export default function WhyPreBooking() {
  return (
    <section className="section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <FadeIn>
          <Bilingual as="label" en="Why Pre-Book?" hi="अभी क्यों बुक करें?" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Reserve ahead of Simhastha 2027."
            hi="सिंहस्थ २०२७ से पहले अपना किट सुरक्षित करें।"
            style={{ margin: "1.25rem 0 0" }}
          />
        </FadeIn>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, i) => (
          <FadeIn key={reason.title} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-marigold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.1rem",
                  fontSize: "1.3rem",
                  color: "var(--color-marigold)",
                }}
              >
                {reason.glyph}
              </div>
              <h3 style={{ marginBottom: "0.5rem" }}>{reason.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-muted)" }}>
                {reason.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <style>{`
        .reasons-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }
        @media (min-width: 640px) {
          .reasons-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .reasons-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  );
}
