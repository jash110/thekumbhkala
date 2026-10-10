import { pageMetadata } from "./lib/seo";
import LogoIntro from "./components/LogoIntro";
import Hero from "./components/Hero";
import KumbhContext from "./components/KumbhContext";
import PrincipleSection from "./components/PrincipleSection";
import FeaturedKits from "./components/FeaturedKits";
import WhyPreBooking from "./components/WhyPreBooking";
import ElementStoriesTeaser from "./components/ElementStoriesTeaser";
import StoryTeaser from "./components/StoryTeaser";
import InstagramPopup from "./components/InstagramPopup";
import InstagramBanner from "./components/InstagramBanner";
import ClosingCTA from "./components/ClosingCTA";

export const metadata = pageMetadata({
  title: "Kumbhkala | Kumbh Mela 2027 Souvenir & Ritual Kits from Nashik",
  description:
    "Kumbhkala brings you authentic Kumbh Mela souvenir and ritual kits for Nashik Simhastha Kumbh 2027: Godavari Jal, Trimbakeshwar kalawa, handcrafted keepsakes and more.",
  path: "/",
});

export default function Home() {
  return (
    <div className="home-page">
      <LogoIntro />
      <Hero />
      <KumbhContext />
      <PrincipleSection />
      <FeaturedKits />
      <WhyPreBooking />
      <ElementStoriesTeaser />
      <StoryTeaser />
      <InstagramBanner />
      <ClosingCTA />
      <InstagramPopup />
    </div>
  );
}
