"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getKit } from "../lib/data";
import type { CartLine } from "../lib/whatsapp";

const STORAGE_KEY = "kumbhkala-cart";
const MAX_QTY = 9;

type Action =
  | { type: "hydrate"; items: CartLine[] }
  | { type: "add"; slug: string; qty: number }
  | { type: "update"; slug: string; qty: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n)));

export function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const existing = state.find((i) => i.kitSlug === action.slug);
      if (existing) {
        return state.map((i) =>
          i.kitSlug === action.slug ? { ...i, quantity: clampQty(i.quantity + action.qty) } : i,
        );
      }
      return [...state, { kitSlug: action.slug, quantity: clampQty(action.qty) }];
    }
    case "update":
      return action.qty < 1
        ? state.filter((i) => i.kitSlug !== action.slug)
        : state.map((i) =>
            i.kitSlug === action.slug ? { ...i, quantity: clampQty(action.qty) } : i,
          );
    case "remove":
      return state.filter((i) => i.kitSlug !== action.slug);
    case "clear":
      return [];
  }
}

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (i): i is CartLine =>
          !!i &&
          typeof i.kitSlug === "string" &&
          typeof i.quantity === "number" &&
          !!getKit(i.kitSlug) &&
          !getKit(i.kitSlug)?.comingSoon,
      )
      .map((i) => ({ kitSlug: i.kitSlug, quantity: clampQty(i.quantity) }));
  } catch {
    return [];
  }
}

interface CartContextValue {
  items: CartLine[];
  cartCount: number;
  cartTotal: number;
  addItem: (slug: string, qty: number) => void;
  updateQuantity: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", items: readStored() });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode / quota) — cart still works in memory
    }
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, qty: number) => dispatch({ type: "add", slug, qty }), []);
  const updateQuantity = useCallback(
    (slug: string, qty: number) => dispatch({ type: "update", slug, qty }),
    [],
  );
  const removeItem = useCallback((slug: string) => dispatch({ type: "remove", slug }), []);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = items.reduce(
      (sum, i) => sum + (getKit(i.kitSlug)?.price ?? 0) * i.quantity,
      0,
    );
    return {
      items,
      cartCount,
      cartTotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      drawerOpen,
      openDrawer,
      closeDrawer,
    };
  }, [items, drawerOpen, addItem, updateQuantity, removeItem, clearCart, openDrawer, closeDrawer]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
