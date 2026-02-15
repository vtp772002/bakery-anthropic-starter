"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface UpgradeButtonProps {
  priceId: string;
  email?: string;
  customerId?: string;
  planName: string;
  className?: string;
  children?: React.ReactNode;
}

export default function UpgradeButton({ 
  priceId, 
  email, 
  customerId, 
  planName,
  className = "",
  children 
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { 
          "content-type": "application/json" 
        },
        body: JSON.stringify({ 
          priceId, 
          email, 
          customerId 
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { id } = await response.json();
      const stripe = await stripePromise;
      
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  // If children is provided, render it as a wrapper with onClick
  if (children) {
    return (
      <div onClick={handleUpgrade} className={className}>
        {children}
      </div>
    );
  }

  // Otherwise render the default button
  return (
    <LiquidMetalButton
      size="md"
      onClick={handleUpgrade}
      disabled={loading}
      loading={loading}
    >
      {loading ? "Processing..." : `Upgrade to ${planName}`}
    </LiquidMetalButton>
  );
}
