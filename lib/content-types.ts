/**
 * Shared content types + default (fallback) content.
 *
 * These defaults mirror the copy/photos the site shipped with. They are used
 * whenever Sanity is not configured, or a Sanity query returns nothing, so the
 * site always renders real content. Once the client edits values in the Studio,
 * the Sanity data takes over.
 */

export type TravelStatus =
  | "BOOKING OPEN"
  | "WAITLIST"
  | "COMING SOON"
  | "COMPLETED";

export interface TravelDate {
  city: string;
  studio: string;
  dates: string;
  status: TravelStatus;
}

export interface PortfolioItem {
  /** Public path (fallback) OR resolved Sanity image URL. */
  src: string;
  label: string;
  aspect: string;
}

export interface Testimonial {
  text: string;
  name: string;
  stars: number;
}

export interface DetailRow {
  label: string;
  value: string;
}

export interface SiteContent {
  about: string;
  philosophyQuote: string;
  sidenote: string;
  availability: {
    headlineScript: string;
    headlineBold: string;
    intro: string;
    details: DetailRow[];
  };
}

// ── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_SITE: SiteContent = {
  about:
    "Josh Swid is a Vancouver-based tattoo artist. Most of his work happens before the needle touches skin. He draws from classical mythology, Stoic philosophy, sacred geometry. Subjects with real depth, built in black and grey, designed for your body specifically. He doesn’t do flash. Every piece is its own world.",
  philosophyQuote:
    "My approach to designing tattoos is intentional. It creates space to think, refine, and allow you to commit with confidence.",
  sidenote:
    "Each piece is custom designed — drawn for you alone. No flash. No templates. Your tattoo exists nowhere else.",
  availability: {
    headlineScript: "Two weeks.",
    headlineBold: "10 SPOTS.",
    intro:
      "Josh has a finite number of sessions during his guest spot at Zen. When they’re filled, they’re filled. No waitlist. Fill out the form with your info and book your free consultation.",
    details: [
      { label: "AVAILABLE", value: "May 18–31, 2026" },
      { label: "STYLE", value: "Fine Line · Sacred Geometry · Black & Grey" },
      { label: "SESSION RATE", value: "Contact for pricing" },
      { label: "STUDIO", value: "Zen Tattoo · Oakville, ON" },
      { label: "DEPOSIT", value: "Required to hold your date" },
    ],
  },
};

export const DEFAULT_TRAVEL_DATES: TravelDate[] = [
  { city: "Miami, FL", studio: "Grit City Tattoo", dates: "May 15–18, 2025", status: "BOOKING OPEN" },
  { city: "Austin, TX", studio: "Iron Brush Studio", dates: "June 7–10, 2025", status: "WAITLIST" },
  { city: "Los Angeles, CA", studio: "Covenant Tattoo", dates: "July 20–23, 2025", status: "COMING SOON" },
  { city: "New York, NY", studio: "Sacred Ink NYC", dates: "April 1–4, 2025", status: "COMPLETED" },
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  { src: "/portfolio/jsp8.jpg", label: "PIECE 08", aspect: "aspect-[3/4]" },
  { src: "/portfolio/jsp7.jpg", label: "PIECE 07", aspect: "aspect-square" },
  { src: "/portfolio/jsp6.jpg", label: "PIECE 06", aspect: "aspect-[4/5]" },
  { src: "/portfolio/jsp5.jpg", label: "PIECE 05", aspect: "aspect-[2/3]" },
  { src: "/portfolio/jsp4.jpg", label: "PIECE 04", aspect: "aspect-[3/4]" },
  { src: "/portfolio/jsp3.jpg", label: "PIECE 03", aspect: "aspect-square" },
  { src: "/portfolio/jsp2.jpg", label: "PIECE 02", aspect: "aspect-[4/5]" },
  { src: "/portfolio/jsp1.jpg", label: "PIECE 01", aspect: "aspect-[3/4]" },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { text: "The best tattoo experience I've ever had. Josh's attention to detail is unmatched.", name: "Alex M.", stars: 5 },
  { text: "He turned my idea into something I never could have imagined. True artist.", name: "Sarah K.", stars: 5 },
  { text: "Worth every minute of the consultation. The design process is what makes Josh different.", name: "Marcus T.", stars: 5 },
  { text: "From concept to completion, the experience was unlike any other studio I've visited.", name: "Olivia R.", stars: 5 },
  { text: "My tattoo feels like it was always meant to be on my body. The custom design process is incredible.", name: "Daniel W.", stars: 5 },
];
