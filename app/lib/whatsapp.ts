import { WHATSAPP_NUMBER } from "./config";
import { getKit } from "./data";
import { formatPrice } from "./format";

export interface CartLine {
  kitSlug: string;
  quantity: number;
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp in a new tab. Returns false if the browser blocked it.
 * Don't pass "noopener" in the features string: it makes window.open return
 * null even on success, which would be indistinguishable from a blocked pop-up.
 * We sever the opener manually instead.
 */
export function openWhatsApp(message: string): boolean {
  const w = window.open(whatsappUrl(message), "_blank");
  if (!w) return false;
  try {
    w.opener = null;
  } catch {
    // cross-origin already; nothing to sever
  }
  return true;
}

export function buildOrderMessage(params: {
  items: CartLine[];
  total: number;
  name: string;
  phone: string;
  city?: string;
  notes?: string;
}): string {
  const lines = params.items.flatMap((item) => {
    const kit = getKit(item.kitSlug);
    if (!kit) return [];
    return [`${kit.name} × ${item.quantity}: ${formatPrice(kit.price * item.quantity)}`];
  });

  return [
    "Namaste! I'd like to place a pre-order with Kumbhkala.",
    "",
    "*Order Details:*",
    ...lines,
    "",
    `*Total: ${formatPrice(params.total)}*`,
    "",
    "*Customer Details:*",
    `Name: ${params.name.trim()}`,
    `Phone: ${params.phone.trim()}`,
    `City: ${params.city?.trim() || "Not provided"}`,
    `Notes: ${params.notes?.trim() || "None"}`,
    "",
    "Please confirm availability and next steps. Thank you!",
  ].join("\n");
}

export function buildContactMessage(params: {
  name: string;
  contact: string;
  message: string;
}): string {
  return [
    "Namaste! I have a question via the Kumbhkala website.",
    "",
    `Name: ${params.name.trim()}`,
    `Email/Phone: ${params.contact.trim() || "Not provided"}`,
    "",
    "Message:",
    params.message.trim(),
  ].join("\n");
}

export function buildNewsletterMessage(email: string): string {
  return ["Namaste! Please add me to the Kumbhkala updates list.", `Email: ${email.trim()}`].join(
    "\n",
  );
}
