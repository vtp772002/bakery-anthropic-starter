"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function CTABand() {
  return (
    <section className="py-10 border-t border-neutral-200 bg-white">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-lg">Fresh daily at 6:30 AM · Preorder by 9 PM</p>
        <LiquidMetalButton 
          size="md"
          onClick={() => window.location.href = '/order'}
        >
          Preorder
        </LiquidMetalButton>
      </div>
    </section>
  );
}
