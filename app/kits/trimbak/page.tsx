import { pageMetadata } from "../../lib/seo";
import KitDetailPage from "../../components/KitDetailPage";

export const metadata = pageMetadata({
  title: "Amrit Hamper: Premium Kumbh Mela Souvenir Hamper for Gifting | Kumbhkala",
  description:
    "The Amrit Hamper is a Kumbh Mela souvenir hamper with everything in Sangam (Godavari Jal, Kalawa thread, Nashik's famous chivda, magnet, diya, tote) plus more, in gift-worthy packaging.",
  path: "/kits/trimbak",
  image: "/products/tote-bags-showcase.png",
});

export default function TrimbakKitPage() {
  return <KitDetailPage slug="trimbak" />;
}
