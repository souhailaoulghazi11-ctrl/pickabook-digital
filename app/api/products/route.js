import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
// import { getProductsByCollection } from "@/lib/shopify"; // <- swap in when ready

/**
 * GET /api/products
 * GET /api/products?category=manga
 * GET /api/products?featured=true
 *
 * Currently reads from the local mock catalog (lib/products.js).
 * To go live with Shopify, replace the body with:
 *
 *   const products = category
 *     ? await getProductsByCollection(category)
 *     : await getProductsByCollection("all"); // or your "featured" collection
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const featuredOnly = searchParams.get("featured") === "true";

  const products = getAllProducts({ category, featuredOnly });

  return NextResponse.json({ products });
}
