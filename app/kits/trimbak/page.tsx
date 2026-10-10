import { pageMetadata } from "../../lib/seo";
import KitDetailPage from "../../components/KitDetailPage";

export const metadata = pageMetadata({
  title: "Trimbak Kit: Premium Kumbh Mela Souvenir Kit for Gifting | Kumbhkala",
  description:
    "The Trimbak Kit is a Kumbh Mela souvenir kit with everything in Sangam (Godavari Jal, Kalawa thread, Kondaji Chivda, magnet, diya, tote) plus more, in gift-worthy packaging.",
  path: "/kits/trimbak",
  image: "/products/tote-bags-showcase.png",
});

export default function TrimbakKitPage() {
  return <KitDetailPage slug="trimbak" />;
}
