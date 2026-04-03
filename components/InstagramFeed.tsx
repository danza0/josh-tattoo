"use client";

/**
 * InstagramFeed — Embedded Instagram Reels from @joshswid.
 * Visitors can play/pause reels directly on the site.
 */

import { motion } from "framer-motion";

const REELS = [
  { id: "DU8pCbRlPxs" },
  { id: "DWM6e9vjC1a" },
  { id: "DVmBgBCD6BP" },
  { id: "DJFtfGNTWF-" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function InstagramFeed() {
  return (
    <section className="bg-bg-dark py-24 px-6 md:px-10 lg:px-16">
      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-serif italic text-text-light mb-14"
        style={{ fontSize: "clamp(2rem, 6vw, 6rem)" }}
      >
        Instagram
      </motion.h2>

      {/* Reels grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {REELS.map((reel, i) => (
          <motion.div
            key={reel.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            className="relative w-full overflow-hidden rounded-sm bg-[#1a1a1a]"
            style={{ aspectRatio: "9 / 16" }}
          >
            <iframe
              src={`https://www.instagram.com/reel/${reel.id}/embed`}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              allow="encrypted-media"
              allowFullScreen
              title={`Instagram Reel ${reel.id}`}
            />
          </motion.div>
        ))}
      </div>

      {/* Follow CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-14 flex justify-center"
      >
        <a
          href="https://instagram.com/joshswid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted text-xs tracking-widest uppercase font-body hover:text-accent transition-colors duration-300 flex items-center gap-2"
        >
          FOLLOW ON INSTAGRAM ↗
        </a>
      </motion.div>
    </section>
  );
}
