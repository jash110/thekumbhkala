export interface ProductShot {
  label: string;
  src?: string;
  width?: number;
  height?: number;
  videoSrc?: string;
}

export interface Kit {
  slug: "sangam" | "trimbak";
  name: string;
  tagline: string;
  mrp: number; // TODO: replace with final MRP once pricing is confirmed
  price: number; // TODO: replace with final sale price once pricing is confirmed
  description: string;
  whatsInside: string[];
  heroImage: ProductShot;
  productShots: ProductShot[];
}

const sharedItems = [
  "Kondaji Chivda (100g)",
  "Raisins & Dry Fruit (100g)",
  "Fridge Magnet",
  "Leaflet",
  "Tote Bag (1 of 5 designs)",
  "Diya",
  "Kalawa Thread",
  "Godavari Jal (200ml)",
];

const sharedProductShots: ProductShot[] = [
  { label: "Fridge Magnet", src: "/products/fridge-magnet.png", width: 1672, height: 941 },
  { label: "Godavari Jal (200ml)", src: "/products/godavari-jal.png", width: 941, height: 1672 },
  { label: "Kondaji Chivda (100g)", src: "/products/kondaji-chivda.png", width: 941, height: 1672 },
  { label: "Leaflet", src: "/products/leaflet.png", width: 1536, height: 1024 },
  { label: "Tote Bag", src: "/products/tote-bags-showcase.png", width: 1672, height: 941 },
  { label: "Kalawa Thread", src: "/products/Kalawa.png", width: 1441, height: 1092 },
];

export const kits: Kit[] = [
  {
    slug: "sangam",
    name: "Sangam Kit",
    tagline: "The starter set of ritual and remembrance.",
    mrp: 1499, // TODO: placeholder MRP
    price: 1199, // TODO: placeholder price
    description:
      "A curated starter set of ritual and remembrance from the Kumbh Mela.",
    whatsInside: sharedItems,
    heroImage: { label: "Sangam Kit — full hamper" },
    productShots: sharedProductShots,
  },
  {
    slug: "trimbak",
    name: "Trimbak Kit",
    tagline: "Everything in Sangam, elevated for gifting.",
    mrp: 2999, // TODO: placeholder MRP
    price: 2399, // TODO: placeholder price
    description:
      "Everything in Sangam, plus more — in elevated packaging worth gifting.",
    whatsInside: [...sharedItems, "[ADDITIONAL PREMIUM ITEMS — TBD]"],
    heroImage: { label: "Trimbak Kit — full hamper" },
    productShots: sharedProductShots,
  },
];

export function getKit(slug: string): Kit | undefined {
  return kits.find((kit) => kit.slug === slug);
}

export interface KumbhElement {
  name: string;
  location: string;
  description: string;
  mediaType?: "image" | "video";
  videoSrc?: string;
  image?: string;
}

export const elements: KumbhElement[] = [
  {
    name: "Godavari Jal",
    location: "Godavari Ghats, Nashik",
    description:
      "Holy water drawn directly from the Godavari at the Triveni Sangam — the exact confluence where Kumbh pilgrims take their sacred dip. Pour it, keep it, or pass on its blessing; this is Nashik's sanctity, sealed and delivered to your home.",
    mediaType: "video",
    videoSrc: "/products/godavari-jal-video.mp4",
  },
  {
    name: "Kalawa Thread",
    location: "Trimbakeshwar Temple",
    description:
      "Hand-tied in red and yellow at the Trimbakeshwar Temple, the kalawa is worn as a vow of protection and faith. Tie it on, and carry the temple's blessing with you long after Kumbh ends.",
    mediaType: "video",
    videoSrc: "/products/kalawa-video.mp4",
  },
  {
    name: "Fridge Magnet",
    location: "Handcrafted Keepsake, Nashik",
    description:
      "A laser-engraved wooden keepsake of Nashik's sacred skyline — Trimbakeshwar's shikhara and the Godavari ghats, carved to last. Stick it on your fridge and relive Kumbh every single day.",
    image: "/products/fridge-magnet.png",
    mediaType: "video",
    videoSrc: "/products/fridge-magnet-video.mp4",
  },
  {
    name: "Newspaper Tote Bag",
    location: "Printed in Nashik",
    description:
      "Carried everywhere, remembered forever — this tote is printed like a pilgrim's passport, stamped with Kumbh 2027's sacred sites. Not just a bag — a story you'll tell for years.",
    mediaType: "video",
    videoSrc: "/products/tote-bag-video.mp4",
  },
];
