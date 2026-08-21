"use client";

import { motion } from "framer-motion";
import { DEFAULT_SITE, type SiteContent } from "@/lib/content-types";

export default function Hero({ site = DEFAULT_SITE }: { site?: SiteContent }) {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col z-0"
    >
      {/* Hero headline — upper-center, BEHIND the bust via z-index */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-x-0 top-[8%] flex items-start justify-center pointer-events-none select-none"
      >
        <h1
          className="hero-headline text-center text-text-primary leading-none w-full"
          style={{ fontSize: "clamp(2rem, 15vw, 22rem)", letterSpacing: "-0.04em" }}
        >
          {site.heroHeadline}
        </h1>
      </motion.div>

      {/* Bottom-left credit text — hidden on mobile to avoid colliding with
          the scroll cue; the same info lives in the marquee + footer. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden md:block absolute bottom-8 left-6 md:left-10 z-20"
      >
        <p className="text-text-primary/60 text-xs tracking-widest uppercase leading-relaxed max-w-xs font-body">
          {site.heroCreditLine1}
          <br />
          {site.heroCreditLine2}
        </p>
      </motion.div>

      {/* Scroll indicator — centred on mobile, bottom-right on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 z-20 flex flex-col items-center gap-2"
      >
        <p className="text-text-primary/60 text-xs tracking-widest uppercase font-body">
          {site.scrollLabel}
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-primary/60"
          >
            <path d="M7 0v16M1 10l6 8 6-8" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}