"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-content px-6 py-14 lg:px-10 lg:py-20">
      <h1 className="font-display text-[32px] text-ink">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 border border-line bg-sand/40 px-8 py-14 text-center">
          <p className="font-body text-[15px] text-ink-soft">
            Your cart is empty.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block border border-ink px-6 py-3 font-body text-[13px] tracking-wide text-ink hover:bg-ink hover:text-paper"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.id} className="flex gap-5 py-6">
                <PlaceholderImage
                  src={item.image_url}
                  alt={item.title}
                  ratio="aspect-[4/5]"
                  className="w-24 shrink-0"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-body text-[15px] text-ink">{item.title}</p>
                      <p className="mt-1 font-body text-[13px] text-ink-soft">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="font-body text-[15px] text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-ink"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-body text-[13px] text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-ink"
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

          <aside className="h-fit border border-line bg-sand/40 p-7">
            <h2 className="font-display text-[19px] text-ink">Order summary</h2>
            <div className="mt-5 flex items-center justify-between font-body text-[14px] text-ink-soft">
              <span>Subtotal</span>
              <span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 font-body text-[12px] text-ink-soft">
              Taxes calculated at checkout. No shipping — everything is digital.
            </p>
            <Link
              href="/checkout"
              className="mt-6 block w-full border border-ink bg-ink py-3.5 text-center font-body text-[14px] tracking-wide text-paper transition-colors hover:bg-clay-dark hover:border-clay-dark"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
