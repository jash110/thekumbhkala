export interface HomeImageSlot {
  label: string;
  aspect?: string;
  src?: string;
  objectPosition?: string;
  sizes?: string;
}

// Drop-in system: set `src` once the real photo exists in public/home/.
// Leave it commented out until then so nothing 404s.
export const homeImages: Record<string, HomeImageSlot> = {
  hero: {
    label:
      "[Photo: Ramkund ghat on the Godavari at dawn during Kumbh, pilgrims in the river, saffron flags, floating diyas, temple spires in mist]",
    src: "/home/hero-ramkund.jpg",
  },
  kumbhContext: {
    label:
      "[Photo: Trimbakeshwar temple, stone shikhara, devotees at the entrance, warm evening light]",
    aspect: "4 / 5",
    src: "/home/kumbh-trimbakeshwar.jpg",
  },
  aboutOne: {
    label: "[Photo: closed Bhagavad Gita with a peacock feather bookmark on a modern study desk]",
    aspect: "4 / 5",
    src: "/about/gita-mor-pankh.jpg",
    objectPosition: "50% 55%",
    sizes: "(min-width: 1000px) 48vw, 100vw",
  },
  aboutTwo: {
    label: "[Photo: young woman seated on the Ramkund steps at dawn]",
    aspect: "4 / 5",
    src: "/about/ramkund-steps.jpg",
    objectPosition: "50% 55%",
    sizes: "(min-width: 1000px) 48vw, 100vw",
  },
};
