/**
 * page.tsx — Josh Swid tattoo artist personal brand website.
 * Single-page scroll experience with 12 sections.
 * All heavy components are lazy-loaded for performance.
 */

import dynamic from "next/dynamic";

// Layout components (not lazy — needed immediately)
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

// Hero and StatueSection both contain (or wrap) R3F code.
// In Next.js 15, `ssr: false` is only permitted inside Client Components.
// ClientSections is a "use client" file that wraps these two with ssr: false.
import { Hero, StatueSection } from "@/components/ClientSections";

// Lazy-loaded below-fold sections
const Marquee = dynamic(() => import("@/components/Marquee"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const BookingCTA = dynamic(() => import("@/components/BookingCTA"));
const Process = dynamic(() => import("@/components/Process"));
const Philosophy = dynamic(() => import("@/components/Philosophy"));
const Studio = dynamic(() => import("@/components/Studio"));
const Availability = dynamic(() => import("@/components/Availability"));
const InstagramFeed = dynamic(() => import("@/components/InstagramFeed"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <SmoothScroll>
      {/* Fixed navigation */}
      <Navbar />

      <main>
        {/* 1. HERO — Full-viewport, giant headline behind 3D statue placeholder */}
        <Hero />

        {/* 2. SCROLL-DRIVEN STATUE SECTION — Sticky statue + animated text reveals */}
        <StatueSection />

        {/* 3. MARQUEE TICKER */}
        <Marquee />

        {/* 4. PORTFOLIO — "THE WORK." masonry grid */}
        <Portfolio />

        {/* 5. BOOKING CTA — Giant typographic call to action */}
        <BookingCTA />

        {/* 6. PROCESS — 4-step process grid */}
        <Process />

        {/* 7. PHILOSOPHY — Dark quote section with portrait placeholder */}
        <Philosophy />

        {/* 8. STUDIO — "ZEN TATTOO." with image placeholders */}
        <Studio />

        {/* 9. AVAILABILITY — Reserve your spot + details table */}
        <Availability />

        {/* 10. INSTAGRAM FEED — Scattered grid placeholders */}
        <InstagramFeed />

        {/* 11. TESTIMONIALS — "Collectors Say" horizontal scroll */}
        <Testimonials />
      </main>

      {/* 12. FOOTER */}
      <Footer />
    </SmoothScroll>
  );
}
