"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "./cart/CartContext";

export default function FloatingCartButton() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const qtyTotal = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open]);

  return (
    <>
      <button
        aria-label="Open cart"
        onClick={() => setOpen(true)}
        className="hide-when-chat-open fixed right-4 bottom-20 md:hidden z-50 rounded-full shadow-cardHover border border-accent bg-accent text-accent-contrast p-3"
      >
        <div className="relative">
          <ShoppingCart />
          {qtyTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] leading-none rounded-full px-1.5 py-0.5">
              {qtyTotal}
            </span>
          )}
        </div>
      </button>
      <CartDrawer inlineTrigger={false} open={open} onOpenChange={setOpen} />
    </>
  );
}


