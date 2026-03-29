"use client";

/**
 * Process — 4-step process section.
 * 4-column grid (responsive). Fade-in-up animation on scroll.
 */

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "INQUIRY",
    body: "Submit the form. Share your concept, placement, and scale. Josh reviews every request personally.",
  },
  {
    number: "02",
    title: "CONSULTATION",
    body: "A focused conversation about your vision. Josh develops the concept collaboratively. The design begins here.",
  },
  {
    number: "03",
    title: "DESIGN",
    body: "Custom artwork drawn for you alone. No flash. No templates. Your piece exists nowhere else.",
  },
  {
    number: "04",
    title: "TATTOO DAY",
    body: "Your session at the studio. Once spots are filled, the window closes.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

export default function Process() {
  return (
    <section id="process" className="bg-bg-light py-24 px-6 md:px-10 lg:px-16">
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-widest uppercase text-text-muted font-body mb-12"
      >
        02 — THE PROCESS
      </motion.p>

      {/* 4-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {STEPS.map((step, i) => (
          <motion.article
            key={step.number}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="flex flex-col"
          >
            {/* Number */}
            <span
              className="font-headline text-text-primary/15 leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              {step.number}
            </span>

            {/* Divider */}
            <div className="w-8 h-px bg-text-primary mb-6" />

            {/* Title */}
            <h3 className="font-headline text-text-primary uppercase tracking-wider text-base md:text-lg mb-4 font-black">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-text-muted font-body text-sm leading-relaxed">
              {step.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
