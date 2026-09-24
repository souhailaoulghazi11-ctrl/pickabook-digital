import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";
// import { createCart, isShopifyConfigured } from "@/lib/shopify"; // <- swap in when ready

/**
 * POST /api/checkout
 * Body: { items: [{ id, quantity }] }
 *
 * Mock mode (default): validates the cart against the local catalog and
 * returns a fake checkout session so the front-end flow can be built and
 * tested end-to-end before Shopify is connected.
 *
 * Live mode: once SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN are
 * set, replace the body below with something like:
 *
 *   const lines = items.map((i) => ({
 *     merchandiseId: variantIdFor(i.id), // map your product id -> Shopify variant GID
 *     quantity: i.quantity,
 *   }));
 *   const cart = await createCart(lines);
 *   return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
 *
 * Then redirect the browser to `checkoutUrl` — Shopify's own hosted
 * checkout handles payment, tax and fraud protection for you.
 */
export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  let subtotal = 0;
  const resolvedItems = [];

  for (const item of body.items) {
    const product = getProductById(item.id);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${item.id}` },
        { status: 400 }
      );
    }
    const quantity = Math.max(1, Number(item.quantity) || 1);
    subtotal += product.price * quantity;
    resolvedItems.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
    });
  }

  // Mock checkout session — in production this becomes a real Shopify
  // checkout URL (see comment above).
  const mockSession = {
    id: `mock_session_${Date.now()}`,
    items: resolvedItems,
    subtotal: Number(subtotal.toFixed(2)),
    currency: "USD",
    // A real integration redirects to Shopify's hosted checkout instead
    // of a local page:
    checkoutUrl: "/checkout?session=mock",
  };

  return NextResponse.json(mockSession);
}
