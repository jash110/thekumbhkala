import FadeIn from "./FadeIn";
import { INSTAGRAM_URL } from "../lib/config";

export default function InstagramBanner() {
  return (
    <section
      style={{
        padding: "clamp(48px, 6vw, 88px) var(--page-gutter)",
        background: "linear-gradient(165deg, var(--color-pink) 0%, var(--color-pink-deep) 100%)",
        textAlign: "center",
      }}
    >
      <FadeIn>
        <h2
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 700,
            color: "var(--color-cream)",
            marginBottom: "0.9rem",
          }}
        >
          Follow Our Journey on Instagram
        </h2>
        <p
          style={{
            fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
            lineHeight: 1.6,
            color: "var(--color-pink-soft)",
            maxWidth: "56ch",
            margin: "0 auto 1.75rem",
          }}
        >
          We share Kumbh 2027 dates and educational stories about Nashik&apos;s traditions. Follow{" "}
          <strong>@thekumbhkala</strong> to stay in the loop.
        </p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-cream">
          Follow on Instagram
        </a>
      </FadeIn>
    </section>
  );
}
