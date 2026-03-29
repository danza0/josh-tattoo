"use client";

/**
 * BookingCTA — Full-width "BOOK YOUR EXPERIENCE" typographic CTA section.
 * Giant text fills the viewport width. Hover animation on text.
 * Light cream background.
 */

import { motion } from "framer-motion";

export default function BookingCTA() {
  return (
    <section
      className="bg-bg-light py-20 md:py-28 px-4 md:px-10 overflow-hidden"
    >
      <a
        href="#availability"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#availability")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="block group cursor-pointer"
        aria-label="Book your experience"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="hero-headline text-text-primary leading-none group-hover:text-accent transition-colors duration-500 will-change-transform"
            style={{ fontSize: "clamp(3.5rem, 11vw, 14rem)", letterSpacing: "-0.04em" }}
          >
            BOOK YOUR
          </h2>
          <h2
            className="hero-headline text-text-primary leading-none group-hover:text-accent transition-colors duration-500 will-change-transform"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 14rem)",
              letterSpacing: "-0.04em",
              WebkitTextStroke: "2px #111",
              WebkitTextFillColor: "transparent",
            }}
          >
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-text-muted text-sm tracking-widest uppercase font-body flex items-center gap-3"
        >
          Reserve your spot
          <span className="text-accent text-xl">↗</span>
        </motion.p>
      </a>
    </section>
  );
}
