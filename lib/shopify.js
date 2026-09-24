/**
 * lib/shopify.js
 * ---------------------------------------------------------------------------
 * Shopify integration layer for PickaBook.
 *
 * Nothing here runs automatically — the API routes in app/api/** currently
 * import from lib/products.js (mock data). Once your store is ready:
 *
 *   1. Fill in .env.local with your Storefront + Admin credentials.
 *   2. In each app/api/** route, swap the lib/products.js call for the
 *      matching function below (they return the same shape).
 *
 * This keeps the swap a one-line change per route instead of a rewrite.
 * ---------------------------------------------------------------------------
 */

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || "2024-10";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

export function isShopifyConfigured() {
  return Boolean(DOMAIN && STOREFRONT_TOKEN);
}

/**
 * Low-level Storefront GraphQL request helper.
 */
async function storefrontFetch(query, variables = {}) {
  if (!isShopifyConfigured()) {
    throw new Error(
      "Shopify Storefront API is not configured. Set SHOPIFY_STORE_DOMAIN and " +
        "SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local before calling lib/shopify.js."
    );
  }

  const res = await fetch(
    `https://${DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      // Products change often enough that a short cache is reasonable;
      // tune to taste once traffic patterns are known.
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  if (json.errors) {
    throw new Error(
      "Shopify Storefront API error: " + JSON.stringify(json.errors)
    );
  }
  return json.data;
}

/**
 * Maps a Shopify Storefront product node onto the flat shape used by every
 * component in this app (see lib/products.js for the canonical shape).
 */
function mapStorefrontProduct(node) {
  const variant = node.variants?.edges?.[0]?.node;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    category: node.collections?.edges?.[0]?.node?.handle || null,
    price: variant ? Number(variant.price.amount) : null,
    currency: variant ? variant.price.currencyCode : "USD",
    format: node.productType || "Digital Product",
    image_url: node.featuredImage?.url || null,
    // Never resolve the real file URL here — see lib/delivery.js. Digital
    // files should only be handed out server-side after payment confirms.
    download_link: null,
    featured: node.tags?.includes("featured") || false,
  };
}

/** Fetch products, optionally scoped to a collection (category) handle. */
export async function getProductsByCollection(categoryHandle, first = 24) {
  const query = /* GraphQL */ `
    query ProductsByCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              id
              handle
              title
              description
              productType
              tags
              featuredImage {
                url
              }
              collections(first: 1) {
                edges {
                  node {
                    handle
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { handle: categoryHandle, first });
  const edges = data?.collection?.products?.edges || [];
  return edges.map((e) => mapStorefrontProduct(e.node));
}

/** Fetch a single product by handle. */
export async function getProductByHandle(handle) {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        productType
        tags
        featuredImage {
          url
        }
        collections(first: 1) {
          edges {
            node {
              handle
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { handle });
  return data?.productByHandle ? mapStorefrontProduct(data.productByHandle) : null;
}

/**
 * Creates a Shopify cart and returns its checkout URL, using the Storefront
 * Cart API. Call this from app/api/checkout/route.js once you are ready to
 * hand off to Shopify's own hosted checkout (recommended over building a
 * custom payment flow).
 */
export async function createCart(lines) {
  // lines: [{ merchandiseId: "gid://shopify/ProductVariant/...", quantity: 1 }]
  const query = /* GraphQL */ `
    mutation CartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const data = await storefrontFetch(query, { lines });
  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join(", "));
  }
  return cart; // { id, checkoutUrl }
}

/**
 * Admin API helper — used server-side only (e.g. from the webhook handler)
 * to look up order/fulfillment details after a purchase. Never expose
 * ADMIN_TOKEN to the browser.
 */
export async function adminFetch(path, options = {}) {
  if (!DOMAIN || !ADMIN_TOKEN) {
    throw new Error("Shopify Admin API is not configured.");
  }
  const res = await fetch(
    `https://${DOMAIN}/admin/api/${API_VERSION}/${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ADMIN_TOKEN,
        ...(options.headers || {}),
      },
    }
  );
  return res.json();
}
