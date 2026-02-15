"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "./cart/CartContext";
import { LiquidMetalButton } from "./ui/liquid-metal-button";

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
      <div className="hide-when-chat-open fixed right-4 bottom-20 md:hidden z-50">
        <LiquidMetalButton
          size="md"
          onClick={() => setOpen(true)}
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingCart />
            {qtyTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] leading-none rounded-full px-1.5 py-0.5">
                {qtyTotal}
              </span>
            )}
          </div>
        </LiquidMetalButton>
      </div>
      <CartDrawer inlineTrigger={false} open={open} onOpenChange={setOpen} />
    </>
  );
}


