"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export function LiquidMetalButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <h2 className="text-white text-2xl font-bold mb-4">Edge-Only Liquid Metal Glass Buttons</h2>
      <div className="flex items-center gap-8">
        <LiquidMetalButton label="Get Started" />
        <LiquidMetalButton viewMode="icon" />
      </div>
      <p className="text-white/80 text-sm max-w-md text-center">
        The liquid metal effect now appears only at the edges, creating a clear glass center with animated borders.
      </p>
    </div>
  );
}