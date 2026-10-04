import FadeIn from "./FadeIn";
import Bilingual from "./Bilingual";
import { PRINCIPLE_TEXT } from "../lib/copy";

export default function PrincipleSection() {
  return (
    <section className="section" style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
      <FadeIn>
        <Bilingual as="label" en="Our Principle" hi="हमारा सिद्धांत" />
      </FadeIn>
      <FadeIn delay={0.1}>
        <Bilingual
          as="h2"
          en="More than souvenirs — an experience you carry home."
          hi="सिर्फ़ यादगार नहीं — एक अनुभव जो आप घर ले जाएँ।"
          style={{ margin: "1.25rem 0 1.5rem" }}
        />
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{ fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)", lineHeight: 1.8, color: "var(--color-muted)", maxWidth: "760px", margin: "0 auto" }}>
          {PRINCIPLE_TEXT}
        </p>
      </FadeIn>
    </section>
  );
}
