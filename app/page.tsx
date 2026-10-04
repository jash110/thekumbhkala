import LogoIntro from "./components/LogoIntro";
import Hero from "./components/Hero";
import KumbhContext from "./components/KumbhContext";
import PrincipleSection from "./components/PrincipleSection";
import FeaturedKits from "./components/FeaturedKits";
import WhyPreBooking from "./components/WhyPreBooking";
import ElementStoriesTeaser from "./components/ElementStoriesTeaser";
import StoryTeaser from "./components/StoryTeaser";
import ClosingCTA from "./components/ClosingCTA";

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
      <ClosingCTA />
    </div>
  );
}
