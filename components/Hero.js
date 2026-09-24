import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";

export default function Hero() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div className="max-w-[46ch]">
          <p className="font-body text-[13px] text-ink-soft">Digital library, curated</p>
          <h1 className="mt-4 font-display text-[42px] leading-[1.08] text-ink sm:text-[52px]">
            Reading material for a considered life.
          </h1>
          <p className="mt-6 font-body text-[16px] leading-relaxed text-ink-soft">
            PickaBook is a small, focused library of eBooks, courses and
            visual works — chosen for people who want fewer, better things to
            read.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="#featured"
              className="border border-ink bg-ink px-7 py-3.5 font-body text-[14px] tracking-wide text-paper transition-colors hover:bg-clay-dark hover:border-clay-dark"
            >
              Explore eBooks
            </Link>
            <Link
              href="/about"
              className="font-body text-[14px] text-ink underline decoration-sand-deep underline-offset-4 hover:text-clay-dark"
            >
              Our story
            </Link>
          </div>
        </div>

        {/* [INSERT_HERO_IMAGE_URL] */}
        <PlaceholderImage
          src="[INSERT_HERO_IMAGE_URL]"
          alt="Featured PickaBook cover"
          ratio="aspect-[5/4]"
          className="w-full"
        />
      </div>
    </section>
  );
}
