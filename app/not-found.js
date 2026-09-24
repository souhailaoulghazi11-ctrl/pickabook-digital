import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-28 text-center lg:px-10">
      <p className="font-display text-[52px] text-ink">404</p>
      <h1 className="mt-3 font-display text-[24px] text-ink">
        This page isn&apos;t on the shelf.
      </h1>
      <p className="mt-3 font-body text-[14px] text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-ink px-6 py-3 font-body text-[13px] tracking-wide text-ink hover:bg-ink hover:text-paper"
      >
        Back to home
      </Link>
    </div>
  );
}
