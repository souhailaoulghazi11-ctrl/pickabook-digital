import ProductCard from "./ProductCard";

export default function ProductGrid({ products, title, id }) {
  return (
    <section id={id} className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
      {title && (
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-[28px] text-ink">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
