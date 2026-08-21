"use client";

/**
 * Availability — Reserve your spot section.
 * Section label, giant mixed typography, body text, and a details table.
 */

import { motion } from "framer-motion";
import { DEFAULT_SITE, type SiteContent } from "@/lib/content-types";

export default function Availability({
  site = DEFAULT_SITE,
}: {
  site?: SiteContent;
}) {
  const { headlineScript, headlineBold, intro, details } = site.availability;
  return (
    <section
      id="availability"
      className="bg-bg-light py-24 md:py-36 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest uppercase text-text-muted font-body mb-12"
        >
          {site.availabilityLabel}
        </motion.p>

        {/* Giant mixed typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-10"
        >
          <p
            className="font-serif italic text-text-primary leading-snug"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            {headlineScript}
          </p>
          <p
            className="font-headline font-black text-text-primary leading-none"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5.5rem)" }}
          >
            {headlineBold}
          </p>
        </motion.div>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-text-muted font-body text-base md:text-lg leading-relaxed mb-16 max-w-2xl"
        >
          {intro}
        </motion.p>

        {/* Details table */}
        <motion.dl
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="divide-y divide-text-primary/10"
        >
          {details.map((row) => (
            <div
              key={row.label}
              className="flex flex-col sm:flex-row sm:items-baseline py-5 gap-2 sm:gap-8"
            >
              <dt className="text-xs tracking-widest uppercase text-text-muted font-body sm:w-48 flex-shrink-0">
                {row.label}
              </dt>
              <dd className="font-body text-text-primary text-sm md:text-base">
                {row.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          <a
            href={site.bookHref}
            className="inline-flex items-center gap-2 bg-text-primary text-text-light px-10 py-4 text-xs tracking-widest uppercase font-body hover:bg-accent transition-colors duration-400 font-medium"
          >
            {site.availabilityCtaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
