import { kits, elements } from "./data";

export type SearchResultType = "Kit" | "What's Inside item" | "Element";

export interface SearchEntry {
  id: string;
  type: SearchResultType;
  label: string;
  detail: string;
  href: string;
  /** Text that counts as a hit but is not the label. */
  extra: string;
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const kit of kits) {
    entries.push({
      id: `kit-${kit.slug}`,
      type: "Kit",
      label: kit.name,
      detail: kit.tagline,
      href: `/kits/${kit.slug}`,
      extra: kit.description,
    });
  }

  // Items are shared across kits; link each to the first kit that lists it.
  const seenItems = new Set<string>();
  for (const kit of kits) {
    for (const item of kit.whatsInside) {
      if (item.startsWith("[") || seenItems.has(item)) continue;
      seenItems.add(item);
      entries.push({
        id: `item-${item}`,
        type: "What's Inside item",
        label: item,
        detail: `Inside the ${kit.name}`,
        href: `/kits/${kit.slug}`,
        extra: "",
      });
    }
  }

  for (const el of elements) {
    entries.push({
      id: `element-${el.name}`,
      type: "Element",
      label: el.name,
      detail: el.location,
      href: `/kits/${kits[0].slug}`,
      extra: el.description,
    });
  }

  return entries;
}

const INDEX = buildIndex();

/** Case-insensitive partial match. Label hits rank above detail/description hits. */
export function searchSite(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of INDEX) {
    const label = entry.label.toLowerCase();
    let score = 0;
    if (label.startsWith(q)) score = 3;
    else if (label.includes(q)) score = 2;
    else if (entry.detail.toLowerCase().includes(q) || entry.extra.toLowerCase().includes(q)) score = 1;
    if (score > 0) scored.push({ entry, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.entry);
}
