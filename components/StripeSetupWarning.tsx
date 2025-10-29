"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function StripeSetupWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if Stripe is properly configured
    const hasPublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
                              process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY !== "pk_test_your_publishable_key_here";
    
    // Only show warning in development and if keys are not set
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment && !hasPublishableKey && !isDismissed) {
      setShowWarning(true);
    }
  }, [isDismissed]);

  if (!showWarning) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700">
            <strong>Stripe not configured:</strong> Please follow the setup guide in{" "}
            <code className="bg-yellow-100 px-1 rounded">STRIPE_SETUP.md</code> to configure your Stripe integration.
          </p>
          <div className="mt-2">
            <div className="text-sm">
              <a
                href="/STRIPE_SETUP.md"
                className="font-medium text-yellow-700 underline hover:text-yellow-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Setup Guide
              </a>
            </div>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              className="inline-flex bg-yellow-50 rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              onClick={() => {
                setIsDismissed(true);
                setShowWarning(false);
              }}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
