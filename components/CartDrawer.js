"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PlaceholderImage from "./PlaceholderImage";

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <button
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[1px]"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md animate-drawer-in flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-[19px] text-ink">Your cart</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center border border-line hover:border-clay-dark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="font-body text-[15px] text-ink-soft">
              Your cart is empty. Explore the collection to find something to read next.
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <PlaceholderImage
                    src={item.image_url}
                    alt={item.title}
                    ratio="aspect-[4/5]"
                    className="w-20 shrink-0"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-body text-[14px] text-ink">{item.title}</p>
                      <p className="mt-1 font-body text-[13px] text-ink-soft">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink-soft hover:text-ink"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-7 text-center font-body text-[13px] text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-ink-soft hover:text-ink"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-body text-[12px] text-ink-soft underline decoration-sand-deep underline-offset-4 hover:text-clay-dark"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-6 py-6">
          <div className="mb-4 flex items-center justify-between font-body text-[15px] text-ink">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={`block w-full border py-3 text-center font-body text-[14px] tracking-wide transition-colors ${
              items.length === 0
                ? "pointer-events-none border-line text-ink-soft/50"
                : "border-ink bg-ink text-paper hover:bg-clay-dark hover:border-clay-dark"
            }`}
          >
            Checkout
          </Link>
          <p className="mt-3 text-center font-body text-[12px] text-ink-soft">
            Instant digital delivery — download links sent after payment.
          </p>
        </div>
      </aside>
    </div>
  );
}
