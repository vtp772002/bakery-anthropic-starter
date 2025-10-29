"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

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
    <button 
      onClick={handleUpgrade}
      disabled={loading}
      className={`
        inline-flex items-center justify-center px-6 py-3 
        border border-transparent text-base font-medium rounded-md 
        text-white bg-neutral-800 hover:bg-black 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        `Upgrade to ${planName}`
      )}
    </button>
  );
}
