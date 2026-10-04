import FadeIn from "./FadeIn";
import PlaceholderImage from "./PlaceholderImage";
import Bilingual from "./Bilingual";
import type { KumbhElement } from "../lib/data";

export const ELEMENT_VIDEO_ASPECT = "3 / 4";

export default function ElementGrid({ elements }: { elements: KumbhElement[] }) {
  return (
    <section className="element-grid-section">
      <div className="element-grid-heading">
        <FadeIn>
          <Bilingual as="label" en="Discover the Elements" hi="तत्वों को जानिए" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Every piece has a story."
            hi="हर वस्तु की अपनी एक कहानी है।"
            style={{ margin: "1.25rem 0 0" }}
          />
        </FadeIn>
      </div>

      <div className="element-grid">
        {elements.map((el, i) => (
          <FadeIn key={el.name} delay={i * 0.05}>
            <div className="element-card">
              <div className="element-card-media">
                <PlaceholderImage
                  label={`[Photo: ${el.name}]`}
                  mediaType={el.mediaType ?? "image"}
                  fill
                  rounded={false}
                />
              </div>
              <div className="element-card-body">
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 1.8vw, 2rem)", fontWeight: 600 }}>
                  {el.name}
                </h3>
                <p style={{ fontStyle: "italic", color: "var(--color-muted)", margin: "0.5rem 0 0.75rem", fontSize: "0.95rem" }}>
                  Location: {el.location}
                </p>
                <p style={{ fontSize: "clamp(1rem, 1.1vw, 1.15rem)", lineHeight: 1.65, color: "var(--color-muted)" }}>
                  {el.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style>{`
        .element-grid-section {
          padding-block: clamp(40px, 5vw, 80px);
        }
        .element-grid-heading {
          padding-inline: var(--page-gutter);
          margin-bottom: 2.5rem;
        }
        .element-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(12px, 1.5vw, 24px);
          padding-inline: clamp(12px, 1.5vw, 24px);
        }
        .element-card {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          background: #faf5e9;
          overflow: hidden;
          height: 100%;
        }
        .element-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: ${ELEMENT_VIDEO_ASPECT};
        }
        .element-card-body {
          padding: 1.5rem;
          text-align: left;
        }

        @media (min-width: 560px) {
          .element-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1100px) {
          .element-grid {
            grid-template-columns: repeat(${elements.length}, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
