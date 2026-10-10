import { pageMetadata } from "../lib/seo";
import FadeIn from "../components/FadeIn";
import { FAQS } from "../lib/faq";

export const metadata = pageMetadata({
  title: "FAQ: Kumbh Mela 2027 Kits, Pre-Booking & Delivery | Kumbhkala",
  description:
    "Answers to common questions about Kumbhkala's Kumbh Mela 2027 souvenir kits: how to pre-book, Sangam vs Trimbak Kit, sourcing from Nashik, delivery and changes.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "2rem var(--page-gutter) 5rem" }}>
      <FadeIn>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", marginBottom: "2rem" }}>
          Frequently Asked Questions
        </h1>
      </FadeIn>
      <div>
        {FAQS.map((item, i) => (
          <FadeIn key={item.q} delay={Math.min(i, 4) * 0.05}>
            <details className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          </FadeIn>
        ))}
      </div>
      <style>{`
        .faq-item { border-bottom: 1px solid var(--color-border); }
        .faq-item summary {
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 0;
          font-family: var(--font-display);
          font-size: clamp(1.1rem, 1.6vw, 1.3rem);
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after {
          content: "+";
          font-size: 1.5rem;
          line-height: 1;
          color: var(--color-pink);
          flex-shrink: 0;
        }
        .faq-item[open] summary::after { content: "−"; }
        .faq-item p {
          padding-bottom: 1.25rem;
          line-height: 1.75;
          color: var(--color-muted);
          font-size: 1.05rem;
        }
      `}</style>
    </div>
  );
}
