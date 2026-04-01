"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex flex-col z-10"
    >
      {/*
        z-10 on this section keeps the headline and indicators above the full-screen
        StatueSection video (z-0), which underlaps here via marginTop: "-100vh".
        No bg-bg-stone — the body background shows through so the video is visible.
      */}
      {/* Hero headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <h1
          className="hero-headline text-center text-text-primary leading-none"
          style={{ fontSize: "clamp(4rem, 14vw, 16rem)", letterSpacing: "-0.04em" }}
        >
          JOSH
          <br />
          SWID
        </h1>
      </motion.div>

      {/* Bottom-left credit text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-6 md:left-10 z-20"
      >
        <p className="text-text-primary/60 text-xs tracking-widest uppercase leading-relaxed max-w-xs font-body">
          Josh Swid, Vancouver-based Tattoo Artist
          <br />
          Guest Artist at Zen Tattoo Studio
        </p>
      </motion.div>

      {/* Bottom-right scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-6 md:right-10 z-20 flex flex-col items-center gap-2"
      >
        <p className="text-text-primary/60 text-xs tracking-widest uppercase font-body">
          KEEP SCROLLING
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

