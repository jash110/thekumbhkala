import Link from "next/link";
import FadeIn from "./FadeIn";
import ElementCard from "./ElementCard";
import Bilingual from "./Bilingual";
import { elements } from "../lib/data";

export default function ElementStoriesTeaser() {
  const teaserElements = elements.slice(0, 3);

  return (
    <section className="section" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <FadeIn>
          <Bilingual as="label" en="The Journey of Each Element" hi="हर तत्व की यात्रा" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Bilingual
            as="h2"
            en="Every piece carries a story."
            hi="हर वस्तु की अपनी एक कहानी है।"
            style={{ margin: "1.25rem 0 0" }}
          />
        </FadeIn>
      </div>

      <div className="teaser-grid">
        {teaserElements.map((el, i) => (
          <FadeIn key={el.name} delay={i * 0.1}>
            <ElementCard {...el} />
          </FadeIn>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <Link href="/our-craft" className="btn btn-outline">
          See the Full Story
        </Link>
      </div>

      <style>{`
        .teaser-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 720px) {
          .teaser-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
