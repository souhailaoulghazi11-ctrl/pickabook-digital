import crypto from "crypto";
import { NextResponse } from "next/server";
import { deliverOrder } from "@/lib/delivery";

/**
 * POST /api/webhooks/shopify
 *
 * Register this endpoint in Shopify Admin > Settings > Notifications >
 * Webhooks (or via the Admin API) for the "orders/paid" event. Point it at:
 *
 *   https://your-domain.com/api/webhooks/shopify
 *
 * Shopify signs every webhook body with SHOPIFY_WEBHOOK_SECRET — we verify
 * that signature before trusting the payload, then trigger secure digital
 * delivery for each line item that corresponds to a downloadable product.
 */
export async function POST(request) {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
  const topic = request.headers.get("x-shopify-topic");

  if (!isValidShopifySignature(rawBody, hmacHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  if (topic === "orders/paid") {
    const lineItems = (payload.line_items || []).map((li) => ({
      productId: li.product_id,
      // In production, resolve the real file from a private metafield
      // instead of trusting anything in the webhook body.
      fileUrl: `[INSERT_SECURE_FILE_URL_FOR_PRODUCT_${li.product_id}]`,
    }));

    deliverOrder({
      orderId: payload.id,
      customerEmail: payload.email,
      lineItems,
    });
  }

  // Shopify expects a fast 200 response; do heavier work asynchronously
  // (a queue, background job, etc.) in a real production setup.
  return NextResponse.json({ received: true });
}

function isValidShopifySignature(rawBody, hmacHeader) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !hmacHeader) return false;

  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(hmacHeader)
    );
  } catch {
    return false;
  }
}
