
"use client";
import PayPalButton from "@/components/PayPalButton";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckout() {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed.");

      // Live mode: once /api/checkout returns a real Shopify checkoutUrl,
      // redirect the browser there instead of showing the mock confirmation:
      //   window.location.href = data.checkoutUrl;

      setStatus("success");
      clearCart();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-content px-6 py-24 text-center lg:px-10">
        <h1 className="font-display text-[30px] text-ink">Order confirmed</h1>
        <p className="mx-auto mt-4 max-w-[46ch] font-body text-[15px] leading-relaxed text-ink-soft">
          Thank you for shopping with PickaBook. Secure download links
          for your purchase have been sent to your email
          (see lib/delivery.js — this is where real links are generated
          after a Shopify "orders/paid" webhook fires).
        </p>
        <Link
          href="/"
          className="mt-8 inline-block border border-ink px-6 py-3 font-body text-[13px] tracking-wide text-ink hover:bg-ink hover:text-paper"
        >
          Back to the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-6 py-14 lg:px-10 lg:py-20">
      <h1 className="font-display text-[32px] text-ink">Checkout</h1>
      <p className="mt-2 font-body text-[14px] text-ink-soft">
        This is a mock checkout for development. Connect Shopify&apos;s
        hosted checkout in app/api/checkout/route.js for real payments.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 border border-line bg-sand/40 px-8 py-14 text-center">
          <p className="font-body text-[15px] text-ink-soft">Your cart is empty.</p>
          <Link
            href="/"
            className="mt-6 inline-block border border-ink px-6 py-3 font-body text-[13px] tracking-wide text-ink hover:bg-ink hover:text-paper"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-5 py-5">
                <PlaceholderImage
                  src={item.image_url}
                  alt={item.title}
                  ratio="aspect-[4/5]"
                  className="w-16 shrink-0"
                />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <p className="font-body text-[14px] text-ink">{item.title}</p>
                    <p className="mt-1 font-body text-[12px] text-ink-soft">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-body text-[14px] text-ink">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-line bg-sand/40 p-7">
            <h2 className="font-display text-[19px] text-ink">Order summary</h2>
            <div className="mt-5 flex items-center justify-between font-body text-[14px] text-ink-soft">
              <span>Subtotal</span>
              <span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-body text-[14px] text-ink-soft">
              <span>Delivery</span>
              <span className="text-ink">Instant, digital</span>
            </div>

<div className="mt-6 border-t border-line pt-6">
  <h3 className="text-lg font-semibold mb-4 text-ink">Mode de paiement</h3>
  <PayPalButton 
    amount={subtotal} 
    onSuccess={(details) => {
      setStatus("success");
      clearCart();
    }} 
  />
</div>
            {status === "error" && (
              <p className="mt-3 font-body text-[13px] text-red-600">{errorMessage}</p>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
