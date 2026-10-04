import FadeIn from "./FadeIn";
import HomeImageSlot from "./HomeImageSlot";
import SplitSection from "./SplitSection";
import Bilingual from "./Bilingual";

const stats = [
  { stat: "12", label: "Years Between Each Simhastha Kumbh at Nashik" },
  { stat: "4", label: "Sacred Cities That Host the Kumbh Mela" },
  { stat: "1 of 12", label: "Trimbakeshwar — A Jyotirlinga of Lord Shiva" },
];

export default function KumbhContext() {
  return (
    <section id="kumbh-context" style={{ marginTop: "clamp(32px, 3.4vw, 56px)" }}>
      <SplitSection
        imageSide="left"
        imageAspect="4 / 5"
        breakpoint={900}
        className="kumbh-split"
        image={<HomeImageSlot slot="kumbhContext" fill rounded={false} objectPosition="50% 35%" />}
      >
        <FadeIn>
          <Bilingual as="label" en="Simhastha 2027 · Nashik" hi="सिंहस्थ २०२७ · नाशिक" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Once every twelve years, the river remembers."
            hi="बारह वर्षों में एक बार, नदी स्मरण करती है।"
            style={{ lineHeight: 1.25, margin: "1.25rem 0 1.5rem" }}
          />
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.8, color: "var(--color-muted)", marginBottom: "1.1rem" }}>
            The Kumbh Mela is one of the largest gatherings of faith on Earth —
            a pilgrimage that returns to four sacred cities once every twelve
            years, following a cycle tied to the positions of Jupiter and the
            Sun. In 2027, that cycle brings the Simhastha Kumbh to Nashik, on
            the banks of the Godavari river, often called the Dakshin Ganga —
            the Ganges of the South.
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <p style={{ fontSize: "1.08rem", lineHeight: 1.8, color: "var(--color-muted)", marginBottom: "2.25rem" }}>
            Pilgrims will gather at Trimbakeshwar, one of the twelve
            Jyotirlingas of Lord Shiva, and take the sacred Shahi Snan at
            Ramkund, believed to wash away lifetimes of karma. Millions will
            arrive from across India and the world, carrying nothing but
            intention — and leaving with memories that last another twelve
            years. Kumbhkala exists to hold a small piece of that memory in
            your hands, long after the crowds have gone home. This is where
            that journey begins.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="stats-row">
            {stats.map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "var(--color-marigold)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.stat}
                </p>
                <p style={{ fontSize: "0.95rem", color: "var(--color-muted)", lineHeight: 1.4 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </SplitSection>

      <style>{`
        .stats-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 480px) {
          .stats-row { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 900px) {
          .kumbh-split .split-image-col {
            aspect-ratio: unset !important;
          }
          .kumbh-split .split-text-col {
            padding-block: clamp(48px, 6vw, 96px);
            min-height: 520px;
          }
          .kumbh-split .split-text-inner {
            max-width: 620px;
          }
        }
      `}</style>
    </section>
  );
}
