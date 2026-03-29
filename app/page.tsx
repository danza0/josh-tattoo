/**
 * page.tsx — Josh Swid tattoo artist personal brand website.
 * Single-page scroll experience with 12 sections.
 * All heavy components are lazy-loaded for performance.
 */

import dynamic from "next/dynamic";

// Layout components (not lazy — needed immediately)
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmoothScroll from "@/components/SmoothScroll";

// Lazy-loaded below-fold sections
const StatueSection = dynamic(() => import("@/components/StatueSection"));
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
      <Navbar />

      <main>
        <Hero />
        <StatueSection />
        <Marquee />
        <Portfolio />
        <BookingCTA />
        <Process />
        <Philosophy />
        <Studio />
        <Availability />
        <InstagramFeed />
        <Testimonials />
      </main>

      <Footer />
    </SmoothScroll>
  );
}

