import { pageMetadata } from "../../lib/seo";
import KitDetailPage from "../../components/KitDetailPage";

export const metadata = pageMetadata({
  title: "Amrit Hamper: Premium Kumbh Mela Souvenir Hamper for Gifting | Kumbhkala",
  description:
    "The Amrit Hamper is Kumbhkala's upcoming Kumbh Mela souvenir hamper. Crafted with care, unveiling soon.",
  path: "/kits/trimbak",
  image: "/products/sangam-kit-closed.png",
});

export default function TrimbakKitPage() {
  return <KitDetailPage slug="trimbak" />;
}
