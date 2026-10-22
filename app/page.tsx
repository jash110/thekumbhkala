import { pageMetadata } from "./lib/seo";
import LogoIntro from "./components/LogoIntro";
import Hero from "./components/Hero";
import KumbhContext from "./components/KumbhContext";
import PrincipleSection from "./components/PrincipleSection";
import FeaturedKits from "./components/FeaturedKits";
import ElementStoriesTeaser from "./components/ElementStoriesTeaser";
import StoryTeaser from "./components/StoryTeaser";
import InstagramBanner from "./components/InstagramBanner";
import ClosingCTA from "./components/ClosingCTA";

export const metadata = pageMetadata({
  title: "Kumbhkala | Kumbh Mela 2027 Gifting Hampers: Sangam & Amrit",
  description:
    "Kumbhkala brings you authentic Kumbh Mela souvenir and ritual kits and Kumbh gifting hampers for Nashik Simhastha Kumbh 2027: Godavari Jal, Trimbakeshwar kalawa, handcrafted keepsakes and more.",
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
      <ElementStoriesTeaser />
      <StoryTeaser />
      <InstagramBanner />
      <ClosingCTA />
    </div>
  );
}
