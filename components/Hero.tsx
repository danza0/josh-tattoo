"use client";

/**
 * Hero — Full-viewport hero section.
 * Giant "JOSH SWID" headline sits BEHIND a centred 3D statue placeholder.
 * Ambient bottom-left/right text and a scroll indicator complete the layout.
 * Fades in on mount via Framer Motion.
 */

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-bg-stone flex flex-col"
    >
      {/* ── Giant hero headline (behind the statue) ── */}
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

      {/* ── 3D Statue placeholder (sits in front of text) ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div
          className="relative flex flex-col items-center justify-center"
          style={{ width: "clamp(180px, 28vw, 420px)", height: "clamp(300px, 50vw, 700px)" }}
        >
          {/* Statue silhouette shape */}
          <div
            className="w-full h-full flex flex-col items-center justify-center rounded-t-[50%] rounded-b-[20%]"
            style={{
              background:
                "linear-gradient(160deg, #2a2826 0%, #1a1815 50%, #0e0d0c 100%)",
              boxShadow:
                "0 0 80px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Subtle bust silhouette lines */}
            <div className="flex flex-col items-center gap-3 opacity-20">
              {/* Head oval */}
              <div className="w-16 h-20 rounded-full border border-white/40" />
              {/* Neck */}
              <div className="w-8 h-8 border-x border-white/40" />
              {/* Shoulder span */}
              <div className="w-36 h-px border-t border-white/40" />
            </div>

            {/* Label */}
            <p
              className="mt-6 text-white/40 uppercase tracking-[0.3em] text-xs font-body font-medium"
              style={{ fontSize: "0.6rem" }}
            >
              3D STATUE
            </p>
          </div>

          {/* Glow effect beneath statue */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "70%",
              height: "40px",
              background: "rgba(0,0,0,0.18)",
              filter: "blur(18px)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Bottom-left credit text ── */}
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

      {/* ── Bottom-right scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-6 md:right-10 z-20 flex flex-col items-center gap-2"
      >
        <p className="text-text-primary/60 text-xs tracking-widest uppercase font-body">
          KEEP SCROLLING
        </p>
        {/* Animated arrow */}
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
