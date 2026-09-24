/**
 * lib/products.js
 * ---------------------------------------------------------------------------
 * Mock data layer for PickaBook.
 *
 * This file defines the PRODUCT and CATEGORY shapes the whole front-end is
 * built against. Every field maps 1:1 onto something Shopify already gives
 * you, so switching from mock data to live Shopify data later only means
 * changing the functions in this file (or, better, calling lib/shopify.js
 * from inside them) — no component needs to change.
 *
 *   Product field      Shopify Storefront API equivalent
 *   ------------------ --------------------------------------------------
 *   id                 product.id (gid://shopify/Product/...)
 *   handle             product.handle (used for the /product/[id] route)
 *   title              product.title
 *   description        product.description / descriptionHtml
 *   category           collection.handle the product belongs to
 *   price              variant.price.amount
 *   currency           variant.price.currencyCode
 *   image_url          product.featuredImage.url
 *   download_link       -- NOT stored on the Shopify product itself. Keep
 *                          this in a private metafield (e.g.
 *                          custom.digital_file_url) or, better, resolve it
 *                          server-side only after a paid order (see
 *                          lib/delivery.js) so the raw file URL is never
 *                          exposed to the browser before purchase.
 * ---------------------------------------------------------------------------
 */

// [INSERT_IMAGE_URL_HERE] — replace these placeholder tokens with real
// Shopify CDN image URLs (product.featuredImage.url / collection.image.url).
// Any string starting with "[INSERT" is rendered as a visible placeholder
// box by <PlaceholderImage /> instead of a broken <img>, so you can see
// exactly where an image is still needed.

export const CATEGORIES = [
  {
    handle: "health-nutrition",
    name: "Health & Nutrition",
    description: "Evidence-based guides for eating well and feeling better.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
  {
    handle: "personal-growth",
    name: "Personal Growth",
    description: "Mindset, habits and tools for a more intentional life.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
  {
    handle: "languages-learning",
    name: "Languages & Learning",
    description: "Structured courses and workbooks to learn faster.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
  {
    handle: "manga",
    name: "Manga",
    description: "Digital volumes and exclusive illustrated collections.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
  {
    handle: "papier-peint-panoramique",
    name: "Papier peint panoramique",
    description: "High-resolution panoramic wallpaper murals, print-ready.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
  {
    handle: "cine-roman",
    name: "Ciné-roman",
    description: "Illustrated novelizations of classic and original films.",
    image_url: "[INSERT_CATEGORY_IMAGE_URL]",
  },
];

export const PRODUCTS = [
  {
    id: "prod_001",
    handle: "metabolic-reset-guide",
    title: "The Metabolic Reset Guide",
    description:
      "A 120-page, science-backed nutrition guide covering macronutrient timing, sustainable habit design and a 4-week meal framework.",
    category: "health-nutrition",
    price: 24.0,
    currency: "USD",
    format: "PDF eBook",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_002",
    handle: "the-quiet-discipline",
    title: "The Quiet Discipline",
    description:
      "A field guide to building focus and consistency without burning out — 30 short chapters, one for every day of the month.",
    category: "personal-growth",
    price: 19.0,
    currency: "USD",
    format: "PDF eBook",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_003",
    handle: "french-in-90-days",
    title: "French in 90 Days",
    description:
      "A structured, self-paced course workbook with daily drills, audio companion links and a spaced-repetition vocabulary tracker.",
    category: "languages-learning",
    price: 29.0,
    currency: "USD",
    format: "PDF + Audio Bundle",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_004",
    handle: "silent-tide-vol-1",
    title: "Silent Tide — Vol. 1",
    description:
      "The first volume of the original digital manga series Silent Tide, in high-resolution reader-ready pages.",
    category: "manga",
    price: 8.5,
    currency: "USD",
    format: "Digital Manga (CBZ/PDF)",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_005",
    handle: "horizon-panorama-mural",
    title: "Horizon — Panoramic Mural",
    description:
      "An ultra-high-resolution panoramic wallpaper mural, delivered print-ready for walls up to 6 metres wide.",
    category: "papier-peint-panoramique",
    price: 39.0,
    currency: "USD",
    format: "High-Res TIFF + Print Guide",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_006",
    handle: "letters-from-the-shore",
    title: "Letters from the Shore",
    description:
      "The illustrated ciné-roman edition of the acclaimed independent film, with over 60 original frame illustrations.",
    category: "cine-roman",
    price: 22.0,
    currency: "USD",
    format: "PDF eBook",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: true,
  },
  {
    id: "prod_007",
    handle: "gut-health-fundamentals",
    title: "Gut Health Fundamentals",
    description:
      "An accessible breakdown of digestive health, fermentation and anti-inflammatory eating, with 40 recipes.",
    category: "health-nutrition",
    price: 21.0,
    currency: "USD",
    format: "PDF eBook",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: false,
  },
  {
    id: "prod_008",
    handle: "silent-tide-vol-2",
    title: "Silent Tide — Vol. 2",
    description: "The second volume of the digital manga series Silent Tide.",
    category: "manga",
    price: 8.5,
    currency: "USD",
    format: "Digital Manga (CBZ/PDF)",
    image_url: "[INSERT_PRODUCT_IMAGE_URL]",
    download_link: "[INSERT_SECURE_FILE_URL_AFTER_PURCHASE]",
    featured: false,
  },
];

/**
 * getAllProducts — optionally filtered by category handle.
 * In production, replace the body with a call to
 * lib/shopify.js -> getProductsByCollection(categoryHandle).
 */
export function getAllProducts({ category, featuredOnly } = {}) {
  let results = PRODUCTS;
  if (category) results = results.filter((p) => p.category === category);
  if (featuredOnly) results = results.filter((p) => p.featured);
  return results;
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id || p.handle === id) || null;
}

export function getAllCategories() {
  return CATEGORIES;
}

export function getCategoryByHandle(handle) {
  return CATEGORIES.find((c) => c.handle === handle) || null;
}
