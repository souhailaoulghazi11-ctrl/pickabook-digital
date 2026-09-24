import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
// import { getProductByHandle } from "@/lib/shopify"; // <- swap in when ready

/**
 * GET /api/products/[id]
 * `id` accepts either the mock product id (e.g. "prod_001") or its handle.
 * When wired to Shopify, resolve by handle via getProductByHandle(id).
 */
export async function GET(request, { params }) {
  const product = getProductById(params.id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
