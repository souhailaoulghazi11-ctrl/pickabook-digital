/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow-list for remote image hosts. Add your Shopify CDN domain(s) here
    // once you connect real product images, e.g. "cdn.shopify.com".
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.myshopify.com" },
    ],
  },
};

module.exports = nextConfig;
