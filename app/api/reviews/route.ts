/**
 * /api/reviews — Server-side proxy for BMH Google Places reviews
 *
 * Fetches top reviews from the Buy My House Boise Google Business Profile
 * via the Google Places API (Legacy) and returns a cleaned subset.
 *
 * WHY this route exists:
 * - GOOGLE_PLACES_API_KEY must NEVER be exposed client-side — this route keeps
 *   the key server-only (process.env only, never bundled to the browser).
 * - The legacy Places Details endpoint returns up to 5 reviews natively.
 *
 * Caching strategy:
 * - Response is cached at the Next.js edge for 24 hours (revalidate: 86400).
 * - Reviews don't change hourly; daily refresh is sufficient and avoids
 *   hammering the Places API quota on every page load.
 *
 * Environment variables required:
 * - GOOGLE_PLACES_API_KEY  — unrestricted or IP-restricted server-side key
 *                            (HTTP-referer-restricted keys will NOT work here)
 * - GOOGLE_BMH_PLACE_ID    — the Place ID for buymyhouse.co GBP listing
 *                            e.g. ChIJxxxxxxxxxxxxxxxx
 *
 * Entity: Buy My House Boise
 * Jared directive 2026-04-27: dynamic Google reviews, no placeholder testimonials
 */

import { NextResponse } from "next/server";

/** Shape of a single review returned by this route */
export interface GoogleReview {
  author_name: string;
  rating: number;       // 1–5
  text: string;
  time: number;         // Unix timestamp
  relative_time_description: string; // "a month ago", "2 years ago", etc.
  profile_photo_url?: string;
}

/** Shape of the route response */
export interface ReviewsResponse {
  reviews: GoogleReview[];
  business_name?: string;
  total_ratings?: number;
  average_rating?: number;
  error?: string;
}

/**
 * GET /api/reviews
 * Returns top reviews from the BMH Google Business Profile.
 * Cached for 24 hours at the Next.js edge.
 */
export async function GET(): Promise<NextResponse<ReviewsResponse>> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_BMH_PLACE_ID;

  // Fail fast if environment isn't configured — don't surface raw errors to users
  if (!apiKey || !placeId) {
    console.error(
      "[/api/reviews] Missing env vars:",
      !apiKey ? "GOOGLE_PLACES_API_KEY" : "",
      !placeId ? "GOOGLE_BMH_PLACE_ID" : ""
    );
    return NextResponse.json(
      { reviews: [], error: "Reviews temporarily unavailable" },
      { status: 503 }
    );
  }

  // Google Places Details (Legacy) — returns up to 5 reviews sorted by relevance
  // Using legacy endpoint because Places API (New) requires higher billing tier for reviews
  const fields = "name,rating,user_ratings_total,reviews";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

  let data: Record<string, unknown>;
  try {
    const res = await fetch(url, {
      // Cache at the fetch level for 24h — Next.js will also cache the route response
      next: { revalidate: 86400 },
    });
    data = await res.json() as Record<string, unknown>;
  } catch (err) {
    console.error("[/api/reviews] Places API fetch failed:", err);
    return NextResponse.json(
      { reviews: [], error: "Reviews temporarily unavailable" },
      { status: 502 }
    );
  }

  // Check Places API status
  const status = data.status as string;
  if (status !== "OK") {
    console.error("[/api/reviews] Places API returned status:", status, data.error_message);
    return NextResponse.json(
      { reviews: [], error: "Reviews temporarily unavailable" },
      { status: 502 }
    );
  }

  // Extract the result payload
  const result = data.result as Record<string, unknown>;
  const rawReviews = (result?.reviews as GoogleReview[] | undefined) ?? [];

  // Filter: only include 4- and 5-star reviews to display as social proof
  // Sort by recency (most recent first) and take top 3
  const filteredReviews = rawReviews
    .filter((r) => r.rating >= 4)
    .sort((a, b) => b.time - a.time)
    .slice(0, 3);

  // Return cleaned response — no raw API data exposed
  return NextResponse.json(
    {
      reviews: filteredReviews,
      business_name: result?.name as string | undefined,
      total_ratings: result?.user_ratings_total as number | undefined,
      average_rating: result?.rating as number | undefined,
    },
    {
      status: 200,
      headers: {
        // Cache at CDN/edge for 24 hours
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  );
}
