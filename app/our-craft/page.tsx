import { pageMetadata } from "../lib/seo";
import FadeIn from "../components/FadeIn";
import CollaborationCarousel from "../components/CollaborationCarousel";
import AlternatingFeature from "../components/AlternatingFeature";
import Bilingual from "../components/Bilingual";
import ElementGrid from "../components/ElementGrid";
import { elements } from "../lib/data";

const COLLABORATION_STORY = [
  "We’re delighted to have collaborated with Carbide India to bring a little piece of Nashik to their international guests from Taiwan.",
  "During a B2B meeting at AIMA Nashik, Carbide India chose Kumbh Kala to share the essence of Nashik through a thoughtfully curated souvenir.",
  "For us, this collaboration is more than a gifting opportunity - it is a way of taking our history, traditions and culture beyond its borders.",
  "We’re grateful to Carbide India for trusting Kumbh Kala to represent the spirit of this city.",
  "Here’s to more collaborations that carry a piece of our culture wherever they go.",
];

export const metadata = pageMetadata({
  title: "Our Craft: Authentic Kumbh Mela Souvenirs Sourced in Nashik | Kumbhkala",
  description:
    "See how Kumbhkala's Kumbh 2027 souvenirs are made: Godavari Jal from the Nashik ghats, kalawa tied at Trimbakeshwar, laser-engraved magnets and tote bags printed in Nashik.",
  path: "/our-craft",
  image: "/our-craft/collaboration-1.jpg",
});

export default function OurCraftPage() {
  return (
    <div>
      <div className="craft-top">
        <div>
          <FadeIn>
            <span className="label">How Kumbhkala Is Made</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Bilingual
              as="h1"
              en="Our Craft"
              hi="हमारी कारीगरी"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", margin: "1rem 0 0" }}
            />
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <h2 style={{ marginBottom: "1.25rem" }}>
              What Authenticity Means to Us
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.75, color: "var(--color-muted)", maxWidth: "64ch" }}>
              Every element in a Kumbhkala kit is sourced with intention, not
              convenience. We work directly with vendors, temple trusts, and
              printers in and around Nashik so that what reaches you is what
              we said it would be: the same water, the same thread, the
              same soil that the Yatra itself moves through.
            </p>
          </FadeIn>
        </div>
        <div>
          <FadeIn>
            <Bilingual as="h2" en="Our First Collaboration" hi="हमारी कहानियाँ" hiSize="max(1.2rem, calc(0.62 * clamp(2rem, 4vw, 3.6rem)))" style={{ marginBottom: "1.25rem" }} />
            {COLLABORATION_STORY.map((text) => (
              <p
                key={text}
                style={{ color: "var(--color-muted)", lineHeight: 1.75, marginBottom: "1rem", maxWidth: "64ch" }}
              >
                {text}
              </p>
            ))}
          </FadeIn>
        </div>
        <FadeIn delay={0.1} className="collab-media">
          <CollaborationCarousel fill />
        </FadeIn>
      </div>

      <ElementGrid elements={elements} />

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
        body="Our tote bags, leaflets, and packaging are printed locally in Nashik, often carrying real Devanagari typography drawn from the city's own newspapers and signage, a small way of keeping the craft rooted where the Yatra happens."
        imageLabel="[Photo: local printing press / Devanagari typography detail]"
        imageSrc="/our-craft/printng-press.png"
        imageAlt="Printing press at work in Nashik"
      />
      <AlternatingFeature
        title="Sourced with Intention"
        titleHi="श्रद्धा से चुना गया"
        body="Godavari Jal is drawn from the Godavari Ghats, Kalawa thread is tied at Trimbakeshwar Temple, and each diya is lit at Ramkund, and every element travels the same path as the pilgrims who carry it home."
        imageLabel="[Photo: Godavari Ghats / Trimbakeshwar Temple / Ramkund sourcing]"
        imageSrc="/our-craft/godavari-jal-sourcing.png"
        imageAlt="Godavari Jal being sourced at the Godavari ghats"
        reverse
      />
      <AlternatingFeature
        title="Made to Keep"
        titleHi="सहेजने के लिए बना"
        body="We build with materials meant to last (canvas, metal, and glass rather than plastic and foil) because a souvenir worth keeping shouldn't be disposable."
        imageLabel="[Photo: durable materials: canvas, metal, glass detail]"
        imageSrc="/our-craft/fridge-magnet-carving.png"
        imageAlt="Fridge magnet being carved"
      />

      <style>{`
        .craft-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 2rem var(--page-gutter) clamp(24px, 3vw, 48px);
        }
        .collab-media {
          position: relative;
          aspect-ratio: 3 / 2;
        }
        @media (min-width: 768px) {
          .craft-top {
            grid-template-columns: 1fr 1fr;
            gap: clamp(2rem, 4vw, 4rem);
            align-items: start;
          }
          /* photo stretches to the text column's height; images cover-crop, never distort */
          .collab-media {
            align-self: stretch;
            aspect-ratio: auto;
            min-height: 320px;
          }
        }
      `}</style>
    </div>
  );
}
