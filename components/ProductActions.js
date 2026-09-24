"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductActions({ product }) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleBuyNow() {
    addItem(product);
    router.push("/checkout");
  }

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <button
        type="button"
        onClick={() => addItem(product)}
        className="border border-ink px-7 py-3.5 font-body text-[14px] tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Add to Cart
      </button>
      <button
        type="button"
        onClick={handleBuyNow}
        className="border border-ink bg-ink px-7 py-3.5 font-body text-[14px] tracking-wide text-paper transition-colors hover:bg-clay-dark hover:border-clay-dark"
      >
        Buy Now
      </button>
    </div>
  );
}
