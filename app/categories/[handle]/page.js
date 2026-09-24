import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getAllCategories, getAllProducts, getCategoryByHandle } from "@/lib/products";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ handle: c.handle }));
}

export function generateMetadata({ params }) {
  const category = getCategoryByHandle(params.handle);
  return { title: category ? `${category.name} — PickaBook` : "PickaBook" };
}

export default function CategoryPage({ params }) {
  const category = getCategoryByHandle(params.handle);
  if (!category) notFound();

  // Swap for: await getProductsByCollection(category.handle) once Shopify is connected.
  const products = getAllProducts({ category: category.handle });

  return (
    <div>
      <div className="border-b border-line bg-sand/40">
        <div className="mx-auto max-w-content px-6 py-14 lg:px-10">
          <p className="font-body text-[13px] text-ink-soft">Category</p>
          <h1 className="mt-3 font-display text-[34px] text-ink">{category.name}</h1>
          <p className="mt-3 max-w-[56ch] font-body text-[15px] text-ink-soft">
            {category.description}
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="mx-auto max-w-content px-6 py-20 text-center lg:px-10">
          <p className="font-body text-[15px] text-ink-soft">
            Nothing here yet — new titles for {category.name} are on the way.
          </p>
        </div>
      )}
    </div>
  );
}
