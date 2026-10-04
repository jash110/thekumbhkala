import Image from "next/image";
import FadeIn from "./FadeIn";
import PlaceholderImage from "./PlaceholderImage";
import ProductShowcase from "./ProductShowcase";
import KitPurchasePanel from "./KitPurchasePanel";
import ElementGrid from "./ElementGrid";
import Bilingual from "./Bilingual";
import { getKit, elements } from "../lib/data";
import type { ProductShot } from "../lib/data";
import { notFound } from "next/navigation";

function findShotForItem(item: string, shots: ProductShot[]): ProductShot | undefined {
  return shots.find((shot) => {
    const keyword = shot.label.replace(/\s*\(.*?\)\s*/g, "").toLowerCase();
    return item.toLowerCase().includes(keyword);
  });
}

export default function KitDetailPage({ slug }: { slug: "sangam" | "trimbak" }) {
  const kit = getKit(slug);
  if (!kit) notFound();

  const isTrimbak = slug === "trimbak";
  const kitHindiName = isTrimbak ? "त्र्यंबक किट" : "संगम किट";
  const displayElements = isTrimbak
    ? [
        ...elements,
        { name: "[Additional premium element — TBD]", location: "TBD", description: "A premium ritual element exclusive to the Trimbak Kit, to be finalized before launch." },
      ]
    : elements;

  return (
    <div className="kit-page">
      <section className="kit-top-section">
        <div className="kit-top-image-col">
          <FadeIn className="kit-top-image-fade">
            <PlaceholderImage
              label={`[Photo: ${kit.name} - full hamper]`}
              fill
              rounded={false}
            />
          </FadeIn>
          <p className="kit-top-caption">Box: [DIMENSIONS PLACEHOLDER]</p>
        </div>

        <div className="kit-top-text-col">
          <FadeIn delay={0.15}>
            <span className="label">{isTrimbak ? "Premium Kit" : "Starter Kit"}</span>
            <Bilingual
              as="h1"
              en={kit.name}
              hi={kitHindiName}
              style={{ fontSize: "clamp(2.8rem, 5vw, 5.2rem)", margin: "0.75rem 0 1.25rem" }}
            />
            <KitPurchasePanel kit={kit} />

            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-border)" }}>
              <Bilingual as="label" en="What's Inside" hi="अंदर क्या है" style={{ display: "block", marginBottom: "1rem" }} />
              <ul className="whats-inside-list">
                {kit.whatsInside.map((item) => {
                  const isPlaceholder = item.includes("TBD");
                  const matchedShot = findShotForItem(item, kit.productShots);
                  return (
                    <li
                      key={item}
                      style={{
                        fontSize: "1.1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.85rem",
                        fontStyle: isPlaceholder ? "italic" : "normal",
                        color: isPlaceholder ? "var(--color-gold)" : "var(--color-ink)",
                      }}
                    >
                      {matchedShot?.src ? (
                        <span
                          style={{
                            position: "relative",
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={matchedShot.src}
                            alt={matchedShot.label}
                            fill
                            sizes="60px"
                            style={{ objectFit: "cover" }}
                          />
                        </span>
                      ) : (
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: isTrimbak ? "var(--color-gold)" : "var(--color-marigold)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProductShowcase shots={kit.productShots} />

      <ElementGrid elements={displayElements} />

      <style>{`
        .kit-page {
          padding-block: 1.5rem 2rem;
        }

        .kit-top-section {
          display: flex;
          flex-direction: column;
        }
        .kit-top-image-col {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }
        .kit-top-image-fade {
          height: 100%;
        }
        .kit-top-caption {
          font-size: 0.95rem;
          color: var(--color-muted);
          margin-top: 0.6rem;
          padding-inline: var(--page-gutter);
        }
        .kit-top-text-col {
          padding-inline: var(--page-gutter);
          padding-block: clamp(32px, 4vw, 56px);
        }
        .whats-inside-list {
          display: grid;
          gap: 0.9rem;
        }

        @media (min-width: 900px) {
          .kit-top-section {
            flex-direction: row;
            align-items: stretch;
            min-height: clamp(560px, 80svh, 900px);
          }
          .kit-top-image-col {
            width: 50%;
            flex-shrink: 0;
            aspect-ratio: unset;
          }
          .kit-top-caption {
            position: absolute;
            bottom: 0.9rem;
            left: 0.9rem;
            margin-top: 0;
            padding-inline: 0;
            padding: 0.35rem 0.7rem;
            background: rgba(240, 232, 220, 0.85);
            border-radius: 8px;
            font-size: 0.95rem;
          }
          .kit-top-text-col {
            width: 50%;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: clamp(28px, 4vw, 72px);
            padding-right: var(--page-gutter);
            padding-block: 0;
          }
          .whats-inside-list {
            grid-template-columns: 1fr 1fr;
            gap: 1rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
