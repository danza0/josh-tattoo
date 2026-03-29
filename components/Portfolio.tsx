"use client";

/**
 * Portfolio — "THE WORK." section.
 * Asymmetric masonry-style grid of placeholder boxes.
 * Hover: scale + overlay. Scroll reveal via Framer Motion whileInView.
 */

import { motion } from "framer-motion";

// Placeholder images with varied aspect ratios to simulate masonry
const PLACEHOLDERS = [
  { id: 1, aspect: "aspect-[3/4]", label: "PIECE 01" },
  { id: 2, aspect: "aspect-square", label: "PIECE 02" },
  { id: 3, aspect: "aspect-[4/5]", label: "PIECE 03" },
  { id: 4, aspect: "aspect-[2/3]", label: "PIECE 04" },
  { id: 5, aspect: "aspect-[3/4]", label: "PIECE 05" },
  { id: 6, aspect: "aspect-square", label: "PIECE 06" },
  { id: 7, aspect: "aspect-[4/5]", label: "PIECE 07" },
  { id: 8, aspect: "aspect-[3/4]", label: "PIECE 08" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Portfolio() {
  return (
    <section id="work" className="bg-bg-dark py-24 px-6 md:px-10 lg:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h2
          className="hero-headline text-text-light leading-none"
          style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
        >
          <span className="font-light opacity-60">THE</span>
          <br />
          WORK.
        </h2>
        <p className="mt-4 text-right text-text-muted text-sm tracking-widest uppercase font-body max-w-lg ml-auto">
          Custom designed. One of one. No flash. No repeats.
        </p>
      </motion.div>

      {/* Asymmetric masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {PLACEHOLDERS.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="break-inside-avoid mb-3 md:mb-4 group relative overflow-hidden cursor-pointer"
          >
            <div
              className={`w-full ${item.aspect} bg-neutral-800 flex items-center justify-center relative`}
              style={{
                background:
                  "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 50%, #1a1a1a 100%)",
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-500" />
              {/* Scale on hover wrapper */}
              <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-neutral-700/20 to-transparent" />
              </div>
              {/* Label */}
              <span className="relative z-10 text-white/20 font-body text-xs tracking-[0.3em] uppercase group-hover:text-white/40 transition-colors duration-300">
                {item.label}
              </span>
              {/* Number badge */}
              <span className="absolute top-3 right-3 text-white/15 font-headline text-xs tracking-widest group-hover:text-white/30 transition-colors duration-300">
                {String(item.id).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
