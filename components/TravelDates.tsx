"use client";

/**
 * TravelDates — "ON THE ROAD." section for upcoming guest spots and travel dates.
 * Light background, gold accent, staggered card animations.
 */

import { motion } from "framer-motion";
import { DEFAULT_TRAVEL_DATES, DEFAULT_SITE, type TravelStatus, type TravelDate, type SiteContent } from "@/lib/content-types";

const STATUS_STYLES: Record<TravelStatus, string> = {
  "BOOKING OPEN":
    "text-accent border border-accent/60 bg-accent/10",
  WAITLIST:
    "text-text-muted border border-text-muted/30 bg-text-muted/5",
  "COMING SOON":
    "text-text-muted/70 border border-text-muted/20 bg-text-muted/5",
  COMPLETED:
    "text-text-muted/40 border border-text-muted/10 bg-transparent",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function TravelDates({
  dates = DEFAULT_TRAVEL_DATES,
  site = DEFAULT_SITE,
}: {
  dates?: TravelDate[];
  site?: SiteContent;
}) {
  return (
    <section id="travel" className="bg-bg-light py-24 md:py-32 px-6 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest uppercase text-accent font-body mb-8"
        >
          {site.travelLabel}
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hero-headline text-text-primary leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
        >
          {site.travelHeadingTop}
          <br />
          <span className="text-accent">{site.travelHeadingBottom}</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-text-muted font-body text-sm md:text-base tracking-wide max-w-lg mb-16 leading-relaxed"
        >
          {site.travelTagline}
        </motion.p>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16"
        >
          {dates.map((entry, i) => {
            const isCompleted = entry.status === "COMPLETED";
            return (
              <motion.div
                key={`${entry.city}-${i}`}
                variants={cardVariants}
                className={`border border-text-primary/10 p-6 md:p-8 flex flex-col gap-4 transition-opacity duration-300 ${
                  isCompleted ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* City + status row */}
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={`font-headline font-black uppercase leading-none ${
                      isCompleted
                        ? "text-text-muted/40 line-through decoration-text-muted/30"
                        : "text-text-primary"
                    }`}
                    style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
                  >
                    {entry.city}
                  </p>
                  <span
                    className={`shrink-0 text-[10px] tracking-widest uppercase font-body px-2.5 py-1 ${
                      STATUS_STYLES[entry.status]
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>

                {/* Studio name */}
                <p className="text-text-muted font-body text-sm tracking-wide">
                  {entry.studio}
                </p>

                {/* Date range */}
                <p className="font-serif italic text-text-primary/70 text-base">
                  {entry.dates}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <a
            href={site.bookHref}
            className="inline-flex items-center gap-2 border border-accent text-accent px-10 py-4 text-xs tracking-widest uppercase font-body hover:bg-accent hover:text-bg-dark transition-colors duration-300 font-medium"
          >
            {site.travelCtaLabel}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
