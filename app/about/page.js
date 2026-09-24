import PlaceholderImage from "@/components/PlaceholderImage";

export const metadata = {
  title: "About Us — PickaBook",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="max-w-[52ch]">
          <p className="font-body text-[13px] text-ink-soft">About Us</p>
          <h1 className="mt-4 font-display text-[36px] leading-[1.12] text-ink sm:text-[42px]">
            A quiet shelf, built for people who still finish books.
          </h1>
          <div className="mt-8 flex flex-col gap-5 font-body text-[15px] leading-relaxed text-ink-soft">
            <p>
              PickaBook began as a personal reading list — a handful of
              guides, courses and illustrated works that felt worth keeping.
              We started sharing them, and the shelf grew into a store.
            </p>
            <p>
              We don&apos;t chase volume. Every title on PickaBook is
              selected across six categories — health, personal growth,
              language learning, manga, panoramic wallpaper art and
              ciné-roman — because we&apos;d rather stock six things well
              than sixty things loosely.
            </p>
            <p>
              Everything is digital and delivered instantly: no shipping, no
              waiting, no clutter. Just a file, a receipt, and something
              worth your evening.
            </p>
          </div>
        </div>

        {/* [INSERT_ABOUT_IMAGE_URL] */}
        <PlaceholderImage
          src="/produit1.jpg"
          alt="PickaBook studio"
          ratio="aspect-[4/5]"
          className="w-full"
        />
      </div>

      <div className="mt-20 grid gap-10 border-t border-line pt-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-[24px] text-ink">01</p>
          <h3 className="mt-2 font-body text-[15px] text-ink">Curated, not endless</h3>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-ink-soft">
            A small, deliberate catalog across six focused categories.
          </p>
        </div>
        <div>
          <p className="font-display text-[24px] text-ink">02</p>
          <h3 className="mt-2 font-body text-[15px] text-ink">Instant delivery</h3>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-ink-soft">
            Secure download links land in your inbox right after checkout.
          </p>
        </div>
        <div>
          <p className="font-display text-[24px] text-ink">03</p>
          <h3 className="mt-2 font-body text-[15px] text-ink">Made to keep</h3>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-ink-soft">
            Files you own outright, formatted to read well on any device.
          </p>
        </div>
      </div>
    </div>
  );
}
