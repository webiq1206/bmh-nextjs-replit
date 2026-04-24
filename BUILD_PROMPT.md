# BMH Replit Next.js Build — Full Spec

## Project
Pixel-perfect Next.js 14 replica of buymyhouse.co for Replit deployment.
Entity: Buy My House Boise

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- No external UI libraries — pure Tailwind + custom CSS only

## Brand Colors
```css
--bmh-green: #3d564a;      /* Primary green — nav bg, section headers, CTAs */
--bmh-red: #d63637;         /* Accent red — CTA buttons */
--bmh-blue: #066aab;        /* Blue — links, secondary CTAs */
--bmh-white: #ffffff;
--bmh-bg-light: #f9fbfc;    /* Light bg sections */
--bmh-dark: #32373c;        /* Dark body text */
--bmh-green-dark: #2c4039;  /* Hover state on green */
```

## Typography
- Font: Inter (via next/font/google) — clean sans-serif matching the site
- Body: 16px/1.6
- H1: 48–56px bold
- H2: 28–36px bold
- H3: 20–24px semibold

## Images — use production URLs directly (no download needed)
- Green logo: https://buymyhouse.co/wp-content/uploads/2023/10/Buy-My-House-Text-Logo-Green-Sell-My-House-Boise-Home-Buyers.png
- White logo: https://buymyhouse.co/wp-content/uploads/2023/10/Buy-My-House-Text-Logo-White-Sell-My-House-Boise-Home-Buyers-1024x234.png
- Hero bg: https://buymyhouse.co/wp-content/uploads/2024/02/Buy-My-House-Boise-Sell-My-House-Boise-Boise-Cash-Home-Buyers-Lanscape.jpg
- Luke family: https://buymyhouse.co/wp-content/w3-webp/uploads/2024/02/Buy-My-House-Sell-My-House-Cash-Home-Buyers-Luke-Caldwell-Family-Photo-Boise-Idaho-scaled.jpgw3.webp
- Before: https://buymyhouse.co/wp-content/w3-webp/uploads/2024/01/Buy-My-House-Cash-Home-Buyers-Before-Image-scaled.jpgw3.webp
- After: https://buymyhouse.co/wp-content/w3-webp/uploads/2024/01/Buy-My-House-Cash-Home-Buyers-After-Image-scaled.jpgw3.webp

## next.config.js — allow external images
Must add buymyhouse.co to remotePatterns in next.config.js for next/image to work.

## Page Sections (app/page.tsx) — in exact order:

### 1. NAV (components/Nav.tsx)
- White background, sticky top
- Green logo (img tag, not next/image — external URL)
- Nav links: Home, About, Blog (href="#" placeholders)
- Phone: (208) 405-2274 — styled, clickable tel: link
- "Get Your Offer" button — red bg (#d63637), white text, rounded, links to #lead-form

### 2. HERO SECTION
- Full-width background image (landscape photo URL above)
- Dark overlay (rgba 0,0,0,0.55)
- Left side content:
  - H1: "Buy My House" (white, large)
  - H2: "MOST TRUSTED CASH HOME BUYER IN BOISE" (white, uppercase, tracking-wide)
  - Subtext: "No Fees. No Commissions. No Repairs."
- Right side: LEAD FORM (id="lead-form") — see Lead Form spec below
- Mobile: stack vertically, form below content

### 3. AS SEEN ON BAR
- Light gray/white bg
- Text: "AS SEEN ON" (small caps, gray)
- Logo row: HGTV, Discovery Channel, People, HBO Max, Dwell, Realtor.com
- Use text badges styled as media logos (white bg cards, gray border, bold text) since image URLs aren't available
- Centered, responsive flex row

### 4. 3-STEP PROCESS SECTION
- Green background (#3d564a), white text
- Section header: "3 Simple Steps to selling your house quickly"
- Three step cards side by side:
  **Step 1:** "Share Your Address and Contact Info"
  Body: "Fill out our short form with your Boise property address and contact information. We will give you a quick call to learn about your situation and set up a convenient walkthrough. No pressure, no hassle, just a simple way to get started with a local expert."
  
  **Step 2:** "Get Your No Obligation Offer"
  Body: "After viewing the property, we will create a clear, no-obligation cash offer tailored to your needs. Skip the repairs, open houses, and delays. You will get a fair, personalized offer fast so you can decide if it is the right move for you."
  
  **Step 3:** "You Choose the Closing Date"
  Body: "If you accept the offer, we will handle all the paperwork and make selling your Boise home simple. Pick the closing date that works best for you. Whether you need extra time or want to sell quickly, we will work around your timeline."

### 5. WHY US SECTION
- White background
- Section header: "How We're Different from Other Home Buyers"
- Subheader: "Why Sell Your House with Buy My House"
- 3-column feature grid (2-col on tablet, 1-col mobile):
  1. "Local Experts Who Know the Market" — "We understand the unique challenges of selling in Idaho and surrounding areas. Our team moves quickly and makes the process simple."
  2. "No Cleaning or Repairs Needed" — "You don't need to fix a thing. We'll buy your house exactly as it is, no matter the condition or situation."
  3. "Personalized Offer Within 24 Hours" — "Once we talk and see the property, we'll send you a clear, fair offer within 24 hours. No lowballs or drawn-out negotiations."
  4. "Close on Your Timeline" — "Whether you need to move in a week or take your time, we'll work with your schedule and close when you're ready."
  5. "No Fees, Commissions, or Closing Costs" — "We're direct buyers, not agents. That means no middlemen, no hidden charges, and more money in your pocket."
  6. "A Straightforward Selling Experience" — "From your first message to final closing, we keep things simple. No pressure, no confusion — just a smooth, honest process."

### 6. LUKE STORY SECTION
- Light bg (#f9fbfc)
- Two-column layout: photo left, text right (mobile: stack)
- Photo: Luke family image (URL above) — rounded corners
- Text:
  - Small label: "A Local Family Owned Business"
  - H2: "Buy My House"
  - Body: "Twelve years ago, Luke Caldwell started his real estate journey with a personal goal. He and his wife were preparing to grow their family through adoption, and to help make it possible, they purchased a fixer-upper in Boise, Idaho. With hard work and a clear vision, they transformed the property into a beautiful home. The sale not only supported their adoption but also sparked a passion that would become Luke's lifelong career."
  - Body cont: "Since that first renovation, Luke has completed more than 100 home transformations across Boise, Idaho and the surrounding Treasure Valley. Known for his exceptional design and quality craftsmanship, he started Timber and Love, a Boise-based design and build firm. His work attracted national attention, earning him a place on HGTV's 'Boise Boys.'"
  - Body cont: "Today, Luke continues to focus on Boise's neighborhoods — restoring homes, improving communities, and helping local homeowners sell quickly and easily."
  - CTA button: "Get Your Offer" (green, links to #lead-form)

### 7. BEFORE/AFTER SECTION
- Dark/green bg (#3d564a)
- Section header: "See the Difference" (white)
- Side-by-side images with labels:
  - Left: "BEFORE" label + before image URL
  - Right: "AFTER" label + after image URL
- Both images same height, object-fit cover, rounded corners

### 8. TESTIMONIAL SECTION
- White background
- ONE testimonial only — Greg R. (ONLY verified customer):
  - 5 gold stars (★★★★★ Unicode or SVG)
  - Quote: "Great company in Boise doing amazing work to turn old homes into beautiful new ones."
  - Attribution: "— Greg R., Boise Homeowner"
- Centered card, subtle shadow

### 9. FOOTER
- Green background (#3d564a), white text
- White logo (img tag, external URL)
- Phone: (208) 405-2274
- Email: connect@buymyhouse.co
- Address: 3024 W Fairview Ave, Boise, ID 83702
- Nav links: Home, About, Blog
- Copyright: "© 2025 Buy My House. All Rights Reserved."

---

## LEAD FORM COMPONENT (components/LeadForm.tsx)

Fields:
- First Name (text, required)
- Last Name (text, required)  
- Property Address — address1 (text, required, placeholder "Street Address")
- City (text, required)
- Phone (tel, required, placeholder "(208) 405-2274")

Submit button: "Get Your Offer" — red (#d63637), full width, white text, bold

On submit:
- POST to /api/submit-lead (server route)
- Show loading state on button
- On success: show green success message "Thank you! We'll be in touch within 24 hours."
- On error: show red error message "Something went wrong. Please call us at (208) 405-2274."

Server route (app/api/submit-lead/route.ts):
- POST to GHL API: https://services.leadconnectorhq.com/contacts/
- Headers: Authorization: Bearer {MC_API_TOKEN from env}, Version: 2021-07-28, Content-Type: application/json
- Body: { firstName, lastName, phone, address1, city, locationId: GHL_BMH_LOCATION_ID }
- Use env vars: GHL_BMH_API_KEY, GHL_BMH_LOCATION_ID
- Return 200 on success, 500 on error

.env.local:
```
GHL_BMH_API_KEY=pit-a8fab391-41a1-4a81-867e-5ac574018692
GHL_BMH_LOCATION_ID=5Smu9KzrIHDlIsuLYn5w
```

---

## Files to create:

1. `next.config.js` — remotePatterns for buymyhouse.co images
2. `app/layout.tsx` — Inter font, global meta (title: "Buy My House Boise | Cash Home Buyers"), CSS vars
3. `app/globals.css` — CSS custom properties + base styles
4. `tailwind.config.ts` — bmh color tokens
5. `components/Nav.tsx`
6. `components/LeadForm.tsx`
7. `app/api/submit-lead/route.ts`
8. `app/page.tsx` — full homepage with all sections
9. `.env.local` — GHL credentials
10. `.gitignore` — exclude .env.local, node_modules, .next

## Quality requirements
- Mobile-first responsive — looks great on phone
- All inline comments on non-obvious code
- npm run build must pass with zero errors
- No TypeScript errors
- No placeholder text except where spec says use href="#"
