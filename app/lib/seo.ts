import type { Metadata } from "next";

export const SITE_URL = "https://thekumbhkala.com";
export const DEFAULT_OG_IMAGE = "/home/hero-ramkund.jpg";

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Kumbhkala",
      locale: "en_IN",
      type: "website",
      images: [{ url: image, alt: "Kumbhkala — Kumbh Mela 2027 souvenir kits from Nashik" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
