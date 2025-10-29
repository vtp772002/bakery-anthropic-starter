"use client";

import { useState } from "react";

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
    <button 
      onClick={handlePortal}
      disabled={loading}
      className={`
        inline-flex items-center justify-center px-4 py-2 
        border border-gray-300 text-sm font-medium rounded-md 
        text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        children || "Manage Billing"
      )}
    </button>
  );
}
