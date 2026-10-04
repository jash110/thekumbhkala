import Link from "next/link";
import FadeIn from "./FadeIn";
import Bilingual from "./Bilingual";
import { HOME_STORY_TEASER } from "../lib/copy";

export default function StoryTeaser() {
  return (
    <section className="section" style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
      <FadeIn>
        <Bilingual as="label" en="Our Story" hi="हमारी कहानी" />
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ margin: "1.25rem 0 1.5rem" }}>
          Once ToteYatra, now Kumbhkala.
        </h2>
      </FadeIn>
      {HOME_STORY_TEASER.map((line, i) => (
        <FadeIn key={i} delay={0.2 + i * 0.1}>
          <p
            style={{
              fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
              lineHeight: 1.6,
              color: "var(--color-muted)",
              fontStyle: line.italic ? "italic" : "normal",
              marginBottom: i === HOME_STORY_TEASER.length - 1 ? "1.75rem" : "0.5rem",
            }}
          >
            {line.text}
          </p>
        </FadeIn>
      ))}
      <FadeIn delay={0.5}>
        <Link href="/about" className="btn btn-outline">
          Read Our Story
        </Link>
      </FadeIn>
    </section>
  );
}
