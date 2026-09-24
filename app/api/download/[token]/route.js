import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/delivery";

/**
 * GET /api/download/[token]
 *
 * The link a customer receives after a successful, paid order. Verifies the
 * signed token (see lib/delivery.js) before revealing anything about the
 * real file location, then redirects to it. Swap the redirect for a
 * streamed response if you'd rather never expose the underlying file host.
 */
export async function GET(request, { params }) {
  const { valid, fileUrl, reason } = verifyDownloadToken(params.token);

  if (!valid) {
    const messages = {
      not_found: "This download link is invalid.",
      expired: "This download link has expired. Contact support for a new one.",
      download_limit_reached: "This download link has reached its limit.",
    };
    return NextResponse.json(
      { error: messages[reason] || "This download link is invalid." },
      { status: 410 }
    );
  }

  return NextResponse.redirect(fileUrl);
}
