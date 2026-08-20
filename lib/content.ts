/**
 * Server-side content layer.
 *
 * Each getter returns Sanity content when the CMS is configured and has data,
 * and otherwise the hard-coded defaults — so the site always renders.
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
} from "./content-types";

const FETCH_OPTS = { next: { revalidate: 60 } } as const;

async function safeFetch<T>(query: string): Promise<T | null> {
  if (!hasSanity) return null;
  try {
    return await client.fetch<T>(query, {}, FETCH_OPTS);
  } catch (err) {
    console.error("[content] Sanity fetch failed, using defaults:", err);
    return null;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const data = await safeFetch<Partial<SiteContent>>(
    `*[_type == "siteSettings"][0]{ about, philosophyQuote, sidenote, availability }`
  );
  if (!data) return DEFAULT_SITE;
  // Merge so any unfilled field falls back to the default.
  return {
    about: data.about || DEFAULT_SITE.about,
    philosophyQuote: data.philosophyQuote || DEFAULT_SITE.philosophyQuote,
    sidenote: data.sidenote || DEFAULT_SITE.sidenote,
    availability: {
      headlineScript:
        data.availability?.headlineScript || DEFAULT_SITE.availability.headlineScript,
      headlineBold:
        data.availability?.headlineBold || DEFAULT_SITE.availability.headlineBold,
      intro: data.availability?.intro || DEFAULT_SITE.availability.intro,
      details:
        data.availability?.details?.length
          ? data.availability.details
          : DEFAULT_SITE.availability.details,
    },
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
