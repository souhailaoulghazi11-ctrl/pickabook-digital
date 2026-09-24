import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import Newsletter from "@/components/Newsletter";
import { getAllCategories, getAllProducts } from "@/lib/products";

export default function HomePage() {
  const categories = getAllCategories();
  const featuredProducts = getAllProducts({ featuredOnly: true });

  return (
    <>
      <Hero />
      <CategoryGrid categories={categories} />
      <ProductGrid id="featured" title="Featured eBooks & digital products" products={featuredProducts} />
      <Newsletter />
    </>
  );
}
