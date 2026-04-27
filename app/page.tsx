import Nav from "@/components/Nav";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";

/**
 * Homepage — buymyhouse.co pixel-perfect Next.js replica
 * Sections: Nav → Hero → As Seen On → 3-Step Process → Why Us →
 *           Luke Story → Before/After → Google Reviews → Footer
 *
 * Entity: Buy My House Boise
 * Updated 2026-04-27: Dynamic Google reviews replacing static testimonial.
 * Jared directive: no placeholder testimonials — real Google GBP reviews only.
 * Per: workspace-kai/deliverables/bmh-google-reviews-implementation-2026-04-27.md
 */

// ── Production image URLs (served from buymyhouse.co CDN) ──────────────────
const IMAGES = {
  heroBg: "https://buymyhouse.co/wp-content/uploads/2024/02/Buy-My-House-Boise-Sell-My-House-Boise-Boise-Cash-Home-Buyers-Lanscape.jpg",
  lukeFamiliy: "https://buymyhouse.co/wp-content/w3-webp/uploads/2024/02/Buy-My-House-Sell-My-House-Cash-Home-Buyers-Luke-Caldwell-Family-Photo-Boise-Idaho-scaled.jpgw3.webp",
  before: "https://buymyhouse.co/wp-content/w3-webp/uploads/2024/01/Buy-My-House-Cash-Home-Buyers-Before-Image-scaled.jpgw3.webp",
  after: "https://buymyhouse.co/wp-content/w3-webp/uploads/2024/01/Buy-My-House-Cash-Home-Buyers-After-Image-scaled.jpgw3.webp",
  logoGreen: "https://buymyhouse.co/wp-content/uploads/2023/10/Buy-My-House-Text-Logo-Green-Sell-My-House-Boise-Home-Buyers.png",
  logoWhite: "https://buymyhouse.co/wp-content/uploads/2023/10/Buy-My-House-Text-Logo-White-Sell-My-House-Boise-Home-Buyers-1024x234.png",
};

// ── Why Us feature cards data ────────────────────────────────────────────────
const WHY_US_FEATURES = [
  {
    title: "Local Experts Who Know the Market",
    body: "We understand the unique challenges of selling in Idaho and surrounding areas. Our team moves quickly and makes the process simple.",
    icon: "📍",
  },
  {
    title: "No Cleaning or Repairs Needed",
    body: "You don't need to fix a thing. We'll buy your house exactly as it is, no matter the condition or situation.",
    icon: "🔨",
  },
  {
    title: "Personalized Offer Within 24 Hours",
    body: "Once we talk and see the property, we'll send you a clear, fair offer within 24 hours. No lowballs or drawn-out negotiations.",
    icon: "⏱️",
  },
  {
    title: "Close on Your Timeline",
    body: "Whether you need to move in a week or take your time, we'll work with your schedule and close when you're ready.",
    icon: "📅",
  },
  {
    title: "No Fees, Commissions, or Closing Costs",
    body: "We're direct buyers, not agents. That means no middlemen, no hidden charges, and more money in your pocket.",
    icon: "💰",
  },
  {
    title: "A Straightforward Selling Experience",
    body: "From your first message to final closing, we keep things simple. No pressure, no confusion — just a smooth, honest process.",
    icon: "✅",
  },
];

// ── As Seen On media logos (text badges) ────────────────────────────────────
const MEDIA_LOGOS = ["HGTV", "Discovery", "People", "HBO Max", "Dwell", "Realtor.com"];

// ── Google Reviews types (matches /api/reviews route response) ──────────────
interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface ReviewsResponse {
  reviews: GoogleReview[];
  business_name?: string;
  total_ratings?: number;
  average_rating?: number;
  error?: string;
}

/**
 * Fetches Google reviews from the internal /api/reviews proxy route.
 * Server Component — runs at build time (ISR, revalidates every 24h).
 * Returns empty array on any failure so the section degrades gracefully.
 *
 * Uses NEXT_PUBLIC_BASE_URL env var to resolve the absolute URL needed
 * for server-side fetch (Next.js requires absolute URLs in Server Components).
 */
async function getGoogleReviews(): Promise<ReviewsResponse> {
  // Base URL required for server-side absolute fetch — set in Replit Secrets
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://buymyhouse.co";
  try {
    const res = await fetch(`${baseUrl}/api/reviews`, {
      // ISR: revalidate the page data every 24 hours
      next: { revalidate: 86400 },
    });
    if (!res.ok) return { reviews: [] };
    return (await res.json()) as ReviewsResponse;
  } catch {
    // Graceful degradation — reviews section will be hidden, not broken
    console.error("[getGoogleReviews] fetch failed — reviews section hidden");
    return { reviews: [] };
  }
}

/**
 * Star rating component — renders filled gold stars for a given rating (1–5).
 * Used in the Google Reviews section.
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * HomePage — async Server Component
 * Fetches real Google reviews at build time (ISR 24h).
 * All other sections are static — no performance impact.
 */
export default async function HomePage() {
  // Fetch real Google reviews — empty array on failure (graceful degradation)
  const { reviews: googleReviews, average_rating, total_ratings } = await getGoogleReviews();

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════════════ */}
      <Nav />

      <main>
        {/* ════════════════════════════════════════════════════════════
            HERO — full-width background image + lead form
        ════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex items-center"
          style={{
            backgroundImage: `url('${IMAGES.heroBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* ── Left: Hero copy ──────────────────────────────────── */}
              <div className="text-white">
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
                  Buy My House
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest mb-4 text-gray-200">
                  Most Trusted Cash Home Buyer in Boise
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  No Fees. No Commissions. No Repairs.
                </p>
                {/* Trust signals */}
                <div className="flex flex-wrap gap-3 text-sm">
                  {["Fair Cash Offers", "Close in 7–14 Days", "Any Condition"].map((t) => (
                    <span key={t} className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Right: Lead form ─────────────────────────────────── */}
              <div className="flex justify-center lg:justify-end">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            AS SEEN ON — media logo bar
        ════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-b border-bmh-border py-10 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Label */}
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-bmh-gray mb-6">
              As Seen On
            </p>
            {/* Logo strip */}
            <div className="flex flex-wrap justify-center gap-6">
              {MEDIA_LOGOS.map((logo) => (
                <span
                  key={logo}
                  className="text-bmh-gray font-bold text-sm sm:text-base tracking-wide px-4 py-2 border border-bmh-border rounded"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            3-STEP PROCESS
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-bmh-bg-light">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-bmh-dark text-center mb-12">
              3 Simple Steps to Selling Your House Quickly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "1",
                  title: "Share Your Address and Contact Info",
                  body: "Fill out our short form with your Boise property address and contact information. We'll give you a quick call to learn about your situation and set up a convenient walkthrough.",
                },
                {
                  num: "2",
                  title: "Get Your No Obligation Offer",
                  body: "After viewing the property, we'll create a clear, no-obligation cash offer tailored to your needs. Skip the repairs, open houses, and delays.",
                },
                {
                  num: "3",
                  title: "You Choose the Closing Date",
                  body: "If you accept the offer, we'll handle all the paperwork and make selling your Boise home simple. Pick the closing date that works best for you.",
                },
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-bmh-green text-white flex items-center justify-center text-2xl font-bold mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-bmh-dark text-lg mb-2">{step.title}</h3>
                  <p className="text-bmh-gray text-sm leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            WHY US — feature cards grid
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-bmh-dark text-center mb-12">
              How We&apos;re Different from Other Home Buyers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="bg-bmh-bg-light rounded-xl p-6 border border-bmh-border"
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-bmh-dark mb-2">{f.title}</h3>
                  <p className="text-bmh-gray text-sm leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            LUKE STORY — founder narrative + family photo
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-bmh-bg-light">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="order-last lg:order-first">
                <Image
                  src={IMAGES.lukeFamiliy}
                  alt="Luke Caldwell and family — Buy My House Boise founder"
                  width={600}
                  height={450}
                  className="rounded-xl shadow-md w-full h-auto"
                  unoptimized
                />
              </div>
              {/* Story copy */}
              <div>
                <h2 className="text-3xl font-bold text-bmh-dark mb-4">
                  A Local Family Owned Business
                </h2>
                <p className="text-bmh-gray leading-relaxed mb-4">
                  Twelve years ago, Luke Caldwell started his real estate journey with a personal goal. He and his wife were preparing to grow their family through adoption, and to help make it possible, they purchased a fixer-upper in Boise, Idaho.
                </p>
                <p className="text-bmh-gray leading-relaxed mb-4">
                  With hard work and a clear vision, they transformed the property into a beautiful home. The sale not only supported their adoption but also sparked a passion that would become Luke&apos;s lifelong career.
                </p>
                <p className="text-bmh-gray leading-relaxed">
                  Today, Luke continues to focus on Boise&apos;s neighborhoods — restoring homes, improving communities, and helping local homeowners sell quickly and easily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BEFORE / AFTER — transformation images
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-bmh-dark text-center mb-12">
              See Our Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { src: IMAGES.before, label: "Before", alt: "House before renovation — Buy My House Boise" },
                { src: IMAGES.after, label: "After", alt: "House after renovation — Buy My House Boise" },
              ].map(({ src, label, alt }) => (
                <div key={label} className="relative">
                  <Image
                    src={src}
                    alt={alt}
                    width={600}
                    height={400}
                    className="rounded-xl shadow-md w-full h-auto"
                    unoptimized
                  />
                  {/* Label badge */}
                  <span className="absolute top-4 left-4 bg-bmh-green text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            GOOGLE REVIEWS — dynamic, real GBP reviews (ISR 24h)
            Falls back to hidden section if API unavailable.
            Jared directive 2026-04-27: no placeholders, real reviews only.
        ════════════════════════════════════════════════════════════ */}
        {googleReviews.length > 0 && (
          <section className="section-pad bg-bmh-bg-light">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-bmh-dark mb-2">What Homeowners Say</h2>
                {/* Aggregate rating badge — shown only if API returns it */}
                {average_rating && total_ratings && (
                  <p className="text-bmh-gray text-sm">
                    <span className="font-bold text-bmh-dark">{average_rating.toFixed(1)}</span>
                    {" "}★ average from{" "}
                    <span className="font-bold text-bmh-dark">{total_ratings}</span> Google reviews
                  </p>
                )}
              </div>

              {/* Review cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {googleReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-6 shadow-sm border border-bmh-border flex flex-col"
                  >
                    {/* Stars for this review */}
                    <StarRating rating={review.rating} />

                    {/* Review text */}
                    <blockquote className="text-bmh-dark text-sm leading-relaxed flex-1 mb-4">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-bmh-border">
                      {/* Google reviewer avatar (if available) or initials fallback */}
                      {review.profile_photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-bmh-green text-white text-xs font-bold flex items-center justify-center">
                          {review.author_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-bmh-dark font-semibold text-sm">{review.author_name}</p>
                        <p className="text-bmh-gray text-xs">{review.relative_time_description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Google attribution — required by Google Places API ToS */}
              <p className="text-center text-xs text-bmh-gray mt-6">
                Reviews from{" "}
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJt3kxsp1EsaMR5TsByTotVSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-bmh-dark transition-colors"
                >
                  Google
                </a>
              </p>
            </div>
          </section>
        )}
      </main>

      {/* ════════════════════════════════════════════════════════════
          FOOTER — green bg, white logo, contact info
      ════════════════════════════════════════════════════════════ */}
      <footer className="bg-bmh-green text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

            {/* ── Brand column ─────────────────────────────────────── */}
            <div>
              {/* White logo on green background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.logoWhite}
                alt="Buy My House — Cash Home Buyers Boise"
                className="h-10 w-auto mb-4"
              />
              <p className="text-white/80 text-sm leading-relaxed">
                Boise&apos;s most trusted local cash home buyer. Honest offers, simple process, fast closing.
              </p>
            </div>

            {/* ── Contact ──────────────────────────────────────────── */}
            <div>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Contact</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <a href="tel:+12084052274" className="hover:text-white transition-colors">
                    (208) 405-2274
                  </a>
                </li>
                <li>
                  <a href="mailto:connect@buymyhouse.co" className="hover:text-white transition-colors">
                    connect@buymyhouse.co
                  </a>
                </li>
              </ul>
            </div>

            {/* ── Quick links ──────────────────────────────────────── */}
            <div>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a href={href} className="hover:text-white transition-colors">{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Legal strip ──────────────────────────────────────────── */}
          <div className="border-t border-white/20 pt-6 text-center text-xs text-white/60">
            <p>© {new Date().getFullYear()} Buy My House Boise. All rights reserved.</p>
            <p className="mt-1">A Timber and Love company. Boise, Idaho.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
