"use client";

/**
 * InstagramFeed — Scattered/asymmetric grid of IG placeholder images.
 * Dark background. Will be replaced with real IG content later.
 */

import { motion } from "framer-motion";

const IG_IMAGES = [
  { id: 1, label: "IG 1", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { id: 2, label: "IG 2", colSpan: "", rowSpan: "" },
  { id: 3, label: "IG 3", colSpan: "", rowSpan: "row-span-2" },
  { id: 4, label: "IG 4", colSpan: "", rowSpan: "" },
  { id: 5, label: "IG 5", colSpan: "col-span-2", rowSpan: "" },
  { id: 6, label: "IG 6", colSpan: "", rowSpan: "" },
  { id: 7, label: "IG 7", colSpan: "", rowSpan: "row-span-2" },
  { id: 8, label: "IG 8", colSpan: "", rowSpan: "" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: "easeOut" as const },
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

      {/* Asymmetric grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 auto-rows-[120px] md:auto-rows-[160px] gap-2 md:gap-3">
        {IG_IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={fadeUp}
            className={`${img.colSpan} ${img.rowSpan} group relative overflow-hidden cursor-pointer`}
          >
            <div
              className="w-full h-full flex items-center justify-center group-hover:opacity-80 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 50%, #1a1a1a 100%)",
              }}
            >
              {/* Instagram icon overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  className="opacity-60"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
                </svg>
              </div>
              <span className="text-white/20 text-xs tracking-[0.3em] uppercase font-body group-hover:text-white/0 transition-colors duration-300">
                {img.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Instagram handle link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex justify-center"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted text-xs tracking-widest uppercase font-body hover:text-accent transition-colors duration-300 flex items-center gap-2"
        >
          Follow on Instagram ↗
        </a>
      </motion.div>
    </section>
  );
}
