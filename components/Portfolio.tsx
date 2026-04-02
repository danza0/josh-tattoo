"use client";

/**
 * Portfolio — "THE WORK." section.
 * Asymmetric masonry-style grid of real tattoo images.
 * Hover: scale + overlay. Scroll reveal via Framer Motion whileInView.
 */

import Image from "next/image";
import { motion } from "framer-motion";

// Real portfolio images in reverse order (jsp8 → jsp1)
const PLACEHOLDERS = [
  { id: 8, aspect: "aspect-[3/4]", label: "PIECE 08", src: "/portfolio/jsp8.jpg" },
  { id: 7, aspect: "aspect-square", label: "PIECE 07", src: "/portfolio/jsp7.jpg" },
  { id: 6, aspect: "aspect-[4/5]", label: "PIECE 06", src: "/portfolio/jsp6.jpg" },
  { id: 5, aspect: "aspect-[2/3]", label: "PIECE 05", src: "/portfolio/jsp5.jpg" },
  { id: 4, aspect: "aspect-[3/4]", label: "PIECE 04", src: "/portfolio/jsp4.jpg" },
  { id: 3, aspect: "aspect-square", label: "PIECE 03", src: "/portfolio/jsp3.jpg" },
  { id: 2, aspect: "aspect-[4/5]", label: "PIECE 02", src: "/portfolio/jsp2.jpg" },
  { id: 1, aspect: "aspect-[3/4]", label: "PIECE 01", src: "/portfolio/jsp1.jpg" },
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
              className={`w-full ${item.aspect} relative overflow-hidden`}
            >
              {/* Real tattoo image */}
              <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-700">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-500" />
              {/* Label — visible only on hover */}
              <span className="absolute inset-0 z-10 flex items-center justify-center text-white/0 font-body text-xs tracking-[0.3em] uppercase group-hover:text-white/80 transition-colors duration-300">
                {item.label}
              </span>
              {/* Number badge */}
              <span className="absolute top-3 right-3 z-10 text-white/0 font-headline text-xs tracking-widest group-hover:text-white/70 transition-colors duration-300">
                {String(item.id).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
