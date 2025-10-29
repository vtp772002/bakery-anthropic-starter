"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import StripeClientProvider from "@/components/StripeClientProvider";
import PaymentForm from "@/components/PaymentForm";
import { useCart } from "@/components/cart/CartContext";
import StyledButton from "@/components/StyledButton";
import { locations } from "@/lib/data";

type StepKey = "customer" | "shipping" | "payment" | "review";
const stepKeys: StepKey[] = ["customer", "shipping", "payment", "review"];

function Stepper({ current, onSelect, unlockedUpTo }: { current: StepKey; onSelect: (s: StepKey) => void; unlockedUpTo: StepKey }) {
  const t = useTranslations('checkout.steps');
  const steps: { key: StepKey; label: string }[] = [
    { key: "customer", label: t('customer') },
    { key: "shipping", label: t('shipping') },
    { key: "payment", label: t('payment') },
    { key: "review", label: t('review') },
  ];

  return (
    <ol className="grid grid-cols-4 gap-3 mb-8">
      {steps.map((s, idx) => {
        const active = s.key === current;
        const currentIdx = steps.findIndex((st) => st.key === current);
        const done = currentIdx > idx;
        const unlocked = idx <= steps.findIndex((st) => st.key === unlockedUpTo);
        return (
          <li
            key={s.key}
            className={`flex items-center justify-center rounded-xl border px-3 py-2 text-sm ${
              active
                ? "border-black font-medium"
                : done
                ? "border-neutral-300 text-neutral-600"
                : unlocked
                ? "border-neutral-200 text-neutral-700"
                : "border-neutral-200 text-neutral-400"
            } ${unlocked ? 'cursor-pointer hover:bg-neutral-50' : 'cursor-not-allowed'}`}
            onClick={() => {
              if (unlocked) onSelect(s.key);
            }}
          >
            <span className="truncate">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const [step, setStep] = useState<StepKey>("customer");
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [payMethod, setPayMethod] = useState<"card" | "google" | "apple">("card");
  // Refs for smoother input navigation via Enter key
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  // Shipping refs
  const pickupSelectRef = useRef<HTMLSelectElement | null>(null);
  const address1Ref = useRef<HTMLInputElement | null>(null);
  const address2Ref = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const zipRef = useRef<HTMLInputElement | null>(null);
  const deliveryDateRef = useRef<HTMLInputElement | null>(null);
  const {
    items,
    shippingMethod,
    setShippingMethod,
    deliveryDate,
    setDeliveryDate,
    subtotal,
    shippingFee,
    total,
    removeItem,
    updateQty,
    firstName,
    lastName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setAddress1,
    setAddress2,
    setCity,
    setState,
    setZip,
    pickupLocationId,
    setPickupLocationId,
  } = useCart();

  useEffect(() => {
    async function ensureClientSecret() {
      if (step !== "payment" || clientSecret) return;
      if (total <= 0) return;
      const res = await fetch("/api/payments/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100), currency: "usd" }),
      });
      if (res.ok) {
        const data = await res.json();
        setClientSecret(data.clientSecret);
      }
    }
    ensureClientSecret();
  }, [step, clientSecret, total]);

  // Completion checks for unlocking and button states
  const customerComplete = Boolean(firstName && lastName && email && phone);
  const shippingComplete = Boolean(
    shippingMethod === 'pickup' ? pickupLocationId : (address1 && city && zip)
  );
  const unlockedUpTo: StepKey = shippingComplete ? 'payment' : customerComplete ? 'shipping' : 'customer';

  return (
    <div className="container py-8 md:py-16 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{t('title')}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-card">
            <Stepper current={step} onSelect={setStep} unlockedUpTo={unlockedUpTo} />

            {step === "customer" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('customer.firstName')}</label>
                    <input
                      ref={firstNameRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={firstName}
                      onChange={(e)=>setFirstName(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          lastNameRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('customer.lastName')}</label>
                    <input
                      ref={lastNameRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={lastName}
                      onChange={(e)=>setLastName(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          emailRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('customer.email')}</label>
                  <input
                    ref={emailRef}
                    type="email"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onKeyDown={(e)=>{
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        phoneRef.current?.focus();
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t('customer.phone')}</label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    value={phone}
                    onChange={(e)=>setPhone(e.target.value)}
                    onKeyDown={(e)=>{
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (firstName && lastName && email && phone) {
                          setStep('shipping');
                        }
                      }
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <StyledButton variant="accent" onClick={() => setStep("shipping")} disabled={!customerComplete}>
                    {t('customer.next')}
                  </StyledButton>
                </div>
              </div>
            )}

            {step === "shipping" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className={`btn rounded-xl ${shippingMethod==='shipping' ? 'btn-accent' : 'btn-secondary'}`} onClick={() => setShippingMethod('shipping')}>
                    Shipping
                  </button>
                  <button type="button" className={`btn rounded-xl ${shippingMethod==='pickup' ? 'btn-accent' : 'btn-secondary'}`} onClick={() => setShippingMethod('pickup')}>
                    Local Pickup
                  </button>
                </div>
                {shippingMethod === 'pickup' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Chọn địa điểm nhận</label>
                    <select
                      ref={pickupSelectRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={pickupLocationId ?? ''}
                      onChange={(e)=>setPickupLocationId(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          deliveryDateRef.current?.focus();
                        }
                      }}
                    >
                      <option value="">-- Chọn địa điểm --</option>
                      {locations.map((loc)=> (
                        <option key={loc.id} value={loc.id}>{loc.name} — {loc.address}, {loc.city}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('shipping.address')}</label>
                    <input
                      ref={address1Ref}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={address1}
                      onChange={(e)=>setAddress1(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          address2Ref.current?.focus();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('shipping.apartment')}</label>
                    <input
                      ref={address2Ref}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={address2}
                      onChange={(e)=>setAddress2(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          cityRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                </div>
                )}
                {shippingMethod === 'shipping' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('shipping.city')}</label>
                    <input
                      ref={cityRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          stateRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('shipping.state')}</label>
                    <input
                      ref={stateRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={state}
                      onChange={(e)=>setState(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          zipRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('shipping.zip')}</label>
                    <input
                      ref={zipRef}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      value={zip}
                      onChange={(e)=>setZip(e.target.value)}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          deliveryDateRef.current?.focus();
                        }
                      }}
                    />
                  </div>
                </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery date</label>
                  <input
                    ref={deliveryDateRef}
                    type="date"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    value={deliveryDate ?? ''}
                    onChange={(e)=>setDeliveryDate(e.target.value)}
                    onKeyDown={(e)=>{
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (shippingComplete) setStep('payment');
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <StyledButton variant="secondary" onClick={() => setStep("customer")}>{t('shipping.prev')}</StyledButton>
                  <StyledButton variant="accent" onClick={() => setStep("payment")} disabled={!shippingComplete}>{t('shipping.next')}</StyledButton>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <p className="text-neutral-600 text-sm">{t('payment.note')}</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="radio" name="method" checked={payMethod==='card'} onChange={()=>setPayMethod('card')} />
                    <span>Pay with credit card</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="method" checked={payMethod==='google'} onChange={()=>setPayMethod('google')} />
                    <span>Pay with Google Pay</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="method" checked={payMethod==='apple'} onChange={()=>setPayMethod('apple')} />
                    <span>Pay with Apple Pay</span>
                  </label>
                </div>
                {clientSecret ? (
                  <StripeClientProvider clientSecret={clientSecret}>
                    <PaymentForm amount={Math.round(total * 100)} currency="usd" method={payMethod} clientSecret={clientSecret} country={"VN"} />
                  </StripeClientProvider>
                ) : (
                  <div className="rounded-xl border border-neutral-200 p-4 text-sm text-neutral-700">
                    {total <= 0 ? (
                      <div>Add items to your cart to start payment.</div>
                    ) : (
                      <div>
                        Initializing payment… If nothing appears, please configure Stripe keys in .env and reload.
                      </div>
                    )}
                  </div>
                )}
                <div className="flex justify-between">
                  <StyledButton variant="secondary" onClick={() => setStep("shipping")}>{t('payment.prev')}</StyledButton>
                  <StyledButton variant="accent" onClick={() => setStep("review")}>{t('payment.next')}</StyledButton>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-4">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="font-medium mb-2">{t('review.summary')}</div>
                  <div className="text-sm text-neutral-600">{t('review.example')}</div>
                </div>
                <div className="flex justify-between">
                  <StyledButton variant="secondary" onClick={() => setStep("payment")}>{t('review.prev')}</StyledButton>
                  <StyledButton variant="accent">{t('review.pay')}</StyledButton>
                </div>
              </div>
            )}
          </div>

          <aside className="md:col-span-1">
            <div className="rounded-2xl border border-neutral-200 p-6 sticky top-24">
              <div className="font-semibold mb-2">{t('sidebar.summary')}</div>
              <div className="text-sm text-neutral-600">{t('sidebar.note')}</div>
              <div className="mt-4 space-y-3">
                {items.length === 0 ? (
                  <div className="text-sm text-neutral-500">Empty cart (demo).</div>
                ) : (
                  items.map((it)=> (
                    <div className="flex flex-wrap gap-3 items-center justify-between" key={it.id}>
                      <div className="min-w-0 flex-1 flex items-start gap-3">
                        {it.image ? (
                          <div className="relative w-14 h-14 rounded-md overflow-hidden bg-neutral-50 border border-neutral-200 flex-shrink-0">
                            <Image src={it.image} alt={it.name} fill className="object-contain p-1" sizes="56px" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-md bg-neutral-100 border border-neutral-200 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="truncate font-medium">{it.name}</div>
                          <div className="text-sm text-neutral-600">${it.price.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <input type="number" className="w-16 px-2 py-1 border border-neutral-300 rounded" value={it.qty} min={1} onChange={(e)=> updateQty(it.id, Number(e.target.value))} />
                        <button className="btn btn-ghost" onClick={()=>removeItem(it.id)}>Remove</button>
                      </div>
                    </div>
                  ))
                )}
                <div className="pt-3 border-t border-neutral-200 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>${shippingFee.toFixed(2)}</span></div>
                  <div className="flex justify-between font-medium mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


