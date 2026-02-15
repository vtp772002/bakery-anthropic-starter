"use client";

import { useEffect, useMemo, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

type Method = "card" | "google" | "apple";

export default function PaymentForm({ amount, currency = "usd", method, onAvailabilityChange, clientSecret, country = "US" }: { amount: number; currency?: string; method: Method; onAvailabilityChange?: (a: { google: boolean; apple: boolean; any: boolean }) => void; clientSecret?: string; country?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [availability, setAvailability] = useState<{ google: boolean; apple: boolean; any: boolean }>({ google: false, apple: false, any: false });
  const [nameOnCard, setNameOnCard] = useState("");

  const paymentRequest = useMemo(() => {
    if (!stripe) return null;
    const pr = stripe.paymentRequest({
      country,
      currency,
      total: { label: "JT Bakery", amount },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    pr.canMakePayment().then((res) => {
      const next = {
        google: Boolean((res as any)?.googlePay),
        apple: Boolean((res as any)?.applePay),
        any: !!res,
      };
      setAvailability(next);
      onAvailabilityChange?.(next);
    });
    return pr;
  }, [stripe, amount, currency, country, onAvailabilityChange]);

  // Bind Apple Pay / Payment Request flow to confirm the PaymentIntent using the client secret
  useEffect(() => {
    if (!stripe || !paymentRequest || !clientSecret) return;

    const handlePaymentMethod = async (ev: any) => {
      try {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: ev.paymentMethod.id,
        }, {
          handleActions: false,
        });

        if (result.error) {
          ev.complete('fail');
          setMessage(result.error.message || 'Payment failed');
          return;
        }

        ev.complete('success');

        if (result.paymentIntent && result.paymentIntent.status === 'requires_action') {
          const next = await stripe.confirmCardPayment(clientSecret);
          if (next.error) {
            setMessage(next.error.message || 'Payment failed');
            return;
          }
        }

        // Success - redirect similar to card flow
        window.location.href = `${window.location.origin}/checkout?status=success`;
      } catch (e: any) {
        ev.complete('fail');
        setMessage(e?.message || 'Payment failed');
      }
    };

    paymentRequest.on('paymentmethod', handlePaymentMethod);

    return () => {
      // Stripe's PaymentRequest doesn't expose .off; relying on GC when component unmounts
      // to avoid duplicate bindings, we recreate paymentRequest via deps and effect re-runs.
    };
  }, [stripe, paymentRequest, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setMessage(null);

    if (method === "card") {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?status=success`,
        },
      });
      if (error) setMessage(error.message || "Payment failed");
    } else {
      // PRB handled by its own button; no submit here
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {(method === "google" || method === "apple") && paymentRequest && availability.any && (
        <div className="pt-2">
          <div className="rounded-2xl border border-accent/30 bg-white p-3 shadow-card">
            <div className="w-full max-w-sm mx-auto">
              <PaymentRequestButtonElement
                options={{
                  paymentRequest,
                  style: {
                    paymentRequestButton: {
                      type: 'buy',
                      theme: 'dark',
                      height: '48px',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}

      {method === "card" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              placeholder="Name on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
            />
          </div>
          <PaymentElement id="payment-element" />
          {message && <div className="text-sm text-rose-600">{message}</div>}
          <LiquidMetalButton 
            type="submit"
            disabled={!stripe || loading}
            loading={loading}
            fullWidth
          >
            Pay now
          </LiquidMetalButton>
        </form>
      )}
      {(method === "google" && !availability.google) && (
        <div className="text-sm text-neutral-600">Google Pay is not available on this device/browser.</div>
      )}
      {(method === "apple" && !availability.apple) && (
        <div className="text-sm text-neutral-600">Apple Pay is not available on this device/browser.</div>
      )}
    </div>
  );
}


