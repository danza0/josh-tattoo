"use client";

/**
 * Testimonials — "Collectors Say" horizontally scrollable review cards.
 * Light grey background. Placeholder reviews.
 */

import { motion } from "framer-motion";
import { DEFAULT_TESTIMONIALS, DEFAULT_SITE, type Testimonial, type SiteContent } from "@/lib/content-types";

function StarRating({ count }: { count: number }) {
  return (
    <span className="flex gap-1" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#c9a96e" aria-hidden="true">
          <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,9 2.5,11 3.5,7 1,4.5 4.5,4.5" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials({
  reviews = DEFAULT_TESTIMONIALS,
  site = DEFAULT_SITE,
}: {
  reviews?: Testimonial[];
  site?: SiteContent;
}) {
  return (
    <section className="py-24 px-0 overflow-hidden" style={{ background: "#eeebe7" }}>
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-6 md:px-10 lg:px-16 mb-14"
      >
        <h2
          className="font-serif italic text-text-primary"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
        >
          {site.testimonialsHeading}
        </h2>
      </motion.div>

      {/* Horizontally scrollable cards */}
      <div className="flex gap-5 px-6 md:px-10 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {reviews.map((review, i) => (
          <motion.article
            key={`${review.name}-${i}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex-shrink-0 snap-start bg-white p-8 flex flex-col justify-between"
            style={{ width: "clamp(280px, 35vw, 400px)", minHeight: "220px" }}
          >
            <p className="font-body text-text-primary text-base leading-relaxed mb-8">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex flex-col gap-2">
              <StarRating count={review.stars} />
              <p className="text-xs tracking-widest uppercase text-text-muted font-body">
                {review.name} · {review.stars} star review
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
