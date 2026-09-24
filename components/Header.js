"use client";

import { useState } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import { useCart } from "@/context/CartContext";

export default function Header({ categories }) {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="font-display text-[22px] tracking-wideish text-ink">
          PickaBook <span className="text-clay-dark">DIGITAL</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          <Link href="/" className="font-body text-[15px] text-ink transition-colors hover:text-clay-dark">
            Home
          </Link>
          <Link href="/about" className="font-body text-[15px] text-ink transition-colors hover:text-clay-dark">
            About Us
          </Link>
          <MegaMenu categories={categories} />
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-clay-dark"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8h12l-1 12H7L6 8Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-paper">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-line md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="font-body text-[15px] text-ink">
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="font-body text-[15px] text-ink">
              About Us
            </Link>
            <div>
              <p className="mb-2 font-body text-[15px] text-ink">Categories</p>
              <div className="flex flex-col gap-3 border-l border-line pl-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.handle}
                    href={`/categories/${cat.handle}`}
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-[14px] text-ink-soft hover:text-clay-dark"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
