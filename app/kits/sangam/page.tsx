import { pageMetadata } from "../../lib/seo";
import KitDetailPage from "../../components/KitDetailPage";

export const metadata = pageMetadata({
  title: "Sangam Kit: Kumbh Mela Souvenir Kit from Nashik | Kumbhkala",
  description:
    "The Sangam Kit is a Kumbh Mela souvenir kit with Godavari Jal, Kalawa thread, Nashik's famous chivda, black raisins, fridge magnet, diya, leaflet and a tote bag.",
  path: "/kits/sangam",
  image: "/products/sangam-kit-closed.png",
});

export default function SangamKitPage() {
  return <KitDetailPage slug="sangam" />;
}
