import { pageMetadata } from "../lib/seo";
import FadeIn from "../components/FadeIn";
import ContactForm from "../components/ContactForm";
import Bilingual from "../components/Bilingual";

export const metadata = pageMetadata({
  title: "Contact Kumbhkala — Orders & Enquiries for Kumbh Mela 2027 Kits",
  description:
    "Get in touch with Kumbhkala to pre-book a Sangam or Trimbak Kit, ask about Kumbh Mela 2027 souvenirs, or enquire about gifting. Reach us on WhatsApp or via the form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      <FadeIn>
        <Bilingual
          as="h1"
          en="Get in Touch"
          hi="हमसे जुड़ें"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", marginBottom: "2.5rem" }}
        />
      </FadeIn>

      <div className="contact-grid">
        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div>
            <span className="label" style={{ display: "block", marginBottom: "1rem" }}>
              Contact Details
            </span>
            <div style={{ fontSize: "1rem", lineHeight: 2, color: "var(--color-muted)" }}>
              <p>info@kumbhkala.com</p>
              <p>+91 90227 43147</p>
              <p>Nashik, Maharashtra</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 860px) {
          .contact-grid { grid-template-columns: 1.3fr 0.7fr; }
        }
      `}</style>
    </div>
  );
}
