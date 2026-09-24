"use client";

import { useRef, useState } from "react";
import Link from "next/link";

/**
 * Elegant hover/click mega-menu for the "Categories" nav item.
 * Desktop: hover to open, small delay on close to avoid flicker.
 * Touch/keyboard: click to toggle, Escape to close.
 */
export default function MegaMenu({ categories }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 py-2 font-body text-[15px] text-ink transition-colors hover:text-clay-dark"
      >
        Categories
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1.5 3L5 6.5L8.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-1/2 top-full z-40 mt-3 w-[min(90vw,640px)] -translate-x-1/2 animate-menu-in border border-line bg-paper shadow-[0_18px_40px_-16px_rgba(27,26,23,0.18)]"
          role="menu"
        >
          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.handle}
                href={`/categories/${cat.handle}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="group flex flex-col gap-1 bg-paper px-6 py-5 transition-colors hover:bg-sand/70"
              >
                <span className="font-display text-[17px] text-ink transition-colors group-hover:text-clay-dark">
                  {cat.name}
                </span>
                <span className="font-body text-[13px] leading-snug text-ink-soft">
                  {cat.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
