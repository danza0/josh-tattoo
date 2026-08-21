/**
 * Server-side content layer.
 *
 * Each getter returns Sanity content when the CMS is configured and has data,
 * and otherwise the hard-coded defaults — so the site always renders. Every
 * field is merged individually, so a half-filled Studio document still falls
 * back to sensible defaults per field.
 */

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { hasSanity } from "@/sanity/env";
import {
  DEFAULT_SITE,
  DEFAULT_TRAVEL_DATES,
  DEFAULT_PORTFOLIO,
  DEFAULT_TESTIMONIALS,
  type SiteContent,
  type TravelDate,
  type PortfolioItem,
  type Testimonial,
  type Reel,
} from "./content-types";

// Always read fresh so a published edit in the Studio shows on the next page
// load (no ISR delay). Traffic is low, so per-request reads are fine.
const FETCH_OPTS = { cache: "no-store" } as const;

async function safeFetch<T>(query: string): Promise<T | null> {
  if (!hasSanity) return null;
  try {
    return await client.fetch<T>(query, {}, FETCH_OPTS);
  } catch (err) {
    console.error("[content] Sanity fetch failed, using defaults:", err);
    return null;
  }
}

/** Prefer a non-empty string from Sanity, else the default. */
const str = (v: unknown, d: string): string =>
  typeof v === "string" && v.trim().length ? v : d;

/** Prefer a non-empty array from Sanity, else the default. */
const arr = <T>(v: T[] | undefined | null, d: T[]): T[] =>
  Array.isArray(v) && v.length ? v : d;

type RawSite = Partial<
  Omit<SiteContent, "reels" | "portraitUrl">
> & {
  portraitUrl?: string;
  reels?: { src?: string; link?: string }[];
};

export async function getSiteContent(): Promise<SiteContent> {
  const d = await safeFetch<RawSite>(
    `*[_type == "siteSettings"][0]{
      brandName, navLinks, bookLabel, bookHref,
      heroHeadline, heroCreditLine1, heroCreditLine2, scrollLabel,
      marqueeText,
      about, philosophyQuote, sidenote,
      workHeadingTop, workHeadingBottom, workSubtitle,
      bookingLine1, bookingLine2, bookingSubtext,
      processLabel, processSteps,
      philosophyAttribution, "portraitUrl": portrait.asset->url,
      travelLabel, travelHeadingTop, travelHeadingBottom, travelTagline, travelCtaLabel,
      availabilityLabel, availabilityCtaLabel, availability,
      instagramHeading, instagramFollowLabel, instagramUrl,
      "reels": reels[]{ link, "src": video.asset->url },
      testimonialsHeading,
      footerSubscribeHeading, footerDetails, contactEmail, copyright
    }`
  );
  if (!d) return DEFAULT_SITE;

  const D = DEFAULT_SITE;

  // Reels: the Instagram link is editable per slot; the video file is optional
  // and falls back to the bundled local clip at the same index.
  const reels: Reel[] = arr(d.reels, []).length
    ? d.reels!.map((r, i) => ({
        link: str(r.link, D.reels[i]?.link ?? ""),
        src: str(r.src, D.reels[i]?.src ?? "/reels/reel1.mp4"),
      }))
    : D.reels;

  return {
    brandName: str(d.brandName, D.brandName),
    navLinks: arr(d.navLinks, D.navLinks),
    bookLabel: str(d.bookLabel, D.bookLabel),
    bookHref: str(d.bookHref, D.bookHref),

    heroHeadline: str(d.heroHeadline, D.heroHeadline),
    heroCreditLine1: str(d.heroCreditLine1, D.heroCreditLine1),
    heroCreditLine2: str(d.heroCreditLine2, D.heroCreditLine2),
    scrollLabel: str(d.scrollLabel, D.scrollLabel),

    marqueeText: str(d.marqueeText, D.marqueeText),

    about: str(d.about, D.about),
    philosophyQuote: str(d.philosophyQuote, D.philosophyQuote),
    sidenote: str(d.sidenote, D.sidenote),

    workHeadingTop: str(d.workHeadingTop, D.workHeadingTop),
    workHeadingBottom: str(d.workHeadingBottom, D.workHeadingBottom),
    workSubtitle: str(d.workSubtitle, D.workSubtitle),

    bookingLine1: str(d.bookingLine1, D.bookingLine1),
    bookingLine2: str(d.bookingLine2, D.bookingLine2),
    bookingSubtext: str(d.bookingSubtext, D.bookingSubtext),

    processLabel: str(d.processLabel, D.processLabel),
    processSteps: arr(d.processSteps, D.processSteps),

    philosophyAttribution: str(d.philosophyAttribution, D.philosophyAttribution),
    portraitUrl: str(d.portraitUrl, D.portraitUrl),

    travelLabel: str(d.travelLabel, D.travelLabel),
    travelHeadingTop: str(d.travelHeadingTop, D.travelHeadingTop),
    travelHeadingBottom: str(d.travelHeadingBottom, D.travelHeadingBottom),
    travelTagline: str(d.travelTagline, D.travelTagline),
    travelCtaLabel: str(d.travelCtaLabel, D.travelCtaLabel),

    availabilityLabel: str(d.availabilityLabel, D.availabilityLabel),
    availabilityCtaLabel: str(d.availabilityCtaLabel, D.availabilityCtaLabel),
    availability: {
      headlineScript: str(d.availability?.headlineScript, D.availability.headlineScript),
      headlineBold: str(d.availability?.headlineBold, D.availability.headlineBold),
      intro: str(d.availability?.intro, D.availability.intro),
      details: arr(d.availability?.details, D.availability.details),
    },

    instagramHeading: str(d.instagramHeading, D.instagramHeading),
    instagramFollowLabel: str(d.instagramFollowLabel, D.instagramFollowLabel),
    instagramUrl: str(d.instagramUrl, D.instagramUrl),
    reels,

    testimonialsHeading: str(d.testimonialsHeading, D.testimonialsHeading),

    footerSubscribeHeading: str(d.footerSubscribeHeading, D.footerSubscribeHeading),
    footerDetails: str(d.footerDetails, D.footerDetails),
    contactEmail: str(d.contactEmail, D.contactEmail),
    copyright: str(d.copyright, D.copyright),
  };
}

export async function getTravelDates(): Promise<TravelDate[]> {
  const data = await safeFetch<TravelDate[]>(
    `*[_type == "travelDate"] | order(order asc) { city, studio, dates, status }`
  );
  return data && data.length ? data : DEFAULT_TRAVEL_DATES;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await safeFetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc) { text, name, stars }`
  );
  return data && data.length ? data : DEFAULT_TESTIMONIALS;
}

interface RawPortfolio {
  image: Parameters<typeof urlFor>[0];
  label?: string;
  aspect?: string;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const data = await safeFetch<RawPortfolio[]>(
    `*[_type == "portfolioItem"] | order(order asc) { image, label, aspect }`
  );
  if (!data || !data.length) return DEFAULT_PORTFOLIO;
  return data.map((item, i) => ({
    src: urlFor(item.image).width(1000).auto("format").url(),
    label: item.label || `PIECE ${String(i + 1).padStart(2, "0")}`,
    aspect: item.aspect || "aspect-[3/4]",
  }));
}
