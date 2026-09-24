import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import ProductActions from "@/components/ProductActions";
import { getAllProducts, getCategoryByHandle, getProductById } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.handle }));
}

export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  return { title: product ? `${product.title} — PickaBook` : "PickaBook" };
}

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const category = getCategoryByHandle(product.category);

  return (
    <div className="mx-auto max-w-content px-6 py-14 lg:px-10 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <PlaceholderImage
          src={product.image_url}
          alt={product.title}
          ratio="aspect-[4/5]"
          className="w-full"
        />

        <div className="lg:max-w-[46ch]">
          {category && (
            <a
              href={`/categories/${category.handle}`}
              className="font-body text-[12px] tracking-wide text-clay-dark"
            >
              {category.name}
            </a>
          )}
          <h1 className="mt-3 font-display text-[32px] leading-snug text-ink">
            {product.title}
          </h1>
          <p className="mt-2 font-body text-[14px] text-ink-soft">{product.format}</p>
          <p className="mt-6 font-display text-[24px] text-ink">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-6 font-body text-[15px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <ProductActions product={product} />

          <div className="mt-10 border-t border-line pt-6">
            <p className="font-body text-[13px] leading-relaxed text-ink-soft">
              Delivered instantly after checkout as a secure, time-limited
              download link sent to your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
