import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";

export default function CategoryGrid({ categories }) {
  return (
    <section className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-[28px] text-ink">Shop by category</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.handle} href={`/categories/${cat.handle}`} className="group block">
            <PlaceholderImage
              src={cat.image_url}
              alt={cat.name}
              ratio="aspect-[4/3]"
              className="w-full transition-opacity group-hover:opacity-90"
            />
            <div className="mt-4 flex items-start justify-between gap-3 border-t border-line pt-4">
              <div>
                <h3 className="font-display text-[18px] text-ink">{cat.name}</h3>
                <p className="mt-1 font-body text-[13px] leading-snug text-ink-soft">
                  {cat.description}
                </p>
              </div>
              <span className="mt-1 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
