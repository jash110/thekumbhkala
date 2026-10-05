import type { Metadata } from "next";
import { Playfair_Display, Inter, Yatra_One, Noto_Serif_Devanagari } from "next/font/google";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { NavBrandProvider } from "./components/NavBrandVisibility";
import { CartProvider } from "./components/CartContext";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const yatraOne = Yatra_One({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: "400",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kumbhkala — कुम्भकला",
  description:
    "Kumbhkala — Kumbh Mela souvenir and ritual-kit hampers for Nashik Simhastha 2027.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${yatraOne.variable} ${notoSerifDevanagari.variable}`}
      >
        <NavBrandProvider>
          <CartProvider>
            <Nav />
            {children}
            <Footer />
          </CartProvider>
        </NavBrandProvider>
      </body>
    </html>
  );
}
