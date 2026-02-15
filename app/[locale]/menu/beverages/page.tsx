"use client";

import { beverages } from "@/lib/data";
import { useCart } from "@/components/cart/CartContext";
import Image from "next/image";
import Link from "next/link";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function BeveragesPage() {
  const { addItem } = useCart();

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Beverages</h1>

        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 max-w-3xl mx-auto">
          <Link href="/menu/bread" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">BREAD</Link>
          <Link href="/menu/brunch" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">BRUNCH</Link>
          <Link href="/menu/cake" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">CAKE</Link>
          <Link href="/menu/cookies" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">COOKIES</Link>
          <Link href="/menu/dessert" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">DESSERT</Link>
          <Link href="/menu/macaroon" className="w-full text-center px-4 py-2 rounded-full border bg-white truncate">MACAROON</Link>
          <Link href="/menu/beverages" className="w-full text-center px-4 py-2 rounded-full border bg-black text-white truncate">BEVERAGES</Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {beverages.map((b) => (
            <div key={b.id} className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-card">
              {b.image ? (
                <div className="relative w-full aspect-[4/3] md:aspect-square mb-4 rounded-xl overflow-hidden border border-neutral-200">
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-lg">{b.name}</div>
                  {b.description && (
                    <div className="text-sm text-neutral-600 mt-1">{b.description}</div>
                  )}
                </div>
                <div className="font-semibold">${b.price.toFixed(2)}</div>
              </div>
              <div className="mt-4 flex justify-end">
                <LiquidMetalButton
                  size="md"
                  onClick={() =>
                    addItem({ id: `bev_${b.id}`, name: b.name, price: b.price, image: b.image, qty: 1 })
                  }
                >
                  Add to cart
                </LiquidMetalButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


