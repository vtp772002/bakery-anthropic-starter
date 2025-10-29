"use client";

import React, { PropsWithChildren } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

function getStripe() {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    stripePromise = loadStripe(publishableKey || "");
  }
  return stripePromise;
}

export default function StripeClientProvider({ children, clientSecret }: PropsWithChildren & { clientSecret?: string }) {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#b28952",
            colorBackground: "#ffffff",
            colorText: "#0a0a0a",
            colorDanger: "#e11d48",
            fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system',
            borderRadius: "12px",
          },
          rules: {
            '.Input': {
              borderRadius: '12px',
            },
          },
        },
        loader: "always",
      }}
    >
      {children}
    </Elements>
  );
}


