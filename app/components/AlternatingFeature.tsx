import FadeIn from "./FadeIn";
import PlaceholderImage from "./PlaceholderImage";
import SplitSection from "./SplitSection";
import Bilingual from "./Bilingual";

interface AlternatingFeatureProps {
  title: string;
  titleHi?: string;
  body: string;
  imageLabel: string;
  reverse?: boolean;
}

export default function AlternatingFeature({ title, titleHi, body, imageLabel, reverse = false }: AlternatingFeatureProps) {
  return (
    <SplitSection
      imageSide={reverse ? "left" : "right"}
      imageAspect="4 / 3"
      imageWidthPercent={55}
      image={<PlaceholderImage label={imageLabel} fill rounded={false} />}
    >
      <FadeIn>
        {titleHi ? (
          <Bilingual as="h3" en={title} hi={titleHi} style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.2rem)", marginBottom: "1rem" }} />
        ) : (
          <h3 style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.2rem)", marginBottom: "1rem" }}>{title}</h3>
        )}
        <p style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)", lineHeight: 1.75, color: "var(--color-muted)", maxWidth: "64ch" }}>
          {body}
        </p>
      </FadeIn>
    </SplitSection>
  );
}
