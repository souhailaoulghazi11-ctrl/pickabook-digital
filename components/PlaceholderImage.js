/**
 * <PlaceholderImage />
 * Renders a real <img> once you've pasted a Shopify image URL in. Until
 * then — for any src starting with "[INSERT" or empty — it renders a
 * clearly-marked placeholder box so it's obvious where an image is needed.
 */
export default function PlaceholderImage({
  src,
  alt = "",
  label,
  className = "",
  ratio = "aspect-[4/5]",
}) {
  const isPlaceholder = !src || src.startsWith("[INSERT");

  if (isPlaceholder) {
    return (
      <div
        className={`${ratio} ${className} flex flex-col items-center justify-center gap-2 border border-dashed border-sand-deep bg-sand/60 px-4 text-center`}
        role="img"
        aria-label={alt || "Image placeholder"}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-40"
        >
          <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M21 16l-5.5-5.5L4 19" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="font-body text-[11px] leading-snug text-ink-soft/80">
          {label || src || "[INSERT_IMAGE_URL_HERE]"}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={`${ratio} ${className} object-cover`}
      loading="lazy"
    />
  );
}
