"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";
import { beverages } from "@/lib/data";

export type ShippingMethod = "shipping" | "pickup";

export interface CartItem {
  id: string;
  name: string;
  price: number; // in USD dollars for simplicity
  image?: string | StaticImageData;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  shippingMethod: ShippingMethod;
  deliveryDate: string | null;
  note?: string;
  pickupLocationId: string | null;
  // customer info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // address
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  setShippingMethod: (m: ShippingMethod) => void;
  setDeliveryDate: (date: string | null) => void;
  setPickupLocationId: (id: string | null) => void;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setEmail: (v: string) => void;
  setPhone: (v: string) => void;
  setAddress1: (v: string) => void;
  setAddress2: (v: string) => void;
  setCity: (v: string) => void;
  setState: (v: string) => void;
  setZip: (v: string) => void;
  subtotal: number;
  shippingFee: number; // simplistic flat rule
  total: number;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("shipping");
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [pickupLocationId, setPickupLocationId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const PERSIST_KEY = "jt_cart_v1";

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = window.localStorage.getItem(PERSIST_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        const byId = new Map(beverages.map((b) => [b.id, b.image] as const));
        const loadedItems: CartItem[] = Array.isArray(data.items) ? data.items : [];
        const hydratedItems = loadedItems.map((it) => {
          if (it.image) return it;
          if (it.id.startsWith("bev_")) {
            const bevId = it.id.slice(4);
            const img = byId.get(bevId);
            if (img) return { ...it, image: img };
          }
          return it;
        });
        setItems(hydratedItems);
        setShippingMethod(data.shippingMethod || "shipping");
        setDeliveryDate(data.deliveryDate ?? null);
        setPickupLocationId(data.pickupLocationId ?? null);
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress1(data.address1 || "");
        setAddress2(data.address2 || "");
        setCity(data.city || "");
        setState(data.state || "");
        setZip(data.zip || "");
      }
    } catch (e) {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    const data = {
      items,
      shippingMethod,
      deliveryDate,
      pickupLocationId,
      firstName,
      lastName,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
    };
    try {
      window.localStorage.setItem(PERSIST_KEY, JSON.stringify(data));
    } catch {}
  }, [hydrated, items, shippingMethod, deliveryDate, pickupLocationId, firstName, lastName, email, phone, address1, address2, city, state, zip]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        const merged: CartItem = {
          ...copy[idx],
          qty: copy[idx].qty + item.qty,
          image: copy[idx].image ?? item.image,
        };
        copy[idx] = merged;
        return copy;
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const shippingFee = shippingMethod === "shipping" ? 15 : 0; // flat demo fee $15
  const total = subtotal + shippingFee;

  const clear = () => setItems([]);

  const value: CartContextValue = {
    items,
    shippingMethod,
    deliveryDate,
    pickupLocationId,
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    addItem,
    removeItem,
    updateQty,
    setShippingMethod,
    setDeliveryDate,
    setPickupLocationId,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setAddress1,
    setAddress2,
    setCity,
    setState,
    setZip,
    subtotal,
    shippingFee,
    total,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


