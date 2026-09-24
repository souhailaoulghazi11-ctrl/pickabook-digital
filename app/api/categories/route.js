import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/products";

/**
 * GET /api/categories
 * Returns the 6 fixed PickaBook categories. In Shopify terms, each of
 * these corresponds to a Collection — swap the return value for a
 * `collections(first: 6)` Storefront query once you've created the matching
 * collections in Shopify admin (use the same handles for a drop-in swap).
 */
export async function GET() {
  return NextResponse.json({ categories: getAllCategories() });
}
