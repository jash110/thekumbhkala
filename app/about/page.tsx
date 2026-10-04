import FadeIn from "../components/FadeIn";
import PlaceholderImage from "../components/PlaceholderImage";
import HomeImageSlot from "../components/HomeImageSlot";
import Bilingual from "../components/Bilingual";
import { SHLOKA_LINE_1, SHLOKA_LINE_2, SHLOKA_CITATION, ABOUT_SUBHEADING, ABOUT_PARAGRAPHS } from "../lib/copy";

export const metadata = {
  title: "About — Kumbhkala",
};

const team = [
  { name: "[Name]", role: "[Role in one line]" },
  { name: "[Name]", role: "[Role in one line]" },
  { name: "[Name]", role: "[Role in one line]" },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-split">
        <div className="about-text-col">
          <FadeIn>
            <Bilingual as="h1" en="Our Story" hi="हमारी कहानी" style={{ marginBottom: "2rem" }} />
          </FadeIn>

          <FadeIn delay={0.05}>
            <div
              style={{
                borderLeft: "4px solid var(--color-pink)",
                paddingLeft: "1.25rem",
                marginBottom: "2.5rem",
              }}
            >
              <p
                lang="hi"
                style={{
                  fontFamily: "var(--font-hindi)",
                  fontWeight: 600,
                  color: "var(--color-pink)",
                  fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                  lineHeight: 1.7,
                }}
              >
                {SHLOKA_LINE_1}
                <br />
                {SHLOKA_LINE_2}
              </p>
              <p style={{ fontStyle: "italic", fontSize: "1rem", color: "var(--color-muted)", marginTop: "0.75rem" }}>
                {SHLOKA_CITATION}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 style={{ marginBottom: "1.5rem" }}>{ABOUT_SUBHEADING}</h2>
          </FadeIn>
          {ABOUT_PARAGRAPHS.map((para, i) => (
            <FadeIn key={i} delay={0.12 + i * 0.03}>
              <p
                style={{
                  fontSize: "clamp(1.15rem, 1.3vw, 1.45rem)",
                  lineHeight: 1.85,
                  color: "var(--color-muted)",
                  maxWidth: "80ch",
                  marginBottom: "1.2rem",
                  fontStyle: para.italic ? "italic" : "normal",
                }}
              >
                {para.text}
              </p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="about-image-fade">
          <div className="about-image-col">
            <div className="about-image-slot">
              <HomeImageSlot slot="aboutOne" fill rounded={false} />
            </div>
            <div className="about-image-slot">
              <HomeImageSlot slot="aboutTwo" fill rounded={false} />
            </div>
          </div>
        </FadeIn>
      </div>

      <section className="section team-section">
        <FadeIn>
          <Bilingual as="h2" en="Meet the Team" hi="हमारी टीम" style={{ textAlign: "center", marginBottom: "2.5rem" }} />
        </FadeIn>
        <div className="team-grid">
          {team.map((member, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <PlaceholderImage label="[Photo: Team member]" aspectRatio="1 / 1" className="team-circle" />
                <p style={{ marginTop: "1.1rem", fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2vw, 1.9rem)", fontWeight: 600 }}>
                  {member.name}
                </p>
                <p style={{ marginTop: "0.3rem", fontSize: "1.1rem", color: "var(--color-muted)" }}>
                  {member.role}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <style>{`
        .about-split {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .about-text-col {
          padding-left: var(--page-gutter);
        }
        .about-image-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .about-image-slot {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 1000px) {
          .about-split {
            grid-template-columns: 52fr 48fr;
            gap: clamp(16px, 2vw, 32px);
            align-items: stretch;
          }
          .about-image-fade {
            height: 100%;
          }
          .about-image-col {
            height: 100%;
          }
          .about-image-slot {
            aspect-ratio: unset;
            flex: 1;
            min-height: 320px;
          }
        }

        .team-section {
          padding-block: var(--section-space, clamp(56px, 7vw, 104px));
          padding-inline: var(--page-gutter);
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 64px);
        }
        @media (min-width: 700px) {
          .team-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .team-circle {
          width: clamp(200px, 22vw, 380px) !important;
          margin: 0 auto;
          border-radius: 50% !important;
        }
      `}</style>
    </div>
  );
}
