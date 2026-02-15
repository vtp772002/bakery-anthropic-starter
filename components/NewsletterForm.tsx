"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function submit() {
    if (!email || !isValidEmail(email)) {
      setStatus("error");
      setMessage("Email không hợp lệ");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Đã đăng ký thành công!");
        setEmail("");
      } else {
        const data = await res.json();
        setStatus("error");
        setMessage(data.error || "Đăng ký thất bại");
      }
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message || "Đăng ký thất bại");
    }
  }

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          aria-invalid={email !== '' && !isValidEmail(email)}
          className="w-full sm:flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
        />
        <LiquidMetalButton
          type="submit"
          loading={status === 'loading'}
          disabled={status === 'loading'}
          size="md"
        >
          SUBMIT
        </LiquidMetalButton>
      </form>
      {message && (
        <div className={`mt-2 text-sm ${status==='success' ? 'text-green-600' : 'text-rose-600'}`}>{message}</div>
      )}
    </div>
  );
}


