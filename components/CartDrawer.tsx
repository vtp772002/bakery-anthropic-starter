"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "./cart/CartContext";
import Link from "next/link";

type Props = {
  inlineTrigger?: boolean; // render the Cart button inside this component
  open?: boolean; // controlled open
  onOpenChange?: (open: boolean) => void; // controlled setter
};

export default function CartDrawer({ inlineTrigger = true, open: controlledOpen, onOpenChange }: Props) {
  const {
    items,
    subtotal,
    shippingFee,
    total,
    updateQty,
    removeItem,
  } = useCart();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const qtyTotal = items.reduce((s, i) => s + i.qty, 0);

  // Toggle a body class so other UI can react (e.g., hide chat bubble on desktop)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const className = 'cart-open';
    document.body.classList.toggle(className, open);
    return () => {
      document.body.classList.remove(className);
    };
  }, [open]);

  return (
    <>
      {inlineTrigger && (
        <button
          className="relative btn btn-accent rounded-2xl"
          onClick={() => setOpen(true)}
          aria-label="Open cart"
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {qtyTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2 py-0.5">
              {qtyTotal}
            </span>
          )}
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition ${open ? 'visible' : 'invisible'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 bottom-0 w-[380px] max-w-[90vw] bg-white border-l border-neutral-200 shadow-xl
                      transition-transform ${open ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
        >
          <div className="flex items-center justify-between p-4 border-b border-neutral-200 flex-shrink-0">
            <div className="font-semibold">Your cart</div>
            <button className="p-2" onClick={() => setOpen(false)} aria-label="Close cart">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-sm text-neutral-600">Cart is empty.</div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {it.image ? (
                      <div className="relative w-16 aspect-[4/3] rounded-md overflow-hidden bg-neutral-50 border border-neutral-200 flex-shrink-0">
                        <Image src={it.image} alt={it.name} fill className="object-cover" sizes="64px" />
                      </div>
                    ) : (
                      <div className="w-16 aspect-[4/3] rounded-md bg-neutral-100 border border-neutral-200 flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="font-medium truncate">{it.name}</div>
                      <div className="text-sm text-neutral-600">${it.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      className="w-16 px-2 py-1 border border-neutral-300 rounded"
                      value={it.qty}
                      onChange={(e) => updateQty(it.id, Number(e.target.value))}
                    />
                    <button className="btn btn-ghost" onClick={() => removeItem(it.id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-neutral-200 bg-white flex-shrink-0 pb-[env(safe-area-inset-bottom)]">
            <div className="text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>${shippingFee.toFixed(2)}</span></div>
              <div className="flex justify-between font-medium mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <div className="flex gap-2 pt-3">
              <Link href="/checkout" className="btn btn-accent flex-1 rounded-xl text-center" onClick={() => setOpen(false)}>
                Proceed to checkout
              </Link>
              <button className="btn btn-secondary rounded-xl" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}


