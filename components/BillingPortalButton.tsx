"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

interface BillingPortalButtonProps {
  customerId: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BillingPortalButton({ 
  customerId, 
  className = "",
  children 
}: BillingPortalButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePortal = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { 
          "content-type": "application/json" 
        },
        body: JSON.stringify({ customerId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LiquidMetalButton
      size="md"
      onClick={handlePortal}
      disabled={loading}
      loading={loading}
    >
      {loading ? "Loading..." : (children || "Manage Billing")}
    </LiquidMetalButton>
  );
}
