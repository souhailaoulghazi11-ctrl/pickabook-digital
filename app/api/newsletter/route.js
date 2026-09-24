import { NextResponse } from "next/server";

/**
 * POST /api/newsletter
 * Body: { email: string }
 *
 * Currently just validates and logs the email. Connect this to:
 *   - Shopify customer creation (Admin API `customers.json`), or
 *   - Your email platform (Klaviyo, Mailchimp, Omnisend...) directly.
 */
export async function POST(request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.trim();

  const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  // TODO: forward `email` to Shopify customers.json or your ESP.
  console.log("[newsletter] new subscriber:", email);

  return NextResponse.json({ success: true });
}
