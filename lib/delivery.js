/**
 * lib/delivery.js
 * ---------------------------------------------------------------------------
 * Secure digital delivery for PickaBook.
 *
 * The pattern:
 *   1. Shopify sends an "orders/paid" webhook -> app/api/webhooks/shopify.
 *   2. For each paid line item, we look up its real file location (kept
 *      OUT of the public product data — a private Admin-API metafield is a
 *      good place for it) and mint a signed, time-limited token.
 *   3. The token is emailed to the customer (or shown on the order status
 *      page) as a link to /api/download/[token].
 *   4. app/api/download/[token]/route.js verifies the signature + expiry
 *      before redirecting to (or streaming) the real file.
 *
 * This file is intentionally storage-agnostic: swap the in-memory Map for
 * Redis / a database table in production — tokens must survive a server
 * restart and be revocable.
 * ---------------------------------------------------------------------------
 */

import crypto from "crypto";

const SECRET = process.env.DOWNLOAD_LINK_SECRET || "dev-only-insecure-secret";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 72; // 72 hours

// DEV-ONLY in-memory store. Replace with a real database/Redis table:
// columns: token, product_id, order_id, file_url, expires_at, used_count.
const tokenStore = new Map();

function sign(payload) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

/**
 * Mint a signed download token for one purchased digital product.
 * Returns the full path to share with the customer.
 */
export function createDownloadLink({ productId, orderId, fileUrl }) {
  const id = crypto.randomUUID();
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${id}.${productId}.${orderId}.${expiresAt}`;
  const signature = sign(payload);
  const token = `${Buffer.from(payload).toString("base64url")}.${signature}`;

  tokenStore.set(token, { productId, orderId, fileUrl, expiresAt, usedCount: 0 });

  return `/api/download/${token}`;
}

/**
 * Verify a token from an incoming download request.
 * Returns { valid, fileUrl, reason }.
 */
export function verifyDownloadToken(token) {
  const record = tokenStore.get(token);
  if (!record) return { valid: false, reason: "not_found" };
  if (Date.now() > record.expiresAt) return { valid: false, reason: "expired" };

  // Optional: cap re-downloads to protect against link sharing.
  const MAX_DOWNLOADS = 5;
  if (record.usedCount >= MAX_DOWNLOADS) {
    return { valid: false, reason: "download_limit_reached" };
  }

  record.usedCount += 1;
  return { valid: true, fileUrl: record.fileUrl };
}

/**
 * Called once a Shopify "orders/paid" webhook confirms payment.
 * Generates one secure link per digital line item and (in production)
 * emails them to the customer via Shopify's transactional email, Klaviyo,
 * Resend, etc.
 */
export function deliverOrder({ orderId, customerEmail, lineItems }) {
  const links = lineItems.map((item) =>
    createDownloadLink({
      productId: item.productId,
      orderId,
      fileUrl: item.fileUrl, // resolved server-side from a private metafield
    })
  );

  // TODO: send `links` to `customerEmail` via your transactional email
  // provider. Left unimplemented here since it depends on your provider.
  console.log(`[delivery] ${links.length} download link(s) ready for`, customerEmail);

  return links;
}
