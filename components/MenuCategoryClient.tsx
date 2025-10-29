"use client";

import { useCart } from "@/components/cart/CartContext";
import Image from "next/image";

type Props = {
  categorySlug: string;
  items: { name: string; ingredients?: string[]; image?: string; price?: number }[];
};

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MenuCategoryClient({ categorySlug, items }: Props) {
  const { addItem } = useCart();

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {items.map((item, idx) => {
        const id = `menu_${categorySlug}_${slugify(item.name)}_${idx}`;
        return (
          <div key={id} className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-card">
            {item.image ? (
              <div className="relative w-full aspect-[4/3] md:aspect-square mb-4 rounded-xl overflow-hidden border border-neutral-200">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-lg">{item.name}</div>
                {item.ingredients && item.ingredients.length > 0 ? (
                  <div className="text-sm text-neutral-600 mt-1">
                    {item.ingredients.join(", ")}
                  </div>
                ) : null}
              </div>
              <div className="font-semibold">{typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : ''}</div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-accent rounded-xl"
                onClick={() => addItem({ id, name: item.name, price: typeof item.price === 'number' ? item.price : 0, image: item.image, qty: 1 })}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}


