"use client";

import Link from "next/link";
import { breadFactoryMenuCategories } from "@/lib/menu";

export default function MenuIndexPage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Menu</h1>

        <div className="grid sm:grid-cols-2 gap-4">
          {breadFactoryMenuCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/menu/${c.slug}`}
              className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-card hover:shadow-lg transition"
            >
              <div className="text-sm uppercase tracking-wider text-neutral-500">Danh mục</div>
              <div className="mt-2 text-xl font-medium">{c.name}</div>
              <div className="mt-2 text-neutral-600 text-sm">
                {c.items.length} sản phẩm
              </div>
            </Link>
          ))}
          {/* Beverages tile */}
          <Link
            href="/menu/beverages"
            className="rounded-2xl border border-neutral-200 p-6 bg-white shadow-card hover:shadow-lg transition"
          >
            <div className="text-sm uppercase tracking-wider text-neutral-500">Danh mục</div>
            <div className="mt-2 text-xl font-medium">BEVERAGES</div>
            <div className="mt-2 text-neutral-600 text-sm">5 sản phẩm</div>
          </Link>
        </div>
      </div>
    </div>
  );
}


