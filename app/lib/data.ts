export interface ProductShot {
  label: string;
  src?: string;
  width?: number;
  height?: number;
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
}

export const elements: KumbhElement[] = [
  {
    name: "Godavari Jal",
    location: "Godavari Ghats, Nashik",
    description:
      "Sacred river water carried home as a living memory of the Kumbh pilgrimage, representing the Dakshin Ganga's blessing.",
    mediaType: "video",
  },
  {
    name: "Kalawa Thread",
    location: "Trimbakeshwar Temple",
    description:
      "A sacred red-and-yellow thread tied during rituals, symbolizing protection and a vow kept through the Yatra.",
    mediaType: "video",
  },
  {
    name: "Diya",
    location: "Ramkund, Nashik",
    description:
      "A hand-lit lamp representing the light offered during aarti at the ghats, carried onward as a keepsake of devotion.",
    mediaType: "video",
  },
  {
    name: "Newspaper Tote Bag",
    location: "Printed in Nashik",
    description:
      "A canvas tote printed in a vintage newspaper layout of real Kumbh 2027 headlines — one of five collectible designs.",
    mediaType: "video",
  },
];
