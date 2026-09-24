"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getCategoryByHandle } from "@/lib/products";
import PlaceholderImage from "./PlaceholderImage";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const category = getCategoryByHandle(product.category);

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.handle}`}>
        <PlaceholderImage
          src={product.image_url}
          alt={product.title}
          ratio="aspect-[4/5]"
          className="w-full transition-opacity group-hover:opacity-90"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        {category && (
          <span className="font-body text-[11px] tracking-wide text-clay-dark">
            {category.name}
          </span>
        )}
        <Link href={`/product/${product.handle}`}>
          <h3 className="mt-1.5 font-display text-[17px] leading-snug text-ink hover:text-clay-dark">
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 font-body text-[13px] text-ink-soft">{product.format}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-body text-[15px] text-ink">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addItem(product)}
              className="border border-ink px-4 py-2 font-body text-[12px] tracking-wide text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
