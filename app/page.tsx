import Nav from "@/components/Nav";
import LeadForm from "@/components/LeadForm";
import Image from "next/image";

/**
 * Homepage — buymyhouse.co pixel-perfect Next.js replica
 * Sections: Nav → Hero → As Seen On → 3-Step Process → Why Us →
 *           Luke Story → Before/After → Testimonial → Footer
 * Entity: Buy My House Boise
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

export default function HomePage() {
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
            {/* Logo badges in a flex row */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
              {MEDIA_LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="border border-bmh-border rounded px-4 py-2 bg-white text-bmh-dark font-bold text-sm shadow-sm min-w-[80px] text-center"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            3-STEP PROCESS — green background, numbered steps
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-bmh-green text-white">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section header */}
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              3 Simple Steps to Selling Your House Quickly
            </h2>

            {/* Step cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-bmh-red text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Share Your Address and Contact Info</h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  Fill out our short form with your Boise property address and contact information. We will give you a quick call to learn about your situation and set up a convenient walkthrough. No pressure, no hassle, just a simple way to get started with a local expert.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-bmh-red text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Get Your No Obligation Offer</h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  After viewing the property, we will create a clear, no-obligation cash offer tailored to your needs. Skip the repairs, open houses, and delays. You will get a fair, personalized offer fast so you can decide if it is the right move for you.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-bmh-red text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">You Choose the Closing Date</h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  If you accept the offer, we will handle all the paperwork and make selling your Boise home simple. Pick the closing date that works best for you. Whether you need extra time or want to sell quickly, we will work around your timeline.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            WHY US — 6-feature grid
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-white">
          <div className="max-w-6xl mx-auto px-4">
            {/* Section headers */}
            <p className="text-bmh-gray text-sm font-semibold uppercase tracking-widest text-center mb-2">
              Selling Made Easy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-bmh-dark text-center mb-3">
              How We&apos;re Different from Other Home Buyers
            </h2>
            <p className="text-center text-bmh-gray mb-12 text-lg">
              Why Sell Your House with Buy My House
            </p>

            {/* 3-column feature grid (responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHY_US_FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 border border-bmh-border rounded-lg hover:shadow-md transition-shadow bg-bmh-bg-light"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-bmh-dark mb-2">{feature.title}</h3>
                  <p className="text-bmh-gray text-sm leading-relaxed">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            LUKE STORY — photo left, copy right
        ════════════════════════════════════════════════════════════ */}
        <section id="about" className="section-pad bg-bmh-bg-light">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* ── Photo (left on desktop) ──────────────────────────── */}
              <div className="relative">
                <Image
                  src={IMAGES.lukeFamiliy}
                  alt="Luke Caldwell and family — Buy My House Boise"
                  width={600}
                  height={450}
                  className="rounded-xl object-cover w-full shadow-lg"
                  unoptimized  // external .webp URL — skip Next.js optimization
                />
              </div>

              {/* ── Story copy (right on desktop) ───────────────────── */}
              <div>
                <p className="text-bmh-red text-xs font-bold uppercase tracking-widest mb-2">
                  A Local Family Owned Business
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-bmh-dark mb-5">Buy My House</h2>

                <p className="text-bmh-dark text-base leading-relaxed mb-4">
                  Twelve years ago, Luke Caldwell started his real estate journey with a personal goal. He and his wife were preparing to grow their family through adoption, and to help make it possible, they purchased a fixer-upper in Boise, Idaho. With hard work and a clear vision, they transformed the property into a beautiful home. The sale not only supported their adoption but also sparked a passion that would become Luke&apos;s lifelong career.
                </p>
                <p className="text-bmh-dark text-base leading-relaxed mb-4">
                  Since that first renovation, Luke has completed more than 100 home transformations across Boise, Idaho and the surrounding Treasure Valley. Known for his exceptional design and quality craftsmanship, he started Timber and Love, a Boise-based design and build firm. His work attracted national attention, earning him a place on HGTV&apos;s &quot;Boise Boys.&quot;
                </p>
                <p className="text-bmh-dark text-base leading-relaxed mb-8">
                  Today, Luke continues to focus on Boise&apos;s neighborhoods — restoring homes, improving communities, and helping local homeowners sell quickly and easily. If you&apos;re thinking, &quot;I need to sell my house in Boise, Idaho,&quot; you can count on Luke for a fair cash offer backed by years of hands-on experience.
                </p>

                {/* CTA */}
                <a
                  href="#lead-form"
                  className="inline-block bg-bmh-green hover:bg-bmh-green-dark text-white font-bold px-8 py-3 rounded transition-colors"
                >
                  Get Your Offer
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BEFORE / AFTER — side-by-side images
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-bmh-green">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">
              See the Difference
            </h2>

            {/* Image pair */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Before */}
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest text-center mb-3">
                  Before
                </p>
                <Image
                  src={IMAGES.before}
                  alt="Before — distressed home purchased by Buy My House Boise"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full shadow-xl"
                  unoptimized
                />
              </div>

              {/* After */}
              <div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest text-center mb-3">
                  After
                </p>
                <Image
                  src={IMAGES.after}
                  alt="After — beautifully renovated home by Buy My House Boise"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full shadow-xl"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            TESTIMONIAL — Greg R. only (verified customer)
        ════════════════════════════════════════════════════════════ */}
        <section className="section-pad bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-bmh-dark mb-8">What Homeowners Say</h2>

            {/* Single verified testimonial card */}
            <div className="bg-bmh-bg-light border border-bmh-border rounded-xl p-8 shadow-sm">
              {/* 5 gold stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-bmh-dark leading-relaxed mb-4">
                &ldquo;Great company in Boise doing amazing work to turn old homes into beautiful new ones.&rdquo;
              </blockquote>

              {/* Attribution */}
              <p className="text-bmh-gray font-semibold text-sm">
                — Greg R., Boise Homeowner
              </p>
            </div>
          </div>
        </section>
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
                <li>3024 W Fairview Ave, Boise, ID 83702</li>
                <li className="text-xs text-white/60">Mon–Sun: Open 24 Hours</li>
              </ul>
            </div>

            {/* ── Navigation ───────────────────────────────────────── */}
            <div>
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Blog</a></li>
                <li>
                  <a
                    href="#lead-form"
                    className="text-bmh-red font-semibold hover:text-red-300 transition-colors"
                  >
                    Get Your Offer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Copyright bar ─────────────────────────────────────── */}
          <div className="border-t border-white/20 pt-6 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Buy My House. All Rights Reserved. | 3024 W Fairview Ave, Boise, ID 83702
          </div>
        </div>
      </footer>
    </>
  );
}
