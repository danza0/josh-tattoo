"use client";

/**
 * Studio — "ZEN TATTOO." section with 3-column image grid.
 * Light background with studio image placeholders.
 */

import { motion } from "framer-motion";

const STUDIO_IMAGES = [
  { id: 1, label: "STUDIO 1" },
  { id: 2, label: "STUDIO 2" },
  { id: 3, label: "STUDIO 3" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Studio() {
  return (
    <section className="bg-bg-light py-24 px-6 md:px-10 lg:px-16">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-6"
      >
        <h2
          className="hero-headline text-text-primary leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}
        >
          <span className="font-light opacity-50">ZEN</span>
          <br />
          TATTOO.
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-text-muted font-body text-sm tracking-wide max-w-lg mb-16"
      >
        Oakville&apos;s premier tattoo experience. Purpose-built for precision, designed for calm.
      </motion.p>

      {/* 3-column image grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {STUDIO_IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="aspect-[4/3] bg-neutral-200 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #ddd8d2 0%, #c8c2ba 100%)",
            }}
          >
            <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase font-body">
              {img.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
