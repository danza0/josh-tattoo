/**
 * Shared content types + default (fallback) content.
 *
 * These defaults mirror the copy/photos the site shipped with. They are used
 * whenever Sanity is not configured, or a Sanity query returns nothing, so the
 * site always renders real content. Once the client edits values in the Studio,
 * the Sanity data takes over.
 *
 * Everything a non-technical editor would touch lives here and in the matching
 * Sanity `siteSettings` singleton: brand, navigation, hero, marquee, section
 * copy, images, links and dates.
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

export interface NavLink {
  label: string;
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export interface Reel {
  /** Video source — a Sanity-hosted file URL, or a local /reels/*.mp4 path. */
  src: string;
  /** Link to the reel on Instagram. */
  link: string;
}

export interface SiteContent {
  // ── Brand & navigation ────────────────────────────────────────────────────
  brandName: string;
  navLinks: NavLink[];
  bookLabel: string;
  bookHref: string;

  // ── Hero ──────────────────────────────────────────────────────────────────
  heroHeadline: string;
  heroCreditLine1: string;
  heroCreditLine2: string;
  scrollLabel: string;

  // ── Marquee ───────────────────────────────────────────────────────────────
  marqueeText: string;

  // ── About / statue overlays ───────────────────────────────────────────────
  about: string;
  philosophyQuote: string;
  sidenote: string;

  // ── Portfolio header ──────────────────────────────────────────────────────
  workHeadingTop: string;
  workHeadingBottom: string;
  workSubtitle: string;

  // ── Booking CTA ───────────────────────────────────────────────────────────
  bookingLine1: string;
  bookingLine2: string;
  bookingSubtext: string;

  // ── Process ───────────────────────────────────────────────────────────────
  processLabel: string;
  processSteps: ProcessStep[];

  // ── Philosophy section ────────────────────────────────────────────────────
  philosophyAttribution: string;
  portraitUrl: string;

  // ── Travel header ─────────────────────────────────────────────────────────
  travelLabel: string;
  travelHeadingTop: string;
  travelHeadingBottom: string;
  travelTagline: string;
  travelCtaLabel: string;

  // ── Availability ──────────────────────────────────────────────────────────
  availabilityLabel: string;
  availabilityCtaLabel: string;
  availability: {
    headlineScript: string;
    headlineBold: string;
    intro: string;
    details: DetailRow[];
  };

  // ── Instagram ─────────────────────────────────────────────────────────────
  instagramHeading: string;
  instagramFollowLabel: string;
  instagramUrl: string;
  reels: Reel[];

  // ── Testimonials header ───────────────────────────────────────────────────
  testimonialsHeading: string;

  // ── Footer ────────────────────────────────────────────────────────────────
  footerSubscribeHeading: string;
  footerDetails: string;
  contactEmail: string;
  copyright: string;
}

// ── Defaults ────────────────────────────────────────────────────────────────

export const DEFAULT_SITE: SiteContent = {
  brandName: "JOSH SWID",
  navLinks: [
    { label: "WORK", href: "#work" },
    { label: "ABOUT", href: "#about" },
    { label: "PROCESS", href: "#process" },
    { label: "TRAVEL", href: "#travel" },
  ],
  bookLabel: "BOOK EXPERIENCE",
  bookHref: "#availability",

  heroHeadline: "JOSH SWID",
  heroCreditLine1: "Josh Swid, Vancouver-based Tattoo Artist",
  heroCreditLine2: "Independent Artist · Touring Worldwide",
  scrollLabel: "KEEP SCROLLING",

  marqueeText:
    "FINE LINE · SACRED GEOMETRY · CLASSICAL REALISM · BLACK & GREY · MEMENTO VIVERE · JOSH SWID · VANCOUVER · TOURING WORLDWIDE · CUSTOM ONLY",

  about:
    "Josh Swid is a Vancouver-based tattoo artist. Most of his work happens before the needle touches skin. He draws from classical mythology, Stoic philosophy, sacred geometry. Subjects with real depth, built in black and grey, designed for your body specifically. He doesn’t do flash. Every piece is its own world.",
  philosophyQuote:
    "My approach to designing tattoos is intentional. It creates space to think, refine, and allow you to commit with confidence.",
  sidenote:
    "Each piece is custom designed — drawn for you alone. No flash. No templates. Your tattoo exists nowhere else.",

  workHeadingTop: "THE",
  workHeadingBottom: "WORK.",
  workSubtitle: "Custom designed. One of one. No flash. No repeats.",

  bookingLine1: "BOOK YOUR",
  bookingLine2: "EXPERIENCE",
  bookingSubtext: "Reserve your spot",

  processLabel: "02 — THE PROCESS",
  processSteps: [
    {
      number: "01",
      title: "INQUIRY",
      body: "Submit the form. Share your concept, placement, and scale. Josh reviews every request personally.",
    },
    {
      number: "02",
      title: "CONSULTATION",
      body: "A focused conversation about your vision. Josh develops the concept collaboratively. The design begins here.",
    },
    {
      number: "03",
      title: "DESIGN",
      body: "Custom artwork drawn for you alone. No flash. No templates. Your piece exists nowhere else.",
    },
    {
      number: "04",
      title: "TATTOO DAY",
      body: "Your session at the studio. Once spots are filled, the window closes.",
    },
  ],

  philosophyAttribution: "— Josh Swid",
  portraitUrl: "/portrait/josh-portrait.jpg",

  travelLabel: "TRAVEL DATES",
  travelHeadingTop: "ON THE",
  travelHeadingBottom: "ROAD.",
  travelTagline:
    "Upcoming travel dates and guest spot appearances. Limited availability at each location.",
  travelCtaLabel: "INQUIRE ABOUT TRAVEL DATES ↗",

  availabilityLabel: "03 — RESERVE YOUR SPOT",
  availabilityCtaLabel: "BOOK YOUR FREE CONSULTATION ↗",
  availability: {
    headlineScript: "Two weeks.",
    headlineBold: "10 SPOTS.",
    intro:
      "Josh takes a limited number of sessions on each tour stop. When they’re filled, they’re filled. No waitlist. Fill out the form with your info and book your free consultation.",
    details: [
      { label: "AVAILABLE", value: "May 18–31, 2026" },
      { label: "STYLE", value: "Fine Line · Sacred Geometry · Black & Grey" },
      { label: "SESSION RATE", value: "Contact for pricing" },
      { label: "LOCATION", value: "Traveling — see tour dates" },
      { label: "DEPOSIT", value: "Required to hold your date" },
    ],
  },

  instagramHeading: "Instagram",
  instagramFollowLabel: "FOLLOW ON INSTAGRAM ↗",
  instagramUrl: "https://instagram.com/joshswid",
  reels: [
    { src: "/reels/reel1.mp4", link: "https://www.instagram.com/reel/DU8pCbRlPxs/" },
    { src: "/reels/reel2.mp4", link: "https://www.instagram.com/reel/DWM6e9vjC1a/" },
    { src: "/reels/reel3.mp4", link: "https://www.instagram.com/reel/DVmBgBCD6BP/" },
    { src: "/reels/reel4.mp4", link: "https://www.instagram.com/reel/DJFtfGNTWF-/" },
  ],

  testimonialsHeading: "Collectors say",

  footerSubscribeHeading: "STAY CONNECTED",
  footerDetails:
    "Vancouver-based tattoo artist specialising in fine line, sacred geometry, and classical realism. Available for guest spots worldwide.",
  contactEmail: "josh@joshswid.com",
  copyright: "© 2026 Josh Swid · All Rights Reserved",
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
